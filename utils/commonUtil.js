/**
 * 时间戳转日期
 * @param {number} timestamp 时间戳
 * @return 日期，格式为2019-06-03 10:16:09
 */
function timeStampToTime(timestamp) {
  timestamp = timestamp.toString().length == 10 ? timestamp * 1000 : timestamp;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hour)}:${formatNumber(
    minute
  )}:${formatNumber(second)}`;
}

/**
 * 将小于10的值加上零
 * @param {number} value 数字
 * @return {string}
 */
function formatNumber(value) {
  return `${value < 10 ? '0' + value : value}`;
}

/**
 * 日期转时间戳
 * @param {string} time 日期格式
 * @param {boolean} isUnix 是否是unix格式(10位)
 * @return {number} 时间戳
 */
function timeToTimeStamp(time, isUnix) {
  const date = new Date(time);
  const timestamp = date.getTime();
  return isUnix ? timestamp / 1000 : timestamp;
}

/**
 * 加载toast
 * @param {string} text 加载显示的文字
 */
function showLoading(text, config) {
  wx.showToast({
    title: text,
    icon: 'loading',
    duration: 2000,
    ...config
  });
}

/**
 * 成功toast
 * @param {string} text 成功操作显示的文字
 */
function showSuccess(text, config) {
  wx.showToast({
    title: text,
    icon: 'success',
    ...config
  });
}

/**
 * 显示确认栏，无取消按钮
 * @param {string} title 确认栏标题
 * @param {string} content 确认栏内容
 */
function showConfirm(title, content, config) {
  wx.hideToast();
  wx.showModal({
    title: title,
    content: JSON.stringify(content),
    showCancel: false,
    ...config
  });
}

/**
 * 判断是否是11位有效手机号
 * @param {number} phoneNum 手机号
 */
function isValidPhone(phoneNum) {
  const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!phoneReg.test(phoneNum)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 判断是否是数组
 * @param {*} obj
 * @return {boolean}
 */
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 图片预览
 * @param {number} index 图片下标
 * @param {array} urls 预览图片的url数组
 */
function previewImage(index, urls) {
  if (!isArray(urls) || index < 0 || index > urls.length - 1) {
    return false;
  }
  wx.previewImage({
    current: urls[index],
    urls: urls
  });
}

export {
  timeStampToTime,
  timeToTimeStamp,
  showLoading,
  showSuccess,
  showConfirm,
  isValidPhone,
  isArray,
  previewImage
};
