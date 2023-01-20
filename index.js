// import firebase admin library, cert allows you to connect to firebase
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import credentials
import { service_account } from "./secrets.js";

// connect to firebase project
initializeApp({
	credential: cert(service_account),
});

// connect to firestore database
const db = getFirestore();

// create our object
const food = {
	name: "Hamburger",
	style: "American Style",
	feeds: 1,
	price: 5.99,
	meal: "Lunch",
	prepTime: "5 min",
	inStock: true,
	description: "Juicy",
};

// create a collection
// go into db (database)
// go into 'foods' collection
// add a new document with data above (food)
const addDoc = async (item) => {
	const result = await db.collection("foods").add(item);
	console.log(`Added Food --> ${result.id}`); // returns document id
};


// gets the data
const getData = async () => {
	const collection = await db.collection("foods").get();

	const foods = collection.docs.map((doc) => {
		let food = doc.data();
		food.id = doc.id;
		return food;
	});
	console.table(foods);
};

// deletes document by id
const deleteData = async (itemId) => {
    const result = await db.collection('foods').doc(itemId).delete()
    console.log(`Item has been deleted:  ${result.id}`)
}   


// await addDoc(food);
await deleteData('bPUJmv5omELW4JWTnUIV');
await getData();