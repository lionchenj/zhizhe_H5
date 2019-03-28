import { Toast } from "antd-mobile";
import { ApiError } from "./ApiError";
import { UserService } from "../service/UserService";
import { UserStorage } from "src/storage/UserStorage";
import { homePage } from "../utils/Constants";

var wx = require("weixin-js-sdk");
// var not_weixin = (function() {
//   return navigator.userAgent.toLowerCase().indexOf("micromessenger") === -1;
// })();
export class UIUtil {
  
  static test (that:any,orderid:string): void {
    that.getOrderDetails(orderid)
  }
  static check(name:string,val: string ): boolean{
    let isCheck:any;
    switch (name) {
      case 'email':
        isCheck = val.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        if(isCheck){
          return false
        }else{
          return true
        }
      default:
      return false
    }
  }

  static showError(err: Error): void {
    UIUtil.hideLoading();
    if (err instanceof ApiError) {
      const message = `(${err.errorCode})${err.message}`;
      Toast.fail(message);
      return;
    }
    Toast.fail(err.message);
  }
  static showInfo(info: string): void {
    UIUtil.hideLoading();
    Toast.info(info);
  }

  static showLoading(info: string): void {
    Toast.loading(info, 0);
  }

  static hideLoading(): void {
    Toast.hide();
  }
  //是否微信
  static not_weixin(): boolean {
    // return not_weixin;
    return false;
  }
  //注册
  static registerKnower(that:any,registerData:any,):void {
    UIUtil.showLoading('提交注册...');
    UserService.Instance.registerKnower(registerData).then( (res) => {
      let openid = UserStorage.getCookie("User.openid")||'';
      UserService.Instance.getUserInfo(openid)
        .then((userInfo:any) => {
          UserStorage.setCookie("userInfo", JSON.stringify(userInfo));
          UserStorage.setCookie("knower_status", userInfo.knower_status);
          UIUtil.hideLoading();
          UIUtil.showInfo('注册成功');
          that.props.history.push("/registered");
        })
        .catch(err => {
          console.log(err.errmsg);
          UIUtil.hideLoading();
        });
    }).catch( (err: Error) => {
      UIUtil.hideLoading();
      UIUtil.showError(err)
    })
  }
  //支付
  static goPay(
    that: any,
    orderid: string,
    cardid?: string,
    type?: string,
    mobile?: string,
    wechat?: string,
    fun?: any
  ): void {
    UIUtil.showLoading("跳转支付");
    let typex = type;
    if (type == "x") {
      typex = "2";
    }
    UserService.Instance.orderConfirm(orderid, cardid, typex, mobile, wechat)
      .then((res: any) => {
        wx.chooseWXPay({
          timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
          package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.data.paySign, // 支付签名
          success: function(res: any) {
            UIUtil.showInfo("支付成功");
            UIUtil.hideLoading();
            if (type == "x") {
              that.props.history.push({
                pathname: "/questionList",
                state: { status: "2" }
              });
              return;
            }
            if (type == "1") {
              that.props.history.push({
                pathname: "/questionDetails",
                state: { orderid: orderid }
              });
              return;
            }
            if (type == "2") {
              that.props.history.push({
                pathname: "/questionDetailsOther",
                state: { orderid: orderid }
              });
              return;
            }
            if (type == "3") {
              that.props.history.push({
                pathname: "/questionDetailsSHO",
                state: { orderid: orderid }
              });
              return;
            }
            if (type == "4") {
              that.props.history.push({
                pathname: "/questionDetailsOnO",
                state: { orderid: orderid }
              });
              return;
            }
            if (type == "6") {
              that.getOrderDetails(that.state.orderid)
              return;
            }
          },
          cancel: function(res: any) {
            UIUtil.showInfo(res);
          }
        });
      })
      .catch(err => {
        UIUtil.showInfo("支付失败");
        UIUtil.hideLoading();
        console.log(err);
        UIUtil.showError(err);
      });
  }
  //看看支付
  static seePay(
    that: any,
    orderid: string,
    type?: string,
    cardid?: string
  ): void {
    if (UIUtil.not_weixin()) {
      UIUtil.showInfo("请在微信浏览器打开！");
      return;
    }
    UIUtil.showLoading("跳转支付");
    UserService.Instance.ConfirmLanswer(orderid, cardid)
      .then((res: any) => {
        wx.chooseWXPay({
          timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
          package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.data.paySign, // 支付签名
          success: function(res: any) {
            UIUtil.showInfo("支付成功");
            UIUtil.hideLoading();
            if (type == "1") {
              that.props.history.push({
                pathname: "/questionDetails",
                state: { type: "home", orderid: orderid }
              });
            }
            if (type == "2") {
              that.props.history.push({
                pathname: "/questionDetailsOther",
                state: { type: "home", orderid: orderid }
              });
            }
            if (type == "3") {
              that.props.history.push({
                pathname: "/extensionDetails",
                state: { orderid: orderid }
              });
            }
            if (type == "4") {
              that.props.history.push({
                pathname: "/extensionDetailsOther",
                state: { orderid: orderid }
              });
            }
            if (type == "x") {
              that.getOrderDetails(orderid);
            }
          },
          cancel: function(res: any) {
            UIUtil.showInfo(res);
          }
        });
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showInfo("支付失败");
        console.log(err);
        UIUtil.showError(err);
      });
  }
  static share (): void {
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
      //分享
      var shareData = {};
      let id = UserStorage.getOpenid();
      shareData["title"] = "留学你问我";
      shareData["desc"] = "";
      shareData["imgUrl"] = "https://dev170.weibanker.cn/chenjj/www/zhizhe/images/logo.png";
      shareData["link"] = homePage + "?id=" + id;
      shareData["success"] = function() {
      
      };
      shareData["cancel"] = function() {

      };
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
      wx.onMenuShareQZone(shareData);
    })
  }
  static isPhone(): boolean {
    var browser = {
      versions: (function() {
        var u = navigator.userAgent;
        return {
          //移动终端浏览器版本信息
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
          iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf("iPad") > -1 //是否iPad
        };
      })()
    };
    if (
      browser.versions.iPhone ||
      browser.versions.iPad ||
      browser.versions.ios
    ) {
      return true;
    } else {
      return false;
    }
  }
  static scrollzero():void {
    setTimeout(function(){
      window.scrollTo(0, 0)
    },100)
  }
}
