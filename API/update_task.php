<?php
require_once '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = $_POST['id'] ?? '';

    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit;
    } 

    if(isset($_POST['status']) && !isset($_POST['title'])) {
        $status = $_POST['status'];
        if(!in_array($status, ['pending', 'completed'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status']);
            exit;
        }
        try {
            $stmt = $connection->prepare("UPDATE tasks SET status = :status WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':status', $status);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Task status updated successfully!']);
            } else {
                echo json_encode(['message' => 'No changes made to the task status']);
            }
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            exit;
        }
    } else{
        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';
        $status = $_POST['status'] ?? 'pending';

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
                } else {
                    echo json_encode(['message' => 'No changes made to the task']);
                }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }

    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>