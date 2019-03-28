const openid = "User.openid";

export class UserStorage {
  static saveAccessToken(token: string) {
      this.setCookie(openid, token);
  }
  static getAccessToken(): string | null {
    window;
    return UserStorage.getCookie(openid);
  }
  static getOpenid(): string | null {
    window;
    return UserStorage.getCookie(openid);
  }
  static clearAccessToken() {
    this.delCookie(openid);
    window.localStorage.removeItem(openid);
  }
  //写cookies
  static setCookie(name:string, value:string) {
    var Days = 36000;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
  }
//写限时cookies
static setTimeCookie(name:string, value:string, time:number) {
  var exp = new Date();
  exp.setTime(exp.getTime() + time * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
}
  //读取cookies
  static getCookie(name:string) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }

  //删除cookies
  static delCookie(name:string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null){document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();}
  }
  //清除cookies
  static clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();
        }
    }
  }
}