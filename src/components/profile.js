import React, { Component } from 'react'

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;
        let ls = this.props.ls;
        return (
            <React.Fragment>
                {ls.length !== 0 ?
                    <React.Fragment>
                        {user.map(items => {
                            return (

                                <div className="profile" key={items.email}>
                                    <img src={items.dp} />
                                    <h1 className="user-name">{items.name}</h1>
                                    <ul className="user-details">
                                        <li><i className="fad fa-mobile"></i> {items.mobile} </li>
                                        <li><i className="fad fa-envelope"></i> {items.email}</li>
                                        <li><i className="fad fa-street-view"></i> {items.city}</li>
                                    </ul>
                                </div>)
                        })}
                    </React.Fragment>

                    : <div className="center-page">
                        <strong><a className="ecart-link" href="/login">Please Login</a></strong>
                    </div>
                }
            </React.Fragment>
        )
    }
}
export default Profile;