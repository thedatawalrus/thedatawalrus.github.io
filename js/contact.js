function submitToAPI() {
       // e.preventDefault();
       var URL = "https://6wnm1f0yyh.execute-api.us-east-1.amazonaws.com/01/contact-us";

            var Namere = /[A-Za-z]{1}[A-Za-z]/;
            if (!Namere.test($("#name").val())) {
                         alert ("Name can not be less than 2 characters");
                return;
            }
            // var mobilere = /[0-9]{10}/;
            // if (!mobilere.test($("#phone").val())) {
            //     alert ("Please enter a valid mobile number");
            //     return;
            // }
            if ($("#email").val()=="") {
                alert ("Please enter your email id");
                return;
            }

            var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
            if (!reeamil.test($("#email").val())) {
                alert ("Please enter a valid email address");
                return;
            }

       var name = $("#name").val();
       var phone = $("#phone").val();
       var email = $("#email").val();
       var desc = $("#message").val();
       var data = {
          name : name,
          phone : phone,
          email : email,
          desc : desc
        };

       $.ajax({
         type: "POST",
         url : "https://6wnm1f0yyh.execute-api.us-east-1.amazonaws.com/01/contact-us",
         dataType: "json",
         crossDomain: "true",
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(data),

         
         success: function () {
           // clear form and show a success message
           alert("Successful");
           document.getElementById("contact-form").reset();
           location.reload();
         },
         error: function () {
           // show an error message
           alert("Unsuccessful");
         }});
     }