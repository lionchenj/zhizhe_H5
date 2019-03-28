import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon, Button, WhiteSpace, List, TextareaItem } from "antd-mobile";
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
import { UserStorage } from "src/storage/UserStorage";
let strs:any = [];
interface QuestionDetailsProps {
  history: History;
  location: Location;
}

interface QuestionDetailsState {
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
  contentvalue: string;
  see:string;
  price:string;
  type: string;
  answer_star:string;
  userSee:string;
  userSeelist:any;
  answerPrice: any;
  showQuestioning: boolean;
  issueid: string
}

export class QuestionDetails extends React.Component<QuestionDetailsProps, QuestionDetailsState> {
  lv: any;
  orderid: any;
  isStatus: boolean;
  isCollection: boolean;
  ask_content : string;
  description: string;
  data:any;
  constructor(props: QuestionDetailsProps) {
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
      contentvalue: '',

      favo:'0',
      favostatus:'-1',
      see:'0',
      price:'0',
      type:'',
      userSee:'',
      answer_star:'0',
      //回答
      userSeelist:[],
      answerPrice: [],
      showQuestioning: false,
      issueid:''
    };
  }

  onRedirectBack = () => {
    if(this.state.isHome){
      this.props.history.push("/");
      return;
    }
    if(this.isCollection){
      this.props.history.push("/collection");
      return;
    }
    if(this.isStatus){
      this.props.history.push({ pathname: "/questionList", state: { status: this.state.status } });
      return;
    }
    this.props.history.push("/questionList");
  };
  componentDidMount() {
    //价格
    UserService.Instance.getAnswerPrice()
      .then((res: any) => {
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ money: data, isselect: false });
        });
        this.setState({
          answerPrice: list
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    let type =  false;
    let orderid = '';
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
      type = this.props.location.state.type;
      this.isStatus = this.props.location.state.isStatus;
      this.isCollection = this.props.location.state.isCollection;
    }else if(theRequest['orderid']){
      orderid = theRequest['orderid'];
      type = true;
    }else if(UserStorage.getCookie('orderid')){
      orderid = UserStorage.getCookie('orderid')||'';
      UserStorage.delCookie('orderid');
    }
    this.orderid = orderid;
    if(type){
      this.setState({
        isHome:true
      })
    }
    this.getOrderDetails(orderid);
  }

  getOrderDetails = (orderid:string) => {
    UIUtil.showLoading('链接中...');
    UserService.Instance.orderDetails(orderid).then( (res:any) => {
      if(res.data.topic[0] == null){
        res.data.topic = []
      }
      this.data = res.data;
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

  //内容描述
  getcontent = (e: any) => {
    this.setState({
      contentvalue: e
    });
    this.description = e;
  };
  //开始追问
  questioning = (e:any) => {
    this.setState({
      issueid: e.currentTarget.dataset.issueid,
      showQuestioning:!this.state.showQuestioning
    })
  }
  //评价
  setStar = (e:any) => {
    if(e.currentTarget.dataset.answerstar > '0'){
      this.setState({
        answer_star:e.currentTarget.dataset.answerstar
      })
      return;
    }
    this.setState({
      answer_star:e.currentTarget.dataset.star
    })
    UIUtil.showLoading("评价提交")
    UserService.Instance.setAnswerStar(e.currentTarget.dataset.answerid,e.currentTarget.dataset.star).then( (res:any) => {
      UIUtil.hideLoading()
    }).catch( err => {
        UIUtil.showError(err)
    })
  }
  //追问价格
  paymoney = (e: any) => {
    let list: any = this.state.answerPrice;
    list.map((data: any) => {
      if (e.currentTarget.dataset.money == data.money) {
        data.isselect = true;
      } else {
        data.isselect = false;
      }
    });
    this.setState({
      answerPrice: list
    });
    this.ask_content  = e.currentTarget.dataset.money;
  };
  //追问
  setQuestion = (e: any) => {
    UIUtil.showLoading("追问")
    UserStorage.setCookie('orderid',e.currentTarget.dataset.orderid);
    UserService.Instance.runAsk(e.currentTarget.dataset.answerid, this.description, this.ask_content).then( (res:any) => {
      UIUtil.goPay(this,res.data.orderid,"","6")
      this.setState({
        showQuestioning:false,
      })
      UIUtil.hideLoading()
    })
  }
  showRun = (data:any) => {
    data.map((res:any,index:string)=>{
      return (
      <div className='mbp'>
        <div className="flex flex-a-start fs15">
          <div className="details_headimg w15">追问：</div>
          <div className="">{res.ask_content||''}</div>
        </div>
        <div className="w100 tar c999">{res.ask_time||''}</div>
        <div className="flex flex-a-start fs15">
          <div className="details_headimg w15">回答：</div>
          <div className="">{res.anwser_content||''}</div>
        </div>
        <div className="w100 tar c999">{res.anwser_time||''}</div>
      </div>
    )
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
            <div className="flex flex-j-end">
              <span className="fs14 padding-l1">{this.state.answered_number}/{this.state.answer_number}个回答</span>
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
              <div className={this.state.isHome?"":"none"}>
                <div className={"home_pay b329 fs13 c329 text-cen "+(this.state.userSee == '2' ? "":"none")} onClick={() => this.props.history.push({pathname:"/seePay",state:{data:this.state.orderid}})}>
                  ¥<span>{this.state.price}</span>看答案
                </div>
                <div className={"home_pay fs13 text-cen btn_not "+(this.state.userSee != '2'?"":"none")}>
                  已付费
                </div>
              </div>
              <div className={this.state.isHome?"none":""}>
                <div className={"home_pay b329 fs13 c329 text-cen "+(this.state.status == '1'?"":"none")} onClick={()=>this.props.history.push({ pathname: "/order", state: { data: this.data } })}>
                    ¥<span>{this.state.price}</span>看答案
                  </div>
                <div className={"home_pay fs13 text-cen btn_not "+(this.state.status == '2'?"":"none")}>
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
                  <div key={index} className="runAnwser">
                    <div className="flex flex-a-start">
                      <div className="details_headimg"><img src={data.member_headimgurl||defaults} alt=""/></div>
                      <div className="wpadding3">
                        <div className="flex padding-r padding-bsm">
                          <div className="padding-rsm">{data.member_nickname}</div>
                          <div className="flex details_star">
                            <img src={data.star_level > '0'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '1'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '2'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '3'?credit:credit_n} alt=""/>
                            <img src={data.star_level > '4'?credit:credit_n} alt=""/>
                          </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: data.content}} />
                      </div>
                    </div>
                    <div className="flex c999 flex-j-end">
                      <div className={"w1 padding-l45 "+ (data.run_ask.length < 1?'':'none')}>
                        <Button type={"ghost"} size={"small"} data-issueid={data.issueid} onClick={this.questioning}>追问</Button>
                      </div>
                      <div className="flex set_star w40 padding-l2">
                        <img src={data.answer_star > '0'?credit:this.state.answer_star > '0'?credit:credit_n} data-star={'1'} data-answerid={data.id} data-answerstar={data.answer_star} onClick={this.setStar}/>
                        <img src={data.answer_star > '1'?credit:this.state.answer_star > '1'?credit:credit_n} data-star={'2'} data-answerid={data.id} data-answerstar={data.answer_star} onClick={this.setStar}/>
                        <img src={data.answer_star > '2'?credit:this.state.answer_star > '2'?credit:credit_n} data-star={'3'} data-answerid={data.id} data-answerstar={data.answer_star} onClick={this.setStar}/>
                        <img src={data.answer_star > '3'?credit:this.state.answer_star > '3'?credit:credit_n} data-star={'4'} data-answerid={data.id} data-answerstar={data.answer_star} onClick={this.setStar}/>
                        <img src={data.answer_star > '4'?credit:this.state.answer_star > '4'?credit:credit_n} data-star={'5'} data-answerid={data.id} data-answerstar={data.answer_star} onClick={this.setStar}/>
                      </div>
                      <div className="w25 tar" data-id={data.id} onClick={this.setFabulous}>
                        <img className="content_img margin-rs" src={zan} alt="" />
                        <span>{data.fabul_count}</span>
                      </div>
                    </div>

                      <div className={data.run_ask.length < 1?'none':'mbp'}>
                        {
                          data.run_ask.map((res:any,index:string)=>{
                            return (
                              <div key={index}>
                                <div className="flex flex-a-start fs15 padding-b">
                                  <div className="w15">追问：</div>
                                  <div className="w60" dangerouslySetInnerHTML={{__html: res.ask_content||''}} ></div>
                                  <div className="w25 tar c999">{res.ask_time||''}</div>
                                </div>
                                <div className="flex flex-a-start fs15 padding-b">
                                  <div className="w15">回答：</div>
                                  <div className="w60" dangerouslySetInnerHTML={{__html: res.anwser_content||''}} ></div>
                                  <div className="w25 tar c999">{res.anwser_time||''}</div>
                                </div>
                              </div>
                            )
                          })
                        }
                        <div className={"w1 "+ (data.run_ask.length > 0&&data.run_ask[data.run_ask.length-1].anwser_time.length > 0?'':'none')}>
                          <Button type={"ghost"} size={"small"} data-issueid={data.issueid} onClick={this.questioning}>追问</Button>
                        </div>
                      </div>
                    
                    <div className={this.state.showQuestioning && this.state.issueid == data.issueid?'mbp':'none'}>
                      <List renderHeader={() => "问题详情"}>
                        <TextareaItem
                          placeholder="问题背景、条件等详细信息"
                          rows={5}
                          count={100}
                          onChange={this.getcontent}
                        />
                      </List>
                      <WhiteSpace size="md" />
                      <List >
                        <List.Item multipleLine onClick={() => {}}>你的出价（单价）<List.Item.Brief>出价越高，成交几率越高</List.Item.Brief></List.Item>
                          <div className="wpadding flex flex-w">
                            {this.state.answerPrice.map(
                              (data: any, index: string) => {
                                return (
                                  <div
                                    className={data.isselect ? "tag backE6F" : "tag"}
                                    key={index}
                                    data-money={data.money}
                                    onClick={this.paymoney}
                                  >
                                    {data.money}元
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </List>
                        <div className="question_btn">
                        <Button type="primary" data-answerid={data.id} data-orderid={data.issueid} onClick={this.setQuestion}>
                          确认提问
                        </Button>
                        <WhiteSpace />
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
