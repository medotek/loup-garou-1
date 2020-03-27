# Loup Garou

Ce code reprend le jeu du loup garou pour la dernière séance de cours avec les L2 de l'UGA.
Déroulement de la séance

    - Etant donné que le serveur Discord principal n'a pas de salon pour React, je vous invite sur un autre serveur.
    - Je suis également disponible toute la journée sur skype -- mon identifiant est pl.guhur.
    - Pendant la séance, nous allons travailler sur Material UI et Styled components
    - Puis un TP noté va reprendre l'ensemble des notions vues en cours.
    - Pensez à cloner ce repo et à répondre aux questions en modifiant directement ce README.


## Sass

Au cas où vous avez un trou de mémoire sur Sass, voici un rappel de la syntaxe.
## Material UI

Je vous invite à regarder la vidéo de Human Talks Paris.

Quelques petites questions :

* Résumer en une phrase l'intérêt de Material UI 
  * C'est une bibliothèque de composants permettant de designer une interface en plus de pouvoir les customiser, elle propose des couleurs ainsi que des éléments tel que les boutons. 
* Comment importer material-ui dans un fichier ? 
  * ```javascript 
      @import {LeComposant} from '@material-ui/core/suitedescomposants'
    ``` 
* Comment une application peut utiliser un thème à travers l'ensemble d'un projet ? 
  * ```javascript 
      @import {MuiThemeProvider} from '@material-ui/core/styles' //et on encapsule l'app dans MuiThemeProvider
    ```
* A quoi sert createMuiTheme ? 
  * On peut personnaliser un thème dans toute sa grandeur comme la police, la couleur de fond ... en créant un objet et le plaçant dans le provider
* A quoi correspond palette ? 
  * Palette correspond aux couleurs utilisées par l'app
* Comment re-définir des propriétés ? 
  * avec overrides
* A quoi vous fait penser withStyle ? Comment l'utiliser ? 
  * ça me fait penser à l'autorization qu'on a fait dans le précédant tp. On export l'app encapsulé du withStyle
Reproduire les deux boutons rouge et bleu présentées dans la vidéo.
```javascript
import React, {Component} from 'react';

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';

class App extends Component{
  render() {
    return {
      <MuiThemeProvider theme={theme}>
        <div>
          <Button className={this.props.classes.myLeftButton}>Bonjour</Button>
          <Button>Human Talks !!</Button>
        </div>
      </MuiThemeProvider>
    };
  }
}

const styles = {
  myLeftButton: {
    backgroundColor: "blue"
  }
}
const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    fontSize: 15,
    fontFamily: "Arial"
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "red",
        "&:hover":  {backgroundColor:"yellow"}
      }
    }
  }
})
export default withStyles(styles)(app);
```
## Styled Components

De la même manière, voici une vidéo pour introduire le sujet.

Quelques petites questions :

* Qu'est-ce que le CSS-in-JS ?
  * Permet de générer des classes dynamiques, de résoudre les problèmes de scope et d'effet de bord.
* Qu'est-ce que sont les tagged templates (délimitées par des backticks) ? 
  * Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression}). Les expressions dans les espaces réservés et le texte compris dans ces espaces sont passés à une fonction.

* Donner un exemple d'un bouton personnalisé avec et sans les tagged templates ?
```javascript
//avec
const Button = styles.button(["color: green"])
//sans
const Button = styled.button`
    color: green;
`
``` 
* Comment utilise-t-on les props dans cette librarie ?
  * 
* Reprendre l'exemple du Material UI avec styled-components; l'écrire avec la composition et avec l'héritage.
  ```javascript
    import React from 'react';
    import styled from 'styled-components'

    const commonstyles = `
    border-radius: 3px;
    cursor: pointer;
    padding: 8px 16px;
    border: none;
    `

    const Button1 = styled.button`
      ${commonstyles}

      background-color: lightskyblue
    `

    const Button2 = styled.button`
    ${commonstyles}

    background-color: green
    `

    function App(props) {
      return (
        <div>
          <Button1>Blue</Button1>
          <Button2>Green</Button2>
        </div>
      );
    }

    export default (App);
  ``` 
* Quelles sont les fonctions du contexte de styled-components ?
  *  gérer un thème

## Mise en place du design

Pour mettre en pratique ces notions, je vous propose de designer une application reprenant le principe de jeu du loup garou.

Cette plateforme est entièrement numérique, ce qui permet de s'affranchir d'un maître du jeu, et donc d'avoir un joueur supplémentaire.

A l'initialisation de la partie, un joueur démarre une partie. Un court identifiant est alors communiqué aux autres joueurs, qui doivent rejoindre la partie. Lorsque tous les joueurs ont rejoint la partie, la partie peut démarrer. Chaque joueur joue à tour de rôle depuis son téléphone.

Une contrainte importante est la synchronisation des joueurs : chaque joueur utilise son propre téléphone. Il reçoit un message lorsque c'est à son tour de jouer, ou attend autrement. Pour résoudre techniquement cette contrainte, tout en évitant d'écrire une application en backend, on utilise Firebase. Firebase permet d'utiliser des observateurs, qui réagissent lors d'un appel extérieur, ce qui donne une impression de temps réel.

Une partie du code vous est fournie, afin de faciliter la mise en place de Firebase et des context providers. Il vous est demandé d'explorer le code, d'y apporter un design responsive, et de compléter l'application pour ajouter les différentes étapes de jeu.
Installation du projet

Dans la console de Firebase, créer un nouveau projet. Dans le menu de gauche, cliquer sur "Authentication", puis cliquer sur l'onglet "Sign-in method", puis sélectionner "Anonymous" et activer le bouton "Enable". Ensuite, cliquer sur "Database" puis créer un "Cloud Firestore". Il est important de mettre la base de données en mode test.

Copier .env dans .env.local et remplir de dernier à l'aide de ses identifiants Firebase. Ses identifiants Firebase peuvent être récupérés dans la console, en cliquant sur l'engrenage des paramètres, puis sur l'icone web </>. Il faut copier le authDomain, l'apiKey et le projetId dans .env.local. Attention à ne pas mettre d'espace autour des = ou de ;.

### Découverte du code

* Le code utilise des fonctions plutôt que des classes. Ecrire un bouton sous la forme d'une classe et d'une fonction. Retrouver les équivalences entre les méthodes des composants (telles que setState) et celles des fonctions ?
  * ```javascript
      class Button extends React.Component {
        renter {
          const { onClick, children } = this.props;
          return (<button onClick={onClick}> { children }</button>);
        }
      }
    ```
* Comment récupérer les props dans une fonction ?
  *  ```javascript
        const Button = (props) => {
          const { onClick, children } = props;
          return (<button onClick={onClick}> { children }</button>);
        }
    ```
* Dans App.js, identifier les différents producteurs de données. Retrouver leur définition. Quelles données partagent-ils à l'ensemble de l'application ?

* Identifier les différentes pages de l'application. Décrire à l'aide d'une phrase le rôle de chacune d'entre elles.

* Pourquoi voit-on sur plusieurs pages "Chargement du master game en cours" ?

Avec les classes, nous utilisions withMyContext pour s'inscrire aux données d'un provider. Identifier dans services/Game.js la fonction qui joue désormais ce rôle.
Dans CodePage, rappeler comment un formulaire gère les champs de remplissage des données. A chaque changement dans le formulaire, des variables se mettent à jour (via une fonction event), quand on envoie le formulaire on récupère juste la valeur de ces variables sans charger une nouvelle page (ce qui signifierait une perte des infomations)
* - App.js est une sorte de sommaire qui créé les liens entre les pages grâce aux route path.
- AlivePage.js indique le rôle de chaque joueur.
- CastPage.js vérifie si un joueur est encore en vie et le redirige sur la page d'attente (?)
- CodePage.js est une page qui s'affiche après avoir cliqué sur 'Rejoindre une partie', permet de copier le code donné par ses amis, de rentrer un pseudo et de rejoindre une partie.
- CreatePage.js est une page qui s'affiche quand on clique sur 'Nouvelle partie', permet de générer un code pour que ses amis puissent rejoindre, et de lancer la partie.
- DeadPage.js est une page qui s'affiche quand le joueur meurt.
- EndPage.js est une page qui s'affiche quand la partie est terminée. Permet d'afficher le nom des gagnants.
- NightPage.js est une page qui s'affiche quand c'est la nuit.
- ResultsPage.js est une page qui s'affiche à la fin de chaque vote du village. Permet d'afficher qui a été tué par les villageois.
- SpellPage.js permet à la sorcière de choisir entre ses deux potions, ou de ne rie nfaire.
- StartPage.js est une page d'accueil commune à chaque joueur, permet de choisir entre créer une partie ou la rejoindre.



### Reprise du design

    En utilisant styled-components, reprendre le design du composant Button.
    Votre nouveau bouton peut alors être utilisé pour améliorer l'affichage de la page StartPage.
    Ajouter un header et un footer sur toutes les pages de l'application.
    Réaliser le design du formulaire de de CodePage, utilisé pour rejoindre l'application.
    Faire de même avec CreatePage.

### Utilisation de Firebase

* Dans 'User.js', comment fait-on pour garder une trace persistente de l'application, même lorsqu'on rafraichit la page ? Comment reconnait-on l'utilisateur lorsqu'il revient dans l'application ?
  * Grace aux cookies. Ca stock l'information dans firebase et sur notre navigateur à chaque connexion
* Dans Firebase, nous ne pouvons pas ajouter des champs à un utilisateur. Par conséquent, nous devons créer une collection d'utilisateurs et synchroniser les utilisateurs avec cette table. Expliquer où est-ce que cette synchronisation a lieu. 
  * Pour conserver les infos dans un navigateur, firebase va checker si l'utilisateur s'est déjà connecté sur l'app ou pas ce qui va lui permettre de s'identifier dans la collection d'utilisateurs. 
* A votre avis, à quoi sert useEffect ? 
  * Charger des données depuis un serveur distant, s’abonner à quelque chose et modifier manuellement le DOM sont autant d’exemples d’effets de bord.
* A quoi sert la fonction unsubscribe utilisée dans les useEffect de User.js ?
  *
* Décrire les trois valeurs de retour de UseUser.
  *
* Combien de collections dans Firebase pouvez-vous identifier ? A quoi correspondent les doc ?
* 
### Contribuer à l'application

    Lors du lancement du jeu, ajouter l'attribution des rôles à chaque joueur : loup-garou, villageois, petite fille ou sorcier. Le nombre de loup-garou est calculé en fonction du nombre de joueurs.
    Chaque joueur reçoit alors une image de son rôle. Partager cette information depuis /wait.
    Lorsque la nuit tombe, la liste des joueurs encore vivants est proposée aux loups garous, qui doivent se mettre d'accord. Réaliser cette fonction.
    Lorsque le jour arrive, tous les joueurs reçoivent une notification indiquant la cible des loups garous. Cette dernière est redirigée vers DeadPage.
    Les joueurs vivant votent pour éliminer un joueur, suspecté d'être un loup garou. Réaliser cette fonction.

## Rapport

Rédiger un court rapport -- inférieur à une page, expliquant les modifications apportées au projet. Motiver ses choix. Expliquer les difficultés rencontrées.

