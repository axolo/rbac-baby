$(document).ready(function(){

  $('#sign-info').html(doT.template($('#info').html())({
    id: Cookies.get('id'),
    token: Cookies.get('token')
  }));

});