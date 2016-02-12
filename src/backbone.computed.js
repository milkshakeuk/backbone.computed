Backbone.Computed = (function (Backbone, _) {
  var toJSON = Backbone.Model.prototype.toJSON;
  var get = Backbone.Model.prototype.get;

  var obj = {
    // Return a copy of the model's `attributes` object.
    // When saving we dont want to pollute the attributes with computed
    // properties but when serialising for use with the templates we do
    toJSON: function (options) {
      var isSaving = _.has(options, 'emulateHTTP');
      if (isSaving) return toJSON.call(this, options);

      var hasComputed = !!this.computed;
      var computed = {};

      if (hasComputed) {
        _.each(this.computed, function (value, key) {
          computed[key] = _.isFunction(value) ? value.call(this) : value;
        }, this);
      }

      // ensure non-computed property wins in property clash
      return _.extend(computed, this.attributes);
    },

    // Get the value of an attribute or computed property.
    // If we have a computed and non-computed property clash then the non-computed
    // value should be returned
    get: function (attr) {
      var hasComputed = this.computed && _.has(this.computed, attr);
      var hasNonComputed = _.has(this.attributes, attr);

      if (hasComputed && !hasNonComputed) {
        var value = this.computed[attr];
        return _.isFunction(value) ? value.call(this) : value;
      }

      return get.call(this, attr);
    }
  }
})(Backbone, _);