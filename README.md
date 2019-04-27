# QQ音乐小程序插件

## 该插件用于在小程序中使用QQ音乐的搜索以及播放功能

#### v0.1更新：搜索音乐的返回结果中，已将需要付费播放的歌曲从列表中去除，向有专辑图片的音乐对象添加了专辑图片albumImg。

### 使用方法

1. 前往[下载页面](https://github.com/FisherWY/QQMusicPlugin/releases)，下载最新v0.1版本，将下载的文件解压放在小程序utils文件夹中
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step1.png)
2. 前往微信公众平台->开发->开发设置->服务器域名。添加以下request合法域名
>https://c.y.qq.com
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step2.png)
3. 在小程序页面js文件中引用qqMusicTools.js，注意相对路径，这里演示的页面路径为"/pages/index/"：
```
const musicTool = require("../../utils/QQMusicPlugin/qqMusicTools.js")
```
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step3.png)
4. 搜索音乐接口searchMusic接受3个参数：page, number, keyword。分别表示搜索的页码，每页多少条搜索结果，搜索关键字。（使用PromiseJS语法）
```
musicTool.searchMusic(1, 10, "绿色").then(function(searchRes) {
	console.log(searchRes)
})
```
搜索接果如下图：
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step4.png)
5. 获取播放音乐链接接口playMusic接受1个参数：filename。表示要播放的音乐的文件名，文件名来自searchMusic结果中的"songmid"。（使用PeomiseJS语法）
```
musicTool.playMusic("0021rBlZ1gQiLy").then(function(playRes) {
	console.log(playRes)
})
```
返回结果如下图：
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step5.png)
6. 获取音乐专辑图片接口getAlbumImage接受1个参数：albumId。该参数来自searchMusic结果中的"albumId"。（使用Promise语法）（在v0.1版本中，搜索音乐接口已经集成了该接口，专辑图片字段名为"albumImg"）
```
musicTool.getAlbumImage(6271293).then(function(res) {
	console.log(res)
})
```
返回结果如下图：
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step6.png)
7. 播放音乐，这里使用BackgroundAudioManager演示
```
const bgAudioManager = wx.getBackgroundAudioManager()
bgAudioManager.title = 'Music'
bgAudioManager.src = playRes
```
8. 代码整合到一块，整个使用流程如下。（需要注意异步问题）：
```
const bgAudioManager = wx.getBackgroundAudioManager();
musicTool.searchMusic(1, 10, "绿色").then(function(searchRes) {
  console.log(searchRes)
})
musicTool.playMusic("0021rBlZ1gQiLy").then(function(playRes) {
  console.log(playRes)
  bgAudioManager.title = 'Music'
  bgAudioManager.src = playRes
})
musicTool.getAlbumImage(6271293).then(function(res) {
	console.log(res)
})
```
9. 特别说明:
> 1.当要播放的音乐属于收费音乐时无法播放
> 2.注意js中的异步问题
> 3.微信小程序的BackgroundAudioManager存在部分链接无法播放的问题，详细原因参见[JabinGP的简书](https://www.jianshu.com/p/9553cdbc750d)