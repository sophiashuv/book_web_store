import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {StorePageComponent} from "./pages/store/StorePageComponent";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/about"><div>about</div></Route>
                <Route path="/users"><div>users</div></Route>
                <Route path="/"><StorePageComponent /></Route>
            </Switch>
        </Router>
    );
}