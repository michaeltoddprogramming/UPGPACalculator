import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import DontClickMe from "./pages/DontClickMe";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/dont-click" element={<DontClickMe/>}/>
                </Routes>
            </Router>
        );
    }
}

export default App;