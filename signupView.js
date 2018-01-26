
//Sign up function

$("#signupbtn").on("click",() => {

    let newusername = $("#inputNewusername").val();
    let newpassword = $("#inputNewpassword").val();

    SDK.User.createUser(newusername, newpassword, (err, data) => {
        if (err && err.xhr.status === 401) {
            $(".form-group").addClass("has-error");
        } else {
            window.alert("You have been signed up! Wooohooooo!");
            window.location.href = "login.html";


        }
    })
});



