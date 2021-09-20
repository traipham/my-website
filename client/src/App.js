import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Particles from 'react-tsparticles';

import Home from './components/home/home.js';
import Resume from './components/resume/resume.js';
import Interest from './components/interest/interest.js';
import Blog from './components/blog/blog.js';
import WishList from './components/wish-list/wish-list.js';
import Setting from './components/setting/setting.js';
import Goals from './components/goals/goals.js';
import Random from './components/random/random.js';

const option = {
  fpsLimit: 60,
  background: {
    color: "#0b032d"
  },
  backgroundMode: {
    enable: true
  },
  particles: {
    color: {
      value: ["#f67e7d", "#843b62", "#621940"]
    },
    links: {
      color: "#ffb997",
      enable: true
    },
    move: {
      enable: true,
      speed: 6
    },
    size: {
      value: 5,
      random: {
        enable: true,
        minimumValue: 1
      },
      animation: {
        enable: true,
        speed: 2.5,
        minimumValue: 1
      }
    },
    opacity: {
      value: 0.8,
      random: {
        enable: true,
        minimumValue: 0.4
      }
    }
  }
}

const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
}

const particlesLoaded = (container) => {
  console.log(container);
}

function App() {
  return (
    <Router>
      {/* <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={option} /> */}
      <Home />
      <Switch> 
        <Route path="/resume" component={Resume}/>
        <Route path="/interest" component={Interest} />
        <Route path="/blog" component={Blog} />
        <Route path="/wish-list" component={WishList} />
        <Route path="/goals" component={Goals} />
        <Route path="/random" component={Random}/>
        <Route path="/setting" component={Setting} />
      </Switch>
    </Router>
  );
}

export default App;
