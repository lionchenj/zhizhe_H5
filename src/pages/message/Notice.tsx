import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon, WingBlank } from "antd-mobile";
import { History, Location } from "history";

interface NoticeProps {
  history: History;
  location: Location;
}

interface NoticeState {
  title: string;
  time: string;
  content: string;
}
const pageheight = window.innerHeight - 45;
const pagewidth = window.innerWidth;
export class Notice extends React.Component<NoticeProps, NoticeState> {
  lv: any;

  constructor(props: NoticeProps) {
    super(props);
    this.state = {
      title: "关于我们标题",
      time: "2019-12-15  17:27:42",
      content: "留学问我",
    };
  }

  onRedirectBack = () => {
    const history = this.props.history;
    history.goBack();
  };

  componentDidMount() {
      if(!this.props.location.state){
        this.props.history.goBack();
        return;
      }
      let data = this.props.location.state.data;
      this.setState({
        title: data.title,
        time: data.time,
        content: data.content,
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
          <div className="nav-title">公告</div>
        </NavBar>
        <div style={{ height: pageheight, width: pagewidth, backgroundColor: '#ffffff' }}>
            <WingBlank>
                <div className="about_title fs24 fb">{this.state.title}</div>
                <div className="about_time fs15 padding-t c999">{this.state.time}</div>
                <div className="about_content padding-t" dangerouslySetInnerHTML={{__html: this.state.content}} ></div>
            </WingBlank>
        </div>
      </div>
    );
  }
}
