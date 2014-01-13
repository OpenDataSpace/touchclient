%global ver 1.6.99
%global rel     1

Name:           gds2-touchui
Version:        %{ver}
Release:        %{rel}
Summary:        TouchGUI for GDS2

Group:          Server Platform
License:        Copyright (C) 2013 GRAU DATA AG
Vendor:         GRAU DATA AG
URL:            http://www.graudata.com

BuildArch:      noarch
BuildRoot:      %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
BuildArch:      noarch
BuildRequires:  make tar
Requires:       gds2-agorumcore

%description
This package contains a Mobile Touch GUI.

%clean
rm -rf %{buildroot}
make -C %{gds2root} clean

%install
rm -rf %{buildroot}
make -C %{gds2root} TARGET_SYS=rpm DESTDIR=%{buildroot} install

%files
%defattr(-, root, root)
%config %{_sysconfdir}/httpd/conf.d/*
/var/www/html/*

%postun
service httpd condrestart || true

%post
service httpd condrestart || true

%changelog
