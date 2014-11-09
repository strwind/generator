
/**
 * @file 生成ER模块或指定action
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var util = require('./util');
var cfgMag = require('./configManager');
var modCfg = cfgMag.module;
var FileOperator = require('./FileOperator');
var fileOpr = new FileOperator();
var PathRef = require('./PathRef');
var pathRef = new PathRef();

/*
 * @constructor
 * @param {string=} modName 模块名称
 */
function Mod(modName) {
    this.modName = modName || modCfg.common.modName;
    this.bizPath = modCfg.path.bizPath;
    this.tplPath = modCfg.path.tplPath;
    this.modPath = util.getModPath(modName);
    this.modCssPath = path.join(this.modPath, '/css');
    this.modHtmlPath = path.join(this.modPath, '/tpl');
    this.taskCollection = cfgMag.getModTaskCollection(modName);
}

Mod.prototype = {
    
    init: function () {
        var me = this;
        var taskArr = Object.keys(modCfg).slice(2);
        taskArr = taskArr.length ? task : cfgMag.defaultModTaskArr;
        taskArr.forEach(function (taskName, index) {
            me.addJs(taskName);
            me.addHtml(taskName);
        });
        this.addConfig(function () {
            me.addCfgRef();
        });
        this.addCss(function () {
            me.addCssRef();
        });
    },
    
    /*
     * 创建一个config文件
     * @param {Function=} callback 回调函数
     * @public
     */
    addConfig: function (callback) {
        fileOpr.insureDir(this.modPath);
        var filename = 'config.js';
        var tplname = 'config.js';
        var fileLocation = path.join(this.modPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile('config', fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个js文件 
     * @param {string} taskName 任务名
     * @param {Function=} callback 回调函数
     * @public
     */
    addJs: function (taskName, callback) {
        fileOpr.insureDir(this.modPath);
        var task = this.taskCollection[taskName];
        var filename = task.actionName + '.js';
        var tplname = taskName + '.js';
        var fileLocation = path.join(this.modPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(taskName, fileLocation, tplLocation, callback);
    },
    
     /*
     * 创建一个css文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addCss: function (callback) {
        fileOpr.insureDir(this.modPath);
        fileOpr.insureDir(this.modCssPath);
        var filename = this.modName + '.less';
        var tplname = 'action.less';
        var fileLocation = path.join(this.modCssPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile('css', fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个html文件 
     * @param {string} taskName 任务名
     * @param {Function=} callback 回调函数
     * @public
     */
    addHtml: function (taskName, callback) {
        fileOpr.insureDir(this.modPath);
        fileOpr.insureDir(this.modHtmlPath);
        var filename = taskName + '.tpl.html';
        var tplname = taskName + '.html';
        var fileLocation = path.join(this.modHtmlPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(taskName, fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个文件 
     * @param {string} filename 文件名称
     * @param {string} tplname 模板名称
     * @param {string=} type 文件类型
     * @public
     */
    genFile: function (taskName, fileLocation, tplLocation, callback) {
        var parseData = this.taskCollection[taskName];
        fileOpr.createFile(fileLocation, tplLocation, parseData, function (err) {
            if (err) {
                throw err;
            }
            callback && callback();
        });
    },
    
    /*
     * 添加配置的引用
     * @public
     */
    addCfgRef: function () {
        var target = modCfg.path.jsRefTargetPath;
        var content = '    require(\'biz/'+ this.modName +'/config\');';
        var line = -2;
        pathRef.addRef(target, content, line);
    },
    
    /*
     * 添加css的引用
     * @public
     */
    addCssRef: function () {
        var target = modCfg.path.cssRefTargetPath;
        var content = '@import \'../biz/' + this.modName + '/css/' + this.modName + '.less\';';
        var line = -1;
        pathRef.addRef(target, content, line);
    }
};

module.exports = exports = Mod;
