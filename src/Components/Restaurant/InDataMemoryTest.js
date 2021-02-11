export class InDataMemoryTest {

    constructor(noData) {
        this.data = [
            {
                title: "First restaurant"
            },
            {
                title: "Second restaurant"
            },
            {
                title: "Last restaurant"
            }
        ]

        if (noData) {
            this.data = [];
        }
    }

}