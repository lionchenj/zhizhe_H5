import * as React from "react";
// import ReactDOM from "react-dom";
import { NavBar, Icon, ListView, List, SearchBar } from "antd-mobile";
import { History } from "history";
import { UserService } from "../../service/UserService";
import { UIUtil } from "../../utils/UIUtil";
import { model } from "../../model/model";
import { Redirect } from "react-router-dom";

import collection from "../../assets/index_icon_collection.png";
import pay from "../../assets/index_icon_pay.png";
import defaults from "../../assets/default.png";
import credit from "../../assets/credit.png";

interface SearchProps {
  history: History;
}

interface SearchState {
  tabIndex: number;
  height: number;
  visible: boolean;
  dataSource: any;
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  total_num: number;
  list_num: number;
  tabs: any;
  coins: any;
  redirectToLogin: boolean;
}
const bodyHeight = window.innerHeight / 100 - 0.45 + "rem";

export class Search extends React.Component<SearchProps, SearchState> {
  rData: any;
  lv: any;
  value: string;
  autoFocusInst: any;
  constructor(props: SearchProps) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (
        row1: model.TransactionItem,
        row2: model.TransactionItem
      ) => row1 !== row2
    });
    this.state = {
      height: document.documentElement.clientHeight - 200,
      visible: false,
      dataSource,
      isLoading: false,
      hasMore: false,
      page: 1,
      total_num: 1,
      list_num: 1,
      tabs: [],
      coins: [],
      tabIndex: 0,
      redirectToLogin: false
    };
  }
  onRedirectBack = () => {
    this.setState({
      ...this.state,
      redirectToLogin: true
    });
  };
  onEndReached = (event: any) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    // if (this.state.isLoading && !this.state.hasMore) {
    //   return;
    // }
    // if (!this.state.isLoading && this.state.hasMore) {
    //     return;
    // }
    // this.setState({ isLoading: true });
    // this.getFriends()
  };
  // 搜索
  searchQue = () => {
    UserService.Instance.searchQue(this.value)
      .then((res: any) => {
        if (res.data.length != 0) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(res.data),
            isLoading: false,
            hasMore: false
          });
        }
        UIUtil.hideLoading();
      })
      .catch(err => {
        UIUtil.showError(err);
      });
  };
  onSubmit = (value: string) => {
    this.value = value;
    this.searchQue();
  };
  componentDidMount() {
    this.autoFocusInst.focus();
  }

  //收藏
  setFavorite = (e: any) => {
    if (UIUtil.not_weixin()) {
      UIUtil.showInfo("请在微信浏览器打开！");
      return;
    }
    let id = e.currentTarget.dataset.id;
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
        this.searchQue();
        UIUtil.hideLoading();
      })
      .catch(err => {
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
    const separator = (sectionID: number, rowID: number) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F5",
          height: 1
        }}
      />
    );

    const row = (rowData: any, sectionID: number, rowID: number) => {
      return (
        <div className="bbeee padding" key={rowData.orderid}>
          <div data-id={rowData.orderid} onClick={this.goDetails}>
            <div className="flex padding-b">
              <img className="home_head" src={rowData.headimgurl || defaults} />
              <span className="fs14 c999 padding-l1">{rowData.nickname}</span>
            </div>
            <div className="fs17 fb padding-b">{rowData.question}</div>
            <div className="fs15 c666 lh14">{rowData.description}</div>
          </div>
          <div className="flex flex-j-sb">
            <div className="flex c999">
              <img
                className="content_img"
                src={rowData.favostatus != "1" ? collection : credit}
                data-id={rowData.orderid}
                onClick={this.setFavorite}
              />
              <span className="padding-lsm">{rowData.favo}</span>
              <img className="margin-l content_img" src={pay} alt="" />
              <span className="padding-lsm">{rowData.see}</span>
            </div>
            <div
              className={
                "home_pay b329 fs13 c329 text-cen " +
                (rowData.userSee == 2 ? "" : "none")
              }
              onClick={() => this.props.history.push({pathname:"/seePay",state:{data:rowData.orderid}})}
            >
              ¥<span>{rowData.answer_price}</span>看答案
            </div>
            <div
              className={
                "home_pay fs13 text-cen btn_not " +
                (rowData.userSee != 2 ? "" : "none")
              }
            >
              已付费
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="message-container friendsLog">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={this.onRedirectBack}
          className="home-navbar"
        >
          <div className="nav-title">搜索</div>
        </NavBar>
        <List>
          <SearchBar
            placeholder="搜索"
            maxLength={8}
            onChange={this.onSubmit}
            ref={ref => (this.autoFocusInst = ref)}
          />
        </List>
        <div style={{ height: bodyHeight, backgroundColor: "#f5f5f5" }}>
          <ListView
            ref={el => (this.lv = el)}
            dataSource={this.state.dataSource}
            renderFooter={() => (
              <div style={{ padding: 30, textAlign: "center" }}>
                {this.state.isLoading ? "Loading..." : ""}
              </div>
            )}
            renderRow={row}
            renderSeparator={separator}
            className="am-list"
            pageSize={4}
            onScroll={() => {
              console.log("scroll");
            }}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
            style={{
              height: bodyHeight,
              overflow: "auto"
            }}
          />
        </div>
      </div>
    );
  }
}
