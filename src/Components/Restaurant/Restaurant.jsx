import React, {useMemo} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Rating} from "./Rating";

export function Restaurant(props) {
    let {id} = useParams();
    let store = props.store;

    const restaurantMemo = useMemo(function() {
        return store.getRestaurant(id);
    }, [store, id])

    return <div className="container mt-3">
        <Link to="/">Home</Link>

        <div className="col-md-12 card p-3">
            <h1>{restaurantMemo.restaurantName}</h1>
            <Rating restaurant={restaurantMemo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, at ea illo laborum molestias nulla odit, optio placeat praesentium quidem recusandae sequi veniam. Autem commodi culpa quidem sunt tempore? Ratione!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur blanditiis, consequatur dignissimos ea fugit ipsam iusto magni odit, provident quibusdam quo repellat sunt voluptas voluptatum! Aut cupiditate est hic illum officia omnis vel? Aliquam, amet aspernatur consectetur consequuntur dignissimos, distinctio illum laborum mollitia necessitatibus officia placeat porro rem sint tempore veniam. Ad architecto assumenda at autem beatae consequatur corporis cupiditate, dolore doloribus ducimus eligendi ex facere, fuga harum illo illum ipsum iste laboriosam laudantium maxime, mollitia nemo nesciunt obcaecati odio odit praesentium provident quia quod quos recusandae sapiente soluta ut voluptatem. Ad asperiores deleniti ea nemo rem repellendus sed similique? Architecto at beatae earum enim eveniet excepturi hic illum iusto laborum magnam modi omnis quidem rerum saepe sed, sequi similique tempore temporibus ut voluptatum! Accusantium aut blanditiis dolor doloribus, ipsa nostrum obcaecati sequi similique soluta temporibus. A accusamus accusantium architecto commodi, corporis dignissimos ea eaque eos id in natus, nemo odio omnis quae quasi recusandae, rem repellendus rerum totam voluptas? A architecto earum eligendi enim eum, ex expedita fugiat labore nam non officia possimus quam quia ratione repellendus rerum sequi soluta. Ad, alias consectetur libero nam tempore voluptates. Ad assumenda aut debitis doloremque, laudantium nihil nulla suscipit temporibus ut!</p>
        </div>
    </div>;
}