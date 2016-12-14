jQuery.support.cors = Config.cors;

$(document).ready(function(){

  $('#tree').tree({
    onClick: function(node){
      //try
      //根据node.href判断权限
      //@todo 是否做在addTab方法里？污染？新增、编辑和删除操作（按钮、对话框）也有类似权限判断！
      //Config.apiurl + 'passport/' + node.href + '/' + node.method
      //有权限
      addTab('#tabs', node);
      //无权限throw
      //catch
    }
  });

  addTab('#tabs', {
    title: '首页',
    iconCls: 'icon-house',
    closable: true,
    href: 'home'
  });

});