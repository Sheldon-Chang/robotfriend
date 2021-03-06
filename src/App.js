import React,{Component} from 'react';       //App.js is father of component
import CardList from '../components/CardList';
import Scroll from '../components/scroll'
import SearchBox from '../components/searchBox';
import './App.css'


//STATE >>props parent can change the following value and feed state to children , props is come out of state


class App extends Component{       //or React.Component
	constructor(){
		super();
		this.state = {
			robots :[],
			searchfield:''
		}
	}
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users=>this.setState({robots:users}))                    
	}
	onSearchChange=(event)=>{       //if don't use bind or arrow function , this is refer to searchbox->input
		this.setState({searchfield:event.target.value});  //equal to this.state.searchfield
		
	}
	render(){
		const{robots,searchfield}=this.state;
		const filterRobots=robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		
			return !robots.length?<h1>Loading</h1>:
			(
			<div className='tc'>
				<h1 className='f1'>RobotFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots={filterRobots}/>
				</Scroll>
			</div>
			)
		}	
	
	}
}

export default App;