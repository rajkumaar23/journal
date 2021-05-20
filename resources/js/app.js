import Home from "./components/Home";
import React from 'react';
import ReactDOM from 'react-dom';

require('./bootstrap');

function App() {
    return (
        <Home/>
    )
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
