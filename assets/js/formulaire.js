let indexSectionActuelle = 0;

const formulaireHTML = document.querySelector("form");
const champsHTML = formulaireHTML.querySelectorAll("[name]");
const sectionResume = formulaireHTML.querySelector(".resume");
const sectionsHTML = formulaireHTML.querySelectorAll("[data-page]");
const livraisonMagasin = formulaireHTML.querySelector(
  "[name='livraison-magasin']"
);

const succursale = document.getElementById("succursale");

//console.log(sectionsHTML[indexSectionActuelle]);
const dateHTML = formulaireHTML.querySelector("[name='date-aller']");
const boutonSuivantHTML = formulaireHTML.querySelector(
  ".form-navigation [data-direction='1']"
);
const boutonRetourHTML = formulaireHTML.querySelector(
  ".form-navigation [data-direction='-1']"
);
const boutonEnvoi = formulaireHTML.querySelector("input[type='submit']");

function init() {
  afficherSection(indexSectionActuelle);
  afficherNavigation();
  boutonSuivantHTML.addEventListener("click", onClicNavigation);
  boutonRetourHTML.addEventListener("click", onClicNavigation);
  boutonEnvoi.addEventListener("click", onEnvoiFormulaire);
  formulaireHTML.addEventListener("submit", onEnvoiFormulaire);
  champsHTML.forEach(function (champHTML) {
    champHTML.addEventListener("change", onChangementChamp);
    //Au besoin on récupère le champ et on met des valeurs par défaut
  });
  livraisonMagasin.addEventListener("change", basculerSuccursale);
}

//===========================================
// Événements
//===========================================
function basculerSuccursale(evenement) {
  const declencheur = evenement.currentTarget;
  if (declencheur.checked) {
    succursale.classList.add("inactif");
  } else {
    succursale.classList.remove("inactif");
  }
}

function onEnvoiFormulaire(evenement) {
  evenement.preventDefault();

  if (validerFormulaire()) {
    //Envoyer le formulaire
    console.log("Le formulaire a été envoyé");
    // formulaireHTML.submit();
  }
}

function onChangementChamp(evenement) {
  const declencheur = evenement.currentTarget;
  // On récupère le champ, son nom et sa valeur

  // Si le champ comporte des particularités, on appelle les fonctions en conséquence
  // Ex: activer/désactiver un autre champ, afficher une boite modale, etc
  //On valide le champ (affiche les erreurs au besoin)
  validerChamp(declencheur);
  //On valide le formulaire (active le bouton submit)
  validerFormulaire();
  //On mets à jour la navigation de la section
  validerSection(indexSectionActuelle);
}

function onClicNavigation(evenement) {
  //On récupère le bouton
  const declencheur = evenement.currentTarget;
  //On s'assure que la direction est un nombre
  if (Number(declencheur.dataset.direction)) {
    indexSectionActuelle += Number(declencheur.dataset.direction);
    afficherSection(indexSectionActuelle);
    afficherNavigation();
    console.log(indexSectionActuelle);
  }

  //On met à jour la section
  //On s'assure de ne pas dépasser 0 ou le max de sections
  //On met à jour la section
}

//===========================================
// NAVIGATION
//===========================================
function cacherSections() {
  //On boucle et on ajoute une classe sur chaque élément
  sectionsHTML.forEach(function (section) {
    section.classList.add("invisible");
  });
}

function afficherSection(indexSection) {
  //On cache les sections
  cacherSections();
  //On affiche la section courante
  sectionsHTML[indexSection].classList.remove("invisible");
  //On met a jour la navigation
}

function afficherNavigation() {
  // Si on est au début on bloque le premier bouton
  if (indexSectionActuelle == 0) {
    boutonRetourHTML.classList.add("inactif");
    boutonSuivantHTML.classList.add("inactif");
  }

  if (indexSectionActuelle == 1) {
    boutonRetourHTML.classList.remove("inactif");
  }
  // Si on est à la fin on affiche le bouton submit et on cache le bouton suivant
  if (indexSectionActuelle == 2) {
    boutonSuivantHTML.classList.add("invisible");
    boutonEnvoi.classList.remove("invisible");
  }
  if (indexSectionActuelle != 2) {
    boutonEnvoi.classList.add("invisible");
    boutonSuivantHTML.classList.remove("invisible");
  }
  // Si la section est invalide on bloque le bouton suivant
}

//===========================================
// VALIDATION
//===========================================
function validerChamp(champHTML) {
  if (indexSectionActuelle != 0) return;
  let messageErreur = champHTML.nextElementSibling;

  champHTML.classList.remove("invisible");
  if (champHTML.value.length == 0) {
    champHTML.setCustomValidity("Le champ ne peut pas être vide");
  } else if (
    champHTML.name == "email" &&
    champHTML.value.endsWith("cmaisonneuve.qc.ca") == false
  ) {
    champHTML.setCustomValidity(
      "Le champ doit terminer par cmaisonneuve.qc.ca"
    );
  } else if (champHTML.name == "date") {
    console.log(champHTML.value);
  } else {
    champHTML.setCustomValidity("");
  }

  //On vérifie si le champ est valide
  // const estValide = champHTML.reportValidity(); //Affiche automatiquement le message
  const estValide = champHTML.checkValidity();

  //on change le résumé si le champ est valide sinon on enlève l'info
  //TODO:

  //On affiche les erreurs au besoin
  console.log(champHTML.validity, "validity");
  if (!estValide) {
    messageErreur.innerText = champHTML.validationMessage;
    messageErreur.classList.remove("invisible");
  } else {
    modifierResume(champHTML, estValide);
    messageErreur.classList.add("invisible");
  }
}

function validerSection(indexSection) {
  // On récupère la section et les champs dans celle-ci
  const sectionHTML = sectionsHTML[indexSection];
  const champsDansSection = sectionHTML.querySelectorAll("[name]");

  const tableauValidation = [];

  for (let i = 0; i < champsDansSection.length; i++) {
    const element = champsDansSection[i];
    tableauValidation.push(element.checkValidity());
  }

  const estInvalide = tableauValidation.includes(false);
  boutonSuivantHTML.classList.toggle("inactif", estInvalide == true);
  //Si au moins un des champs de la section n'est pas valide, on retourne false
  // Sinonon retour true
}

function validerFormulaire() {
  const estValide = formulaireHTML.checkValidity();

  if (estValide == false) {
    //On désactive le bouton submit
    boutonEnvoi.disabled = "true";
  } else {
    //On active le bouton submit
    boutonEnvoi.removeAttribute("disabled");
  }

  return estValide;
}

//===========================================
// AFFICHAGE RÉSUMÉ
//===========================================
function modifierResume(champHTML, estValide) {
  if (!estValide) return;
  const spanResume = document.getElementById(
    `resume-${champHTML.getAttribute("name")}`
  );
  if (!spanResume) return;
  spanResume.innerText = champHTML.value;
  console.log(champHTML.value);
}

//Exécution
init();
