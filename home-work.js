window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  nodes.html = function () { }
  nodes.addClass = function () { }
}

window.jQuery.ajax = function (options) {
  let url
  if (arguments.length === 1) {
    url = options.url
  } else if (arguments.length === 2) {
    url = arguments[0]
    options = arguments[1]
  }
  let method = options.method
  let body = options.body
  let successFn = options.successFn
  let failFn = options.failFn
  let headers = options.headers

  let request = new XMLHttpRequest()
  request.open(method, url)
  for (let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        successFn.call(undefined, request.responseText)
      } else if (request.status >= 400) {
        failFn.call(undefined, request)
      }
    }
  }
  request.send(body)
}

window.$ = window.jQuery

function f1(responseText) { }
function f2(responseText) { }

myButton.addEventListener('click', function (e) {
  window.jQuery.ajax({
    url: '/xxx',
    method: 'post',
    body: 'a=1&b=2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'frank': '18'
    },
    successFn: (x) => {
      f1.call(undefined, x)
      f2.call(undefined, x)
    },
    failFn: (x) => {
      console.log(x)
      console.log(x.status)
    }
  })
})