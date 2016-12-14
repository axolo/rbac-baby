$(document).ready(function(){

  var create = function(){
    var actions = [];
    $('#resources-create input[name="action"]').each(function(){
      if($(this).val()) { actions.push($(this).val()); }
    });
    $.ajax({
      url: API_URL + '/resources/create',
      type: 'POST',
      data: {
        name: $('#resources-create input[name="name"]').val(),
        nick: $('#resources-create input[name="nick"]').val(),
        level: $('#resources-create input[name="level"]').val(),
        action: actions.join(',')
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

  $('#resources-create button[name="action-add"]').click(function(){
    $('.one-more:last').clone(true).insertBefore($(this)).children('input').val('');
  });

  $('#resources-create button[name="create"]').on('click', create);

});