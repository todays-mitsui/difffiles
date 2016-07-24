'use strict';

const fs = require('fs-extra');
const path = require('path');

require('date-utils');

const CONF = require('./lib/config/conf');
const showToplevel = require('./lib/git/showToplevel');
const retrieveHash = require('./lib/git/retrieveHash');
const diffModified = require('./lib/git/diffModified');
const diffDeleted = require('./lib/git/diffDeleted');
const saveDeletedList = require('./lib/saveDeletedList');
const deepCopy = require('./lib/deepCopy');

let program = require('commander');


program
  .option('-g, --gitpath <path>', 'Gitコマンドのパスを指定します')
  .option('-d, --destdir <path>', '差分ファイルの保存先を指定します')
  .option('-f, --dateformat <format>', '差分ファイル取得日時のフォーマットを指定します')
  .parse(process.argv);


const revisions = program.args;

if (0 === revisions.length) {
  console.error('エラー: 対象となるコミットを指定してください');

  process.exit(1);
}


const revision = revisions[0];

retrieveHash(revision)
.then((hash) => {
  if (CONF.debug) {
    console.log('hash: ', hash);
  }

  return Promise.all([
    showToplevel(),
    diffModified(hash),
    diffDeleted(hash),
  ]);
})
.then((_ref) => {
  const toplevel = _ref[0].dirname;
  const modified = _ref[1];
  const deleted = _ref[2];


  const destdir = toplevel + (new Date()).toFormat(CONF.dateformat);

  if (CONF.debug) {
    console.log('modified: ', modified);
    console.log('deleted: ', deleted);
    console.log('destdir: ', destdir);
  }


  return Promise.all([
    Promise.resolve(destdir),
    saveDeletedList(CONF.dest, destdir, deleted),
    deepCopy(destdir, modified),
  ]);
})
.then((_ref) => {
  const destdir = _ref[0];
  const deletedList = _ref[1];
  const copyResults = _ref[2];


  console.log(`情報: 削除されたファイルの一覧を "${deletedList}" に保存しました`);

  console.log(`情報: ${copyResults.success.length}個のファイルが "${destdir}/" にコピーされました`);
  if (0 !== copyResults.skiped.length) {
    console.log(`情報: ${copyResults.skiped.length}件のファイルコピーはファイルが既に削除されていたためにスキップされました`);
  }

  if (CONF.debug) {
    console.log('copyResults', copyResults);
  }
})
.catch((errors) => {
  console.error(errors.join('\n'));
})
