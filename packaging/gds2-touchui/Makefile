all:

buildnumber:
	perl git2cl.pl debian/changelog $(VERSION)
	perl git2spec.pl gds2-touchui.spec $(VERSION)

clean:
	rm -f $(TGZ)

install:
	test $(TARGET_SYS) = "rpm" || $(MAKE) ETCAPACHE=/etc/apache2 DOCROOT=/var/www install-real
	test $(TARGET_SYS) = "deb" || $(MAKE) ETCAPACHE=/etc/httpd DOCROOT=/var/www/html install-real

install-real:
	install -d $(DESTDIR)$(DOCROOT)
	install -d $(DESTDIR)$(ETCAPACHE)/conf.d
	tar cCf ../../build - touchui | tar xCf $(DESTDIR)$(DOCROOT) -
	test $(TARGET_SYS) = "rpm" || install -m 0644 gds2.00-touchui  $(DESTDIR)$(ETCAPACHE)/conf.d/
	test $(TARGET_SYS) = "rpm" || install -m 0644 gds2.10-touchui  $(DESTDIR)$(ETCAPACHE)/conf.d/
	test $(TARGET_SYS) = "deb" || install -m 0644 gds2.00-touchui  $(DESTDIR)$(ETCAPACHE)/conf.d/gds2.00-touchui.conf
	test $(TARGET_SYS) = "deb" || install -m 0644 gds2.10-touchui  $(DESTDIR)$(ETCAPACHE)/conf.d/gds2.10-touchui.conf
