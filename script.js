const containerHeight = 800;
const containerWidth = 500;
const minutesinDay = 60 * 14;
let collisions = [];
let width = [];
let leftOffSet = [];

// append one event to calendar
var createEvent = (height, top, left, units, name, time, classroom) => {
  let node = document.createElement("DIV");

  if (classroom == "Računalna") {
    node.className = "event-racunalna";
  } else{
    node.className = "event-praktikum";
  }
  node.innerHTML =
  "<span class='title'> " + name + " </span> \
  <br><span class='location'>" + classroom  + "</span>\
  <br><span class='time'>" +  time + "</span>";

  // Customized CSS to position each event
  node.style.width = (containerWidth/units)-20 + "px";
  node.style.height = height + "px";
  node.style.top = 414 + top + "px";
  node.style.left = 500 + left + "px";


  document.getElementById("events").appendChild(node);
}

function addLines(){

  let node = document.createElement("svg");
  node.setAttributeNS(null, "width", 200);
  node.setAttributeNS(null, "height", 200);

  node.innerHTML =
      "<line x1=0 y1=0 x2=200 y2=200 style=stroke:rgb(255,0,0);stroke-width:2 />";
  document.getElementById("events").appendChild(node);
}

function getAttributes (events) {

  //resets storage
  width = [];
  leftOffSet = [];

  for (var i = 0; i < events.length; i++) {
    width.push(2);
    if (events[i].classRoom == "Računalna"){
      leftOffSet.push(1);
    } else {
      leftOffSet.push(2);
    }

  }

};

var layOutDay = (events) => {

// clear any existing nodes
var myNode = document.getElementById("events");
myNode.innerHTML = '';

  addLines();
  getAttributes(events);

  events.forEach((event, id) => {
    let height = (event.end - event.start) / minutesinDay * containerHeight;
    let top = ((event.start - 7*60) / 60)*56;
    let time = event.time;
    let name = event.name;
    let units = width[id];
    let classroom = event.classRoom;
    if (!units) {units = 1};
    let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
    if (!left || left < 0) {left = 10};
    createEvent(height, top, left, units, name, time, classroom);
  });
}
