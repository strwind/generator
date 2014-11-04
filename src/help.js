
/**
 * @file 帮助文件
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

var help = {
    defaultInfo: function () {
        console.log('命令：node main mod  --生成模块文件并添加相应引用，配置文件在config文件夹下');
        console.log('命令：node main ui   --生成控件文件并添加相应引用，配置文件在config文件夹下');
    },
    
    dumpVersion: function () {
        console.log('version --0.9');
    }
};

module.exports = exports = help;