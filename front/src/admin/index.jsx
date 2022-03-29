import {useEffect, useState, useContext} from 'react'
import {Container, Row, Col, Table, Modal, Button, Alert} from 'react-bootstrap'
import Cookies from 'universal-cookie';
import Axios from 'axios'
import { IsLogged } from '../settings/contexts';
const cookie = new Cookies();

export default function Admin(){
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(undefined);
    const {setLogged} = useContext(IsLogged);
    const [newStatus, setNewStatus] = useState('');
    const [message, setMessage] = useState('');
    const [needRefresh, setNeedRefresh] = useState(false);
    const arr = [
        {
            id: 1,
            tema: 'Test',
            notes: 'labas',
            status: 'Neperziuretas'
        },
        {
            id: 2,
            tema: 'Test 1',
            notes: 'labas 1',
            status: 'perziuretas'
        },
        {
            id: 3,
            tema: 'Test 2',
            notes: 'labas 2',
            status: 'atsakytas'
        }
    ];

    useEffect(() => {
        let uri = 'http://api.ddev.site/getAll';
        let token = cookie.get('token');
        let config = {
            headers: {
                'Authorization': `bearer ${token}`
            }
        }

        Axios.get(uri, config)
        .then((result) => {
            setData(result.data)
        })
        .catch((err) => {
            if(err.response){
                if(err.response.status === 401) {
                    setLogged(false);
                }
            }
        })

    }, [needRefresh])

    useEffect(() => {
        if(id !== ''){
            let uri = `http://api.ddev.site/getRequest/${id}`;
            let token = cookie.get('token');
            let config = {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            }
            Axios.get(uri, config)
            .then((result) => {
                setItem(result.data)
            })
            .catch((err) => {
                if(err.response){
                    if(err.response.status === 401) {
                        setLogged(false);
                    }
                }
            })
        }
    }, [id])

    const submitForm = () => {
        if(id !== undefined && newStatus !== '') {
            let uri = `http://api.ddev.site/updateRequest/${id}`;
            let token = cookie.get('token');
            let config = {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            }
            Axios.put(uri,{status: newStatus}, config)
            .then(() => {
                setNeedRefresh(true);
                setMessage('Sekmingai atnaujinta');
            })
            .catch((err) => {
                if(err.response){
                    if(err.response.status === 401) {
                        setLogged(false);
                    }
                }
            })
        }
    }

    return (
        <Container fluid className='mt-3'>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message !== '' ? <Alert variant='success'>{message}</Alert> : null}
                    <Row>
                        <Col>
                            Tema:
                        </Col>
                        <Col>
                            {item.topic}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Klausimas:
                        </Col>
                        <Col>
                            {item.question}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Busena:
                        </Col>
                        <Col>
                            {item.status === '0' ? `Netikrinta`
                            : item.status === '1' ? 'Perziureta'
                            : 'Isspresta'
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Atnaujinti statusa:
                        </Col>
                        <Col>
                            <select onChange={(e) => {setNewStatus(e.target.value)}}>
                                <option value='0'>Netikrinta</option>
                                <option value='1'>Perziureta</option>
                                <option value='2'>Isspresta</option>
                            </select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowModal(false); setId('')}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => submitForm()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <main>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tema</th>
                            <th>Pastabos</th>
                            <th>Busena</th>
                            <th>Veiksmas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((values, key) => {
                                let status;
                                if(values.status === '0'){status = 'Netikrinta'}
                                if(values.status === '1'){status = 'Tikrinta'}
                                if(values.status === '2'){status = 'Isspresta'}
                                return (
                                    <tr key={key}>
                                        <th>{values.id}</th>
                                        <th>{values.topic}</th>
                                        <th>{values.question}</th>
                                        <th>{status}</th>
                                        <th>
                                            <span
                                                onClick={() => {setShowModal(true); setId(values.id)}}
                                                className="material-icons-outlined"
                                            >Redaguoti</span>
                                        </th>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </main>
            <footer className='border-top border-secondary pt-2 pe-2'>
                <Row>
                    <Col className='text-start'>
                        <Button variant='danger' onClick={() => {setLogged(false); cookie.remove('token')}}>Atsijungti</Button>
                    </Col>
                    <Col className='text-end'>
                        &copy; By M. Vainoras
                    </Col>
                </Row>
            </footer>
        </Container>
    )
}