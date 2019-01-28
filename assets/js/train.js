// Initialize Firebase
var config = {
  apiKey: "AIzaSyBd8AO_nDPkxZ4ivl9RF99XwuwvP7azilk",
  authDomain: "trainferat-26ef7.firebaseapp.com",
  databaseURL: "https://trainferat-26ef7.firebaseio.com",
  projectId: "trainferat-26ef7",
  storageBucket: "trainferat-26ef7.appspot.com",
  messagingSenderId: "613461100860"
};
var database;

firebase.initializeApp(config);
database = firebase.database();





$("#add-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#name").val().trim();

  var destination = $("#dest").val().trim();

  var firstTime = moment($("#first").val().trim(), "HH:mm").format("HH:mm");

  var frequency = $("#free").val().trim();

  //Experiments
  //1. Experiment 1: Get rid of fTime. Observation: The error went away.
  //2. Experiment 2: 
  //     Assumption: fTIme doesn't work if it's an object. 50% sure.
  //     Examine firstTime in the debugger. 


  var newTrain = {
    name: trainName,
    place: destination,
    fTime: firstTime,
    freq: frequency
  };

  database.ref().push(newTrain);


  $("#name").val("");
  $("#dest").val("");
  $("#first").val("");
  $("#free").val("");


});

database.ref().on("child_added", function (snapshot) {
  // console.log(snapshot);

  var trainName = snapshot.val().name;
  var destination = snapshot.val().place;
  var firstTime = snapshot.val().fTime;
  var frequency = snapshot.val().freq;
  var trainTime = moment(firstTime, "HH:mm");
  var currentTime = moment();
  
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
});



