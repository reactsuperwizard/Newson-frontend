import React, { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { BiLockAlt } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function UserSettingsContent() {
  const [validated, setValidated] = useState(false);
  const [passValidated, setPassValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [logo, setLogo] = useState(null);
  const logoInput = useRef(null);
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
        event.preventDefault();
        event.stopPropagation();
        navigate(-1);
    }
  
    setValidated(true);
  };

  const handlePassSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
        event.preventDefault();
        event.stopPropagation();
        setShow(false);
    }
  
    setPassValidated(true);
  };

  const handleCancel = () => navigate(-1);
  const handleShow = () => setShow(!show);

  const logoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setLogo(URL.createObjectURL(e.target.files[0]));
    }
  }

  const removeLogo = () => {
    logoInput.current.value = null;
    setLogo(null);
  }

  const compIndustries = [
    'Accounting',
    'Marketing',
    'Business',
    'Technology',
    'Health'
  ];
  const countries = [
    'Albania',
    'Algeria',
    'Australia',
    'Belgium',
    'Brazil'
  ];

  return (
    <div className='user-settings-content main-bg p-4'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className='row g-0 box-card p-4'>
                <div className='col-md-6 mb-3 pe-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        name='user-settings-email'
                        value={'user@example.com'}
                        disabled
                        />
                    <Form.Control.Feedback type="invalid">
                        Invalid Email.
                    </Form.Control.Feedback>
                </div>
                <div className='col-md-6 mb-3 ps-2'>
                    <Form.Label>Company Logo</Form.Label>
                    <div className='d-flex'>
                        <div>
                            <Form.Control
                                ref={logoInput}
                                type='file'
                                name='user-settings-logo'
                                accept='image/jpeg, image/jpg, image/png'
                                onChange={logoChange}
                                />
                            <Form.Control.Feedback type="invalid">
                                Invalid File.
                            </Form.Control.Feedback>
                        </div>
                        {
                            logo &&
                            <div className='logo-preview'>
                                <img src={logo} alt='' className='ms-3' />
                                <FaTimesCircle size={15} onClick={removeLogo} />
                            </div>
                        }
                    </div>
                </div>
                <div className='col-md-6 mb-3 pe-2'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        name='user-settings-fname'
                        value={'Chris'}
                        />
                    <Form.Control.Feedback type="invalid">
                        Invalid First Name.
                    </Form.Control.Feedback>
                </div>
                <div className='col-md-6 mb-3 ps-2'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        name='user-settings-lname'
                        value={'Evans'}
                        />
                    <Form.Control.Feedback type="invalid">
                        Invalid Last Name.
                    </Form.Control.Feedback>
                </div>
                <div className='col-md-6 mb-3 pe-2'>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        type='text'
                        name='user-settings-comp-name'
                        value={'Chris Marketing'}
                        />
                    <Form.Control.Feedback type="invalid">
                        Invalid Company Name.
                    </Form.Control.Feedback>
                </div>
                <div className='col-md-6 mb-3 ps-2'>
                    <Form.Label>Company Industry</Form.Label>
                    <Form.Select
                        name='user-settings-comp-industry'
                        >
                        {
                            compIndustries.map((item, i) => {
                                return <option key={i} value={item}>{item}</option>
                            })
                        }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Invalid Company Industry.
                    </Form.Control.Feedback>
                </div>
                <div className='col-md-6 mb-3 pe-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                        name='user-settings-country'
                        disabled
                        >
                        {
                            countries.map((item, i) => {
                                return <option key={i} value={item}>{item}</option>
                            })
                        }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Invalid Country.
                    </Form.Control.Feedback>
                </div>
                <div className='col-md-6 mb-3 pe-2'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type='tel'
                        name='user-settings-phone'
                        value={'00000000000'}
                        />
                    <Form.Control.Feedback type="invalid">
                        Invalid Phone.
                    </Form.Control.Feedback>
                </div>
                <div className='pass-btn d-flex align-items-center' onClick={handleShow}>
                    <BiLockAlt size={30} />
                    <p className='ms-3 mb-0'>Change Password</p>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button variant='secondary' className='me-2' onClick={handleCancel}>Cancel</Button>
                    <Button variant='primary' type='submit'>Save</Button>
                </div>
            </div>
        </Form>

        { /***** Change Password Popup *****/ }
        
        <Modal 
            show={show} 
            onHide={handleShow}
            size='lg'
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={passValidated} onSubmit={handlePassSubmit}>
                <Modal.Body>
                    <div className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='change-pass'
                            placeholder={'Enter New Password'}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Invalid Password.
                        </Form.Control.Feedback>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </div>
  )
}
