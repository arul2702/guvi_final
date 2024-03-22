$(document).ready(function() {
    $('#signupForm').validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6 
            },
            confirm_password : {
                required: true,
                minlength: 6,
                equalTo: "#password"
            }
        },
        messages: {
            username: {
                required: "Please enter your username name",
                minlength: "Your first name must consist of at least 4 characters"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            }
        }
    });
    
    $("#signupbtn").click(function(e){
        e.preventDefault();
        // Check if the form is valid
        if ($('#signupForm').valid()) {
            $.ajax({
                url : 'http://localhost:8000/register.php',
                method: 'POST',
                data : $("#signupForm").serialize(),
                success : function(res){
                    console.log(res);
                    alert("Signup successful!");
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                    alert('Signup failed: ' + errorThrown); 
                }
            });
        } else {
            alert("Please fill in all required fields correctly.");
        }
    });
});
