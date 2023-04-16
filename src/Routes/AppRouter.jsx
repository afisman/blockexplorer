import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../Pages/Home/HomePage'
import Address from '../Components/Address/Address'
import Block from '../Components/Block/block'
import Transaction from '../Components/Transaction/transaction'


const AppRouter = () => {
    return (
        <>

            <Route path="/address/:address" exact>
                <Address />
            </Route>

            <Route path="/transaction/:hash" exact>
                <Transaction />
            </Route>

            <Route path="/block/:hash" exact>
                <Block />
            </Route>

            <Route path="/" exact>
                <HomePage />
            </Route>
        </>
    )
}

export default AppRouter