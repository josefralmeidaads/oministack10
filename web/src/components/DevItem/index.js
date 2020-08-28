import React from 'react';
import './style.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

const DevItem = (props) => {

  const { dev, onDelete, onUpdate } = props;

  return (
    <>
      <li key={dev._id} className="dev-item">
        <header>
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </header>
        <p className="biografia">Biografia</p>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
        <IconButton className="button-delete" onClick={() => { onDelete(dev.github_username) }} style={{ "marginLeft": 98 }} aria-label="delete" id="delete" >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Fab color="primary" onClick={() => { onUpdate(dev) }} aria-label="edit" id="edit">
          <EditIcon />
        </Fab>
      </li>

    </>
  )

}

export default DevItem