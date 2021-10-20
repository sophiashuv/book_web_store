import React from "react";
import {HeaderComponent} from './layout/Header/HeaderComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from "react-router-dom";
import {AuthContext} from "./authContext";
import AppRouter from './Router';
import history from "./history";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            role: undefined,
        }
        this.setRole = this.setRole.bind(this);
    }

    setRole(role){
        this.setState({role});
    }

    render(){
        return (
            <Router history={history}>
            <AuthContext.Provider value={{
                role: this.state.role,
                setRole: this.setRole
            }}>

                <div className="App">
                    <HeaderComponent/>
                    <AppRouter/>
                    <footer className="footer">This is footer</footer>
                </div>

            </AuthContext.Provider>
            </Router>
        );
    }
}

export default App;
