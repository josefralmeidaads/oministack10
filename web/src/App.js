import React, { useState, useEffect } from 'react';
import api from './services/api.js'
import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'
import DevForm from './components/DevForm'
import DevList from './components/DevList'

function App() {

  const initialData = {
    github_username: '',
    techs: [],
  };

  const [devs, setDevs] = useState([])
  const [dev, setDev] = useState(initialData)
  useEffect(() => { //Realizando consulta de DEVS apenas UMA VEZ
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data); //setando a variável devs o array de devs
    }
    loadDevs();
  }, []);

  const deleteDev = async (github_username) => { // Função Deletar Dev
    await api.delete(`/devs/${github_username}`);
    const devsAtualizados = devs.filter(dev => {
      return dev.github_username !== github_username
    })
    setDevs(devsAtualizados);
  }

  const addDev = async (data) => { // Função Gravar Devs    
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]); // estou carregando o último dev inserido
  }

  const updateDev = async (data) => { // Função Atualizar Dev    
    await api.put('/devs', data)
    const newDevs = devs.map(item => {
      if (item.github_username === data.github_username) {
        data.techs = data.techs.split(', ')
        return data
      } else {
        return item
      }
    })
    setDevs(newDevs);
  }

  function handleOnSave(data, isNewRecord) { // Estado control controla se o botão submit irá salvar ou editar, assim ele envia para a rota certa    
    if (isNewRecord) {
      addDev(data);
      return
    }
    updateDev(data);

  }

  function handleOnUpdate(dev) { // recebendo dados de dev do DevItem e passando como tributo para o DevForm
    setDev(dev);
  }

  function handleCancelUpdate() { // recebendo dados de dev do DevItem e passando como tributo para o DevForm
    setDev(initialData);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm
          onCancelUpdate={handleCancelUpdate}
          onSubmit={handleOnSave}
          dev={dev}
        />
      </aside>
      <main>
        <DevList onClickUpdate={handleOnUpdate} onDelete={deleteDev} devs={devs} />
      </main>
    </div>
  )
}

export default App;
