const API_URL = "//api.woodso.com:3000";
// const API_URL = "//localhost:3000";

//分析URL确定API，确认权限
//若错误，提示错误，中断执行（跳转错误页面）
//否则，继续（产生重复请求！！严重影响效率和性能！）
// $(document).ready(function(){
//   $.ajax({
//     type: 'GET',
//     url: API_URL + '/authorizations/' + url...,
//     dataType: 'jsonp',
//     success: function(data) {

//       }
//     }
//   });
// });