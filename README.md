
#DSP 脚手架工具
该工具能让我们从开发时繁琐的文件创建、引用、配置中解放人力，把更多的精力关注到业务逻辑上

### 生成模块命令       
<code>node main mod</code>

### 生成UI控件命令  
<code>node main ui</code>

###详细说明
生成模块和UI控件其实做了下面三件事情
<ol>
    <li>生成模块所需要的文件，包含所需的*tpl*、*css*、*js*、*config* 四类文件</li>
    <li>解析生成的模板文件</li>
    <li>添加生成文件的引用路径</li>
</ol>

###配置
配置文件在**config**文件夹下面
<ul>
    <li>modConfig.js  ———模块配置文件</li>
    <li>uiConfig.js   ———UI控件配置文件</li>
    <li>userConfig.js ———用户信息配置文件</li>
</ul>

###模板
模板文件在**tpl**文件夹下面
<ul>
    <li>mod  ———模块的模板文件夹</li>
    <li>ui   ———UI控件的模板文件夹</li>
</ul>

###Quick Start

只需两步即可完成快速创建模块

1、例如在**config/modConfig.js**中进行了如下配置
<pre>
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
    //'list': {},
    //'detail': {}
};
</pre>
<p>配置中common为公共配置，现在只包含模块名称；</p>
<p>其他为任务配置， 目前常见的模块类型就**form**、**list**和**detail**三种；</p>
<p>假如只想生成其中一种类型, 那只需要把其他的注释掉即可；</p>
<p>当单个任务task中的*actionName*、*tplFileName*、*viewName*配置为空时，默认随机生成一个。</p>


2、在目录**tool/generator**下运行命令<code>node main mod</code>

**result:**

在目录**src/biz**下将会生成我们所需的开发模块文件,每个文件中已经写好了代码结构和常用方法
<pre>
-demo
    -css
        -demo.css
    -tpl
        -form.tpl.html
    -config.js
    -DemoForm.js
</pre>

demo.css成功在main.css中添加了应用路径，引用语句为<code>@import '../biz/demo/css/demo.less';</code>
config.js成功在moduleConfig.js中添加了应用路径，引用语句为<code>require('biz/demo/config');</code>

浏览器中打开<code>http://dsptest.baidu.com:8848/main.html#/demo/form </code>即可看到写好的模块

**ps:** **config/userConfig.js**文件为用户信息，配置好后一般不用更改

###TODO
<ol>
    <li>UI控件的生成  --@李伟在开发中</li>
    <li>mock文件的生成</li>
    <li>使用npm包管理 --这需要把配置文件和模板文件都移动到项目的根目录下</li>
    <li>集成到edp</li>
    <li>做成公共通用工具</li>
</ol>



