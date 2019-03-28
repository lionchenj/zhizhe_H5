import * as React from "react";
import { NavBar, Icon, ListView} from "antd-mobile";
import { Redirect } from "react-router-dom";
import { History, Location } from "history";
import { UIUtil } from '../../utils/UIUtil';
import { UserService } from "../../service/UserService";
import collection from "../../assets/index_icon_collection.png";
import defaults from "../../assets/default.png";
import credit from "../../assets/credit.png";
import { model } from '../../model/model';
import { Util } from "../../utils/Util";
import bigV from "../../assets/bigV.png";
import bigStar from "../../assets/bigStar.png";
interface QuestionListProps {
  history: History;
  location: Location;
}

interface QuestionListState {
  redirectToLogin: boolean;
  dataSource:any;
  orderList: any;
  title: string;
  isStatus: boolean;
  isLoading: boolean;
}
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class QuestionList extends React.Component< QuestionListProps, QuestionListState> {
  rData: any;
  lv: any;
  listData:any;
  constructor(props: QuestionListProps) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1: model.myOrder, row2: model.myOrder) => row1 !== row2,
    });
    this.state = {
      dataSource,
      redirectToLogin: false,
      title: '',
      isStatus: false,
      isLoading: false,
      orderList: [{sonlist:[]}]
    };
  }

  onRedirectBack = () => {
    this.setState({
      ...this.state,
      redirectToLogin: true
    });
  };
  componentDidMount() {
    if(!this.props.location.state){
    UIUtil.showLoading('读取中...');
      UserService.Instance.Myorder().then((res:any) => {
        res.data.map((data:any)=>{
          if(!data.sonlist){
            data['sonlist'] = [];
          }
          if(!data.topic){
            data['topic'] = [];
          }
        })
        this.listData = res.data;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data),
          orderList: res.data
        })
        UIUtil.hideLoading();
      }).catch(err => {

        UIUtil.hideLoading();
      });
    } else {
      let status = this.props.location.state.status;
    UIUtil.showLoading('读取中...');
      UserService.Instance.Myorder(status).then((res:any) => {
        res.data.map((data:any)=>{
          if(!data.sonlist){
            data['sonlist'] = [];
          }
          if(!data.topic){
            data['topic'] = [];
          }
        })
        this.listData = res.data;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data),
          orderList: res.data,
          isStatus: true,
          title: status == '1'?'未支付':status == '2'?'已支付':status == '3'?'已预约':status == '4'?'失约':'已完成'
        })
        UIUtil.hideLoading();
      }).catch(err => {
        UIUtil.hideLoading();  
      });
    }
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
  goDetails = (e:any) =>{
    let orderid = e.currentTarget.dataset.id;
    this.props.history.push({pathname:"/questionDetails",state:{orderid:orderid, isStatus:this.state.isStatus}});
  }
  goDetailsOth = (e:any) =>{
    let orderid = e.currentTarget.dataset.id;
    this.props.history.push({pathname:"/questionDetailsOther",state:{orderid:orderid, isStatus:this.state.isStatus}});
  }
  goDetailsOnO = (e:any) =>{
    let orderid = e.currentTarget.dataset.id;
    this.props.history.push({pathname:"/questionDetailsOnO",state:{orderid:orderid, isStatus:this.state.isStatus}});
  }
  goDetailsSHO = (e:any) =>{
    let orderid = e.currentTarget.dataset.id;
    this.props.history.push({pathname:"/questionDetailsSHO",state:{orderid:orderid, isStatus:this.state.isStatus}});
  }
  //提问支付去
  goorder = (e:any) => {
    let datas = {};
    this.listData.map((data:any,index:string)=>{
      if(data.orderid == e.currentTarget.dataset.orderid || e.currentTarget.dataset.corderid&&e.currentTarget.dataset.corderid == data.corderid){
        if(e.currentTarget.dataset.type == '2'){
          this.props.history.push({ pathname: "/payOther", state: { data: data, son: e.currentTarget.dataset.index } });
        }
        if(e.currentTarget.dataset.type == '1'){
          this.props.history.push({ pathname: "/order", state: { data: data } });
        }
        if(e.currentTarget.dataset.type == 'x'){
          let topics:any = [];
          data.topic.map((data:any)=>{
            topics.push({name:data})
          })
          data.sonlist.map((data:any)=>{
            data['name'] = data.question;
          })
          datas = {
            question_type: data.question_type,
            answer_number:data.sonlist[0].answer_number,
            answer_price:data.sonlist[0].answer_price,
            orderid: data.corderid,
            price: data.sumPrice,
            questionid:data.sonlist,
            type: "2",
          };
          this.props.history.push({ pathname: "/order", state: { data: datas } });
        }
      }
    })
  }
  //一对一支付去
  gopay = (e:any) => {
    let datas = {};
    if(e.currentTarget.dataset.type == '3'){
      this.listData.map((data:any,index:string)=>{
        if(data.orderid == e.currentTarget.dataset.orderid){
          datas = {
            knower: {
              headimgurl: data.knower_headimgurl,
              nickname: data.knower_nickname,
              profile: data.knower_profile,
              school: data.knower_school,
              topic: data.knower_topic,
            },
            knowerid: data.knowerid,
            apmentime: data.apmentime,
            schoolid: data.knower_school,
            price: data.price,
            orderid: data.orderid,
            type: data.type
          }
        }
      })
      this.props.history.push({ pathname: "/pay", state: { data: datas } });
    }
    if(e.currentTarget.dataset.type == '4'){
      this.listData.map((data:any,index:string)=>{
        if(data.orderid == e.currentTarget.dataset.orderid){
          let topics:any = [];
          data.topic.map((data:any)=>{
            topics.push({name:data})
          })
          datas = {
            price: data.price,
            orderid: data.orderid,
            topic: topics,
            knower_type: data.knower_type,
            requirement: data.requirement,
            communication: data.communication,
            description: data.description,
            type: data.type
          };
        }
      })
      this.props.history.push({ pathname: "/pay", state: { data: datas } });
    }
  }
  refund  = (e:any) =>{
    let orderid = e.currentTarget.dataset.id;
    UserService.Instance.RefundMoney(orderid).then((res:any) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data),
        orderList: res.data
      })
    }).catch(err => {

    });
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

    const row = (rowData: model.myOrder, sectionID: number, rowID: number) => {
      let apmentime:any,lists:any = [];
      if(rowData.type == '3'){
        apmentime = rowData.apmentime.split(",");
        apmentime.map((data:any)=>{
          lists.push(Util.formatDate(data,4));
        })
        rowData.apmentime = lists.join();
      }
        return (
          <div className="bbeee padding wpadding-b" key={rowData.orderid}>
          <div className={rowData.type == '1' || rowData.type == '5'?"":"none"}>
          <div data-id={rowData.orderid} onClick={this.goDetails}>
            <div className="flex flex-j-sb bbeee padding-b">
              <div>
                <div className="fs15 fb text-t"><span className="fs10 back329 order_type fn margin-rs">我要问</span>{rowData.question}</div>
                <div className="fs14 c999 padding-txs">订单号：{rowData.orderid}</div>
              </div>
              <div className={rowData.status == '1'?'cfa4':rowData.status == '2'?'c999':rowData.status == '3'?'c999':rowData.status == '4'?'cffa':'c999'}>{rowData.status == '1'?'未支付':rowData.status == '2'?'已支付':rowData.status == '3'?'已预约':rowData.status == '4'?'失约':'已完成'}</div>
            </div>
              <div className="flex padding-b padding-t">
                <img className="home_head" src={rowData.headimgurl || defaults} />
                <span className="fs14 c999 padding-lr">{rowData.nickname}</span>·
                <span className="fs14 c999 padding-lr">{rowData.answered_number}/{rowData.answer_number}个回答</span>·
                <span className="fs14 c999 padding-lr">{rowData.create_time}</span>
              </div>
              <div className="fs15 c666 lh14 wwb padding-tb text-h">
                {rowData.description}
              </div>
            </div>
            <div className="flex flex-j-sb bteee padding-t">
              <div className="flex c999">
                <img className="content_img margin-rsm" src={rowData.favostatus != '1' ?collection:credit} alt="" />
                <span>{rowData.fabs}</span>
              </div>
              <div className={"home_pay b329 fs13 c329 text-cen "+ (rowData.status == '1'?'':'none')} data-orderid={rowData.orderid} data-type={'1'} onClick={this.goorder}>
                ¥<span>{rowData.price}</span>看答案
              </div>
            </div>
          </div>
          
          <div className={rowData.type == '2'?"":"none"}>
            <div className="flex flex-j-sb bbeee padding-b">
                <div>
                    <div className="fs15 fb"><span className="fs10 back329 order_type fn margin-rs">我要问</span>{rowData.question_type}</div>
                </div>
                <div className={rowData.status == '1'?'cfa4':rowData.status == '2'?'c999':rowData.status == '3'?'c999':rowData.status == '4'?'cffa':'c999'}>{rowData.status == '1'?'未支付':rowData.status == '2'?'已支付':rowData.status == '3'?'已预约':rowData.status == '4'?'失约':'已完成'}</div>
            </div>
              {
                rowData.sonlist.map((data:model.sonlist,index:number)=>{
                  return (<div className="fs15 c666 lh14 wwb padding-tb flex flex-j-sb" key={index}>
                    <div className="" data-id={data.orderid} onClick={this.goDetailsOth}>
                      <div className="margin-rsm fs15 fb text-t">{data.question}</div>
                      <div className="fs14 c999 padding-txs">订单号：{data.orderid}</div>                      
                    </div>
                    <div className={"home_pay b329 fs13 c329 text-cen "+(data.status == '1'?'':'none')} data-corderid={rowData.corderid} data-orderid={rowData.orderid} data-type={'2'} data-index={index} onClick={this.goorder}>
                        ¥<span>{data.price}</span>看答案
                    </div>
                  </div>)
                })
              }
            <div className="flex flex-j-sb bteee padding-t">
                  <div className="flex c999">总订单号：{rowData.corderid}</div>
                  <div className={"orderList_pay b329 fs13 c329 text-cen "+(rowData.status == '1'?'':'none')} data-corderid={rowData.corderid} data-type={'x'} onClick={this.goorder}>
                      ¥<span>{rowData.sumPrice}</span>看所有答案
                  </div>
              </div>
          </div>
          
          <div className={rowData.type == '3'?"":"none"}>
          <div data-id={rowData.orderid} onClick={this.goDetailsSHO}>
          <div className="flex flex-j-sb bbeee padding-b">
            <div>
              <div className="fs15 fb"><span className="fs10 back5fa order_type fn margin-rs">一对一</span>跟我看校园</div>
              <div className="fs14 c999 padding-txs">订单号：{rowData.orderid}</div>
            </div>
            <div className={rowData.status == '1'?'cfa4':rowData.status == '2'?'c999':rowData.status == '3'?'c999':rowData.status == '4'?'cffa':'c999'}>{rowData.status == '1'?'未支付':rowData.status == '2'?'已支付':rowData.status == '3'?'已预约':rowData.status == '4'?'失约':'已完成'}</div>
          </div>
            <div className="flex padding-b padding-t">
              <img className="questionList_head" src={rowData.knower_headimgurl || defaults} />
              <div className="margin-ls tal w80">
                <div className="oono_name">{rowData.knower_nickname}<img src={rowData.knower_mark=='2'?bigV:rowData.knower_mark=='1'?bigStar:''} alt=""/></div>
                <div className="fs14 c999">{rowData.knower_school}</div>
              </div>
              <div className="w65 flex flex-w flex-j-end">
              {rowData&&rowData.topic.map((data: any, index: string) => {
                  if(data != null){
                    return (
                      <div className="margin-rsm c329" key={index}>#{data}#</div>
                      );
                  }else{
                    return;
                  }
                })}
              </div>
            </div>
            <div className="fs15 c666 lh14 wwb padding-tb text-14" dangerouslySetInnerHTML={{__html: rowData.knower_profile}}></div>
            </div>
            <div className="flex flex-j-sb bteee padding-t">
              <div className="flex c999">
                预约时间：{rowData.apmentime}
              </div>
              <div className={"home_pay b329 fs13 c329 text-cen "+(rowData.status == '1'?'':'none')}
                data-orderid={rowData.orderid}
                data-type={'3'}
                onClick={this.gopay}>
                ¥<span>{rowData.price}</span>预约
              </div>
              <div className={"home_pay b329 fs13 c329 text-cen "+(rowData.status == '4'?'':'none')} data-id={rowData.orderid} onClick={this.refund}>
                  退款
              </div>
            </div>
          </div>

          <div className={rowData.type == '4'?"":"none"}>
          <div data-id={rowData.orderid} onClick={this.goDetailsOnO}>
              <div className="flex flex-j-sb bbeee padding-b">
                  <div>
                      <div className="fs15 fb"><span className="fs10 back5fa order_type fn margin-rs">一对一</span>一对一咨询</div>
                      <div className="fs14 c999 padding-txs">订单号：{rowData.orderid}</div>
                  </div>
                  <div className={rowData.status == '1'?'cfa4':rowData.status == '2'?'c999':rowData.status == '3'?'c999':rowData.status == '4'?'cffa':'c999'}>{rowData.status == '1'?'未支付':rowData.status == '2'?'已支付':rowData.status == '3'?'已预约':rowData.status == '4'?'失约':'已完成'}</div>
              </div>
              <div className="flex padding-b padding-t flex-w">
                  {rowData&&rowData.topic.map((data: any, index: string) => {
                      if(data != null){
                        return (
                          <div className="margin-rsm c329" key={index}>#{data}#</div>
                          );
                      }else{
                        return;
                      }
                  })}
              </div>
              <div className="fs15 c666 lh14 wwb padding-tb text-h">{rowData.duration}</div>
              <div>知者类型：<span>{rowData.knower_type}</span></div>
              <div>聊天时长：<span>{rowData.requirement}</span></div>
              <div className="padding-b">聊天方式：<span>{rowData.communication}</span></div>
            </div>
            <div className="flex flex-j-sb bteee padding-t">
                <div className="flex c999">{rowData.create_time}</div>
                    <div className={"home_pay b329 fs13 c329 text-cen "+(rowData.status == '1'?'':'none')}
                    data-orderid={rowData.orderid}
                    data-type={'4'}
                    onClick={this.gopay}>
                        ¥<span>{rowData.price}</span>预约
                    </div>
                    <div className={"home_pay b329 fs13 c329 text-cen "+(rowData.status == '4'?'':'none')} data-id={rowData.orderid} onClick={this.refund}>
                        退款
                    </div>
                </div>
            </div>
          </div>
        );
    };
    return (
        <div className="message-container friendsLog">
            <NavBar icon={<Icon type="left" />}
                onLeftClick={this.onRedirectBack}
                className="home-navbar" >
                <div className="nav-title">我的订单<span className={this.state.isStatus?'':'none'}>（{this.state.title}）</span></div>
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
        </div>
    )
}
}