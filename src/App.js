import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.api_key;

  const [progress, setProgress] = useState(0);
  
  return (
    <div>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
        />
        <Navbar />
        
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" />}/>
          <Route exact path="/buisness" element={<News apiKey={apiKey} setProgress={setProgress} key="buisness" category="buisness"/>}/>
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" category="entertainment"/>}/>
          <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" category="general"/>}/>
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" category="health"/>}/>
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" category="science"/>}/>
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" category="sports"/>}/>
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" category="technology"/>}/>
        </Routes>
      </Router>
    </div>
  )
  
}

export default App;