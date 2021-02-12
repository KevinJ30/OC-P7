export class InDataMemory {

    constructor(noData) {
        this.data = [
            {
                id:1,
                title: "",
                address: "2 impasse bagnoli, serignan du comtat, 84830 sérignan-du-comtat",
                ratings: [
                    {
                        stars: 4,
                        comment: "Un  excellent restaurant dans un quartier calme de la ville de sérignan-du-comtat."
                    }
                ]
            },
            {
                id:2,
                title: "Second restaurant",
                address: "2 impasse bagnoli, serignan du comtat, 84830 sérignan-du-comtat",
                ratings: [
                    {
                        stars: 4,
                        comment: "Un  excellent restaurant dans un quartier calme de la ville de sérignan-du-comtat."
                    }
                ]
            },
            {
                id:3,
                title: "Last restaurant",
                address: "2 impasse bagnoli, serignan du comtat, 84830 sérignan-du-comtat",
                ratings: [
                    {
                        stars: 4,
                        comment: "Un  excellent restaurant dans un quartier calme de la ville de sérignan-du-comtat."
                    }
                ]
            }
        ]

        if (noData) {
            this.data = [];
        }
    }

}