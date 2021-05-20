import Home from "./components/Home";
import React from 'react';
import ReactDOM from 'react-dom';

require('./bootstrap');

function App() {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div id="navMenu" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item">
                                <img src="/journal.svg" />
                                <span className="ml-2">Work&nbsp;Diary</span>
                            </a>
                        </div>

                        <div className="navbar-end">
                            <a className="navbar-item" href="https://github.com/rajkumaar23/work-diary">
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="hero is-light is-fullheight-with-navbar">
                <Home/>
            </section>
        </>
    )
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
