var allTestFiles = [];
var IS_TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (IS_TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\//g, '../').replace(/\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

allTestFiles.push('backbone.computed');

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/src',

  paths: {
    underscore: "../node_modules/underscore/underscore",
    backbone: "../node_modules/backbone/backbone",
    jquery: "../node_modules/jquery/dist/jquery"
  },

  shim: {
    underscore: {
      exports: '_'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
