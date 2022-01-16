import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component{
    render() {
        const logoutSubmit = (e) => {
            e.preventDefault();
            axios.post('/api/logout').then(res => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                alert(res.data.msg);
                window.location = '/crud-api-login';
            }).catch(error => {
                console.log(error);
            });
        }

        return (
            <div className="ct-header">
                <Link to="/" className={this.props.txtColor1}>READ-JSON</Link>
                <Link to="/fake-crud" className={this.props.txtColor2}>FAKE-CRUD</Link>
                <Link to="/crud-fetch" className={this.props.txtColor3}>CRUD-FETCH</Link>
                <Link to="/crud-axios" className={this.props.txtColor4}>CRUD-AXIOS</Link>
                <div class="dropdown">
                    <button className={this.props.txtColor5} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            CRUD-API
                    </button>
                    {localStorage.getItem('auth_token')
                        ?
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item nav-item" href="#" onClick={logoutSubmit}>LOG-OUT</a></li>
                        </ul>
                        :
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link to="/crud-api-signin" className="text-decoration-none"><li><a className="dropdown-item nav-item" href="#">SIGN-IN</a></li></Link>
                            <Link to="/crud-api-login" className="text-decoration-none"><li><a className="dropdown-item nav-item" href="#">LOG-IN</a></li></Link>
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

export default Navbar;



