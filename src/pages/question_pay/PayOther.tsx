import * as React from "react";
import "./question.css";
import {
  NavBar,
  Icon,
  List,
  WingBlank,
  WhiteSpace,
  Button
} from "antd-mobile";
import { History, Location } from "history";
import { UserService } from '../../service/UserService';
import { UIUtil } from "../../utils/UIUtil";
// let countDownTimer:any = 0;

interface PayOrderProps {
  history: History;
  location: Location;
}

interface PayOrderState {
  showAgreement:boolean;
  agree:boolean;
  agreementTitle:string;
  agreementContent:string;
  balance:number;
  coupontype:string;
  price:number;
  coupons: string;
  question:string;
  description:string;
  knower_type:string;
  couponList: any;
  orderid:string;
  topics: any;
  question_type: string;
  hotQue: any;
  answer_number:string;
  answer_price:string;
  type:string;
}
export class PayOther extends React.Component<PayOrderProps, PayOrderState> {
  data:any;
  cardid:string;
  son: string;
  couponP:number;
  constructor(props: PayOrderProps) {
    super(props);
    this.state = {
      showAgreement:false,
      agree:false,
      agreementTitle:'',
      agreementContent:'',
      balance:0,
      coupontype:'1',
      question:'',
      description:'',
      knower_type:'',
      price:0,
      coupons: '0',
      couponList: [],
      orderid:'',
      topics: [],
      question_type: '',
      hotQue: [],
      answer_number:'',
      answer_price:'',
      type:'2'
    };
  }
  onRedirectBack = () => {
    const history = this.props.history;
    history.goBack();
  };
//支付
  gopay = () => {
    if(!this.state.agree){
      UIUtil.showInfo("请先阅读协议并勾选");
      return;
    }
    UIUtil.goPay(this, this.state.orderid, this.cardid, 'x');
  }

//优惠券
getCoupon = () => {
  this.props.history.push({pathname:"/couponType",state:{data:this.data,couponList:this.state.couponList,push:'/payOther'}});
}
getOrderDetails = (data:any,son?:string) => {
    let hotQue = [];
    if(son != undefined){
      let num:number = parseInt(son);
      hotQue.push(data.sonlist[num])
    } else {
      hotQue = data.sonlist
    }
    this.setState({
      coupontype:'2',
      question_type: data.question_type,
      hotQue: hotQue,
      orderid:data.corderid,
      price:data.sumPrice,
      answer_number: data.sonlist[0].answer_number,
      answer_price: data.sonlist[0].answer_price,
      type:'2',
      balance:this.couponP
    })
    UserService.Instance.myCardCount(data.sumPrice,data.type).then( (res:any) => {
      this.setState({
        coupons: res.data.count,
        couponList: res.data.list
      })
      UIUtil.hideLoading()
    }).catch( err => {
      UIUtil.hideLoading()
      UIUtil.showError(err)
    })
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
  public componentDidMount() {
    if(!this.props.location.state){
      this.props.history.goBack();
    return
    }
    let data = this.props.location.state.data;
    this.data = data;
    this.cardid = this.props.location.state.cardid||'';
    this.couponP = this.props.location.state.couponP||0;
    let son = this.props.location.state.son;
    this.getOrderDetails(data,son);
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
  }

  public render() {
    return (
      <div className="withdraw-container order_pay">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">提问支付</div>
        </NavBar>
        <List>
          <WingBlank className="padding-tb fs17">
            <div className="flex">
              <div className="c999 w06">话题：</div>
              <div>{this.state.question_type}</div>
            </div>
            <div className="flex flex-a-start">
              <div className="c999 w06">问题：</div>
              <div>
              {
                this.state.hotQue.map((data:any,index:string)=>{
                  return <div key={index}>{data.question}</div>
                })
              }
              </div>
            </div>
          </WingBlank>
        </List>
        <WhiteSpace size='md'></WhiteSpace>
        <List>
          <List.Item extra={this.state.answer_price+'元'}>答案出价</List.Item>
          <List.Item extra={this.state.answer_number+'人'}>限定答题人数</List.Item>
          <List.Item extra={this.state.orderid}>订单号</List.Item>
        </List>
        <WhiteSpace size='md'></WhiteSpace>
        <List>
        <List.Item extra={this.state.coupons + '张'} arrow="horizontal" onClick={this.getCoupon}>优惠券</List.Item>
        <List.Item extra={this.state.balance + '元'}>优惠金额</List.Item>
        <List.Item extra={'实际支付：'+(this.state.price-this.state.balance)+'元'}> </List.Item>
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
        <WhiteSpace size='md'></WhiteSpace>
        <div className="order_foot flex">
          <div className="order_foot_text">实际支付：<span className="c329">{(this.state.price-this.state.balance)}元</span></div>
          <div className="order_foot_btn back329" onClick={this.gopay}>确认提问</div>
        </div>        
      </div>
    );
  }
}
