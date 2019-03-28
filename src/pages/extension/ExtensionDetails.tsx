import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon } from "antd-mobile";
import { History, Location } from "history";

import { UserService } from '../../service/UserService';
import { UIUtil } from '../../utils/UIUtil';
// import { model } from '../../model/model';
import credit from "../../assets/credit.png";
import credit_n from "../../assets/credit_n.png";
import pay from "../../assets/index_icon_pay.png";
import collection from "../../assets/index_icon_collection.png";
import zan from "../../assets/zan.png";
import defaults from "../../assets/default.png";

interface ExtensionDetailsProps {
  history: History;
  location: Location;
}

interface ExtensionDetailsState {
  title: string;
  orderid: string;
  isHome: boolean;
  status: string;
  topic: any;
  answered_number: string;
  answer_number:string;
  create_time:string;
  description:string;
  favo:string;
  favostatus:string;
  see:string;
  price:string;
  type: string;
  userSee:string;
  userSeelist:any;
}

export class ExtensionDetails extends React.Component<ExtensionDetailsProps, ExtensionDetailsState> {
  lv: any;
  orderid: any;
  isStatus: boolean;
  isCollection: boolean;
  constructor(props: ExtensionDetailsProps) {
    super(props);
    this.isStatus= false;
    this.isCollection= false;
    this.state = {
      isHome: false,
      status: '',
      title: "订单详情",
      orderid:'',
      topic: [],
      answered_number: '',
      answer_number: '',
      create_time:'',
      description:'',
      favo:'0',
      favostatus:'-1',
      see:'0',
      price:'0',
      type:'',
      userSee:'',
      //回答
      userSeelist:[]
    };
  }

  onRedirectBack = () => {
      this.props.history.goBack();
  };
  componentDidMount() {
    if(!this.props.location.state){
      this.props.history.goBack();
    return
    }
    let orderid = this.props.location.state.orderid;
    this.orderid = orderid;
    this.getOrderDetails(orderid);
  }

  getOrderDetails = (orderid:string) => {
    UIUtil.showLoading('链接中...');
    UserService.Instance.orderDetails(orderid).then( (res:any) => {
      if(res.data.topic[0] == null){
        res.data.topic = []
      }
      this.setState({
        status: res.data.status,
        favostatus: res.data.favostatus,
        orderid: res.data.orderid,
        title: res.data.question,
        topic: res.data.topic,
        answered_number: res.data.answered_number,
        answer_number: res.data.answer_number,
        create_time:res.data.create_time,
        description:res.data.description,
        favo:res.data.favo,
        see:res.data.see,
        price:res.data.price,
        type:res.data.type,
        userSee:res.data.userSee,
        userSeelist:res.data.userSeelist||[]
      })
      UIUtil.hideLoading()
    }).catch( err => {
      UIUtil.hideLoading()
      UIUtil.showError(err)
    })
  }
  //收藏
  setFavorite = () => {
    if(UIUtil.not_weixin()){
      UIUtil.showInfo('请在微信浏览器打开！')
      return;
    }
    let id = this.orderid;
    UserService.Instance.fabsAndfavor(id)
      .then((res: any) => {
        if (res.data.favorstatus == "1") {
          UserService.Instance.delfavorQue(id)
            .then((res: any) => {
              UIUtil.hideLoading();
            })
            .catch(err => {
              UIUtil.showError(err);
            });
        }
        if (res.data.favorstatus == "-1") {
          UserService.Instance.favoriteQue(id)
            .then((res: any) => {
              UIUtil.hideLoading();
            })
            .catch(err => {
              UIUtil.showError(err);
            });
        }
        this.getOrderDetails(this.orderid);
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
// 点赞
  setFabulous = (e:any) => {
    let id = e.currentTarget.dataset.id;
    UserService.Instance.fabsAndfavor(this.state.orderid,id).then( (res:any) => {
      if(res.data.fabstatus == '1'){
        UserService.Instance.delfabsQue(this.state.orderid,id).then( (res:any) => {
          this.getOrderDetails(this.state.orderid);
          UIUtil.hideLoading()
        }).catch( err => {
            UIUtil.showError(err)
        })
      }
      if(res.data.fabstatus == '-1'){
        UserService.Instance.fabulousQue(this.state.orderid,id).then( (res:any) => {
          this.getOrderDetails(this.state.orderid);
          UIUtil.hideLoading()
        }).catch( err => {
            UIUtil.showError(err)
        })
      }
      UIUtil.hideLoading()
    }).catch( err => {
        UIUtil.showError(err)
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
          <div className="nav-title">{this.state.title}</div>
        </NavBar>
          <div className="wpadding">
            <div className="flex flex-j-sb">
            <div className="order_label c329 flex">
              {this.state.topic.map((data: any, index: string) => {
                return (
                  <div className="margin-rsm" key={index}>#{data}#</div>
                );
              })}
              </div>
              <span className="fs14 c999 padding-l1">{this.state.answered_number}/{this.state.answer_number}个回答</span>
            </div>
            <div className="fs15 c666 lh14 wwb padding-tb">
              {this.state.description}
            </div>
            <div className="fs14 c999 tar padding-b">{this.state.create_time}</div>
            <div className="flex flex-j-sb bteee padding-t">
              <div className="flex c999">
              <img className="content_img" src={this.state.favostatus != '1' ?collection:credit} onClick={this.setFavorite} />
                <span className="padding-lsm">{this.state.favo}</span>
                <img className="margin-l content_img" src={pay} alt=""/>
                <span className="padding-lsm">{this.state.see}</span>
              </div>

              <div>
                <div className={"home_pay b329 fs13 c329 text-cen "+(this.state.userSee == '2' ? "":"none")} onClick={()=>UIUtil.seePay(this,this.state.orderid,'x')}>
                  ¥<span>{this.state.price}</span>看答案
                </div>
                <div className={"home_pay fs13 text-cen btn_not "+(this.state.userSee != '2'?"":"none")}>
                  已付费
                </div>
              </div>
            </div>
          </div>
            <div className={"wpadding margin-t "+(this.state.userSee == '1' && this.state.userSeelist.length > 0?"":"none")}>
              <div>
                {
                this.state.userSeelist.map((data:any,index:string)=>{
                return(
                  <div key={index}>
                    <div className="flex flex-a-start">
                      <div className="details_headimg"><img src={data.member_headimgurl||defaults} alt=""/></div>
                      <div className="wpadding3">
                        <div className="flex padding-r padding-bsm">
                          <div className="padding-rsm">{data.member_nickname}</div>
                          <div className="flex details_star">
                            <img src={data.star_level== '1'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '1'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '2'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '3'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '4'?credit:credit_n} alt=""/>
                          </div>
                        </div>
                        <div className="">{data.content}</div>
                      </div>
                    </div>
                    <div className="flex c999 tar">
                      <div className="w100" data-id={data.id} onClick={this.setFabulous}>
                        <img className="content_img margin-rs" src={zan} alt="" />
                        <span>{data.fabul_count}</span>
                      </div>
                    </div>
                  </div>
                )
                })
                }
              </div>
            </div>
      </div>
    );
  }
}
