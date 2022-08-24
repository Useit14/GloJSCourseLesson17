const table = document.querySelector("#table");
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("#select");
let essences = [];

class Feline {
  constructor() {
    this.tail = "long";
    this.abilityHear = 80;
    this.nightWayOfLife = true;
    this.domain = "Eukaryotes";
    this.kingdom = "Animals";
    this.type = "Chords";
    this.skills = ["growl", "jump", "play", "meow"];
  }

  get skillsArr() {
    return this._skills;
  }

  set skillsArr(str) {
    this.skills.push(str);
  }

  sayMeow() {
    console.log("Meow");
  }

  delete() {
    essences.forEach((essence) => {
      if (essence === this) {
        essences.slice(index, 1);
      }
    });
    localStorage.setItem("essences", JSON.stringify(essences));
  }
}

class Tiger extends Feline {
  constructor(
    tail,
    abilityHear,
    nightWayOfLife,
    domain,
    kingdom,
    type,
    skills
  ) {
    super(tail, abilityHear, nightWayOfLife, domain, kingdom, type, skills);
    this.genus = "Panthers";
    this.teeth = 30;
    super.skillsArr = "creeping";
  }
}

class Cougar extends Feline {
  constructor(
    tail,
    abilityHear,
    nightWayOfLife,
    domain,
    kingdom,
    type,
    skills
  ) {
    super(tail, abilityHear, nightWayOfLife, domain, kingdom, type, skills);
    this.food = "deer";
    this.genus = "Cougars";
    super.skillsArr = "climbs";
  }
}

const addClass = (e) => {
  e.preventDefault();
  const selectedIndex = select.options.selectedIndex;
  const selectedElem = select.options[selectedIndex].value;
  let obj;
  switch (selectedElem) {
    case "tiger":
      obj = new Tiger();
      break;
    case "cougar":
      obj = new Cougar();
      break;
  }
  inputs.forEach((input) => {
    if (input.type != "checkbox") {
      obj[input.name] = input.value;
    } else {
      obj[input.name] = input.checked;
    }
  });
  essences.push(obj);
  localStorage.setItem("essences", JSON.stringify(essences));
};

const insertIntoTable = () => {
  if (JSON.parse(localStorage.getItem("essences"))) {
    essences = JSON.parse(localStorage.getItem("essences"));
    const tbody = table.querySelector("tbody");
    const theadTd = table.querySelector("thead").querySelectorAll("td");
    tbody.innerHTML = "";
    essences.forEach((essence) => {
      const tr = document.createElement("tr");
      theadTd.forEach((td) => {
        if (essence[td.textContent] !== undefined) {
          tr.innerHTML += `<td>${essence[td.textContent]}</td>`;
        } else {
          tr.innerHTML += `<td>-</td>`;
        }
      });
      const button = document.createElement("button");
      console.log(essence.sayMeow());
      // button.addEventListener("click", essence.sayMeow());
      tr.append(button);
      tbody.append(tr);
    });
  }
};

form.addEventListener("submit", (e) => {
  addClass(e);
  insertIntoTable();
});

if (JSON.parse(localStorage.getItem("essences"))) {
  insertIntoTable();
}