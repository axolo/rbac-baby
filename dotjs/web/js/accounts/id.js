$(document).ready(function(){

  $.ajax({
    url: API_URL + '/accounts/get/' + $.Querystring('id'),
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      if(data.err) { 
        alert(JSON.stringify(data.err));
      } else {
        $('#accounts-id').html(doT.template($('#id').text())(data));
      }
    }
  });

});