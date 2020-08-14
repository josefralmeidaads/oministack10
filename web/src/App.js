import React, {useState, useEffect} from 'react';
import api from './services/api.js'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'

function App() {
  const [github_username, setGithubUsername] = useState(''); // para armazenar esses valor pelo input, usamos a função onChange=e => setGithubUsername{e.target.value} e atribuir value={github_username}
  const [techs, setTechs] = useState(''); // para armazenar esses valor pelo input, usamos a função onChange=e => setTechs{e.target.value} e atribuir value ={techs}
  const [latitude, setLatitude] = useState(''); // para armazenar esses valores pelo input, usamos a função onChange=e => setLatitude{e.target.value}
  const [longitude, setLongitude] = useState(''); // para armazenar esses valores pelo input, usamos a função onChange=e => setLongitude{e.target.value}

  //useEffect serve para executar uma função, e usar uma variável para dizer quando será executada a função, se for um vetor vazio a função é executada uma vez
  useEffect(() => {
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

  async function handleAddDev(e){
    e.preventDefault();
    const response = await api.post('/devs',{
      github_username,
	    techs,
	    latitude,
	    longitude,
    })
    console.log(response.data)
  }

  return(
    <div id="app"> 
      <aside>
            <strong>Cadastrar</strong>
            <form onSubmit={handleAddDev}>
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
      </aside>

      <main>
          <ul>
              <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/69639482?s=460&u=16ce5200e0562f44d5e8059ad80ed7d0f03fc9de&v=4" alt="Jose Filho Almeida"/>
                    <div className="user-info">
                      <strong>Jose Filho Almeida</strong>
                      <span>ReactJS, React Native, NodeJS</span>
                    </div>
                </header>
                <p className="biografia">Biografia</p> 
                <p>ahsuahsuahsuahsauhsuahsuahsuahsuhasuhaus</p>
                <a href="https://github.com/josefralmeidaads/Estudos">Acessar perfil no GitHub</a>
              </li>

              <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/69639482?s=460&u=16ce5200e0562f44d5e8059ad80ed7d0f03fc9de&v=4" alt="Jose Filho Almeida"/>
                    <div className="user-info">
                      <strong>Jose Filho Almeida</strong>
                      <span>ReactJS, React Native, NodeJS</span>
                    </div>
                </header>
                <p className="biografia">Biografia</p> 
                <p>ahsuahsuahsuahsauhsuahsuahsuahsuhasuhauss</p>
                <a href="https://github.com/josefralmeidaads/Estudos">Acessar perfil no GitHub</a>
              </li>

              <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/69639482?s=460&u=16ce5200e0562f44d5e8059ad80ed7d0f03fc9de&v=4" alt="Jose Filho Almeida"/>
                    <div className="user-info">
                      <strong>Jose Filho Almeida</strong>
                      <span>ReactJS, React Native, NodeJS</span>
                    </div>
                </header>
                <p className="biografia">Biografia</p> 
                <p>ahsuahsuahsuahsauhsuahsuahsuahsuhasuhaus</p>
                <a href="https://github.com/josefralmeidaads/Estudos">Acessar perfil no GitHub</a>
              </li>

              <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/69639482?s=460&u=16ce5200e0562f44d5e8059ad80ed7d0f03fc9de&v=4" alt="Jose Filho Almeida"/>
                    <div className="user-info">
                      <strong>Jose Filho Almeida</strong>
                      <span>ReactJS, React Native, NodeJS</span>
                    </div>
                </header>
                <p className="biografia">Biografia</p> 
                <p>ahsuahsuahsuahsauhsuahsuahsuahsuhasuhaus</p>
                <a href="https://github.com/josefralmeidaads/Estudos">Acessar perfil no GitHub</a>
              </li>              
          </ul>
      </main>
    </div>
  )
  
}

export default App;
