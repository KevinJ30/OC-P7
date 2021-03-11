import {Stars} from "../Restaurant/Rating";

export function Review(props) {
    return <div className="review">
        <div className="review__author">{props.data.getAuthor()}</div>
        <Stars stars={props.data.getRating()} />
        <div className="review__time">{props.data.geRelative_time_description()}</div>
        <div className="review__text">{props.data.getText()}</div>
        <hr/>
    </div>;
}