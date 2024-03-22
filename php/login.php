<?php

header("Access-Control-Allow-Origin: *");

require './vendor/autoload.php';
$redis = new Predis\Client();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $userData = $redis->hgetall($email);

    if (empty($userData)) {
        $servername = "localhost";
        $db_username = "root";
        $db_password = "";
        $dbname = "guvi_arul";

        $conn = new mysqli($servername, $db_username, $db_password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM user WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $userData = $result->fetch_assoc();
            $redis->hmset($email, $userData);
        } else {
            echo "Invalid email or password!";
            exit();
        }

        $stmt->close();
        $conn->close();
    }

    if ($userData["password"] === $password) {
        echo "Authentication successful!";
        exit();
    } else {
        echo "Invalid email or password!";
    }
} else {
    echo "Invalid request method!";
}

?>
