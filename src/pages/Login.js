import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Login() {
  const [validate, setValidate] = useState(false)
  function login() {
    setValidate(true)
  }
  return (
    <div className="row">
      <div className="col-8">
        <Form noValidate validated={validate}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please fill it</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" minLength="6" required />
            <Form.Control.Feedback type="invalid">Password must be more than 6 characters</Form.Control.Feedback>
          </Form.Group>
          <div className="row" >
            <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button variant="outline-primary" onClick={() => login()} >Submit</Button>
            </div>
            <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outline-primary" onClick={() => login()} >Submit</Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="col-4">
        <h1>Login</h1>
      </div>
    </div>

  )
}