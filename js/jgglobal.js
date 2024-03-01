//Project Name: jgFeedbackA1
//File Name: jgglobal.js
//Revision History:
//Created: 2024-02-02 by Jack Graul
//Updated: 2024-02-20 by Jack Graul

function modifyReview_click() {
    let reviewIndex = $(this).index();
    getReviewInfo(reviewIndex);
}

function chkRatingsAdd_click() {
    addRatings();
}

function chkRatingsModify_click() {
    modifyRatings();
}

function addRatingChanged() {
    getAddOverallRating();
}

function modifyRatingChanged() {
    getModifyOverallRating();
}

function btnSave_click() {
    addReview();
}

function btnUpdate_click() {
    updateReview();
}

function btnSaveDefaultEmail_click() {
    saveDefaultEmail();
}

function init() {
    $("#lstViewFeedback li").on("click", modifyReview_click);
    $("#chkRatingsAdd").on("click", chkRatingsAdd_click);
    $("#chkRatingsModify").on("click", chkRatingsModify_click);
    $("#addRatings :input[type='number']").keyup(addRatingChanged);
    $("#modifyRatings :input[type='number']").keyup(modifyRatingChanged);
    $("#btnSave").on("click", btnSave_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    getDefaultEmail();
    $("#btnSaveDefaultEmail").on("click", btnSaveDefaultEmail_click);
}

$(document).ready(function (){
    init();
});