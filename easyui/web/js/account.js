$(document).ready(function(){

  //初始化表格
  $('#dg').datagrid({
    // title: '帐号',
    // iconCls: 'icon-group',
    queryParams: {
      // passport: true,
      token: '56c3c9e7691c4e20d3a43f02c71e1498740a3219' //admin
      // token: 'a3af1056b80e649aae50be63fe4087644e5d5ab0' //id=4
    },
    rownumbers: true,
    fit: true,
    border: false,
    url: Config.apiurl + 'account',
    method: 'GET',
    async: true,
    nowrap: true,
    autoRowHeight: false,
    striped: true,
    collapsible: true,
    pagination: true,
    pageSize: 20,
    pageList: [20, 30, 50, 100],
    sortName: 'name',
    sortOrder: 'asc',
    remoteSort: true,
    columns:[[
      { field: 'check', checkbox: true },
      { field: 'id', title: '编号' },
      { field: 'name', title: '姓名', sortable: true },
      { field: 'mail', title: '邮箱' },
      { field: 'disable', title: '禁用', width: 50 }
    ]],
    toolbar: [{
      id: 'remove',
      text: '删除',
      iconCls: 'icon-remove',
      handler: function(){
        console.log('remove');
      }
    }, '-', {
      id: 'add',
      text: '添加',
      iconCls: 'icon-add',
      handler: function(){
        console.log('add');
      }
    }, '-', {
      id: 'find',
      text: '查找',
      iconCls: 'icon-find',
      handler: function(){
        console.log('search');
      }
    }],
    onDblClickRow: function(row, data) {
      $(this).datagrid('uncheckAll'),
      $(this).datagrid('checkRow', row);
      console.log(row);
    }
  });

});