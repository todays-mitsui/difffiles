#! /usr/bin/env node

'use strict';


let program = require('commander');

program
  .command('dest', 'dest')
  .parse(process.argv);

console.log(program.args);
