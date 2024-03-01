//Project Name: jgFeedbackA2
//File Name: jgutil.js
//Revision History:
//Created: 2024-02-20 by Jack Graul

// Add form validation
function doValidate_frmAdd() {
    const form = $("#frmAdd");
    form.validate({
        rules: {
            txtBusinessNameAdd: {
                required: true,
                rangelength: [2,20]
            },
            txtReviewerEmailAdd: {
                required: true,
                emailcheck: true
            },
            txtReviewDateAdd: {
                required: true,
            },
            txtFoodQualityAdd: {
                range: [0,5]
            },
            txtServiceAdd: {
                range: [0,5]
            },
            txtValueAdd: {
                range: [0,5]
            }
        },
        messages: {
            txtBusinessNameAdd: {
                required: "Business name is required",
                rangelength: "Business name must be 2-20 characters long"
            },
            txtReviewerEmailAdd: {
                required: "Reviewer email is required",
                emailcheck: "Error - invalid email format"
            },
            txtReviewDateAdd: {
                required: "Review date is required",
            },
            txtFoodQualityAdd: {
                range: "Value must be 0-5"
            },
            txtServiceAdd: {
                range: "Value must be 0-5"
            },
            txtValueAdd: {
                range: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

// Modify form validation
function doValidate_frmModify() {
    const form = $("#frmModify");
    form.validate({
        rules: {
            txtBusinessNameModify: {
                required: true,
                rangelength: [2,20]
            },
            txtReviewerEmailModify: {
                required: true,
                emailcheck: true
            },
            txtReviewDateModify: {
                required: true,
            },
            txtFoodQualityModify: {
                range: [0,5]
            },
            txtServiceModify: {
                range: [0,5]
            },
            txtValueModify: {
                range: [0,5]
            }
        },
        messages: {
            txtBusinessNameModify: {
                required: "Business name is required",
                rangelength: "Business name must be 2-20 characters long"
            },
            txtReviewerEmailModify: {
                required: "Reviewer email is required",
                emailcheck: "Error - invalid email format"
            },
            txtReviewDateModify: {
                required: "Review date is required",
            },
            txtFoodQualityModify: {
                range: "Value must be 0-5"
            },
            txtServiceModify: {
                range: "Value must be 0-5"
            },
            txtValueModify: {
                range: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

// Email validation
jQuery.validator.addMethod(
    "emailcheck",
    function(value, element){
        const regexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return this.optional(element) || regexp.test(value);
    },
    "Email checker"
);