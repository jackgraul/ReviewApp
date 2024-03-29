//Project Name: jgFeedbackA3
//File Name: jgglobal.js
//Revision History:
//Created: 2024-02-02 by Jack Graul
//Updated: 2024-02-20 by Jack Graul
//Updated: 2024-03-19 by Jack Graul
//Updated: 2024-03-28 by Jack Graul

function chkRatingsAdd_click() {
    isRatingsCheckboxChecked();
}

function chkRatingsModify_click() {
    isRatingsCheckboxChecked();
}

function addRatingChanged() {
    getAddOverallRating();
}

function modifyRatingChanged() {
    getModifyOverallRating();
}

function btnSave_click() {
    addFeedback();
}

function btnCancel_click() {
    $.mobile.changePage("#jgViewFeedbackPage", {transition: "none"});
    getReviews();
}

function btnDelete_click() {
    deleteFeedback();
    $.mobile.changePage("#jgViewFeedbackPage", {transition: "none"});
}

function btnUpdate_click() {
    updateFeedback();
}

function btnSaveDefaultEmail_click() {
    saveDefaultEmail();
}

function btnClearReviews_click() {
    deleteAllReviews();
}

function jgModifyFeedbackPage_pageshow() {
    showCurrentReview();
    showAllTypes();
}

function jgViewFeedbackPage_pageshow() {
    getReviews();
}

function jgAddFeedbackPage_pageshow() {
    let email = localStorage.getItem("email");
    $("#txtReviewerEmailAdd").val(email);
    setTimeout(function() {
        $("#cmbTypeAdd").val("Others").trigger("change");
    }, 100);
    showAllTypes();
}

function init() {
    // Ratings div logic
    $("#chkRatingsAdd").on("click", chkRatingsAdd_click);
    $("#chkRatingsModify").on("click", chkRatingsModify_click);
    $("#addRatings :input[type='number']").keyup(addRatingChanged);
    $("#modifyRatings :input[type='number']").keyup(modifyRatingChanged);

    // Button events
    $("#btnSave").on("click", btnSave_click);
    $("#btnCancel").on("click", btnCancel_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnSaveDefaultEmail").on("click", btnSaveDefaultEmail_click);
    $("#btnClearReviews").on("click", btnClearReviews_click);

    // Set default email
    getDefaultEmail();

    // Page show events
    $("#jgAddFeedbackPage").on("pageshow", jgAddFeedbackPage_pageshow);
    $("#jgModifyFeedbackPage").on("pageshow", jgModifyFeedbackPage_pageshow);
    $("#jgViewFeedbackPage").on("pageshow", jgViewFeedbackPage_pageshow);
}

function initDB() {
    initDatabase();
}

$(document).ready(function () {
    init();
    initDB();
});