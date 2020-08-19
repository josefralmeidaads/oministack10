import React, {useState, useEffect} from 'react';
import './style.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../services/api';

function DevItem({ dev }){
  const[dever, setDever] = useState([])
  const [github_username, setGithubUsername] = useState(''); // para armazenar esses valor pelo input, usamos a função onChange=e => setGithubUsername{e.target.value}
  
  useEffect(() => {
    async function carregaDevs(){
        const api = await api.get('/devs');
    }

  }, [github_username])
  
  async function DeleteDev(){
    setGithubUsername('josefralmeidaads');
    
    const dadosApi = await api.delete('/devs', {github_username});

    console.log(dadosApi.data);

    
  }
  
    return (
            <>
            <li key={dev._id} className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                  <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p className="biografia">Biografia</p> 
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
            <IconButton className="button-delete" onClick={DeleteDev} id="deletebut" name="github_username" value={github_username} onChange={e => setGithubUsername(e.target.value)}  aria-label="delete" className="deleteButton">
                <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
          
        </>
    )
}

export default DevItem