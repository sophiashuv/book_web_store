import React from "react";
import {Switch, Route} from "react-router-dom";
import {StorePageComponent} from "./pages/store/StorePageComponent";
import BookPageComponent from "./pages/book/BookPageComponent";
import {RegisterPageComponent} from "./pages/register/RegisterPageComponent";

export default function MainComponents() {
    return (

        <Switch>
            <Route exact path="/about"><div>about</div></Route>
            <Route exact path="/users"><div>users</div></Route>
            <Route exact path="/products"><StorePageComponent /></Route>
            <Route exact path="/register"><RegisterPageComponent /></Route>
            <Route path="/products/:productId"><BookPageComponent /></Route>
        </Switch>

    );
}