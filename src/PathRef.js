
/**
 * @file 给新模板添加路径引用类
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var util = require('./util');
var FileOperator = require('./FileOperator');
var fileOpr = new FileOperator();
function PathRef() {
    this.cfgPath = path.join(util.getBizPath(), '/moduleConfig.js');
    this.cssPath = path.join(util.getSrcPath(), '/css/main.less');
    /*
     * 添加path的容器
     * @type {Object}
     */
    this.container = {};
}


PathRef.prototype = {
    /*
     * 添加config配置文件的引用路径
     * @param {string} modName 模块名字
     * @public
     */
    addCfgRef: function (modName) {
        var me = this;
        var content = '    require(\'biz/'+ modName +'/config\');';
        fileOpr.readFileByArray(me.cfgPath, function(err, dataArr) {
            if (dataArr.indexOf(content) !== -1 
                || me.container[content]) {
                return;
            }
            me.container[content] = 1;
            //把新的引用添加到文件的倒数第二行
            var line = dataArr.length - 1;
            dataArr.splice(line, 0, content);
            fs.writeFile(me.cfgPath, dataArr.join('\n'), function (err, data) {
                console.log('添加config.js路径成功, 在文件%s中第%s行', me.cfgPath, line + 1);
            });
        });
    },
    
    /*
     * 添加css文件的引用路径
     * @param {string} modName 模块名字 一般css的名字和模块名字一样
     * @public
     */
    addCssRef: function (modName) {
        var me = this;
        var content = '@import \'../biz/' + modName + '/css/' + modName + '.less\';';
        fileOpr.readFileByArray(me.cssPath, function(err, dataArr) {
            if (dataArr.indexOf(content) !== -1
                || me.container[content]) {
                return;
            }
            me.container[content] = 1;
            //把新的引用添加到文件的倒数第一行
            dataArr.splice(dataArr.length, 0, content);
            fs.writeFile(me.cssPath, dataArr.join('\n'), function (err, data) {
                console.log('添加css路径成功, 在文件%s中第%s行', me.cssPath, dataArr.length);
            });
        });
    }
};

module.exports = exports = PathRef;
