'use strict';
const fs = require('fs');
const path = require('path');

let target = path.join(__dirname, process.argv[2] || './');
// console.log(target);

let load = (target,depth) => {
  let dirinfos = fs.readdirSync(target);
  // console.log(dirinfos);

  let dirs = [];
  let files = [];
  dirinfos.forEach(info => {
    let stats = fs.statSync(path.join(target, info));
    // console.log(stats);
    if (stats.isFile()) {
      files.push(info);
    } else {
      dirs.push(info);
    }
  });
  // depth = 0  ''
  // depth = 1  '│ '
  // depth = 2  '│ │ '
  let prefix = new Array(depth).join('│ ');
  // ├ ─ └
  dirs.forEach(dir => {
    console.log(`${prefix}├─${dir}`);
    // 递归
    load(path.join(target, dir),depth + 1);
  })
  let count = files.length - 1;
  files.forEach(file => {
    let temp = count-- ? '├' : '└';
    console.log(`${prefix}${temp}─${file}`);
  })
};

load(target,0);

