var tip = require('./tip');
/**
 * 命令的统一入口
 * @param {Array} args
 */
function receive(args){
	var argArr = parseArg(args);
	if(!argArr){
		return;
	}
	var cmd = argArr[0].original;
	argArr.shift();
	switch(cmd){
		case 'addmod':{

			break;
		};
		case 'addfile':{

			break;
		};
	}

}

/**
 * 解析命令和参数
 *
 */
function parseArg(args){
	var strs = args.split(/\s+/);
	if(strs[0] !== 'gene'){
		console.log(tip.help);
		return false;
	}

	strs.shift();

	var argArr = [];
	strs.forEach(function(str){
		var arr = str.split(':');
		if(arr.length === 2){
			argArr.push({
				key: arr[0],
				value: arr[1],
				original: str
			});
		} else if(arr.length === 1){
			argArr.push({
				original: str
			});
		}
	});
	return argArr;
}

/**
 * 添加整个模块
 */
function addMod(){

}
/**
 * 批量添加文件
 * @param {Array} paths
 */
function addFiles(paths){

}

/**
 * 添加单个文件 
 * @param {String} path
 */
function addFile(path){

}

module.exports = {
	receive: receive
};