const baseURL = "http://localhost:8081";
function request(url, data, config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data: data,
      header: {
        'content-type': 'application-json'
      },
      ...config,
      complete: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

const http = {};
http.post = (data, url, config) => {
  return request(data, url, { method: 'post', ...config })
};
http.get = (data, url, config) => {
  return request(data, url, { method: 'get', ...config })
};
http.delete = (data, url, config) => {
  return request(data, url, { method: 'delete', ...config })
};
http.put = (data, url, config) => {
  return request(data, url, { method: 'put', ...config })
};
export { http }