
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
    //检查配置和运行环境
    //FIXME 为了保证require运行时加载，所以用的时候才require
    require('./src/check').init(args);
    
    //业务命令处理入口
    require('./src/command').init(args);
};

if (module === require.main) {
    exports.parse(process.argv);
}