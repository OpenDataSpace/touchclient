PROJECT=touchui
VERSION=0.99.2
BUILD=local@$(shell hostname) $(shell date)
GITREV=$(shell git show-ref --heads --hash)
DSTDIR=build/$(PROJECT)
SDK = /home/felfert/Projects/GRAU/sencha/touch-2.0.3
YUIJAR = tools/yuicompressor-2.4.7.jar
SENCHA_CDN=https://extjs.cachefly.net/touch/sencha-touch-2.0.1/

SOURCES=$(shell find app 3rdparty -name "*.js") generated/AppVersion.js agorum.js app.js

TARGETS=$(addprefix $(DSTDIR)/,$(SOURCES)) $(DSTDIR)/index.html

ifeq ($(DEBUG),1)
YUI = cat >
DBGSUFFIX=-debug
else
YUI = java -jar $(YUIJAR) --type js -o
DBGSUFFIX=
endif

all: dstdir resources $(TARGETS) $(DSTDIR)/sencha-touch-all$(DBGSUFFIX).js

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
	rsync -r images $(SDK)/resources/images $(SDK)/resources/css $(DSTDIR)

$(DSTDIR)/css/app.css: css/*.css
	mkdir -p $(DSTDIR)/css
	cat $^ | java -jar $(YUIJAR) --type css -o $@

clean:
	rm -rf build generated $(PROJECT).tar.gz

.PHONY: generated/AppVersion.js
