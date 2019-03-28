import * as React from "react";

import {
  NavBar,
  Icon,
  Button,
  WhiteSpace,
  TextareaItem,
  InputItem,
  ImagePicker,
  //   Toast,
  List,
  Picker,
  // Tabs
} from "antd-mobile";
import { History, Location } from "history";
import { UserStorage } from "../../storage/UserStorage";
import { UserService } from "../../service/UserService";
import { UIUtil } from "../../utils/UIUtil";
import { JSONS } from "../../utils/json";
import defaults from "../../assets/default.png";

interface studentRegProps {
  history: History;
  location: Location;
}

interface studentRegState {
  page: string;
  showAgreement: boolean;
  agreementTitle: string;
  agreementContent: string;
  agree: boolean;
  files: any[];
  pageIndex: number;
  ischeckIDcard: boolean;
  checkIDcardmsg: string;
  // showtime: boolean;
  // showOnOtime: boolean;
  showType:boolean;
  isOtherSchool:boolean;
  isOtherMajor: boolean;
  headimgurl: string;	//知者头像
  nickname: string; //昵称
  mobile: string;	//手机号码
  area_code: string;	//区号
  area_codes: any;	//区号
  area_codeList: any;	//区号
  areaCodesValue:any;
  code:string;
  wechatnum: string;	//微信号
  email: string;	//邮箱
  communication: string;	//交流方式
  communicationList:any;
  communicationValue: any;
  identity_card: string;	//身份证号码
  identity_name: string;	//真实姓名
  service_options: string;	//服务选项：1、提问、2、游校园、3、一对一咨询(多选用逗号隔开) 
  service_optionsValue:any;
  service_optionsList: any;
  profile:string;
  country: string;	//国家
  school: string;	//学校
  major: string;	//专业
  education: string;	//学历
  reading_grade: string;	//在读年级
  countrys: any;	//国家
  schools: any;	//学校
  schoolsList: any;	//学校
  majors: any;	//专业
  majorsList:any;
  educations: any;	//学历
  reading_grades: any;	//在读年级
  countryValue: any; //擅长留学国家
  schoolValue: any; //学校
  majorValue: any; //专业
  educationValue: any; //学历
  gradeValue:any;//年级

  studentimg: string;	//学生证
  examination: string;	//考试和分数区间
  // apmentime: any;
  // timeList: any;
  // weekList: any;
  sValue: any;
  examinations: any;
  scores: any;
  scoresValue: any;
  scorelist:any;
  scoresList: any;
}
const pageheight = window.innerHeight - 45 - 70;
const pagewidth = window.innerWidth;
export class studentReg extends React.Component<studentRegProps,studentRegState> {
  registerData: {
    headimgurl: string; //微信授权头像
    nickname: string; //昵称
    wechatnum: string; //微信号
    email: string; //邮箱
    area_code: string;
    mobile: string; //手机
    country: string; //国家
    school: string; //学校
    major: string; //专业
    education: string; //学历
    reading_grade:string;//年级
    studentimg: string; //学生证
    examination: string; //托福@分数
    profile: string; //个人简介
    identity_name: string; //姓名
    identity_card: string; //身份证
    service_options: string; //项目
    communication: string;//交流方式
    // apmentime: string; //预约时间
    school2: string; //学校
    major2: string; //专业
    type:'1'
  };
  grade:any;  
  scorelist:any;
  examinations: any;
  topicList: any;
  constructor(props: studentRegProps) {
    super(props);
    this.examinations = [];
    this.topicList = [];
    this.registerData = {
      // id: "", //用户id
      // page1
      headimgurl: "", //微信授权头像
      nickname: "", //昵称
      wechatnum: "", //微信号
      email: "", //邮箱
      area_code: "",
      profile: "", //个人简介
      // page2
      country: "", //擅长留学国家
      school: "", //学校
      major: "", //专业
      education: "", //学历
      reading_grade:"",
      studentimg: "", //学生证
      // page3
      examination: "", //分数
      identity_name: "", //姓名
      mobile: "", //手机
      identity_card: "", //身份证
      // page4
      service_options: "", //项目
      communication: "",
      // apmentime: "", //预约时间

      school2: "", //学校
      major2: "", //专业
      type:'1'
    };
    this.state = {
      pageIndex: 1,
      showAgreement: false,
      agree: false,
      agreementTitle: "",
      agreementContent: "",
      page: "1",
      files: [],
      ischeckIDcard: false,
      checkIDcardmsg: '',
      // showtime:false,
      // showOnOtime: false,
      showType: false,
      isOtherSchool: false,
      isOtherMajor: false,
      service_options:'',
      service_optionsList: JSONS.serviceOptions(),
      service_optionsValue: [],

      countrys: [], //国家
      schools: [], //学校
      majors: [], //专业
      majorsList:[],
      educations: JSONS.educations(), //学历
      reading_grades:[],//年级

      sValue: [],
      scores: [],
      scorelist: [],
      scoresList: [],
      examinations: [],
      // timeList: JSONS.dateList(),
      // weekList: JSONS.weekTime(),
      countryValue: [], //擅长留学国家
      schoolValue: [], //学校
      majorValue: [], //专业
      educationValue: [], //学历
      gradeValue:[],//年级
      scoresValue: {},

      headimgurl:defaults,
      nickname: "", //昵称
      wechatnum: "", //微信号
      email: "", //邮箱
      profile: "", //个人简介
      country: "", //擅长留学国家
      school: "", //学校
      schoolsList: [],
      major: "", //专业
      education: "", //学历
      reading_grade:"",
      studentimg: "", //学生证
      examination: "", //托福@分数
      identity_name: "", //姓名
      mobile: "", //手机
      area_code: "",
      area_codes:[],
      area_codeList:[],
      areaCodesValue:['中国'],
      code:'+86',
      identity_card: "", //身份证
      communication: '',	//交流方式
      communicationList: JSONS.communication(),
      communicationValue: [],
      // apmentime: [] //预约时间
    };
  }

  onRedirectBack = () => {
    const history = this.props.history;
    history.goBack();
  };
  
  //学生证
  onChange = (files: any[], type: any, index: number) => {
    UIUtil.showLoading("上传中");
    UserService.Instance.uploadFile(files[0].file)
      .then(avatarUrl => {
        this.setState({
          studentimg: avatarUrl
        });
        this.registerData.studentimg = avatarUrl;
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
    this.setState({
      files
    });
  };
  //上传头像
  onAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let that = this;
    event.preventDefault();
    const files = event.target.files;
    if (!files || files.length == 0) {
      return;
    }
    UIUtil.showLoading("上传中");
    UserService.Instance.uploadFile(files[0])
      .then(avatarUrl => {
        that.registerData["headimgurl"] = avatarUrl;
        that.setState({
          headimgurl: avatarUrl
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  //获取内容
  //昵称
  onNicknameBlur = (val: string) => {
    this.setState({
      nickname: val //昵称
    });
    this.registerData.nickname = val;
  };
  //微信
  onWechatBlur = (val: string) => {
    this.setState({
      wechatnum: val
    });
    this.registerData.wechatnum = val;
  };
  //邮箱
  onEmailBlur = (val: string) => {
    this.setState({
      email: val //邮箱
    });
    this.registerData.email = val;
  };
  //区号
  setAreaCode = (val:any) => {
    let code = '';
    this.state.area_codeList.map((data:any)=>{
      if(data.country_zh == val[0]){
        code = data.code
      }
    })
    this.registerData.area_code = code;
    this.setState({
      code:code,
      areaCodesValue:[val]
    })
  }
  //个人简介
  onProfileBlur = (val: string) => {
    this.setState({
      profile: val //个人简介
    });
    this.registerData.profile = val;
  };
  //留学国家
  setCountry = (val: any) => {
    UIUtil.showLoading('');
    UserService.Instance.schoolList(val[0])
      .then((res: any) => {
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.name, value: data.name });
        });
        list.push({ label: '其他', value: '其他' });
        this.setState({
          schoolsList: res.data,
          schools: list
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
    this.setState({
      country: val[0], //擅长留学国家
      countryValue: val //擅长留学国家
    });
    this.registerData.country = val[0];
  };
  onSchoolBlur = (val:string) => {
    this.setState({
      school: val, //学校
    })
    this.registerData.school2 = val;
  }
  onMajorBlur = (val:string) => {
    this.setState({
      major: val,
    })
    this.registerData.major2 = val;
  }
  //学校
  setSchool = (val: any) => {
    let schoolid = "";
    if(val == "其他"){
      this.setState({
        isOtherSchool:true,
        isOtherMajor: true,
        schoolValue: [val] //学校
      })
      this.registerData.school = '0';
      return;
    }else{
      this.setState({
        isOtherSchool:false,
        isOtherMajor:false
      })
    }
    for (let i of this.state.schoolsList) {
      if (val[0] === i.name) {
        schoolid = i.id;
      }
    }
    UIUtil.showLoading('');
    UserService.Instance.professionalList(schoolid)
      .then((res: any) => {
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.name, value: data.name });
        });
        this.setState({
          majorsList: res.data,
          majors: list
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
    this.setState({
      school: val, //学校
      schoolValue: [val] //学校
    });
    this.registerData.school = schoolid;
  };
  //专业
  setMajor = (val: any) => {
    let majorsid = "";
    if(val == "其他"){
      this.setState({
        isOtherMajor: true,
        majorValue: [val]
      })
      this.registerData.major = '0';
      return;
    }else{
      this.setState({
        isOtherMajor:false
      })
    }
    for (let i of this.state.majorsList) {
      if (val[0] === i.name) {
        majorsid = i.id;
      }
    }
    this.setState({
      major: val, //专业
      majorValue: [val] //专业
    });
    this.registerData.major = majorsid;
  };
  //学历
  setEducation = (val: any) => {
    this.setState({
      education: val,
      educationValue: [val] //学历
    });
    this.registerData.education = val[0];
  };
  //年级
  setGrade = (val: any) => {
    this.setState({
      reading_grade: val, //学历
      gradeValue: [val] //学历
    });
    this.registerData.reading_grade = val[0];
  };
  //姓名
  onNameBlur = (val: any) => {
    this.setState({
      identity_name: val //姓名
    });
    this.registerData.identity_name = val;
  };
  //手机
  onPhoneBlur = (val: any) => {
    this.setState({
      mobile: val //手机
    });
    this.registerData.mobile = val;
  };
  //身份证
  onIDcardBlur = (val: any) => {
    this.setState({
      identity_card: val //身份证
    });
    this.registerData.identity_card = val;
  };
  //分数 val：学校 score：分数
  setScore = (val: any, score: any) => {
    let data = this.state.scoresValue;
    let ishas = true;
    data[val] = score;
    let scoreList = this.state.scoresList;
    for (let i of scoreList) {
      if (i.name == val) {
        i.score = score[0];
        ishas = false;
      }
    }
    if (ishas) {
      scoreList.push({ name: val, score: score });
    }
    this.setState({
      scoresList: scoreList,
      scoresValue: data
    });
  };

  //项目
  setProject = (e: any) => {
    // let istime = false;
    // let showOnOtime = false;
    let isType = false;
    // let num = 0;
    let list: any = this.state.service_optionsList;
    list.map((data: any) => {
      if (e.currentTarget.dataset.label == data.label) {
        data.isselect = !data.isselect;
      }
    });
    let idList: any = [];
    list.map((data: any) => {
      if (data.isselect) {
        idList.push(data.label);
        if(data.label == "提问"){
          isType = true;
        }
        if(data.label == "游校园"){
          // num = num + 1;
          // istime = true;
        }
        if(data.label == "一对一咨询"){
          // num = num +2;
          // showOnOtime = true;
          isType = true;
        }
      }
    });
    // let jsonData = JSONS.dateList();
    // if(num == 1){
    //   jsonData = JSONS.dateList();
    // }
    // if(num == 2){
    //   jsonData = JSONS.dateList();
    // }
    // if(num == 3){
    //   jsonData = JSONS.dateList();
    // }
    this.setState({
      // timeList: jsonData,
      // showtime: istime,
      showType: isType,
      // showOnOtime: showOnOtime,
      service_optionsList:list,
      service_options:idList.join()
    });
    this.registerData.service_options = idList.join();
  };
  //交流方式
  setCommunication = (e: any) => {
    let list: any = this.state.communicationList;
    list.map((data: any) => {
      if (e.currentTarget.dataset.label == data.label) {
        data.isselect = !data.isselect;
      }
    });
    this.setState({
      communicationList:list,
    });
    let idList: any = [];
    list.map((data: any) => {
      if (data.isselect) {
        idList.push(data.label);
      }
    });
    this.setState({
      communication:idList.join()
    })
    this.registerData.communication = idList.join();
  };
  //验证身份证
  checkIDcard = (val: any) => {
    UIUtil.showLoading('验证中...');
    UserService.Instance.identity(
      this.registerData.identity_card,
      this.registerData.identity_name
    )
      .then((res: any) => {
        UIUtil.hideLoading();
        console.log(res.data.status);
        if (res.data.status == "01") {
          this.setState({
            checkIDcardmsg: res.data.msg,
            ischeckIDcard: true
          });
        } else {
          UIUtil.showInfo("输入有误验证失败");
        }
      })
      .catch(err => {
        console.log(err);
        UIUtil.showInfo("输入有误验证失败");
        // UIUtil.showError(err)
      });
  };
  //考试项目
  setExamination = (e:any) => {
    let list: any = this.state.examinations;
    let lists: any = [];
    let name = e.currentTarget.dataset.name
    list.map((data:any)=>{
      if(name == data.name){
        data.isselect = !data.isselect;
      }
      if(data.isselect){
        lists.push(data);
      }
    })
    this.setState({
      examinations: list,
      scores: lists
    });
  };
  //时间
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
  //     {this.state.timeList.map((data: any, index: string) => {
  //       if (tab.title == data.week) {
  //         return data.time.map((res: any, index: string) => {
  //           return (
  //             <div
  //               className={res.select ? "oono_tag backE6F" : "oono_tag"}
  //               key={index}
  //               onClick={this.maketime.bind(this, tab.title, res.id)}
  //             >
  //               {res.hour}
  //             </div>
  //           );
  //         });
  //       }
  //     })}
  //   </div>
  // );
  // renderContent2 = (tab: any) => (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       alignItems: "center",
  //       width: "100%",
  //       backgroundColor: "#fff"
  //     }}
  //   >
  //     {this.state.timeList.map((data: any, index: string) => {
  //       if (tab.title == data.week) {
  //         return data.time.map((res: any, index: string) => {
  //           return (
  //             <div
  //               className={res.select ? "oono_tag backE6F" : "oono_tag"}
  //               key={index}
  //             >
  //               {res.hour}
  //             </div>
  //           );
  //         });
  //       }
  //     })}
  //   </div>
  // );
  // maketime = (tab: string, id: string, e: any) => {
  //   let list: any = this.state.timeList;
  //   list.map((data: any) => {
  //     if (tab == data.week) {
  //       data.time.map((res: any) => {
  //         if (id == res.id) {
  //           res.select = !res.select;
  //         }
  //       });
  //     }
  //   });
  //   this.setState({
  //     timeList: list
  //   });
  // };
  
  //上一步
  onSubmitup = () => {
    let page = this.state.pageIndex - 1;
      this.setState({
        pageIndex: page
      });
  }
  //提交
  onSubmit = () => {
    if (this.state.pageIndex === 5) {
      console.log(this.registerData)
      if (!this.state.agree) {
        UIUtil.showInfo("请先阅读协议并勾选");
        return;
      }
      UIUtil.registerKnower(this,this.registerData);
    } else {
      if (this.state.pageIndex === 1) {
        if(!this.registerData.headimgurl){
          UIUtil.showInfo("头像不能为空");
          return;
        }
        if(!this.registerData.nickname){
          UIUtil.showInfo("昵称不能为空");
          return;
        }
        if(!this.registerData.wechatnum){
          UIUtil.showInfo("微信号不能为空");
          return;
        }
        if(UIUtil.check('email',this.registerData.email)){
          UIUtil.showInfo("邮箱格式错误");
          return;
        }
        if(!this.registerData.mobile){
          UIUtil.showInfo("手机不能为空");
          return;
        }
      }
      if (this.state.pageIndex === 2) {
        if(!this.registerData.country){
          UIUtil.showInfo("国家不能为空");
          return;
        }
        if(this.state.isOtherSchool){
          if(!this.registerData.school2){
            UIUtil.showInfo("学校不能为空");
            return;
          }
          if(!this.registerData.major2){
            UIUtil.showInfo("专业不能为空");
            return;
          }
        } else {
          if(!this.registerData.school){
            UIUtil.showInfo("学校不能为空");
            return;
          }
          if(!this.registerData.major){
            UIUtil.showInfo("专业不能为空");
            return;
          }
        }
        if(!this.registerData.education){
          UIUtil.showInfo("学历不能为空");
          return;
        }
        if(!this.registerData.reading_grade){
          UIUtil.showInfo("年级不能为空");
          return;
        }
        if(!this.registerData.studentimg){
          UIUtil.showInfo("学生证不能为空");
          return;
        }
        if(this.state.scores.length > 0){
          //处理分数
          let examination = '';
          for(let i of this.state.scoresList){
            examination = examination + ',' + i.name + '@' + i.score;
          }
          this.registerData.examination = examination.substr(1);
          if(!this.registerData.examination){
            UIUtil.showInfo("考试分数不能为空");
            return;
          }
        }
      }
      if (this.state.pageIndex === 3) {
        if(!this.registerData.identity_name){
          UIUtil.showInfo("姓名不能为空");
          return;
        }
        if(!this.registerData.identity_card){
          UIUtil.showInfo("身份证不能为空");
          return;
        }
        if(!this.state.ischeckIDcard){
          UIUtil.showInfo("请验证身份证");
          return;
        }
      }
        if (this.state.pageIndex === 4) {
          if(!this.registerData.service_options){
            UIUtil.showInfo("服务项目不能为空");
            return;
          }
        if(!this.state.showType && !this.registerData.communication){
          UIUtil.showInfo("交流方式不能为空");
          return;
        }
          // // 处理预约时间
          // let weeks: any = [];
          // let list: any = this.state.timeList;
          // list.map((data: any) => {
          //   for (let i of data.time) {
          //     if (i.select) {
          //       weeks.push({ week: data.week, time: [] });
          //       return;
          //     }
          //   }
          // });
          // let week='',time='';
          // weeks.map((data: any) => {
          //   for (let j of list) {
          //     if (data.week == j.week) {
          //       j.time.map((res: any) => {
          //         if (res.select) {
          //           data.time.push(res.hour);
          //           time = time + ',' + res.hour
          //         }
          //       });
          //     }
          //   }
          //   week = week + '@' + data.week + ',' + time;
          // });
          // week = week.substr(1);
          // week = week.replace(/\,,/g,',');
          // if(this.state.showtime &&!this.registerData.apmentime){
          //   UIUtil.showInfo("可预约时间不能为空");
          //   return;
          // }
        }
      }
      let page = this.state.pageIndex + 1;
      this.setState({
        pageIndex: page
      });
      document.body.scrollTop = 0;
    };
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
    let page = UserStorage.getCookie("knower_status")||'';
    if(page == '1'){
      this.props.history.push("/registered");
      return;
    }
    //区号
    UserService.Instance.getNationsCode()
      .then((res: any) => {
        console.log(res.data)
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.country_zh, value: data.country_zh });
        });
        this.setState({
          area_codeList:res.data,
          area_codes:list
        })
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    //获取分数
    UserService.Instance.knowerExam()
      .then((res: any) => {
        let lists: any = [];
        for (let i in res.data) {
          lists.push({ name: res.data[i].name, score: [] ,isselect:false });
          for (let j of res.data[i].score) {
            lists[i]["score"].push({ label: j, value: j });
          }
        }
        this.setState({
          examinations: lists
        })
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
      //获取年级
      UserService.Instance.getReadingGrade()
        .then((res: any) => {
          let list: any = [];
          res.data.map((data: any) => {
            list.push({ label: data, value: data });
          });
          this.grade = list;
          this.setState({
            reading_grades: list,
          });
          UIUtil.hideLoading();
        })
        .catch(err => {
          UIUtil.showError(err);
        });
    //国家
    UserService.Instance.countryList()
      .then((res: any) => {
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.country, value: data.country });
        });
        this.setState({
          countrys: list
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    //协议
    UserService.Instance.getSystemcontract('1')
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
      <div className="address-container registered">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">注册知者-留学生</div>
        </NavBar>
        <div style={{ height: pageheight, width: pagewidth, overflow: "scroll" }}>
          <div className={this.state.pageIndex == 1?'':'none'}>
            <List>
              <List.Item
                extra={
                  <div>
                    <input
                      className="reg_haed_input"
                      type="file"
                      onChange={this.onAvatarChange}
                    />
                    <img className="my_logo" src={this.state.headimgurl} />
                  </div>
                }
                arrow="horizontal"
              >
                头像
              </List.Item>
              <InputItem
                type="text"
                placeholder={"请输入昵称"}
                onBlur={this.onNicknameBlur}
              >
                昵称
              </InputItem>
              <InputItem
                type="text"
                placeholder={"请输入微信号"}
                onBlur={this.onWechatBlur}
              >
                微信
              </InputItem>
              <InputItem
                type="text"
                placeholder={"请输入邮箱"}
                onBlur={this.onEmailBlur}
              >
                邮箱
              </InputItem>
            </List>
            <WhiteSpace size="md" />
            <List>
            <Picker
                cols={1}
                data={this.state.area_codes}
                title="国家"
                extra={this.state.areaCodesValue}
                value={this.state.areaCodesValue}
                onChange={v => this.setAreaCode(v)}
              >
                <List.Item arrow="horizontal">国家/地区</List.Item>
              </Picker>
            <InputItem
                type="number"
                maxLength={11}
                placeholder={"请输入手机号码"}
                onBlur={this.onPhoneBlur}
              >
                {this.state.code}
              </InputItem>
            </List>
            <WhiteSpace size="md" />
            <List renderHeader={() => "个人介绍："}>
              <TextareaItem
                onBlur={this.onProfileBlur}
                placeholder="个人介绍"
                rows={5}
                count={200}
              />
            </List>  
          </div>
          <div className={this.state.pageIndex == 2?'':'none'} style={{marginBottom: '0.50rem'}}>
            <WhiteSpace size="md" />
            <List>
              <Picker
                cols={1}
                data={this.state.countrys}
                title="国家"
                extra={this.state.countryValue}
                value={this.state.countryValue}
                onChange={v => this.setCountry(v)}
              >
                <List.Item arrow="horizontal">留学国家：</List.Item>
              </Picker>
              <Picker
                cols={1}
                data={this.state.schools}
                title="学校"
                extra={this.state.schoolValue}
                value={this.state.schoolValue}
                onChange={v => this.setSchool(v)}
              >
                <List.Item arrow="horizontal">学校</List.Item>
              </Picker>
              <div className={this.state.isOtherSchool?"":"none"}>
              <List>
                <InputItem
                  type="text"
                  placeholder={"请输入学校名称"}
                  onBlur={this.onSchoolBlur}
                >
                  学校名称
                </InputItem>
              </List>
              </div>
              <div className={this.state.isOtherSchool?"none":""}>
              <Picker
                cols={1}
                data={this.state.majors}
                title="专业"
                extra={this.state.majorValue}
                value={this.state.majorValue}
                onChange={v => this.setMajor(v)}
              >
                <List.Item arrow="horizontal">专业</List.Item>
              </Picker>
              </div>
              <div className={this.state.isOtherMajor?"":"none"}>
              <List>
                <InputItem
                  type="text"
                  placeholder={"请输入专业名称"}
                  onBlur={this.onMajorBlur}
                >
                  专业名称
                </InputItem>
              </List>
              </div>
              <Picker
                cols={1}
                data={this.state.educations}
                title="在读学历"
                extra={this.state.educationValue}
                value={this.state.educationValue}
                onChange={v => this.setEducation(v)}
              >
                <List.Item arrow="horizontal">在读学历</List.Item>
              </Picker>
              <Picker
                cols={1}
                data={this.state.reading_grades}
                title="在读年级"
                extra={this.state.gradeValue}
                value={this.state.gradeValue}
                onChange={v => this.setGrade(v)}
              >
                <List.Item arrow="horizontal">在读年级</List.Item>
              </Picker>
            </List>
            <WhiteSpace size="md" />
            <List>
              <List.Item>上传学生证</List.Item>
            </List>
            <ImagePicker
              files={this.state.files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files.length < 1}
            />
            <WhiteSpace size="md" />   
            <List renderHeader={() => "参加过的考试"}>
            <div className="wpadding flex flex-w ">
                {this.state.examinations.map((data: any, index: string) => {
                  return (
                    <div
                      className={data.isselect ? "tag backE6F" : "tag"}
                      key={index}
                      data-name={data.name}
                      data-id={data.id}
                      onClick={this.setExamination}
                    >
                      {data.name}
                    </div>
                  );
                })}
              </div>
            </List>
            {this.state.scores.map((data: any, index: number) => {
              return (
                <List key={index}>
                  <Picker
                    cols={1}
                    data={data.score}
                    title={data.name + "分数"}
                    extra={this.state.scoresValue[data.name]}
                    value={this.state.scoresValue[data.name]}
                    onChange={this.setScore.bind(this, data.name)}
                  >
                    <List.Item arrow="horizontal">{data.name}</List.Item>
                  </Picker>
                </List>
              );
            })}      
            </div>
            <div className={this.state.pageIndex == 3?'':'none'} style={{marginBottom: '0.50rem'}}>
            <WhiteSpace size="md" />
            <List renderHeader={() => "实名认证："}>
              <InputItem
                type="text"
                placeholder={"请输入真实姓名"}
                onBlur={this.onNameBlur}
              >
                姓名
              </InputItem>
             
              <InputItem
                type="text"
                maxLength={18}
                placeholder={"请输入身份证号码"}
                onBlur={this.onIDcardBlur}
              >
                身份证
              </InputItem>
              <List.Item
                extra={this.state.ischeckIDcard?
                  this.state.checkIDcardmsg
                  :
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={this.checkIDcard}
                  >
                    验证
                  </Button>
                }
              >
                身份验证
              </List.Item>
            </List>
          </div>
          <div className={this.state.pageIndex == 4?'':'none'}>
            <WhiteSpace size="md" />
            <List renderHeader={() => "服务项目（可多选）"}>
              <div className="wpadding flex flex-w">
                {this.state.service_optionsList.map((data: any, index: string) => {
                  return (
                    <div
                      className={data.isselect ? "tag backE6F" : "tag"}
                      key={index}
                      data-label={data.label}
                      onClick={this.setProject}
                    >
                      {data.label}
                    </div>
                  );
                })}
              </div>
            </List>
            {/* <div className={this.state.showtime || this.state.showOnOtime ?"":"none"}>
              <List renderHeader={() => "可预约时间"}>
                <Tabs
                  tabs={this.state.weekList}
                  renderTabBar={props => (
                    <Tabs.DefaultTabBar {...props} page={3} />
                  )}
                >
                  {this.renderContent}
                </Tabs>
                
              </List>
            </div> */}
            <div className={this.state.showType?"":"none"}>
            <List renderHeader={() => "交流方式（可多选）"}>
              <div className="wpadding flex flex-w">
                {this.state.communicationList.map((data: any, index: string) => {
                  return (
                    <div
                      className={data.isselect ? "tag backE6F" : "tag"}
                      key={index}
                      data-label={data.label}
                      onClick={this.setCommunication}
                    >
                      {data.label}
                    </div>
                  );
                })}
              </div>
            </List>
            </div>
            </div>
          <div className={this.state.pageIndex === 5 ? "" : "none"} style={{marginBottom: '0.50rem'}}>
            <List>
              <List.Item
                extra={
                  <div>
                    {" "}
                    <img className="my_logo" src={this.state.headimgurl} />{" "}
                  </div>
                }
              >
                头像
              </List.Item>
              <List.Item extra={this.state.nickname}>昵称</List.Item>
              <List.Item extra={this.state.wechatnum}>微信</List.Item>
              <List.Item extra={this.state.email}>邮箱</List.Item>
              <WhiteSpace size="md" />
              <List.Item extra={this.state.country}>留学国家</List.Item>
              <List.Item extra={this.state.school}>学校</List.Item>
              <List.Item extra={this.state.major}>专业</List.Item>
              <List.Item extra={this.state.education}>学历</List.Item>
              <List.Item extra={this.state.reading_grade}>年级</List.Item>
              <List.Item>参加过的考试：</List.Item>
              <div className="wpadding flex flex-w">
                {this.state.scores.map((data: any, index: string) => {
                  return (
                    <div
                      className="tag backE6F"
                      key={index}
                      data-label={data.name}
                    >
                      {data.name}
                    </div>
                  );
                })}
              </div>
              <List.Item
                extra={
                  <div>
                    {" "}
                    <img className="my_logo" src={this.state.studentimg} />{" "}
                  </div>
                }
              >
                学生证
              </List.Item>
              {this.state.scoresList.map((data: any, index: string) => {
                return (
                  <List.Item key={index} extra={data.score}>
                    {data.name}
                  </List.Item>
                );
              })}

              <List.Item extra={this.state.identity_name}>姓名</List.Item>
              <List.Item extra={this.state.identity_card}>身份证</List.Item>
              <List.Item extra={this.state.mobile}>手机号</List.Item>
              <List.Item extra={this.state.service_options}>服务项目</List.Item>
              {/* <div className={this.state.showType?"":"none"}>
              <List.Item>可预约时间</List.Item>
              {
                <Tabs
                  tabs={this.state.weekList}
                  renderTabBar={props => (
                    <Tabs.DefaultTabBar {...props} page={3} />
                  )}
                >
                  {this.renderContent2}
                </Tabs>
              }
              {this.state.apmentime.map((data: any, index: string) => {
                  return (
                    <div
                      className="tag"
                      key={index}
                      data-label={data}
                    >
                      {data}
                    </div>
                  );
                })}
              </div> */}
              <div className={this.state.showType ?"":"none"}>
                <List.Item extra={this.state.communication}>交流方式</List.Item>              
              </div>
              <List.Item extra={this.state.profile}>个人简介</List.Item>
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
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
        </div>
        <div
          className={this.state.pageIndex == 1 ? "question_btn reg_btn" : this.state.pageIndex > 4 ? "none" : "reg_btn sub_btn flex page5"}
        >
          <Button className={this.state.pageIndex == 1 ? "none" :""} type="ghost" onClick={this.onSubmitup}>
              上一步
          </Button>
          <Button type="primary" onClick={this.onSubmit}>
              下一步
          </Button>
        </div>
        <div
          className={
            this.state.pageIndex === 5
              ? "reg_btn sub_btn flex page5"
              : "none"
          }
        >
          <Button
            type="ghost"
            onClick={() => {
              this.setState({ pageIndex: 1 });
            }}
          >
            重填
          </Button>
          <Button type="primary" onClick={this.onSubmit}>
            确认
          </Button>
        </div>
      </div>
    );
  }
}
