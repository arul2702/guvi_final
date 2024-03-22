$(document).ready(function() {
    $('#loginForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6 
            },
        },
        messages: {
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please provide your password",
                minlength: "Your password must be at least 6 characters long"
            }
        }
    });

    $("#loginbtn").click(function (e) {
        e.preventDefault();
        
        // Check if the form is valid
        if ($('#loginForm').valid()) {
            // Perform AJAX request
            $.ajax({
                url: 'http://localhost:8000/login.php',
                method: 'POST',
                data: $("#loginForm").serialize(),
                success: function (res) {
                    // Check the response from the server
                    if (res === "Authentication successful!") {
                        // Alert for successful authentication
                        console.log(res)
                        window.location.href = "profile.html";
                        alert("Login successful!");
                    } else {
                        // Alert for invalid email or password
                        console.log(res)
                        alert("Invalid email or password!");
                    }
                },
                error: function (errorThrown) {
                    // Alert for AJAX request failure
                    console.log(errorThrown)
                    alert('AJAX request failed: ' + errorThrown);
                }
            });
        } else {
            // Alert for invalid form data
            alert("Please fill in all required fields correctly.");
        }
    });

});
