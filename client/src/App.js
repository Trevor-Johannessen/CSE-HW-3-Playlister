import './App.css';
import { React, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar, DeleteListModal, DeleteSongModal, EditSongModal } from './components'


/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/


const App = () => {

    return (
        <Router>
            <Banner />
            <DeleteListModal />
            <DeleteSongModal />
            <EditSongModal />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
        </Router>
    )
}

export default App