import * as React from 'react';
import { NavBar, Icon, List} from "antd-mobile";
import { Redirect } from "react-router-dom";
import { History } from "history";
// import { UserStorage } from "../../storage/UserStorage";

interface MyProps {
    history: History,
    
}

interface MyState {
    redirectToLogin: boolean,
    checkeds: boolean
}

export class My extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)
        this.state = {
            redirectToLogin: false,
            checkeds: false
        }
    }

    onRedirectBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }

    public render() {
        if (this.state.redirectToLogin) {
            const to = {
                pathname: "/home"
            }
            return <Redirect to={to} />
        }
        return (
            <div className="message-container">
                <NavBar icon={<Icon type="left" />} 
                    onLeftClick={ this.onRedirectBack }
                    className="home-navbar" >
                        <div className="nav-title">设置</div>
                </NavBar>
                <List renderHeader={() => ''} className="content-item-border">
                    <List.Item arrow="horizontal" onClick={()=>{this.props.history.push("/updata_pwd")}}>登陆密码修改</List.Item>
                </List>
            </div>
        )
    }
}