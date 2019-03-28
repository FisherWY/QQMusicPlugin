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
        var result = JSON.parse(res.data.substring(9,res.data.length-1))
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
    resolve(reqUrl)
  })
}

// QQ音乐播放链接生成封装
function playMusic(filename) {
  return new Promise((resolve, reject) => {
    getMusicKey(filename).then(function (res) {
      getMusicSrc(filename, res.data.data.items[0].vkey).then(function (res) {
        resolve(res)
      })
    })
  })
}

module.exports = {
  Promise,
  searchMusic: searchMusic,
  playMusic: playMusic,
}