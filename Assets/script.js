$(document).ready(function () {
    showAllTasks();
    $('.filter-btn[data-status="all"]').addClass('active');

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
                if(response.message) {
                    showAlert(response.message, 'success');
                }
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
    function showAllTasks(filter = 'all') {

        $.ajax({
            type: 'GET',
            url: 'api/get_tasks.php', 
            dataType: 'json',
            success: function (tasks) {
                let taskList = '';
                const $filteredTasks = tasks.filter(task => {
                    if (filter === 'all') return true;
                    return task.status === filter;
                    }
                );  

                $filteredTasks.forEach(task => {
                    const checked = task.status === 'completed' ? 'checked' : '';
                    const lineThrough = task.status === 'completed' ? 'text-decoration-line-through' : '';

                    taskList += `
                        <tr>
                            <td class="${lineThrough}">
                                <input type="checkbox" class="form-check-input me-2 status-checkbox" data-id="${task.id}" ${checked}>
                                ${task.title}
                            </td>
                            <td class="${lineThrough}">${task.description}</td>
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

        const id = $('#edit-id').val();
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

    // delete task
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');

        Swal.fire({
        title: 'Are you sure?',
        text: 'You Want to delete this task ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                type: 'POST',
                url: 'api/delete_task.php',
                data: { id: id },
                dataType: 'json',
                success: function (response) {   
                    if(response.message) {
                        showAlert(response.message, 'success');
                        showAllTasks();
                    }else {
                        showAlert('Unexpected response', 'warning');
                    }   
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
        });
    });

    //update task status
    $(document).on('change', '.status-checkbox', function () {
        const id = $(this).data('id');
        const status = $(this).is(':checked') ? 'completed' : 'pending';

        $.ajax({
            type: 'POST',
            url: 'api/update_task.php',
            data: { id: id, status: status },
            dataType: 'json',
            success: function (response) {
                if(response.message) {
                    showAlert(response.message, 'success');
                } else {
                    showAlert('Unexpected response', 'warning');
                }
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
    }
    );

    // filter tasks
    $(document).on('click', '.filter-btn', function () {
        const status = $(this).data('status');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        showAllTasks(status);
    });
});