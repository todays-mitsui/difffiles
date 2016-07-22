'use strict';


class CopyFailureContainer {
  constructor(srcpath, destpath, errors=null) {
    this.srcpath = srcpath;
    this.destpath = destpath;
    this.errors = errors;
  }
}


module.exports = CopyFailureContainer;
