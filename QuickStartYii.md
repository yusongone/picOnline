Yii 快速入门
===========
首先具备的基本知识是**Controller**和 **Action**  
 **Action**：代表一个请求，他可以理解为URL，就是每次向服务器做交互，便是一个Action  
 **Controller**：代表一系列请求的集合，即Controller是Action集合。
 Yii中典型的URL如下
 >http://domain.com/site/index  

 其中*site*为Controller，*index*为action

 我怎么才能显示我的页面？
 ----------------------
 如果你做好了页面，想在服务器上展示出来。那么把你的页面放在*/protected/views/[controller]/[filename]*下。并重命名成.php文件。
 然后修改一下Controller文件，做一下关联.
 比如我想展示一个index.php页面,那么暂且放在Site下面吧，也就是*Site/Controller*  

1. 在*/protected/views/*下新建site文件夹，如果没有的话。

2. 把你的文件CP到*/protected/view/site/*下

3. 找到*/protected/controller/SiteController.php*文件，向其中添加代码

 ```php
 public function actionIndex(){

	     $this->render('index');    
		     
 }
```
这样便可以通过浏览器访问你新作的页面了。

