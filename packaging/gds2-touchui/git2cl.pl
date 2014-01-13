#!/usr/bin/perl -w

use strict;
use warnings;
use POSIX qw(strftime);

my $cl = shift(@ARGV) || usage();
my $version = shift(@ARGV) || usage();

sub usage {
    die "Usage git2cl <changelog> <newversion>\n";
}

my @lines;

sub getrange() {
    foreach (@lines) {
        if (/\*\s+gitrev:\s+(.*)/) {
            return ' '.$1.'..HEAD';
        }
    }
    return '';
}

sub getmaintainer() {
    foreach (@lines) {
        if (/^\s--\s+.*/) {
            my $mline = $_;
            $mline =~ s/\s\s.*/  /;
            $mline .= strftime("%a, %d %b %Y %H:%M:%S %z", localtime(time()));
            return $mline;
        }
    }
    return '';
}

open(CL, "<$cl") || die "Can't read $cl $!\n";
while (<CL>) {
    chomp;
    push(@lines, $_);
}
close(CL);

my $gitlog = 'git log --pretty=format:"h:%H%na:%aN <%aE>%nd:%aD%nm:%s"' . getrange();
open(GL, "$gitlog|") || die "Can't run $gitlog: $!\n";
my $hash = '';
my $author = '';
my $date = '';
my $first = $lines[0];
my $anything = 0;
my $thisauthor = '';
$first =~ s/\([^\)\-]+(-[^\)]+)*\)/($version$1)/;
open(CL, ">$cl") || die "Can't write $cl $!\n";
while (<GL>) {
    chomp;
    if (/^h:(.*)$/) {
        $hash = '  * gitrev: ' . $1;
    }
    if (/^a:(.*)$/) {
        $thisauthor = $1;
        $author = $thisauthor if ('' eq $author);
    }
    if (/^d:(.*)$/) {
        $date = $1 if ('' eq $date);
    }
    if (/^m:(.*)$/) {
        next if ($thisauthor =~ m/jenkins/i);
        my $msg = '    ' . $1;
        if ('' ne $first) {
            print CL $first, "\n\n";
            $first = '';
        }
        print CL $hash . "\n" . $msg . "\n";
        $anything = 1;
    }
}
close(GL);
if ($anything) {
    print CL "\n -- " . $author . '  ' . $date . "\n\n";
} else {
    print CL $first, "\n\n  * Automated rebuild\n\n" . getmaintainer() . "\n\n";
}
foreach (@lines) {
    print CL $_, "\n";
}
close(CL);
