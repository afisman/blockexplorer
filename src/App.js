import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TableOfTransactions from './Components/TableOfTransactions/tableOfTransactions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { alchemy } from './Lib';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Pages/Home/HomePage';
import AppRouter from './Routes/AppRouter';


const queryClient = new QueryClient()

function App() {


  return <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <AppRouter />
      </Router>
    </QueryClientProvider>
  </>
}

export default App;
