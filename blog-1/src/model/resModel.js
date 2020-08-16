class BaseModel {
    constructor(data,message) { //传两个参数进来，data是对象，message是字符串，但是也要兼容只传一个参数进来的情况
        if (typeof data ==='string') { //如果只传了一个字符串，那么直接将this.message赋值成data，其他两个参数都赋值为空
            this.message = data
            data=null  //赋值为空后下面两个if条件句就不会执行了
            message=null
        }
        if (data){     //这个分支是：正常传进来两个参数，将类中的this.data赋值成data，将this.message赋值成message
            this.data = data
        }
        if (message){
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data,message) {
        super(data,message)  // 用super继承父类的构造函数
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data,message) {
        super(data,message)
        this.errno = -1
    }
}
//输出
module.exports ={
    SuccessModel,
    ErrorModel
}