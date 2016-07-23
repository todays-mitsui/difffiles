#! /usr/bin/env node

'use strict';


let program = require('commander');


program.version('0.1.0')
  .command(
    'copy <revision>',
    '指定したコミットから現在までの差分ファイルのコピーを作成します',
    {isDefault: true}
  )
  .command('set-destdir <destdir>', '差分ファイルの保存先を設定します')
  .command('set-gitpath <gitpath>', 'Gitのパスを設定します')
  .parse(process.argv);
