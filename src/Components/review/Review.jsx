import {Stars} from "../Restaurant/Rating";

export function Review(props) {
    console.log(props.data)

    return <div className="review">
        <div className="reveiw__author_name">{props.data.author_name}</div>
        <Stars stars={props.data.rating} />
        <div className="review__time">{props.data.relative_time_description}</div>
        <div className="review__text">{props.data.text}</div>
    </div>;
}