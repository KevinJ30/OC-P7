import React, {useState, useEffect} from 'react';
import {animateScroll as scroll} from 'react-scroll';

export function ScrollTop() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            setHidden(!!scrollY);
        })
    }, [])

    function scrollToTop() {
        scroll.scrollToTop();
    }

    return hidden && <button className="btn btn-primary btn-toggle-top shadow-sm" onClick={scrollToTop}><i className="bi bi-arrow-up"/></button>;
}