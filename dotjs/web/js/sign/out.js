$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: API_URL + '/sign/out',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        alert(JSON.stringify(data));
      }
    }
  });

  Cookies.remove('token');
  Cookies.remove('id');
  window.history.back();

});