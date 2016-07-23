'use strict';

const path = require('path');
const fs = require('fs-extra');

const CONF = require('./config/conf');
const CopySuccessContainer = require('./container/CopySuccessContainer');
const CopySkipedContainer = require('./container/CopySkipedContainer');
const CopyFailureContainer = require('./container/CopyFailureContainer');

const copy = (dir, file) => {
  const srcpath = path.resolve(CONF.cwd, file);
  const destpath = path.resolve(`${ CONF.dest }/${ dir }`, file);

  return new Promise((resolve, reject) => {
    fs.copy(srcpath, destpath, error => {
      if (error && 'lstat' === error.syscall) {
        resolve(new CopySkipedContainer(srcpath, destpath));
      } else if (error) {
        reject(new CopyFailureContainer(srcpath, destpath, errors));
      } else {
        resolve(new CopySuccessContainer(srcpath, destpath));
      }
    });
  });
};

const deepCopy = (dir, files) => {
  if (CONF.debug) {
    console.log(`=> deepCopy(dir=${ dir }, files=[${ files.length } Files])`);
  }

  return Promise.all(files.map(file => copy(dir, file))).then(containers => {
    let successFiles = [];
    let skipedFiles = [];

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
    console.error(container);

    process.exit(1);
  });
};

module.exports = deepCopy;