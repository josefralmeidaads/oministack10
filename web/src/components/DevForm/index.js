import React, { useState, useEffect } from 'react';
import './style.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Cancel from '@material-ui/icons/Cancel';

function DevForm(props) {

  const {
    dev,
    onSubmit,
    onCancelUpdate,
  } = props;

  const initialData = {
    github_username: '',
    techs: [],
  };

  const [data, setData] = useState(initialData)

  // useEffect serve para executar uma função, e usar uma variável para dizer quando será executada a função, se for um vetor vazio a função é executada uma vez
  useEffect(() => { //Obtendo Geolocalização
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setData({ ...data, latitude, longitude })
      }, (err) => {
        console.log(err);
      },
      {
        timeout: 300000,
      }
    )
  }, []);

  useEffect(() => { // se o botão reload for pressionado ele muda o valor do estado e faz a aplicação carregar os dados novamente
    setData(dev)
  }, [dev])

  async function handleSubmit(e) {
    e.preventDefault();
    const isNewRecord = dev.github_username === ''
    await onSubmit(data, isNewRecord);
    setData(initialData)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={data.github_username || ''}
            onChange={e => {
              const github_username = e.target.value
              setData({ ...data, github_username })
            }}></input>
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={data.techs || ""}
            onChange={e => {
              const techs = e.target.value
              setData({ ...data, techs })
            }}></input>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={data.latitude || ""}
              onChange={e => {
                const latitude = e.target.value
                setData({ ...data, latitude })
              }}>
            </input>
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={data.longitude || ""}
              onChange={e => {
                const longitude = e.target.value
                setData({ ...data, longitude })
              }}
            >
            </input>
          </div>
        </div>
        <Button variant="contained" color="secondary" type="submit" startIcon={<SaveIcon />}>
          {dev.github_username === "" ?
            'Atualizar' :
            'Salvar'}
        </Button>
        {
          dev.github_username &&
          <Fab color="primary" aria-label="add" className="reload" id="refresh" onClick={onCancelUpdate}>
            <Cancel />
          </Fab>
        }

      </form>
    </>
  )
}

export default DevForm;