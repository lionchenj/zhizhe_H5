import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon } from "antd-mobile";
import { History, Location } from "history";

import { UserService } from '../../service/UserService';
import { UIUtil } from '../../utils/UIUtil';
import { model } from '../../model/model';
// import credit from "../../assets/credit.png";
// import credit_n from "../../assets/credit_n.png";
// import pay from "../../assets/index_icon_pay.png";
// import collection from "../../assets/index_icon_collection.png";
// import zan from "../../assets/zan.png";
// import defaults from "../../assets/default.png";

interface QuestionDetailsOnOProps {
  history: History;
  location: Location;
}

interface QuestionDetailsOnOState {
    data: model.myOrder;
    orderid: string;
    code_url:string;
}

export class QuestionDetailsOnO extends React.Component<QuestionDetailsOnOProps, QuestionDetailsOnOState> {
  lv: any;
  isStatus: boolean;
  constructor(props: QuestionDetailsOnOProps) {
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
    if(this.isStatus){
      this.props.history.push({ pathname: "/questionList", state: { status: this.state.data.status } });
      return;
    }
    this.props.history.push("/questionList");
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
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  componentDidMount() {
    let orderid = '';
    let strs;
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
        strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    if(this.props.location.state){
      orderid = this.props.location.state.orderid;
      this.isStatus = this.props.location.state.isStatus;
    }else if(theRequest['orderid']){
      orderid = theRequest['orderid'];
    } else {
      this.props.history.goBack();
      return;
    }
    UserService.Instance.getCustomerService('1').then( (res:any) => {
      this.setState({
        code_url:res.data.code_url
      })
      UIUtil.hideLoading()
    }).catch( err => {
      UIUtil.hideLoading()
      UIUtil.showError(err)
    })
    this.getOrderDetails(orderid);
  }
  gopay = (e: any) => {
    let topics:any = [],topic = e.currentTarget.dataset.topic.split(',');
      topic.map((data:any)=>{
        topics.push({name:data})
      })
      let data = {
        price: e.currentTarget.dataset.price,
        orderid: e.currentTarget.dataset.orderid,
        topic: topics,
        knower_type: e.currentTarget.dataset.knower_type,
        requirement: e.currentTarget.dataset.requirement,
        communication: e.currentTarget.dataset.communication,
        description: e.currentTarget.dataset.description,
        type: e.currentTarget.dataset.type
      };
      this.props.history.push({ pathname: "/pay", state: { data: data } });
  };
  refund = (e: any) => {
    let orderid = e.currentTarget.dataset.id;
    UserService.Instance.RefundMoney(orderid)
      .then((res: any) => {
        this.getOrderDetails(orderid);
      })
      .catch(err => {});
  };
  public render() {
    return (
      <div className="message-container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">一对一咨询</div>
        </NavBar>
        <div className="wpadding">
          <div className="flex flex-j-sb bbeee padding-b">
            <div>
                <div className="fs14 c999 padding-txs">订单号：{this.state.data.orderid}</div>
            </div>
            <div className={this.state.data.status == '1'?'cfa4':this.state.data.status == '2'?'c999':this.state.data.status == '3'?'c999':this.state.data.status == '4'?'cffa':'c999'}>{this.state.data.status == '1'?'未支付':this.state.data.status == '2'?'已支付':this.state.data.status == '3'?'已预约':this.state.data.status == '4'?'失约':'已完成'}</div>
          </div>
          <div className="flex padding-b padding-t flex-w">
              {this.state.data&&this.state.data.topic.map((data: any, index: string) => {
                  if(data != null){
                    return (
                      <div className="margin-rsm c329" key={index}>#{data}#</div>
                      );
                  }else{
                    return;
                  }
              })}
          </div>
          <div className="fs15 c666 lh14 wwb padding-tb">{this.state.data.duration}</div>
          <div>知者类型：<span>{this.state.data.knower_type}</span></div>
          <div>聊天时长：<span>{this.state.data.requirement}</span></div>
          <div className="padding-b">聊天方式：<span>{this.state.data.communication}</span></div>
          <div className="flex flex-j-sb bteee padding-t">
            <div className="flex c999">{this.state.data.create_time}</div>
            <div className={"home_pay b329 fs13 c329 text-cen "+(this.state.data.status == '1'?'':'none')}
            data-orderid={this.state.data.orderid}
            data-price={this.state.data.price}
            data-topic={this.state.data.topic}
            data-knower_type={this.state.data.knower_type}
            data-knower_headimgurl={this.state.data.knower_headimgurl}
            data-knower_nickname={this.state.data.knower_nickname}
            data-knower_profile={this.state.data.knower_profile}
            data-knower_school={this.state.data.knower_school}
            data-knower_topic={this.state.data.knower_potic}
            data-requirement={this.state.data.requirement}
            data-communication={this.state.data.communication}
            data-description={this.state.data.duration}
            data-type={'4'}
            onClick={this.gopay}>
              ¥<span>{this.state.data.price}</span>预约
            </div>
            <div className={"home_pay b329 fs13 c329 text-cen "+(this.state.data.status == '4'?'':'none')} data-id={this.state.data.orderid} onClick={this.refund}>
                退款
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
