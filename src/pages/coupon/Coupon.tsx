import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon, ListView, WingBlank, WhiteSpace, Tabs} from "antd-mobile";
import { History } from "history";
import { UserService } from '../../service/UserService';
// import { UIUtil } from '../../utils/UIUtil';
import { model } from '../../model/model';






interface CouponProps {
    history: History
}


interface CouponState {
    tabIndex:number,
    height: number,
    visible: boolean,
    dataSource2: any,
    isLoading2: boolean,
    hasMore2: boolean,
    page2: number,
    total_num2: number,
    list_num2: number
    dataSource1: any,
    isLoading1: boolean,
    hasMore1: boolean,
    page1: number,
    total_num1: number,
    list_num1: number
    dataSource: any,
    isLoading: boolean,
    hasMore: boolean,
    page: number,
    total_num: number,
    list_num: number,
    tabs:any,
    coins:any
}

const tabs = [
    { title: '可使用' },
    { title: '已使用' },
    { title: '已失效' },
];
const bodyHeight = (window.innerHeight/100 - 0.9) + 'rem';

export class Coupon extends React.Component<CouponProps, CouponState> {
    rData: any
    lv: any

    constructor(props: CouponProps) {
        super(props);
        const dataSource2 = new ListView.DataSource({
            rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
          });
        const dataSource1 = new ListView.DataSource({
            rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
          });
          const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
          });
          this.state = {
            height:  document.documentElement.clientHeight - 200,
            visible: false,
            dataSource2,
            isLoading2: true,
            hasMore2: false,
            page2: 1,
            total_num2: 1,
            list_num2: 1,
            dataSource1,
            isLoading1: true,
            hasMore1: false,
            page1: 1,
            total_num1: 1,
            list_num1: 1,
            dataSource,
            isLoading: true,
            hasMore: false,
            page: 1,
            total_num: 1,
            list_num: 1,
            tabs:[],
            coins:[],
            tabIndex:0
          };
        
    }

    onRedirectBack = () => {
        const history = this.props.history
        history.goBack()
    }

    componentDidMount() {
        this.onSelect(0);
      }

      onEndReached = (event:any) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
    
      }
    onSelect = (index: number) => {
        UserService.Instance.myCard(index+'').then((res:any) => {
            if(index == 0){
                this.setState({
                    dataSource2: this.state.dataSource2.cloneWithRows(res.data),
                    isLoading2: false
                  })
                  return;
            }
            if(index == 1){
                this.setState({
                    dataSource1: this.state.dataSource1.cloneWithRows(res.data),
                    isLoading1: false
                  })
                  return;
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(res.data),
                isLoading: false
              })
          }).catch(err => {
      
          });
    }

    public render() {
        const separator2 = (sectionID: number, rowID: number) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F5',
                height: 1,
              }}
            />
          );
          const row2= (rowData: any, sectionID: number, rowID: number) => {
            return (
                
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    <div className="coupon_list coupon_can flex">
                    <div className="w65 padding-l">
                        <div className="coupon_title fs18">{rowData.brand_name}</div>
                        <div className="coupon_time fs12 c999 padding-t">有效期：{rowData.end_time}前</div>
                    </div>
                    <div className="coupon_money fs30 cfff tac">¥{rowData.reduce}</div>
                </div>
                <WhiteSpace></WhiteSpace>
                </WingBlank>
  
            );
          };
        const separator1 = (sectionID: number, rowID: number) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F5',
                height: 1,
              }}
            />
          );
          const row1= (rowData: any, sectionID: number, rowID: number) => {
            return (
                
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    <div className="coupon_list coupon_not flex">
                    <div className="w65 padding-l">
                        <div className="coupon_title fs18">{rowData.brand_name}</div>
                        <div className="coupon_time fs12 c999 padding-t">有效期：{rowData.end_time}前</div>
                    </div>
                    <div className="coupon_money fs30 cfff tac">¥{rowData.reduce}</div>
                </div>
                <WhiteSpace></WhiteSpace>
                </WingBlank>
  
            );
          };
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
                
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                <div className="coupon_list coupon_not flex">
                    <div className="w70 padding-l">
                        <div className="coupon_title fs18">{rowData.brand_name}</div>
                        <div className="coupon_time fs12 c999 padding-t">有效期：{rowData.end_time}前</div>
                    </div>
                    <div className="coupon_money fs30 cfff tac">¥{rowData.reduce}</div>
                </div>
                <WhiteSpace></WhiteSpace>
                </WingBlank>
  
            );
          };
        return (
            <div className="coupon_container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">我的卡券</div>
                </NavBar>
                <Tabs tabs={tabs} onTabClick={(tab, index) => { this.onSelect(index)}}>
                        <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource2}
                            renderFooter={() => (<div className={this.state.isLoading2 ? '' : 'none'} style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading2 ? 'Loading...' : ''}
                            </div>)}
                            renderRow={row2}
                            renderSeparator={separator2}
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
                        <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource1}
                            renderFooter={() => (<div className={this.state.isLoading1 ? '' : 'none'} style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading1 ? 'Loading...' : ''}
                            </div>)}
                            renderRow={row1}
                            renderSeparator={separator1}
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
                                height: this.state.height,
                                overflow: 'auto',
                            }}
                        />

                        </div>
                    </Tabs>
                <div className="fans-list-view-container">
                
                </div>
            </div>
        )
    }
}