PROJECT=touchui
VERSION=0.99.3
BUILD=local@$(shell hostname) $(shell date)
GITREV=$(shell git show-ref --heads --hash)
DSTDIR=build/$(PROJECT)
SDK = /home/felfert/Projects/GRAU/sencha/touch-2.2.0
YUIJAR = tools/yuicompressor-2.4.7.jar
SENCHA_CDN=https://extjs.cachefly.net/touch/sencha-touch-2.2.0/
LINK_SDK = ln -s $(SDK) touch
UNLINK_SDK = rm -f touch

SOURCES=$(shell find app 3rdparty -name "*.js") generated/AppVersion.js agorum.js app.js

TARGETS=$(addprefix $(DSTDIR)/,$(SOURCES)) $(DSTDIR)/index.html

ifndef BASEURL
BASEURL = 'http://localhost/~froth/touchclientgpl/'
endif

ifeq ($(DEBUG),1)
YUI = cat >
DBGSUFFIX=-debug
else
YUI = java -jar $(YUIJAR) --type js -o
DBGSUFFIX=
endif

all: jslint dstdir resources $(TARGETS) $(DSTDIR)/sencha-touch-all$(DBGSUFFIX).js

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

dist: clean all
	tar -cz -C build -f $(PROJECT).tar.gz $(PROJECT)

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

jslint:
	phantomjs app-test/phantomlint/Tests-Runner.js

jasmine:
	$(UNLINK_SDK)
	$(LINK_SDK)
	phantomjs app-test/lib/phantomjs-testrunner.js $(BASEURL)/run-tests.html 
	$(UNLINK_SDK)

clean:
	rm -rf build generated $(PROJECT)*.tar.gz
	rm -f app-test/results/TEST*
	rm -f app-test/results/touchclient-lint*

.PHONY: generated/AppVersion.js
