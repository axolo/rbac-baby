$(document).ready(function(){

  var remove = function(){
    var names = [];
    $('input[name="name"]:checked').each(function(){
      names.push($(this).val());
    });
    if(confirm('确认删除以下资源：' + names.join(', ') + '？')) {
      $.ajax({
        url: API_URL + '/resources/delete/' + names.join(','),
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
          //@todo 友好提示信息
          if(data.err) { 
            alert(JSON.stringify(data.err));
          } else {
            alert(JSON.stringify(data));
            window.location.reload();
          }
        },
        error: function(xhr, text, err){
          alert(text);
        },
        beforeSend: function(xhr){}
      });
    }
  };

  //加载列表
  $.ajax({
    url: API_URL + '/resources/list',
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        $('#resources-list').html(doT.template($('#data').html())(data));
      }
    },
    error: function(xhr, text, err){
      //@todo alert(text);
    },
    beforeSend: function(xhr){
      //@todo alert('Loading...');
    }
  });

  //全选不选
  //@todo 全选后再取消勾选任意项，全选仍被勾选
  $('input[name="checkall"]').on('click', function(){
    $('input[name="name"]:checkbox').prop('checked', $(this).prop('checked'));
  });

  //删除所选
  $('button[name="delete"]').click(remove);

});