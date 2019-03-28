import * as React from "react";

import {
  NavBar,
  Icon,
  Button
} from "antd-mobile";
import { History, Location } from "history";
import "./registered.css";
import studentReg from "../../assets/studentReg.png";
import parentReg from "../../assets/parentReg.png";
import teacherReg from "../../assets/teacherReg.png";
import adviserReg from "../../assets/adviserReg.png";
import { UserService } from '../../service/UserService';
import { UserStorage } from "../../storage/UserStorage";
import { UIUtil } from '../../utils/UIUtil';
interface registeredProps {
  history: History;
  location: Location;
}

interface registeredState {
  pageIndex:number,
  code_url:string
}
const pageheight = window.innerHeight - 45;
const pagewidth = window.innerWidth;
export class registered extends React.Component<registeredProps,registeredState> {
  constructor(props: registeredProps) {
    super(props);
    this.state = {
      pageIndex:1,
      code_url:''
    };
  }

  onRedirectBack = () => {
    this.props.history.push("/")
  };
  
  public componentDidMount() {
    let page = 1;
    let type = UserStorage.getCookie("knower_status");
    if(type != '0'){
      page = 2
    }
    if(page == 2){
      this.setState({
        pageIndex:page
      })
      UIUtil.showLoading("客服二维码")
      UserService.Instance.getCustomerService('2').then( (res:any) => {
        this.setState({
          code_url:res.data.code_url
        })
        UIUtil.hideLoading()
      }).catch( err => {
          UIUtil.showError(err)
      })
      return;
    }
  }
  goend = () => {
    this.props.history.push("/");
  };
  public render() {
    return (
      <div className="address-container registered">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">注册知者</div>
        </NavBar>
        <div className={this.state.pageIndex === 2 ? "none" : ""} style={{ height: pageheight, width: pagewidth, overflow: "scroll" }}>
          <div className="w85 margin-a margin-tl fff br reg-index">
            <div className="tac fb fs17 padding-ts">选择身份进入知者</div>
            <div className="w90 margin-a padding-ts"><img src={studentReg} onClick={()=>this.props.history.push("/studentReg")}/></div>
            <div className="w90 margin-a padding-t"><img src={parentReg} onClick={()=>this.props.history.push("/parentReg")}/></div>
            <div className="w90 margin-a padding-t"><img src={teacherReg} onClick={()=>this.props.history.push("/teacherReg")}/></div>
            <div className="w90 margin-a padding-t padding-bs"><img src={adviserReg} onClick={()=>this.props.history.push("/adviserReg")}/></div>
          </div>
        </div>
        <div className={this.state.pageIndex === 2 ? "" : "none"} style={{ height: pageheight, backgroundColor: '#ffffff'}}>
            <div className="reg_bg" />
            <div className="registered_code">
              <img src={this.state.code_url} alt=""/>
            </div>
            <div className="question_btn reg_btn">
              <Button type="primary" onClick={this.goend}>
                确认
              </Button>
            </div>
          </div>
      </div>
    );
  }
}
