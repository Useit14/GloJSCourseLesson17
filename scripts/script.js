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

  sayMeow() {
    console.log("Meow");
  }

  delete(index) {
    const newEssences = essences.filter((value, ind, arr) => {
      return index != ind;
    });
    localStorage.setItem("essences", JSON.stringify(newEssences));
  }
}

class Tiger extends Feline {
  constructor(
    kind,
    abilityNight,
    tail,
    abilityHear,
    nightWayOfLife,
    domain,
    kingdom,
    skills
  ) {
    super(
      kind,
      abilityNight,
      tail,
      abilityHear,
      nightWayOfLife,
      domain,
      kingdom,
      skills
    );
    super.genus = "Panthers";
    super.teeth = 30;
    super.kind = kind;
    super.abilityNight = abilityNight;
    super.skillsArr = "creeping";
  }
}

class Cougar extends Feline {
  constructor(
    kind,
    abilityNight,
    tail,
    abilityHear,
    nightWayOfLife,
    domain,
    kingdom,
    skills
  ) {
    super(
      kind,
      abilityNight,
      tail,
      abilityHear,
      nightWayOfLife,
      domain,
      kingdom,
      skills
    );
    super.food = "deer";
    super.genus = "Cougars";
    super.kind = kind;
    super.abilityNight = abilityNight;
    super.skillsArr = "climbs";
  }
}

const initClass = (essences) => {
  essences.forEach((essence, index) => {
    essences[index] =
      essence.genus === "Panthers"
        ? new Tiger(
            essence.kind,
            essence.abilityNight,
            essence.genus,
            essence.food
          )
        : new Cougar(
            essence.kind,
            essence.abilityNight,
            essence.genus,
            essence.food
          );
  });
};

const addClass = (e) => {
  e.preventDefault();
  const selectedIndex = select.options.selectedIndex;
  const selectedElem = select.options[selectedIndex].value;
  let kind = "";
  let abilityNight = false;
  let obj;
  inputs.forEach((input) => {
    if (input.type != "checkbox") {
      kind = input.value;
    } else {
      abilityNight = input.checked;
    }
  });
  switch (selectedElem) {
    case "tiger":
      obj = new Tiger(kind, abilityNight);
      break;
    case "cougar":
      obj = new Cougar(kind, abilityNight);
      break;
  }

  essences.push(obj);
  localStorage.setItem("essences", JSON.stringify(essences));
};

const insertIntoTable = () => {
  if (JSON.parse(localStorage.getItem("essences"))) {
    essences = JSON.parse(localStorage.getItem("essences"));
    initClass(essences);
    const tbody = table.querySelector("tbody");
    const theadTd = table.querySelector("thead").querySelectorAll("td");
    tbody.innerHTML = "";
    essences.forEach((essence, index) => {
      const tr = document.createElement("tr");
      theadTd.forEach((td) => {
        if (essence[td.textContent] !== undefined) {
          tr.innerHTML += `<td>${essence[td.textContent]}</td>`;
        } else {
          tr.innerHTML += `<td>-</td>`;
        }
      });
      const button = document.createElement("button");
      button.textContent = "Delete";
      button.addEventListener("click", () => {
        essence.delete(index);
        insertIntoTable();
      });
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
