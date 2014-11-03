
/**
 * @file 常用操作util
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date $Date: 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var modCfg = require('../config/modConfig');

var util = {
    
    /**
     * 获取项目src路径
     * @return {string}
     */
    getSrcPath: function () {
        return path.join(process.cwd(), '../../src');
    },
    
    /**
     * 获取项目biz路径
     * @return {string}
     */
    getBizPath: function () {
        return path.join(this.getSrcPath(), '/biz');
    },
    
    /**
     * 获取新建的模块路径
     * @return {string}
     */
    getModPath: function () {
        return path.join(this.getBizPath(), modCfg.common.modName);
    },
    
    /**
     * 获取模板路径
     * @return {string}
     */
    getModTplPath: function () {
        return path.join(process.cwd(), '/tpl/mod/');
    },
    
    /*
     * 扩展对象
     * @param {Object} ObjA
     * @param {Object} ObjB
     * @return {Object} ObjA
     */
    extend: function (objA, objB) {
        for(var key in objB) {
            if (!objA.hasOwnProperty(key)) {
                objA[key] = objB[key];
            }
        }
        return objA;
    },
    
    /*
     * 让字符串首字母大写
     * @param {string} str
     * @return {string}
     */
    toUpperCase: function (str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
    
    /*
     * 让字符串首字母小写
     * @param {string} str
     * @return {string}
     */
    toLowerCase: function (str) {
        return str.slice(0, 1).toLowerCase() + str.slice(1);
    },
    
    /*
     * 过滤掉数组尾部的空项
     * @param {Array} arr
     * @return {Array}
     */
    trimArrayEnd: function (arr) {
        var len = arr.length;
        for (var i = len - 1; i > -1; i--) {
            if (!arr[i] && arr[i] !== 0) {
                arr.splice(i, 1);
            }
            else {
                return arr;
            }
        }
    },
    
    /*
     * 获取格式化后的日期  比如2014-11-03 
     * @return {string}
     */
    getFormatDate: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        month = parseInt(month, 10) + 1;
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }
    
};
module.exports = exports = util;