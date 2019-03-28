import * as React from 'react';
import './App.css';
// import { UserStorage } from "./storage/UserStorage";
// import { Button } from 'antd-mobile'
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./pages/login/Login";
import { registered } from "./pages/registered/registered";
import { studentReg } from "./pages/registered/studentReg";
import { parentReg } from "./pages/registered/parentReg";
import { teacherReg } from "./pages/registered/teacherReg";
import { adviserReg } from "./pages/registered/adviserReg";
import { Home } from "./pages/index_home/Home";
import { My } from "./pages/index_my/My";
import { ForgetPwd } from "./pages/forgetPwd/ForgetPwd";
import { Feedback } from "./pages/feedback/Feedback";
import { Message } from "./pages/message/Message";
import { QuestionList } from "./pages/questionList/QuestionList";
import { HotList } from "./pages/hotList/HotList";
import { QuestionDetails } from "./pages/questionDetails/QuestionDetails";
import { QuestionDetailsOther } from "./pages/questionDetails/QuestionDetailsOther";
import { QuestionDetailsOnO } from "./pages/questionDetails/QuestionDetailsOnO";
import { QuestionDetailsSHO } from "./pages/questionDetails/QuestionDetailsSHO";
import { Pay } from "./pages/question_pay/Pay";
import { Order } from "./pages/question_pay/Order";
import { SeePay } from "./pages/question_pay/SeePay";
import { PayOther } from "./pages/question_pay/PayOther";
import { Collection } from "./pages/collection/Collection";
import { download } from "./pages/download/download";
import { Coupon } from "./pages/coupon/Coupon";
import { CouponType } from "./pages/coupon/CouponType";
import { CouponGet } from "./pages/coupon/CouponGet";
import { Customer } from "./pages/customer/Customer";
import { Code } from "./pages/code/Code";
import { Search } from "./pages/search/Search";
import { UpdataPwd } from "./pages/updataPwd/UpdataPwd";
import { Extension } from "./pages/extension/Extension";
import { ExtensionCoupon } from "./pages/extension/ExtensionCoupon";
import { ExtensionList } from "./pages/extension/ExtensionList";
import { ExtensionDetails } from "./pages/extension/ExtensionDetails";
import { ExtensionDetailsOther } from "./pages/extension/ExtensionDetailsOther";
import { ExtensionDetailsOnO } from "./pages/extension/ExtensionDetailsOnO";
import { ExtensionDetailsSHO } from "./pages/extension/ExtensionDetailsSHO";
import { Notice } from "./pages/message/Notice";
import { About } from "./pages/about/About";
// const NotFound = () => (
//   <div> Sorry, this page does not exist. </div>
// )
class App extends React.Component {
  public render() {
    return (
      <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/login"  component={Login} />
          <Route path="/registered"  component={registered} />
          <Route path="/studentReg"  component={studentReg} />
          <Route path="/parentReg"  component={parentReg} />
          <Route path="/teacherReg"  component={teacherReg} />
          <Route path="/adviserReg"  component={adviserReg} />
          <Route path="/forget_pwd" component={ForgetPwd} />
          <PrivateRoute path="/My" component={My} />
          <PrivateRoute path="/message" component={Message} />
          <PrivateRoute path="/Feedback" component={Feedback} />
          <PrivateRoute path="/hotList" component={HotList} />
          <PrivateRoute path="/questionList" component={QuestionList} />
          <PrivateRoute path="/questionDetails" component={QuestionDetails} />
          <PrivateRoute path="/questionDetailsOther" component={QuestionDetailsOther} />
          <PrivateRoute path="/questionDetailsOnO" component={QuestionDetailsOnO} />
          <PrivateRoute path="/questionDetailsSHO" component={QuestionDetailsSHO} />
          <PrivateRoute path="/pay" component={Pay} />
          <PrivateRoute path="/order" component={Order} />
          <PrivateRoute path="/seePay" component={SeePay} />
          <PrivateRoute path="/payOther" component={PayOther} />
          <PrivateRoute path="/download" component={download} />
          <PrivateRoute path="/collection" component={Collection} />
          <PrivateRoute path="/coupon" component={Coupon} />
          <PrivateRoute path="/couponType" component={CouponType} />
          <PrivateRoute path="/couponGet" component={CouponGet} />
          <PrivateRoute path="/customer" component={Customer} />
          <PrivateRoute path="/code" component={Code} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/updata_pwd" component={UpdataPwd} />
          <PrivateRoute path="/extension" component={Extension} />
          <PrivateRoute path="/extensionList" component={ExtensionList} />
          <PrivateRoute path="/extensionCoupon" component={ExtensionCoupon} />
          <PrivateRoute path="/extensionDetails" component={ExtensionDetails} />
          <PrivateRoute path="/extensionDetailsOther" component={ExtensionDetailsOther} />
          <PrivateRoute path="/extensionDetailsOnO" component={ExtensionDetailsOnO} />
          <PrivateRoute path="/extensionDetailsSHO" component={ExtensionDetailsSHO} />
          <PrivateRoute path="/notice" component={Notice} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute component={Home} />
      </Switch>
    );
  }
}

export default App;
