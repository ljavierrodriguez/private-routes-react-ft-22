import React, { useContext, useEffect } from 'react'
import { Context } from '../store/AppContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const { store, actions } = useContext(Context);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(store?.currentUser !== null){
            navigate('/dashboard')
        }
    }, [store?.currentUser])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <form className='w-50 mx-auto m-5 p-3 shadow' onSubmit={(e) => actions.handleSubmitLogin(e, toast, navigate) }>
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input className='form-control' type="email" name="username" id="username" placeholder='username@domain.com' value={store.username} onChange={actions.handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input className='form-control' type="password" name="password" id="password" placeholder='********' value={store.password} onChange={actions.handleChange} />
                        </div>
                        <button className="btn btn-primary btn-sm w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login