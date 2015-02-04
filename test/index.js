var destructor = require('../index');
var chai = require('chai');
var appPath = 'test/app-dist';

describe('destructor', function () {

    it('should get the application distribution module paths', function (done) {
        destructor(appPath, { include: /.js$|.hbs$/ }, function (err, list) {
            if (err) {
                throw err;
            }
            chai.expect(list.modules.length).to.be.equal(8);
            chai.expect(list.application.length).to.be.equal(3);
            done();
        });
    });

});