import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon, List, Grid} from "antd-mobile";
import { History, Location } from "history";

import QR_code from "../../assets/QR_code.png";
import coupon from "../../assets/my_coupon.png";
import order_extension from "../../assets/order_extension.png";

import { UserService } from '../../service/UserService';
import { UIUtil } from '../../utils/UIUtil';
// import { model } from '../../model/model';

interface ExtensionProps {
    history: History,
    location: Location
}


interface ExtensionState {
    CardCount:number;
    PromCount:string;
    extensionData:any;
}

const pageheight = window.innerHeight - 45;
const pagewidth = window.innerWidth;

export class Extension extends React.Component<ExtensionProps, ExtensionState> {
 
    lv: any

    constructor(props: ExtensionProps) {
        super(props);
          this.state = {
            CardCount:0,
            PromCount: '0',
            extensionData: []
          };
        
    }

    onRedirectBack = () => {
        const history = this.props.history
        history.goBack()
    }
    onExtensionMenu = (el: object, index: number) => {
        if (index == 0) {
          // UIUtil.showInfo("敬请期待");
          this.props.history.push("/code");
        } else if (index == 1) {
          this.props.history.push("/extensionCoupon");
          // UIUtil.showInfo("敬请期待");
        } else if (index == 2) {
          // UIUtil.showInfo("敬请期待");
          this.props.history.push("/extensionList");
        }
      };
    componentDidMount() {
      UserService.Instance.MyPromCount()
      .then((res: any) => {
        this.setState({
          CardCount: res.data.CardCount,
          PromCount: res.data.PromCount
        });
        this.setNum();
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    }
    setNum = () => {
      let extensionData = [
        {
          icon: QR_code,
          text: "我的二维码"
        },
        {
          icon: coupon,
          text: "我的优惠券（"+ this.state.CardCount +"）"
        },
        {
          icon: order_extension,
          text: "推广订单（"+ this.state.PromCount +"）"
        }
      ]
      this.setState({
        extensionData:extensionData
      });
    }
    public render() {
        return (
            <div className="message-container">
                <NavBar mode="light" icon={<Icon type="left" />} 
                    onLeftClick={ this.onRedirectBack}
                    className="home-navbar" >
                        <div className="nav-title">我的推广</div>
                </NavBar>
                <div style={{ height: pageheight, width: pagewidth }}>
                <div className="extension_content extension_bg"></div>
                <List>
                  <Grid
                    data={this.state.extensionData}
                    hasLine={false}
                    onClick={this.onExtensionMenu}
                    columnNum={3}
                  />
                </List>
                </div>
            </div>
        )
    }
}