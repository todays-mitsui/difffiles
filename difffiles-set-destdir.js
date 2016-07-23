'use strict';

const fs = require('fs');

const update = require('./lib/config/update');


let program = require('commander');


program.parse(process.argv);


const dirs = program.args;

if (0 === dirs.length) {
  console.error('エラー: 保存先のディレクトリを指定してください');

  process.exit(1);
}

const newConfig = update({ destdir: dirs[0] });

console.log(JSON.stringify(newConfig, null, 2));
