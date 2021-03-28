# FOOD TRACK

## Description de l'application
FOOD TRACK est une application qui collecte les restaurants autour de vous dans un rayon d'un kilomètre. Elle a été créer dans le cadre de ma formation Openclassroom. Ils sont rangés par étoile de 0 à 5. Vous avez également la possibilité d'afficher le restaurant pour consulter les avis qui ont été posté sur celui-ci. Des images sont affichées pour vous permettre de le trouvez plus facilement. Un formulaire permet d'ajouter un restaurant sur la carte et vous avez aussi la possibilité de rédiger votre avis sur un restaurant autour de votre position.

## Les fonctionnalités
* Afficher les restaurants autour de chez vous dans un rayon d'un kilomètre.
* Filtrer les restaurants par notes de 0 à 5
* Afficher les avis d'un restaurant
* Ajouter rapidement un restaurant sur la carte
* Ajouter un avis a un restaurant autour de chez vous

## Vue d'enssemble
![vue d'enssemble](https://github.com/KevinJ30/OC-P7/blob/develop/docs/img/ensemble.JPG)

### Description de la page

#### Barre en haut
Dans cette partie vous retrouvez les informations de l'application sont nom et son titre.

#### Au milieu
L'application se divise en 3 parties :
- Tous à gauche se trouve le filtre qui permet de filtrer les restaurants par notes
- Au milieu se trouve la carte de votre zone ou de paris si vous n'avez pas activé la géolocalisation de votre appareil
- Tous à droite se trouve la liste des restaurants autour de vous sauf si vous n'avez pas la géolocalisation, la liste sera celle de paris.

## Filtrer les restaurants

Pour filtrer les restaurants, il faut indiquer la note minimum et maximum sur les champs à gauche, comme illustré sur l'image ci-dessous :

![Filtrer restaurant](docs/img/filtre.jpg)

Quand vous changer le nombre d'étoile de chaque champs la liste est mise à jour automatiquement.

## Afficher les avis d'un restaurant

Pour afficher les avis, cliquer sur le bouton "Voir tous les avis" qui se trouve sur la carte d'un restaurant.

![Afficher avis](docs/img/display_reviews.jpg)

Une fois que vous avez cliqué sur le bouton, une page s'affiche avec une carte qui pointe l'adresse du lieu, sur la droite des images illustre le restaurant et en dessous ce trouve la liste des avis.

![page avis](docs/img/reviews.jpg)

## Ajouter un avis

Pour ajouter un avis, cliquer sur le bouton "donnez votre avis" qui se situe à droite du nom. Une fenêtre s'ouvre et demande de remplir les champs suivants :

* Nom de la personne qui écrit l'avis
* Note du lieu
* L'avis sur le lieu

Le formulaire ressemble à l'image ci-dessous :

![Form Avis](docs/img/form_add_reviews.jpg)

Une fois que vous avez remplie tous les champs, cliquer sur le bouton ajouter et il sera ajouté au début de la liste des avis.

![Display add reviews](docs/img/display_add_reviews.jpg)

## Ajouter un restaurant

Pour ajouter un restaurant cliquer n'importe où sur la carte, une fenêtre modale s'ouvre et vous demande de remplir les champs suivants :

* Nom du restaurant
* Nombre d'étoile du restaurant allant de 0 à 5 maximum
* L'adresse du restaurant qui est préremplie, il se peut que l'adresse ne soit pas exacte, si c'est le cas vous pouvez directement modifier le champ.

Le formulaire ressemble à l'image ci-dessous :

![Form Add Restaurant](docs/img/form_add_restaurant.jpg)

Une fois que vous avez tous saisie sur le formulaire cliquer sur le bouton "Ajouter" en bas à gauche et il apparaitra sur la carte et dans la liste à droite, comme le montre l'image :

![Form Add Restaurant](docs/img/add_map_restaurant.jpg)




