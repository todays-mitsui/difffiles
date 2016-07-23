'use strict';

const os = require('os');

try {
  var config = require('../../config.json');
} catch (err) {
  var config = {};
}


const winGit = 'C:/Program Files/Git/cmd/git.exe';
const macGit = '/usr/bin/git';
const customGit = config.gitpath;

/**
 * Gitコマンドへのフルパスです
 * 環境に合わせて調整の必要あり
 *
 *　@type {string}
 */
const git = (() => {
  if (customGit) {
    return customGit;
  } else if (os.platform().match(/win/i)) {
    return winGit;
  } else {
    return macGit;
  }
})();


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
const dest = config.destdir ? config.destdir : `${ os.homedir() }/difffiles`;

/**
 * 差分ファイルの取得が実行された日時を文字列にフォーマットするときの形式の指定です
 * 差分ファイルの保存先ディレクトリの名付けに使用されます
 *
 *　@type {string}
 */
const dateformat = config.dateformat ? config.dateformat : '_YYYYMMDD_HH24MISS';


module.exports = {
  git,
  cwd,
  dest,
  dateformat,
  debug: false
};
