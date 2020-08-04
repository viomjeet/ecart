import React, { useState, useRef } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap'
const Login = (props) => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div className="form_center">

            <div ref={ref}>
                <Overlay show={show} target={target} placement="bottom" container={ref.current} containerPadding={20}>
                    <Popover id="popover-contained">
                        <Popover.Title as="h3">Login details</Popover.Title>
                        <Popover.Content><strong>Email: </strong>demo@mail.com<br />
                            <strong>Password: </strong>demo@123</Popover.Content>
                    </Popover>
                </Overlay>
            </div>

            <div className="form_center_in">
                <h4 className="form_center_title">Login Page <span onClick={handleClick} className="login-info">
                    {show ? <i className="fa fa-times"></i> : <i className="fa fa-info"></i>}
                </span></h4>
                <form onSubmit={props.loginSubmit}>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white"><i className="fal fa-envelope-open"></i></span>
                            </div>
                            <input type="email"
                                className="form-control"
                                name="email"
                                value={props.email}
                                onChange={props.inputChange}
                                required
                                placeholder="Email..."
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white"><i className="fal fa-key"></i></span>
                            </div>
                            <input type="password"
                                className="form-control"
                                name="password"
                                value={props.password}
                                onChange={props.inputChange}
                                required
                                placeholder="Password..."
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block btn-success">Login <i className="fad fa-sign-in"></i></button>
                    </div>
                    {props.message.error ?
                        <div className="alert cus-alert alert-danger">
                            <strong>Error...</strong> <span>{props.message.error}</span>
                        </div> : null}


                </form>
            </div>
        </div>
    )
}
export default Login;
