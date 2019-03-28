import * as React from "react";
import {
  TabBar,
  List,
  NavBar,
  Grid,
  Carousel,
  SearchBar,
  SegmentedControl,
  WingBlank,
  WhiteSpace,
  TextareaItem,
  Slider,
  Button,
  Picker,
  // Tabs,
} from "antd-mobile";
import { History, Location } from "history";
import { UserStorage } from "../../storage/UserStorage";
import "./Home.css";

import tab_home from "../../assets/index.png";
import tab_home_n from "../../assets/index_no.png";
import tab_question from "../../assets/index_question.png";
import tab_question_n from "../../assets/index_question_no.png";
import tab_oando from "../../assets/index_oando.png";
import tab_oando_n from "../../assets/index_oando_no.png";
import tab_my from "../../assets/index_my.png";
import tab_my_n from "../../assets/index_my_no.png";

import Unpaid from "../../assets/my_Unpaid.png";
import Paid from "../../assets/my_Paid.png";
import Appointment from "../../assets/my_Appointment.png";
import Break_promise from "../../assets/my_Break_promise.png";
import Completed from "../../assets/my_Completed.png";
import credit from "../../assets/credit.png";

import my_order from "../../assets/my_order.png";
import my_coupon from "../../assets/my_coupon.png";
import my_extension from "../../assets/my_extension.png";
import my_collection from "../../assets/my_collection.png";
import my_message from "../../assets/my_message.png";
import my_register from "../../assets/my_register.png";
import my_feedback from "../../assets/my_feedback.png";
import my_service from "../../assets/my_service.png";
import my_about from "../../assets/my_about.png";
import icon_question from "../../assets/icon_question.png";
import first from "../../assets/first.png";

import bigV from "../../assets/bigV.png";
import bigStar from "../../assets/bigStar.png";
import defaults from "../../assets/default.png";
// import question from "../../assets/icon_question.png";
import hot from "../../assets/index_icon_hot.png";
import collection from "../../assets/index_icon_collection.png";
import pay from "../../assets/index_icon_pay.png";

import banner from "../../assets/banner.png";
import { UserService } from "../../service/UserService";
// import { model } from '../../model/model';
import { UIUtil } from "../../utils/UIUtil";
import { JSONS } from "src/utils/json";
// import { userInfo } from "os";
var wx = require("weixin-js-sdk");
const pageheight = window.innerHeight - 95;
const pagewidth = window.innerWidth;
const myOrderMenuData = [
  {
    icon: Unpaid,
    text: "未支付"
  },
  {
    icon: Paid,
    text: "已支付"
  },
  {
    icon: Appointment,
    text: "预约中"
  },
  {
    icon: Break_promise,
    text: "失约"
  },
  {
    icon: Completed,
    text: "已完成"
  }
];
const myBottomMenuData = [
  {
    icon: my_order,
    text: "我的订单"
  },
  {
    icon: my_coupon,
    text: "我的优惠券"
  },
  {
    icon: my_extension,
    text: "我的推广"
  },
  {
    icon: my_collection,
    text: "我的收藏"
  },
  {
    icon: my_message,
    text: "我的答案"
  },
  {
    icon: my_register,
    text: "注册知者"
  },
  {
    icon: my_feedback,
    text: "留言反馈"
  },
  {
    icon: my_service,
    text: "联系客服"
  },
  {
    icon: my_about,
    text: "关于我们"
  }
];
interface HomeProps {
  history: History;
  location: Location;
}

interface HomeState {
  selectedTab: "HomeTab" | "QuestionTab" | "OneOnOne" | "MyTab";
  tabIndex1: string;
  tabIndex2: string;
  isPS: boolean;
  PSTitle: string;
  PSContent: string;
  pageIndex: string;
  userInfo: any;
  index: number;
  banners: any;
  imgHeight: string;
  hotQuestion: any;
  isSearch: boolean;
  hotList:any;
  state: boolean;
  bannerState: boolean;
  //提问
  selectedCoinId: number;
  selectedCoinId2: number;
  titlevalue: string;
  contentvalue: string;
  peoples: number;
  topicsList: any;
  settopics: any;
  questionType: any;
  knowerType: any;
  min: number;
  max: number;
  answerPrice: any;
  showHot: boolean;
  hots: any;
  //一对一
  showProfile:boolean;
  countryid: string;
  countryList: any;
  countrys: any;
  countyValue: any;
  schoolid: string;
  schoolsList: any;
  schools: any;
  schoolValue: any;
  knowerlist: any;
  knower: any;
  apmentime: string;
  talkTime: any;
  talkType: any;
  communication: string;
  requirement: string;
  timeList: any;
  makeList: any;
}
export class Home extends React.Component<HomeProps, HomeState> {
  question: string;
  topic: string;
  knower_type_id: any;
  answer_number: string;
  answer_price: string;
  description: string;
  knower_type: any;
  //我要问
  queType: string;
  hotQue: string;
  //校园
  apmentime: string;
  knowerid: string;
  communication: string;
  constructor(props: HomeProps) {
    super(props);
    this.description = "";
    //   const dataSource = new ListView.DataSource({
    //     rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
    //   });
    this.state = {
      showProfile:false,
      pageIndex: "1",
      tabIndex1: '0',
      tabIndex2: '0',
      isPS: false,
      PSTitle: '',
      PSContent: '',
      selectedTab: "HomeTab",
      userInfo: "",
      banners: [],
      index: 0,
      imgHeight: "1",
      isSearch: false,
      hotList:[],
      state: false,
  bannerState: false,
      //提问
      hotQuestion: [],
      selectedCoinId: 0,
      selectedCoinId2: 0,
      titlevalue: "",
      contentvalue: "",
      peoples: 1,
      topicsList: [],
      settopics: [],
      questionType: [],
      knowerType: [],
      min: 1,
      max: 2,
      showHot: false,
      hots: [],
      answerPrice: [],
      //一对一
      countryid: "",
      schoolid: "",
      countyValue: [],
      schoolsList: [],
      schools: [],
      schoolValue: [],
      countryList: [],
      countrys: [],
      knowerlist: [],
      knower: {},
      apmentime: "",
      talkTime: [],
      communication: "",
      requirement: "",
      talkType: [],
      timeList: JSONS.dateList(),
      makeList: []
    };
  }
  //切换清空
  clearData = () => {
    this.question = "";
    this.topic = "";
    this.knower_type_id = "";
    this.answer_price = "";
    this.description = "";
    this.knower_type = [];
    //我要问
    this.queType = "";
    this.hotQue = "";
    //校园
    this.apmentime = "";
    this.knowerid = "";
    this.communication = "";
    this.setState({
      topicsList: [],
      //提问
      titlevalue: "",
      contentvalue: "",
      peoples: 1,
      settopics: [],
      //一对一
      countryid: "",
      schoolid: "",
      countyValue: [],
      schoolValue: [],
      knower: {},
      apmentime: "",
      communication: "",
      requirement: ""
    });
  };
  //是否第一次
  first = (str:string,index?:string) => {
    if(str == 'QuestionTab' && index == '0'){
      if(!UserStorage.getCookie('QuestionTab1')){
        this.setState({
          isPS: true,
          PSTitle:'关于我要问',
          PSContent:'你的留学问题可以直接问留学过来人！写下你的问题，选择回答对象、问题出价和答案数量，得到最直接的留学信息和经验。'
        })
        UserStorage.setCookie('QuestionTab1','yes')
      }
    }
    if(str == 'QuestionTab' && index == '1'){
      if(!UserStorage.getCookie('QuestionTab2')){
        this.setState({
          isPS: true,
          PSTitle:'关于别人在问',
          PSContent:'问题很多，但不知从何问起？ - 看看别人都在问些什么。留学小助手提示：得到答案后，还可以根据自己的留学需求继续追问！'
        })
        UserStorage.setCookie('QuestionTab2','yes')
      }
    }
    if(str == 'OneOnOne' && index == '0'){
      if(!UserStorage.getCookie('OneOnOne1')){
        this.setState({
          isPS: true,
          PSTitle:'关于跟我看校园',
          PSContent:'足不出户直接看自己的目标大学！直接、省时、省钱！你可以找到正在不同大学就读的学哥学姐，让他们用手机镜头带你实时看校园！无论是想了解学校、专业，宿舍、食堂、图书馆还是周边环境治安，都可以安坐家中掌握一手资讯！'
        })
        UserStorage.setCookie('OneOnOne1','yes')
      }
    }
    if(str == 'OneOnOne' && index == '1'){
      if(!UserStorage.getCookie('OneOnOne2')){
        this.setState({
          isPS: true,
          PSTitle:'关于一对一专享',
          PSContent:'留学选择没有标准答案，适合自己的才是最好的！不同的留学准备阶段，重心不同，对信息的需求类型也不同。如果你有规划或选择的困惑，找一位相应领域的专家或过来人，一对一聊一聊，也许能帮你理清思路，找准方向。'
        })
        UserStorage.setCookie('OneOnOne2','yes')
      }
    }
  }
  showPS = () => {
    this.setState({
      isPS:!this.state.isPS
    })
  }
  //切换
  changeTab = (e: any) => {
    this.first("QuestionTab",e.nativeEvent.selectedSegmentIndex);
    this.clearData();
    if(e.nativeEvent.selectedSegmentIndex =='1'){
      this.getRTopic('2');
    }
    this.setState({
      tabIndex1: e.nativeEvent.selectedSegmentIndex,
      pageIndex: "1",
      selectedCoinId: e.nativeEvent.selectedSegmentIndex * 1
    });
  };
  //切换
  changeTab2 = (e: any) => {
    this.first("OneOnOne",e.nativeEvent.selectedSegmentIndex);
    this.clearData();
    if(e.nativeEvent.selectedSegmentIndex =='1'){
      this.getRTopic('2');
    }
    this.setState({
      tabIndex2: e.nativeEvent.selectedSegmentIndex,
      pageIndex: "1",
      selectedCoinId2: e.nativeEvent.selectedSegmentIndex * 1
    });
  };
  //订单宫格
  onTapOrderMenu = (e: any) => {
    let index = e.currentTarget.dataset.index;
    if (index == "0") {
      this.props.history.push({
        pathname: "/questionList",
        state: { status: "1" }
      });
    } else if (index == "1") {
      this.props.history.push({
        pathname: "/questionList",
        state: { status: "2" }
      });
    } else if (index == "2") {
      this.props.history.push({
        pathname: "/questionList",
        state: { status: "3" }
      });
    } else if (index == "3") {
      this.props.history.push({
        pathname: "/questionList",
        state: { status: "4" }
      });
    } else if (index == "4") {
      this.props.history.push({
        pathname: "/questionList",
        state: { status: "5" }
      });
    }
  };
  //个人中心
  onTapMyMenu = (el: object, index: number) => {
    if (index == 0) {
      this.props.history.push("/questionList");
    } else if (index == 1) {
      this.props.history.push("/coupon");
    } else if (index == 2) {
      this.props.history.push("/extension");
    } else if (index == 3) {
      this.props.history.push("/collection");
    } else if (index == 4) {
      this.props.history.push("/message");
    } else if (index == 5) {
      if (this.state.userInfo.knower_status == "1") {
        this.props.history.push({
          pathname: "/registered",
          state: { page: 2 }
        });
        return;
      }
      if (this.state.userInfo.knower_status == "2") {
        UIUtil.showInfo("已注册！");
        return;
      }
      this.props.history.push("/registered");
    } else if (index == 6) {
      this.props.history.push("/feedback");
    } else if (index == 7) {
      // this.props.history.push("/customer");
      window.location.replace("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg5NTA4NTgzMA==&scene=126&bizpsid=0#wechat_redirect");
    } else if (index == 8) {
      this.props.history.push("/about");
    }
  };
  //用户信息
  getUserInfo = () => {
    let openid = UserStorage.getCookie("User.openid") || "1234";
    UserService.Instance.getUserInfo(openid)
      .then((userInfo:any) => {
        UserStorage.setCookie("userInfo", JSON.stringify(userInfo));
        UserStorage.setCookie("knower_status", userInfo.knower_status);
        
        this.setState({
          userInfo: userInfo
        });
      })
      .catch(err => {
        console.log(err.errmsg);
      });
  };
  /**
   * 提问
   */
  //题目
  gettitle = (e: any) => {
    this.setState({
      titlevalue: e
    });
    this.question = e;
  };
  //内容描述
  getcontent = (e: any) => {
    this.setState({
      contentvalue: e
    });
    this.description = e;
  };
  //类型
  select = (e: any) => {
    let list: any = this.state.knowerType;
    let idList: any = [];
    let nameList: any = [];
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = !data.isselect;
      }
    });
    this.setState({
      knowerType: list
    });
    list.map((data: any) => {
      if (data.isselect) {
        idList.push(data.id);
        nameList.push(data.name);
      }
    });
    let typeid = "";
    idList.map((data: any) => {
      typeid = typeid + "," + data;
    });
    this.knower_type_id = typeid.substr(1);
    console.log(idList.join());
    this.knower_type = nameList;
  };
  //别人问类型
  ooo_select = (e: any) => {
    let list: any = this.state.knowerType;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = true;
        this.knower_type_id = data.id;
        this.knower_type = data.name;
      } else {
        data.isselect = false;
      }
    });
    this.setState({
      knowerType: list
    });
  };
  //人数
  changepeople = (e: number) => {
    this.setState({
      peoples: e
    });
    this.answer_number = e + "";
  };
  //金额
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
    this.answer_price = e.currentTarget.dataset.money;
  };
  //问题分类
  setqueType = (e: any) => {
    this.setState({
      showHot: false
    });
    let list: any = this.state.questionType;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = true;
        this.hotQueation(data.id);
      } else {
        data.isselect = false;
      }
    });
    this.setState({
      questionType: list
    });
    this.queType = e.currentTarget.dataset.name;
  };
  //热门话题
  setCheckbox = (e: any) => {
    let list: any = this.state.hots;
    let idList: any = [];
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.ischeck = !data.ischeck;
      }
    });
    this.setState({
      hots: list
    });
    list.map((data: any) => {
      if (data.ischeck) {
        idList.push(data.id);
      }
    });
    this.hotQue = idList;
  };
  //展开话题
  showlist = (e: any) => {
    let list: any = this.state.hots;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.showlist = !data.showlist;
      }
    });
    this.setState({
      hots: list
    });
  };
  //话题多选
  onclose = (e: any) => {
    let list = this.state.settopics;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.settop = !data.settop
      }
    });
    this.setState({
      settopics: list
    });
  };
  getsearch = (e: any) => {
    UIUtil.showLoading("检索中...");
    UserService.Instance.getTopics("1", e)
      .then((res: any) => {
        this.setState({
          topicsList: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  getsearch2 = (e: any) => {
    UIUtil.showLoading("检索中...");
    UserService.Instance.getTopics("2", e)
      .then((res: any) => {
        this.setState({
          topicsList: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  //一对一
  //国家
  setCountry = (country: any) => {
    this.setState({
      countyValue: [country]
    });
    let countryid = "";
    for (let i of this.state.countryList) {
      if (i.country == country) {
        countryid = i.id;
        this.setState({
          countryid: countryid
        });
      }
    }
    UIUtil.showLoading('Loading');
    UserService.Instance.schoolRist(countryid)
      .then((res: any) => {
        let list: any = [];
        if(res.data.length != 0){
          res.data.map((data: any) => {
            list.push({ label: data.name, value: data.name });
          });
          this.setState({
            schoolid:res.data[0].id,
            schoolValue:[res.data[0].name],
            schoolsList: res.data,
            schools: list
          });
          this.getKnowerlist(res.data[0].id);
        } else {
          this.setState({
            schoolsList: res.data,
            schools: [{ label: "暂无", value: "暂无" }]
          });
        }
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  //学校
  setSchool = (school: any) => {
    for (let i of this.state.schoolsList) {
      if (i.name == school) {
        this.setState({
          schoolid: i.id
        });
        this.getKnowerlist(i.id);
      }
    }
    this.setState({
      schoolValue: [school]
    });
  };
  //知者列表
  getKnowerlist = (schoolid: string) => {
    UIUtil.showLoading('Loading');
    UserService.Instance.getKnowerlist(schoolid, this.state.countryid)
      .then((res: any) => {
        this.setState({
          knowerlist: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  showProfile = () => {
    this.setState({
      showProfile:!this.state.showProfile
    })
  }
  //知者详情
  setKnower = (e: any) => {
    let id = e.currentTarget.dataset.id;
    // let apmentime: any = "";
    for (let i of this.state.knowerlist) {
      if (id == i.id) {
        // apmentime = i.apmentime.split("@");
        this.setState({
          knower: {
            headimgurl: i.headimgurl,
            nickname: i.nickname,
            school: i.school,
            topic: i.topic,
            profile: i.profile,
            mark: i.mark
          }
        });
      }
    }
    // let timeList: any = [];
    // let makeweek: any = [];
    // for (let i of apmentime) {
    //   let data = i.split(",");
    //   let makeday: any = [];
    //   for (var j = 1; j < data.length; j++) {
    //     makeday.push({ hour: data[j]});
    //   }
    //   makeweek.push({ week: data[0], time: makeday });
    //   timeList.push({ title: data[0] });
    // }
    // this.setState({
    //   makeList: makeweek,
    //   timeList: timeList
    // });
    this.knowerid = id;
    this.nextPage();
  };
  setTime = (e:any) => {
    let list: any = this.state.timeList;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = !data.isselect;
      }
      let idList: any = [];
      let valList: any = [];
      list.map((data: any) => {
        if (data.isselect) {
          idList.push(data.name);
          valList.push(data.value);
        }
      });
      this.setState({
        timeList:list,
        apmentime:idList
      })
      this.apmentime = valList.join();
    });
  }
  // //时长
  settalkTime = (e: any) => {
    let list: any = this.state.talkTime;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = true;
      } else {
        data.isselect = false;
      }
    });
    this.setState({
      talkTime: list,
      requirement: e.currentTarget.dataset.id
    });
  };
  //沟通方式
  settalkType = (e: any) => {
    let list: any = this.state.talkType;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = !data.isselect;
      }
    });
    let ids:any = [];
    list.map((data: any) => {
      if (data.isselect) {
        ids.push(data.name);
      }
    });
    this.setState({
      talkType: list,
      communication: ids.join()
    });
  };
  //日历
  // renderContent = (tab: any) => (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       alignItems: "center",
  //       width: "100%",
  //       backgroundColor: "#fff"
  //     }}
  //   >
  //     {this.state.makeList.map((data: any, index: string) => {
  //       if (tab.title == data.week) {
  //         return data.time.map((res: any, index: string) => {
  //           return (
  //             <div
  //               className={res.isselect ? "oono_tag backE6F" : "oono_tag"}
  //               key={index}
  //               data-week={data.week}
  //               data-hour={res.hour}
  //               onClick={this.maketime}
  //             >
  //               {res.hour}
  //             </div>
  //           );
  //         });
  //       }
  //     })}
  //   </div>
  // );
  //选择时间
  // maketime = (e: any) => {
  //   let list: any = this.state.makeList;
  //   let apmentime = "";
  //   for (let i of list) {
  //     if (e.currentTarget.dataset.week == i.week) {
  //       i.time.map((res: any) => {
  //         if (res.hour == e.currentTarget.dataset.hour) {
  //           res.isselect = true;
  //           apmentime = i.week + "@" + res.hour;
  //           this.apmentime = i.week + " " + res.hour;
  //         } else {
  //           res.isselect = false;
  //         }
  //       });
  //     } else {
  //       i.time.map((res: any) => {
  //         res.isselect = false;
  //       });
  //     }
  //   }
  //   this.setState({
  //     apmentime: apmentime,
  //     makeList: list
  //   });
  // };
  //提问
  setQuestion = () => {
    if (this.state.selectedCoinId == 0) {
      let question = this.question,
        knower_type_id = this.knower_type_id,
        answer_number = this.answer_number,
        answer_price = this.answer_price,
        description = this.description;
      if (!question) {
        UIUtil.showInfo("问题不能为空");
        return;
      }
      if (!knower_type_id) {
        UIUtil.showInfo("向谁提问不能为空");
        return;
      }
      if (!answer_number) {
        UIUtil.showInfo("人数不能为空");
        return;
      }
      if (!answer_price) {
        UIUtil.showInfo("价格不能为空");
        return;
      }
      let data = {
        question,
        knower_type_id,
        answer_number,
        answer_price
      };
      if (description.length != 0) {
        data["description"] = description;
      }
      UIUtil.showLoading("订单生成中...");
      UserService.Instance.myAsk(data)
        .then((res: any) => {
          data["knower_type"] = this.knower_type;
          data["orderid"] = res.data.orderid;
          data["price"] = res.data.price;
          data["type"] = "1";
          this.props.history.push({
            pathname: "/order",
            state: { data: data }
          });
          UIUtil.hideLoading();
        })
        .catch(err => {
          UIUtil.hideLoading();
          UIUtil.showError(err);
        });
    }
    if (this.state.selectedCoinId == 1) {
      let answer_number = this.answer_number,
        answer_price = this.answer_price,
        hotQue = this.hotQue,
        knower_type_id = this.knower_type_id,
        queType = this.queType;
      if (!queType) {
        UIUtil.showInfo("问题类型不能为空");
        return;
      }
      if (!hotQue) {
        UIUtil.showInfo("热门问题不能为空");
        return;
      }
      if (!knower_type_id) {
        UIUtil.showInfo("向谁提问不能为空");
        return;
      }
      if (!answer_number) {
        UIUtil.showInfo("人数不能为空");
        return;
      }
      if (!answer_price) {
        UIUtil.showInfo("价格不能为空");
        return;
      }

      let data = {
        question_type: queType,
        questionid: hotQue,
        answer_number,
        answer_price,
        knower_type_id
      };
      UIUtil.showLoading("订单生成中...");
      UserService.Instance.otherAsk(data)
        .then((res: any) => {
          let list: any = this.state.hots;
          let questionid: any = [];
          list.map((data: any) => {
            if (data.ischeck) {
              questionid.push(data);
            }
          });
          let lists: any = this.state.questionType;
          lists.map((data: any) => {
            if (data.isselect) {
              data["question_type"] = data.name;
            }
          });
          data["orderid"] = res.data.orderid;
          data["questionid"] = questionid;
          data["price"] = res.data.price;
          data["type"] = "2";
          this.props.history.push({
            pathname: "/order",
            state: { data: data }
          });
          UIUtil.hideLoading();
        })
        .catch(err => {
          UIUtil.hideLoading();
          UIUtil.showError(err);
        });
    }
  };
  //生成校园单
  nextPage = () => {
    let page = this.state.pageIndex;
    if (page === "1") {
      let countryid = this.state.countryid,
        schoolid = this.state.schoolid;
      if (!countryid) {
        UIUtil.showInfo("国家不能为空");
        return;
      }
      if (!schoolid) {
        UIUtil.showInfo("学校不能为空");
        return;
      }
      page = "2";
    } else if (page === "2") {
      let knowerid = this.knowerid;
      if (!knowerid) {
        UIUtil.showInfo("请选择知者");
        return;
      }
      page = "3";
    } else if (page === "3") {
      let apmentime = this.apmentime;
      if (!apmentime) {
        UIUtil.showInfo("预约时间不能为空");
        return;
      }
      UIUtil.showLoading("订单生成中...");
      UserService.Instance.SOTOAsk(
        this.state.countryid,
        this.state.schoolid,
        this.knowerid,
        this.apmentime
      )
        .then((res: any) => {
          let data = {
            knower: this.state.knower,
            knowerid: this.knowerid,
            apmentime: this.apmentime,
            schoolid: this.state.schoolid,
            countryid: this.state.countryid,
            price: res.data.price,
            orderid: res.data.orderid,
            type: "3"
          };
          this.props.history.push({ pathname: "/pay", state: { data: data } });
          UIUtil.hideLoading();
        })
        .catch(err => {
          UIUtil.hideLoading();
          UIUtil.showError(err);
        });
    }
    this.setState({
      pageIndex: page
    });
  };
  upPage = () => {
    this.setState({
      pageIndex: '2'
    });
  }
  //生成一对一订单
  serOneOnOne = () => {
    let topics = "";
    this.state.settopics.map((data: any) => {
      if(data.settop){
        topics = topics + "," + data.id;
      }
    });
    this.topic = topics.substr(1);
    let topic = this.topic,
      knower_type_id = this.knower_type_id,
      requirement = this.state.requirement,
      communication = this.state.communication;
    if (!knower_type_id) {
      UIUtil.showInfo("知者类型不能为空");
      return;
    }
    if (!topic) {
      UIUtil.showInfo("话题不能为空");
      return;
    }
    if (!requirement) {
      UIUtil.showInfo("聊天时长不能为空");
      return;
    }
    if (!communication) {
      UIUtil.showInfo("沟通方式不能为空");
      return;
    }
    UIUtil.showLoading("订单生成中...");
    UserService.Instance.COTOAsk(
      knower_type_id,
      topic,
      requirement,
      communication,
      this.description
    )
      .then((res: any) => {
        let data = {
          price: res.data.price,
          orderid: res.data.orderid,
          topic: this.state.settopics,
          knower_type: this.knower_type,
          requirement: requirement,
          communication: communication,
          description: this.description,
          type: "4"
        };
        this.props.history.push({ pathname: "/pay", state: { data: data } });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  //搜索
  searchQue = () => {
    this.props.history.push("/search");
  };
  //收藏
  setFavorite = (e: any) => {
    if (UIUtil.not_weixin()) {
      UIUtil.showInfo("请在微信浏览器打开！");
      return;
    }
    e.nativeEvent.stopImmediatePropagation();
    UIUtil.showLoading("收藏中...");
    let id = e.currentTarget.dataset.id;
    UserService.Instance.fabsAndfavor(id)
      .then((res: any) => {
        if (res.data.favorstatus == "1") {
          UserService.Instance.delfavorQue(id)
            .then((res: any) => {
              UIUtil.hideLoading();
            })
            .catch(err => {
              UIUtil.hideLoading();
              UIUtil.showError(err);
            });
        }
        if (res.data.favorstatus == "-1") {
          UserService.Instance.favoriteQue(id)
            .then((res: any) => {
              UIUtil.hideLoading();
            })
            .catch(err => {
              UIUtil.hideLoading();
              UIUtil.showError(err);
            });
        }
        this.getShowQue();
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  //看详情
  goDetails = (e: any) => {
    let orderid = e.currentTarget.dataset.id;
    this.props.history.push({
      pathname: "/questionDetails",
      state: { type:'home',orderid: orderid }
    });
  };
  public componentDidUpdate() {}
  public componentWillMount() {}
  public componentDidMount() {
    // let tab: "HomeTab"|"MyTab" = theRequest.type == 'MyTab'?'MyTab':'HomeTab';
    this.wxConfig();
    this.setHomeTab();
    this.questionTab();
    this.setOneOnOne();
    this.getRTopic('1');
    this.getCRecomQue();
    this.getUserInfo();
    UIUtil.share();
    if (UIUtil.not_weixin()) {
      this.setState({
        selectedTab: "HomeTab"
      });
      return;
    }
    let typeTab = UserStorage.getCookie("type");
    let tab: "HomeTab" | "QuestionTab" | "OneOnOne" | "MyTab" =
      typeTab == "MyTab"
        ? "MyTab"
        : typeTab == "QuestionTab"
        ? "QuestionTab"
        : typeTab == "OneOnOne"
        ? "OneOnOne"
        : "HomeTab";
    let user: any = UserStorage.getCookie("userInfo");
    user = JSON.parse(user);
    this.setState({
      selectedTab: tab,
      userInfo: user,
      // goQuestion: tab === "HomeTab" ? true : false
    });

  }
  //首页
  setHomeTab = () => {
    //轮播
    UserService.Instance.banner()
      .then(res => {
        let that = this;
        this.setState({
          banners: res.data ? res.data : [{ img_path: banner }]
        });
        setTimeout(() => {
          that.setState({
            bannerState: true
          })
        }, 1000);
      })
      .catch(err => {
        UIUtil.showError(err);
        this.setState({
          banners: [{ img_path: banner }]
        });
      });
    this.getShowQue();
  };
  //推荐问题
  getShowQue = () => {
    UserService.Instance.getShowQue()
      .then((res: any) => {
        this.setState({
          hotQuestion: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  //提问
  questionTab = () => {
    //知者类型
    UserService.Instance.getKnowerType()
      .then((res: any) => {
        res.data.map((data: any) => {
          data["isselect"] = false;
        });
        this.setState({
          knowerType: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    //回答人数
    UserService.Instance.getAnswerNumber()
      .then((res: any) => {
        this.answer_number = res.data.min;
        this.setState({
          peoples: res.data.min * 1,
          min: res.data.min * 1,
          max: res.data.max * 1
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
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
    //问题分类
    UserService.Instance.getQueType()
      .then((res: any) => {
        res.data.map((data: any) => {
          data["isselect"] = false;
        });
        this.setState({
          questionType: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  getRTopic = (type:string) => {
    //推荐话题
    UserService.Instance.getRTopic(type)
    .then((res: any) => {
      let list: any = this.state.settopics;
      res.data.map((data:any,index:string)=>{
        list.push({ name: data.name, id: data.id, settop:false});
      })
      this.setState({
        settopics: list,
        topicsList: []
      });
      UIUtil.hideLoading();
    })
    .catch(err => {
      UIUtil.hideLoading();
      UIUtil.showError(err);
    });
  }
      
  //热门问题
  hotQueation = (type: string) => {
    UIUtil.showLoading('获取问题');
    UserService.Instance.getHotQue(type)
      .then((res: any) => {
        res.data.map((data: any) => {
          data["ischeck"] = false;
          data["showlist"] = false;
        });
        this.setState({
          hots: res.data,
          showHot: true
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  //一对一
  setOneOnOne = () => {
    //国家
    UIUtil.showLoading('Loading');
    UserService.Instance.countryList()
      .then((res: any) => {
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.country, value: data.country });
        });
        this.setState({
          countryList: res.data,
          countrys: list
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
    //聊天时长
    UserService.Instance.getRequire()
      .then((res: any) => {
        res.data.map((data: any) => {
          data["isselect"] = false;
        });
        this.setState({
          talkTime: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    //沟通方式
    UserService.Instance.getComcation()
      .then((res: any) => {
        res.data.map((data: any) => {
          data["isselect"] = false;
        });
        this.setState({
          talkType: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  //微信
  wxConfig = () => {
    UserService.Instance.getSignPackage(window.location.href)
      .then((res: any) => {
        wx.config({
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            "chooseWXPay",
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
          ]
        });
        wx.ready(function() {});
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  //推荐问题
  getCRecomQue = () => {
    let that = this;
    UserService.Instance.systemBulletin()
      .then((res: any) => {
        this.setState({
          hotList: res.data.list
        });
        UIUtil.hideLoading();
        setTimeout(() => {
          that.setState({
            state: true
          })
        }, 1000);
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  public render() {
    return (
      <div className="home-container">
        <div className="tab-bar-container margin-t0">
          <NavBar className="home-navbar">
            {this.state.selectedTab === "HomeTab"
              ? "留学你问我"
              : this.state.selectedTab === "QuestionTab"
              ? "提问"
              : this.state.selectedTab === "OneOnOne"
              ? "一对一专享"
              : "我的"}
          </NavBar>
          <TabBar
            unselectedTintColor="#B8B8BA"
            tintColor="#000000"
            barTintColor="#fff"
            tabBarPosition="bottom"
          >
            <TabBar.Item
              title="首页"
              key="HomeTab"
              selected={this.state.selectedTab === "HomeTab"}
              onPress={() => {
                this.setState({
                  // ...this.state,
                  selectedTab: "HomeTab"
                  // goQuestion: true
                });
                this.props.history.push("#HomeTab");
                UserStorage.setCookie("type", "HomeTab");
              }}
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(" +
                      tab_home_n +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    color: "#1FA4FC",
                    background:
                      "url(" +
                      tab_home +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
            >
              <div style={{ height: pageheight, width: pagewidth, position: 'relative' }}>
                <List>
                  <SearchBar
                    placeholder="搜索"
                    maxLength={8}
                    onFocus={this.searchQue}
                  />
                </List>
                <div>
                  <div className="home-banner">
                    <Carousel autoplay={this.state.bannerState} dots>
                      {this.state.banners.map((val: any, index: string) => (
                        val.type == '4'?
                        <a key={index}
                          onClick={()=>this.props.history.push({ pathname: '/couponGet', state: { cardid: val.cash_id } })}
                          style={{ display: "inline-block", width: "100%", height: this.state.imgHeight }}>
                          <img src={val.img_path} alt={val.title} style={{ width: "100%", height: "1.8rem", verticalAlign: "top"}} onLoad={() => { window.dispatchEvent(new Event("resize")); this.setState({ imgHeight: "1.8rem" });}}/>
                        </a>:
                        <a key={index}
                          href={val.link}
                          style={{ display: "inline-block", width: "100%", height: this.state.imgHeight }}>
                          <img src={val.img_path} alt={val.title} style={{ width: "100%", height: "1.8rem", verticalAlign: "top"}} onLoad={() => { window.dispatchEvent(new Event("resize")); this.setState({ imgHeight: "1.8rem" });}}/>
                        </a>
                      ))}
                    </Carousel>
                  </div>
                  <List>
                    <List.Item
                      thumb={hot}
                      arrow="horizontal"
                      extra={
                        <Carousel className="my-carousel" autoplay={this.state.state} dots={false} infinite={true}>
                          {this.state.hotList.map((type:any, index:number)=> (
                            <div className="v-item" key={index} onClick={() => this.props.history.push({pathname:"/notice",state:{data:type}})}>{type.title}</div>
                          ))}
                        </Carousel>
                      }
                    >
                      热门推文
                    </List.Item>
                  </List>
                  <List>
                    {this.state.hotQuestion.map((data: any, index: string) => {
                      return (
                        <div className="bbeee padding" key={index}>
                          <div className="flex padding-b">
                            <img
                              className="home_head"
                              src={data.headimgurl || defaults}
                            />
                            <span className="fs14 c999 padding-lsm">
                              {data.nickname}
                            </span>
                          </div>
                          <div data-id={data.orderid} onClick={this.goDetails}>
                            <div className="fs17 fb padding-b">
                              {data.question}
                            </div>
                            <div className="fs15 c666 lh14">
                              {data.description}
                            </div>
                          </div>
                          <div className="flex flex-j-sb">
                            <div className="flex c999">
                              <img
                                className="content_img"
                                src={
                                  data.favostatus != "1" ? collection : credit
                                }
                                data-id={data.orderid}
                                alt=""
                                onClick={this.setFavorite}
                              />
                              <span className="padding-lsm">{data.favo}</span>
                              <img
                                className="margin-l content_img"
                                src={pay}
                                alt=""
                              />
                              <span className="padding-lsm">{data.see}</span>
                            </div>
                            <div
                              className={
                                "home_pay b329 fs13 c329 text-cen " +
                                (data.userSee == 2 ? "" : "none")
                              }
                              onClick={() => this.props.history.push({pathname:"/seePay",state:{data:data.orderid}})}
                            >
                              ¥<span>{data.price}</span>看答案
                            </div>
                            <div
                              className={
                                "home_pay fs13 text-cen btn_not " +
                                (data.userSee != 2 ? "" : "none")
                              }
                            >
                              已付费
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </List>
                </div>
                <div className={this.state.selectedTab === "HomeTab"?"goQuestion":"none"} onClick={()=>{this.setState({selectedTab:"QuestionTab"})}}>
                  <img src={icon_question}/>
                </div>
              </div>
            </TabBar.Item>
            <TabBar.Item
              title="我要问"
              key="QuestionTab"
              selected={this.state.selectedTab === "QuestionTab"}
              onPress={() => {
                if (UIUtil.not_weixin()) {
                  UIUtil.showInfo("请在微信浏览器打开！");
                  return;
                }
                this.first("QuestionTab",this.state.tabIndex1);
                this.clearData();
                this.setState({
                  // ...this.state,
                  selectedTab: "QuestionTab",
                  // goQuestion: false,
                });
                this.getRTopic('1');
                this.props.history.push("#QuestionTab");
                UserStorage.setCookie("type", "QuestionTab");
              }}
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(" +
                      tab_question_n +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    color: "#1FA4FC",
                    background:
                      "url(" +
                      tab_question +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
            >
              <div
                style={{
                  height: pageheight,
                  width: pagewidth,
                  background: "#f2f2f2",
                  paddingBottom: '.5rem',
                }}
              >
                <div className="question_tab">
                  <SegmentedControl
                    values={["我要问", "别人在问"]}
                    selectedIndex={this.state.selectedCoinId}
                    onChange={this.changeTab}
                    style={{
                      height: ".35rem",
                      maxWidth: "3.45rem",
                      margin: "auto"
                    }}
                  />
                </div>
                <div className={this.state.selectedCoinId == 0 ? "" : "none"}>
                  <WhiteSpace size="md" />
                  <List>
                    <TextareaItem
                      placeholder="写下你的问题"
                      rows={3}
                      count={50}
                      onChange={this.gettitle}
                    />
                  </List>
                  <WhiteSpace size="md" />
                  <List renderHeader={() => "补充说明（可选）"}>
                    <TextareaItem
                      placeholder="问题背景、条件等详细信息"
                      rows={5}
                      count={100}
                      onChange={this.getcontent}
                    />
                  </List>
                  <WhiteSpace size="md" />
                  <List renderHeader={() => "向谁提问（可多选）"}>
                    <div className="wpadding flex flex-w">
                      {this.state.knowerType.map((data: any, index: string) => {
                        return (
                          <div
                            className={data.isselect ? "tag backE6F" : "tag"}
                            key={index}
                            data-name={data.name}
                            data-id={data.id}
                            onClick={this.select}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </List>
                  <WhiteSpace size="md" />
                  <List
                    renderHeader={() => "回答人数：" + this.state.peoples}
                  >
                    <WingBlank size="lg">
                      <div className="flex index_slider">
                        <div className="w10">{this.state.min}</div>
                        <div style={{ padding: 7, width: "80%" }}>
                          <Slider
                            min={this.state.min}
                            max={this.state.max}
                            onChange={this.changepeople}
                          />
                        </div>
                        <div className="w10">{this.state.max}</div>
                      </div>
                    </WingBlank>
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
                </div>
                <div className={this.state.selectedCoinId == 1 ? "" : "none"}>
                  <WhiteSpace size="md" />
                  <List renderHeader={() => "问题分类："}>
                    <div className="wpadding flex flex-w">
                      {this.state.questionType.map(
                        (data: any, index: string) => {
                          return (
                            <div
                              className={data.isselect ? "tag backE6F" : "tag"}
                              key={index}
                              data-id={data.id}
                              data-name={data.name}
                              onClick={this.setqueType}
                            >
                              {data.name}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </List>
                  <div className={this.state.showHot ? "" : "none"}>
                    <List renderHeader={() => "热门问题："}>
                      <div className="question_hot">
                        {this.state.hots.map((data: any, index: string) => {
                          return (
                            <div className="fs15" key={index}>
                              <div className="question_hot_list">
                                <div
                                    data-id={data.id}
                                    className={
                                      data.ischeck
                                        ? "question_checkbox set_checkbox"
                                        : "question_checkbox"
                                    }
                                    onClick={this.setCheckbox}
                                  />
                                  {data.name}
                                  <div
                                    data-id={data.id}
                                    className={
                                      data.showlist
                                        ? "question_showlist close_showlist"
                                        : "question_showlist"
                                    }
                                    onClick={this.showlist}
                                  />
                              </div>
                              <div className={"w100 bf2 c999 padding " + (data.showlist?'':'none')}>{data.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </List>
                  </div>
                  <List renderHeader={() => "向谁提问（可多选）"}>
                    <div className="wpadding flex flex-w">
                      {this.state.knowerType.map((data: any, index: string) => {
                        return (
                          <div
                            className={data.isselect ? "tag backE6F" : "tag"}
                            key={index}
                            data-name={data.name}
                            data-id={data.id}
                            onClick={this.select}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </List>
                  <WhiteSpace size="md" />
                  <List
                    renderHeader={() => "回答人数：" + this.state.peoples}
                  >
                    <WingBlank size="lg">
                      <div className="flex index_slider">
                        <div className="w10">{this.state.min}</div>
                        <div style={{ padding: 7, width: "80%" }}>
                          <Slider
                            min={this.state.min}
                            max={this.state.max}
                            onChange={this.changepeople}
                          />
                        </div>
                        <div className="w10">{this.state.max}</div>
                      </div>
                    </WingBlank>
                  </List>
                  <List>
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
                </div>
                <div className="question_btn">
                  <Button type="primary" onClick={this.setQuestion}>
                    确认提问
                  </Button>
                  <WhiteSpace />
                </div>
              </div>
            </TabBar.Item>
            <TabBar.Item
              title="一对一专享"
              key="OneOnOne"
              selected={this.state.selectedTab === "OneOnOne"}
              onPress={() => {
                if (UIUtil.not_weixin()) {
                  UIUtil.showInfo("请在微信浏览器打开！");
                  return;
                }
                this.first("OneOnOne",this.state.tabIndex2);
                this.clearData();
                this.setState({
                  // ...this.state,
                  selectedTab: "OneOnOne",
                  // goQuestion: false,
                  pageIndex: "1",
                });
                this.props.history.push("#OneOnOne");
                UserStorage.setCookie("type", "OneOnOne");
              }}
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(" +
                      tab_oando_n +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    color: "#1FA4FC",
                    background:
                      "url(" +
                      tab_oando +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
            >
              <div className="padding_b5" style={{ height: pageheight, width: pagewidth}}>
                <div className="question_tab">
                  <SegmentedControl
                    selectedIndex={this.state.selectedCoinId2}
                    values={["跟我看校园", "一对一咨询"]}
                    onChange={this.changeTab2}
                    style={{
                      height: ".35rem",
                      width: "3.45rem",
                      margin: "auto"
                    }}
                  />
                </div>
                <div
                  className={this.state.selectedCoinId2 == 0 ? "por" : "none"}
                >
                <WhiteSpace size="md" />
                  <div className={this.state.pageIndex === "1" ? "" : "none"}>
                  
                    <List
                      style={{ backgroundColor: "white" }}
                      className="picker-list"
                    >
                      <Picker
                        cols={1}
                        data={this.state.countrys}
                        title="国家"
                        extra={this.state.countyValue}
                        value={this.state.countyValue}
                        onChange={v => this.setCountry(v)}
                      >
                        <List.Item arrow="horizontal">选择国家</List.Item>
                      </Picker>
                    </List>
                    <List
                      style={{ backgroundColor: "white" }}
                      className="picker-list"
                    >
                      <Picker
                        cols={1}
                        data={this.state.schools}
                        title="学校"
                        extra={this.state.schoolValue}
                        value={this.state.schoolValue}
                        onChange={v => this.setSchool(v)}
                      >
                        <List.Item arrow="horizontal">选择学校</List.Item>
                      </Picker>
                    </List>
                  </div>
                  <div
                    className={this.state.pageIndex === "2" ? "fff vh61os" : "none"}
                  >
                    <WingBlank>
                      {this.state.knowerlist.map((data: any, index: string) => {
                        return (
                          <div
                            className="oono flex flex-a-start "
                            key={index}
                            data-id={data.id}
                            onClick={this.setKnower}
                          >
                            <div className="oono_head">
                              <img src={data.headimgurl || defaults} alt="" />
                            </div>
                            <div className="w80">
                              <div className="fs17 fb padding-b oono_name">
                                {data.nickname}
                                <img src={data.mark=='2'?bigV:data.mark=='1'?bigStar:''} alt=""/>
                              </div>
                              <div className="fs12 c666 padding-b">
                                {data.school}
                              </div>
                              <div className="fs14 text-14" dangerouslySetInnerHTML={{__html: data.profile}}></div>
                            </div>
                        
                          </div>
                        );
                      })}
                    </WingBlank>
                  </div>
                  <div
                    className={this.state.pageIndex === "3" ? "fff time vh61os" : "none"}
                  >
                    <WingBlank>
                      <div className="oono flex" onClick={this.showProfile}>
                        <div className="oono_head">
                          <img src={this.state.knower.headimgurl || defaults} alt="" />
                        </div>
                        <div className="w80">
                          <div className="fs17 fb padding-b oono_name">
                            {this.state.knower.nickname}
                            <img src={this.state.knower.mark=='2'?bigV:this.state.knower.mark=='1'?bigStar:''} alt=""/>
                          </div>
                          <div className="fs12 c666 padding-b">
                            {this.state.knower.school}
                          </div>
                        </div>
                        <div className="w10">
                          <div className={this.state.showProfile ? "question_showlist close_showlist" : "question_showlist"} />
                        </div>
                      </div>
                      <div className={"fs14 ofw " + (this.state.showProfile?'':'text-14')} dangerouslySetInnerHTML={{__html: this.state.knower.profile}}></div>
                      {/* <Tabs
                        tabs={this.state.timeList}
                        renderTabBar={props => (
                          <Tabs.DefaultTabBar {...props} page={3} />
                        )}
                      >
                        {this.renderContent}
                      </Tabs> */}
                      <List renderHeader={()=>"选择日期（可多选）"}>
                        <p className="c666">因留学生时差及上课原因，下单成功后客服将对接您及您选择的知者确认具体看校园时间</p>
                        <div className="wpadding flex flex-w ">
                          {this.state.timeList.map((data: any, index: string) => {
                            return (
                              <div
                                className={data.isselect ? "tag bor329 c329 fff" : "tag"}
                                key={index}
                                data-name={data.name}
                                data-id={data.id}
                                onClick={this.setTime}
                              >
                                {data.name}
                              </div>
                            );
                          })}
                        </div>
                      </List>
                    </WingBlank>
                  </div>
                  <div
                    className={
                      this.state.selectedTab === "OneOnOne" && this.state.selectedCoinId2 == 0
                        ? this.state.pageIndex == '3' ? "sub_btn question_btn0 flex page5" : "question_btn oono_btn"
                        : "none"
                    }
                  >
                      <Button className={this.state.pageIndex == '3' ? "" :"none"} type="ghost" onClick={this.upPage}>
                          上一步
                      </Button>
                      <Button type="primary" onClick={this.nextPage}>
                        下一步 {this.state.pageIndex}/3
                      </Button>
                  </div>
                </div>
                <div
                  className={this.state.selectedCoinId2 == 1 ? "por" : "none"}
                >
                  <WhiteSpace size="md" />
                  <List renderHeader={() => "咨询对象"}>
                    <div className="wpadding flex flex-w">
                      {this.state.knowerType.map((data: any, index: string) => {
                        return (
                          <div
                            className={data.isselect ? "tag backE6F" : "tag"}
                            key={index}
                            data-name={data.name}
                            data-id={data.id}
                            onClick={this.ooo_select}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </List>
                  <List renderHeader={() => "咨询话题（可多选）"}>
                    <div className="wpadding flex flex-w">
                      {this.state.settopics.map((data: any, index: string) => {
                        return (
                          <div
                            className={data.settop?"tag backE6F":"tag"}
                            key={index}
                            data-id={data.id}
                            onClick={this.onclose}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </List>
                  <List renderHeader={() => "咨询时长"}>
                    <div className="wpadding flex flex-w">
                      {this.state.talkTime.map((data: any, index: string) => {
                        return (
                          <div
                            className={data.isselect ? "tag backE6F" : "tag"}
                            key={index}
                            data-id={data.id}
                            onClick={this.settalkTime}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </List>
                  <List renderHeader={() => "咨询方式（可多选）"}>
                    <div className="wpadding flex flex-w">
                      {this.state.talkType.map((data: any, index: string) => {
                        return (
                          <div
                            className={data.isselect ? "tag backE6F" : "tag"}
                            key={index}
                            data-id={data.id}
                            data-label={data.name}
                            onClick={this.settalkType}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </List>
                  <WhiteSpace size="md" />
                  <List renderHeader={() => "具体要求（可选）"}>
                    <TextareaItem
                      placeholder="咨询要求、分点描述"
                      rows={3}
                      count={50}
                      onChange={this.getcontent}
                    />
                  </List>
                  <div
                    className={
                      this.state.selectedTab === "OneOnOne" &&
                      this.state.selectedCoinId2 == 1
                        ? "question_btn"
                        : "none"
                    }
                  >
                    <Button type="primary" onClick={this.serOneOnOne}>
                      下一步
                    </Button>
                  </div>
                </div>
              </div>
            </TabBar.Item>
            <TabBar.Item
              title="个人中心"
              key="MyTab"
              selected={this.state.selectedTab === "MyTab"}
              onPress={() => {
                if (UIUtil.not_weixin()) {
                  UIUtil.showInfo("请在微信浏览器打开！");
                  return;
                }
                this.getUserInfo();
                this.setState({
                  // ...this.state,
                  selectedTab: "MyTab"
                  // goQuestion: false
                });
                this.props.history.push("#MyTab");
                UserStorage.setCookie("type", "MyTab");
              }}
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(" +
                      tab_my_n +
                      ") center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    color: "#1FA4FC",
                    background:
                      "url(" + tab_my + ") center center /  21px 21px no-repeat"
                  }}
                />
              }
            >
              <div style={{ height: pageheight, width: pagewidth}}>
                <div className="my_content my_bg">
                  <div className="my_haed">
                    <img
                      className="my_logo"
                      src={
                        (this.state.userInfo &&
                          this.state.userInfo.headimgurl) ||
                        defaults
                      }
                    />
                  </div>
                  <div className="my_info_container">
                    <div className="my_nickname">
                      {/* 余额（元） */}
                      <div>
                        {this.state.userInfo && this.state.userInfo.nickname}
                      </div>
                    </div>
                  </div>
                  <div className="my_order_list flex">
                    {myOrderMenuData.map((data, index) => {
                      return (
                        <div
                          className="my_top_icon"
                          key={index}
                          data-index={index}
                          onClick={this.onTapOrderMenu}
                        >
                          <img src={data.icon} alt="" />
                          <div>{data.text}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <List className="my_profile_list">
                  <div className={this.state.userInfo && this.state.userInfo.isread_status == '1'?"doc":'none'}>·</div>
                  <Grid
                    data={myBottomMenuData}
                    hasLine={false}
                    onClick={this.onTapMyMenu}
                    columnNum={3}
                  />
                </List>
              </div>
            </TabBar.Item>
          </TabBar>
        </div>
        <div className={this.state.isPS ? "first_bg" : "none"}>
              <div className="first tac">
                <div className="tac fs18 fb">
                  <img src={first} alt=""/>
                </div>
                <div className="fs16 fb padding">
                  {this.state.PSTitle}
                </div>
                <div className="fs14 padding">
                  {this.state.PSContent}
                </div>
                <Button style={{width:'70%',margin:'0 auto 0.2rem'}} type="primary" onClick={this.showPS}>知道了</Button>
              </div>
            </div>
      </div>
    );
  }
}
