import {Container, Row, Col, Button, Alert} from 'react-bootstrap'
import {Routes, Route, Link} from 'react-router-dom'
import style from './../assets/css/guests/guests.module.css'
import Login from './login'
import InputRender from '../components/inputRender'
import { useState } from 'react'
import Axios from 'axios'
const Form = () =>  {
    const [values, setValues] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const submitForm = () => {
        setMessage('');
        setError('');
        console.log('submited');
        let uri = 'http://api.ddev.site/createRequest';

        Axios.post(uri, values)
        .then(() => {
            setMessage('Uzklausa sekmingai issaugota.');
        })
        .catch((err) => {
            if(err.response){
                let errors = err.response.data;
                if(errors.topic){
                    setError(errors.topic[0]);
                }
                if(errors.question){
                    setError(errors.question[0]);
                }
            }
        })
    }

    return (
        <Container className={style.formWrapper}>
            {message !== '' ? <Alert variant='success'>{message}</Alert> : null}
            {error !== '' ? <Alert variant='danger'>{error}</Alert> : null}
            <Row className='mb-3'>
                <Col lg={3}>
                    Tema
                </Col>
                <Col>
                    <InputRender
                        type='text'
                        value={values.topic}
                        change={setValues}
                        inputName='topic'
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg={3}>
                    Klausimas
                </Col>
                <Col>
                    <InputRender
                        type='text'
                        value={values.question}
                        change={setValues}
                        inputName='question'
                    />
                </Col>
            </Row>
            <Button variant='success' onClick={() => submitForm()}>Siusti</Button>
        </Container>
    );
}

export default function Guests(){
    return (
        <Container fluid>
            <header className={style.header}>
                <Row>
                    <Col><Link to='/'>Home</Link></Col>
                    <Col className='text-end'>
                        <Link to='/login'>Prisijungti</Link>
                    </Col>
                </Row>
            </header>
            <main className={style.main}>
                <Routes>
                    <Route index element={<Form/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </main>
            <footer className={style.footer}>
                &copy; By M. Vainoras
            </footer>
        </Container>
    )
}