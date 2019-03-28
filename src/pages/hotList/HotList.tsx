import * as React from "react";
import { Redirect } from "react-router-dom";
import { History } from "history";
import { NavBar, Icon, List } from "antd-mobile";
import defaults from "../../assets/default.png";
import collection from "../../assets/index_icon_collection.png";
import pay from "../../assets/index_icon_pay.png";
import credit from "../../assets/credit.png";
import { UserService } from "../../service/UserService";
import { UIUtil } from "../../utils/UIUtil";
interface HotListProps {
  history: History;
}

interface HotListState {
  redirectToLogin: boolean;
  hotQuestion: any;
}
// const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class HotList extends React.Component<HotListProps, HotListState> {
  rData: any;
  lv: any;

  constructor(props: HotListProps) {
    super(props);
    this.state = {
      redirectToLogin: false,
      hotQuestion: []
    };
  }

  onRedirectBack = () => {
    this.setState({
      ...this.state,
      redirectToLogin: true
    });
  };
  componentDidMount() {
    this.getCRecomQue();
  }
  //推荐问题
  getCRecomQue = () => {
    UIUtil.showLoading("读取中...");
    UserService.Instance.getCRecomQue()
      .then((res: any) => {
        this.setState({
          hotQuestion: res.data
        });
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.hideLoading();
        UIUtil.showError(err);
      });
  };
  //收藏
  setFavorite = (e: any) => {
    if (UIUtil.not_weixin()) {
      UIUtil.showInfo("请在微信浏览器打开！");
      return;
    }
    let id = e.currentTarget.dataset.id;
    UIUtil.showLoading("收藏中...");
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
        this.getCRecomQue();
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
      state: { type: "home", orderid: orderid }
    });
  };
  public render() {
    const { redirectToLogin } = this.state;

    if (redirectToLogin) {
      const to = {
        pathname: "/home"
      };
      return <Redirect to={to} />;
    }
    return (
      <div className="message-container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">热门推荐</div>
        </NavBar>
        <List>
          {this.state.hotQuestion.map((data: any, index: string) => {
            return (
              <div className="bbeee padding" key={index}>
                <div data-id={data.orderid} onClick={this.goDetails}>
                  <div className="flex padding-b">
                    <img className="home_head" src={data.headimgurl || defaults}/>
                    <span className="fs14 c999 padding-l1">{data.nickname}</span>
                  </div>
                  <div className="fs17 fb padding-b">{data.question}</div>
                  <div className="fs15 c666 lh14">{data.description}</div>
                </div>
                <div className="flex flex-j-sb">
                  <div className="flex c999">
                    <img
                      className="content_img"
                      src={data.favostatus != "1" ? collection : credit}
                      data-id={data.orderid}
                      onClick={this.setFavorite}
                    />
                    <span className="padding-lsm">{data.favo}</span>
                    <img className="margin-l content_img" src={pay} alt="" />
                    <span className="padding-lsm">{data.see}</span>
                  </div>
                  <div
                    className={
                      "home_pay b329 fs13 c329 text-cen " +
                      (data.userSee == 2 ? "" : "none")
                    }
                    data-orderid={data.orderid}
                    onClick={() => this.props.history.push({pathname:"/seePay",state:{data:data.orderid}})}
                  >
                    ¥<span>{data.answer_price}</span>看答案
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
    );
  }
}
