//index.js
//获取应用实例
const app = getApp()
import {getInputValue} from '../../../utils/commonUtil.js'
import AuthorizeUtil from '../../../utils/authorize.js';
Page({
  data: {
    onRecord: true,
    sendMoreMsg: false,
    recordingClass: 'test',
    keyboardInputValue: ''
  },
  swithInputType: function () {
    this.setData({
      onRecord: !this.data.onRecord
    })
  },
  sendMore: function () {
    this.setData({
      sendMoreMsg: !this.data.sendMoreMsg
    })
  },
  /**
   * 获取输入的内容
   */
  bindKeyboardInput:function(e){
    this.data.keyboardInputValue = getInputValue(e);
  },

  /**
   * 开始录音
   */
  startRecord(){
    console.log('recoding...')
    this.setData({
      recordingClass:'recoding'
    });
    const recorderManager = wx.getRecorderManager()
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
  },

  /**
   * 结束录音
   */
  endRecord(){
    console.log('end recoding...');
    this.setData({
      recordingClass:''
    })
  },
  test(){
    let authorizeUtil = new AuthorizeUtil('camera');
    authorizeUtil.authorize()
      .then(res=>{
        console.log('=====',res)
      })
      .catch(e=>{
        console.log(e);
      })
  }
})
