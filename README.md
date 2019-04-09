# QQ音乐小程序插件

## 该插件用于在小程序中使用QQ音乐的搜索以及播放功能

### 使用方法

1. 克隆项目到本地，将"es6-promise.min.js","qqMusicTools.js"文件放在小程序utils文件夹中
![](https://github.com/FisherWY/QQMusicPlugin/blob/master/pic/step1.png)
2. 前往微信公众平台=>开发=>开发设置=>服务器域名。添加以下request合法域名
>https://c.y.qq.com
3. 在小程序页面js文件中引用qqMusicTools.js：
```
var musicTool = require("../../utils/qqMusicTools.js")
```
4. 搜索音乐接口searchMusic接受3个参数：page, number, keyword。分别表示搜索的页码，每页多少条搜索结果，搜索关键字。（使用PromiseJS语法）
```
musicTool.searchMusic(1, 10, "墙纸").then(function(searchRes) {
	console.log(searchRes)
})
```
5. 获取播放音乐链接接口playMusic接受1个参数：filename。表示要播放的音乐的文件名，文件名来自searchMusic结果中的"songmid"。（使用PeomiseJS语法）
```
musicTool.playMusic("001wJ6uF2VCg8P").then(function(playRes) {
	console.log(playRes)
})
```
6. 获取音乐专辑接口getAlbumImage接受1个参数：albumId。该参数来自searchMusic结果中的"albumId"。（使用Promise语法）
```
musicTool.getAlbumImage(8220).then(function(res) {
	console.log(res)
})
```
7. 播放音乐，这里使用BackgroundAudioManager演示
```
const bgAudioManager = wx.getBackgroundAudioManager()
bgAudioManager.title = 'Music'
bgAudioManager.src = playRes
```
8. 代码整合到一块：
```
const bgAudioManager = wx.getBackgroundAudioManager();
musicTool.searchMusic(1, 10, "墙纸").then(function(searchRes) {
  console.log(searchRes)
})
musicTool.playMusic("001wJ6uF2VCg8P").then(function(playRes) {
  console.log(playRes)
  bgAudioManager.title = 'Music'
  bgAudioManager.src = playRes
})
musicTool.getAlbumImage(8220).then(function(res) {
	console.log(res)
})
```
9. 特别说明:
> 1.当要播放的音乐属于收费音乐时无法播放