%global ver 1.6.180
%global rel     1

%if 0%{?suse_version}
%global _docroot /srv/www/htdocs
%global _apache apache2
%global _condrestart try-restart
%else
%global _docroot /var/www/html
%global _apache httpd
%global _condrestart condrestart
%endif

Name:           gds2-touchui
Version:        %{ver}
Release:        %{rel}%{?dist}
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
make -C %{gds2root} TARGET_SYS=rpm DOCROOT=%{_docroot} APACHE=%{_apache} DESTDIR=%{buildroot} install

%files
%defattr(-, root, root)
%config %{_sysconfdir}/%{_apache}/conf.d/*
%{_docroot}/*

%postun
service %{_apache} %{_condrestart} || true

%post
service %{_apache} %{_condrestart} || true

%changelog
* Fri Jun 13 2014 bob-chen <562336543@qq.com> - 1.6.180-1
- gitrev: ff3037946d4206c4dce8ad822b448e3b4187d3b1
  fix issue 3922
* Tue Jun 10 2014 bob-chen <562336543@qq.com> - 1.6.179-1
- gitrev: bedf5d3415cf30435236ee67639805e7bbcda05a
  fix issue 3768
* Thu Jun  5 2014 bob-chen <562336543@qq.com> - 1.6.178-1
- gitrev: b283d0f04b3c34e03f3505660cbd94c0dad1cadc
  fix issue 3935
* Fri May 30 2014 bob-chen <562336543@qq.com> - 1.6.177-1
- gitrev: 286691d2cae906c665f8cec9cd0fb75d85eb9c87
  fix issue 3524
* Thu May 22 2014 bob-chen <562336543@qq.com> - 1.6.176-1
- gitrev: aa43b247cc77f10951fd951a48fe25df1a7e2939
  fix issue 3952
* Tue May 20 2014 bob-chen <562336543@qq.com> - 1.6.175-1
- gitrev: 05a5695e807eb7dec922eb68025bd5e4878fd1d1
  fix issue 3962
* Mon May 19 2014 bob-chen <562336543@qq.com> - 1.6.174-1
- gitrev: 543de6941f966fa88acb1c64d76ef494c20e533f
  fix 3932
* Thu May 15 2014 bob-chen <562336543@qq.com> - 1.6.173-1
- gitrev: b968da57b75aa0c0136e7d771d464867029553dd
  fix issue 3934
* Wed May 14 2014 bob-chen <562336543@qq.com> - 1.6.172-1
- gitrev: b57d299880996426ef2871bbdb77a3a2a7283182
  Fix issue 3933
* Thu May  8 2014 bob-chen <562336543@qq.com> - 1.6.171-1
- gitrev: c57c7613ec5bf351e2b4da4ec5a60d93486ebae2
  Fix issue 3889
* Mon May  5 2014 bob-chen <562336543@qq.com> - 1.6.170-1
- gitrev: 1b0ea750d5be09fc6281f63523ac03ef1d554945
  Login panel blackberry enhancement.
* Sun May  4 2014 bob-chen <562336543@qq.com> - 1.6.169-1
- gitrev: 58a90726bd55dd8c66806a282195e08fb4b196ce
  Fix issue 3898
* Tue Apr 29 2014 bob-chen <562336543@qq.com> - 1.6.168-1
- gitrev: b94adc00bab61b4321e2af964c9c33bc2f661ad5
  fix jslint issue
* Mon Apr 28 2014 bob-chen <562336543@qq.com> - 1.6.167-1
- gitrev: f3d78f9fd653dd60bf687ec822af21f151026599
  Upload list enhancement.
* Wed Apr 23 2014 bob-chen <562336543@qq.com> - 1.6.166-1
- gitrev: 34586861b517edc534e520653e6efde9f27d44ec
  Fix issue 3882, 3883
- gitrev: e0f8645fc86a76c5fe0ecc49a6bab9eafda09df4
  Fix issue 3881
* Tue Apr 22 2014 bob-chen <562336543@qq.com> - 1.6.165-1
- gitrev: 0369304645ca8603bc1997d52a0dca6ae6a718ee
  Add screensize and st version in device info
* Mon Apr 21 2014 bob-chen <562336543@qq.com> - 1.6.164-1
- gitrev: f20742f28adf29491cd0ffcbe5420f29e83f5c26
  Add device info in setting tab
* Sun Apr 20 2014 Fritz Elfert <fritz@fritz-elfert.de> - 1.6.163-1
- gitrev: 5825ba80dd94dba3a87632021f58e7be65ee6b16
  Added SLES support
* Fri Apr 18 2014 bob-chen <562336543@qq.com> - 1.6.162-1
- gitrev: 28828e6756cb86ec22666558d5b78ca42a35cfde
  Fix issue 3851, 3849
* Thu Apr 17 2014 bob-chen <562336543@qq.com> - 1.6.161-1
- gitrev: a3a2b7334019d5967e1e1dd3d9f96ed1a30b56b2
  fix issue 3828
* Tue Apr 15 2014 bob-chen <562336543@qq.com> - 1.6.160-1
- gitrev: 7e7a0e2b095c0250479d0ec5c3bc9757995eb749
  Add Logout button
* Tue Apr 15 2014 bob-chen <562336543@qq.com> - 1.6.159-1
- gitrev: 196ce007989b918994be9e3e0aba7c3eccd1e614
  Adapt preview image back button.
* Tue Apr 15 2014 bob-chen <562336543@qq.com> - 1.6.158-1
- gitrev: 41058e9d4bdeba6f7e2aeef949ea86c1520812dc
  Issue 3844 change 'Last Modify' to 'Modify Date'
* Mon Apr 14 2014 bob-chen <562336543@qq.com> - 1.6.157-1
- gitrev: 2fd2db2c5e0df85f0c53086c42774f6cbcace65b
  Fix issue 3839
* Fri Apr 11 2014 bob-chen <562336543@qq.com> - 1.6.156-1
- gitrev: 96c033fc89d7d686ffdc19f9973fe2c2d0b819bf
  Fix issue 3841
- gitrev: 41459b8bb94714d608a42519b51df47a583c35f8
  Fix issue 3844
* Thu Apr 10 2014 bob-chen <562336543@qq.com> - 1.6.155-1
- gitrev: d584e2ef1c706aec82ec241576b9fb949b51e866
  Fix issue 3835: Not easy to choose "Remember me"
- gitrev: 883581a00296d26a7b612f67b4df1aa6ba8fae6c
  fix issue 3784
* Wed Apr  9 2014 Build System <gds2dev@dataspace.cc> - 1.6.153-1
- Automated rebuild
* Wed Apr  9 2014 bob-chen <562336543@qq.com> - 1.6.152-1
- gitrev: 0611e4f150a865b8b202d9693f87f35d940978eb
  fix issue 3808
* Tue Apr  8 2014 bob-chen <562336543@qq.com> - 1.6.151-1
- gitrev: 46ac14749781fc219c92391634d2fe08d3bdd52b
  Fix issue 3807 Login dialog  is not so beautiful.
* Fri Apr  4 2014 bob-chen <562336543@qq.com> - 1.6.150-1
- gitrev: d0a9a261a679286ef08c4a9a187ce2b9318e029b
  Preview enhancement.
* Thu Apr  3 2014 bob-chen <562336543@qq.com> - 1.6.149-1
- gitrev: 1836678c5f224c67ac22045d9e3e5e162ba40e4e
  Fix issue 3669
* Thu Apr  3 2014 bob-chen <562336543@qq.com> - 1.6.148-1
- gitrev: 4af287d90f73388524d2ff33264114f0ba0a72d1
  Fix 2458: Text displayed with German Language
* Wed Apr  2 2014 bob-chen <562336543@qq.com> - 1.6.147-1
- gitrev: faf93ed41ce76b9f32ec80355c7824045239a4b2
  Fix jslint issue
* Wed Apr  2 2014 bob-chen <562336543@qq.com> - 1.6.146-1
- gitrev: 26e82d407c3690edf349e931e0688a26ec92f0d3
  Item info size enhancement
* Wed Apr  2 2014 bob-chen <562336543@qq.com> - 1.6.145-1
- gitrev: ede6d239eef56fdf050b0544ffa731a6adfb78d3
  Fix wp create link issue
* Mon Mar 31 2014 bob-chen <562336543@qq.com> - 1.6.144-1
- gitrev: 3c76ef2f333dc8b367e73ec11e8e0830a19af42e
  Orientation change enhancement
* Fri Mar 28 2014 bob-chen <562336543@qq.com> - 1.6.143-1
- gitrev: 42bae5312c6385b5e5c3b668ba37af72869864b5
  Replace orientationchage event with resize event
* Fri Mar 28 2014 bob-chen <562336543@qq.com> - 1.6.142-1
- gitrev: f2c315a1273bc86e0a1080d77054a7cc84a0818f
  Fix issue 2235
- gitrev: 6b288189c48dcc8475f088a05e34873bafa3d7a1
  Add asterisk in create upload link panel
* Thu Mar 27 2014 bob-chen <562336543@qq.com> - 1.6.141-1
- gitrev: 21da1a949ce50e0916a555ded1dded60d0b23e13
  Fix jslint issue
* Thu Mar 27 2014 bob-chen <562336543@qq.com> - 1.6.140-1
- gitrev: e3bd6bfaf77f7d1d9d517d35d59d7b58f85b6f63
  Fix android tablet unusable issue.
* Wed Mar 26 2014 bob-chen <562336543@qq.com> - 1.6.139-1
- gitrev: a605d78532ea072d626cdeef9e627d2a98f2f44e
  Fix jslint issue
* Wed Mar 26 2014 bob-chen <562336543@qq.com> - 1.6.138-1
- gitrev: 6e109e161d6cd5f808ed69981c03ddad750bf4a9
  Add create upload link panel
* Mon Mar 24 2014 bob-chen <562336543@qq.com> - 1.6.137-1
- gitrev: 9d681a6c4d3e709e6f4f8b344d27fd978feaa879
  Fix issue 2235
* Thu Mar 20 2014 bob-chen <562336543@qq.com> - 1.6.136-1
- gitrev: 0765dffe129b17b83ddf8e711671b15555c90177
  Fix upload icon not in place
* Thu Mar 20 2014 bob-chen <562336543@qq.com> - 1.6.135-1
- gitrev: a126aadf552d4c3f183a630da5576285e4c8a514
  Fix issue 3638 Can't upload pic in ios
* Thu Mar 20 2014 bob-chen <562336543@qq.com> - 1.6.134-1
- gitrev: 4b0be766f4779363e81306f9c03e1d49ddb5fd89
  Fix 3643 Search icon not positioned properly
* Wed Mar 19 2014 bob-chen <562336543@qq.com> - 1.6.133-1
- gitrev: 7e2b48ad15ad129858f430b39dc03d7a94fbe4fc
  code clear
- gitrev: e70ceccf4be3036cbb8b3ca623189d8253dfe236
  Fix 3641 Search bar doesn't work at all on WP
- gitrev: 58dce9efcfa6b581043b623c89ac9cc8697d2c15
  Fix 3603
* Tue Mar 18 2014 bob-chen <562336543@qq.com> - 1.6.132-1
- gitrev: d224bee8b4553318ca48a3151b9fcc02d502005e
  Fix issue 3640/3621, image scaled and zoom in wp
- gitrev: 5a3177ad66fdd9171238a2a0410a3bc00bed5411
  Fix issue 3642 settings tab not work in wp
* Mon Mar 17 2014 bob-chen <562336543@qq.com> - 1.6.131-1
- gitrev: ae5b5fa625f16a9ad90d7d73423423a3c4587b5d
  Fix #3623
- gitrev: 4c54a8e4ef1c9f2dac5f7e86a255f2a666caee16
  make download link panel scrollable
* Fri Mar 14 2014 bob-chen <562336543@qq.com> - 1.6.130-1
- gitrev: 8dd635fd040a6934de98f7d2ed8804aa06ad038d
  Fixed issue 3622
* Thu Mar 13 2014 bob-chen <562336543@qq.com> - 1.6.129-1
- gitrev: 1da55e42c4ec618a5f4db67220c54ef345d566b0
  Fix jslint issue
* Thu Mar 13 2014 bob-chen <562336543@qq.com> - 1.6.128-1
- gitrev: 09774a6a709f7146bc6ec8651215e1533c8b6101
  Fixed jslint issue.
* Thu Mar 13 2014 bob-chen <562336543@qq.com> - 1.6.127-1
- gitrev: 6aab9d365b4a6347147ba9d90aae5c4cb5e0db5f
  Merge branch 'master' of https://github.com/OpenDataSpace/touchclient
- gitrev: e150683cb1ecee6df111cf27822e1a4bc35878ff
  Fixed jslint issue
* Thu Mar 13 2014 bob-chen <562336543@qq.com> - 1.6.126-1
- gitrev: 6702ca07b6c3a48e222793bd9e1630b8d0ede1a4
  Fix create download link with pwd issue.
* Wed Mar 12 2014 Fritz Elfert <fritz@fritz-elfert.de> - 1.6.125-1
- gitrev: a830936f2af792c89025ed25dd2646a9e4547814
  Fixed #3633
* Wed Mar 12 2014 bob-chen <562336543@qq.com> - 1.6.124-1
- gitrev: 2a9760f4e62259b134d89748153388ff7dc8eecd
  Fix search result display abnormal in st 2.3
* Wed Mar 12 2014 bob-chen <562336543@qq.com> - 1.6.123-1
- gitrev: d31e4ac04e54d4d5a3433d7b11ac27a7c886069f
  Fix pull down refresh not work in st 2.3.1
* Tue Mar 11 2014 bob-chen <562336543@qq.com> - 1.6.122-1
- gitrev: 769b42593e9ec46210f16c62c0de4aaeb0e0dbb6
  extend unit test waiting time
* Tue Mar 11 2014 bob-chen <562336543@qq.com> - 1.6.121-1
- gitrev: daff9999a253da0aacfa0ff493c6a7989ad89369
  Fix st 2.3.1 can not input in BB 10
* Mon Mar 10 2014 Build System <gds2dev@dataspace.cc> - 1.6.120-1
- Automated rebuild
* Fri Mar  7 2014 bob-chen <562336543@qq.com> - 1.6.119-1
- gitrev: c0a250d94d504025da20a93b93ba8eb325c6f42b
  Fix wrong text msg after link createin
* Thu Mar  6 2014 bob-chen <562336543@qq.com> - 1.6.118-1
- gitrev: ef5e1539b28c34b3f82861352f1a77a3b3daa2f9
  Fix can't create download link in ie10
* Thu Mar  6 2014 bob-chen <562336543@qq.com> - 1.6.117-1
- gitrev: 4b330d9d88123f77069325a55f992f472806a473
  Fix create download link sometimes failed
* Tue Feb 11 2014 bob-chen <562336543@qq.com> - 1.6.116-1
- gitrev: 33a6b1e5b08b6cd8547d8122ddbd39c4f3b56308
  Adapt preview in search.
* Fri Jan 24 2014 bob-chen <562336543@qq.com> - 1.6.115-1
- gitrev: 773c0b9defdd4b906b5de305a1b5cee827ca46a8
  Merge branch 'master' of https://github.com/OpenDataSpace/touchclient
- gitrev: 77e563e760ad8a7588ef5d087735715699146fd5
  Fixes jslint error
* Fri Jan 24 2014 bob-chen <562336543@qq.com> - 1.6.114-1
- gitrev: 7dd9bc40b8d7ef44c4c4092716e7ba53bcb8ae29
  Refactor preview image
* Thu Jan 23 2014 Fritz Elfert <fritz@fritz-elfert.de> - 1.6.113-1
- gitrev: fe9aa67eb983f129748ba3d7cc8dfc93f4501088
  Allow building on debian and fedora
* Fri Jan 17 2014 bob-chen <562336543@qq.com> - 1.6.112-1
- gitrev: 77abf9733e83e5a732db10931242f2c47bc88cd6
  Add rename function
* Tue Jan 14 2014 bob-chen <562336543@qq.com> - 1.6.111-1
- gitrev: aef2b76b81895402f02b503aca2c080e4babe000
  Move the file info to menu
* Mon Jan 13 2014 Fritz Elfert <fritz@fritz-elfert.de> - 1.6.110-1
- gitrev: 2702b2776e7b9610fc145eb0ea6661eb15cff637
  Fix apache config filenames
* Mon Jan 13 2014 bob-chen <562336543@qq.com> - 1.6.109-1
- gitrev: 6f697234a82470b3d02e3d36d72e3c8e1e8ecda8
  Fix open file from the search result twice issue
* Mon Jan 13 2014 Build System <gds2dev@dataspace.cc> - 1.6.108-1
- Automated rebuild
* Mon Jan 13 2014 Build System <gds2dev@dataspace.cc> - 1.6.107-1
- Automated rebuild
* Mon Jan 13 2014 Build System <gds2dev@dataspace.cc> - 1.6.106-1
- Automated rebuild
* Mon Jan 13 2014 Build System <gds2dev@dataspace.cc> - 1.6.105-1
- Automated rebuild
* Mon Jan 13 2014 Fritz Elfert <fritz@fritz-elfert.de> - 1.6.104-1
- gitrev: 655f3f794544ff1c475676bf0ce2c81ae308ff27
  Ignore packaging in jasmine
- gitrev: 6fa47d9d7996a9d36d4bb0d0e0290473019ae082
  Merge branch 'master' of github.com:OpenDataSpace/touchclient
- gitrev: 94fc5ad8a814589a7ef53a5125a59bcc022e4590
  Hook packaging into dist, Ignore generated files
- gitrev: 316bfaef210c9a483f759c6472e8c4f1374168cd
  Perform monolithic packaging
- gitrev: dcbbfe917aed20c7649e2bcc020093a917e90830
  Revert generated changes
- gitrev: b7c5e20aefe53ac70202d23b9c0928c03de52e9b
  Fix returned capitalize repo name issue.
- gitrev: c77bee7cd5a3b8d5f48293e63a4132f2efdbc489
  fixes jslint error
- gitrev: 6542b0cb8c32ab310bed9eb2bbf77da2cbe93c48
  Add create folder button
- gitrev: 1316459b03a1133a5b2908958444568c4607c515
  Display global repo
- gitrev: 6589ed32cc95c1f334c0bdd6b49d6aa2206afa70
  Display e-mail address of owner of the room shared
- gitrev: 42dcc14cc4c0d5959c3b64c73ca8c7841cacf9a3
  Fix when delete root folder display undefined.
- gitrev: fd0d06bce0e522f7aa21cf452d3a9ed17fbaf2ee
  Add delete item function
- gitrev: 228b3da04c453cb3e7e0973407dc7e5eaac2dcc7
  fixes jslint error
- gitrev: 5429fafd840a551ef87016976006b86fb47c26d3
  Fixes jslint error
- gitrev: 680ceb352cde0c30618bf7e4cc3206ed5b179cee
  Fixes jslint error
- gitrev: c8d66b1f5426fe38573bca7d6d5363080e4f1710
  Support download link
- gitrev: 16e330e8cc2a56e694fad24ee3d007e45469e5f0
  Fix upload once issue
- gitrev: daa5f2d3676c3919a603519c93200c186896982e
  Fix in BlackBerry upload not work issue.
- gitrev: ec4b5c2c585615aef074ba85a2c7d1c6a9901e74
  Fix info box no upper right icon
- gitrev: eae07659b8ad5591a98f10baccc25b9cd1f25a97
  Message change
- gitrev: 4556a5268b46487f84105283b6767f702d960665
  Fix pull down to refresh not get the latest file.
- gitrev: 584659afa9594a3938f42771c128096d2b3d8426
  Fix initial size on WP8 with IE10
- gitrev: 6201194b155e15786bb07d099ddca600bebc772e
  Code cleanup
- gitrev: 0350b037124071f2929e69819352c23a1b9617d7
  Mode cosmetics.
- gitrev: 03a9d800758c702fcb19de187ef053adb30053db
  cosmetics
- gitrev: 2bd2732bb2f26c40c2d4c4516689d42d2dfc0d0c
  Fixed orientation & preview issues.
- gitrev: ad51fb20600f17b0d7a4f1e20218ccff5487f748
  Code cleanup
- gitrev: 453e4cef882d36d8daf3e78af2aeb0ef1c2bb651
  Code cleanup
- gitrev: 05fc3713a83eb0a985a42684b301afe1a4ebe8c9
  Code cleanup
- gitrev: 27a852e2607981622d7646c91e742d20378889f3
  Fixed syntax error
- gitrev: e82f83b4d45441da4893925022a5d1c143e73a19
  Fix jslint issues
- gitrev: 5b81fc1d3942e3c4dbf6d11f5f66c3e8f3a84101
  Fix various issues with iPad.
- gitrev: 830f570dd5c3818e6607e9f655c568de884477ba
  Variables are overrideable by default
- gitrev: 142f34e5ad5662f0b58f303df5bfc0eb2778f6d6
  Fixed test dependencies
- gitrev: 97d55f07db5d1e9e1d5812de45d96c3396c29a7a
  Fixed baseurl
- gitrev: e456f35157c7d4057f72a37b40e66f7b00522fb1
  changes index.html to work on ios and breaks bb10
- gitrev: 4ec5c0b1b77bb0cc8ee283679926eecf0d06dc91
  changed testhost
- gitrev: 1b713839d5d85af56a45626ad703e8e05749ae53
  Info Panel now shows size instead of lastchangeby
- gitrev: 058988a431266502d933efb3e9524a830eadaf5c
  DocumentInfo test reflects the status quo
- gitrev: 3325d6d6970aef5985991f6f769112cd77d4282d
  fixes jslint errors
- gitrev: e9b8dcc9cc9d79f6e7faff4033bfca7815ca64f9
  Adds draft for unit test for documentinfo
- gitrev: 97d69e2723fcd9e6700332989cef5fc385656f5c
  Fixes jslint error
- gitrev: bef2068286297bbb49e21ab1eb411373f1078b50
  Adds unit test for ACUtils to perform login
- gitrev: 0a6a713b284a0520d571b4e9b05a2f2b2836abec
  Adds sencha touch framework to jslint ignore
- gitrev: 984344c23d6238ef36ceb91cf6a8e264006cabc8
  added touch to gitignore
- gitrev: b33ba0692e9f265ab5f9f1757e55c3a6017cca72
  Fixes Makefile dependencies
- gitrev: 23472b39cec4305c4ab3faee54a3581e9b6b1f0d
  Adds Unit Testing Framework
- gitrev: 67bfa8560f99566e61f68ac1092ea6d5ef943f39
  Fixes display bug for tablets after upgrade to 2.2
- gitrev: 2a3ad92cfb6f87f0a570a45407da71f4986912de
  Refactoring bugfix
- gitrev: 811c3150d6e4bc402dc64c7ec0814fec9fcaed2c
  Fixes syntax error
- gitrev: 29d4dfa77aad1768ce44825f4b5fef6de92548a9
  Last batch of jslint corrections
- gitrev: b635ec9c95c1e7467e797ea4e1f41c69740c1bcd
  additional jslint fixes
- gitrev: 3ca479aa77ca5e6f784e210b29686ce70d88be11
  fixed several jslint errors
- gitrev: 3eefd28374d0aaa748a8ba0b65f08f1908194d4c
  fixes jslint in EventAssistanceListList
- gitrev: 8b28219d0f10e635f46c1207c063a7c39aafc77c
  fixed jslint errors in agorum.js
- gitrev: a50bf5555c617570a8aed965fce202cac2580e3e
  made jslint allow ^ and . in regexp
- gitrev: bde78481f332d283aa5f9055fc163eb75c9c14de
  fixes jslint errors in MailViewContainer
- gitrev: 553d139e0fb9af9a47e4fa617f3dec927e2c577d
  Fixes jslint errors in ImageViewer
- gitrev: d3826b38a6ce1e99b825a1db626919b4e83690cd
  Fixes jslint errors in MainPanel
- gitrev: cc3c58527c4f461c869fb0f50f77bc48fc4d2452
  adds .architect to gitignore
- gitrev: 0cb75586af1e0d4d47149009d4ae612854751ea4
  removes jslint errors from ReceiverInputField
- gitrev: 4b3ff4e3cddc50bf38f412dbfeed6ce4f63c5ef6
  Fix formerly suppressed  jslint error in mailform
- gitrev: ec8845bc5375f838a977cc982919a09e92d2b0d8
  reduces jslint errors in subproject mailform
- gitrev: 4e2b6b3bb8af559ace60fedcc5ead9c224a29daf
  upgraded subprojects to sencha touch 2.2.0
- gitrev: bfb7d5d42dcb93dd98bf0535347b0fafe65997d5
  Adds unit testing framework and phantomlint
- gitrev: 8211fc82c74e8ed7bc7f616c3ffa06b3d9e4bdd8
  Adds vim swp files to .gitignore
- gitrev: 8342896fa30d14be0bec504e2092d25cb9234e00
  Removes compatability message
- gitrev: 30a71940fae01e0de383fefd8ea30905e2a97ec4
  Upgrade to sencha touch 2.2.0
- gitrev: a1ede499037ad92c13b6bf88b73e28cadca58267
  Fix copy of symlink to actual logo
- gitrev: 538c17dec924de3b0ae95f13b1bc715b47f02899
  Build unversioned tar
- gitrev: 98cdb20ff5603e511e14a2dbf49c4fb764cbebb0
  Bumped up version, Logo changeable with symlink
- gitrev: bc7ea7c5c52b8bb0c7647f9ca2455d43560498c7
  - Separated logo from background
- gitrev: 00239ef0132a11390dfe016a33b5633f594bd37e
  Build versioned tar
- gitrev: 06ab071be31a5bced6081fe8d64259ee675bf6a6
   - Completed Makefile
- gitrev: 6f0fcca928b0a64caed6a679526ecbfe51737c3a
  - Fixen an upload problem
- gitrev: 6a9b26f6f07307f13dc0d8d4a9b01cbdb6ea52d8
  Implemented autostart upload settings.
- gitrev: e04cede696a6296e7f5608c56e61fe5007fc3214
  Allow overriding isPhone via URL parameter
- gitrev: 16db8210a803ae9c001ae25f477fc60ad4c93f90
  Fix: cancel of spcific file failed.
- gitrev: e5d6db20c4ca32802231ebab7dc4652fcbd768d1
  Finished uploader with all bells and whistles
- gitrev: 37439fed545ad472751dc7f2b3c56c0686942529
  First upload proto, cancel and err-handl. missing
- gitrev: 1132a3a9ec9d34fbdf7304ddae3276731dee3d73
  Removed external initializer from launch
- gitrev: f8328850060decd4280d554356ad5d59817c9509
  Initial implementation of an upload queue
- gitrev: a80501737b06e6ba42c2cd85b2016cf1f767318c
  Handle folder permissions, removed MailSearchStore
- gitrev: 04039dc56dbf84c7a6081b129b21b87923998873
  Added UploadController, fixed multievent issues.
- gitrev: 8d30b3f322f1b4e71c483bc77863835be3ed195b
  General code cleanup
- gitrev: ae25fdfde7f2875c9fc5b33407f3e1a232fd5c6b
  Switched to debugging framework variant.
- gitrev: 3e3d45a8cf28fdc07f76fd4967cdda03ae9ee3a6
  Fixed username action, commented suspicious code.
- gitrev: 9fddd2a8ee926bf9986a30a41c720b302e7a89f8
  Added missing require, minimal code cleanup
- gitrev: 1584e189e39def6e1e00d19dfbf53b70c7e669a8
  Sort Views/Stores/Models, remove evAssist. call
- gitrev: 5ca395656bd1b138d695f09eb58896f5a400bd72
  fixed makefile
- gitrev: 695b3397e0b833ad0e90633257e2a635e0e1c508
  switched from debug build to live and added makefile
- gitrev: d890c356a6fe2d6c0d3006b9d609b1b73b157ad5
  added download
- gitrev: 4e6d7df5f2cad6f369c06c171f41b7c25d1b171b
  changed cdn to https
- gitrev: a1d140d0c7b49fe4ed3fa8a4649c6c90c89bc6ac
  Translated UI to english
- gitrev: 3b77c7bba12f5fb0f5d9b04893fa28b121af4eae
  Seperated own and shared folders into seperate views
- gitrev: abf81a049c01520c377d3a986d4a0a80e3e979b0
  Changed root folder to own files
- gitrev: 2af7a00c1047d6c01c9e387f38b67eeb2f6941ff
  Removed mail and event views
- gitrev: 64a67435655c3362a54b09423325ab069ffa3b8b
  Changed background image
- gitrev: 2dacc282676320918250db8b38ae39eb2501bda3
  Upgrade to architect 2.2.1
- gitrev: d515c3abcd5b5d31613bc90c484b521e34c44a2f
  Initial Import
- gitrev: a89dfe491bf3b0d8a4c4227feea967af2014387a
  Initial commit
