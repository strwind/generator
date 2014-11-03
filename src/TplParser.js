
/**
 * @file 替换模板中的变量
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date $Date: 2014-10-30 
 */
var handlebars = require('handlebars');

function TplParser () {
    
}

TplParser.prototype = {
    compile: function (source, data) {
        var template = handlebars.compile(source);
        return template(data);
    }
};

module.exports = exports = TplParser;
