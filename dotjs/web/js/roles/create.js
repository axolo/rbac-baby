$(document).ready(function(){

  var create = function(){
    $.ajax({
      url: API_URL + '/roles/create',
      type: 'POST',
      data: {
        name: $('#roles-create input[name="name"]').val(),
        nick: $('#roles-create input[name="nick"]').val()
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          alert(JSON.stringify(data));
          window.history.back();
        }
      }
    });
  };

  $('#roles-create input[name="create"]').click(create);

});