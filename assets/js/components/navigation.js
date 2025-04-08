import modeSombre from "./modeSombre.js";

// Tableau contenant les liens de la nav
//Text contient ce qui s'affiche sur le HTML et href le lien de la page

const lienNav = [
  { text: "Accueil", href: "index.html" },
  { text: "À propos", href: "apropos.html" },
  { text: "Contact", href: "contact.html" },
];

export default function init() {
  try {
    modeSombre();
    genererNavigation();
  } catch (erreur) {
    console.log(erreur);
  }
}

// Fonction pour générer la nav
function genererNavigation() {
  const navListe = document.querySelector(".nav__liste");
  let navHTML = "";

  /*=================================================================================
    Eu besoin de l'aide de IA pour cette ligne, je n'ai pas trouvé par moi-même :(
    =================================================================================*/
  const pageActuel = window.location.pathname.split("/").pop();

  // On génère les liens dynamiquement avec un template
  lienNav.forEach((lien) => {
    let classeActive = "";

    // Si le lien est égal à la page actuel, on donne la classe active où ${classeActive} est écris. La classe active contient le CSS pour un style "actif" dans le fichier styles.css
    if (lien.href === pageActuel) {
      classeActive = "active";
    }

    navHTML += `<li><a href="${lien.href}" class="nav-lien ${classeActive}">${lien.text}</a></li>`;
  });

  // Insert le HTML
  navListe.insertAdjacentHTML("beforeend", navHTML);
}
