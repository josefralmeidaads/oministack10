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
  const[sincdata, setSincData] = useState(0)
  const[counter, setCounter] = useState(0);

  useEffect(() => { //Realizando consulta de DEVS apenas UMA VEZ
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data); //setando a variável devs o array de devs
    }
    loadDevs();
  }, [counter, sincdata]);

  const deleteDev = async (github_username) => { // Função Deletar Dev
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

  const updateDev = async (data) => { // Função Atualizar Dev
    await api.put('/devs', data)
    const devsAlterados = devs.slice(0);
    setDevs(devsAlterados);
    zeraCounter();
    setTexto('Salvar');
}

  function estadoControl(data){ // Estado control controla se o botão submit irá salvar ou editar, assim ele envia para a rota certa
      if(counter === 0){
        handleAddDev(data);
        
      } else {
        updateDev(data);
        
      }
  }

  function changeState(github_username, techs){ // recebendo dados de dev do DevItem e passando como tributo para o DevForm
      setCounter(counter + 1);
      
      if (counter === 0){
        setTexto('Salvar');
      } else {
        setGithubUsername(github_username);// recebe dados do components DevItem
        setTechs(techs);// recebe dados do components DevItem
        setTexto('Editar');
      }
  }

  function zeraCounter(){ // zerar o contador para voltar o estado de gravação
    setTexto('Salvar')
    return setCounter(0)
  }

  function sincData(){ // ao clicar no botão atualizar os campos ficam em branco
    setGithubUsername('')
    setTechs('')
    return setSincData(sincdata + 1)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={estadoControl} limpaDado={sincdata} preencheUsername={github_username} preencheTechs={techs} title={texto} atualizaDados={sincData} counter={counter} // contador controla o estados do botão Salvar e editar
        />
      </aside>
      <main>
        <DevList onUpdate={changeState} onDelete={deleteDev} devs={devs} />
      </main>
    </div>
  )

}

export default App;
