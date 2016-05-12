'use strict';

var minimist = require('minimist'),
    fixme    = require('..'),
    pkg      = require('../package');

function help() {
  return '\
Usage:\n\
\n\
  fixme [options] [file|glob ...]\n\
\n\
Options:\n\
\n\
  -h, --help                 output usage information\n\
  -v, --version              output version\n\
  -p, --path                 path to scan (default: process.cwd())\n\
  -i, --ignored_directories  glob patterns for directories to ignore (default: node_modules/**, .git/**, .hg/**)\n\
  -e, --file_encoding        file encoding to be scanned (default: utf8)\n\
  -l, --line_length_limit    number of max characters a line (default: 1000)\n\
  --ignore_messages          ignore certain messages (default: null)\n\
\n\
Examples:\n\
\n\
  By default:\n\
\n\
    fixme\n\
\n\
  Some ignored directories and some including files:\n\
\n\
    fixme -i \'node_modules/**\' -i \'.git/**\' -i \'build/**\' \'src/**/*.js\' \'test/*\' \n\
\n\
    fixme --ignore_messages NOTE,OPTIMIZE,HACK --ignore_messages XXX\n\
';
}

var argv = minimist(process.argv.slice(2));

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

if (argv.help || argv.h) {
  console.log(help());
  process.exit();
}

var options = {};

var path = argv.path || argv.p;
if (path) {
  options.path = path;
}

var ignored_directories = argv.ignored_directories || argv.i;
if (typeof ignored_directories === 'string') {
  ignored_directories = [ignored_directories];
}
if (ignored_directories) {
  options.ignored_directories = ignored_directories;
}

var file_patterns = argv._;
if (file_patterns.length > 0) {
  options.file_patterns = file_patterns;
}

var file_encoding = argv.file_encoding || argv.e;
if (file_encoding) {
  options.file_encoding = file_encoding;
}

var line_length_limit = argv.line_length_limit || argv.l;
if (line_length_limit) {
  options.line_length_limit = line_length_limit;
}

function appendList(input, el) {
  return input.concat(el);
}

function getFlatList(input) {
  if (Array.isArray(input)) {
    return input.map(getFlatList).reduce(appendList, []);
  }
  return input === true ? [] : input.split(',');
}

function getLength(str) {
  return str.length;
}

var ignore_messages = argv.ignore_messages;
if (ignore_messages && ignore_messages !== true) {
  options.ignore_messages = getFlatList(ignore_messages).filter(getLength).map(function(input) { return input.toLowerCase(); });
}

fixme(options);
