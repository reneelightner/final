import {NavLink} from 'react-router-dom';

export default function Nav () {
    return (
        <nav class="navbar bg-primary">
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
            </div>
        </nav>
    )
}