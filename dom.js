let body = document.querySelector(".body");

let box = document.querySelector(".box");

let dark = document.querySelector(".dark");
let light = document.querySelector(".light");

let statusSearch = document.querySelector(".statusSearch");
let inpSearch = document.querySelector(".inpSearch");
let btnNewUser = document.querySelector(".btnNewUser");
let btnSort = document.querySelector(".btnSort");

let addDialog = document.querySelector(".addDialog");
let addForm = document.querySelector(".addForm");

let editDialog = document.querySelector(".editDialog");
let editForm = document.querySelector(".editForm");

let infoDialog = document.querySelector(".infoDialog");
let infoName = document.querySelector(".infoName");
let infoAge = document.querySelector(".infoAge");
let infoStatus = document.querySelector(".infoStatus");
let infoId = document.querySelector(".infoId");
let infoImage = document.querySelector(".infoImage");

let btneditClose = document.querySelector(".btneditClose");
let btnaddClose = document.querySelector(".btnaddClose");
let btninfoClose = document.querySelector(".btninfoClose");

let idx = null;

btnNewUser.onclick = () => {
  addDialog.showModal();
};
btnaddClose.onclick = () => {
  addDialog.close();
};
btneditClose.onclick = () => {
  editDialog.close();
};
btninfoClose.onclick = () => {
  infoDialog.close();
};

// localStorage
let data = JSON.parse(localStorage.getItem("data")) || [
  {
    name: "Diyorbek",
    age: "22",
    id: "4",
    status: false,
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740",
  },
  {
    name: "Alijon",
    age: "30",
    id: "1",
    status: true,
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740",
  },
  {
    name: "Zaynab",
    age: "25",
    id: "2",
    status: false,
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740",
  },
  {
    name: "Anvar",
    age: "28",
    id: "3",
    status: true,
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740",
  },
];

let darkMode = localStorage.getItem("theme") || "white";
let fontColor = localStorage.getItem("fontColor") || "black";
body.style.backgroundColor = darkMode;
body.style.color = fontColor;

//dark button
dark.onclick = () => {
  localStorage.setItem("theme", "black");
  let darkMode = localStorage.getItem("theme");
  body.style.backgroundColor = darkMode;

  localStorage.setItem("fontColor", "white");
  let fontColor = localStorage.getItem("fontColor");
  body.style.color = fontColor;
};

//light button
light.onclick = () => {
  localStorage.setItem("theme", "white");
  let darkMode = localStorage.getItem("theme");
  body.style.backgroundColor = darkMode;

  localStorage.setItem("fontColor", "black");
  let fontColor = localStorage.getItem("fontColor");
  body.style.color = fontColor;
};

//inpSearch
inpSearch.oninput = () => {
  let filterData = data;
  filterData = filterData.filter((e) =>
    e.name.toLowerCase().includes(inpSearch.value.toLowerCase())
  );
  getData(filterData);
};

//status Search
statusSearch.onchange = () => {
  if (statusSearch.value == "all") {
    getData(data);
  } else {
    let filterData = data;
    filterData = filterData.filter((e) =>
      e.status.toString().includes(statusSearch.value == "active")
    );
    getData(filterData);
  }
};

//add post
addForm.onsubmit = (event) => {
  event.preventDefault();
  let newUser = {
    image: event.target["addImage"].value,
    name: event.target["addName"].value,
    age: event.target["addAge"].value,
    status: event.target["addStatus"].value == "active",
    id: Date.now().toString(),
  };
  data.push(newUser);
  localStorage.setItem("data", JSON.stringify(data));
  getData(data);
  addDialog.close();
};

//edit put
editForm.onsubmit = (event) => {
  event.preventDefault();
  data = data.map((e) => {
    if (e.id == idx) {
      return {
        ...e,
        image: event.target["editImage"].value,
        name: event.target["editName"].value,
        age: event.target["editAge"].value,
        status: event.target["editStatus"].value == "active",
      };
    }
    return e;
  });
  localStorage.setItem("data", JSON.stringify(data));
  getData(data);
  editDialog.close();
};

//check
function changeStatus(id) {
  data = data.map((e) => {
    if (e.id == id) {
      return {
        ...e,
        status: !e.status,
      };
    }
    return e;
  });
  localStorage.setItem("data", JSON.stringify(data));
  getData(data);
}

//delete
function deleteUser(id) {
  data = data.filter((e) => e.id != id);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  getData(data);
}

//sort
btnSort.onclick = () => {
  data = data.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem("data", JSON.stringify(data));
  getData(data);
};

//get
function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("div");

    let h2Name = document.createElement("h2");
    h2Name.innerHTML = e.name;

    let pAge = document.createElement("p");
    pAge.innerHTML = e.age;

    let pStatus = document.createElement("p");
    pStatus.innerHTML = e.status ? "active" : "inactive";

    let image = document.createElement("img");
    image.src = e.image;
    image.style.width = "100%"

    let btndele = document.createElement("button");
    btndele.innerHTML = "delete";
    btndele.onclick = () => {
      deleteUser(e.id);
    };

    let btninfo = document.createElement("button");
    btninfo.innerHTML = "info";
    btninfo.onclick = () => {
      infoDialog.showModal();
      infoName.innerHTML = `name: ${e.name}`;
      infoAge.innerHTML = `age: ${e.age}`;
      infoStatus.innerHTML = `status: ${e.status}`;
      infoId.innerHTML = `id: ${e.id}`;
    };

    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = e.status;
    check.onclick = () => {
      changeStatus(e.id);
    };

    let btnedit = document.createElement("button");
    btnedit.innerHTML = "edit";
    btnedit.onclick = () => {
      editDialog.showModal();
      editForm["editImage"].value = e.image;
      editForm["editName"].value = e.name;
      editForm["editAge"].value = e.age;
      editForm["editStatus"].value = e.status ? "active" : "inactive";
      idx = e.id;
    };

    body;

    div.append(image, h2Name, pAge, pStatus, btndele, btnedit, btninfo, check);
    box.append(div);
  });
}
getData(data);
