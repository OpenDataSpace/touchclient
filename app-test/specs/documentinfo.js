describe("Documentinfo model", function () {

    it("can be loaded from the server", function () {
        var goodSpy = jasmine.createSpy('successSpy'),
            badSpy = jasmine.createSpy('failureSpy');

        runs(function () {
             ACUtils.utils.login(user, password, goodSpy, badSpy);
        });

        waitsFor(function () {
            return goodSpy.wasCalled || badSpy.wasCalled;
        }, "One spy should have been called", 2000);

        Ext.Ajax.setDefaultHeaders({"Accept":"application/json"});
        var store = Ext.create("ACMobileClient.store.PrivateGlobalFoldersStore", {});
        runs(function () {
            store.load();
        });

        waitsFor(function () {
            return store.isLoaded();
        });

        runs(function () {
            expect(store.getCount()).toBeGreaterThan(0);
        });
    });
});
