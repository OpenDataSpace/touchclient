TOPDIR = $(shell pwd)
SUBDIRS = gds2-touchui
CHGFILES = $(addsuffix _$(VERSION)_amd64.changes,$(SUBDIRS))
RPMFILES = $(addprefix noarch/,$(addsuffix -$(VERSION)*.rpm,$(SUBDIRS)))
RD = $(if $(shell cat /etc/debian_version),--nodeps)
DD = $(if $(shell cat /etc/redhat-release),-d)

all:

dist: clean build upload

upload:
	@set -e; for c in $(CHGFILES) ; do \
		set -e; test -f $$c || (echo Missing $$c; exit 1) ; \
		(set -e; echo "Uploading $$c" && dput -c dput.cf $$c) ; \
	done
	@set -e; for r in $(RPMFILES) ; do \
		set -e; test -f $$r || (echo Missing $$r; exit 1) ; \
	done
	set -e; echo "Uploading RPMs" && rput -c rput.cf noarch/*.rpm

build:
	@set -e; for d in $(SUBDIRS) ; do \
		$(MAKE) -C $$d buildnumber ; \
		cd $$d && dpkg-buildpackage $(DD) -b -tc -us -uc && \
		rpmbuild -bb $(RD) --define "gds2root `pwd`" --define "_rpmdir $(TOPDIR)" $$d.spec ; \
	done

clean:
	@set -e; for d in $(SUBDIRS) ; do \
		$(MAKE) -C $$d clean ; \
	done
	rm -rf *.deb *.changes *.upload noarch
