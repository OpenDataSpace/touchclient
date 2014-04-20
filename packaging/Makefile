TOPDIR = $(shell pwd)
SUBDIRS = gds2-touchui
CHGFILES = $(addsuffix _$(VERSION)_amd64.changes,$(SUBDIRS))
RPMRFILES = $(addprefix noarch/,$(addsuffix -$(VERSION)*.el6*.rpm,$(SUBDIRS)))
RPMSFILES = $(addprefix noarch/,$(addsuffix -$(VERSION)*.sles*.rpm,$(SUBDIRS)))
RD = $(if $(shell cat /etc/debian_version),--nodeps)
DD = $(if $(shell cat /etc/redhat-release),-d)

all:

dist: clean build upload

upload:
	@set -e; for c in $(CHGFILES) ; do \
		set -e; test -f $$c || (echo Missing $$c; exit 1) ; \
		(set -e; echo "Uploading $$c" && dput -c dput.cf $$c) ; \
	done
	@set -e; for r in $(RPMRFILES) ; do \
		set -e; test -f $$r || (echo Missing $$r; exit 1) ; \
		(set -e; echo "Uploading $$r" && rput -c rput.cf $$r) ; \
	done
	@set -e; for r in $(RPMSFILES) ; do \
		set -e; test -f $$r || (echo Missing $$r; exit 1) ; \
		(set -e; echo "Uploading $$r" && rput -c sput.cf $$r) ; \
	done

build:
	@set -e; for d in $(SUBDIRS) ; do \
		$(MAKE) -C $$d buildnumber ; \
		cd $$d && dpkg-buildpackage $(DD) -b -tc -us -uc && \
		rpmbuild -bb $(RD) --define "dist .el6" --define "gds2root `pwd`" --define "_rpmdir $(TOPDIR)" $$d.spec && \
		rpmbuild -bb $(RD) --define "dist .sles" --define "suse_version 1103" --define "gds2root `pwd`" --define "_rpmdir $(TOPDIR)" $$d.spec ; \
	done

clean:
	@set -e; for d in $(SUBDIRS) ; do \
		$(MAKE) -C $$d clean ; \
	done
	rm -rf *.deb *.changes *.upload noarch
