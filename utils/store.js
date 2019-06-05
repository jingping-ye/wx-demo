/**
 * 缓存操作类
 */
class Store {
  /**
   * 写入缓存
   */
  setItem(key, value, moduleName) {
    if (moduleName) {
      const moduleNameInfo = this.getItem(moduleName) || {};
      moduleNameInfo[key] = value;
      try {
        wx.setStorageSync(moduleName, moduleNameInfo);
      } catch (e) {
        wx.setStorage({
          key: moduleName,
          data: moduleNameInfo
        });
      }
    } else {
      try {
        wx.setStorageSync(key, data);
      } catch (e) {
        wx.setStorage({
          key: key,
          data: value
        });
      }
    }
  }

  /**
   * 读取缓存
   */
  getItem(key, moduleName) {
    if (moduleName) {
      const val = this.getItem(moduleName);
      if (val) {
        return val[key];
      } else {
        return '';
      }
    }

    return wx.getStorageSync(key);
  }

  /**
   * 清理缓存
   */
  clear(name) {
    name ? wx.removeStorageSync(name) : wx.clearStorageSync();
  }
}

export default Store;
