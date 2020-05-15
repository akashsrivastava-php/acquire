import React, { Component } from 'react';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
import { logoutUser, getTaskList, changeStatus, deleteTask } from '../utils'
import loader from '../loader.gif'
import { Link } from 'react-router-dom';

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			taskList: []
		}
	}

	componentDidMount(){
		this.taskList()
	}

	taskList = async () => {
		const res = await getTaskList()
		if(res.status){
			this.setState({ taskList: res.data })
		}else{
			toast.success('Someting went wrong!')
		}
	}

	handelLogout = async () => {
		const res = await logoutUser()
		if(res.status){
			toast.success(res.msg)
			this.props.history.push('/')
		}
	}

	handelStatus =  async (e, id) => {
		const val = e.target.value
		console.log('===>', val)
		const status = val == 1 ? 'Closed' : 'Pending'
		e.target.innerText = status
		e.target.value = val == 1 ? 0 : 1
		await changeStatus({id, status: !val})
	}

	handeldelete = async (id) => {
		await deleteTask(id)
		this.taskList()
	}

  render() {
	  const { taskList } = this.state
	  const { history } = this.props
    return (
      <div className="container">
    	<div className="row justify-content-center">
        	<div className="col-md-8">
            	<div className="card">
                	<div className="card-header"><p className="float-left">To Do List</p><a href="#/" onClick={()=>this.handelLogout()} className="float-right ml-3">Logout</a><Link to="/add"><a href="#/" className="float-right ml-3">Add Task</a></Link><Link to="/profile"><a href="#/" className="float-right">Profile</a></Link></div>
						<div className="card-body">
                			<div className="form-group row">
								<table className="table">
									<thead>
										<th>
											<td>Task</td>
										</th>
										<th>
											<td>Date</td>
										</th>
										<th>
											<td>Status</td>
										</th>
										<th>
											<td>Action</td>
										</th>
									</thead>
									<tbody>
										{
											taskList.length > 0 ?
											taskList.map((val, key)=>{
												return(
													<tr key={key}>
														<td>{val.title}</td>
														<td>{val.createdAt}</td>
														<td><button type="button" class="btn btn-outline-info" value={val.status} onClick={(e)=>this.handelStatus(e, val.id)}>{val.status ? 'Pending' : 'Closed'}</button></td>
														<td><button type="button" class="btn btn-outline-primary" onClick={()=>history.push(`/edit/${val.id}`)}>Edit</button><button type="button" class="btn btn-outline-danger ml-2" onClick={()=>this.handeldelete(val.id)}>Delete</button></td>
													</tr>
												)
											}) :
											<tr>
												<td colSpan="4" className="text-center">No Task Found! </td>
											</tr>
										}
									</tbody>
								</table>
                        	</div>
                        </div>
            		</div>
		        </div>
		    </div>
		</div>
    );
  }
}

export default Dashboard;
