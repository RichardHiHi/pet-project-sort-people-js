const display = document.querySelector(".display");
const headDisplay = document.querySelector(".header-display");
const addUser = document.querySelector(".add-user");
const doubleAgeBTN = document.querySelector(".double-age");
const filterAgeBTN = document.querySelector(".filter-user");
const sortOldestBTN = document.querySelector(".sort-oldest");
const sortYoungestBTN = document.querySelector(".sort-youngest");
const caculateTotalBTN = document.querySelector(".caculate-total");

let data = [];
getInforUse();
getInforUse();
// get name and age
async function getInforUse() {
    const data = await fetch(`https://randomuser.me/api`);
    const user = await data.json();

    const newUser = {
        name: `${user.results[0].name.title} ${user.results[0].name.last}`,
        age: user.results[0].dob.age,
    };
    addUserToData(newUser);
    upDateUser();
}

function addUserToData(obj) {
    data.push(obj);
}
//update list of users
function upDateUser(datas = data) {
    display.innerHTML =
        '<div class="header-display"><span class="header-display__name">tên</span><span class="header-display__age">tuoi</span></div>';
    datas.forEach((data) => {
        //add ul
        const element = document.createElement("UL");
        element.classList.add("body-display");
        display.appendChild(element);
        //add li
        const elementLIName = document.createElement("LI");
        elementLIName.classList.add("body-display__name");
        elementLIName.innerHTML = `${data.name}`;
        element.appendChild(elementLIName);
        //add li
        const elementLIAge = document.createElement("LI");
        elementLIAge.classList.add("body-display__age");
        elementLIAge.innerHTML = `${data.age}`;
        element.appendChild(elementLIAge);
    });
}

function doubleAge() {
    data = data.map((element) => {
        return {...element, age: element.age + 1 };
    });

    upDateUser();
}

function filterAge() {
    data = data.filter((element) => element.age > 50);
    upDateUser();
}

function sortOldest() {
    data.sort(function(a, b) {
        return a.age - b.age;
    });
    console.log(data);

    upDateUser();
}

function sortYoungest() {
    data.sort(function(a, b) {
        return b.age - a.age;
    });
    console.log(data);
    upDateUser();
}

function caculateTotal() {
    const total = data.reduce((acc, num) => acc + num.age, 0);

    const elementHead = document.createElement("div");
    elementHead.classList.add("header-display");
    display.appendChild(elementHead);

    const elementName = document.createElement("span");
    elementName.classList.add("header-display__name");
    elementName.innerHTML = `tổng là :`;
    elementHead.appendChild(elementName);

    const elementTotal = document.createElement("span");
    elementTotal.classList.add("header-display__age");
    elementTotal.innerHTML = `${total}`;
    elementHead.appendChild(elementTotal);
}

addUser.addEventListener("click", getInforUse);
doubleAgeBTN.addEventListener("click", doubleAge);
filterAgeBTN.addEventListener("click", filterAge);
sortOldestBTN.addEventListener("click", sortOldest);
sortYoungestBTN.addEventListener("click", sortYoungest);
caculateTotalBTN.addEventListener("click", caculateTotal);