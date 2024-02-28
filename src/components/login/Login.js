
import '../login/login.css';
import img from '../assets/glogo.png'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { resolver } from "../../graphql_queries/graphqlWrapper.js"

import Query from "../../graphql_queries/graphql_queries.js"
import { queryBuilder } from '../../graphql_queries/test.js';
import { AuthContext } from '../../services/AuthContext.js';

export default function Login() {

    const [inputpassword, setPassword] = useState("");
    const [inputemail, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    //const [data,setdata]=useState("");
    const navigate = useNavigate();
    const { isLoggedIn, login } = useContext(AuthContext);

    const [Loginfunc] = useLazyQuery(gql`
    query Login($details: userLogin) {
        login(details: $details) {
          token
        }
      }`, {
        onCompleted: (data) => {
            if (data.login && data.login.token) {
                const token = data.login.token;
                localStorage.setItem('authToken', token);
                setLoggedIn(true)
                login()
            }
            else {
                console.error('Error signing up: No token received.');
            }
        },
        onError: (error) => {
            console.error('Error signing up:', error.message);

        }
    });

    // async function Loginfunc(variables){
    //     const {data} = await resolver(queryBuilder("login",variables.details,["token"]));
    //     console.log(data);
    // }
    if (loggedIn) {
        navigate('/');
    }

    return (
        <div className='d'>
            <div className='parent'>
                <div className="content">
                    <div className='log'>
                        <h1>Login</h1>
                    </div>
                    <div className='ifield'>
                        <input type="input" placeholder='Email' value={inputemail}
                            onChange={(e) => {
                                setEmail(e.target.value.toLowerCase());
                            }} required />
                        <input id='input2' type="password" placeholder='password'
                            onChange={(e) => {
                                setPassword(e.target.value.toLowerCase());
                            }} required />
                    </div>
                    <div className='chk'>
                        <div>
                            <input type="checkbox" id='remeber' />
                            <label htmlFor="remeber" style={{ marginLeft: '3px' }}>Remeber me</label>
                        </div>
                        <p>Forget password?</p>
                    </div>
                    <div className='tc'>
                        <div>
                            <input type="checkbox" id='accept' style={{ marginRight: '4px' }} />
                            <label htmlFor="accept" required>I accept this</label>
                        </div>
                        <div style={{ marginRight: '5px', fontSize: '1em', paddingLeft: '3px', color: '#54AEFF' }}>
                            <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                        </div>

                    </div>
                    <div className='btn1' onClick={() => {
                        Loginfunc({ variables: { details: { "usermail": inputemail, "password": inputpassword } } })

                    }}>
                        <p>Login</p>
                    </div>
                    <div className='btn2'>
                        <img src={img} alt="" />
                        <p>Continue with Login</p>
                    </div>
                    <div className='start'>
                        <p>Don't have an account?</p>
                        <Link to={'/signup'}><div>Get started</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
