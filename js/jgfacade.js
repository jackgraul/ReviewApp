//Project Name: jgFeedbackA2
//File Name: jgfacade.js
//Revision History:
//Created: 2024-02-20 by Jack Graul
//Updated: 2024-02-20 by Jack Graul

// Uses the index of the selected review to display it's info
function getReviewInfo(reviewIndex) {
    let lineItem = $("#lstViewFeedback li").eq(reviewIndex);

    $("#txtBusinessNameModify").val(lineItem.find("h3").text().replace("Business Name: ", ""));
    $("#txtReviewerEmailModify").val(lineItem.find("p:eq(0)").text().replace("Reviewer Email: ", ""));
    $("#txtReviewerCommentsModify").val(lineItem.find("p:eq(1)").text().replace("Comments: ", ""));
    $("#txtReviewDateModify").val(lineItem.find("p:eq(2)").text().replace("Review Date: ", ""));
}

// Sets default email
function getDefaultEmail() {
    $("#txtDefaultReviewerEmail").val("jgraul0032@conestogac.on.ca");
}

// Saves the email in txtDefaultReviewerEmail to local storage and triggers an alert
function saveDefaultEmail() {
    let localEmail = $("#txtDefaultReviewerEmail").val();
    localStorage.setItem("email", localEmail);
    alert("Default reviewer email saved");
}

// Shows / hides the ratings div in add form upon checking and sets rating values to 0
function addRatings() {
    if ($("#chkRatingsAdd").is(":checked"))
    {
        $("#addRatings").show();

        $("#txtFoodQualityAdd").val(0);
        $("#txtServiceAdd").val(0);
        $("#txtValueAdd").val(0);
        $("#txtOverallRatingAdd").val("");
    }
    else
    {
        $("#addRatings").hide();
    }
}

// Calculates the overall rating for add form
function getAddOverallRating()
{
    let foodQuality = Number($("#txtFoodQualityAdd").val());
    let service = Number($("#txtServiceAdd").val());
    let value = Number($("#txtValueAdd").val());

    let overallRating = ((foodQuality + service + value) * 100 / 15).toFixed(0) + "%";
    $("#txtOverallRatingAdd").val(overallRating);
}

// Shows / hides the ratings div in modify form upon checking and sets rating values to 0
function modifyRatings() {
    if ($("#chkRatingsModify").is(":checked"))
    {
        $("#modifyRatings").show();

        $("#txtFoodQualityModify").val(0);
        $("#txtServiceModify").val(0);
        $("#txtValueModify").val(0);
        $("#txtOverallRatingModify").val("");
    }
    else
    {
        $("#modifyRatings").hide();
    }
}

// Calculates the overall rating for modify form
function getModifyOverallRating() {
    let foodQuality = Number($("#txtFoodQualityModify").val());
    let service = Number($("#txtServiceModify").val());
    let value = Number($("#txtValueModify").val());

    let overallRating = ((foodQuality + service + value) * 100 / 15).toFixed(0) + "%";
    $("#txtOverallRatingModify").val(overallRating);
}

// Checks validation upon saving a review
function addReview() {
    if (doValidate_frmAdd())
    {
        console.log("Add form is valid");
    }
    else
    {
        console.log("Add form is invalid");
    }
}

// Checks validation upon updating a review
function updateReview() {
    if (doValidate_frmModify())
    {
        console.log("Modify form is valid");
    }
    else
    {
        console.log("Modify form is invalid");
    }
}