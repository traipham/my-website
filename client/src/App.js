import './App.css';
import React, { useEffect } from "react";
import {useState} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
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
      delay: 1,
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

  const [admin, setAdmin] = useState(false);


  useEffect(() => {
    const adminTF = localStorage.getItem("admin");
    // console.log(typeof adminTF);
    setAdmin(adminTF === "true");
    // console.log(admin);
  })

  return (
    <Router>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={option} />
      <Home />
      <Switch> 
        <Route path="/resume" component={Resume}/>
        <Route path="/interest"><Interest isAdmin={admin}/></Route>
        <Route path="/blog" ><Blog isAdmin={admin}/> </Route>
        <Route path="/wish-list"><WishList isAdmin={admin} /></Route>
        <Route path="/goals"><Goals isAdmin={admin} /></Route>
        {
          admin ? <Route path="/random"><Random isAdmin={admin} /></Route> : console.log("hello")
        }
        {
          admin ? <Route path="/setting"><Setting isAdmin={admin} /></Route> : console.log("world")
        }
      </Switch>
    </Router>
  );
}

export default App;
