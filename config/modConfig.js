
/**
 * @file 模块信息配置
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

/*
 * 配置中common为公共配置，现在只包含模块名称
 * 其他为任务配置， 目前常见的模块类型就form、list和detail三种, 假如只想生成其中一种类型, 那只需要把其他的注释掉即可
 * 当单个任务task中的actionName tplFileName viewName为空时 默认随机生成一个
 */
var config = {
    'common': {
        "modName": "demo",  //模块名称
        "hasCss": true     //可选，是否需要css文件，默认为true
    },
    
    'form': {
        "actionName": "DemoForm", //action名称
        "tplFileName": "form",  //tpl.html文件名称
        "viewName": "DemoForm", //可选，view的名称 默认和actionName一致
    },
    'list': {
        "actionName": "DemoList", 
        "tplFileName": "list", 
    }
    ,
    'detail': {
        /*
        "actionName": "DemoDetail", 
        "tplFileName": "detail", 
        */
    }
};

module.exports = exports = config;