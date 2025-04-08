const conteneurHTML = document.querySelector("[data-mode]");
let boutonsHTML;
if (conteneurHTML != null) {
  boutonsHTML = conteneurHTML.querySelectorAll("[data-mode-option]");
} else {
  console.log("Problème de sélection");
}
/**
 * Initialise le mode nuit et ajoute un gestionnaire d'événements aux boutons de mode.
 */
export default function init() {
  if (conteneurHTML != null) {
    conteneurHTML.addEventListener("click", onClicBouton);
    afficherModeNuit();
  }
}

/**
 * Gère le clic sur un bouton de changement de mode et applique l'option choisie.
 *
 * @param {Event} evenement - L'événement de clic déclenché sur le document.
 */
function onClicBouton(evenement) {
  const bouton = evenement.target.closest("[data-mode-option]");

  if (bouton) {
    const option = bouton.dataset.modeOption;
    changerModeNuit(option);
  }
}

/**
 * Affiche le mode nuit en appliquant le thème stocké dans le localStorage.
 * Si aucune valeur n'est enregistrée, le mode par défaut est "jour".
 */
function afficherModeNuit() {
  const option = localStorage.getItem("patate") || "jour";
  document.body.dataset.theme = option;
  changerBoutons();
}

/**
 * Change le mode nuit et enregistre la préférence dans le localStorage.
 *
 * @param {string} option - L'option choisie pour le mode (ex: "nuit" ou "jour").
 */
function changerModeNuit(option) {
  localStorage.setItem("patate", option);
  afficherModeNuit();
}

/**
 * Met à jour l'affichage des boutons de mode en fonction de l'option active.
 * Cache le bouton correspondant au mode actuellement appliqué.
 */
function changerBoutons() {
  boutonsHTML.forEach(function (boutonHTML) {
    const optionChoisie = localStorage.getItem("patate") || "nuit";
    const optionBouton = boutonHTML.dataset.modeOption;
    boutonHTML.classList.toggle("invisible", optionBouton == optionChoisie);
  });
}
