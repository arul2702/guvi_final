$(document).ready(function() {
    $('#profileForm').validate({
        rules: {
            first_name: {
                required: true,
                minlength: 4
            },
            last_name: {
                required: true,
                minlength: 1
            },
            phone_number: {
                required: true,
                minlength: 8,
                number: true,
            },
            dobinp: {
                required: true,
                date: true 
            },
            gender: {
                required: true,
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
            first_name: {
                required: "Please enter your first name",
                minlength: "Your first name must consist of at least 4 characters"
            },
            last_name: {
                required: "Please enter your last name",
                minlength: "Your last name must consist of at least 1 character"
            },
            phone_number: {
                required: "Please enter your phone number",
                minlength: "Your phone number must be at least 8 digits long",
                number: "Please enter a valid phone number"
            },
            dobinp: {
                required: "Please enter your date of birth",
                date: "Please enter a valid date"
            },
            gender: {
                required: "Please select your gender",
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            }
        },
    });
     
    $("#profilebtn").click(function(e){
        e.preventDefault();
        if ($('#profileForm').valid()) {
            $.ajax({
                url : 'http://localhost:8000/profile.php',
                method: 'POST',
                data : $("#profileForm").serialize(),
                success : function(res){
                    console.log(res);
                    alert("Profile Updated successful!");
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                    alert('Profile Updated successful!'); 
                }
            });
        } else {
            alert("Please fill in all required fields correctly.");
        }
    });

});
