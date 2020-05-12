export default {
  install (Vue, options) {
    Vue.prototype.util = {
      // 获取连接参数值
      getUrlParams (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        }
        return null
      },
      // 判断设备处于PC还是移动端
      testBrowserType () {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      },
      // 判断安卓或者ios终端
      testMobileType () {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        if (isAndroid) {
          return 'android'
        } else if (isiOS) {
          return 'ios'
        } else {
          return 'pc'
        }
      },
      // 校验手机号码
      isPhone (val) {
        var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
        if (!patrn.test(val) || val === '') {
          return false
        } else {
          return true
        }
      },
      // 检验车牌号
      isCarNum (val) {
        var patrn = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/
        var patrn2 = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))$/
        if (!patrn.test(val) && !patrn2.test(val)) {
          return false
        } else {
          return true
        }
      },
      // 校验车架号
      isVehicle (val) {
        var patrn = /^[A-HJ-NP-Za-hj-np-z0-9]+$/
        if (!patrn.test(val) || val === '') {
          return false
        } else {
          return true
        }
      },
      // 检验身份证号码
      isSfz (idcard) {
        var Errors = [1, '身份证号码位数不对', '出生日期错误', '身份证号码错误', '身份证地区非法']
        var area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: 'xinjiang', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
        var Y, JYM
        var S, M, ereg, Err
        var arr = []
        arr = idcard.split('')
        if (area[parseInt(idcard.substr(0, 2))] == null) {
          Err = Errors[4]
          return Err
        }
        switch (idcard.length) {
          case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
            } else {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
              Err = Errors[0]
            } else {
              Err = Errors[2]
            }
            return Err
          case 18:
            if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
              ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
            } else {
              ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {
              S = (parseInt(arr[0]) + parseInt(arr[10])) * 7 + (parseInt(arr[1]) + parseInt(arr[11])) * 9 + (parseInt(arr[2]) + parseInt(arr[12])) * 10 + (parseInt(arr[3]) + parseInt(arr[13])) * 5 + (parseInt(arr[4]) + parseInt(arr[14])) * 8 + (parseInt(arr[5]) + parseInt(arr[15])) * 4 + (parseInt(arr[6]) + parseInt(arr[16])) * 2 + parseInt(arr[7]) * 1 + parseInt(arr[8]) * 6 + parseInt(arr[9]) * 3
              Y = S % 11
              M = 'F'
              JYM = '10X98765432'
              M = JYM.substr(Y, 1)
              if (M === arr[17]) {
                Err = Errors[0]
              } else {
                Err = Errors[3]
              }
            } else {
              Err = Errors[2]
            }
            return Err
          default:
            Err = Errors[1]
            return Err
        }
      },
      // 判断输入框是否有表情
      isEmojiCharacter (substring) {
        for (var i = 0; i < substring.length; i++) {
          const hs = substring.charCodeAt(i)
          if (hs >= 0xd800 && hs <= 0xdbff) {
            if (substring.length > 1) {
              const ls = substring.charCodeAt(i + 1)
              var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
              if (uc >= 0x1d000 && uc <= 0x1f77f) {
                return true
              }
            }
          } else if (substring.length > 1) {
            const ls = substring.charCodeAt(i + 1)
            if (ls === 0x20e3) {
              return true
            }
          } else {
            if (hs >= 0x2100 && hs <= 0x27ff) {
              return true
            } else if (hs >= 0x2B05 && hs <= 0x2b07) {
              return true
            } else if (hs >= 0x2934 && hs <= 0x2935) {
              return true
            } else if (hs >= 0x3297 && hs <= 0x3299) {
              return true
            } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
              hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
              return true
            }
          }
        }
      },
      // 日期格式化
      dateFormat (date, fmt) {
        var o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          S: date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
      },
      // 时间格式化
      TimeFormat (val, s) {
        if (!val) {
          return ''
        }
        if (s) {
          val = val * 1000
        }
        var date = new Date(val)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var min = date.getMinutes()
        var second = date.getSeconds()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        hour = hour < 10 ? '0' + hour : hour
        min = min < 10 ? '0' + min : min
        second = second < 10 ? '0' + second : second
        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
      },
      // 日期年月日
      getDate (n) {
        var date = new Date()
        date.setDate(date.getDate() + n)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return year + '-' + month + '-' + day
      },
      // 最多保留两位小数
      formatMomey (num) {
        return Math.round(num * 100) / 100
      },
      // 格式化城市
      formatCity (val) {
        const area = ['广州', '深圳', '佛山', '江门', '汕头', '汕尾', '揭阳', '潮州', '清远', '惠州', '阳江', '东莞', '韶关', '珠海', '肇庆', '茂名', '梅州', '河源', '湛江', '中山', '云浮', '苏州', '长沙', '株洲', '湘潭', '常德', '衡阳', '邵阳', '南昌', '怀化', '岳阳', '南通', '湘西', '宁波', '永州', '娄底', '郴州', '张家界', '益阳', '九江', '上饶', '抚州', '宜春', '吉安', '赣州', '景德镇', '萍乡', '新余', '鹰潭', '南京', '无锡', '徐州', '常州', '连云港', '淮安', '盐城', '扬州', '镇江', '宿迁', '泰州', '杭州', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '台州', '丽水', '舟山', '北京', '天津', '石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水', '太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁', '呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '兴安', '锡林郭勒', '阿拉善', '沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛', '长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边', '哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化', '大兴安岭', '上海', '合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '六安', '亳州', '池州', '宣城', '福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德', '济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽', '郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店', '济源', '武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '仙桃', '潜江', '天门', '神农架', '南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左', '海口', '三亚', '三沙', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '定安', '屯昌', '澄迈', '临高', '白沙', '昌江', '乐东', '陵水', '保亭', '琼中', '重庆', '成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝', '甘孜', '凉山', '贵阳', '六盘水', '遵义', '安顺', '铜仁', '黔西南', '毕节', '黔东南', '黔南', '昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄', '红河', '文山', '西双版纳', '大理', '德宏', '怒江', '迪庆', '拉萨', '昌都', '山南', '日喀则', '那曲', '阿里', '林芝', '西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛', '兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '临夏', '甘南', '西宁', '海东', '海北', '黄南', '海南', '果洛', '玉树', '梅西', '银川', '石嘴山', '吴忠', '固原', '中卫', '乌鲁木齐', '克拉玛依', '吐鲁番', '哈密', '昌吉', '博尔塔拉', '巴音郭楞', '阿克苏', '克孜勒苏', '喀什', '和田', '伊犁', '塔城', '阿勒泰', '石河子', '阿拉尔', '图木舒克', '五家渠', '香港', '澳门', '台湾']
        for (var i = 0; i < area.length; i++) {
          if (val.indexOf(area[i]) > -1) {
            return area[i]
          } else {
            return ''
          }
        }
      },
      /**
       * 压缩图片
       * @param {string} path 图片路径
       * @param {Object} options 配置参数 {width, height, quality: 图片质量}
       * @param {function} callback 
       */
      dealImage (path, options, callback) {
        var img = new Image()
        img.src = path
        img.onload = function () {
          var that = this
          // 默认按比例压缩
          var w = that.width
          var h = that.height
          var scale = w / h
          w = options.width || w
          h = options.height || w / scale
          var quality = 0.5 // 默认图片质量为0.7
          // 生成canvas
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          // 创建属性节点
          var anw = document.createAttribute('width')
          anw.nodeValue = w
          var anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          ctx.drawImage(that, 0, 0, w, h)
          // 图像质量
          if (options.quality && options.quality <= 1 && options.quality > 0) {
            quality = options.quality
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality)
          // 回调函数返回base64的值
          callback(base64)
        }
      },
      /**
       * @description 图片转成base64
       * @param {*} img 图片
       * @param {*} dir 图片方向
       * @param {*} next 返回结果的回调函数
       */
      getImgData (img, dir, next) {
        var image = new Image()
        image.onload = function () {
          var degree = 0
          var drawWidth
          var drawHeight
          var width
          var height
          drawWidth = this.naturalWidth
          drawHeight = this.naturalHeight
          // 以下改变一下图片大小
          var canvas = document.createElement('canvas')
          canvas.width = width = drawWidth
          canvas.height = height = drawHeight
          var context = canvas.getContext('2d')
          // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
          switch (dir) {
            // iphone横屏拍摄，此时home键在左侧
            case 3:
              degree = 180
              drawWidth = -width
              drawHeight = -height
              break
            // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
            case 6:
              canvas.width = height
              canvas.height = width
              degree = 90
              drawWidth = width
              drawHeight = -height
              break
            // iphone竖屏拍摄，此时home键在上方
            case 8:
              canvas.width = height
              canvas.height = width
              degree = 270
              drawWidth = -width
              drawHeight = height
              break
          }
          // 使用canvas旋转校正
          context.rotate((degree * Math.PI) / 180)
          context.drawImage(this, 0, 0, drawWidth, drawHeight)
          // 返回校正图片
          next(canvas.toDataURL('image/jpeg', 0.8))
        }
        image.src = img
      }
    }
  }
}
