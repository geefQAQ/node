'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const iconv = require('iconv-lite');

// 获取歌词文件
// 获取文件绝对路径
let filename = path.join(__dirname, './lyrics/爱的代价.lrc');
// console.log(filename);
// 用文件流的方式读取文件，并用GBK编码编译
let streamReader = fs.createReadStream(filename).pipe(iconv.decodeStream('GBK'));
// console.log(streamReader);
// 用文件流的方式读取歌词文件
let rl = readline.createInterface({ input: streamReader });
// 一行一行的输出
rl.on('line', (line) => {
	// 确保时间准确（执行程序需要时间，但是歌词的时间是从触发line事件开始计算）
	let begin = new Date().getTime();
	task(begin, line);
});
// 正则匹配歌词
let regex = /\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
//            [   00   :   16   .  609   ]还记得年少时的梦吗
// task函数，处理时间与歌词
let task = (begin, line) => {
	// 正则的exec方法，返回一个数组
	let matches = regex.exec(line);
	// 如果匹配regex，说明是一句歌词
	if (matches) {
		// 处理时间
		let m = parseFloat(matches[1]);
		let s = parseFloat(matches[2]);
		let ms = parseFloat(matches[3]);
		let lyrics = matches[4];
		// 时间误差
		let offset = new Date().getTime() - begin;
		// 歌词中的指定时刻
		let moment = m * 60 * 1000 + s * 1000 + ms - offset;
		// 定时器，指定时刻输出歌词
		setTimeout(()=>{
			console.log(lyrics);
		},moment)
		// 不匹配直接输出
	} else {
		console.log(line);
	}
};