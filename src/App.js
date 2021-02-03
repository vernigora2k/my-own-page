import React, { Fragment, useState } from 'react';
import {useTransition, animated} from 'react-spring';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Contacts } from './pages/Contacts';
import MainMenu from './components/MainMenu';

function App() {
  const [isToggled, setIsToggled] = useState(false)

  const location = useLocation()

  const transition = useTransition(location, location => location.pathname, {
    from: {
      opacity: 0,
      transform: 'translateX(100%)',
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)',
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
  })

  const toggleHandler = () => {
    setIsToggled(!isToggled)
  }

  return (
    <section style={{position: 'relative', overflow: 'hidden', minHeight: '100vh'}}> 
      <div className="menu-button">
        <MainMenu toggled={isToggled} toggleHandler={toggleHandler}/>
        {/* <button onClick={toggleHandler}>menu</button> */}
        <div onClick={toggleHandler} id="nav-icon4" className={"menu-button__hamburger" + (isToggled ? ' open' : '')}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {
        transition.map(({item, props, key}) => (
          <animated.div key={key} style={props}>
            <div style={{position: 'absolute', width: '100%'}}>
              <Switch location={item}>
                <Route exact path='/' component={Home} />
                <Route path='/portfolio' component={Portfolio} />
                <Route path='/contacts' component={Contacts} />
              </Switch>
            </div>
          </animated.div>
        ))
      } 
    </section>
  );
}

export default App;
