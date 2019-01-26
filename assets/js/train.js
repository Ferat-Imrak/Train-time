// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQtZXXIV0nB-xcWE59Ju7eONE8fnWE67s",
  authDomain: "trainferat.firebaseapp.com",
  databaseURL: "https://trainferat.firebaseio.com",
  projectId: "trainferat",
  storageBucket: "",
  messagingSenderId: "246485293528"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";


$("#add-btn").on("click", function addButton(event) {
  event.preventDefault();

  name = $("#name").val().trim();
  destination = $("#dest").val().trim();
  firstTrainTime = $("#first").val().trim();
  frequency = $("#free").val().trim();

  database.ref().set({
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  })

})

database.ref().on("value", function (record) {
  $("#name-display").text(record.val().name);
  $("#destination-display").text(record.val().destination);
  $("#first-time-display").text(record.val().firstTrainTime);
  $("#frequency-display").text(record.val().frequency);

})



