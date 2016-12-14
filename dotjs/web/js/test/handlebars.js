$(document).ready(function(){

  var data = { "authorization": [{
    "role": "admin",
    "resource": "accounts",
    "action": ["create", "list", "update", "delete", "id"]
  }, {
    "role": "admin",
    "resource": "sign",
    "action": ["up", "in", "out", "info"]
  }, {
    "role": "guest",
    "resource": "sign",
    "action": ["up", "in", "out", "info"]
  }]};

  $(document).on('click','.click',function(event){
   alert($(this).parent().prev().text());
});

  $('#list').html(Handlebars.compile($('#data').text())(data));

});