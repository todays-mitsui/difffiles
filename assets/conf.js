'use strict';

const os = require('os');

const winGit = 'C:/Program Files/Git/cmd/git.exe';
const macGit = '/usr/bin/git';

/**
* Gitコマンドへのフルパスです
* 環境に合わせて調整の必要あり
*
*　@type {string}
*/
const git = os.platform().match(/win/i) ? winGit : macGit;

/**
* コマンドを実行しているカレントディレクトリのパスです
*
*　@type {string}
*/
const cwd = process.cwd();

/**
* 処理結果のファイル一式を保存するディレクトリのパスです
*
*　@type {string}
*/
const dest = `${os.homedir()}/difffiles`;


module.exports = {
  git,
  cwd,
  dest,
  debug: true,
};
