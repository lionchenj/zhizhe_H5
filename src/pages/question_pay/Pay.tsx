import * as React from "react";
import "./question.css";
import {
  NavBar,
  Icon,
  List,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button
} from "antd-mobile";
import { History, Location } from "history";
import defaults from "../../assets/default.png";

import bigV from "../../assets/bigV.png";
import bigStar from "../../assets/bigStar.png";
import { UserService } from '../../service/UserService';
import { UIUtil } from "../../utils/UIUtil";
// import { model } from '../../model/model';

interface PayProps {
  history: History;
  location: Location;
}

interface PayState {
  data: any;
  datas:any;
  cardid:string;
  coupons:string;
  couponList: any;
  couponPrice:number;
  price: number;
  orderid:string;
  showAgreement:boolean;
  agree:boolean;
  agreementTitle:string;
  agreementContent:string;
  timeList:any;
}
export class Pay extends React.Component<PayProps, PayState> {
  isType: true;
  phone: string;
  type: string;
  constructor(props: PayProps) {
    super(props);
    this.state = {
      showAgreement:false,
      agree:false,
      agreementTitle:'',
      agreementContent:'',
      cardid:'',
      coupons:'0',
      couponList: [],
      couponPrice:0,
      price:0,
      orderid:'',
      data:{
        knower:{
          nickname:'',
          school:'',
          topic:'',
          profile:''
        }
      },
      datas:{
        topic:[],
      },
      timeList:[]
    };
  }
  onRedirectBack = () => {
    const history = this.props.history;
    history.goBack();
  };

  onPhoneBlur = (value: string) => {
    this.phone = value;
  };
  //支付
  gopay = () => {
    if(!this.state.agree){
      UIUtil.showInfo("请先阅读协议并勾选");
      return;
    }
    if(!this.phone){
      UIUtil.showInfo("手机号码不能为空");
      return
    }
    UIUtil.goPay(this,this.state.orderid,this.state.cardid,this.type,this.phone);
  }
  //优惠券
getCoupon = () => {
  UserService.Instance.myCardCount(this.state.data.price,this.type).then( (res:any) => {
    this.setState({
      coupons: res.data.count,
      couponList: res.data.list
    })
    UIUtil.hideLoading()
  }).catch( err => {
      UIUtil.showError(err)
  })
}
  public componentDidMount() {
    if(!this.props.location.state){
      this.props.history.goBack();
    return
    }

    //协议
    UserService.Instance.getSystemcontract('2')
      .then((res: any) => {
        console.log(res);
        this.setState({
          agreementTitle: res.data.title,
          agreementContent: res.data.content
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    let data = this.props.location.state.data;
    if(data.type =='3'){
      this.type = '3'
      this.setState({
        timeList: data.apmentime.split(','),
        orderid:data.orderid,
        price:data.price,
        data:data,
      });
    }
    if(data.type =='4'){
      this.type = '4'
      this.setState({
        orderid:data.orderid,
        price:data.price,
        datas:data,
      });
    }
  }

  goAgreement = () => {
    this.setState({
      showAgreement: !this.state.showAgreement
    });
  };
  checkagreement = (e: any) => {
    console.log(e);
    this.setState({
      agree: e.currentTarget.checked
    });
  };
  public render() {
    return (
      <div className="withdraw-container order_pay">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">一对一专享支付</div>
        </NavBar>
        <div className={this.state.data.type === "3" ? "school" : "none"}>
          <List>
            <WingBlank className="padding-tb fs17">
              <div className="oono flex">
                <div className="oono_head">
                  <img src={this.state.data.knower.headimgurl || defaults} alt="" />
                </div>
                <div className="w80">
                  <div className="fs17 fb padding-b oono_name">{this.state.data.knower.nickname}<img src={this.state.data.knower.mark=='2'?bigV:this.state.data.knower.mark=='1'?bigStar:''} alt=""/></div>
                  <div className="fs12 c666 padding-b">{this.state.data.knower.school}</div>
                </div>
                {/* <div className="oono_label c329">#{this.state.data.knower.topic}#</div> */}
              </div>
              <div className="fs14" dangerouslySetInnerHTML={{__html: this.state.data.knower.profile}}></div>
            </WingBlank>
            <WingBlank className="padding-tb fs17 none">
              <div className="flex">
                <div className="c999">主题：</div>
                <div>选校</div>
              </div>
              <div className="flex">
                <div className="c999">问题：</div>
                <div>选校</div>
              </div>
            </WingBlank>
          </List>
          <WhiteSpace size="md" />
          <List><List.Item>预约时间</List.Item></List>
          <div className="wpadding flex flex-w">
            {
              this.state.timeList.map((data: any, index: string) => {
                return (
                  <div
                    className="tag backE6F"
                    key={index}
                    data-name={data}
                  >
                    {data}
                  </div>
                );
              })
            }
            </div>
          <List><List.Item extra={this.state.data.orderid}>订单号</List.Item></List>
        </div>
        <div className={this.state.datas.type === "4" ? "" : "none"}>
          <WingBlank className="padding-tb fs17">
            <div className="order_label c329 flex">
            {this.state.datas.topic.map((data: any, index: string) => {
              return (
                <div className="margin-rsm" key={index}>#{data.name}#</div>
              );
            })}
            </div>
            <div className="fs15 c666 lh14">
              {this.state.datas.description}
            </div>
          </WingBlank>
          <WhiteSpace size="md" />
          <List>
            <List.Item extra={this.state.datas.knower_type}>知者类型</List.Item>
            <List.Item extra={this.state.datas.requirement}>聊天时长</List.Item>
            <List.Item extra={this.state.datas.communication}>聊天方式</List.Item>
            <List.Item extra={this.state.datas.orderid}>订单号</List.Item>
          </List>
        </div>
        <WhiteSpace size="md" />
        <List>
          <List.Item extra={this.state.coupons+"张"} arrow="horizontal">
            优惠券
          </List.Item>
          <List.Item extra={this.state.couponPrice+"元"}>优惠金额</List.Item>
        </List>
        <List>
          <List.Item extra={'实际支付：'+(this.state.price-this.state.couponPrice)+'元'}> </List.Item>
        </List>
        <WhiteSpace size="md" />
        <List className="content-item-border">
          <InputItem
            name="phone"
            type="number"
            maxLength={11}
            placeholder={"预约手机号"}
            onBlur={this.onPhoneBlur}
          >
            联系方式
          </InputItem>
        </List>
        <div className="flex padding l1">
              <div>
                <input className="payCheck" type="checkbox" onClick={this.checkagreement} />
              </div>
              同意知者
              <div className="c329" onClick={this.goAgreement}>
                《服务协议》
              </div>
            </div>
            <div className={this.state.showAgreement ? "agreement_bg" : "none"}>
            <div className="agreement">
            <div className="padding-ts tac" dangerouslySetInnerHTML={{__html: this.state.agreementTitle}} />
            <div className="padding scroll padding-b6" dangerouslySetInnerHTML={{__html: this.state.agreementContent}} />
            </div>
            <div className="pr-foot">
              <Button style={{width:'70%',margin:'0 auto 0.2rem'}} type="primary" onClick={this.goAgreement}>知道了</Button>
            </div>
          </div>
        <WhiteSpace size="md" />
        <div className="order_foot flex">
          <div className="order_foot_text">
            实际支付：<span className="c329">{this.state.price-this.state.couponPrice}元</span>
          </div>
          <div className="order_foot_btn back329" onClick={this.gopay} >去支付
          </div>
        </div>
      </div>
    );
  }
}
