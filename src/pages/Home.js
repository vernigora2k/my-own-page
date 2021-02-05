import React, { Fragment, useEffect, useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import MainTyped from '../components/MainTyped';

export const Home = () => {
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsShow(!isShow)
        }, 2000)
    }, [])

    return (
        <section className="home">
            <MainTyped /> 
            <nav className={"social" + (isShow ? " show-element" : '')}>
                <ul>
                    <li><a href="https://www.linkedin.com/in/vernigora2k" target="_blank">Linkedin <i className="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/vernigora2k" target="_blank">Github <i className="fa fa-github"></i></a></li>
                    <li className="skype-share" data-href="https://join.skype.com/invite/poAIogAm7Bhq"><a href="#">Skype <i className="fa fa-skype"></i></a></li>
                </ul>
            </nav>
            <Link to="/laboratory">
                <nav className={"arrow-right" + (isShow ? " show-element" : '')}>
                    <div className="arrow-right__up"></div>
                    <div className="arrow-right__down"></div>
                </nav> 
            </Link>
        </section>
    )
}