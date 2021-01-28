// Heading
var heading = document.createElement("h1");
heading.innerHTML = "Student data. <span>(1-10 out of 100)";
heading.style.textAlign = "center";
document.body.append(heading);

//table
var table = document.createElement("table");
var thead = document.createElement("thead");
var tbody = document.createElement("tbody");
thead.innerHTML = "<tr><th>ID</th><th>NAME</th><th>EMAIL</th></tr>";
table.append(thead);
table.style.margin = "10px auto";
document.body.append(table);
table.append(tbody);
for (let i = 0; i < 10; i++) {
  var row = document.createElement("tr");
  row.innerHTML = "<td>-</td><td>-</td><td>-</td>";
  tbody.append(row);
}

//pagination buttons
var pagination = document.createElement("ul");
document.body.append(pagination);
var buttonArray = ["First", "Previous", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Next", "Last"];
for (let i = 0; i < buttonArray.length; i++) {
  var button = document.createElement("li");
  button.innerText = buttonArray[i];
  if (i != 0 && i != 1 && i != 12 && i != 13)
    button.className = "pgnos";
  pagination.append(button);
}

//populate data
function populate(e) {
  var request = new XMLHttpRequest();
  request.open("GET", "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json")
  request.onload = function () {
    var data = JSON.parse(this.response);
    var buttons = document.querySelectorAll("li");
    var currentActive = 0;
    for (let i = 2; i < buttons.length - 2; i++) {
      if (buttons[i].classList.contains("active"))
        currentActive = i;
      buttons[i].classList.remove("active");
    }
    var count = +e.target.innerText;
    if (!isNaN(count))
      e.target.classList.add("active");
    var heading = document.querySelector("h1");
    if (isNaN(count)) {
      if (e.target.innerText == "First") {
        count = 1;
        buttons[2].classList.add("active");
      }
      if (e.target.innerText == "Last") {
        count = 10;
        buttons[11].classList.add("active");
      }
      if (e.target.innerText == "Previous") {
        if (currentActive != 2) {
          buttons[currentActive - 1].classList.add("active");
          count = currentActive - 2;
        }
        else {
          buttons[2].classList.add("active");
          count = 1;
        }
      }
      if (e.target.innerText == "Next") {
        if (currentActive != 11) {
          buttons[currentActive + 1].classList.add("active");
          count = currentActive;
        }
        else {
          count = 10;
          buttons[11].classList.add("active");
        }
      }
    }
    heading.innerHTML = `Student data. <span>(${(count - 1) * 10 + 1}-${count * 10} out of 100)`;
    var rows = document.querySelectorAll("tbody tr");
    var j = 0;
    for (let i = (count - 1) * 10; i < count * 10; i++) {
      rows[j].innerHTML = `<td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td>`;
      j++;
    }
  }
  request.send();
}

pagination.addEventListener("click", populate);
document.querySelector("li:nth-of-type(3)").classList.add("active");
document.querySelector("li:nth-of-type(3)").click();