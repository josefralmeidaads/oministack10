import React, { useState, useEffect } from 'react';
import api from './services/api.js'
import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'
import DevForm from './components/DevForm'
import DevList from './components/DevList'

function App() {

  const [devs, setDevs] = useState([])

  useEffect(() => { //Realizando consulta de DEVS apenas UMA VEZ
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data); //setando a variável devs o array de devs
    }
    loadDevs();
  }, []);

  const deleteDev = async (github_username) => {
    await api.delete(`/devs/${github_username}`);
    const devsAtualizados = devs.filter(dev => {
      return dev.github_username !== github_username
    })
    setDevs(devsAtualizados)
  }

  const handleAddDev = async (data) => { // Função Gravar Devs    
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]); // estou carregando o último dev inserido
  }

  const updateDev = async (github_username, techs, latitude, longitude) => {
    alert(latitude, longitude);
    const response = await api.put('/devs', {
   
      github_username,
      techs: "Javascript",
      latitude: 0,
      longitude: 0
      
    });
    //setDevs([...devs, response.data]); // estou carregando o último dev inserido
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <DevList onUpdate={updateDev} onDelete={deleteDev} devs={devs} />
      </main>
    </div>
  )

}

export default App;
