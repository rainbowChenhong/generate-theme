#!/usr/bin/env node

var exec = require('child_process').exec;

var child = exec('node '+__dirname+"/index.js" , function(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
  });