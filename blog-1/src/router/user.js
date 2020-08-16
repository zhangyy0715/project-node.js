const {loginCheck} = require('../controller/user')
const { SuccessModel,ErrorModel} = require('../model/resModel')

const handleUserRouter =(req,res) => {
    const method = req.method
    // const url =req.url
    // const path =url.split('?')[0]
    //登录
    if (method ==='POST' && req.path ==='/api/user/login') {
        // 先获取用户名和密码，通过解构的方式获得
        const {username,password} = req.body
        const result = loginCheck(username,password)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('登录失败')
        }
        // return {
        //     msg:'这是登录接口'
        // }
    }
}
module.exports=handleUserRouter 