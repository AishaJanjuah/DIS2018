$(document).ready(() => {


    //login handler
    $("#loginbtn").on("click",() => {

  //let istedet for "var" en varibel der kan ændres

     let username = $("#inputUsername").val();
     let password = $("#inputPassword").val();

     SDK.User.login(username, password, (err, data) => {
         if (err && err.xhr.status === 401) {
             $(".form-group").addClass("has-error");

         } else {
             window.location.href = "nav.html";
         }






     })

    })


})