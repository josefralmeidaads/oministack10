import React,{useState,useEffect} from 'react';
import './style.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

function DevForm({onSubmit}){
  const [github_username, setGithubUsername] = useState(''); // para armazenar esses valor pelo input, usamos a função onChange=e => setGithubUsername{e.target.value} e atribuir value={github_username}
  const [techs, setTechs] = useState(''); // para armazenar esses valor pelo input, usamos a função onChange=e => setTechs{e.target.value} e atribuir value ={techs}
  const [latitude, setLatitude] = useState(''); // para armazenar esses valores pelo input, usamos a função onChange=e => setLatitude{e.target.value}
  const [longitude, setLongitude] = useState(''); // para armazenar esses valores pelo input, usamos a função onChange=e => setLongitude{e.target.value}

    //useEffect serve para executar uma função, e usar uma variável para dizer quando será executada a função, se for um vetor vazio a função é executada uma vez
    useEffect(() => { //Obtendo Geolocalização
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            //console.log(position);
          }, (err) => {
            console.log(err);
          },
          {
            timeout: 300000,
          }
        )
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

       await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        //Limpandos os campos após a gravação
        setGithubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label htmlFor="github_username">Usuário do GitHub</label>
                    <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}></input>
                </div>

                <div className="input-block">
                  <label htmlFor="techs">Tecnologias</label>
                  <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}></input>
                </div>

              <div className="input-group">
                <div className="input-block">
                  <label htmlFor="latitude">Latitude</label>
                  <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}></input> 
                </div>
              
                <div className="input-block">
                  <label htmlFor="longitude">Longitude</label>
                  <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}></input>
                </div>
              </div>    
              <Button variant="contained" color="secondary" type="submit" startIcon={<SaveIcon />}>Salvar</Button>
            </form>
    )
}

export default DevForm;