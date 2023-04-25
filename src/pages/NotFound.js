import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>Page not found!</h1>

            <p>Go to the <Link to="/"> homepage</Link>.</p>
        </div>
    )
}