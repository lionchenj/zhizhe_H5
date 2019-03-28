import * as React from 'react';
import { NavBar, Icon, WingBlank, WhiteSpace} from "antd-mobile";
import { History,Location } from "history";
// import { UIUtil } from 'src/utils/UIUtil';






interface CouponTypeProps {
    history: History;
    location: Location
}


interface CouponTypeState {
    couponList:any
}

const bodyHeight = (window.innerHeight/100 - 0.9) + 'rem';

export class CouponType extends React.Component<CouponTypeProps, CouponTypeState> {
    lv: any;
    data:any;
    push:string;
    constructor(props: CouponTypeProps) {
        super(props);
          this.state = {
            couponList:[]
          };
        
    }

    onRedirectBack = () => {
        let cardids:any = [];
        let cardid = '';
        let couponP = 0;
        this.state.couponList.map((data:any)=>{
            if(data.isSet ){
                cardids.push(data.id)
                couponP = couponP+(data.reduce*1)
            }
        })
        cardids.map((data:any)=>{
            cardid = cardid + ',' + data;
          })
          cardid = cardid.substr(1);
        this.props.history.push({pathname:this.push,state:{data:this.data,cardid:cardid,couponP:couponP*1}})
    }

    componentDidMount() {
        if(!this.props.location.state){
            this.props.history.goBack();
        return
        }
        this.data = this.props.location.state.data;
        this.push = this.props.location.state.push;
        let couponList = this.props.location.state.couponList;
        couponList.map((data:any)=>{
            data['isSet'] = false;
        })
        this.setState({
            couponList: couponList,
          })
    }
    isSet = (e:any) => {
        let id = e.currentTarget.dataset.id,
        isDiscount = e.currentTarget.dataset.isdiscount,
        couponList = this.state.couponList;
        if(isDiscount == '2'){
            couponList.map((data:any)=>{
                if(data.id == id ){
                    data.isSet = !data.isSet;
                } else if(data.share == '1'){
                    data.isSet = false;
                }
            })
        } else {
            couponList.map((data:any)=>{
                if(data.id == id ){
                    data.isSet = !data.isSet;
                } else {
                    data.isSet = false;
                }
            })
        }
        this.setState({
            couponList:couponList,
        })
      }

    public render() {
        return (
            <div className="coupon_container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">选择卡券</div>
                </NavBar>
                <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
                        {this.state.couponList.map((data:any,index:string)=>{
                            return(<WingBlank key={index}>
                                <WhiteSpace></WhiteSpace>
                                <div className="coupon_list coupon_can flex" data-isdiscount={data.share} data-id={data.id} onClick={this.isSet}>
                                    <div className="w70 padding-l">
                                        <div className="coupon_title fs18">{data.brand_name}</div>
                                        <div className="coupon_time fs12 c999 padding-t">有效期：{data.end_time}前</div>
                                        <div className={"c999 fs14 " + (data.share=='1'?'':'none')}>此券单独使用无法叠加</div>
                                    </div>
                                    <div className="coupon_money fs30 cfff tac">¥{data.reduce}</div>
                                    <div className={data.isSet ? "question_checkbox set_checkbox" : ""}></div>
                                </div>
                                <WhiteSpace></WhiteSpace>
                            </WingBlank>)
                        })}
                </div>
            </div>
        )
    }
}