import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/home/home.js';
import Resume from './components/resume/resume.js';
import Interest from './components/interest/interest.js';
import Blog from './components/blog/blog.js';
import WishList from './components/wish-list/wish-list.js';
import Setting from './components/setting/setting.js';
import Goals from './components/goals/goals.js';
import Random from './components/random/random.js';

function App() {
  return (
    <Router>
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
