/**
 * Initialise et insère un message dans un conteneur HTML avec un type par défaut.
 *
 * @param {HTMLElement} conteneurHTML - L'élément HTML dans lequel insérer le message.
 * @param {string} message - Le message à afficher dans la boîte modale.
 * @param {string} [type="SUCCESS"] - Le type du message (ex: "SUCCESS", "ERROR", "INFO"). Valeur par défaut : "SUCCESS".
 */
export default function init(conteneurHTML, message, type = "SUCCESS") {
  genererHTML(conteneurHTML, message, type);
}

//Fonctions d'évenement de clique, ici on veut viser la boîte
/**
 *
 * @param {Event} evenement
 */
function onClicBoite(evenement) {
  let boiteHTML = evenement.currentTarget;
  supprimerBoiteModale(boiteHTML);
}

//Fonctions qui génère la boîte et son contenu
/**
 * 
 @param {HTMLElement} conteneurHTML - L'élément HTML dans lequel insérer le message.
 * @param {string} message - Le message à afficher dans la boîte modale.
 * @param {string} type - Le type du message (ex: "success", "error", "info"), utilisé pour le data-type.
 */
function genererHTML(conteneurHTML, message, type) {
  //Gabarit HTML que nous insérons avec insertAdjacentHTML ou innerText etc
  let gabarit = `<div class="boite-modale" data-type="${type}"> 
  ${message}
  </div>`;
  conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

  //Le last element child est celui que nous venons juste d'ajouter
  //Donc nous ajoutons un écouteur d'évenement qui appel onClicBoite qui appel supprimerBoiteModale
  let elementAjoute = conteneurHTML.lastElementChild;
  elementAjoute.addEventListener("click", onClicBoite);
}

/**
 *
 * @param {EventTarget} boiteHTML
 */
//Fonctions que nous appelons avec un clique pour supprimer un élément
function supprimerBoiteModale(boiteHTML) {
  boiteHTML.remove();
}
