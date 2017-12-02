// IMPORT LES COMPOSANTS (comme navbar ou bouton)
import * as composant_name from '../components/composant_name';

export default {
  init() { // JS déclanché en premier
    // Appel des fonctions provenant des composants
    composant_name.YOUR_FUNCTION_NAME();
    // Code perso
    console.log('Je suis dans la Homepage');
  },
  finalize() {
    // JS déclanché après le JS du init()
  },
};
