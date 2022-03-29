import {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import {IsLogged} from './settings/contexts'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Guests from './guests/index'
import Admin from './admin/index'

import './assets/css/default.css'

function App() {
  const [logged, setLogged] = useState(false);

  
  return (
    <IsLogged.Provider value={{logged, setLogged}}>
      <Container fluid className='p-0'>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={logged ? <Admin/> : <Guests/>}/>
            
          </Routes>
        </BrowserRouter>
      </Container>
    </IsLogged.Provider>

  );
}

export default App;
