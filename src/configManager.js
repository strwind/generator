
/**
 * @file 给新模板添加路径引用类
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var config = require('./config');
var util = require('./util');

var configManager = {
    /*
     * 模块的默认任务名字
     * @type {Array}
     */
    defaultModTaskArr: ['form', 'list', 'detail'],
    
    /*
     * 获取任务集合
     * @param {string=} modName 模块名字
     * @param {Array=} taskArr 任务数组
     * @return {Object} 详细的任务集合
     */
    getModTaskCollection: function (modName, taskArr) {
        var me = this;
        taskArr = taskArr || this.defaultModTaskArr;
        var taskCollection = {};
        taskArr.forEach(function (taskName, index) {
            var task = me.geModTask(modName, taskName);
            taskCollection[taskName] = task;
        });
        taskCollection.config = me.geModTask(modName);
        taskCollection.css = me.geModTask(modName);
        return taskCollection;
    },
    
    /*
     * 获取默认任务的配置
     * @param {string} modName 模块名字
     * @param {string=} taskName
     * @return {Object} task 任务的详细配置
     *          task.userName 用户名称
     *          task.email 用户邮箱
     *          task.createDate 创建日期
     *          task.modName 模块名称
     *          task.modNameCapitalize 首字母大写的模块名称
     *          task.taskName 任务名称
     *          task.actionName 生成的action的名称
     *          task.tplFileName 生成的html模板文件名, 默认为任务名
     *          task.viewName 生成的html模板内的target名字, 默认和actionName一致
     */
    geModtDefaultTask: function (modName, taskName) {
        var task = {};
        util.extend(task, this.userInfo);
        util.extend(task, {
            'modName': modName,
            'modNameCapitalize': util.toUpperCase(modName),
            'createDate': util.getFormatDate()
        });
        if (taskName) {
            var actionName = util.toUpperCase(modName) + util.toUpperCase(taskName);
            util.extend(task, {
                'taskName': taskName,
                'actionName': actionName,
                'tplFileName': taskName,
                'viewName': actionName,
            });
         }
        return task;
    },
    
    /*
     * 获取单个任务的配置
     * @param {string=} modName 模块名字
     * @param {string=} taskName
     * @return {Object} task 任务的详细配置
     *          task.userName 用户名称
     *          task.email 用户邮箱
     *          task.createDate 创建日期
     *          task.modName 模块名称
     *          task.modNameCapitalize 首字母大写的模块名称
     *          task.taskName 任务名称
     *          task.actionName 生成的action的名称
     *          task.tplFileName 生成的html模板文件名, 默认为任务名
     *          task.viewName 生成的html模板内的target名字, 默认和actionName一致
     */
    geModTask: function (modName, taskName) {
        //使用命令行时
        if (modName) {
            return this.geModtDefaultTask(modName, taskName);
        }
        //使用config的配置时, 强行覆盖默认配置
        var task = {};
        util.extend(task, this.module.common);
        //TODO 命令和配置都没有modName时， 显示验证信息
        util.extend(task, this.geModtDefaultTask(task.modName, taskName));
        taskName && util.extend(task, this.module[taskName], true);
        return task;
    }
};

util.extend(configManager, config);

module.exports = exports = configManager;
