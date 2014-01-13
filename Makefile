PROJECT = touchui
VERSION_MAJOR = 1.6
# The following is set in jenkins, for local builds, we get version 1.6.x while on jenkins we get e.g: 1.6.99
BUILDNUMBER=x
VERSION=$(VERSION_MAJOR).$(BUILDNUMBER)
BUILD = local@$(shell hostname) $(shell date)
GITREV = $(shell git show-ref --heads --hash)
DSTDIR = build/$(PROJECT)
#SDK = /home/felfert/Projects/GRAU/sencha/touch-2.2.0
SDK = ../touch-2.2.1
YUIJAR = tools/yuicompressor-2.4.7.jar
SENCHA_CDN = https://extjs.cachefly.net/touch/sencha-touch-2.2.1/
LINK_SDK = ln -s $(SDK) touch
UNLINK_SDK = rm -f touch
PHANTOMJS = phantomjs
BASEURL = http://localhost/~froth/touchclientgpl/

SOURCES=$(shell find app 3rdparty -name "*.js") generated/AppVersion.js agorum.js app.js

TARGETS=$(addprefix $(DSTDIR)/,$(SOURCES)) $(DSTDIR)/index.html

ifeq ($(DEBUG),1)
YUI = cat >
DBGSUFFIX=-debug
else
YUI = java -jar $(YUIJAR) --type js -o
DBGSUFFIX=
endif

all: jslint jasmine dstdir resources $(TARGETS) $(DSTDIR)/sencha-touch-all$(DBGSUFFIX).js

$(DSTDIR)/sencha-touch-all$(DBGSUFFIX).js: $(SDK)/sencha-touch-all$(DBGSUFFIX).js
	cp $^ $@

$(DSTDIR)/index.html: index.html
	sed -e 's/@DEBUG@/$(DBGSUFFIX)/g' index.html > $(DSTDIR)/index.html

$(DSTDIR)/%.js: %.js
	@mkdir -p `dirname $@`
	@if echo $^|grep -q min.js ; then \
		echo Copy $^ " => " $@ ; \
		cp $^ $@ ; \
	else \
		echo Compress $^ " => " $@ ; \
		cat $^ | $(YUI) $@ ; \
	fi

debug:
	$(MAKE) DEBUG=1 all

dist: clean all package

package:
	echo VERSION=$(VERSION) > version.properties
	$(MAKE) VERSION=$(VERSION) -C packaging dist

missing: generated/AppVersion.js

generated:
	@mkdir -p generated

generated/AppVersion.js: generated
	@echo "Ext.define('generated.AppVersion',{" > $@
	@echo "'version':'$(VERSION)','build':'$(BUILD)','gitrev':'$(GITREV)'" >> $@
	@echo "});" >> $@

dstdir:
	mkdir -p $(DSTDIR)

resources: dstdir $(DSTDIR)/css/app.css
	rsync -rl images $(DSTDIR)
	rsync -r $(SDK)/resources/images $(SDK)/resources/css $(DSTDIR)

$(DSTDIR)/css/app.css: css/*.css
	mkdir -p $(DSTDIR)/css
	cat $^ | java -jar $(YUIJAR) --type css -o $@

jslint: $(SOURCES)
	$(PHANTOMJS) app-test/phantomlint/Tests-Runner.js

jasmine: $(SOURCES)
	$(UNLINK_SDK)
	$(LINK_SDK)
	$(PHANTOMJS) app-test/lib/phantomjs-testrunner.js $(BASEURL)/run-tests.html 
	$(UNLINK_SDK)

clean:
	rm -rf build generated $(PROJECT)*.tar.gz
	rm -f app-test/results/TEST*
	rm -f app-test/results/touchclient-lint*
	$(UNLINK_SDK)

deploy-fritz: clean dstdir resources $(TARGETS) $(DSTDIR)/sencha-touch-all$(DBGSUFFIX).js
	rsync -cr --del --inplace --progress build/$(PROJECT) www.fritz-elfert.de:fritz/

.PHONY: generated/AppVersion.js
