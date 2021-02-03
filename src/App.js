import React, { Fragment, useState } from 'react';
import {useTransition, animated} from 'react-spring';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Contacts } from './pages/Contacts';
import MainMenu from './components/MainMenu';

function App() {
  const [isToggled, setIsToggled] = useState(false)

  const toggleHandler = () => {
    setIsToggled(!isToggled)
  }

  return (
    <Fragment>
      <BrowserRouter>
      <div className="menu-button">
        <MainMenu toggled={isToggled} toggleHandler={toggleHandler}/>
        {/* <button onClick={toggleHandler}>menu</button> */}
        <div onClick={toggleHandler} id="nav-icon4" className={"menu-button__hamburger" + (isToggled ? ' open' : '')}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/contacts' component={Contacts} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
