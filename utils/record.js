function record(){
  const recorderManager = wx.getRecorderManager();
  const options = {
    duration: 6000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'mp3',
  }
}