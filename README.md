
#DSP 脚手架工具

### 生成模块命令       
<code>node main mod</code>

### 生成UI控件命令  
<code>node main ui</code>

###生成模块和UI控件
生成模块和UI控件其实做了下面三件事情
<ol>
    <li>生成模块所需要的文件，包含所需的*tpl*、*css*、*js*、*config* 四类文件</li>
    <li>解析生成的模板文件</li>
    <li>添加生成文件的引用路径</li>
</ol>

###配置
配置文件在**config**文件夹下面
<ul>
    <li>modConfig  ———模块配置文件</li>
    <li>uiConfig   ———UI控件配置文件</li>
    <li>userConfig ———用户信息配置文件</li>
</ul>

###模板
配置文件在**tpl**文件夹下面
<ul>
    <li>mod  ———模块的模板文件夹</li>
    <li>ui   ———UI控件的模板文件夹</li>
</ul>

###TODO
<ol>
    <li>UI控件的生成  --@李伟在开发中</li>
    <li>mock文件的生成</li>
    <li>使用npm包管理 --这需要把配置文件和模板文件都移动到项目的根目录下</li>
    <li>集成到edp</li>
    <li>做成公共通用工具</li>
</ol>



