$(document).ready(function(){
    $('.collapsible').collapsible();
  });

$("body").on("click",".submit-comment",function(e){
    e.preventDefault();
    let commentText = $.trim($(this).prev().children(".form-control").val());
    if(commentText == ""){
        console.log("This is blank")
    }else{
        console.log($(this).attr("id"));
        let articleId = $(this).attr("id");
        data = {
            articleId:articleId,
            commentText:commentText
        }

        $.ajax({
            type: "POST",
            url: "/addComment",
            data: data
           
          });
           

           //add the comment locally to the list
        console.log($(this).parent().parent());
        $( "<p>"+commentText+"</p>" ).insertBefore("#comment-form");
        //set comment text to blank
        $(this).prev().children(".form-control").val("");


    }
  
    
   
   
    
});


