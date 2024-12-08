$(document).ready(function () {
    $("#themeToggleBtn").on("click", function () {
        const themeLink = $("#themeStylesheet");
        const currentTheme = themeLink.attr("href");

        if (currentTheme === "css/anukrati.css") {
            themeLink.attr("href", "css/rohan.css");
            $(this).text("Switch to Anukrati's Styling");
        } else {
            themeLink.attr("href", "css/anukrati.css");
            $(this).text("Switch to Rohan's Styling");
        }
    });
});
