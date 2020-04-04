import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StartPage from './pages/StartPage'
import EndPage from './pages/EndPage'
import CreatePage from './pages/CreatePage'
import NightPage from './pages/NightPage'
import ResultsPage from './pages/ResultsPage'
import CodePage from './pages/CodePage'
import CastPage from './pages/CastPage'
import AlivePage from './pages/AlivePage'
import SpellPage from './pages/SpellPage'
import DeadPage from './pages/DeadPage'
import { MasterGameProvider } from './services/MasterGame';
import { GameProvider } from './services/Game';
import { UserProvider } from './services/User';
import {ThemeProvider} from "styled-components";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <ThemeProvider theme={theme}>
      <Layout>
      <Route exact path="/" component={ StartPage } />
      <Route path="/end" component={ EndPage } />
      <Route path="/join" component={ CodePage } />

      <MasterGameProvider>
        <Route path="/create" component={ CreatePage } />
        <Route path="/night" component={ NightPage } />
        <Route path="/vote/results" component={ ResultsPage } />
      </MasterGameProvider>

      <GameProvider>
        <Route path="/vote/cast" component={ CastPage } />
        <Route path="/alive" component={ AlivePage } />
        <Route path="/dead" component={ DeadPage } />
        <Route path="/spell" component={ SpellPage } />
      </GameProvider>
      </Layout>
      </ThemeProvider>
    </UserProvider>
    </BrowserRouter>
  );
}

const theme = {
  normal: "#e38864",
  hover: "#1f5699"
}

export default App;
