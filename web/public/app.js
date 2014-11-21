$(document).ready(function(){
  $('#submit').on('click', function (){
    var input = $('#input').val();
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:8080/',
      data: { name: "John", location: "Boston" }
    }).done(function( data ) {
      alert(data);
    });
  });
});

