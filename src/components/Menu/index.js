import React from 'react';
import VolneiFlixImg from '../../assets/img/volneiflix.png'
import './Menu.css';
import { Link } from 'react-router-dom'
import Button from '../Button'

function Menu () {
    return (
        <nav className="Menu">
            <Link to="/">
             <img className="Logo" src={VolneiFlixImg} alt="VolneiFlix Logo" />
            </Link>
            <Button as={Link} className="ButtonLink" to="/cadastro/video">
               Novo vídeo
            </Button>
        </nav>
    );
}

export default Menu; 