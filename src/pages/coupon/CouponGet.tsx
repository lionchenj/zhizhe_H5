import * as React from "react";
import { NavBar, Icon, Button, Modal } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { History, Location } from "history";
import { UIUtil } from "src/utils/UIUtil";
import { UserService } from '../../service/UserService';

interface CouponGetProps {
  history: History;
  location: Location;
}

interface CouponGetState {
  redirectToLogin: boolean;
  cardid: string;
  brand_name: string;
  start_time: string;
  end_time: string;
  reduce: string;
  least: string;
  description: string;
}

const bodyHeight = window.innerHeight / 100 - 0.45 + "rem";

export class CouponGet extends React.Component<CouponGetProps,CouponGetState> {
  lv: any;
  data: any;
  push: string;
  constructor(props: CouponGetProps) {
    super(props);
    this.state = {
        redirectToLogin: false,
        cardid: '',
        brand_name: '',
        start_time: '',
        end_time: '',
        reduce: '',
        least: '',
        description: '',
    };
  }

  onRedirectBack = () => {
    this.setState({
      ...this.state,
      redirectToLogin: true,

    });
  };

  getCoupon = (e:any) => {
    UserService.Instance.Get_coupons(e.currentTarget.dataset.cardid).then( () => {
        UIUtil.hideLoading()
        const alert = Modal.alert
        alert('提示','领取成功',[{ text:'ok',onPress: () => {
            this.props.history.push('/coupon');
        },style: 'default' }])
    }).catch( (err: Error) => {
        UIUtil.showError(err)
    })
  };
  componentDidMount() {
    if(!this.props.location.state){
        this.props.history.goBack();
        return
    }
    UIUtil.showLoading('Loading');
    let cardid = this.props.location.state.cardid
    UserService.Instance.Couponsdetail(cardid).then( (res:any) => {
        UIUtil.hideLoading()
        this.setState({
            cardid: cardid,
            brand_name: res.data.brand_name,
            start_time: res.data.start_time,
            end_time: res.data.end_time,
            reduce: res.data.reduce,
            least: res.data.least,
            description: res.data.description,
        })
    }).catch( (err: Error) => {
        UIUtil.showError(err)
    })
  }

  public render() {
    const { redirectToLogin } = this.state;
    if (redirectToLogin) {
      const to = {
        pathname: "/home"
      };
      return <Redirect to={to} />;
    }
    return (
        <div className="coupon_container">
            <NavBar
            icon={<Icon type="left" />}
            onLeftClick={this.onRedirectBack}
            className="home-navbar"
            >
            <div className="nav-title">领取卡券</div>
            </NavBar>
            <div style={{ height: bodyHeight, backgroundColor: "#ffffff" }}>
                <div className="padding_trl">
                    <div className="coupon_get_top tac cfff coupon_bg">
                        <div className="fs24 padding-ts">{this.state.brand_name}</div>
                        <div className="fs14 ceee padding-t">有效期：{this.state.start_time}至{this.state.end_time}</div>
                        <div className="fs20 padding-ts">¥<span className="padding-l1 fs50 fb">{this.state.reduce}</span></div>
                        <div className="fs17 ceee padding-ts">订单满{this.state.least}元起</div>
                    </div>
                    <div className="question_btn">
                        <Button type="primary" data-cardid={this.state.cardid} onClick={this.getCoupon}>立即领取</Button>
                    </div>
                </div>
                <div className="padding top_list bt92 fs16">
                    <div className="padding-b c999">使用说明</div>
                    <div className="c666">{this.state.description}</div>
                </div>
                <div className="padding top_list fs16">
                    <div className="padding-b c999">开始时间</div>
                    <div className="c666">{this.state.start_time}</div>
                </div>
                <div className="padding top_list fs16">
                    <div className="padding-b c999">结束时间</div>
                    <div className="c666">{this.state.end_time}</div>
                </div>
            </div>
        </div>
    );
  }
}
