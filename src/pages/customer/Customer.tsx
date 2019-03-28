import * as React from 'react';
import { NavBar, Icon} from "antd-mobile";
import { History } from "history";
// var $ = require("jquery");

interface CustomerProps {
    history: History
}

interface CustomerState {
    types:number,
    address:string,
    cardList:any
}
// let width = window.innerWidth;
let height = window.innerHeight - 70;
// var dw = $(window).width(),
//     dh = $(window).height(),
//     ifmbox = $(".frame_holder"),
//     iframe = $("#iframepage");

// var cssText = "width:" + dw + "px !important;";
// iframe.css("cssText",cssText);

export class Customer extends React.Component<CustomerProps, CustomerState> {
    customer:string

    constructor(props: CustomerProps) {
        super(props);
        this.state = {
            address:'',
            types:3,
            cardList:[]
        };
        
    }
    onRedirectBack = () => {
        const history = this.props.history
        history.goBack()
    }
    
    componentDidMount() {
        

    }

    public render() {
        return (
            <div className="">
                <NavBar icon={<Icon type="left" />} 
                    onLeftClick={ this.onRedirectBack}
                    className="home-navbar" >
                        <div className="nav-title">客服</div>
                </NavBar>
                {/* <div className="frame_holder">
                    <iframe className="my_frame" id="iframepage" src="https://ziker-talk.yun.pingan.com/appIm?eid=8b30534669fa6be7b9ff9fa790ff4c4e&channel=APPIM&style=H5&authorizerAppid=appim0VQiDfELDX8ghaK"></iframe>
                </div> */}
                <div className="iframe-tab-1">
                    <iframe src="https://ziker-talk.yun.pingan.com/appIm?eid=8b30534669fa6be7b9ff9fa790ff4c4e&channel=APPIM&style=H5&authorizerAppid=appim0VQiDfELDX8ghaK"
                            height={height}
                            width="100%"
                            scrolling="no"
                    ></iframe>
                </div>
            </div>
            
        )
    }
}