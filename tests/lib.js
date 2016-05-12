/*eslint semi: ["error", "always"]*/

var test = require('tape');
var fixme = require('..');

function dummy () {}
var baseOptions = {
  path: 'test',
  loggerFunc: dummy
}

test('fixme is a function', function (t) {
  t.equal(typeof fixme, 'function');
  t.end();
});

test('fixme accepts options', function (t) {
  t.doesNotThrow(function() { fixme(baseOptions); });
  t.end();
});

test('fixme returns a thenable', function (t) {
  t.equal(typeof fixme(baseOptions).then, 'function');
  t.end();
});
