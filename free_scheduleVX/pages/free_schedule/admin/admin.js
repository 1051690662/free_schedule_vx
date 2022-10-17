// pages/free_schedule/admin/admin.js
const app=getApp()
var file_code=0
var check_member=""
var done_number=0
Page({
    getCode(url){
       var that=this
        wx.cloud.callContainer({
            "config": {
            "env": "free-school-5g6gvakj0569c1b9"
             },
             "path": url,
             "header": {
              "X-WX-SERVICE": app.globalData.service
             },
             "method": "POST",
                success:function(res){
                    if(res.data.errcode=="0"){
                    that.setData({
                         result: res.data,
                          })
                    file_code=res.data.file_code
                    done_number=res.data.done_number
                    console.log(file_code)
                     wx.hideLoading()
                    }
                }
                })    
    },
    bindFormSubmit(e) {
        wx.cloud.callContainer({
            "config": {
              "env": "free-school-5g6gvakj0569c1b9"
            },
            "path": app.globalData.modifyCheckMember,
            "header": {
              "X-WX-SERVICE": app.globalData.service
            },
            "method": "POST",
            "data": {
                check_member:e.detail.value.textarea,
                file_code:file_code
            },
         success:function(res){
             console.log(res.data.status)
             if(res.data.errcode=="0"){
                wx.redirectTo({      
                    url: './admin',    //要跳转到的页面路径
             })  
                
             }
            }
        })
},

      downloadFile(event){
          console.log(done_number)
          if(done_number==0){
            wx.showToast({
                title: '至少录入1人才可下载！',
                icon: 'none',
                duration: 3000
              })
          }else{
            wx.showLoading({
                title: '下载中',
              })
                  wx.cloud.callContainer({
                    "config": {
                      "env": "free-school-5g6gvakj0569c1b9"
                    },
                    "path": app.globalData.downloadFile,
                    "header": {
                      "X-WX-SERVICE": app.globalData.service
                    },
                    "method": "POST",
                    "data": {
                        file_code:file_code
                    },
                success: function(res) {
                  if (res.statusCode === 200 && res.data.errcode=="0") {       
                    wx.cloud.downloadFile({
                        fileID:res.data.file_id,
                        success (res) {
                          if (res.statusCode === 200) {
                            const filePath = res.tempFilePath;
                            wx.openDocument({
                              filePath: filePath,
                              showMenu: true,
                              success: function (res) {
                                console.log(res, '打开文档成功');
                                setTimeout(()=>{wx.hideLoading()},500)
                              }
                            });
                          }
                        }
                      })                                                                        
                    }   else{
                        wx.showToast({
                            title: res.data.status,
                            icon: 'none',
                            duration: 3000
                          })
                        }
                  }                                           
                })
            }
            },
        
        
  

      delectAndCreat(event){
        wx.showModal({
            title: '注意！',
            content: "确认要 删除 并重建我的无课表吗，已录入人员将会丢失，此操作不可撤销",
            confirmText:"删除重建",
            confirmColor:"#ff0000",
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                console.log('用户点击确定')
                wx.showLoading({
                    title: '请稍后',
                  })
                     wx.cloud.callContainer({
                        "config": {
                          "env": "free-school-5g6gvakj0569c1b9"
                        },
                        "path": app.globalData.deleteAndCreat,
                        "header": {
                          "X-WX-SERVICE": app.globalData.service
                        },
                        "method": "POST",
                        "data": {
                            code: res.code,
                            file_code:file_code
                        },
                     success:function(res){
                         
                         if(res.data.errcode=="0"){
                            wx.redirectTo({      
                                url: './admin',    //要跳转到的页面路径
                         })                             
                         }           
                    }
                })
                                                                                                                              
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })
      },
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log("11")
        var that = this;
        this.getCode(app.globalData.adminUrl);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
            wx.showLoading({
              title: '加载中',
            })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

 

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})