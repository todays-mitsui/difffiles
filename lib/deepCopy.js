'use strict';

const path = require('path');
const fs = require('fs-extra');

const CONF = require('./conf');
const CopySuccessContainer = require('./container/CopySuccessContainer');
const CopySkipedContainer = require('./container/CopySkipedContainer');
const CopyFailureContainer = require('./container/CopyFailureContainer');

const copy = file => {
  const srcpath = path.resolve(CONF.cwd, file);
  const destpath = path.resolve(CONF.dest, file);

  return new Promise((resolve, reject) => {
    fs.copy(srcpath, destpath, error => {
      if (err && 'lstat' === error.syscall) {
        resolve(new CopySkipedContainer(srcpath, destpath));
      } else if (err) {
        reject(new CopyFailureContainer(srcpath, destpath, errors));
      } else {
        resolve(new CopySuccessContainer(srcpath, destpath));
      }
    });
  });
};

const deepCopy = files => {
  if (CONF.debug) {
    console.log(`=> deepCopy(files=[${ files.length } Files])`);
  }

  return Promise.all(files.map(file => copyFile(file))).then(containers => {
    successFiles = [];
    skipedFiles = [];

    containers.forEach(container => {
      if (container instanceof CopySuccessContainer) {
        successFiles.push(container);
      } else if (container instanceof CopySkipedContainer) {
        skipedFiles.push(container);
      }
    });

    return {
      success: successFiles,
      skiped: skipedFiles
    };
  }).catch(container => {
    console.error(container.errors);

    process.exit(1);
  });
};

module.exports = deepCopy;