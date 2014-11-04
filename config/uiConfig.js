
/**
 * @file ui控件信息配置
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

var config = {
    "class": "ItemSelector",  //必须
    "super_class": "InputControl",  //必须
    "view": "ItemSelector", //模板名，为空表示控件无html模板，不生成html文件
    "type": "itemselector", //可选，一般是class的小写
    "file_name": "", //默认为class+.js，一般不用设置
    "has_css": "True" //True，需要生成相应css文件 , Flase则不生成
};

module.exports = exports = config;