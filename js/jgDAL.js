//Project Name: jgFeedbackA3
//File Name: jgDAL.js
//Revision History:
//Created: 2024-02-20 by Jack Graul
//Updated: 2024-03-19 by Jack Graul

const Reviews = {
    insert : function(review){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite" );
            transaction.oncomplete = ()=> console.log("Success: insert transaction successful");
            transaction.onerror = event=> console.log("Error: insert transaction failed: " + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.add(review);

            req.onsuccess = (event)=>{
                console.log("Success: review added successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: Error in add");
                reject(event);
            }
        });
    },
    select : function(id){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"] );

            transaction.oncomplete = ()=> console.log("Success: select transaction successful");
            transaction.onerror = event=> console.log("Error: select transaction failed: " + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.get(id);

            req.onsuccess = (event)=>{
                console.log("Success: review selected successfully");
                event.target.result ? resolve(event.target.result) : resolve(null);

            }
            req.onerror = (event)=>{
                console.log("Error: Error in select");
                reject(event);
            }
        });
    },
    selectAll : function(){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"] );
            transaction.oncomplete = ()=> console.log("Success: select all transaction successful");
            transaction.onerror = event=> console.log("Error: select all transaction failed: " + event);

            const reviewsStore = transaction.objectStore("reviews");

            const cursor = reviewsStore.openCursor();

            let reviews = [];
            cursor.onsuccess = (event)=>{
                const ptr = event.target.result;
                if (ptr) {
                    reviews.push(ptr.value);
                    ptr.continue();
                }
                else{
                    // no more entries
                    resolve(reviews);
                }
            }
        });
    },
    delete : function(id){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite" );
            transaction.oncomplete = ()=> console.log("Success: delete transaction successful");
            transaction.onerror = event=> console.log("Error: delete transaction failed: " + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.delete(id);

            req.onsuccess = (event)=>{
                console.log("Success: review deleted successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: Error in delete");
                reject(event);
            }
        });
    },
    deleteAll: function () {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["reviews"], "readwrite");
            transaction.oncomplete = () => console.log("Success: deleteAll transaction successful");
            transaction.onerror = event => console.log("Error: deleteAll transaction failed: " + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.clear();

            req.onsuccess = (event) => {
                console.log("Success: all reviews deleted successfully");
                resolve(event);
            }
            req.onerror = (event) => {
                console.log("Error: Error in deleteAll");
                reject(event);
            }
        });
    },
    update : function(review){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite" );
            transaction.oncomplete = ()=> console.log("Success: update transaction successful");
            transaction.onerror = event=> console.log("Error: update transaction failed: " + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.put(review);

            req.onsuccess = (event)=>{
                console.log("Success: review updated successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: Error in update");
                reject(event);
            }
        });
    }
}

const Types = {
    selectAll : function(){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["types"] );
            transaction.oncomplete = ()=> console.log("Success: select all transaction successful");
            transaction.onerror = event=> console.log("Error: select all transaction failed: " + event);

            const typesStore = transaction.objectStore("types");

            const cursor = typesStore.openCursor();

            let types = [];
            cursor.onsuccess = (event)=>{
                const ptr = event.target.result;
                if (ptr) {
                    types.push(ptr.value);
                    ptr.continue();
                }
                else{
                    // no more entries
                    resolve(types);
                }
            }
        });
    }
}