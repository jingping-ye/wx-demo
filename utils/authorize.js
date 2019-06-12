const grantMap = {
  address:{
    name:"通讯地址"
  },
  invoiceTitle:{
    name:"发票抬头"
  },
  invoice:{
    name:"获取发票"
  },
  werun:{
    name:"微信运动步数"
  },
  record:{
    name:"录音功能"
  },
  writePhotosAlbum:{
    name:"保存到相册"
  },
  camera:{
    name:"摄像头"
  }
}
class AuthorizeUtil{
  constructor(authorizeScope){
    this.authorizeScope = `scope.${authorizeScope}`;
    this.authorizeName = grantMap[authorizeScope].name;
  }

  authorize(){
    return new Promise((resolve,reject)=>{
      wx.authorize({
        scope: this.authorizeScope,
        success:res=>{
          //  调用成功的回调
          resolve(res);
        },
        fail:e=>{
          //  调用失败
          let authorizeResult = this.failAuthorize();
          authorizeResult.then(res=>{
            console.log('回调结果:',res);
          })
          .catch(e=>{
            console.log(e);
          })
        }
      })
    })
  }

  /**
   * 取消授权显示栏
   */
  cancelGrant(){
    wx.showToast({
      icon:"none",
      title: '已取消授权',
    })
  }

  /**
   * 成功授权显示栏
   */
  successGrant(){
    wx.showToast({
      title: '已成功授权',
    })
  }

  /**
   * 认证失败的二次授权
   * 因为openSetting不能使用promise，所以采用函数封装
   */
  failAuthorize(){
    let authorizeScope = this.authorizeScope;
    let authorizeName = this.authorizeName;
    return new Promise((resolve,reject)=>{
      //  第一步:开启授权提示
      wx.showModal({
        title: '提示',
        content: `你没有开启${authorizeName}权限，该功能无法使用`,
        showCancel: true,
        confirmText: '去授权',
        confirmColor: "#52a2d8",
        success: res => {
          if(!res.confirm){
            this.cancelGrant();
          }else{
            //  [点击授权之后]第二步:打开设置界面
            wx.openSetting({
              success: res => {
                if (!res.authSetting[authorizeScope]) {
                  reject(res.authSetting[authorizeScope]);
                  this.cancelGrant();
                } else {
                  this.successGrant();
                  resolve(res.authSetting[authorizeScope]);
                }
              },
              fail: e => {
                this.cancelGrant();
                reject(e);
              }
            })
          }
        },
        fail: e => {
          this.cancelGrant();
          reject(e);
        }
      })
    })
  }
}

export default AuthorizeUtil;