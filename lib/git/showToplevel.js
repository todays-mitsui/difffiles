'use strict';

const git = require('./git');

/**
 * 対象リポジトリのルートディレクトリ名を問い合わせます
 *
 * @return {Promise<object>} ルートディレクトリの情報
 *
 * @example
 * showToplevel().then((results) => { console.log(results); });
 * // => {
 * //   path: 'C:/works/difffiles',
 * //   dirname: 'difffiles'
 * // }
 *
 * // 対象ディレクトリがGitリポジトリではないとき
 * showToplevel().catch((err) => { console.error(err); });
 * // => {
 * //   code: 128,
 * //   errors: [
 * //     '対象ディレクトリはGitリポジトリではありません'
 * //   ]
 * // }
 */
const showToplevel = () => git('rev-parse', '--show-toplevel').then(results => {
  try {
    return {
      path: results[0],
      dirname: results[0].split('/').pop()
    };
  } catch (err) {
    return Promise.reject({
      errors: [err],
      code: 1
    });
  }
}).catch(err => {
  if (128 === err.code) {
    return Promise.reject({
      code: 128,
      errors: ['対象ディレクトリはGitリポジトリではありません']
    });
  } else {
    return Promise.reject({
      code: 1,
      errors: ['不明なエラーです', '対象ディレクトリ情報の取得に失敗しました: in showToplevel.js']
    });
  }
});

module.exports = showToplevel;