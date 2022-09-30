import {NavLink} from 'react-router-dom'
import {useContext} from 'react'

import logo from '../assets/dm-logo-white.svg'
import AuthContext from '../store/authContext'

const Header = () => {
    const authCtx = useContext(AuthContext)

    const isLoggedIn = authCtx.token

    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? '#f57145' : ''
        }
    }

    return (
        <header className='header flex-row'>
            <div className='flex-row'>
                <img src={logo} alt='dm-logo' className='logo'/>
                <h2>Social Mountain</h2>
            </div>
            <nav>
                <ul className='main-nav'>
                    <li>
                        <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                    </li>
                    {isLoggedIn && <li>
                        <NavLink style={styleActiveLink} to='profile'>Profile</NavLink>
                    </li>}
                    {isLoggedIn && <li>
                        <NavLink style={styleActiveLink} to='form'>Add Post</NavLink>
                    </li>}
                    {isLoggedIn && <li>
                            <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
                        </li>}
                    {!isLoggedIn && <li>
                        <NavLink style={styleActiveLink} to='auth'>Login or Register</NavLink>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header