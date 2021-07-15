import React, { useEffect, useState } from "react";
import "./filme-info.css";
import { useParams, useHistory } from "react-router-dom";
import api from "../../services/api";
import {toast} from 'react-toastify';
const Filme = () => {
  const { id } = useParams();
  const history = useHistory();


  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFilme() {
        const response = await api.get(`r-api/?api=filmes/${id}`);

        if(response.data.length === 0) {
            //tentou acesar com um id que nao existe, navego ele para home!
            history.replace('/');
            return;
        }
        setFilme(response.data)
       setLoading(false);
    }

    loadFilme();


    return () => {

    }


  }, [id, history]);

  function salvaFilme(){
    const minhaLista = localStorage.getItem('filmes');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    //Se tiver algum filme salvo com esse mesmo id precisa ignorar...
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
    
    if(hasFilme){
        toast.error('voce ja possui esse filme salvo')
        return;
        //para a excução do codigo aqui..
    }


    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('filme salvo com sucesso')

  }

  if(loading){
      return(
        <div className="filme-info">
        <h1>Carregando seu filme..</h1>
      </div>
      )
  }
  return (
    <div className="filme-info">
    <h1>{filme.nome}</h1>
    <img src={filme.foto} alt={filme.nome} />

    <h3>Sinopes</h3>
    {filme.sinopse}
    <div className="botoes">
        <button onClick={salvaFilme}>Salvar</button>
            <button>
                <a target="_blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                    trailer
                </a>
            </button>
    </div>
  </div>
  );
};

export default Filme;
