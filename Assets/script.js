$(document).ready(function () {
    showAllTasks();

    $('#addTask').submit(function (e) {
        e.preventDefault();

        const title = $('input[name="title"]').val();
        const description = $('input[name="description"]').val();

        if(title === ''){
            showAlert('Title is required', 'danger');
            return;
        }

        const formData = {
            title: title,
            description: description
        };

        $.ajax({
            type: 'POST',
            url: 'api/create_task.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                showAlert('Task added successfully!', 'success');
                $('input[name="title"]').val('');
                $('input[name="description"]').val('');
                showAllTasks();
            },
            error: function (xhr) {
                let message = 'An error occurred';
                try {
                    const response = JSON.parse(xhr.responseText);
                        if (response.error) {
                            message = response.error || message;
                        }
                    }catch (e) {
                        message = xhr.responseText || message;
                    }
                    showAlert(message, 'danger');
            },
        });
    });

    // alert function
    function showAlert(message, type = 'info') {
        $('#alert-container').html(`
            <div class="d-flex justify-content-center my-3">
                <div class="alert alert-${type} alert-dismissible fade show w-50" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            </div>
        `);        
    }
    
    // show all tasks function
    function showAllTasks() {
        console.log('showAllTasks() is running...');

        $.ajax({
            type: 'GET',
            url: 'api/get_tasks.php', 
            dataType: 'json',
            success: function (tasks) {
                let taskList = '';
                tasks.forEach(task => {
                    taskList += `
                        <tr>
                            <td>${task.title}</td>
                            <td>${task.description}</td>
                            <td>${task.status}</td>
                            <td>
                                <button class="btn btn-sm btn-success edit-btn" 
                                data-id="${task.id}"
                                data-title="${task.title}"
                                data-description="${task.description}"
                                data-status="${task.status}"
                                >Edit</button>
                                
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${task.id}">Delete</button>
                            </td>
                        </tr> `;

                });
                $('#tasksTable tbody').html(taskList);
            },
            error: function (xhr) {
                let message = 'An error occurred';
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.error) {
                        message = response.error || message;
                    }  
                } catch (e) {
                    message = xhr.responseText || message;
                }
                showAlert(message, 'danger');
            }
        });
    }

    // open edit modal
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        const title = $(this).data('title');
        const description = $(this).data('description');
        const status = $(this).data('status');

        $('#edit-id').val(id);
        $('#edit-title').val(title);
        $('#edit-description').val(description);
        $('#edit-status').val(status);

        const modal = new bootstrap.Modal('#editTaskModal');
        modal.show();
    });

    //update task
    $('#editTaskForm').submit(function (e) {
        e.preventDefault();

        const id = $('.edit-btn').data('id');
        const title = $('#edit-title').val();
        const description = $('#edit-description').val();
        const status = $('#edit-status').val();

        const formData = {
            id: id,
            title: title,
            description: description,
            status: status
        };
        $.ajax({
            type: 'POST',
            url: 'api/update_task.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if(response.message === 'Task updated successfully!') {
                    showAlert(response.message, 'success');
                } else { 
                    showAlert(response.message, 'info');
                }

                $('#editTaskModal').modal('hide');
                showAllTasks();
            },
            error: function (xhr) {
                let message = 'An error occurred';
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.error) {
                        message = response.error || message;
                    }
                } catch (e) {
                    message = xhr.responseText || message;
                }
                showAlert(message, 'danger');
            }
        });
    });

});