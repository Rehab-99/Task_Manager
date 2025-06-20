<?php
require_once '../database.php';
header('Content-Type: application/json');

    try {
        $stmt = $connection->prepare("SELECT * FROM tasks");
        $stmt->execute();
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($tasks);
    } catch (PDOException $e) { 
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }   

?>