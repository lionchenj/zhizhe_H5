import { ServiceBase } from "./ServiceBase";
import { UserStorage } from "../storage/UserStorage";
import { model } from "../model/model";

export class UserService extends ServiceBase {

    private static  _instance: UserService
    public static get Instance(): UserService {
        return this._instance || (this._instance = new this())
    }

    private constructor() {
        super()
    }

    public isLogined(): boolean {
        if (ServiceBase.length > 0) {
            return true
        }
        const openid = UserStorage.getCookie("User.openid");
        if (openid) {
            ServiceBase.openid = openid
            return true
        }
        return false
    }
    //关闭app
    public async systemClose (): Promise<string> {
        const resp = await this.httpPost("systemClose",{},false);
        return resp.data;
    }

    //获取手机验证码
    public async getMobileMassges(mobile: string): Promise<void> {
        const params = {
            mobile: mobile
        }
        return await this.httpPost("get_mobile_massges", params, false)
    }
    //获取openid
    public async wechatLogin(params: any): Promise<void> {
        return await this.httpPost("wechatLogin",params,false)
    }
    /** 首页 */
    //轮播
    public async banner(): Promise<any> {
        return await this.httpPost("banner")
    }
    //搜索联想
    public async searchQue(unit_name:string): Promise<void> {
        return await this.httpPost("searchQue",{unit_name},true)
    }
    //推荐问题
    public async getCRecomQue(): Promise<void> {
        return await this.httpPost("getCRecomQue")
    }
    //显示问题
    public async getShowQue(): Promise<void> {
        return await this.httpPost("getShowQue")
    }
    //收藏
    public async favoriteQue(orderid:string): Promise<void> {
        return await this.httpPost("favoriteQue",{orderid},true)
    }
    //取消收藏
    public async delfavorQue(orderid:string): Promise<void> {
        return await this.httpPost("delfavorQue",{orderid},true)
    }
    //点赞
    public async fabulousQue(orderid:string,tid:string): Promise<void> {
        return await this.httpPost("fabulousQue",{orderid,tid},true)
    }
    //取消点赞
    public async delfabsQue(orderid:string,tid:string): Promise<void> {
        return await this.httpPost("delfabsQue",{orderid,tid},true)
    }
    //点赞收藏状态
    public async fabsAndfavor(orderid:string,tid?:string): Promise<void> {
        return await this.httpPost("fabsAndfavor",{orderid,tid},true)
    }
    /**领取优惠券 */
    //优惠券详情
    public async Couponsdetail(cardid:string): Promise<void> {
        return await this.httpPost("Couponsdetail",{cardid},true)
    }
    public async Get_coupons(cardid:string): Promise<void> {
        return await this.httpPost("Get_coupons",{cardid},true)
    }
    /** 注册 */
    //注册
    public async registerKnower(params:any): Promise<void> {
        return await this.httpPost("registerKnower", params, true)
    }
    /** 国外 */
    //国家
    public async getForignNation  (): Promise<void> {
        return await this.httpPost("getForignNation  ")
    }
    //市
    public async getForignCity  (nationid:string): Promise<void> {
        return await this.httpPost("getForignCity  ",{nationid},true)
    }
    /** 国外 */
    /** 国内 */
    //省
    public async getNationsCity(): Promise<void> {
        return await this.httpPost("getNationsCity")
    }
    //市
    public async getNationsCity2(province:string): Promise<void> {
        return await this.httpPost("getNationsCity2",{province},true)
    }
    /** 国内 */
    //区号
    public async getNationsCode(): Promise<void> {
        return await this.httpPost("getNationsCode")
    }
    //国家
    public async countryList(): Promise<void> {
        return await this.httpPost("countryList")
    }
    //学校
    public async schoolList(country:string): Promise<void> {
        return await this.httpPost("schoolList",{country},true)
    }
    //游校园学校
    public async schoolRist(country:string): Promise<void> {
        return await this.httpPost("schoolRist",{country},true)
    }
    //专业
    public async professionalList(schoolid:string): Promise<void> {
        return await this.httpPost("professionalList",{schoolid},true)
    }
    //年级
    public async getReadingGrade(): Promise<void> {
        return await this.httpPost("getReadingGrade")
    }
    //考试及分数
    public async knowerExam(): Promise<void> {
        return await this.httpPost("knowerExam")
    }
    //身份认证方法
    public async identity(identity_card:string,identity_name:string): Promise<void> {
        return await this.httpPost("identity",{identity_card,identity_name},true)
    }
    //学历
    public async getEducations(): Promise<void> {
        return await this.httpPost("getEducations")
    }
    //学校性质
    public async getSchoolType(): Promise<void> {
        return await this.httpPost("getSchoolType")
    }
    //擅长领域
    public async getGoodField(): Promise<void> {
        return await this.httpPost("getGoodField")
    }
    //注册话题 
    public async getTopicslist(): Promise<void> {
        return await this.httpPost("getTopicslist")
    }
    //客服二维码
    public async getCustomerService(type:string): Promise<void> {
        return await this.httpPost("getCustomerService",{type},true)
    }
    /**提问 */
    //话题 type:1.我要问，2.一对一
    public async getTopics(type:string,unit_name:string): Promise<void> {
        return await this.httpPost("getTopics",{type,unit_name},true)
    }
    //推荐话题
    public async getRTopic(type:string): Promise<void> {
        return await this.httpPost("getRTopic",{type},true)
    }
    //知者类型
    public async getKnowerType(): Promise<void> {
        return await this.httpPost("getKnowerType")
    }
    //人数
    public async getAnswerNumber(): Promise<void> {
        return await this.httpPost("getAnswerNumber")
    }
    //价格
    public async getAnswerPrice(): Promise<void> {
        return await this.httpPost("getAnswerPrice")
    }
    //热门类型
    public async getQueType(): Promise<void> {
        return await this.httpPost("getQueType")
    }
    //热门问题
    public async getHotQue(type:string): Promise<void> {
        return await this.httpPost("getHotQue",{type},true)
    }
    //推荐知者列表
    public async getKnowerlist(school:string, country:string): Promise<void> {
        return await this.httpPost("getKnowerlist",{school, country},true)
    }
    //推荐知者详情
    public async getKnowerDetail(id:string): Promise<void> {
        return await this.httpPost("getKnowerDetail",{id},true)
    }
    //聊天时长
    public async getRequire(): Promise<void> {
        return await this.httpPost("getRequire")
    }
    //沟通方式
    public async getComcation(): Promise<void> {
        return await this.httpPost("getComcation")
    }
    /**
     * 可使用优惠券总数和列表
     * @param price 
     * @param type 1、提问、2、别人在问、3、游校园、4、一对一
     */
    public async myCardCount(price:number,type:string): Promise<void> {
        return await this.httpPost("myCardCount",{price,type},true)
    }
    //我要问
    public async myAsk(params:any): Promise<void> {
        return await this.httpPost("myAsk",params,true)
    }
    //别人问
    public async otherAsk(params:any): Promise<void> {
        return await this.httpPost("otherAsk",params,true)
    }
    /**
     * 校园一对一提交
     * @param country 国家
     * @param school 学校
     * @param knowerid 知者id
     * @param apmentime 预约时间
     */
    public async SOTOAsk(country:string,school:string,knowerid:string,apmentime:string): Promise<void> {
        return await this.httpPost("SOTOAsk",{country,school,knowerid,apmentime},true)
    }
    /**
     * 咨询一对一提交
     * @param knower_type_id 知者类型
     * @param topic 话题id
     * @param requirement 时长
     * @param communication 沟通
     * @param duration 要求
     */
    public async COTOAsk(knower_type_id:string,topic:string,requirement:string,communication:string,duration?:string): Promise<void> {
        return await this.httpPost("COTOAsk",{knower_type_id,topic,requirement,communication,duration},true)
    }
    //0支付
    public async zeroAnswer(orderid:string): Promise<void> {
        return await this.httpPost("zeroAnswer",{orderid},true)
    }
    //订单支付
    public async orderConfirm(orderid:string,cardlistid?:string,type?:string,mobile?:string,wechatnum?:string): Promise<void> {
        return await this.httpPost("orderConfirm",{orderid,cardlistid,type,mobile,wechatnum},true)
    }
    //看答案支付
    public async ConfirmLanswer(orderid:string,cardlistid?:string): Promise<void> {
        return await this.httpPost("ConfirmLanswer",{orderid,cardlistid},true)
    }
    /**问题 */
    //订单
    public async Myorder(status?:string): Promise<void> {
        return await this.httpPost("Myorder",{status},true)
    }
    //退款方法
    public async RefundMoney(orderid:string): Promise<void> {
        return await this.httpPost("RefundMoney",{orderid},true)
    }
    //问题详情
    public async orderDetails(orderid:string): Promise<void> {
        return await this.httpPost("orderDetails",{orderid},true)
    }
    //获取星星
    public async getAnswerStar(answerid:string): Promise<void> {
        return await this.httpPost("getAnswerStar",{answerid},true)
    }
    //设置星星
    public async setAnswerStar(answerid:string, star:string): Promise<void> {
        return await this.httpPost("setAnswerStar",{answerid,star},true)
    }
    //追问
    public async runAsk(answerid:string, ask_content:string, price:string): Promise<void> {
        return await this.httpPost("runAsk",{answerid,ask_content,price},true)
    }
    
    /**我的 */
    //收藏列表
    public async favorQuelist(): Promise<void> {
        return await this.httpPost("favorQuelist")
    }
    /**
     * 优惠卷列表
     * @param status 0:未使用 1：已使用 2：已过期
     */
    public async myCard(status?:string): Promise<void> {
        return await this.httpPost("myCard",{status},true)
    }
    //我的推广列表
    public async MyPromlist(): Promise<void> {
        return await this.httpPost("MyPromlist")
    }
    //我的推广优惠券
    public async ProMycardlist(): Promise<void> {
        return await this.httpPost("ProMycardlist")
    }
    //反馈
    public async feedback(content: string, imagesList: Array<File>): Promise<void> {
        const imagePathList = new Array<string>()
        for (const imageFile of imagesList) {
            const path = await this.uploadFile(imageFile)
            imagePathList.push(path)
        }

        const params = {
            content: content,
            imagesList: imagePathList.join(",")
        }
        return await this.httpPost("feedback", params)
    }
    //关于
    public async aboutus(): Promise<void> {
        return await this.httpPost("aboutus")
    }

    //推广数量
    public async MyPromCount(): Promise<void> {
        return await this.httpPost("MyPromCount")
    }
    //我的消息
    public async myMessage(): Promise<Array<model.myMsg>> {
        const resp = await this.httpPost("myMessage")
        return resp.data as Array<model.myMsg>
    } 
    //设置已读消息 ID：消息id
    public async Messageread(id:string): Promise<void> {
        return await this.httpPost("Messageread",{id},true)
    } 

    /**公共 */
    //获取服务协议
    public async systemBulletin(): Promise<void> {
        return await this.httpPost("systemBulletin",{},true)
    }
    //获取服务协议
    public async getSystemcontract(type:string): Promise<void> {
        return await this.httpPost("getSystemcontract",{type},true)
    }
    //统一上传
    public async uploadFile(file: File): Promise<string> {
        const resp = await this.httpUpload(file)
        console.log("uploadFile", resp)
        return resp.data.data.path as string
    }
    //调微信
    public async getSignPackage(url:string): Promise<void> {
        return await this.httpPost("getSignPackage",{url},false)
    }
    //支付回调
    public async chenk_out_trade_no(orderid:string): Promise<void> {
        return await this.httpPost("chenk_out_trade_no",{orderid},true)
    }



    //登出
    public logout() {
        ServiceBase.openid = "";
        UserStorage.clearAccessToken();
    }
    //登出判断
    public async getMemberOutTime(): Promise<void> {
        await this.httpPost("getMemberOutTime")
    }
    //获取用户信息
    public async getUserInfo(openid:string): Promise<model.User> {
        const resp = await this.httpPost("getUserInfo",{openid},false)
        if(resp.data){
            return resp.data as model.User
        }else{
            return resp
        }
    }
    //修改/忘记密码
    public async updatePassword(mobile: string, code: string, password: string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code
        }
        return await this.httpPost("retrievePassword", params, false)
    }
}