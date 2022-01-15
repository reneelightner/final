import {Outlet} from 'react-router-dom';
import Nav from './Nav.js'

export default function Layout () {
    return(
        <div>
            <Nav />
            <main>
                <Outlet />
            </main>
            <footer class='progress-bar mt-5'>
                <p class="mt-3">ReactJS Class Final Project</p>
                <p class="pb-5">Created By: Renee Lempert</p>
            </footer>
        </div>
    )
}