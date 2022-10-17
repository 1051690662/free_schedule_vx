// app.js
App({
  onLaunch() {
      wx.cloud.init({
        Env:"free-school-5g6gvakj0569c1b9",
      })
      },
    
    globalData: {//全局变量
        donation:"http://127.0.0.1:7998",
        donationss:"http://127.0.0.1:27081",
        donations:"https://wxcloud-localdebug-proxy-11916-5-1307497945.sh.run.tcloudbase.com",
        studentUrl:"/api/1.0/vx_schedule_login/",
        adminUrl:"/api/1.0/vx_admin_login/",
        downloadFile:"/api/1.0/vx_download_file/",
        deleteAndCreat:"/api/1.0/vx_delete_and_creat/",
        modifyCheckMember:"/api/1.0/vx_modify_check_member/",
        service:"free-schedule",
        //service:"release"
    },
})
