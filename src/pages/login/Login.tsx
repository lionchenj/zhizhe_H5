import * as React from "react";
import { History, Location } from "history";
import { Redirect } from "react-router-dom";
// import { List, InputItem, Button, Toast, WhiteSpace } from "antd-mobile";
import { Toast } from "antd-mobile";
import { UserStorage } from "../../storage/UserStorage";
import { homePage } from "../../utils/Constants";
// import defaults from "../../assets/default.png";
import "./Login.css";
// import { Util } from '../../utils/Util';
import { UserService } from "../../service/UserService";

export interface LoginProps {
  history: History;
  location: Location<any> | undefined;
}

interface LoginState {
  redirectToReferrer: boolean;
  activate: boolean;
  closeApp: string;
  code: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
  phone: string;
  password: string;
  activation: string;
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      activate: false,
      closeApp: "0",
      code: ""
    };
  }

  // navToRegister = () => {
  //     this.setState( {
  //         redirectToReferrer: false,
  //     })
  // }
  // onPhoneBlur = (value: string) => {
  //     this.phone = value
  // }
  // onPasswordBlur = (value: string) => {
  //     this.password = value
  // }
  // onActivationBlur = (value: string) => {
  //     this.activation = value
  // }

  // onSubmit = () => {
  //     const info = "请输入11位手机号码"
  //     const passwordInfo = "请输入不少于6位长度的密码"

  //     if (!this.phone) {
  //         Toast.info(info)
  //         return
  //     }
  //     const trimPhone = Util.trim(this.phone)
  //     if (!Util.validPhone(trimPhone)) {
  //         Toast.info(info)
  //         return
  //     }
  //     if (!this.password) {
  //         Toast.info(passwordInfo)
  //         return
  //     }
  //     const trimPassword = Util.trim(this.password)
  //     if (!Util.validPassword(trimPassword)){
  //         Toast.info(passwordInfo)
  //         return
  //     }
  //     UserService.Instance.login(trimPhone, trimPassword, this.activation).then( (res)=>{
  //         this.setState({
  //             ...this.state,
  //             redirectToReferrer: true
  //         })
  //     }).catch( err => {
  //         const message = (err as Error).message;
  //         Toast.fail(message);
  //     })
  // }

  public componentDidMount() {
    // UserStorage.saveAccessToken('oBksq6EbVoRHfwJ_mk7QgFvRtqTk');
    // UserStorage.setCookie("User.openid",'oBksq6EbVoRHfwJ_mk7QgFvRtqTk')

    // UserStorage.saveAccessToken('1111');
    // this.setState({
    //           ...this.state,
    //           redirectToReferrer: true
    //         });
    // var is_weixin = (function() {
    //   return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    // })();
    // if (is_weixin) {
      //微信浏览器
      var url = location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      if (theRequest["id"]) {
        UserStorage.setTimeCookie("superior.openid", theRequest["id"],60);
      }
      let code = theRequest["code"];
      if ( !code || code == window.localStorage.getItem("code") ) {
        UserStorage.clearCookie();
        window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbfb93569bee3f4f3&redirect_uri="+homePage+"&response_type=code&scope=snsapi_userinfo#wechat_redirect");
      } else {
        window.localStorage.setItem("code", code);
        let superid = UserStorage.getCookie("superior.openid") || "";
        let data:any = {}
        if(superid){
          data['openid'] = superid;
        }
        data['code'] = code;
        UserService.Instance.wechatLogin(data)
          .then((res: any) => {
            UserStorage.setCookie("User.openid", res.data.openid);
            UserService.Instance.getUserInfo(res.data.openid)
              .then(userInfo => {
                UserStorage.setCookie("userInfo", JSON.stringify(userInfo));
                this.setState({
                  ...this.state,
                  redirectToReferrer: true
                });
              })
              .catch(err => {
                console.log(err.errmsg);
              });
          })
          .catch(err => {
            const message = (err as Error).message;
            Toast.fail(message);
          });
      }
    // }else{
    //   UserStorage.setCookie("User.openid",'123456');
    //   this.setState({
    //     ...this.state,
    //     redirectToReferrer: true
    //   });
    // }
  }

  public render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      UserStorage.setCookie("type", "HomeTab");
      const to = {
        pathname: "/home"
      };
      return <Redirect to={to} />;
    }

    return (
      <div className="login-container">
        {/* <div className="login_bg">
            </div>
                    <div className="login_content">
                        <List className="login_border">
                        <InputItem type="number" maxLength={11} placeholder="请输入手机号" onBlur={this.onPhoneBlur}></InputItem>
                        </List>
                        <List className="login_border">
                        <InputItem type="password" placeholder="请输入登录密码" onBlur={this.onPasswordBlur}></InputItem>
                        </List>
                        <List className="login_forget">
                            <Link to="/registerScan" className="registered-link" >立即注册</Link>
                            <Link to="/forget_pwd" className="forget-link" >忘记密码？</Link>
                        </List>
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <div className="login_button">
                            <List className="content-item">
                                <Button type="ghost" className="login_confirm" onClick={this.onSubmit}>登录</Button>
                            </List>
                        </div>
                    </div> */}
      </div>
    );
  }
}
