'use strict';

const git = require('./git');


/**
 * 対象コミットから現在までに追加,更新,リネームされたファイルの一覧を返します
 *
 * @param {string} target 起点となるコミットのハッシュ値
 * @return {Promise<array>} 更新されたファイルパスの配列
 */
const diffModified = (target) => git(
  'diff',
  '--diff-filter=D',
  '--name-only',
  'HEAD',
  target
)
// .then((results) => {
//   if (0 === results.length) {
//     return Promise.reject({
//       code: 1,
//       errors: ['最新のコミットと対象のコミットの間に差分がありません'],
//     });
//   }
//
//   return results;
// })


module.exports = diffModified;
