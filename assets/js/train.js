// Initialize Firebase
var config = {
  apiKey: "AIzaSyDJN1IsEC4P58M-gufXuY6LNHwRbZP3PBo",
  authDomain: "train-3e25b.firebaseapp.com",
  databaseURL: "https://train-3e25b.firebaseio.com",
  projectId: "train-3e25b",
  storageBucket: "",
  messagingSenderId: "501323863503"
};
firebase.initializeApp(config);

var database = firebase.database();



$("#add-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#name").val().trim();

  var destination = $("#dest").val().trim();

  var firstTime = moment($("#first").val().trim(), "hh:mm").subtract(1, "years".format);

  var frequency = $("#free").val().trim();

  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));



  var newTrain = {
    name: trainName,
    place: destination,
    fTime: firstTime,
    freq: frequency
  }

  database.ref().push(newTrain);


  $("#name").val("");
  $("#dest").val("");
  $("#first").val("");
  $("#free").val("");

  return false;
})

database.ref().on("child_added", function (snapshot) {
  console.log(snapshot);

  var trainName = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTime = snapshot.val().firstTime;
  var frequency = snapshot.val().frequency;

  var trainTime = moment(firstTime, "HH:mm")

  var difference = moment().diff(moment(trainTime), "minutes");

  var trainRemain = difference % frequency;

  var minUntil = frequency - trainRemain;

  var nextArrival = moment().add(minUntil, "minutes").format("HH:mm");

  var trainRow = $("<tr class='text-center'>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minUntil)
  );

  
  $("#time > tbody").append(trainRow);
})



