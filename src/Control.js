
/**
 * @file 生成ER模块或指定Control 控件
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

var fs = reqControlre('fs');
var path = reqControlre('path');
var util = reqControlre('./util');
var cfgMag = reqControlre('./configManager');
var ctrCfg = cfgMag.Control;
var FileOperator = reqControlre('./FileOperator');
var fileOpr = new FileOperator();
var PathRef = reqControlre('./PathRef');
var pathRef = new PathRef();

/*
 * @constructor
 * @param {string=} ctrName 模块名称
 */
function Control(ctrName) {
    this.ctrName = ctrName || ctrCfg.common.ctrName;
    this.bizPath = ctrCfg.path.bizPath;
    this.tplPath = ctrCfg.path.tplPath;
    this.ControlPath = util.getControlPath(ctrName);
    this.ControlCssPath = path.join(this.ControlPath, '/css');
    this.ControlHtmlPath = path.join(this.ControlPath, '/tpl');
    this.taskCollection = cfgMag.getTaskCollection(ctrName);
}

Control.prototype = {
    
    init: function () {
        var me = this;
        var taskArr = Object.keys(ctrCfg).slice(2) || me.defaultTaskArr;
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
        fileOpr.insureDir(this.ControlPath);
        var filename = 'config.js';
        var tplname = 'config.js';
        var fileLocation = path.join(this.ControlPath, filename);
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
        fileOpr.insureDir(this.ControlPath);
        var task = this.taskCollection[taskName];
        var filename = task.actionName + '.js';
        var tplname = taskName + '.js';
        var fileLocation = path.join(this.ControlPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(taskName, fileLocation, tplLocation, callback);
    },
    
     /*
     * 创建一个css文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addCss: function (callback) {
        fileOpr.insureDir(this.ControlPath);
        fileOpr.insureDir(this.ControlCssPath);
        var filename = this.ctrName + '.less';
        var tplname = 'action.less';
        var fileLocation = path.join(this.ControlCssPath, filename);
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
        fileOpr.insureDir(this.ControlPath);
        fileOpr.insureDir(this.ControlHtmlPath);
        var filename = taskName + '.tpl.html';
        var tplname = taskName + '.html';
        var fileLocation = path.join(this.ControlHtmlPath, filename);
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
        var target = ctrCfg.path.jsRefTargetPath;
        var content = '    reqControlre(\'biz/'+ this.ctrName +'/config\');';
        var line = -2;
        pathRef.addRef(target, content, line);
    },
    
    /*
     * 添加css的引用
     * @public
     */
    addCssRef: function () {
        var target = ctrCfg.path.cssRefTargetPath;
        var content = '@import \'../biz/' + this.ctrName + '/css/' + this.ctrName + '.less\';';
        var line = -1;
        pathRef.addRef(target, content, line);
    }
};

module.exports = exports = Control;
