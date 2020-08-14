import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import './global.css'
import './App.css'
import './SideBar.css'

function App() {
  
  return(
    <div id="app"> 
      <aside>
            <strong>Cadastrar</strong>
            <form>
                <div class="input-block">
                    <label htmlFor="github_username">Usuário do GitHub</label>
                    <input name="github_username" id="github_username" required></input>
                </div>

                <div class="input-block">
                  <label htmlFor="techs">Tecnologias</label>
                  <input name="techs" id="techs" required></input>
                </div>

              <div className="input-group">
                <div class="input-block">
                  <label htmlFor="latitude">Latitude</label>
                  <input name="latitude" id="latitude" required></input>
                </div>
              
                <div class="input-block">
                  <label htmlFor="longitude">Longitude</label>
                  <input name="longitude" id="longitude" required></input>
                </div>
              </div>    
              <Button variant="contained" color="secondary" type="submit" startIcon={<SaveIcon />}>Salvar</Button>
            </form>
      </aside>
      <main>

      </main>
    </div>
  )
  
}

export default App;
