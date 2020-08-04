import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
const Profile = ({ user, ls, userLogout }) => {
    return (
        <React.Fragment>
            {ls.length !== 0 ?
                <React.Fragment>
                    {user.map(items => {
                        return (

                            <div className="profile" key={items.email}>
                                <img src={items.dp} />
                                <h1 className="user-name">{items.name}&nbsp;
                                    <button title="logout" type="button" className="btn btn-sm btn-light" onClick={userLogout}><i className="fad fa-sign-out"></i></button>
                                </h1>
                                <ul className="user-details">
                                    <li><i className="fad fa-mobile"></i> {items.mobile} </li>
                                    <li><i className="fad fa-envelope"></i> {items.email}</li>
                                    <li><i className="fad fa-street-view"></i> {items.city}</li>
                                </ul>
                            </div>)
                    })}
                </React.Fragment>

                : <div className="center-page">
                    <strong>
                        <Router><Link className="ecart-link" to="login">Please Login</Link></Router>
                    </strong>
                </div>
            }
        </React.Fragment>
    )
}
export default Profile;