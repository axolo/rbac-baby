$(document).ready(function(){

  var update = function(){
    $.ajax({
      url: API_URL + '/roles/update/'  + $('input[name="name"]').val(),
      type: 'POST',
      data: {
        name: $('#roles-update input[name="name"]').val(),
        nick: $('#roles-update input[name="nick"]').val()
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          window.history.back();
        }
      }
    });
  };

  $.ajax({
    url: API_URL + '/roles/get/' + $.Querystring('name'),
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        $('#roles-update input[name="name"]').val(data.name);
        $('#roles-update input[name="nick"]').val(data.nick);
      }
    }
  });

  $('#roles-update input[name="update"]').click(update);

});