$(document).ready(function(){

  alert('暂停注册！');
  window.history.back();

  var signup = function(){
    $.ajax({
      url: API_URL + '/sign/up',
      type: 'POST',
      data: {
        id: $('#sign-up input[name="id"]').val(),
        name: $('#sign-up input[name="name"]').val(),
        mail: $('#sign-up input[name="mail"]').val(),
        phone: $('#sign-up input[name="phone"]').val(),
        password: $('#sign-up input[name="password"]').val()
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          //@todo 不成功处理，如重名等
          alert(JSON.stringify(data));
          window.location.href = 'in.html';
        }
      }
    });
  };

  $('#sign-up input[name="signup"]').click(signup);

});