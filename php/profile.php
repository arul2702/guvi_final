<?php

    require 'vender/autoload.php';

    $client = new MongoDB\Client("mongodb://localhost:27017");

    $database = $client->selectDatabase('user');
    $collection = $database->selectCollection('profile');

    $phone_number = $_POST['phone_number'] ?? '';
    $dob = $_POST['dob'] ?? '';
    $gender = $_POST['gender'] ?? '';
    
    $document = [
        'phone_number' => $phone_number,
        'dob' => $dob,
        'gender' => $gender
    ];

    $result = $collection->insertOne($document);

    if ($result->getInsertedCount() > 0) {
        echo "Data inserted successfully into MongoDB.";
    } else {
        echo "Failed to insert data into MongoDB.";
    }

?>
