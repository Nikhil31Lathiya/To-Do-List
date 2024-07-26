let calendarData = [];

function readAll() {
  var tableData = document.querySelector(".data_table");
  var elements = "";

  calendarData.map((record) => {
    const isChecked = record.completed ? "checked" : "";
    const isCompletedClass = record.completed ? "completed" : "";

    elements += `<tr class="${isCompletedClass}">
        <td> <input type="checkbox" id="checkbox-${record.id}" onclick="toggleCompletion(${record.id})" ${isChecked}/> </td>
        <td>${record.task}</td>
        <td>${record.details}</td>
        <td style="width:15%; text-align:center;">
          <button onclick="editData(${record.id})" class="submit">Edit</button>
        </td>
        <td style="width:15%; text-align:center;">
          <button onclick="deleteData(${record.id})" class="clear">Delete</button>
        </td>
      </tr>`;
  });

  tableData.innerHTML = elements;
}

document.addEventListener("DOMContentLoaded", function () {
  let storedCalendarData = localStorage.getItem("calendarObject");
  if (storedCalendarData) {
    calendarData = JSON.parse(storedCalendarData);
  }
  readAll();
  clearTextBoxes();
});

let editMode = false;
let editedItemId = null;

function create() {
  let task = document.getElementById("name").value;

  if (task === "") {
    alert("Please Enter Your Calendar Task");
  } else {
    var details = document.getElementById("details").value;

    if (editMode) {
      var editedObj = calendarData.find((rec) => rec.id === editedItemId);
      editedObj.task = task;
      editedObj.details = details;
      editMode = false;
      editedItemId = null;
    } else {
      var newObj = {
        id: calendarData.length + 1,
        task: task,
        details: details,
        completed: false,
      };
      calendarData.push(newObj);
    }

    localStorage.setItem("calendarObject", JSON.stringify(calendarData));

    readAll();

    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
  }
}

function toggleCompletion(id) {
  const obj = calendarData.find((rec) => rec.id === id);
  obj.completed = !obj.completed;

  localStorage.setItem("calendarObject", JSON.stringify(calendarData));

  readAll();
}

function editData(id) {
  var obj = calendarData.find((rec) => rec.id === id);
  editMode = true;
  editedItemId = id;
  document.getElementById("name").value = obj.task;
  document.getElementById("details").value = obj.details;
}

function deleteData(id) {
  const index = calendarData.findIndex((rec) => rec.id === id);

  if (index !== -1) {
    calendarData.splice(index, 1);

    localStorage.setItem("calendarObject", JSON.stringify(calendarData));

    readAll();
    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
  }
}

function clearTextBoxes() {
  document.getElementById("name").value = "";
  document.getElementById("details").value = "";
}
