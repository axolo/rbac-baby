$(document).ready(function(){

  var signin = function(){
    $.ajax({
      type: 'GET',
      url: API_URL + '/sign/in',
      data: {
        id: $('#signin input[name="id"]').val(),
        password: $('#signin input[name="password"]').val()
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          if(data){
            //set cookie
            Cookies.set('id', data.id);
            Cookies.set('token', data.token);
            window.history.back();
          } else {
            alert('登录失败，重新登录。');
            window.location.reload();
          };
        }
      },
      error: function(xhr, text, err){},
      beforSend: function(xhr){}
    });
  };

  $('input[name="signin"]').click(signin);

});