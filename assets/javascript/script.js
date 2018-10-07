// Initialize Firebase
var config = {
  apiKey: "AIzaSyDs4XpeSdXlCZIfbJCZ6WfW-AFh4d3sMOM",
  authDomain: "classactivity-9843d.firebaseapp.com",
  databaseURL: "https://classactivity-9843d.firebaseio.com",
  projectId: "classactivity-9843d",
  storageBucket: "classactivity-9843d.appspot.com",
  messagingSenderId: "903829561659"
};
firebase.initializeApp(config);

const database = firebase.database();

$("#form").on("submit", function (event) {
  event.preventDefault();

  const trainName = $("#name").val().trim();
  const departCity = $("#city").val().trim();
  const departTime = moment($("#time").val().trim(), "HH:mm").format("X");
  const departFreq = $("#frequency").val().trim();

  const trainObj = {
    name: trainName,
    city: departCity,
    time: departTime,
    frequency: departFreq
  };

  database.ref().push(trainObj);

  console.log(trainName);
  console.log(departCity);
  console.log(departTime);
  console.log(departFreq);

  $("#name").val("");
  $("#city").val("");
  $("#time").val("");
  $("#frequency").val("");

});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  const trainName = childSnapshot.val().name;
  const departCity = childSnapshot.val().city;
  const departTime = childSnapshot.val().time;
  const departFreq = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(departCity);
  console.log(departTime);
  console.log(departFreq);

  const departTimeConverted = moment(departTime, "X").subtract(1, "years");

  const currentTime = moment();

  const differenceTime = moment().diff(moment(departTimeConverted), "minutes");

  const remainingTime = differenceTime % departFreq;

  const departMinutes = departFreq - remainingTime;

  const departNext = moment().add(departMinutes, "minutes").format("hh:mm A");

  const trainRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(departCity),
    $("<td>").text(departFreq),
    $("<td>").text(departNext),
    $("<td>").text(departMinutes)
  );

  $("#trainTable").append(trainRow);
});