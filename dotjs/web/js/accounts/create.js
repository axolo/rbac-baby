$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: API_URL + '/roles/list',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) {
        alert(JSON.stringify(data.err));
      } else {
        $('#roles-list').html(doT.template($('#data').text())(data));
      }
    }
  });

  var create = function(){
    var roles = [];
    $('input[name="roles"]:checked').each(function(){
      roles.push($(this).val());
    });
    $.ajax({
      type: 'POST',
      url: API_URL + '/accounts/create',
      data: {
        id: $('#accounts-create input[name="id"]').val(),
        name: $('#accounts-create input[name="name"]').val(),
        mail: $('#accounts-create input[name="mail"]').val(),
        phone: $('#accounts-create input[name="phone"]').val(),
        password: $('#accounts-create input[name="password"]').val(),
        roles: roles
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          alert(JSON.stringify(data));
          window.location.href = 'get.html?id=' + data.id;
        }
      }
    });
  };

  //@todo 响应键盘事件
  $('#accounts-create input[name="create"]').click(create);

});