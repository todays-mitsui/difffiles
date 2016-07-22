'use strict';

const git = require('./git');

/**
 * 指定されたコミットに対応するハッシュ値を問い合わせる
 * コミットの指定方法はハッシュの短縮形,ブランチ名,タグ名など
 * 整数を指定した場合n個前のコミットを探す
 *
 * @param {string|int} target 対象コミットを指定するブランチ名,タグ名 または n個前のコミットを表す整数
 * @return {Promise<string>|Promise<object>} 結果のハッシュ値 または エラーオブジェクト
 */
const retrieveHash = target => {
  return git('rev-parse', target).catch(error => {
    // 渡されたtargetがハッシュの短縮形,ブランチ名,タグ名などではなかった場合
    // targetが整数ならば、${target}個前のコミットを対象にする

    const regexp = /^(\d+)$/;

    if (0 !== error.code && target.match(regexp)) {
      const revision = parseInt(target.match(regexp)[1], 10);

      return git('rev-parse', `HEAD~${ revision }`);
    } else {
      return Promise.reject({
        code: error.code,
        errors: ['エラー: 条件に一致するコミットが見つかりません: in retrieveHash.js']
      });
    }
  }).then(results => {
    if (0 === results.length) {
      return Promise.reject({
        code: 1,
        errors: ['エラー: 不明なエラーです', '対象コミットのハッシュ値の取得に失敗しました: in retrieveHash.js']
      });
    } else {
      return results[0];
    }
  });
};

module.exports = retrieveHash;