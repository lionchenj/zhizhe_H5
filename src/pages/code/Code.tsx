import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon } from "antd-mobile";
import  QRCode  from "qrcode.react";
import { History, Location } from "history";
import defaults from "../../assets/default.png";
import { UserStorage } from '../../storage/UserStorage';
import { homePage } from "../../utils/Constants";

// import { UserService } from '../../service/UserService';
// import { UIUtil } from '../../utils/UIUtil';
// import { model } from '../../model/model';

interface CodeProps {
  history: History;
  location: Location;
}

interface CodeState {
  openid: string;
  headimgurl: string;
  name: string;
}
const pageheight = window.innerHeight - 95;
const pagewidth = window.innerWidth;
export class Code extends React.Component<CodeProps, CodeState> {
  lv: any;

  constructor(props: CodeProps) {
    super(props);

    this.state = {
      openid: "",
      headimgurl:'',
      name: "知者"
    };
  }

  onRedirectBack = () => {
    const history = this.props.history;
    history.goBack();
  };

  componentDidMount() {
    let user:any = UserStorage.getCookie('userInfo');
    user = JSON.parse(user);
    console.log(user)
    this.setState({
      openid: user.openid,
      name: user.nickname,
      headimgurl: user.headimgurl
    })
  }


  public render() {
    return (
      <div className="message-container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">我的二维码</div>
        </NavBar>
        <div style={{ height: pageheight, width: pagewidth}}>
            <div className="code_bg fs14">
                <div className="code_img padding-tm"><img src={this.state.headimgurl || defaults} alt=""/></div>
                <div className="padding-ts"><span className="c329">{this.state.name}</span> 邀请你加入“留学你问我”</div>
                <div className="QR_code">
                    <QRCode value={homePage+'?id='+this.state.openid} size={160} />
                </div>
            </div>
          <div className="w100 text-cen c999">邀请好友成功提问，</div>
          <div className="w100 text-cen c999">可获得价值10元的提问优惠券</div>
        </div>
      </div>
    );
  }
}
