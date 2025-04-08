//Importations des fonctions et constructeurs
import carrousel from "../js/components/carrousel.js";
import boiteModale from "../js/components/boiteModale.js";
import navigation from "../js/components/navigation.js";

function init() {
  carrousel();
  navigation();

  setTimeout(function () {
    boiteModale(document.body, "Grosse notification!");
  }, 5000); // Délai de 5 secondes sur la boite modale
}

//Execution
init();
