const inputs = document.querySelectorAll("input");
const formSubmit = document.querySelector(".form");
const regitrationBtn = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const overlayBtn = document.querySelector(".overlay-btn");
// kreiranje errors objekta unutak kojeg kao keys postavljamo vrijednosti iz input atributa pod imenom name kako bi u njihove values upisali pripadajuce greske 
const errors = {
  ime_prezime: [],
  telefon: [],
  adresa_stanovanja: [],
  kucni_broj: [],
  postanski_broj: [],
  mjesto: [],
  email_adresa: [],
  posebne_napomene: [],
};

// prolazak petljom kroz inpute i izvlacenje vrijednosti poput atributa pod imenom name i vrijednosti upisane za svaki input.
inputs.forEach((element) => {
  element.addEventListener("input", (e) => {
    let currentInput = e.target;
    let inputValue = currentInput.value;
    let inputName = currentInput.getAttribute("name");

    // da bi izbjegli ispisivanje jedne greske vise puta potrebno je da prodjemo kroz objekat errors i za svaki key kao pripadajucu vrijednost postavimo przan array.
    errors[inputName] = [];


  //   postavljanje uslova za validaciju. U slucaju da imamo minimalno jedan karakter za input prelazimo na sledeci uslov. Ukoliko nemamo minimalno jedan karakter u objekat errors za svaki pripadajuci key upisujemo gresku sadrzaja po zelji. Errors objekat je globalna varijabla i moguce joj je pristupiti u svim funkcijama.
    if (inputValue.length > 0) {
      switch (inputName) {  
        case "ime_prezime":
          let validation = inputValue.trim();
          validation = validation.split(" ");
          if (validation.length < 2) {
            errors[inputName].push("Upisite u polje i ime i prezime");
          }
          break;
        case "telefon":
          if (inputValue.length < 9) {
            errors[inputName].push(
              "molimo vas upisite minimalno 9 cifara za broj telefona "
            );
          }
          break;
        case "email_adresa":
          if (inputValue.includes("@") && inputValue.includes(".")) {
            let pozicijaAt = inputValue.indexOf("@");
            let pozicijaTacka = inputValue.indexOf(".");
            let izmedjuAtITacka = inputValue.substring(
              pozicijaAt + 1,
              pozicijaTacka
            );
            if (izmedjuAtITacka.length > 1) {
              let prijeAt = inputValue.substring(0, pozicijaAt);
              let posijeTacka = inputValue.substring(
                pozicijaTacka + 1,
                inputValue.length
              );
              if (prijeAt.length > 2 && posijeTacka.length > 1) {
              } else {
                errors[inputName].push("Nesipravna email adresa");
              }
            } else {
              errors[inputName].push("Nesipravna email adresa");
            }
          } else {
            errors[inputName].push("Nesipravna email adresa");
          }
          break;
        case "postanski_broj":
          if (inputValue.length === 5) {
          } else {
            errors[inputName].push("Polje za postanski broj mora imati 5 cifara");
          }
      }
    } else {
      errors[inputName].push("Svako polje mora sadrzati minimalno jedan karaker");
    }
    //  izvlacanje gresaka iz objekta errors(ukoliko ih ima) i popunjavanje liste za svaki pripadajuci input
    populateErrors();
  });
});

function populateErrors() {
  // prije svakog novog upisivanja nekih vrijednosti  u input potrebno je petljom proci kroz ul element i izbrisati ga potpuno kako se iste greske ne bi ponavljale i prikazivale na UI.
  for (let element of document.querySelectorAll("ul")) {
    element.remove();
  }
  // pomocu petlje uzeti keys vrijdnosti iz objekta errors, a zatim ih iskoristiti za upravljanje input elementom.
  // nakon sto dodjemo do input DOM elementa uzimamo njegov parentElement, kreiramo novi element pod nazivom UL, a zatim novokreirani element pridodajemo roditelj elementu od inputa. 
  for (let key of Object.keys(errors)) {
    const input = document.querySelector(`input[name="${key}"]`);

    let parentElement = input.parentElement;
    let createUl = document.createElement("ul");
    parentElement.append(createUl);

    //   prolazak kroz svaki pojedinacan array u errors objektu, kreiranje novog elementa (li), upisivanje gresaka u novi element (ukoliko ih ima), te njegovo pridodavanje na UL element.
    errors[key].forEach((error) => {
      let createLi = document.createElement("li");
      createLi.innerText = error;
      createUl.append(createLi);
    });
  }
}
//   provjera validacije oznacava nepostojanje sadrzaja u errors objektu.  
function validationPassed() {
  for (let key of Object.keys(errors)) {
    if (errors[key].length > 0) {
      return false;
    }
  }
  return true;
}
 
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
 
  if (validationPassed()) {
    regitrationBtn.addEventListener("click", () => {
      overlay.style.display = "block";
      console.log("korisnik se uspjesno registrovao");
    });
  } else {
   document.querySelector(".overlayError").style.display = "block"
  }
});


overlayBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  window.location.href = "/"
});


document.querySelector(".overlay-error-btn").addEventListener("click", () => {
  document.querySelector(".overlayError").style.display = "none";
});