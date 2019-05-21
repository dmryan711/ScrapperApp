$(document).ready(function(){
    $('.collapsible').collapsible();
  });

$("body").on("click",".submit-comment",function(e){
    e.preventDefault();
    console.log($(this).attr("id"));
    
});


