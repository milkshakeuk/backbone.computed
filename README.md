# backbone.computed [![Build Status][travis-image]][travis-url] [![Dependancy Status][dependancy-image]][dependancy-url] [![Dev Dependancy Status][devdependancy-image]][dependancy-url]
Simple computed fields for Backbone models

## Introduction

Ever get the feeling that there is something missing from backbone models?
Well I got the feeling especially when using backbone models with so called "logic-less" template systems such as [Mustache]([mustache-url]), [Hogan]([hogan-url]) and [handlebars]([handlebars-url]).

Although handlebars has some built in "logic" helpers (which you can add to) and [Marionette]([marionette-url]) has helpfull features such as `templateHelpers` some properties are computed over and over again and they really belong on the model.

This is where backbone.computed attempts to bridge the gap.

## Usage

Similar to `model.events`, you define your computed properties to `model.computed`:
```javascript
var Person = Backbone.Model.extend({
  computed: {
    fullName: function () {
      return this.get('firstName') + ' ' + this.get('lastName');
    }
  }
});

var person = new Person({
  firstName: 'Tim',
  lastName: 'Burton',
  age: 20
});
```
you can access your computed properties just like normal model attributes:
```javascript
person.get('fullName'); // returns 'Tim Burton'
```
Computed properties do not come into effect when calling `save`:
```javascript
person.save();
/**
 *  submitted in ajax body:
 *  {
 *    firstName: 'Tim',
 *    lastName: 'Burton',
 *    age: 20
 *  }
 */
```

If you are using a `handlebars` and want to serialise your model ready for your template:
```html
<script id="person-template" type="text/x-handlebars-template">
  <div class="person">
    <h1>{{fullName}}</h1>
    <div class="details">
      Age: {{age}}
    </div>
  </div>
</script>
```
```javascript
var source   = $("#person-template").html();
var template = Handlebars.compile(source);
var html     = template(person.toJSON());
```
results in:
```html
<div class="person">
  <h1>Tim Burton</h1>
  <div class="details">
    Age: 20
  </div>
</div>
```
If using `Marionette` in conjunction with `backbone.computed` things get really simple as when `Marionette` passes the model data to the views template it just calls `toJSON` on the backbone model.

The example below is using `Marionettes` default template system which is really just [underscores template](http://underscorejs.org/#template) system but this can easily be swapped out for `handlebars` or another:
```html
<script id="person-template" type="text/template">
  <div class="person">
    <h1><%= fullName ></h1>
    <div class="details">
        Age: <%= age >
    </div>
  </div>
</script>
```
```javascript
var PersonView = Marionette.ItemView.extend({
    template: '#person-template'
});
...
var person = new Person({
  firstName: 'Tim',
  lastName: 'Burton',
  age: 20
});
layoutView.content.show(new PersonView({ model: person }));
```
this will again results in:
```html
<div class="person">
  <h1>Tim Burton</h1>
  <div class="details">
    Age: 20
  </div>
</div>
```
## Duck Punching
This plugin adds its functionality by duck punching the original implamentations of `get` and `toJSON` on `Backbone.Model`.

If no computed properties exist the original implamentations will kick in.

[travis-url]: https://travis-ci.org/milkshakeuk/backbone.computed
[travis-image]: https://travis-ci.org/milkshakeuk/backbone.computed.svg?branch=master
[dependancy-url]: https://david-dm.org/milkshakeuk/backbone.computed
[dependancy-image]: https://david-dm.org/milkshakeuk/backbone.computed.svg
[devdependancy-image]: https://david-dm.org/milkshakeuk/backbone.computed/dev-status.svg
[mustache-url]: https://github.com/janl/mustache.js
[hogan-url]: https://github.com/twitter/hogan.js
[handlebars-url]: https://github.com/wycats/handlebars.js/
[marionette-url]: https://github.com/marionettejs/backbone.marionette