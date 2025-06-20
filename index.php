<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task-Manager</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/style.css">
</head>

<body>
    <h2>Task Manager</h2>
    <div id="alert-container"></div>

    <!-- add task -->
    <form id="addTask" class="row g-2 my-3">
        <div class="col-md-4">
            <input type="text" name="title" class="form-control" placeholder="Task Title">
        </div>
        <div class="col-md-4">
            <input type="text" name="description" class="form-control" placeholder="Description">
        </div>
        <div class="col-md-2">
            <button class="btn btn-primary w-100">Add Task</button>
        </div>
    </form>

    <!-- filter buttons -->
    <div class="d-flex justify-content-center my-5">
        <div class="btn-group w-50" role="group">
            <button class="btn btn-outline-primary filter-btn" data-status="all">All</button>
            <button class="btn btn-outline-primary filter-btn" data-status="pending">Pending</button>
            <button class="btn btn-outline-primary filter-btn" data-status="completed">Completed</button>
        </div>
    </div>

    <!-- all tasks -->
    <div class="d-flex justify-content-center my-4">
        <div class="table-responsive" style="width: 70%;">
            <table class="table table-striped text-center align-middle" id="tasksTable">
                <thead class="table-primary">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <!-- Update Task Modal -->
    <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskLabel" aria-hidden="true">
        <div class="modal-dialog">
            <form id="editTaskForm" class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editTaskLabel">Edit Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id" id="edit-id">
                    <div class="mb-3">
                        <label for="edit-title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="edit-title" name="title" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit-description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="edit-description" name="description">
                    </div>
                    <div class="mb-3">
                        <label for="edit-status" class="form-label">Status</label>
                        <select class="form-select" id="edit-status" name="status">
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>


    <!-- Scripts -->

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/script.js"></script>

</body>

</html>