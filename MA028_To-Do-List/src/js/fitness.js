let fitnessData = [];

function readAll() {
  var tableData = document.querySelector(".data_table");
  var elements = "";

  fitnessData.map((record) => {
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
  let storedFitnessData = localStorage.getItem("fitnessObject");
  if (storedFitnessData) {
    fitnessData = JSON.parse(storedFitnessData);
  }
  readAll();
  clearTextBoxes();
});

let editMode = false;
let editedItemId = null;

function create() {
  let name = document.getElementById("name").value;

  if (name === "") {
    alert("Please Enter Your Fitness Task");
  } else {
    var task = document.getElementById("name").value;
    var details = document.getElementById("details").value;

    if (editMode) {
      var editedObj = fitnessData.find((rec) => rec.id === editedItemId);
      editedObj.task = task;
      editedObj.details = details;
      editMode = false;
      editedItemId = null;
    } else {
      var newObj = {
        id: fitnessData.length + 1,
        task: task,
        details: details,
        completed: false,
      };
      fitnessData.push(newObj);
    }

    localStorage.setItem("fitnessObject", JSON.stringify(fitnessData));

    readAll();

    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
  }
}

function toggleCompletion(id) {
  const obj = fitnessData.find((rec) => rec.id === id);
  obj.completed = !obj.completed;

  localStorage.setItem("fitnessObject", JSON.stringify(fitnessData));

  readAll();
}

function editData(id) {
  var obj = fitnessData.find((rec) => rec.id === id);
  editMode = true;
  editedItemId = id;
  document.getElementById("name").value = obj.task;
  document.getElementById("details").value = obj.details;
}

function deleteData(id) {
  const index = fitnessData.findIndex((rec) => rec.id === id);

  if (index !== -1) {
    fitnessData.splice(index, 1);

    localStorage.setItem("fitnessObject", JSON.stringify(fitnessData));

    readAll();

    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
  }
}

function clearTextBoxes() {
  document.getElementById("name").value = "";
  document.getElementById("details").value = "";
}
