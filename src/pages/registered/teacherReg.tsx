import * as React from "react";

import {
  NavBar,
  Icon,
  Button,
  WhiteSpace,
  TextareaItem,
  InputItem,
  List,
  Picker,
} from "antd-mobile";
import { History, Location } from "history";
import { UserStorage } from "../../storage/UserStorage";
import { UserService } from "../../service/UserService";
import { UIUtil } from "../../utils/UIUtil";
import { JSONS } from "../../utils/json";
import defaults from "../../assets/default.png";

interface teacherRegProps {
  history: History;
  location: Location;
}

interface teacherRegState {
  page: string;
  showAgreement: boolean;
  agreementTitle: string;
  agreementContent: string;
  agree: boolean;
  files: any[];
  pageIndex: number;
  ischeckIDcard: boolean;
  checkIDcardmsg: string;
  showtime: boolean;
  showOnOtime:boolean;
  showlang:boolean;

  headimgurl: string;	//知者头像
  nickname: string; //昵称
  mobile: string;	//手机号码
  code:string;
  area_code: string;	//区号
  area_codes: any;	//区号
  area_codeList: any;	//区号
  areaCodesValue:any;
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
  province: string;	//省份
  city: string;	//城市
  school: string;	//学校
  schooltype: string;	//学校性质
  schooltypeList: any;
  schooltypeValue: any;
  Pmode: string;	//1：就职机构 2：自由执业 
  Practice: string;	//就职机构名称
  teacher_good_type: string;	// 教师擅长类型：1、升学规划、2、语言学习 
  teacher_good_typeList: any;
  teacher_good_typeValue: any; 
  teacher_good_types: any;
  language: string;	//教师语言学习选择（多个用逗号隔开）

  countrys: any;
  countryValue: any;
  cols: number;
}
const pageheight = window.innerHeight - 45 - 70;
const pagewidth = window.innerWidth;
export class teacherReg extends React.Component<
  teacherRegProps,
  teacherRegState
> {
  registerData: {
    headimgurl: string; //微信授权头像
    nickname: string; //昵称
    wechatnum: string; //微信号
    email: string; //邮箱
    area_code: string;
    mobile: string; //手机
    country: string;	//国家
    province: string;	//省份
    city: string;	//城市
    school: string;	//学校
    schooltype: string;	//学校性质
    Pmode: string;	//1：就职机构 2：自由执业 
    Practice: string;	//就职机构名称
    teacher_good_type: string;	// 教师擅长类型：1、升学规划、2、语言学习  
    language: string;	//教师语言学习选择（多个用逗号隔开）
    profile: string; //个人简介
    identity_name: string; //姓名
    identity_card: string; //身份证
    service_options: string; //项目
    communication: string;//交流方式
    type:'3'
  };
  grade:any;  
  scorelist:any;
  examinations: any;
  topicList: any;
  countryList: any;
  cityList:any;
  constructor(props: teacherRegProps) {
    super(props);
    this.examinations = [];
    this.topicList = [];
    this.countryList = [];
    this.cityList = [];
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
      country: '',	//国家
      province: '',	//省份
      city: '',	//城市
      school: '',	//学校
      schooltype: '',	//学校性质
      Pmode: '',	//1：就职机构 2：自由执业 
      Practice: '',	//就职机构名称
      teacher_good_type: '',	// 教师擅长类型：1、升学规划、2、语言学习  
      language: '',	//教师语言学习选择（多个用逗号隔开）
      identity_name: "", //姓名
      mobile: "", //手机
      identity_card: "", //身份证
      // page4
      service_options: "", //项目
      communication: "",
      type:'3'
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
      showtime:false,
      showOnOtime:false,
      showlang:false,

      service_options:'',
      service_optionsList: JSONS.serviceOptions2(),
      service_optionsValue: [],

      headimgurl:defaults,
      nickname: "", //昵称
      wechatnum: "", //微信号
      email: "", //邮箱
      profile: "", //个人简介
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

      country: '',	//国家
      province: '',	//省份
      city: '',	//城市
      school: '',	//学校
      schooltype: '',	//学校性质
      Pmode: '',	//1：就职机构 2：自由执业 
      Practice: '',	//就职机构名称
      teacher_good_type: '',	// 教师擅长类型：1、升学规划、2、语言学习  
      language: '',	//教师语言学习选择（多个用逗号隔开）

      countrys: [],
      countryValue: [],
      cols:1,
      schooltypeList: [],
      schooltypeValue: [],
      teacher_good_types: JSONS.examinations2(),
      teacher_good_typeList: [],
      teacher_good_typeValue: [], 
    };
  }

  onRedirectBack = () => {
    const history = this.props.history;
    history.goBack();
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
  //个人简介
  onProfileBlur = (val: string) => {
    this.setState({
      profile: val //个人简介
    });
    this.registerData.profile = val;
  };
  //姓名
  onNameBlur = (val: any) => {
    this.setState({
      identity_name: val //姓名
    });
    this.registerData.identity_name = val;
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
  //城市
  onCityBlur = (val: any) => {
    this.setState({
      city: val 
    });
    this.registerData.city = val;
  };
  //机构名称
  onPracticeBlur = (val: any) => {
    this.setState({
      Practice: val 
    });
    this.registerData.Practice = val;
  };
  //学校名称
  onSchoolBlur = (val: any) => {
    this.setState({
      school: val 
    });
    this.registerData.school = val;
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
  
  //留学国家
  //国家
  setCountry = (val:any) => {
    console.log(val[0]);
    // let colNum = 1;
    // const d = [...this.state.countrys];
    // const countryValue = [...val];
    // UIUtil.showLoading("");
    // let id = '';
    for(let i of this.countryList){
      if(val[0] == i.nation){
        // id = i.id;
        this.setState({
          countryValue:i.nation,
        });
        this.registerData.country = i.id;
      }
    }
    // UserService.Instance.getForignCity(id)
    //   .then((res: any) => {
    //     console.log(res.data)
        // let list: any = [];
    //     this.cityList = res.data;
    //     res.data.map((data: any) => {
    //       list.push({ label: data.city, value: data.city });
    //     });
          // d.forEach((i) => {
          //   if (i.value === val[0]) {
          //     // colNum = 2;
          //     if (!i.children||i.children&&i.children.length < 1) {
          //       i.children = list;
                // countryValue.push(res.data[0].city);
          //     }
          //   } else {
          //     i.children = [];
          //   }
          // });
        // this.setState({
          // countrys: d,
          // cols: colNum,
          // countryValue:val,
        // });
    //     UIUtil.hideLoading();
    //     for(let i of res.data){
    //       if(countryValue[1] == i.city){
    //         this.registerData.city = i.id
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     UIUtil.showError(err);
    //   });
  }
  setProvince = (val:any) => {
    this.registerData.country = this.state.countryValue.join();
  }
  //学校性质
  setSchooltype = (val: any) => {
    this.setState({
      schooltype: val[0], 
      schooltypeValue: val 
    });
    this.registerData.schooltype = val[0];
  };
  //擅长领域
  setTeacher_good_type = (val: any) => {
    let showlang = false;
    let id = '1';
    if(val[0] == "语言学习"){
      showlang = true;
      id = '2'
    }
    this.setState({
      showlang: showlang,
      teacher_good_typeValue:val,
      teacher_good_type:val[0]
    });
    this.registerData.teacher_good_type = id;
  };
  onsetgoodtype = (e: any) => {
    let list: any = this.state.teacher_good_types;
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = !data.isselect;
      }
    });
    this.setState({
      teacher_good_types:list,
    });
    let idList: any = [];
    let nameList: any = [];
    list.map((data: any) => {
      if (data.isselect) {
        idList.push(data.id);
        nameList.push(data.name)
      }
    });
    this.setState({
      language:nameList.join()
    })
    this.registerData.language = idList.join();
  };
  //项目
  setProject = (e: any) => {
    let list: any = this.state.service_optionsList;
    list.map((data: any) => {
      if (e.currentTarget.dataset.label == data.label) {
        data.isselect = !data.isselect;
      }
    });
    this.setState({
      service_optionsList:list,
    });
    let idList: any = [];
    list.map((data: any) => {
      if (data.isselect) {
        idList.push(data.label);
      }
    });
    this.setState({
      service_options:idList.join()
    })
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
      if(this.state.pageIndex == 1){
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
        // this.setCountry([this.state.countryValue[0]])
      }
      if(this.state.pageIndex == 2){
        if(!this.registerData.country){
          UIUtil.showInfo("国家不能为空");
          return;
        }
        // if(!this.registerData.Practice){
        //   UIUtil.showInfo("就业机构不能为空");
        //   return;
        // }
        // if(!this.registerData.school){
        //   UIUtil.showInfo("学校名称不能为空");
        //   return;
        // }
        if(!this.registerData.schooltype){
          UIUtil.showInfo("学校性质不能为空");
          return;
        }
        if(!this.registerData.teacher_good_type){
          UIUtil.showInfo("擅长领域不能为空");
          return;
        }
      }
      if(this.state.pageIndex == 3){
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
      if(this.state.pageIndex == 4){
        if(!this.registerData.service_options){
          UIUtil.showInfo("服务项目不能为空");
          return;
        }
        if(!this.registerData.communication){
          UIUtil.showInfo("交流方式不能为空");
          return;
        }
      }
      let page = this.state.pageIndex + 1;
      this.setState({
        pageIndex: page
      });
      document.body.scrollTop = 0;
    };
  }

  //上一步
  onSubmitup = () => {
    let page = this.state.pageIndex - 1;
      this.setState({
        pageIndex: page
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
  goend = () => {
    this.props.history.push("/");
  };

  public componentDidMount() {
    let page = UserStorage.getCookie("knower_status")||'';
    if(page == '1'){
      this.props.history.push("/registered");
      return;
    }
    //国家
    UserService.Instance.getForignNation()
      .then((res: any) => {
        console.log(res.data)
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.nation, value: data.nation });
        });
        this.countryList = res.data;
        this.registerData.country = res.data[0].id;
        this.setState({
          countrys:list,
          countryValue:[res.data[0].nation]
        })
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
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
      
      //学校性质
    UserService.Instance.getSchoolType()
    .then((res: any) => {
      console.log(res.data)
      let list: any = [];
      res.data.map((data: any) => {
        list.push({ label: data, value: data });
      });
      this.setState({
        schooltypeList:list
      })
      UIUtil.hideLoading();
    })
    .catch(err => {
      UIUtil.showError(err);
    });
    //擅长领域
    UserService.Instance.getGoodField()
      .then((res: any) => {
        console.log(res.data)
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data, value: data });
        });
        this.setState({
          teacher_good_typeList:list
        })
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
    //获取分数
    UserService.Instance.knowerExam()
      .then((res: any) => {
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data.name, value: data.name });
        });
        let lists: any = [];
        for (let i in res.data) {
          lists.push({ name: res.data[i].name, score: [] });
          for (let j of res.data[i].score) {
            lists[i]["score"].push({ label: j, value: j });
          }
        }
        this.examinations = list;
        this.scorelist= lists;
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
          <div className="nav-title">注册知者-教师</div>
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
            <div className={this.state.pageIndex == 2?'':'none'}>
            <WhiteSpace size="md" />
            <List>
              <Picker
                cols={this.state.cols}
                data={this.state.countrys}
                title="国家"
                extra={this.state.countryValue}
                value={this.state.countryValue}
                // onPickerChange={v => this.setCountry(v)}
                onChange={v => this.setCountry(v)}
                // onOk={v => this.setProvince(v)}
              >
                <List.Item arrow="horizontal">国家</List.Item>
              </Picker>
              <InputItem
                type="text"
                placeholder={"请输入省市"}
                onBlur={this.onCityBlur}
              >
                省市
              </InputItem>
              <InputItem
                type="text"
                placeholder={"请输入机构名称"}
                onBlur={this.onPracticeBlur}
              >
                机构名称
              </InputItem>
              <InputItem
                type="text"
                placeholder={"请输入学校名称"}
                onBlur={this.onSchoolBlur}
              >
                学校名称
              </InputItem>
              <Picker
                cols={1}
                data={this.state.schooltypeList}
                title="学校性质"
                extra={this.state.schooltypeValue}
                value={this.state.schooltypeValue}
                onChange={v => this.setSchooltype(v)}
              >
                <List.Item arrow="horizontal">学校性质</List.Item>
              </Picker>
            </List>
            <WhiteSpace size="md" /> 
            <List>
              <Picker
                cols={1}
                data={this.state.teacher_good_typeList}
                title="擅长领域"
                extra={this.state.teacher_good_typeValue}
                value={this.state.teacher_good_typeValue}
                onChange={v => this.setTeacher_good_type(v)}
              >
                <List.Item arrow="horizontal">擅长领域</List.Item>
              </Picker>
              <div className={"wpadding flex flex-w " + (this.state.showlang?'':'none')}>
                {this.state.teacher_good_types.map((data: any, index: string) => {
                  return (
                    <div
                      className={data.isselect ? "tag backE6F" : "tag"}
                      key={index}
                      data-name={data.name}
                      data-id={data.id}
                      onClick={this.onsetgoodtype}
                    >
                      {data.name}
                    </div>
                  );
                })}
              </div>
            </List>
            </div>
            <div className={this.state.pageIndex == 3?'':'none'}>
                   
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
          <div className={this.state.pageIndex === 4 ? "" : "none"}>
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
          <div className={this.state.pageIndex === 5 ? "" : "none"}>
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
              <List.Item extra={this.state.countryValue +this.state.city}>留学国家</List.Item>
              <List.Item extra={this.state.Practice}>机构名称</List.Item>
              <List.Item extra={this.state.school}>学校名称</List.Item>
              <List.Item extra={this.state.schooltype}>学校性质</List.Item>
              <List.Item extra={this.state.teacher_good_type+":"+this.state.language}>擅长领域</List.Item>
              <List.Item extra={this.state.identity_name}>姓名</List.Item>
              <List.Item extra={this.state.identity_card}>身份证</List.Item>
              <List.Item extra={this.state.mobile}>手机号</List.Item>
              <WhiteSpace size="md" />
              <List.Item extra={this.state.service_options}>服务项目</List.Item>
              <List.Item extra={this.state.communication}>交流方式</List.Item>
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
