import React from 'react';


class MsgBox extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			msg: ''
		}

		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.msgUpdate = this.msgUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	msgUpdate(event) {
//		console.log('newMsge............', newMsg)
		this.setState({ msg: event.target.value })
	}

	handleSubmit(e){
		let msg = "Guest: " + this.state.msg;
		this.props.onMessageSubmit( msg );
		e.preventDefault();
//		let msg = '';
		this.setState({ msg:''});
	}
	
	componentDidUpdate(){
//		console.log(this.messageList.scrollHeight);
		this.scrollToBottom();
	}

	scrollToBottom(){
//		const scrollHeight = this.messageList.scrollHeight;
		this.messageList.scrollTop = this.messageList.scrollHeight;
	}

	render(){

		return(
			<div>
				<div className="panel-footer" >
				<label>
					Message Board
				</label>
				</div>

			<div style={{ maxHeight:'300px', overflowY:'auto' }} ref={ (div) => { this.messageList = div } } >
				<div id="msgBox" className="panel-footer" style={{ overflowX: "hidden", overflowY:'auto' }}>
				<ul>
			{ this.updateScroll }	
				{ this.props.msgs.map( ( msg, idx ) => {
					return(
						<li key = { idx } style={{ listStyleType: 'none' }}> { msg } </li>	
					)
				  })
				}	
		 		</ul>
				</div>
			</div>

			<div>&nbsp;</div>
			<form onSubmit = { this.handleSubmit }>
				<div className="form-group">
					<input value = { this.state.msg } type="text" style={{ width: '100%' }} onChange = { this.msgUpdate } ></input>
				</div>
			</form>
			</div>
		)
	}
}


export default MsgBox;
