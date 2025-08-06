$(document).ready(function () {

    //================ Buttons Hover Effect ============================
    $("#btns-box button").mouseenter(function () {
        $(this).css({
            "background-color": "red",
            "color": "white",
        });
    });
    $("#btns-box button").mouseleave(function () {
        $(this).css({
            "background-color": "#aaa",
            "color": "unset"
        });
    });

     // ========== Do: Apply all effects ==========
    $("#do").click(function () {
        $("#showHide").hide(500);
        $("#fade").fadeOut(500);
        $("#slide").slideUp(500);
        $("#animation").animate({
            width: "300px",
            height: "70px",
            opacity: 0.5
        }, 500);
    });

    // ========== Undo: Reverse all effects ==========
    $("#undo").click(function () {
        $("#showHide").show(500);
        $("#fade").fadeIn(500);
        $("#slide").slideDown(500);
        $("#animation").animate({
            width: "100%",
            height: "50px",
            opacity: 1
        }, 500);
    });

    // ========== Toggle: Toggle all effects ==========
    $("#toggle").click(function () {
        $("#showHide").toggle(500);
        $("#fade").fadeToggle(500);
        $("#slide").slideToggle(500);

        let box = $("#animation");
        if (box.width() === 300) {
            box.animate({
                width: "100%",
                height: "50px",
                opacity: 1
            }, 500);
        } else {
            box.animate({
                width: "300px",
                height: "70px",
                opacity: 0.5
            }, 500);
        }
    });




    //================ Show & Hide Effect ============================

    $("#showHide").click(function () {
        $(this).hide(500).show(500);
    });

    //================ Fade Effect ============================

    $("#fade").dblclick(function () {
        $(this).fadeOut(500).fadeIn(500);
    });

    //================ Slide Effect ============================

    $("#slide").mouseenter(function () {
        $(this).slideUp(500).slideDown(500);
    });

    //================ Animation Effect ============================

    $("#animation").mouseenter(function () {
        $(this).animate({
            width: "300px",
            height: "70px",
            opacity: 0.5
        }, 500).animate({
            width: "100%",
            height: "50px",
            opacity: 1
        }, 500);
    });
    $("#animation").mouseleave(function () {
        $(this).animate({
            width: "300px",
            height: "70px",
            opacity: 0.5
        }, 500).animate({
            width: "100%",
            height: "50px",
            opacity: 1
        }, 500);
    });

});
