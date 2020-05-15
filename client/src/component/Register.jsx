import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
import { registerUser } from '../utils'
import './../css/App.css';
import { Link } from 'react-router-dom';

class Register extends Component {

	constructor(props){
		super(props)
			this.state = {
				email : '',
                password : '',
                name: '',
				loading : ''
			}

		this.validator = new SimpleReactValidator();

    }
    
    componentDidMount(){
		const isloggedIn = cookie.load('token')
		if(isloggedIn){
			this.props.history.push('/home')
		}
	}

	setVal = (event) => {
		var obj = {};
    	obj[event.target.name] = event.target.value;
		this.setState(obj);
	}

	handelRegister = async () => {
		const { email, password, name } = this.state
		const { history } = this.props
		if( this.validator.allValid() ){
			this.setState({loading: true})
		  const res = await registerUser({email, password, name});
		  if(res.status){
				toast.success(res.msg)
				history.push('/home')
				this.setState({loading: ''})
		  }else{
			toast.error(res.msg)
			this.setState({loading: ''})
		  }
	    } else {
	      this.validator.showMessages();
	      this.forceUpdate();
	    }

	}

  render() {
	  const { email, password, loading, name } = this.state
    return (
      <div className="container">
    	<div className="row justify-content-center">
        	<div className="col-md-8">
            	<div className="card">
                	<div className="card-header">Signup<Link to="/"><a href="#/" className="float-right">Login</a></Link></div>
						<div className="card-body">
                            <div className="form-group row">
                            	<label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name
                            	</label>
                            	<div className="col-md-6">
                                <input ref='name' type="text" name="name" onChange={this.setVal} autoComplete='off'/>
                                <p className='text-danger'>{this.validator.message('name', name, 'required')}</p>
                            	</div>
                        	</div>

                			<div className="form-group row">
                            	<label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email
                            	</label>
                            	<div className="col-md-6">
                                <input ref='email' type="email" name="email" onChange={this.setVal} autoComplete='off'/>
                                <p className='text-danger'>{this.validator.message('email', email, 'required')}</p>
                            	</div>
                        	</div>

                        	<div className="form-group row">
                            	<label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password
                            	</label>
								<div className="col-md-6">
                                	<input ref="password" type="password" name='password' onChange={this.setVal}/>
                                	<p className='text-danger'>{this.validator.message('Password', password, 'required')}</p>
                            	</div>
                        	</div>

                        	<div className="form-group row mb-0">
                            	<div className="col-md-8 offset-md-4">
									<button type="submit" className="btn btn-primary" disabled={loading} onClick={this.handelRegister}>{ loading ? 'Processing...' : 'Sign Up'}</button>
                                </div>
                        	</div>
                        </div>
            		</div>
		        </div>
		    </div>
		</div>
    );
  }
}

export default Register;