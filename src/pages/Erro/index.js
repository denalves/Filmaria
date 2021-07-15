import React from 'react'
import './erro.css'
import {Link} from 'react-router-dom'
const Erro = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>PAGINA NAO ECONTRADA</h2>
            <Link to="/">Veja todos os filmes!</Link>
        </div>
    )
}

export default Erro
