$(document).ready(function () {
    // Subacribe modal event hook
    $(".subscribe-btn").on("click", function () {
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let inputID = "#" + $(this).data("subscribe-btn-for");
        let email = $(inputID).val();
        if (emailPattern.test(email)) {
            Swal.fire({
                icon: "success",
                title: "Welcome Aboard!!!",
                confirmButtonText: "OK"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                confirmButtonText: "Try Again"
            });
        }
    });
});
