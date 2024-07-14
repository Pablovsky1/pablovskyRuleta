// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Ruleta from './Ruleta';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ruleta" element={<Ruleta />} />
            </Routes>
        </Router>
    );
};

export default App;
