<?php
require_once '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = $_POST['id'] ?? '';
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $status = $_POST['status'] ?? '';
    $status = in_array($status, ['pending', 'completed']) ? $status : 'pending';

    if (empty($id) || empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID and Title are required']);
        exit;
    } 

    try {
        $stmt = $connection->prepare("UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':status', $status);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Task updated successfully!']);
        }
        else {
            echo json_encode(['message' => 'No changes made to the task']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}




















?>