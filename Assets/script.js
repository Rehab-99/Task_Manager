$(document).ready(function () {

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
            success: function (response) {
                showAlert('Task added successfully!', 'success');
                $('input[name="title"]').val('');
                $('input[name="description"]').val('');
                // function to show all tasks
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

    });



















});