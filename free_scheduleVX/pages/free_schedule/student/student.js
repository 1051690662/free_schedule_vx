// student.js
// 获取应用实例
const app = getApp()



Page({
    data:{
        username:'',
        password:'',
        code:'',
    },
    //获取账号 密码
    getAccount(event){
        console.log('zh',event.detail.value)  
        this.setData({
            username: event.detail.value
        })
    },
    getPassword(event){
        console.log('mm', event.detail.value)
        this.setData({
            password: event.detail.value
        })
    },
    getCode(event){
        console.log('code', event.detail.value)
        this.setData({
            code: event.detail.value
        })
    },

    //登录
    login(){
    console.log('登录')
    let username=this.data.username
    let password=this.data.password
    let code=this.data.code
    var reg=/^\d{10}$/
    if(username.length<10){
        wx.showToast({
            icon:'none',
            title: '请检查输入的学号是否正确',
             })
        return
    }   
    if(password.length==0){
        wx.showToast({
            icon:'none',
            title:'请输入密码',
             })
        return
    }
    if(code.length!=6){
        wx.showToast({
            icon:'none',
            title:'请检查输入的班级/组织码',
             })
        return
    }
    wx.showLoading({
        title: '请等待弹窗提示',
      })
      
       
      
      wx.cloud.callContainer({
        "config": {
          "env": "free-school-5g6gvakj0569c1b9"
        },
        "path": app.globalData.studentUrl,
        "header": {
          "X-WX-SERVICE":app.globalData.service
        },
        "method": "POST",
        "data": {
          "username": username,
          "password":password,
          "file_code":code,
        },
        success: function(res) {
            setTimeout(()=>{wx.hideLoading()},100)
                wx.showModal({
                    title: '提示',
                    content: res.data.status,
                    success: function (res) {
                      if (res.confirm) {//这里是点击了确定以后
                        console.log('用户点击确定')
                      } else {//这里是点击了取消以后
                        console.log('用户点击取消')
                      }
                    }
                 })
        }
      
      
     
    })
    
    
      
 
            

            

                

   },
   
 })