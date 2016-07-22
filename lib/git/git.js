'use strict';

const spawn = require('child_process').spawn;
const CONF = require('../conf');

/**
 * Gitにコマンドを送信して結果を得るためのラッパーです
 *
 * コマンドが正常に終了した場合は、stdoutへの出力を行ごとに分割してPromise.resolve()します
 * コマンドがエラー終了した場合は、stderrへの出力を行ごとに分割してPromise.reject()します
 *
 * @param {string} cmd - Gitコマンド
 * @param {string} [...options] - Gitコマンドへ送るオプションまたは値
 *
 * @return {Promise<array>|Promise<object>} gitコマンドの実行結果
 *
 * @example
 * git('status').then((results) => { console.log(results); });
 * // => [
 * //   'On branch master',
 * //   'Your branch is up-to-date with \'origin/master\'.',
 * //   'nothing to commit, working directory clean'
 * // ]
 *
 * // エラー終了時
 * git('foobar').catch((err) => { console.error(err); });
 * // => {
 * //   code: 1,
 * //   errors: [
 * //     'git: \'foobar\' is not a git command. See \'git --help\'.'
 * //   ]
 * // }
 */
const git = function (cmd) {
  for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }

  return new Promise((resolve, reject) => {
    let cp = spawn(CONF.git, [cmd].concat(options), { cwd: CONF.cwd });

    let results = [];
    let errors = [];

    cp.stdout.on('data', data => {
      results = results.concat(data.toString().split('\n').filter(Boolean));
    });

    cp.stderr.on('data', data => {
      errors = errors.concat(data.toString().split('\n').filter(Boolean));
    });

    cp.on('close', code => {
      if (0 !== code) {
        reject({ code, errors });
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = git;