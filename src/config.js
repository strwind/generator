
/**
 * @file 模块信息配置
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */


var config = {
    
    'userInfo': {
        "userName": "yaofeifei",
        "email": "yaofeifei@baidu.com"
    },
    
    /*
     * 配置中common为公共配置，现在只包含模块名称
     * 其他为任务配置， 目前常见的模块类型就form、list和detail三种, 假如只想生成其中一种类型, 那只需要把其他的注释掉即可
     * 当单个任务task中的actionName tplFileName viewName为空时 默认随机生成一个
     */
    'module': {
        'path': {
            'bizPath': 'D:/work/DSP/src/biz',
            'tplPath': 'D:/work/DSP/tool/generator/tpl/mod',
            'cssRefTargetPath': 'D:/work/DSP/src/css/main.less',
            'jsRefTargetPath': 'D:/work/DSP/src/biz/moduleConfig.js',
        },
        
        'common': {
            "modName": "demo"  //模块名称
        }
        /*
        ,
        
        'form': {
            "actionName": "DemoForm", //action名称
            "tplFileName": "form",  //tpl.html文件名称
            "viewName": "DemoForm", //可选，view的名称 默认和actionName一致
        },
        'list': {
            "actionName": "DemoList", 
            "tplFileName": "list", 
        },
        'detail': {
            "actionName": "DemoDetail", 
            "tplFileName": "detail"
        }
        */
    },
    
    'control': {
        'path': {
            'bizPath': 'D:/work/DSP/src/biz',
            'tplPath': 'D:/work/DSP/tool/generator/tpl/mod',
            'cssRefTargetPath': 'D:/work/DSP/src/css/main.less',
            'jsRefTargetPath': 'D:/work/DSP/src/biz/moduleConfig.js',
        },
        'ItemSelector': {
            "class": "ItemSelector",  //必须
            "superClass": "InputControl",  //必须
            "view": "ItemSelector", //模板名，为空表示控件无html模板，不生成html文件
            "type": "itemselector", //可选，一般是class的小写
            "file_name": "", //默认为class+.js，一般不用设置
            "has_css": "True" //True，需要生成相应css文件 , Flase则不生成
        }
        
    }
};

module.exports = exports = config;