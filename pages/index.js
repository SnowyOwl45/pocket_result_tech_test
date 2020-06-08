import Link from 'next/link';
import React, { useState }  from 'react';

//Layout
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Ind() {
    const [email, setEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [userTriedToConnect, setUserTriedToConnect] = useState(false)

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const handleChange = (e) => {
        setEmail(e.target.value)
        setEmailIsValid(emailRegex.test(e.target.value))
    }

    const tryToConnect = () => {
        setUserTriedToConnect(true);
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }}>
                    <div className="flexCContainer" style={{marginTop:'100px'}}>
                        <h4 className="title"> Bienvenue sur MyTodo</h4>
                        <label>
                            Indiquez votre adresse mail : 
                        </label>
                        <input
                            className="mailInput"
                            type="email"
                            name="email"
                            value={email}
                            placeholder="jean.dupont@gmail.com"
                            onChange={handleChange} />
                        {userTriedToConnect && !emailIsValid && <div style={{color:'red'}}>
                            L'adresse mail n'est pas valide
                        </div>}
                        {emailIsValid ?
                           <Link href={`/myTodos?e=${email}`}>
                                <button className="validationButton" onClick={tryToConnect}>
                                    Suivant
                                </button>
                            </Link> :
                            <button className="validationButton" onClick={tryToConnect}>
                                Suivant
                            </button>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
