import React, {useState, useEffect} from 'react';
import api from './services/api.js'
import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([])
  
  useEffect(() => { //Realizando consulta de DEVS apenas UMA VEZ
      async function loadDevs(){
        const response = await api.get('/devs');

        setDevs(response.data); //setando a variável devs o array de devs
      }
      loadDevs();
  }, []);

  async function handleAddDev(data){ // Função Gravar Devs
    const response = await api.post('/devs', data)
    console.log(response.data)
    setDevs([...devs, response.data]); // estou carregando o último dev inserido
  }

  /*async function handleDeleteDev(data){ // Função Gravar Devs
    const response = await api.delete('/devs', data)
    console.log(response.data)
    //setDevs([...devs, response.data]); // estou carregando o último dev inserido
  }*/

  return(
    <div id="app"> 
      <aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
          <ul>
            {devs.map(dev => (
              <DevItem dev={dev} />
            ))}
          </ul>
      </main>
    </div>
  )
  
}

export default App;
