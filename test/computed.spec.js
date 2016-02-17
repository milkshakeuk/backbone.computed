define(['backbone', 'underscore'], function (Backbone, _) {

  /**
   * prevent ajax calls being made during testing
   */
  Backbone.ajax = function() {};

  describe('A Model', function () {

    describe('Which has computed properties', function () {

      it('Can access them using `get`', function () {
        var Model = Backbone.Model.extend({
          computed: {
            fullName: function () {
              return this.get('firstName') + ' ' + this.get('lastName');
            }
          }
        });

        var model = new Model({
          firstName: 'Tim',
          lastName: 'Burton'
        });

        expect(model.get('fullName')).toBe('Tim Burton');
      });

      it('Will not serialise them when `save` is invoked', function (done) {
        var Model = Backbone.Model.extend({
          url: '/test',
          toJSON: function () {
            var data = Backbone.Model.prototype.toJSON.apply(this, arguments);
            expect(data.fullName).toBe(undefined);
            done();
            return data;
          }
        });
        var model = new Model;
        model.save({ firstName: 'Tim', lastName: 'Burton' });
      });

      it('Will serialise them when `toJSON` is invoked independant of `save`', function () {
        var Model = Backbone.Model.extend({
          computed: {
            fullName: function () {
              return this.get('firstName') + ' ' + this.get('lastName');
            }
          }
        });
        var model = new Model({
          firstName: 'Tim',
          lastName: 'Burton'
        });
        var result = _.isEqual(model.toJSON(), { firstName: 'Tim', lastName: 'Burton', fullName: 'Tim Burton' });
        expect(result).toBe(true);
      });

    });

  });

});
