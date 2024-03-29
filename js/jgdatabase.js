//Project Name: jgFeedbackA3
//File Name: jgdatabase.js
//Revision History:
//Created: 2024-02-20 by Jack Graul
//Updated: 2024-03-19 by Jack Graul

var db;

const types = [
    {id: 1, name: "Others"},
    {id: 2, name: "Canadian"},
    {id: 3, name: "Asian"},
    {id: 4, name: "European"},
    {id: 5, name: "Australian"}
];

const reviews = [];

function createDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("jgFeedbackA3", 2);
        request.onerror = (event) => {
            console.error(`Error in creating database...`);
        }
        request.onsuccess = (event) => {
            db = event.target.result;
            console.log(`onsuccess() called`);
            resolve(db);
        }
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            console.log("onupgradedneeded() called");

            const typesStore = db.createObjectStore("types", {
                keyPath: "id",
            });

            const reviewsStore = db.createObjectStore("reviews", {
                keyPath: "id",
                autoIncrement: true
            });

            types.forEach((item) => {
                typesStore.add(item);
            });

            reviews.forEach((item) => {
                reviewsStore.add(item);
            });
        }
    });
}
