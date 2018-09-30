const noop = function noop() {}
const defaultOptions = {
  method: 'GET',
  success: noop,
  fail: noop,
  url: null
}

function request (opts) {
  opts = Object.assign({}, defaultOptions, opts)

  if (!opts.url) {
    return opts.fail(new Error('null url'))
  }

  wx.request({
    url: opts.url,
    method: opts.method,
    data: opts.data,
    success: result => {
      const data = result.data

      if (!data || data.code !== 0) {
        return opts.fail(new Error(`响应错误，${JSON.stringify(data)}`))
      }
      const res = data.data
      opts.success(res)
    },
    fail: err => {
      opts.fail(err)
    }
  })
}

module.exports = {request}