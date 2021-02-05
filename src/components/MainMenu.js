import React from 'react';
import {useSpring, animated} from 'react-spring';
import './mainmenu.scss';
import { Link } from 'react-router-dom';

const MainMenu = ({ toggled, toggleHandler }) => {
    const { x } = useSpring({
        x: toggled ? 0 : 100
    })

    return <animated.div className="nav-wrapper" style={
        {transform: x.interpolate(x => `translate3d(${x * -1}%, 0, 0)`)}
    }>
        <nav>
            <Link to="/" onClick={toggleHandler}>Home</Link>
            <Link to="/laboratory" onClick={toggleHandler}>Code laboratory</Link>
            <Link to="/portfolio" onClick={toggleHandler}>Portfolio</Link>
            <Link to="/contacts" onClick={toggleHandler}>Contacts</Link>
        </nav>
    </animated.div>
}

export default MainMenu;