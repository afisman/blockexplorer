import React from 'react'
import Block from '../Components/Block/block'
import { Route } from 'react-router-dom'
import HomePage from '../Pages/Home/HomePage'
import Address from '../Components/Address/Address'


const AppRouter = () => {
    return (
        <>
            <Route path="/address" exact>
                <Address />
            </Route>
            <Route path="/address/:address" exact>
                <Address />
            </Route>

            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/:hash" exact>
                <Block />
            </Route>
        </>
    )
}

export default AppRouter