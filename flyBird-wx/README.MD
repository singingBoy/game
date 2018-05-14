## 接入微信小游戏

> 微信端没有window、document对象

> canvas创建：canvas = wx.createCanvas();

> Image创建：canvas = wx.createImage();

> 图片加载：

╭(′▽`)╯ 相对路径找不到图片：
<img src="http://p8q85ndgc.bkt.clouddn.com/%E5%B0%8F%E6%B8%B8%E6%88%8F%E5%9B%BE%E7%89%87%E5%BC%95%E5%85%A5.png" />

╭(′▽`)╯原因:

[API：文件系统有两类文件](https://developers.weixin.qq.com/minigame/dev/tutorial/ability/file-system.html)：

代码包文件`访问方式是从项目根目录开始写文件路径。`  和 本地文件`wx.getFileSystemManager()`。

>代码包文件指的是在项目目录中添加的文件。由于代码包文件大小限制，代码包文件适用于放置首次加载时需要的文件，对于内容较大或需要动态替换的文件，不推荐用添加到代码包中，推荐在小游戏启动之后再用下载接口下载到本地。`

╭(′▽`)╯解决办法:

1、外联地址：http:xxxx
2、根目录访问：
<img src='https://developers.weixin.qq.com/minigame/dev/tutorial/images/code-package.png' />

> 微信开发工具上：window、addEvenListener 可以成功！但真机上不可用

╭(′▽`)╯解决办法: 

1、如 [Adapter](https://developers.weixin.qq.com/minigame/dev/tutorial/base/adapter.html) 进行封装

2、`wx.onTouchStart(touches,changedTouches,timeStamp)` 等微信事件方法

> 微信小游戏限制了文件格式，不符合格式的不能上传成功，找不到资源！

> 小游戏只有真正绘制了首帧之后，才会隐藏 loading 页，以减少用户看到黑屏的概率。所以开发者最好在游戏开始时进行一次简单的绘制，来减少用户等待的时间
