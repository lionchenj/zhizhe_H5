import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon, ListView} from "antd-mobile";
import { History } from "history";
import { Redirect } from "react-router-dom";

import { UserService } from '../../service/UserService';
import { UIUtil } from '../../utils/UIUtil';
// import { model } from '../../model/model';
import pay from "../../assets/index_icon_pay.png";
import defaults from "../../assets/default.png";
import credit from "../../assets/credit.png";





interface CollectionProps {
    history: History
}


interface CollectionState {
    tabIndex:number,
    visible: boolean
    dataSource: any,
    isLoading: boolean,
    hasMore: boolean,
    page: number,
    total_num: number,
    list_num: number,
    tabs:any,
    coins:any,
    redirectToLogin: boolean

}
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class Collection extends React.Component<CollectionProps, CollectionState> {
    rData: any
    lv: any

    constructor(props: CollectionProps) {
        super(props);
        
          const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: any, row2: any) => row1 !== row2,
          });
          this.state = {
            visible: false,
            dataSource,
            isLoading: true,
            hasMore: false,
            page: 1,
            total_num: 1,
            list_num: 1,
            tabs:[],
            coins:[],
            tabIndex:0,
            redirectToLogin: false
          };
        
    }
//收藏
setFavorite = (e:any) => {
  let id = e.currentTarget.dataset.id;
      UserService.Instance.delfavorQue(id).then( (res:any) => {
      this.favorQuelist();
      UIUtil.hideLoading()
      }).catch( err => {
          UIUtil.showError(err)
      })
}
    onRedirectBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }
    onEndReached = (event:any) => {
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
    }
    componentDidMount() {
       this.favorQuelist();
    }
    goDetails = (e:any) =>{
      let orderid = e.currentTarget.dataset.id;
      let type = e.currentTarget.dataset.type;
      let myorder = e.currentTarget.dataset.myorder;
      if(type == '2'){
        this.props.history.push({pathname:"/questionDetailsOther",state:{orderid:orderid, isCollection:true}});
        return;
      }
      if(myorder != '1'){
        this.props.history.push({pathname:"/questionDetails",state:{type:'home', orderid:orderid, isCollection:true}});
        return;
      }
      this.props.history.push({pathname:"/questionDetails",state:{orderid:orderid, isCollection:true}});
    }
    favorQuelist = () => {
  UserService.Instance.favorQuelist().then( (res:any) => {
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data),
        isLoading: false,
        hasMore: false,
    });
    UIUtil.hideLoading()
  }).catch( err => {
      UIUtil.showError(err)
  })
}
    public render() {
        const { redirectToLogin} = this.state
        if (redirectToLogin) {
            const to = {
                pathname: "/home"
            }
            return <Redirect to={to} />
        }
          const separator = (sectionID: number, rowID: number) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F5',
                height: 1,
              }}
            />
          );
  
          const row = (rowData: any, sectionID: number, rowID: number) => {
            return (
                <div className="bbeee wpadding" key={rowData.orderid}>
                  <div data-id={rowData.orderid} data-type={rowData.type} data-myorder={rowData.Myorder} onClick={this.goDetails}>
                    <div className="flex padding-b">
                      <img className="home_head" src={rowData.headimgurl || defaults} />
                      <span className="fs14 c999 padding-l1">{rowData.nickname}</span>
                    </div>
                    <div className="fs17 fb padding-b">
                      {rowData.question}
                    </div>
                    <div className="fs15 c666 lh14">
                      {rowData.description}
                    </div>
                  </div>

                  <div className="flex flex-j-sb">
                    <div className="flex c999">
                      <img className="content_img" src={credit} alt="" data-id={rowData.orderid} onClick={this.setFavorite} />
                      <span className="padding-lsm">{rowData.favo}</span>
                      <img className="margin-l content_img" src={pay} alt="" />
                      <span className="padding-lsm">{rowData.see}</span>
                    </div>
                    <div className={rowData.Myorder == '1'?"":"none"}>
                      <div className={"home_pay b329 fs13 c329 text-cen "+(rowData.status == '1'?"":"none")} onClick={()=>UIUtil.goPay(this,rowData.orderid,'',rowData.type)}>
                        ¥<span>{rowData.price}</span>看答案
                      </div>
                      <div className={"home_pay fs13 text-cen btn_not "+(rowData.status != '1'?"":"none")}>
                        已付费
                      </div>
                    </div>
                    <div className={rowData.Myorder != '1'?"":"none"}>
                      <div className={"home_pay b329 fs13 c329 text-cen "+(rowData.userSee == '2'?"":"none")} onClick={()=>UIUtil.seePay(this,rowData.orderid)}>
                        ¥<span>{rowData.price}</span>看答案
                      </div>
                      <div className={"home_pay fs13 text-cen btn_not "+(rowData.userSee != '2'?"":"none")}>
                        已付费
                      </div>
                    </div>
                  </div>
                </div>
              );
          };
        return (
            <div className="message-container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">我的收藏</div>
                </NavBar>
                <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div className={this.state.isLoading ? '' : 'none'} style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : ''}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    className="am-list"
                    pageSize={4}
                    // useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    style={{
                        height: bodyHeight,
                        overflow: 'auto',
                    }}
                />
                </div>
                <div className="fans-list-view-container"></div>
            </div>
        )
    }
}