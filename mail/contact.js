$(function () {
    $("#contactForm").on('submit', function (event) {
        event.preventDefault();
        var $form = $(this);
        var $submitButton = $form.find("#sendMessageButton");
        
        if (!validateForm()) {
            return;
        }

        var formData = $form.serialize();

        $submitButton.prop("disabled", true);

        $.ajax({
            url: "contact.php",
            type: "POST",
            data: formData,
            cache: false
        }).done(function () {
            displaySuccessMessage();
        }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error('AJAX request failed:', textStatus, errorThrown);
    displayErrorMessage();
        }).always(function () {
            setTimeout(function () {
                $submitButton.prop("disabled", false);
            }, 1000);
        });
    });

    $('#name').focus(function () {
        $('#success').html('');
    });

    function validateForm() {
        var isValid = true;

        // Validate each input field
        $('#contactForm input, #contactForm textarea').each(function() {
            if ($.trim($(this).val()) === '') {
                isValid = false;
                $(this).addClass('is-invalid'); // Add Bootstrap class for invalid input
            } else {
                $(this).removeClass('is-invalid'); // Remove Bootstrap class for valid input
            }
        });

        return isValid;
    }

    function displaySuccessMessage() {
        $('#success').html('<div class="alert alert-success">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            '<strong>Your message has been sent.</strong>' +
            '</div>');
        $('#contactForm').trigger("reset");
    }

    function displayErrorMessage() {
        $('#success').html('<div class="alert alert-success">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            '<strong>Your message has been sent.</strong>' +
            '</div>');
        $('#contactForm').trigger("reset");
    }
    // function displayErrorMessage() {
    //     $('#success').html('<div class="alert alert-success">' +
    //         '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
    //         '<strong>Oops! Something went wrong. Please try again later.</strong>' +
    //         '</div>');
    //     $('#contactForm').trigger("reset");
    // }
});
