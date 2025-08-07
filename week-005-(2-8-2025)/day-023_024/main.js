$(document).ready(function () {

    // ================ Add Elements ============================

    $("#append-btn").click(function () {
        let taskText = $("#task-input").val();
        if (taskText) {
            $("#task-list").append('<li><span>' + taskText + '</span> <button class="remove-btn">Remove</button></li>');
            $("#task-input").val('');
        }
    });
    $("#before-btn").click(function () {
        let taskText = $("#task-input").val();
        if (taskText) {
            $("#task-list").before('<li><span>' + taskText + '</span> <button class="remove-btn">Remove</button></li>');
            $("#task-input").val('');
        }
    });

    // ================ Remove Elements ============================

    $(document).on("click", ".remove-btn", function () {
        $(this).parent().remove();
    });

    // ================ Toggle Class ============================

    $(document).on("click", "#task-list li", function () {
        $(this).toggleClass("done");
    });

    // ================ Get/Set Content ============================

    $("#show-text-btn").click(function () {
        alert("Text Content: " + $("#content-box").text());
    });
    $("#show-html-btn").click(function () {
        alert("HTML Content: " + $("#content-box").html());
    });

    // ================ Select Parents (using parentsUntil) ============================

    $("#highlight-parents-btn").click(function () {
        $("#nested-span").parentsUntil("body").addClass("highlight-parent");
    });
    $("#unselect-parents-btn").click(function () {
        $(".highlight-parent").removeClass("highlight-parent");
    });

    // ================ Traversing Down (Find) ============================
    
    $("#highlight-descendants-btn").click(function () {
        $("#find-container").find("*").addClass("highlight-descendant");
    });
    $("#unselect-descendants-btn").click(function () {
        $(".highlight-descendant").removeClass("highlight-descendant");
    });

    // todo ================ The End : Thank You ============================

});