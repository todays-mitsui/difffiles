'use strict';

const git = require('./git');

/**
 * 対象コミットから現在までに削除されたファイルの一覧を返します
 *
 * @param {string} target 起点となるコミットのハッシュ値
 * @return {Promise<array>} 削除されたファイルパスの配列
 */
const diffDeleted = target => git('diff', '--diff-filter=D', '--name-only', target, 'HEAD');

module.exports = diffDeleted;