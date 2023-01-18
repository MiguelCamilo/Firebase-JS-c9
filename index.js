// import firebase admin library, cert allows you to connect to firebase
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"
// import credentials
import { service_account } from "./secrets.js"
 
// connect to firebase project
initializeApp({
    credential: cert(service_account)
})

// connect to firestore database
const db = getFirestore()

// create our object
const food = {
    name: 'Grilled Cheese',
    style: 'American Style',
    feeds: 1,
    price: 10.99,
    meal: 'Appetizer',
    prepTime: '5 min',
    inStock: true,
    description: 'Cheesy'
}

// create a collection
// go into db (database)
// go into 'foods' collection
// add a new document with data above (food)

db.collection('foods').add(food)

    .then(doc => console.log(`Added Food --> ${doc.id}`)) // returns document id
    .catch(console.error) // catching and display err

// gets the data
db.collection("foods").get()

    .then(collection => {
        
        const foods = collection.docs.map(doc => {
            let food = doc.data()
            food.id = doc.id
            return food
        })

        console.table(foods)
    })