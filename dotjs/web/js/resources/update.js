$(document).ready(function(){

  var update = function(){
    var actions = [];
    $('#resources-update input[name="action"]').each(function(){
      if($(this).val()) { actions.push($(this).val()); }
    });
    $.ajax({
      url: API_URL + '/resources/update/'  + $('input[name="name"]').val(),
      type: 'POST',
      data: {
        name: $('#resources-update input[name="name"]').val(),
        level: $('#resources-update input[name="level"]:checked').val(),
        nick: $('#resources-update input[name="nick"]').val(),
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

  $.ajax({
    url: API_URL + '/resources/get/' + $.Querystring('name'),
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        $('#resources-update').html(doT.template($('#data').text())(data));
      }
    }
  });

  $(document).on('click', '#resources-update button[name="update"]', update);

  //删除方法
  //@todo 防止最后一个方法被删除
  $(document).on('click', '#resources-update button[name="action-remove"]', function(event){
    //alert($(this).prev().val());
    $(this).prev().remove();
    $(this).remove();
  });

  //添加方法
  //@todo 当方法完全被删除了则无法添加
  //@todo 新添加的方法点击“删除”无响应
  $(document).on('click', '#resources-update button[name="action-add"]', function(){
    $('.one-more:last').clone(true).insertBefore($(this)).children('input').val('');
  });

});