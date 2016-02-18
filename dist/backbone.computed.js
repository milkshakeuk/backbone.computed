/* global define, require */

(function (root, factory) {
  // Start with AMD support.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'exports'], function (_, Backbone, exports) {
      factory(root, exports, _, Backbone);
    });

    // Next check for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    var Backbone = require('backbone');
    factory(root, exports, _, Backbone);

    // Finnaly, if none of the above, create the extension and
    // assume Backbone is available at (browser) global scope.
  } else {
    factory(root, {}, root._, root.Backbone);
  }
} (this, function (root, exports, _, Backbone) {

  // original implamentation of `toJSON` and `get`
  var toJSON = Backbone.Model.prototype.toJSON;
  var get = Backbone.Model.prototype.get;

  Backbone.Model = Backbone.Model.extend({
    /**
     * Return a copy of the model's `attributes` object.
     * When saving we dont want to pollute the attributes with computed
     * properties but when serialising for use with the templates we do
     *
     * @param {Object} options Passed from Backbone.sync
     * @returns {Object} JSON copy of the model's `attributes` object
     */
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

    /**
     * Get the value of an attribute or computed property.
     * If we have a computed and non-computed property clash then the non-computed
     * value should be returned
     *
     * @param {String} attr Name of model property
     * @returns Value of computed property or model attribute
     */
    get: function (attr) {
      var hasComputed = this.computed && _.has(this.computed, attr);
      var hasNonComputed = _.has(this.attributes, attr);

      if (hasComputed && !hasNonComputed) {
        var value = this.computed[attr];
        return _.isFunction(value) ? value.call(this) : value;
      }

      return get.call(this, attr);
    }
  });

  _.extend(exports, Backbone);
  return Backbone;

}));