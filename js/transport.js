$(document).ready(function () {
    $('#styleSelector').on('change', function () {
        $('#theme').attr('href', $(this).val());
    });
});
