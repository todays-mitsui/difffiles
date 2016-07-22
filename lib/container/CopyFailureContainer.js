'use strict';

class CopyFailureContainer {
  constructor(srcpath, destpath) {
    let errors = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    this.srcpath = srcpath;
    this.destpath = destpath;
    this.errors = errors;
  }
}

module.exports = CopyFailureContainer;