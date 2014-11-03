
/**
 * @file 生成模板入口
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date $Date: 2014-10-30 
 */
/**
 * 解析参数。作为命令行执行的入口
 *
 * @param {Array} args 参数列表
 */
exports.parse = function (args) {
    args = args.slice(2);

    var help = require('./src/help');
    // 无参数时显示默认信息
    if (args.length === 0 || args[0] === '--help') {
        help.defaultInfo();
        return;
    }

    // 显示版本信息
    if (args[0] === '--version' || args[0] === '-v') {
        help.dumpVersion();
        return;
    }

    var mainCommand = args[0];
    mainCommand = mainCommand.toLowerCase();
    if (mainCommand === 'mod') {
       var Mod = require('./src/Mod.js');
       var Mod = new Mod();
       Mod.init();
    }
    if (mainCommand === 'ui') {
       //TODO
       console.log('待开发');
    }
};

if (module === require.main) {
    exports.parse(process.argv);
}