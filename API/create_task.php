<?php
require_once '../database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';

    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title is required']);
        exit;
    }

    try {
        $stmt = $connection->prepare("INSERT INTO tasks (title, description) VALUES (:title, :description)");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->execute();

        http_response_code(201);
        echo json_encode(['message' => 'Task created successfully']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

?>