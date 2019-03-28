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

interface SeePayProps {
  history: History;
  location: Location;
}

interface SeePayState {
  showAgreement:boolean;
  agree:boolean;
  agreementTitle:string;
  agreementContent:string;
  balance:number;
  coupontype:string;
  payPrice:number;
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
export class SeePay extends React.Component<SeePayProps, SeePayState> {
  data:any;
  cardid:string;
  couponP:number;
  constructor(props: SeePayProps) {
    super(props);
    this.couponP = 0;
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
      payPrice:0,
      price:0,
      coupons: '0',
      couponList: [],
      orderid:'',
      topics: [],
      question_type: '',
      hotQue: [],
      answer_number:'',
      answer_price:'',
      type:'1'
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
    if(this.state.price == 0){
      UIUtil.showLoading("跳转支付");
      UserService.Instance.zeroAnswer(this.state.orderid)
      .then((res: any) => {
        if(res.errno == 0){
          this.props.history.push({
            pathname: "/questionDetails",
            state: { orderid: this.state.orderid }
          });
        }
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
      return;
    }
    UIUtil.seePay(this, this.state.orderid,'1',this.cardid);
  }

//优惠券
getCoupon = () => {
  this.props.history.push({pathname:"/couponType",state:{data:this.state.orderid,couponList:this.state.couponList,push:'/seePay'}});
}
getOrderDetails = (orderid:string) => {
    UIUtil.showLoading('链接中...');
    UserService.Instance.orderDetails(orderid).then( (res:any) => {
      if(res.data.topic[0] == null){
        res.data.topic = []
      }
      this.setState({
        orderid: res.data.orderid,
        question: res.data.question,
        topics: res.data.topic,
        question_type: res.data.question_type,
        answer_number: res.data.answer_number,
        answer_price: res.data.answer_price,
        description:res.data.description,
        price:res.data.price - this.couponP,
        type:res.data.type,
        payPrice:res.data.answer_number*res.data.answer_price,
        knower_type: res.data.knower_type,
        balance:this.couponP,
      })
      UserService.Instance.myCardCount(res.data.price,res.data.type).then( (res:any) => {
        this.setState({
          coupons: res.data.count,
          couponList: res.data.list
        })
        UIUtil.hideLoading()
      }).catch( err => {
        UIUtil.hideLoading()
        UIUtil.showError(err)
      })
    }).catch( err => {
        UIUtil.showError(err)
    })
  }
  public componentDidMount() {
    if(!this.props.location.state){
      this.props.history.goBack();
    return
    }
    let orderid = this.props.location.state.data;
    this.cardid = this.props.location.state.cardid||'';
    this.couponP = this.props.location.state.couponP||0;
    this.getOrderDetails(orderid);
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
          <div className="nav-title">提问支付</div>
        </NavBar>
        <List>
          <WingBlank className="padding-tb fs17">
            <div className="order_label c329 flex">
            {this.state.topics.map((data: any, index: string) => {
              return (
                <div className="margin-rsm" key={index}>#{data}#</div>
              );
            })}
            </div>
          <div className="fs17 fb padding-b">
            {this.state.question}
          </div>
          <div className="fs15 c666 lh14">
            {this.state.description}
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
          <div className="order_foot_btn back329" onClick={this.gopay}>看答案</div>
        </div>        
      </div>
    );
  }
}
