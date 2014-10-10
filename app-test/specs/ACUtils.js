describe("ACUtils library", function () {

    it("can perform login", function () {
        var goodSpy = jasmine.createSpy('successSpy'),
            badSpy = jasmine.createSpy('failureSpy');

        runs(function () {
             ACUtils.utils.login(user, password, goodSpy, badSpy);
        });

        waitsFor(function () {
            return goodSpy.wasCalled || badSpy.wasCalled;
        }, "One spy should have been called", 40000);

        runs(function () {
            expect(badSpy).not.toHaveBeenCalled();
            expect(goodSpy).toHaveBeenCalled();
        });

    });
});
