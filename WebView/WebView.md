## WebView是什么？

WebView是一个基于webkit引擎，可以解析DOM元素，展示html页面的控件，和浏览器展示页面的原理相似。（Chrome-webkit引擎；Firefox-Gecko引擎）



**基于WebView的混合开发，就是在android/ios的原生app中，通过WebView控件嵌入Web页面**



### 混合开发的原因

1. 用h5开发的内容页面可以跨平台。（无论安卓还是苹果，淘宝app中都是h5页面）一次开发，多系统适配；
2. Web更新方式为线上及时更新，无需下载安装补丁包。（比如游戏中的活动公告弹窗，可能是WebView嵌入的Web页面）
3. h5性能不断提高。对于电商类app，性能差距几乎可以忽视；但如果是游戏，牵扯到渲染引擎性能的问题，h5就显得劣势了。