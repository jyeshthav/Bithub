$(document).ready(function () {
  //NOTE: showLikes function is used to show which posts are liked when the page looks for the first time
  function showLikes() {
    var likes = $(".like");
    likes.each(function () {
      if ($(this).attr('data-liked') == 1) {
        $(this).children("i").removeClass("far").addClass("fas");
      }
    });
  }
  showLikes();
  
  //NOTE: Deals with the click events of the like buttons
  $(".like").click(function () {
    var data = {};
    var btn = $(this);
    data["userid"] = btn.attr("data-user");
    data["postid"] = btn.attr("id").replace("like", "");
    data["numlikes"] = btn.siblings("span").html();
    data["liked"] = btn.attr("data-liked");
    if (data["liked"] == 0) {
      $.post(
        "scripts/php/like-ajax.php",
        data,
        function (rdata) {
          rdata = JSON.parse(rdata);
          if(rdata["return"] == true){
            btn.attr("data-liked", 1);
            btn.siblings("span").html(rdata["numlikes"]);
            btn.children("i").removeClass("far").addClass("fas");  
          }
        }
      );
    } else if (data["liked"] == 1) {
      $.post(
        "scripts/php/like-ajax.php",
        data,
        function (rdata) {
          rdata = JSON.parse(rdata);
          if(rdata["return"] == true){
            btn.attr("data-liked", 0);
            btn.siblings("span").html(rdata["numlikes"]);
            btn.children("i").removeClass("fas").addClass("far");  
          }
        }
      );
    }

  });

  $(".like").hover(function () {
    var ele = $(this).children("i");
    ele.addClass("perm");
  }, function () {
    var ele = $(this).children("i");
    ele.removeClass("perm");
  });

  

  $(".toggle-comment").hover(function () {
    var ele = $(this).children("i");
    ele.addClass("perm");
  }, function () {
    var ele = $(this).children("i");
    ele.removeClass("perm");
  });
  

  //NOTE: Handles the click event of post-comment
  $(".post-comment").click(function() {
    var data = {};
    var btn = $(this);
    var x = btn.attr("id").replace("post-comment","");
    data["postid"] = x;
    var commtext = $("#comment-input" + x).val();
    if(commtext != "" || commtext != null){
      data["type"] = "post";
      data["commtext"] = commtext;
      data["postid"] = x;
      data["numcomms"] = $("#comm" + x).siblings("span").html();
      $.post(
        "scripts/php/comment-ajax.php",
        data,
        function (rdata) {
          rdata = JSON.parse(rdata);
          if(rdata["return"] = true){
            
            $("#comm" + x).siblings("span").html(rdata["numcomms"]);
            $("#comment-input" + x).val("");
          }
        }
      );
      ldata = {};
      ldata["type"] = "load";
      ldata["postid"] = x;
      $("#comment-holder" + x).load(
          "scripts/php/comment-ajax.php",
          ldata
        );
    }else{
      $("#comment-input" + x).tooltip();
    }
  });
});