<?php

$username='root';
$password='';
$dbname='task_manager';
$host='localhost';

try{
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    http_response_code(500);
    echo "Database Connection failed: " . $e->getMessage();
    exit;
}


?>