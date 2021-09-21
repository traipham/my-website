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
  fullScreen: { enable: true },
  particles: {
    number: {
      value: 20
    },
    color: {
      value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 400,
      random: {
        enable: true,
        minimumValue: 200
      }
    },
    move: {
      enable: true,
      speed: 10,
      direction: "top",
      outMode: "destroy"
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      resize: true
    }
  },
  detectRetina: true,
  emitters: {
    direction: "top",
    position: {
      x: 50,
      y: 100
    },
    rate: {
      delay: 0.8,
      quantity: 2
    },
    size: {
      width: 100,
      height: 10
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
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={option} />
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
