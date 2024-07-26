let shoppingData = [];

function readAll() {
  var tableData = document.querySelector(".data_table");
  var elements = "";

  shoppingData.map((record) => {
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
  let storedShoppingData = localStorage.getItem("shoppingObject");
  if (storedShoppingData) {
    shoppingData = JSON.parse(storedShoppingData);
  }
  readAll();
  clearTextBoxes();
});

let editMode = false;
let editedItemId = null;

function create() {
  let task = document.getElementById("name").value;

  if (task === "") {
    alert("Please Enter Your Shopping Task");
  } else {
    var details = document.getElementById("details").value;

    if (editMode) {
      var editedObj = shoppingData.find((rec) => rec.id === editedItemId);
      editedObj.task = task;
      editedObj.details = details;
      editMode = false;
      editedItemId = null;
    } else {
      var newObj = {
        id: shoppingData.length + 1,
        task: task,
        details: details,
        completed: false,
      };
      shoppingData.push(newObj);
    }

    localStorage.setItem("shoppingObject", JSON.stringify(shoppingData));

    readAll();

    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
  }
}

function toggleCompletion(id) {
  const obj = shoppingData.find((rec) => rec.id === id);
  obj.completed = !obj.completed;

  localStorage.setItem("shoppingObject", JSON.stringify(shoppingData));

  readAll();
}

function editData(id) {
  var obj = shoppingData.find((rec) => rec.id === id);
  editMode = true;
  editedItemId = id;
  document.getElementById("name").value = obj.task;
  document.getElementById("details").value = obj.details;
}

function deleteData(id) {
  const index = shoppingData.findIndex((rec) => rec.id === id);

  if (index !== -1) {
    shoppingData.splice(index, 1);

    localStorage.setItem("shoppingObject", JSON.stringify(shoppingData));

    readAll();
    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
  }
}

function clearTextBoxes() {
  document.getElementById("name").value = "";
  document.getElementById("details").value = "";
}
