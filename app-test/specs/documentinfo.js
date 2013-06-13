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
            var keys = objectinfostore.first().getFields().keys;
            expect(keys).toContain("name"); 
            expect(keys).toContain("objecttextkey"); 
            expect(keys).toContain("description"); 
            expect(keys).toContain("creator"); 
            expect(keys).toContain("lastmodifier"); 
            expect(keys).toContain("owner"); 
            expect(keys).toContain("createdate"); 
            expect(keys).toContain("lastmodifydate"); 
            expect(keys).toContain("updatedate"); 
            expect(keys).toContain("size"); 
        });
    });
});
