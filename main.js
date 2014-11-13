
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
var util = require('./src/util');

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
    //命令例子
    //生成整个模块 [主命令] [模块名]
    //mod 'hello'
    //生成单个文件  [主命令] [子命令] [模块名] [任务名=]
    //mod addjs 'hello' 'form'
    
    //生成整个完整控件 [主命令] [控件名] [控件父类名=]
    //ui 'Computer' 'InputControl'
    //生成单个文件[主命令] [子命令] [控件名] [控件父类名=]
    //ui addjs 'Computer' 'InputControl'
    var mainCommand = args[0];
    //为了区别大小写， 参数需要在命令行输入时用引号包起来
    var subCommand = util.clearQuotes(args[1]);
    var arg1 = util.clearQuotes(args[2]); 
    var arg2 = util.clearQuotes(args[3]);
    mainCommand = mainCommand.toLowerCase();
    var commandList = ['addjs', 'addconfig', 'addcss', 'addhtml', 'adddemo'];
    if (mainCommand === 'mod') {
        var moduleName = arg1;
        var taskName = arg2;
        if (commandList.indexOf(subCommand) === -1) {
            moduleName = subCommand;
        }
        var Mod = require('./src/Mod.js');
        var mod = new Mod(moduleName);
        switch (subCommand) {
            case 'addjs':
                mod.addJs(taskName);
                break;
                break;
            case 'addcss':
                mod.addCss();
                break;
            case 'addhtml':
                mod.addHtml(taskName);
                break;
            case 'addconfig':
                mod.addConfig();
            default:
                mod.init();
        }
    }
    
    if (mainCommand === 'ui') {
        var ctrName = arg1;
        var ctrSupName = arg2;
        if (commandList.indexOf(subCommand) === -1) {
            ctrName = subCommand;
            ctrSupName = arg1;
        }
        var Control = require('./src/Control.js');
        var control = new Control(ctrName, ctrSupName);
        switch (subCommand) {
            case 'addjs':
                control.addJs();
                break;
            case 'addcss':
                control.addCss();
                break;
            case 'addhtml':
                control.addHtml();
                break;
            case 'adddemo':
                control.addDemo();
                break;
            default:
                control.init();
        }
    }
};

if (module === require.main) {
    exports.parse(process.argv);
}