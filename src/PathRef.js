
/**
 * @file 给新模板添加路径引用类
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var FileOperator = require('./FileOperator');
var fileOpr = new FileOperator();
function PathRef() {
    /*
     * 添加path的容器
     * @type {Object}
     */
    this.container = {};
}


PathRef.prototype = {
    
    /*
     * 添加文件的引用路径
     * @param {string} target 目标路径
     * @param {string} content 要添加的内容
     * @param {number} line 行号
     * @param {function=} callback 回调函数
     * @public
     */
    addRef: function (target, content, line, callback) {
        var me = this;
        fileOpr.readFileByArray(target, function(err, dataArr) {
            if (dataArr.indexOf(content) !== -1 
                || me.container[content]) {
                return;
            }
            me.container[content] = 1;
            if (line < 0) {
                line = dataArr.length + (line + 1);
            }
            else {
                line -= 1;
            }
            dataArr.splice(line, 0, content);
            fs.writeFile(target, dataArr.join('\n'), function (err, data) {
                console.log('添加路径成功, 在文件%s中第%s行', target, line + 1);
                callback && callback();
            });
        });
    }
};

module.exports = exports = PathRef;
