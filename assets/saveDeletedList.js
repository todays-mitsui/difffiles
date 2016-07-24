'use strict';

const fs = require('fs-extra');
const path = require('path');

const CONF = require('./config/conf');


/**
 * 削除されたファイルリストをフォーマットしてテキスト形式で保存します
 *
 * @param {string} destpath - 保存先のディレクトリ名
 * @param {string} dirname - 差分ファイル一式を保存するディレクトリ名
 * @param {list<string>} deleted - 削除されたファイルのファイル名の配列
 *
 * @return {Promise<string>|Promise<object>}
 *           リスト保存に成功した場合はファイル名をresolveします、
 *           失敗した場合はエラーオブジェクトをrejectします
 */
const saveDeletedList = (destpath, dirname, deleted) => {
  const filename = `${dirname}.deleted.txt`;
  const data = `
削除されたファイル数: ${deleted.length}

${deleted.map(f => path.resolve(CONF.cwd, f)).join('\n')}
`;

  fs.mkdirpSync(destpath);

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(destpath, filename),
      data ,
      function (error) {
        if (error) {
          reject();
          // console.error('エラー: 削除されたファイル一覧の書き出しに失敗しました');
          // console.error(error);
        } else {
          resolve(filename);
        }
      }
    );
  });
};


module.exports = saveDeletedList;
