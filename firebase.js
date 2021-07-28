import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCIt8nGooMIHD87OWhTG-ms6-N44Tvv_hQ",
	authDomain: "rpalm-az-clone.firebaseapp.com",
	projectId: "rpalm-az-clone",
	storageBucket: "rpalm-az-clone.appspot.com",
	messagingSenderId: "410371575847",
	appId: "1:410371575847:web:db3149deae213a17583e02",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = app.firestore();

export default db;
