var config = {
	apiKey: "AIzaSyCP7zZ94j7JMAMSe3QEvZGCD-FbnxDmxDE",
	authDomain: "new-user-5fd39.firebaseapp.com",
	databaseURL: "https://new-user-5fd39.firebaseio.com",
	storageBucket: "new-user-5fd39.appspot.com",
	messagingSenderId: "407267999379"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

  // Initial Values
var name = "";
var email = "";
var age = 0;
var comment = "";

// firebase watcher and intial loader
  $("#addUser").on("click", function() {
  	name = $("#nameInput").val().trim();
  	email = $("#emailInput").val().trim();
  	age = $("#ageInput").val().trim();
  	comment = $("#commentInput").val().trim();

  	dataRef.ref().push({
  		name:name,
  		email:email,
  		age:age,
  		comment:comment,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	})
  	return false;
  })
  // all members listener
dataRef.ref().on("child_added", function(snapshot) {
	$("#well").append("<p>"+snapshot.val().name+"</p>");
	$("#well").append("<p>"+snapshot.val().email+"</p>");
	$("#well").append("<p>"+snapshot.val().age+"</p>");
	$("#well").append("<p>"+snapshot.val().comment+"</p>");
	$("#well").append("<hr>");
})
// recent input listener
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().email);
	console.log(snapshot.val().age);
	console.log(snapshot.val().comment);

	$("#nameDisplay").html(snapshot.val().name);
	$("#emailDisplay").html(snapshot.val().email);
	$("#ageDisplay").html(snapshot.val().age);
	$("#commentDisplay").html(snapshot.val().comment);

// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})