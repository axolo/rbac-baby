$(document).ready(function(){

  $.ajax({
    url: API_URL + '/accounts/get/' + $.Querystring('id'),
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        $.ajax({
          type: 'GET',
          url: API_URL + '/roles/list',
          dataType: 'jsonp',
          success: function(roles){
            if(roles.err) {
              alert(JSON.stringify(roles.err));
            } else {
              $('#accounts-update input[name="id"]').val(data.id);
              $('#accounts-update input[name="name"]').val(data.name);
              $('#accounts-update input[name="mail"]').val(data.mail);
              $('#accounts-update input[name="phone"]').val(data.phone);
              var temp = roles;
              for(var i=0,l=roles.length;i<l;i++){
                if(-1 != data.roles.indexOf(roles[i].name)) {
                  temp[i] = { name: roles[i].name, nick: roles[i].nick, checked: true };
                }
              }
              $('#roles-list').html(doT.template($('#data').text())(temp));
            }
          }
        });
      }
    }
  });

  var update = function(){
    var roles = [];
    $('input[name="roles"]:checked').each(function(){
      roles.push($(this).val());
    });
    $.ajax({
      url: API_URL + '/accounts/update/'  + $('input[name="id"]').val(),
      type: 'POST',
      data: {
        id: $('#accounts-update input[name="id"]').val(),
        name: $('#accounts-update input[name="name"]').val(),
        mail: $('#accounts-update input[name="mail"]').val(),
        phone: $('#accounts-update input[name="phone"]').val(),
        password: $('#accounts-update input[name="password"]').val(),
        roles: roles
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          alert(JSON.stringify(data));
          window.location.href = 'get.html?id=' + $('#accounts-update input[name="id"]').val();
        }
      }
    });
  };

  $('#accounts-update input[name="update"]').click(update);

});