import MainComponents from './Router';
import {HeaderComponent} from './layout/Header/HeaderComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";


function App() {
    return (
        <Router>
        <div className="App">
            <HeaderComponent/>
            <MainComponents/>
            <footer className="footer">This is footer</footer>
        </div>
        </Router>
    );
}

export default App;
