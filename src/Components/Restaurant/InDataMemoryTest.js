export class InDataMemoryTest {

    constructor(noData) {
        this.data =[
            {
                "restaurantName":"Bronco",
                "address":"39 Rue des Petites Écuries, 75010 Paris",
                "lat":48.8737815,
                "long":2.3501649,
                "ratings":[
                    {
                        "stars":4,
                        "comment":"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
                    },
                ]
            },
            {
                "restaurantName":"Babalou",
                "address":"4 Rue Lamarck, 75018 Paris",
                "lat":48.8865035,
                "long":2.3442197,
                "ratings":[
                    {
                        "stars":5,
                        "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
                    },
                ]
            },
            {
                "restaurantName":"Café des fleurs",
                "address":"29 rue des Trois Journées, 30130 Pont st esprit",
                "lat":48.8865035,
                "long":2.3442197,
                "ratings":[
                    {
                        "stars":5,
                        "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
                    },
                ]
            }
        ]

        if (noData) {
            this.data = [];
        }
    }

}