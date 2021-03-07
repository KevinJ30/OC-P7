import {Stars} from "../Restaurant/Rating";

export function Review(props) {
    return <div className="review">
        <div className="review__author">{props.data.author_name}</div>
        <Stars stars={props.data.rating} />
        <div className="review__time">{props.data.relative_time_description}</div>
        <div className="review__text">{props.data.text}</div>
        <hr/>
    </div>;
}