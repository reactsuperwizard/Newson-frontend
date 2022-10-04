import React, { useState, useRef } from 'react'
import EmailBox from './EmailBox';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import routes from '../../Config/routes/api';

const { googleAuthRoute } = routes;

export default function EmailIntegrationContent() {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const smtpPort = useRef(null);
    const imapPort = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(false);
            setShow(false);
            navigate('/email-integration');
        }
      };
    const handleShow = () => setShow(!show);

    const emailBoxes = [
        {
            id: '1',
            title: 'Gmail',
            type: 'gmail',
            desc: 'You can send emails in Campaigns using your Gmail account.',
            onClick: () => googleAuthRoute(),
        },
        {
            id: '2',
            title: 'Outlook',
            type: 'outlook',
            desc: 'You can send emails in Campaigns using your Outlook account.',
            onClick: () => null,
        },
        {
            id: '3',
            title: 'SendGrid',
            type: 'sendgrid',
            desc: 'You can send emails in Campaigns using your SendGrid account.',
            onClick: () => null,
        },
        {
            id: '4',
            title: 'Email via SMTP',
            type: 'smtp',
            desc: 'You can send emails in Campaigns using your SMTP account.',
            onClick: () => handleShow(),
        }
    ];
  return (
    <div className='email-integration-content'>
        <div className='row g-0'>
            <div className='col-md-12'>
                <div className='d-flex flex-wrap main-bg p-4 custom-scrollbar'>
                    {emailBoxes.slice(0,3).map(function(item){
                        return <EmailBox key={item.id} data={item} />
                    })}
                    {emailBoxes.slice(3,4).map(function(item){
                        return <EmailBox key={item.id} data={item} popupHandle={handleShow} />
                    })}
                </div>
                <Modal 
                    show={show} 
                    onHide={handleShow}
                    size='lg'
                    centered
                    >
                    <Modal.Header closeButton>
                    <Modal.Title>Connect SMTP Email</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Modal.Body>
                            <div className='row g-0'>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='smtp-user'
                                        placeholder='Enter Username'
                                        required
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid Username.
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-md-6 ps-2 mb-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='smtp-pass'
                                        placeholder='Enter Password'
                                        required
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid password.
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <Form.Label>SMTP Server</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='smtp-smtp-server'
                                        placeholder='Enter SMTP Server e.g. smtp.gmail.com'
                                        required
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid SMTP Server.
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <Form.Label>IMAP Server</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='smtp-imap-server'
                                        placeholder='Enter IMAP Server'
                                        required
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid IMAP Server.
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <Form.Label>SMTP Port</Form.Label>
                                    <Form.Control
                                        type='number'
                                        name='smtp-smtp-port'
                                        placeholder='Enter Port'
                                        ref={smtpPort}
                                        required
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid Port.
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <Form.Label>IMAP Port</Form.Label>
                                    <Form.Control
                                        type='number'
                                        name='smtp-imap-port'
                                        placeholder='Enter Port'
                                        ref={imapPort}
                                        required
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid Port.
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <div className='d-flex justify-content-between'>
                                        <Form.Check
                                            type='radio'
                                            name='smtp-smtp-ports'
                                            label='SSL'
                                            onChange={e => e.target.checked ? smtpPort.current.value = 465 : ''}
                                            className='me-3'
                                            />
                                        <Form.Check
                                            type='radio'
                                            name='smtp-smtp-ports'
                                            label='TLS'
                                            onChange={e => e.target.checked ? smtpPort.current.value = 587 : ''}
                                            className='me-3'
                                            />
                                        <Form.Check
                                            type='radio'
                                            name='smtp-smtp-ports'
                                            label='None'
                                            onChange={e => e.target.checked ? smtpPort.current.value = 25 : ''}
                                            className='me-3'
                                            />
                                    </div>
                                </div>
                                <div className='col-md-6 pe-2 mb-2'>
                                    <div className='d-flex'>
                                        <Form.Check
                                            type='radio'
                                            name='smtp-imap-ports'
                                            label='SSL'
                                            onChange={e => e.target.checked ? imapPort.current.value = 993 : ''}
                                            className='me-3'
                                            />
                                        <Form.Check
                                            type='radio'
                                            name='smtp-imap-ports'
                                            label='TLS'
                                            onChange={e => e.target.checked ? imapPort.current.value = 993 : ''}
                                            className='me-3'
                                            />
                                        <Form.Check
                                            type='radio'
                                            name='smtp-imap-ports'
                                            label='None'
                                            onChange={e => e.target.checked ? imapPort.current.value = 143 : ''}
                                            className='me-3'
                                            />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type='submit' variant="primary">
                            Connect
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </div>
    </div>
  )
}
