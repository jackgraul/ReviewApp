//Project Name: jgFeedbackA3
//File Name: jgfacade.js
//Revision History:
//Created: 2024-02-20 by Jack Graul
//Updated: 2024-02-20 by Jack Graul
//Updated: 2024-03-19 by Jack Graul
//Updated: 2024-03-28 by Jack Graul

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

// Shows / hides the ratings div in add / modify form upon checking and sets rating values accordingly
function isRatingsCheckboxChecked() {
    const addRatingsChecked = $("#chkRatingsAdd").prop("checked");
    const modifyRatingsChecked = $("#chkRatingsModify").prop("checked");

    if (addRatingsChecked) {
        $("#addRatings").show();

        $("#txtFoodQualityAdd").val(0);
        $("#txtServiceAdd").val(0);
        $("#txtValueAdd").val(0);
        $("#txtOverallRatingAdd").val("");
    } else {
        $("#addRatings").hide();
    }

    if (modifyRatingsChecked) {
        $("#modifyRatings").show();

        $("#txtFoodQualityAdd").val();
        $("#txtServiceAdd").val();
        $("#txtValueAdd").val();
        $("#txtOverallRatingAdd").val();
    } else {
        $("#modifyRatings").hide();
    }
}

// Calculates the overall rating for add form
function getAddOverallRating() {
    let foodQuality = Number($("#txtFoodQualityAdd").val());
    let service = Number($("#txtServiceAdd").val());
    let value = Number($("#txtValueAdd").val());

    let overallRating = ((foodQuality + service + value) * 100 / 15).toFixed(0) + "%";
    $("#txtOverallRatingAdd").val(overallRating);
}

// Calculates the overall rating for modify form
function getModifyOverallRating() {
    let foodQuality = Number($("#txtFoodQualityModify").val());
    let service = Number($("#txtServiceModify").val());
    let value = Number($("#txtValueModify").val());

    let overallRating = ((foodQuality + service + value) * 100 / 15).toFixed(0) + "%";
    $("#txtOverallRatingModify").val(overallRating);
}

// Validates and saves a review to db
function addFeedback() {
    if (doValidate_frmAdd()) {
        console.log("Add form is valid");

        const businessName = $("#txtBusinessNameAdd").val();
        const reviewerEmail = $("#txtReviewerEmailAdd").val();
        const reviewerComments = $("#txtReviewerCommentsAdd").val();
        const reviewDate = $("#txtReviewDateAdd").val();
        const hasRating = $("#chkRatingsAdd").prop("checked");
        const rating1 = $("#txtFoodQualityAdd").val();
        const rating2 = $("#txtServiceAdd").val();
        const rating3 = $("#txtValueAdd").val();
        const typeId = $("#cmbTypeAdd").val();

        const review = new Review(businessName, reviewerEmail, reviewerComments, reviewDate, hasRating,
            rating1, rating2, rating3, typeId);

        Reviews.insert(review).then((data) => {
            console.log(data);
            alert("Review added successfully " + data.target.result);
        }).catch((e) => {
            console.log(e);
        });

        $.mobile.changePage("#jgViewFeedbackPage", {transition: "none"});
        clearForm('#frmAdd');
        isRatingsCheckboxChecked();
    } else {
        console.log("Add form is invalid");
    }
}

// Validates and updates review in db
function updateFeedback() {
    if (doValidate_frmModify()) {
        console.log("Modify form is valid");
        const id = Number(localStorage.getItem("id"));
        const businessName = $("#txtBusinessNameModify").val();
        const reviewerEmail = $("#txtReviewerEmailModify").val();
        const reviewerComments = $("#txtReviewerCommentsModify").val();
        const reviewDate = $("#txtReviewDateModify").val();
        const hasRating = $("#chkRatingsModify").prop("checked");
        const rating1 = $("#txtFoodQualityModify").val();
        const rating2 = $("#txtServiceModify").val();
        const rating3 = $("#txtValueModify").val();
        const typeId = $("#cmbTypeModify").val();

        const review = new Review(businessName, reviewerEmail, reviewerComments, reviewDate, hasRating,
            rating1, rating2, rating3, typeId);
        review.id = id;

        Reviews.update(review).then((data) => {
            console.log(data);
            alert("Review updated successfully");
        }).catch((e) => {
            console.log(e);
        });

        $.mobile.changePage("#jgViewFeedbackPage", {transition: "none"});
    } else {
        console.log("Modify form is invalid");
    }
}

// Shows review details when a review is clicked on
function showCurrentReview() {
    $("#modifyRatings").hide();

    const id = Number(localStorage.getItem("id"));

    Reviews.select(id).then((data) => {
        console.log(data);
        $("#txtBusinessNameModify").val(data.businessName);
        $("#txtReviewerEmailModify").val(data.reviewerEmail);
        $("#txtReviewerCommentsModify").val(data.reviewerComments);
        $("#txtReviewDateModify").val(data.reviewDate);
        $("#chkRatingsModify").prop("checked", data.hasRating).checkboxradio("refresh");
        $("#txtFoodQualityModify").val(data.rating1);
        $("#txtServiceModify").val(data.rating2);
        $("#txtValueModify").val(data.rating3);
        setTimeout(function() {
            $("#cmbTypeModify").val(data.typeId).trigger("change");
        }, 100);

        if (!data.hasRating) {
            $("#txtFoodQualityModify").val(0);
            $("#txtServiceModify").val(0);
            $("#txtValueModify").val(0);
            $("#txtOverallRatingModify").clear();
        }

        setTimeout(function(){
            isRatingsCheckboxChecked();
            getModifyOverallRating();
        }, 100);

        console.log(data.hasRating);
    }).catch((e) => {
        console.log(e);
    });
}

// Shows all reviews
function getReviews() {
    Reviews.selectAll().then((data) => {
        console.log(data);

        let lv = $("#lstViewFeedback");
        lv.empty();
        let htmlCode = "";

        if (data.length === 0) {
            htmlCode = "<h1>No record found</h1>";
        } else {
            for (let i = 0; i < data.length; i++) {
                const review = data[i];
                let ovrRating = "";

                if (review.hasRating) {
                    let foodQuality = Number(review.rating1);
                    let service = Number(review.rating2);
                    let value = Number(review.rating3);
                    ovrRating = ((foodQuality + service + value) * 100 / 15).toFixed(0) + "%";
                }

                htmlCode += `<li><a data-role="button" href="#" data-row-id=${review.id}>
                        <h1>${review.businessName}</h1>
                        <p>${review.reviewerEmail}</p>
                        <p>${ovrRating}</p>
                       </a></li>`;
            }
        }

        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lstViewFeedback a").on("click", function () {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $.mobile.changePage("#jgModifyFeedbackPage", {transition: "none"});
        });

    }).catch((e) => {
        console.log(e);
    });
}


// Deletes a review
function deleteFeedback() {
    const id = Number(localStorage.getItem("id"));

    Reviews.delete(id).then((data) => {
        console.log(data);
        alert("Review deleted successfully");
        $.mobile.changePage("#jgViewFeebackPage", {transition: "none"});

    }).catch((e) => {
        console.log(e);
    });
}

// Deletes all reviews
function deleteAllReviews() {
    const result = confirm("Do you really want to delete all reviews?");
    if (result) {
        Reviews.deleteAll().then((data) => {
            console.log(data);
            alert("All reviews deleted successfully");
        }).catch((e) => {
            console.log(e);
        });
    }
}

// Shows all types
function showAllTypes() {
    Types.selectAll().then((data) => {
        console.log(data);

        $("form select").empty();

        data.forEach((type) => {
            const option = `<option value="${type.name}" data-row-id="${type.id}">${type.name}</option>`;
            $("form select").append(option);
        });

        $("form select").on("click", function () {
            localStorage.setItem("id", $(this).find("option:selected").attr("data-row-id"));
        });

    }).catch((e) => {
        console.log(e);
    });
}

// Clears form
function clearForm(formId) {
    $(formId)[0].reset();
}

// Initializes db
function initDatabase() {
    createDatabase().then((data) => {
        console.log('Database create successfully...');
    }).catch((e) => {
        console.log('Error in database creation');
    });
}