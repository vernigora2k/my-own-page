import React,{ Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

export default class MainTyped extends Component {
    render() {
        return (
            <div>
                <h4 className="home__title">
                    <Typed
                        strings={['Hello, my name is Pavlo Vernigora.']}
                        typeSpeed={40}
                        showCursor={false}
                    />
                </h4>
                <br/>
                <h6 className="home__description">
                    <Typed
                        strings={['I am front-end web developer.']}
                        typeSpeed={40}
                        showCursor={false}
                    />
                </h6>
                
                <h6 className="home__description">
                    <Typed
                        strings={['You can check out example of my code at the']}
                        typeSpeed={40}
                        showCursor={false}
                    />&nbsp;
                    <Link className="home__link link-flash" to="/laboratory">
                        <Typed
                            strings={['code laboratory.']}
                            typeSpeed={40}
                            startDelay={2600}
                            showCursor={false}
                        />
                    </Link>
                </h6>
                
                <h6 className="home__description">
                    <Typed
                        strings={['Feel free to take a look at my projects on the']}
                        typeSpeed={40}
                        showCursor={false}
                    />&nbsp;
                    <Link className="home__link link-flash" to="/portfolio">
                        <Typed
                            strings={['portfolio page.']}
                            typeSpeed={40}
                            startDelay={2600}
                            showCursor={false}
                        />
                    </Link>
                </h6>
                
                <h6 className="home__description">
                    <Typed
                        strings={['For any questions:']}
                        typeSpeed={40}
                        showCursor={false}
                    />&nbsp;
                    <span className="home__link link-flash">
                        <Typed
                            strings={['vernigora2k@gmail.com']}
                            typeSpeed={40}
                            startDelay={2600}
                            cursorChar="&#95;"
                        />
                    </span>
                </h6>
            </div>
        );
    }
}