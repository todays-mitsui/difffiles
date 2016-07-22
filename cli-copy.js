#! /usr/bin/env node

'use strict';

const showToplevel = require('./lib/git/showToplevel');
const retrieveHash = require('./lib/git/retrieveHash');


let program = require('commander');

program
  .parse(process.argv);


const revisions = program.args;

if (0 === revisions.length) {
  console.error('エラー: 対象となるコミットを指定してください');

  process.exit(1);
}


const revision = revisions[0];

Promise.all([
  showToplevel(),
  retrieveHash(revision),
])
.then((_ref) => {
  let toplevelDir = _ref[0].dirname;
  let hash = _ref[1];

  console.log(toplevelDir, hash);
})
.catch((error) => {
  console.error(error);
})
