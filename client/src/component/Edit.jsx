import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import { updateTask, getTask } from '../utils'
import './../css/App.css';

class Add extends Component {

	constructor(props){
		super(props)
			this.state = {
				title : '',
				loading : ''
			}

		this.validator = new SimpleReactValidator();

    }
    
    async componentDidMount(){
        const {  match : { params }, history } = this.props
        const res = await getTask(params.id)
        if(res.status){
            if(res.data && res.data.title){
                this.setState({title: res.data.title})
            }else{
                toast.error('Something went wrong!')
                history.push('/home')
            }
        }else{
            toast.error('Something went wrong!')
            history.push('/home')
        }
    }

	setVal = (event) => {
		var obj = {};
    	obj[event.target.name] = event.target.value;
		this.setState(obj);
	}

	handelLogin = async () => {
		const { title } = this.state
		const { history, match : { params } } = this.props
		if( this.validator.allValid() ){
			this.setState({loading: true})
		  const res = await updateTask({title, id: params.id});
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
      console.log(this.props.match.params)
	  const { title, loading } = this.state
    return (
      <div className="container">
    	<div className="row justify-content-center">
        	<div className="col-md-8">
            	<div className="card">
                	<div className="card-header">Edit Task<Link to="/home"><a href="#/" className="float-right">Back</a></Link></div>
						<div className="card-body">
                			<div className="form-group row">
                            	<label htmlFor="email" className="col-md-4 col-form-label text-md-right">Task
                            	</label>
                            	<div className="col-md-6">
                                <input ref='title' type="text" name="title" value={title} onChange={this.setVal} autoComplete='off'/>
                                <p className='text-danger'>{this.validator.message('Task', title, 'required')}</p>
                            	</div>
                        	</div>

                        	<div className="form-group row mb-0">
                            	<div className="col-md-8 offset-md-4">
									<button type="submit" className="btn btn-primary" disabled={loading} onClick={this.handelLogin}>{ loading ? 'Processing...' : 'Update Task'}</button>
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

export default Add;