
/**
 * @file 生成模板入口
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
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
    var moduleName = args[1];
    var taskName = args[2];
    mainCommand = mainCommand.toLowerCase();
    var Mod = require('./src/Mod.js');
    if (mainCommand === 'mod') {
        new Mod(moduleName).init();
    }
    
    switch (mainCommand) {
        case 'addjs':
            new Mod(moduleName).addJs(taskName);
            break;
        case 'addconfig':
            new Mod(moduleName).addConfig();
            break;
        case 'addcss':
            new Mod(moduleName).addCss();
            break;
        case 'addhtml':
            new Mod(moduleName).addHtml(taskName);
            break;
    }
    
    
    if (mainCommand === 'ui') {
       //TODO
       console.log('待开发');
    }
};

if (module === require.main) {
    exports.parse(process.argv);
}