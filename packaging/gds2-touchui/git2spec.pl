#!/usr/bin/perl -w

use strict;
use warnings;
use POSIX qw(strftime);

my $spec = shift(@ARGV) || usage();
my $version = shift(@ARGV) || usage();

sub usage {
    die "Usage git2spec <specfile> <newversion>\n";
}

my @lines;

sub getrange() {
    foreach (@lines) {
        if (/^-\s+gitrev:\s+(.*)/) {
            return ' '.$1.'..HEAD';
        }
    }
    return '';
}

sub insertgl {
    my $ver = shift;
    my $hash = '';
    my $author = '';
    my $date = '';
    my $first = '';
    my $ret = '';
    my $thisauthor = '';

    my $gitlog = 'git log --pretty=format:"h:%H%na:%aN <%aE>%nd:%at%nm:%s"' . getrange();
    open(GL, "$gitlog|") || die "Can't run $gitlog: $!\n";
    while (<GL>) {
        chomp;
        if (/^h:(.*)$/) {
            $hash = '- gitrev: ' . $1;
        }
        if (/^a:(.*)$/) {
            $thisauthor = $1;
            $author = $thisauthor if ('' eq $author);
        }
        if (/^d:(.*)$/) {
            $date = strftime("%a %b %e %Y", localtime($1)) if ('' eq $date);
        }
        if (/^m:(.*)$/) {
            next if ($thisauthor =~ m/jenkins/i);
            my $msg = '  ' . $1;
            if ('' eq $first) {
                $first = '* ' .$date . ' ' . $author . ' - ' . $ver . "\n";
                $ret .=  $first;
            }
            $ret .= $hash . "\n" . $msg . "\n";
        }
    }
    close(GL);
    return $ret;
}

open(SPEC, "<$spec") || die "Can't read $spec $!\n";
while (<SPEC>) {
    chomp;
    push(@lines, $_);
}
close(SPEC);

my $rel = '';
my $clseen = 0;

my $dhdr = '';
open(SPEC, ">$spec") || die "Can't write $spec $!\n";
foreach (@lines) {
    if (/^%global\s+rel\s+(.*)$/) {
        $rel = '-' . $1;
        $dhdr = '* ' . strftime("%a %b %e %Y", localtime(time)) .
            ' Build System <gds2dev@dataspace.cc> - ' . $version . $rel . "\n- Automated rebuild\n";
    }
    if (/^%global\s+ver\s+.*$/) {
        print SPEC '%global ver ' . $version , "\n";
        next;
    }
    if (/^%changelog/) {
        $clseen = 1;
        print SPEC "%changelog\n";
        my $cl = insertgl($version . $rel);
        if ($cl ne '') {
            print SPEC $cl;
        } else {
            print SPEC $dhdr;
        }
        next;
    }
    print SPEC $_, "\n";
}
if (!$clseen) {
    print SPEC "%changelog\n";
    my $cl = insertgl($version . $rel);
    if ($cl ne '') {
        print SPEC $cl;
    } else {
        print SPEC $dhdr;
    }
}
close(SPEC);
