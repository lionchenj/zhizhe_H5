import * as React from 'react';
import ReactDOM from "react-dom";
import { NavBar, Icon, ListView, List,} from "antd-mobile";
import { History, Location } from "history";


import "./Message.css"
import { UserService } from '../../service/UserService';
import { UIUtil } from '../../utils/UIUtil';
import { model } from '../../model/model';

interface MessageProps {
    history: History,
    location: Location
}


interface MessageState {
    dataSource: any,
    isLoading: boolean,
    hasMore: boolean,
    height: number,
}



export class Message extends React.Component<MessageProps, MessageState> {
 
    lv: any

    constructor(props: MessageProps) {
        super(props);
        
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: model.myMsg, row2: model.myMsg) => row1 !== row2,
          });
      
          this.state = {
            dataSource,
            isLoading: true,
            hasMore: false,
            height:  document.documentElement.clientHeight - 200,
          };
        
    }

    onRedirectBack = () => {
        const history = this.props.history
        history.goBack()
    }
    //跳详情
    goDetails = (e:any) => {
      UserService.Instance.Messageread(e.currentTarget.dataset.id).then( (res:any) => {})
      let type = e.currentTarget.dataset.type;
      let orderid = e.currentTarget.dataset.orderid;
      if(type == '1'){
        this.props.history.push({ pathname:"/questionDetails", state:{ orderid:orderid }});
        return;
      }
      if(type == '2'){
        this.props.history.push({ pathname:"/questionDetailsOther", state:{ orderid:orderid }});
        return;
      }
      if(type == '3'){
        this.props.history.push({ pathname:"/questionDetailsSHO", state:{ orderid:orderid }});
        return;
      }
      if(type == '4'){
        this.props.history.push({ pathname:"/questionDetailsOnO", state:{ orderid:orderid }});
        return;
      }
    }
    componentDidMount() {
        UserService.Instance.myMessage().then( (res:any) => {
            const offsetTop = (ReactDOM.findDOMNode(this.lv)!.parentNode! as HTMLElement).offsetTop
            const hei = document.documentElement.clientHeight - offsetTop
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(res),
                isLoading: false,
                hasMore: false,
                height: hei,
            })
          }).catch( err => {
            this.setState({
                isLoading: false,
                hasMore: false,
            })
            UIUtil.showError(err)
          })
      }

      onEndReached = (event:any) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
   
      }

    public render() {
        const separator = (sectionID: number, rowID: number) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#f2f2f2',
                height: 1,
                // borderTop: '1px solid #ECECED',
                // borderBottom: '1px solid #ECECED',
              }}
            />
          );

          const row = (rowData: model.myMsg, sectionID: number, rowID: number) => {
            // let contentStr = rowData.content;
            // console.log(content)
            // let contentStr = '';
            // for (var i = 0 ; i < content.length ; i ++){
            //   contentStr += "&#" + content.substring(i, i + 1).charCodeAt(i).toString(10) + ";" ;
            // }
            return (
                <List>
                    <List.Item arrow="horizontal" extra={rowData.update_time} data-id={rowData.id} data-orderid={rowData.issueid} data-type={rowData.question_type} onClick={this.goDetails} >
                    {rowData.question_title}
                    {/* <List.Item.Brief><div dangerouslySetInnerHTML={{__html: contentStr}} /></List.Item.Brief> */}
                    <List.Item.Brief>你有一条答案，请查阅</List.Item.Brief>
                    </List.Item>
                </List>
  
            );
          };


        return (
            <div className="message-container">
                <NavBar mode="light" icon={<Icon type="left" />} 
                    onLeftClick={ this.onRedirectBack}
                    className="home-navbar" >
                        <div className="nav-title">我的答案</div>
                </NavBar>
                <div className="fans-list-view-container">
                
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
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                />
                </div>
            </div>
        )
    }
}