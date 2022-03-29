import {useState, useContext} from 'react'
import {Container, Row, Col, Button, Alert} from 'react-bootstrap'
import style from '../assets/css/guests/login.module.css'
import Axios from 'axios'
import InputRender from '../components/inputRender';
import Cookies from 'universal-cookie'
import { IsLogged } from '../settings/contexts';

const cookie = new Cookies();

export default function Login () {
    const [values, setValues] = useState([]);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const {setLogged} = useContext(IsLogged);

    const submitForm = () => {
        let uri = 'http://api.ddev.site/login';

        Axios.post(uri, values)
        .then((result) => {
            console.log(result);
            cookie.set('token', result.data.access_token);
            setLogged(true);
        })
        .catch((err) => {
            if(err.response) {
                let error = err.response.data;
                if(error.email){
                    setEmailError(error.email[0])
                }
                if(error.password){
                    setPasswordError(error.password[0])
                }
            }
        })
    }

    return (
        <Container className={style.formWrapper}>
            {emailError !== '' ? <Alert variant='danger'>{emailError}</Alert> : null}
            {passwordError !== '' ? <Alert variant='danger'>{passwordError}</Alert> : null}

            <Row className='mb-3'>
                <Col lg={3}>
                    El. pastas
                </Col>
                <Col>
                    <InputRender
                        type='text'
                        value={values.email}
                        change={setValues}
                        inputName='email'
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg={3}>
                    Slaptazodis
                </Col>
                <Col>
                    <InputRender
                        type='password'
                        value={values.password}
                        change={setValues}
                        inputName='password'
                    />
                </Col>
            </Row>
            <Button onClick={submitForm} variant='success'>Siusti</Button>
        </Container>
    );
}