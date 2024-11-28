const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

// add item on submit
const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  //validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // create item DOM element
  addItemToDOM(newItem);

  // add item to local storage
  addItemToStorage(newItem);
  checkUI();
  itemInput.value = "";
};

function addItemToDOM(item) {
  // create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // add li to the DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  // add new item to array
  itemsFromStorage.push(item);

  // conver to json string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// remove item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

//clear all items
function clearItems(e) {
  //   const li = document.getElementById("li");
  //   itemList.remove(li);
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearButton.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    clearButton.style.display = "block";
  }
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Event Listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI();
