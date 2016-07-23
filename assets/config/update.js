'use strict';

const fs = require('fs')


const configpath = `${__dirname}/../../config.json`;

const update = (newConfig) => {
  try {
    var config = require(configpath);
  } catch (err) {
    var config = {};
  }

  newConfig = Object.assign({}, config, newConfig);
  const json = JSON.stringify(newConfig, null, 2);

  fs.writeFile(configpath, json, (error) => {
    if (error) {
      console.error(error);
    }
  });

  return newConfig;
}


module.exports = update;
