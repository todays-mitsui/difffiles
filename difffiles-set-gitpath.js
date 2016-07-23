'use strict';

const fs = require('fs');

const update = require('./lib/config/update');


let program = require('commander');


program.parse(process.argv);


const paths = program.args;

if (0 === paths.length) {
  console.error('エラー: Gitのパスを指定してください');

  process.exit(1);
}

const newConfig = update({ gitpath: paths[0] });

console.log(JSON.stringify(newConfig, null, 2));
