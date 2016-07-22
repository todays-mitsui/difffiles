#! /usr/bin/env node

'use strict';

const diff = require('./lib/git/diffDeleted');

diff('3ebcddf')
.then((results) => {
  console.log(results);
})
.catch((err) => {
  console.error(err);
}) ;
