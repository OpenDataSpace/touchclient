describe("Documentinfo model", function () {

    it("contains all necessary fields", function () {
        var goodSpy = jasmine.createSpy('successSpy'),
            badSpy = jasmine.createSpy('failureSpy'),
            rootstore = Ext.create("ACMobileClient.store.PrivateGlobalFoldersStore"),
            folderstore = Ext.create("ACMobileClient.store.FolderObjectDataStore"),
            objectinfostore = Ext.create("ACMobileClient.store.ObjectInfoStore");



        runs(function () {
             ACUtils.utils.login(user, password, goodSpy, badSpy);
        });

        waitsFor(function () {
            return goodSpy.wasCalled || badSpy.wasCalled;
        }, "One spy should have been called", 2000);

        Ext.Ajax.setDefaultHeaders({"Accept":"application/json"});
        runs(function () {
            rootstore.load();
        });

        waitsFor(function () {
            return rootstore.isLoaded();
        });

        runs(function () {
            expect(rootstore.getCount()).toBe(1);
            folderstore.folderId = rootstore.first().get("id");
            folderstore.load();
        });

        waitsFor(function() {
            return folderstore.isLoaded();
        });

        runs(function () {
            expect(folderstore.getCount()).toBe(1);
            objectinfostore.load({
                params: {
                    id: folderstore.first().get("id")
                }
            });
        });

        waitsFor(function() {
            return objectinfostore.isLoaded();
        });

        runs(function () {
           expect(objectinfostore.first().get("name")).toBeDefined(); 
           expect(objectinfostore.first().get("objecttextkey")).toBeDefined(); 
           expect(objectinfostore.first().get("description")).toBeDefined(); 
           expect(objectinfostore.first().get("creator")).toBeDefined(); 
           expect(objectinfostore.first().get("lastmodifier")).toBeDefined(); 
           expect(objectinfostore.first().get("owner")).toBeDefined(); 
           expect(objectinfostore.first().get("createdate")).toBeDefined(); 
           expect(objectinfostore.first().get("lastmodifydate")).toBeDefined(); 
           expect(objectinfostore.first().get("updatedate")).toBeDefined(); 
        });
    });
});
