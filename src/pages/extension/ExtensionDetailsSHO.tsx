import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon } from "antd-mobile";
import { History, Location } from "history";

import { UserService } from "../../service/UserService";
import { UIUtil } from "../../utils/UIUtil";
import { model } from "../../model/model";
// import credit from "../../assets/credit.png";
// import credit_n from "../../assets/credit_n.png";
// import pay from "../../assets/index_icon_pay.png";
// import collection from "../../assets/index_icon_collection.png";
// import zan from "../../assets/zan.png";
import defaults from "../../assets/default.png";
import bigV from "../../assets/bigV.png";
import bigStar from "../../assets/bigStar.png";

interface ExtensionDetailsSHOProps {
  history: History;
  location: Location;
}

interface ExtensionDetailsSHOState {
  data: model.myOrder;
  orderid: string;
  code_url:string;
}

export class ExtensionDetailsSHO extends React.Component<
  ExtensionDetailsSHOProps,
  ExtensionDetailsSHOState
> {
  lv: any;
  isStatus:boolean;
  constructor(props: ExtensionDetailsSHOProps) {
    super(props);
    this.state = {
      orderid: "",
      code_url: "",
      data: {
        answer_number: "",
        answer_price: "",
        answered_number: "",
        knower_type: "",
        knower_headimgurl: "",
        knower_nickname: "",
        knower_school: "",
        knower_profile: "",
        knower_potic: "",
        knower_mark: "",
        apmentime: "",
        communication: "",
        description: "",
        duration: "",
        fabs: "",
        favo: "",
        favostatus: "",
        headimgurl: "",
        knower_type_id: "",
        knower: "",
        knowerid: "",
        nickname: "",
        openid: "",
        orderid: "",
        price: "",
        question: "",
        question_type: "",
        requirement: "",
        status: "",
        topic: [],
        type: "",
        corderid: "",
        create_time: "",
        id: "",
        sonlist: [],
        sumPrice: ""
      }
    };
  }

  onRedirectBack = () => {
    this.props.history.goBack();
  };
  getOrderDetails = (orderid: string) => {
    UIUtil.showLoading("链接中...");
    UserService.Instance.orderDetails(orderid)
      .then((res: any) => {
        if (res.data.topic[0] == null) {
          res.data.topic = [];
        }
        this.setState({
          orderid: orderid,
          data: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.goBack();
      return;
    }
      UserService.Instance.getCustomerService('1').then( (res:any) => {
        this.setState({
          code_url:res.data.code_url
        })
        UIUtil.hideLoading()
      }).catch( err => {
          UIUtil.showError(err)
      })
    this.isStatus = this.props.location.state.isStatus;
    let orderid = this.props.location.state.orderid;
    this.getOrderDetails(orderid);
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
          <div className="nav-title">跟我看校园</div>
        </NavBar>
        <div className="wpadding">
          <div className="flex flex-j-sb bbeee padding-b">
            <div>
              <div className="fs14 c999 padding-txs">
                订单号：{this.state.data.orderid}
              </div>
            </div>
            <div
              className={
                this.state.data.status == "1"
                  ? "cfa4"
                  : this.state.data.status == "2"
                  ? "c999"
                  : this.state.data.status == "3"
                  ? "c999"
                  : this.state.data.status == "4"
                  ? "cffa"
                  : "c999"
              }
            >
              {this.state.data.status == "1"
                ? "未支付"
                : this.state.data.status == "2"
                ? "已支付"
                : this.state.data.status == "3"
                ? "已预约"
                : this.state.data.status == "4"
                ? "失约"
                : "已完成"}
            </div>
          </div>
          <div className="flex padding-b padding-t">
            <img
              className="questionList_head"
              src={this.state.data.knower_headimgurl || defaults}
            />
            <div className="margin-ls tal w80">
              <div className="oono_name">{this.state.data.knower_nickname}<img src={this.state.data.knower_mark=='2'?bigV:this.state.data.knower_mark=='1'?bigStar:''} alt=""/></div>
              <div className="fs14 c999">{this.state.data.knower_school}</div>
            </div>
            <div className="w65 flex flex-w flex-j-end">
              {this.state.data &&
                this.state.data.topic.map((data: any, index: string) => {
                  if (data != null) {
                    return (
                      <div className="margin-rsm c329" key={index}>
                        #{data}#
                      </div>
                    );
                  } else {
                    return;
                  }
                })}
            </div>
          </div>
          <div className="fs15 c666 lh14 wwb padding-b">
            {this.state.data.knower_profile}
          </div>
          <div className="flex flex-j-sb bteee padding-t">
            <div className="flex c999">
              预约时间：{this.state.data.apmentime}
            </div>
          </div>
        </div>

        <div className="registered_code padding-tm">
          <img src={this.state.code_url} alt=""/>
        </div>
      </div>
    );
  }
}
