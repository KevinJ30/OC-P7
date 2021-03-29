/**
 * @property {string} author : Autheur de l'avis
 * @property {number} rating : Note du restaurant
 * @property {string} relative_time_description: Temps écoulé depuis l'écriture de l'avis
 * @property {string} text : Texte de l'avis
 **/
export class ReviewsEntity {
    constructor(author, rating, relative_time_description, text, time) {
        this._rating = rating;
        this._relative_time_description = relative_time_description;
        this._text = text;
        this._author = author;
        this._time = time;
    }

    getRating() {
        return this._rating;
    }

    setRating(value) {
        this._rating = value;
    }

    getAuthor() {
        return this._author;
    }

    setAuthor(value) {
        this._author = value;
    }
    getText() {
        return this._text;
    }

    setText(value) {
        this._text = value;
    }

    geRelative_time_description() {
        return this._relative_time_description;
    }

    setRelative_time_description(value) {
        this._relative_time_description = value;
    }

    getTime() {
        return this._time;
    }

    setTime(value) {
        this._time = value;
    }
}