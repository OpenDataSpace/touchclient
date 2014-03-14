%global ver 1.6.130
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
