define(['backbone', 'underscore'], function (Backbone, _) {

  describe('A Model', function () {

    describe('With computed properties', function () {

      it('Can be accessed by `get`', function () {
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
      })

    });

  });

});
