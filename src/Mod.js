
/**
 * @file 生成ER模块或指定action
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date $Date: 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var util = require('./util');
var modCfg = require('../config/modConfig');
var userCfg = require('../config/userConfig');
var FileOperator = require('./FileOperator');
var fileOpr = new FileOperator();
var PathRef = require('./PathRef');
var pathRef = new PathRef();

function modName () {
    this.bizPath = util.getBizPath();
    this.modPath = util.getModPath();
    this.modTplPath = util.getModTplPath();
}

modName.prototype = {
    
    init: function () {
        var me = this;
        var taskArr = Object.keys(modCfg).slice(1);
        taskArr.forEach(function (taskName, index) {
            var task = modCfg[taskName];
            task.taskName = taskName;
            util.extend(task, modCfg.common);
            task.modNameCapitalize = util.toUpperCase(task.modName);
            util.extend(task, userCfg);
            //默认值
            var random = util.toUpperCase(taskName) + Date.now();
            util.extend(task, {
                'hasCss': true,
                'actionName': random,
                'tplFileName': util.toLowerCase(random),
                'viewName': task.actionName || random
            });
            me.process(task);
        });
    },
    
    /*
     * 生单个任务的文件
     * @param {string} task.modName 模块名称
     * @param {string} task.actionName 类名
     * @param {string} task.tplFileName 模板文件名
     * @param {Object} task 模板所需的数据
     * @public
     */
    process: function (task) {
        this.genModFile('config', 'config.js', task);
        this.genModFile(task.actionName, task.taskName + '.js', task);
        this.genModFile(task.tplFileName, task.taskName + '.html', task, 'html');
        if (task.hasCss) {
            this.genModFile(task.modName, 'action.less', task, 'css');
        }
    },
    
    /*
     * 创建一个文件 
     * @param {string} filename 文件名称
     * @param {string} tplname 模板名称
     * @param {Object} tplData 模板所需的数据
     * @param {string=} type 文件类型
     * @public
     */
    genModFile: function (filename, tplname, tplData, type) {
        type = type || 'js';
        var modPath = this.modPath;
        //生成模块目录
        if (!fs.existsSync(this.modPath)) {
            fs.mkdirSync(this.modPath);
        }
        switch (type) {
            case 'js':
                filename = filename + '.js';
                break;
            case 'less':
            case 'css':
                filename = filename + '.less';
                modPath = path.join(modPath, '/css');
                break;
            case 'html':
                filename = filename + '.tpl.html';
                modPath = path.join(modPath, '/tpl');
                break;
        }
        //生成子目录
        if (!fs.existsSync(modPath)) {
            fs.mkdirSync(modPath);
        }
        var filePath = path.join(modPath, filename);
        var tplPath = path.join(this.modTplPath, tplname);
        if (fs.existsSync(filePath)) {
            return;
        }
        fileOpr.createFile(filePath, tplPath, tplData, function (err) {
            if (err) {
                throw err;
            }
            if (filename === 'config.js') {
                pathRef.addCfgRef(tplData.modName);
            }
            if (type === 'css') {
                pathRef.addCssRef(tplData.modName);
            }
        });
    }
};

module.exports = exports = modName;
