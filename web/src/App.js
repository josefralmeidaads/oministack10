import React, { useState, useEffect } from 'react';
import api from './services/api.js'
import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'
import DevForm from './components/DevForm'
import DevList from './components/DevList'

function App() {
  const[texto, setTexto] = useState('Salvar');
  const[devs, setDevs] = useState([])
  const[github_username, setGithubUsername] = useState('')
  const[techs, setTechs] = useState('')
  const[counter, setCounter] = useState(0);

  useEffect(() => { //Realizando consulta de DEVS apenas UMA VEZ
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data); //setando a variável devs o array de devs
    }
    loadDevs();
  }, [counter]);

  const deleteDev = async (github_username) => {
      await api.delete(`/devs/${github_username}`);
      const devsAtualizados = devs.filter(dev => {
          return dev.github_username !== github_username
      })
          setDevs(devsAtualizados);
  }

  const handleAddDev = async (data) => { // Função Gravar Devs    
      const response = await api.post('/devs', data)
      setDevs([...devs, response.data]); // estou carregando o último dev inserido
      zeraCounter();
  }

  const updateDev = async (data) => {
    await api.put('/devs', data)
    const devsAlterados = devs.slice(0);
    setDevs(devsAlterados);
    zeraCounter();
    setTexto('Salvar');
}

  function estadoControl(data){
      if(counter === 0){
        handleAddDev(data);
        
      } else {
        updateDev(data);
        
      }
  }

  function changeState(github_username, techs){
      setCounter(counter + 1);
      
      if (counter === 0){
        setTexto('Salvar');
      } else {
        setGithubUsername(github_username);
        setTechs(techs);
        setTexto('Editar');
      }
  }

  function zeraCounter(){
    setTexto('Salvar')
    return setCounter(0)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={estadoControl} preencheUsername={github_username} preencheTechs={techs} title={texto} devs={devs} counter={counter}/>
      </aside>
      <main>
        <DevList onUpdate={changeState} onDelete={deleteDev} devs={devs} />
      </main>
    </div>
  )

}

export default App;
