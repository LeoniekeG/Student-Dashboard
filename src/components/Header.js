import React from "react"
import bgImg from "../images/winc.png"
import { Link } from "react-router-dom"
import Home from "../pages/Home"

export default function Header() {
    return (
        <header>
            <Link to="/" relative="path">
            <nav className="navigation-bar">
                <img src={bgImg} alt="Winc" className="winc-image"></img>
                <h1>STUDENT DASHBOARD</h1>
                <img src={bgImg} alt="Winc" className="winc-image"></img>
            </nav>
            </Link>
        </header>
    )
}