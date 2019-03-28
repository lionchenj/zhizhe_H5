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
interface adviserRegProps {
  history: History;
  location: Location;
}

interface adviserRegState {
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
  cols:number;

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
  
  province: string;	//省份
  provinceList: any;	//省份
  provinceValue: any;	//省份
  city:string;
  cityList: any;	//市
  cityValue: any;	//市
  Pmode: string;	//1：就职机构 2：自由执业 
  Practice: string;	//就职机构名称
  adeptCountry: string;	//擅长留学国家
  adeptCountrys: any;	//擅长留学国家
  adeptEducation: string;	//擅长阶段申请
  adeptEducations: any;	//擅长阶段申请

  countrys: any;
  countryValue: any;
}
const pageheight = window.innerHeight - 45 - 70;
const pagewidth = window.innerWidth;
export class adviserReg extends React.Component<
  adviserRegProps,
  adviserRegState
> {
  registerData: {
    headimgurl: string; //微信授权头像
    nickname: string; //昵称
    wechatnum: string; //微信号
    email: string; //邮箱
    area_code: string;
    mobile: string; //手机
    city: string;	//城市
    province: string;	//省份
    Pmode: string;	//1：就职机构 2：自由执业 
    Practice: string;	//就职机构名称
    adeptCountry: string;	//擅长留学国家
    adeptEducation: string;	//擅长阶段申请
    profile: string; //个人简介
    identity_name: string; //姓名
    identity_card: string; //身份证
    service_options: string; //项目
    communication: string;//交流方式
    type:'4'
  };
  grade:any;  
  scorelist:any;
  examinations: any;
  topicList: any;
  constructor(props: adviserRegProps) {
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
      city: '',	//国家
      province: '',	//省份
      Pmode: '',	//1：就职机构 2：自由执业 
      Practice: '',	//就职机构名称
      adeptCountry: '',	//擅长留学国家
      adeptEducation: '',	//擅长阶段申请
      identity_name: "", //姓名
      mobile: "", //手机
      identity_card: "", //身份证
      // page4
      service_options: "", //项目
      communication: "",
      type:'4'
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
      cols:1,

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

      
      provinceList: [],	//省份
      provinceValue: [],	//省份
      city:'',
      cityList: [],	//市
      cityValue: [],	//市
      province: "",	//省份
      Pmode: "",	//1：就职机构 2：自由执业 
      Practice: "",	//就职机构名称
      adeptCountry: "",	//擅长留学国家
      adeptCountrys: [],
      adeptEducation: "",	//擅长阶段申请
      adeptEducations: JSONS.educations2(),
      countrys: [],
      countryValue: [],
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
  //省市
  setCity = (val:any) => {
    console.log(val);
    let colNum = 1;
    const d = [...this.state.provinceList];
    const provinceValue = [...val];
    UIUtil.showLoading("");
    UserService.Instance.getNationsCity2(val[0])
      .then((res: any) => {
        console.log(res.data)
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data, value: data });
        });
          d.forEach((i) => {
            if (i.value === val[0]) {
              colNum = 2;
              if (!i.children||i.children&&i.children.length < 1) {
                i.children = list;
                provinceValue.push(res.data[0]);
              }
            } else {
              i.children = [];
            }
          });
        this.registerData.province = provinceValue[0];
       this.registerData.city = provinceValue[1];
        this.setState({
          city:provinceValue[1],
          province: provinceValue[0],
          provinceList: d,
          cols: colNum,
          provinceValue,
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  }
  setProvince = (val:any) => {
    this.registerData.province = val[0];
    this.registerData.city = val[1];
  }
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

  //机构名称
  onPracticeBlur = (val: any) => {
    this.setState({
      Practice: val 
    });
    this.registerData.Practice = val;
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
  
  //擅长国家
  onAdeptCountry = (e: any) => {
    let list: any = this.state.adeptCountrys;
    let idList: any = [];
    let nameList: any = [];
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = !data.isselect;
      }
    });
    this.setState({
      adeptCountrys: list
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
    this.registerData.adeptCountry = typeid.substr(1);
    this.setState({
      adeptCountry:typeid.substr(1)
    })
  };
  //擅长阶段
  onAdeptEducations = (e: any) => {
    let list: any = this.state.adeptEducations;
    let idList: any = [];
    let nameList: any = [];
    list.map((data: any) => {
      if (e.currentTarget.dataset.id == data.id) {
        data.isselect = !data.isselect;
      }
    });
    this.setState({
      adeptEducations: list
    });
    list.map((data: any) => {
      if (data.isselect) {
        idList.push(data.id);
        nameList.push(data.name);
      }
    });
    let typename = "";
    nameList.map((data: any) => {
      typename = typename + "," + data;
    });
    this.registerData.adeptEducation = typename.substr(1);
    this.setState({
      adeptEducation:typename.substr(1)
    })
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
        this.setCity(this.state.provinceValue);
      }
      if(this.state.pageIndex == 2){
        if(!this.registerData.province){
          UIUtil.showInfo("国家不能为空");
          return;
        }
        if(!this.registerData.Practice){
          UIUtil.showInfo("机构名称不能为空");
          return;
        }
        if(!this.registerData.adeptCountry){
          UIUtil.showInfo("擅长国家不能为空");
          return;
        }
        if(!this.registerData.adeptEducation){
          UIUtil.showInfo("擅长阶段不能为空");
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
    //省
    UserService.Instance.getNationsCity()
      .then((res: any) => {
        console.log(res.data)
        let list: any = [];
        res.data.map((data: any) => {
          list.push({ label: data, value: data });
        });
        this.setState({
          provinceList:list,
          provinceValue:[res.data[0]]
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
    //国家
    UserService.Instance.countryList()
      .then((res: any) => {
        res.data.map((data: any) => {
          data["isselect"] = false;
        });
        this.setState({
          adeptCountrys: res.data
        });
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
          <div className="nav-title">注册知者-留学顾问</div>
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
                data={this.state.provinceList}
                title="国内省市"
                extra={this.state.provinceValue}
                value={this.state.provinceValue}
                onPickerChange={v => this.setCity(v)}
                onOk={v => this.setProvince(v)}
              >
                <List.Item arrow="horizontal">国内省市</List.Item>
              </Picker>
              <InputItem
                type="text"
                placeholder={"请输入机构名称"}
                onBlur={this.onPracticeBlur}
              >
                机构名称
              </InputItem>
            </List>
            <WhiteSpace size="md" />
            <List renderHeader={() => "擅长国家"}>
            <div className="wpadding flex flex-w">
              {this.state.adeptCountrys.map((data: any, index: string) => {
                return (
                  <div
                    className={data.isselect ? "tag backE6F" : "tag"}
                    key={index}
                    data-name={data.country}
                    data-id={data.id}
                    onClick={this.onAdeptCountry}
                  >
                    {data.country}
                  </div>
                );
              })}
            </div>
            </List>
            <WhiteSpace size="md" /> 
            <List renderHeader={() => "擅长阶段"}>
            <div className="wpadding flex flex-w">
              {this.state.adeptEducations.map((data: any, index: string) => {
                return (
                  <div
                    className={data.isselect ? "tag backE6F" : "tag"}
                    key={index}
                    data-name={data.name}
                    data-id={data.id}
                    onClick={this.onAdeptEducations}
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
              <List.Item extra={this.state.province+","+this.state.city}>国内省市</List.Item>
              <List.Item extra={this.state.Practice}>机构名称</List.Item>
              <List.Item extra={this.state.adeptCountry}>擅长国家</List.Item>
              <List.Item extra={this.state.adeptEducation}>擅长阶段</List.Item>
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
