# FOOD TRACK

## Description de l'application
FOOD TRACK est une application qui collecte les restaurants autour de vous dans un rayon d'un kilometre. Elle a été créer dans le cadre de ma formation Openclassroom. Ils sont rangés par étoile de 0 à 5. Vous avez également la possibilté d'afficher le restaurant pour consulter les avis qui ont été posté sur celui-ci. Des images sont affichées pour vous permettre de le trouvez plus facilement. Un formulaire permet d'ajouter un restaurant sur la carte et vous avez aussi la possibilité de rédiger votre avis sur un restaurant autour de votre position.

## Les fonctionnalités
* Afficher les restaurants autour de chez vous dans un rayons d'un kilométre.
* Filtrer les restaurants par notes de 0 à 5
* Ajouter rapidement un restaurant sur la carte
* Ajouter un avis a un restaurant autour de chez vous

## Vue d'ensemble
![vue d'ensemble](docs/img/ensemble.jpg)

### Description de la page

#### Barre en haut
Dans cette partie vous retrouvez les informations de l'application sont nom et son titre

#### Au milieu
L'application se divise en 3 partie :
- Tous à gauche se trouve le filtre qui permet de filtrer les restaurants par notes
- Au milieu se trouve la carte de votre zone ou de paris si vous n'avez pas activé la géolocalisation de votre appareil
- Tous à droite se trouve la liste des restaurants autour de vous sauf si vous n'avez pas la géolocalisation, la liste sera celle de paris.

## Filtrer les restaurants

Pour filtrer les restaurants, il faut indiquer la note minimum et maximum sur les champs a gauche, comme illustré sur l'image ci-dessou :

![Filtrer restaurant](docs/img/filtre.jpg)

Quand vous changer le nombre d'étoile de chaque champs la liste est mise a jour automatiquement.

## Ajouter un restaurant

Pour ajouter un restaurant cliquer n'importe où sur la carte, une fenêtre modal va s'ouvrire et vous demander de remplir les champs suivant :

* Nom du restaurant
* Nombre d'étoile du restaurant allant de 0 à 5 maximum
* Le dernier et l'adresse du restaurant qui est pré-remplie, il se peut que l'adresse ne soit pas exacte, si c'est le cas vous pouvez directement modifier le champ.

Le formulaire ressemble a l'image ci-dessou :
![Form Add Restaurant](docs/img/form_add_restaurant.jpg)

Une fois que vous avez tout saisie sur le formulaire cliquer sur le bouton ajouter en bas a gauche et vous le verez apparaitre sur la carte et dans la liste de droite.


