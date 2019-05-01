var Promise = require('./es6-promise.min.js')

// QQ音乐搜索请求
function searchMusic(page, number, keyword) {
  return new Promise((resolve, reject) => {
    var reqUrl = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p="+page+"&n="+number+"&w="+keyword
    wx.request({
      url: reqUrl,
      method: 'GET',
      success: function (res) {
        console.log("at music search: 音乐搜索成功")
        // console.log(res)
        // 将返回结果中callback去掉
        var result = JSON.parse(res.data.substring(9,res.data.length-1))
        for (var i=0; i<result.data.song.list.length; i++) {
          // 如果这首歌需要付费播放，则将这首歌从列表中去除
          if (result.data.song.list[i].pay.payplay == 1) {
            result.data.song.list.splice(i,1)
            continue
          }
          // 如果albumid为0，即没有专辑图片，则不添加albumImg
          if (result.data.song.list[i].albumid == 0) {
            continue
          } else {
            // 如果专辑图片存在，为歌曲添加专辑图片地址
            result.data.song.list[i].albumImg = 'http://imgcache.qq.com/music/photo/album_300/' + result.data.song.list[i].albumid % 100 + '/300_albumpic_' + result.data.song.list[i].albumid + '_0.jpg'
          }
        }
        resolve(result)
      },
      fail: function (res) {
        console.log("at music search: 音乐搜索失败")
        // console.log(res)
        reject(res.data)
      }
    })
  })
}

// QQ音乐生成播放token请求
function getMusicKey(filename) {
  return new Promise((resolve, reject) => {
    var reqUrl = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&guid=126548448&songmid="+filename+"&filename=C400"+filename+".m4a"
    wx.request({
      url: reqUrl,
      method: 'GET',
      success: function (res) {
        console.log("at get music key: 音乐token获取成功")
        // console.log(res)
        resolve(res)
      },
      fail: function (res) {
        console.log("at get music key: 音乐token获取失败")
        // console.log(res)
        reject(res)
      }
    })
  })
}

// QQ音乐播放链接生成
function getMusicSrc(filename, token) {
  return new Promise((resolve, reject) => {
    var reqUrl = "http://ws.stream.qqmusic.qq.com/C400" + filename + ".m4a?guid=126548448&vkey=" + token + "&fromtag=0"
    console.log("at get music src: 音乐播放链接生成成功")
    resolve(reqUrl)
  })
}

// QQ音乐播放链接生成封装
function playMusic(filename) {
  return new Promise((resolve, reject) => {
    getMusicKey(filename).then(function (res) {
      getMusicSrc(filename, res.data.data.items[0].vkey).then(function (res) {
      	console.log("at play music: 返回音乐播放链接")
        resolve(res)
      })
    })
  })
}

// QQ音乐获取专辑图片,接受参数为albumId
function getAlbumImage(albumId) {
  return new Promise((resolve, reject) => {
    var id = parseInt(albumId)
    var imgUrl = 'http://imgcache.qq.com/music/photo/album_300/'+id%100+'/300_albumpic_'+id+'_0.jpg'
    console.log("at get album image: 返回音乐专辑图片链接")
    resolve(imgUrl)
  })
}

// QQ音乐获取TOP100歌单
function getTopMusic() {
	return new Promise((resolve, reject) => {
		var getUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923"
		wx.request({
			url: getUrl,
			method: 'get',
			success: function(res) {
				console.log("at get top music: 获取音乐Top100歌单成功")
				// console.log(res)
				resolve(res)
			},
			fail: function(res) {
				console.log("at get top music: 获取音乐Top100歌单失败")
				// console.log(res)
				reject(res)
			}
		})
	})
}

// QQ音乐随机推荐
function randomRecommend() {
	return new Promise((resolve, reject) => {
		var getUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472"
		wx.request({
			url: getUrl,
			method: 'GET',
			success: function(res) {
				console.log("at random recommend: 获取随机推荐歌曲成功")
				// console.log(res)
				resolve(res)
			},
			fail: function(res) {
				console.log("at random recommend: 获取随机推荐歌曲失败")
				// console.log(res)
				reject(res)
			}
		})
	})
}

module.exports = {
  Promise,
  searchMusic: searchMusic,
  playMusic: playMusic,
  getAlbumImage: getAlbumImage,
  getTopMusic: getTopMusic,
  randomRecommend: randomRecommend
}