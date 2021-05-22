import Home from "./components/Home";
import Footer from "./components/Footer";
import React from 'react';
import ReactDOM from 'react-dom';

require('./bootstrap');

function App() {
    return (
        <>
            <section className="hero is-light pt-6">
                <Home/>
                <Footer />
            </section>
        </>
    )
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
