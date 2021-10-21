import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {StorePageComponent} from "./pages/store/StorePageComponent";
import BookPageComponent from "./pages/book/BookPageComponent";
import {RegisterPageComponent} from "./pages/register/RegisterPageComponent";
import {SignInPageComponent} from "./pages/sign_in/SignInPageComponent";
import {BookAdderPageComponent} from "./pages/add_book/BookAdderPageComponent";
import {AuthorAdderPageComponent} from "./pages/add_author/AuthorAdderPageComponent";
import СartPageComponent from "./pages/cart/СartPageComponent";
import {DiscountPageComponent} from "./pages/add_discount/DiscountPageComponent";
import AuthorPageComponent from "./pages/author/AuthorPageComponent";
import history from "./history";

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path="/about"><div>about</div></Route>
            <Route exact path="/users"><div>users</div></Route>
            <Route exact path="/products"><StorePageComponent /></Route>
            <Route exact path="/register"><RegisterPageComponent /></Route>
            <Route exact path="/sign_in"><SignInPageComponent /></Route>
            <Route path="/products/:productId"><BookPageComponent /></Route>
            <Route exact path="/add_book"><BookAdderPageComponent /></Route>
            <Route exact path="/add_author"><AuthorAdderPageComponent /></Route>
            <Route exact path="/add_discount"><DiscountPageComponent /></Route>
            <Route exact path="/cart"><СartPageComponent /></Route>
            <Route path="/authors/:authorId"><AuthorPageComponent /></Route>
        </Switch>
    );
}