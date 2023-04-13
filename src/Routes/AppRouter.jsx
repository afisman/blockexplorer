import React from 'react'
import Block from '../Components/Block/block'
import { Route } from 'react-router-dom'
import HomePage from '../Pages/Home/HomePage'


const AppRouter = () => {
    return (
        <>

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