/*global jasmine, describe, it, expect, beforeEach, afterEach, runs, waitsFor,
  window, com, user, password, Ext, touchclient */
//exclude from jslint globals checker
describe("Sencha testrunner", function () {

    it("has Sencha Touch 2 loaded", function () {
        expect(Ext).toBeDefined();
        expect(Ext.getVersion()).toBeTruthy();
        expect(Ext.getVersion().major).toEqual(2);
    });

    it("has loaded touch code", function () {
        expect(touchclient).toBeDefined();
    });
});
