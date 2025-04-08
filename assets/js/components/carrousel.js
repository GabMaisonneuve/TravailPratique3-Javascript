//Variables Globales
let indexImageCarrousel = 0;
let carrouselInterval;

//Selection HTML

//Variables HTML

//Selecteurs carrousel
//===================================================================
const carrouselConteneurHTML = document.querySelector(".carrousel");
const imagesCarrouselHTML = carrouselConteneurHTML.querySelectorAll(
  ".carrousel__image-conteneur"
);
const boutonsNavCarrouselHTML =
  carrouselConteneurHTML.querySelectorAll("[data-direction]");
//===================================================================

//Fonctions
export default function init() {
  for (let i = 0; i < boutonsNavCarrouselHTML.length; i++) {
    const bouton = boutonsNavCarrouselHTML[i];
    bouton.addEventListener("click", clicNavigationCarrousel);
  }

  afficherImageCarrousel(indexImageCarrousel);
  carrouselInterval = setInterval(incrementerCarrousel, 3000); // Start the interval and store the reference
}

function clicNavigationCarrousel(evenement) {
  const declencheur = evenement.currentTarget;
  const direction = Number(declencheur.dataset.direction);
  indexImageCarrousel += direction;
  if (indexImageCarrousel < 0) {
    indexImageCarrousel = imagesCarrouselHTML.length - 1;
  }

  if (indexImageCarrousel >= imagesCarrouselHTML.length) {
    indexImageCarrousel = 0;
  }

  afficherImageCarrousel(indexImageCarrousel);

  clearInterval(carrouselInterval);
  //On recommence l'interval si on clique manuellement pour défiler le carrousel
  carrouselInterval = setInterval(incrementerCarrousel, 3000);
}

//Faire afficher l'image qui est l'index courant, une à la fois
function afficherImageCarrousel(indexImageCarrousel) {
  for (let i = 0; i < imagesCarrouselHTML.length; i++) {
    const image = imagesCarrouselHTML[i];

    image.classList.toggle("invisible", indexImageCarrousel !== i);
  }

  //Variable pour animer dynamiquement l'image courante qu'on utilise dans anime
  const imagePresente = imagesCarrouselHTML[indexImageCarrousel];
  anime({
    targets: imagePresente,
    opacity: [0.9, 1],
    translateX: [-20, 0],
    easing: "easeOutQuad",
    duration: 2000, // 2 Secondes
  });
}

function incrementerCarrousel() {
  //Incrémentation de l'index chaque utilisation de la fonction
  indexImageCarrousel++;

  //On ne dépasse jamais la longueur du tableau
  if (indexImageCarrousel >= imagesCarrouselHTML.length) {
    indexImageCarrousel = 0;
  }

  //On s'assure de montrer l'image
  afficherImageCarrousel(indexImageCarrousel);
}
