$(document).ready(function(){

  //获取角色
  $.ajax({
    type: 'GET',
    url: API_URL + '/roles/list',
    dataType: 'jsonp',
    success: function(roles){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        $('#roles-list').html(doT.template($('#roles').text())(roles));
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: API_URL + '/resources/list',
    dataType: 'jsonp',
    success: function(resources){
      if(resources.err) { 
        alert(JSON.stringify(resources.err));
      } else {
      //获取授权
        $.ajax({
          type: 'GET',
          url: API_URL + '/roles/get/'+ $.Querystring('role'),
          dataType: 'jsonp',
          success: function(roles) {
            if(roles.err) { 
              alert(JSON.stringify(roles.err));
            } else {
              var data = resources;
              // alert(JSON.stringify(data));
              for(var r=0,rl=resources.length;r<rl;r++) {
                //初始化格式
                for(var a=0,al=resources[r].action.length;a<al;a++){
                  resources[r].action[a] = { name: resources[r].action[a], checked: false };
                }
                //更新选中
                for(var u=0,ul=roles.access.length;u<ul;u++) {
                  if(resources[r].name == roles.access[u].resource) {
                    for(var a=0,al=resources[r].action.length;a<al;a++){
                      if(-1 != roles.access[u].action.indexOf(resources[r].action[a].name)) {
                        resources[r].action[a] = { name: resources[r].action[a].name, checked: true };
                      }
                    }
                  }
                }
              }
              $('#resources-list').html(doT.template($('#resources').text())(resources));
            }
          }
        });
      }
    }
  });


  $('input[type="checkbox"]').each(function(){
      //@todo doT内部选择
      //$(this).prop('checked', true);
  });

  var grant = function(){
    //格式数据
    var data = [];
    var resources = [];
    var roles = [];
    $('.col input[name="roles"]:checked').each(function(){
      data = $(this).val().split('/');
      if(-1 == resources.indexOf(data[0])){ resources.push(data[0]); }
      roles.push(data);
    });
    data = [];
    for(var r=0,rl=resources.length;r<rl;r++){
      data[r] = { resource: resources[r], action:[] };
      for(var a=0,al=roles.length;a<al;a++){
        if(resources[r]==roles[a][0]){
          data[r].action.push(roles[a][1]);
        }
      }
    }
    roles = { role: $.Querystring('role'), access: data };
    //提交数据
    $.ajax({
      type: 'POST',
      url: API_URL + '/roles/access/' + $.Querystring('role'),
      data: roles,
      dataType: 'jsonp',
      success: function(data){
        if(data.err) { 
          alert(JSON.stringify(data.err));
        } else {
          alert(JSON.stringify(data));
        }
      }
    });
  }

  $(document).on('click', 'button[name="grant"]', grant);

});