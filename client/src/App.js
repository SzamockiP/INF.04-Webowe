import axios from 'axios';
import { useState, useEffect} from 'react';
import ListItem from './components/ListItem';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
	//////////////////////////////
	// Define states
	//////////////////////////////

	// Items is an array of displayed items
	const [items, setItems] = useState([]);

	// Search is a string used to filter items
	const [search, setSearch] = useState();

	// NewItem is a string used to add new items
	const [newItem, setNewItem] = useState();


	//////////////////////////////
	// Define handlers
	//////////////////////////////

	// getHandler is used to get all items from the database
	const getHandler = () => {
		axios.get(`http://localhost:3001/list`)
		.then(res => {
			setItems(res.data);
		})
		.catch(err => {
			console.error(err);
		});
	}

	// deleteHandler is used to delete an item from the database
	const deleteHandler = (id) => {
		// uses query parameter
		axios.delete('http://localhost:3001/list/delete',  {params:{id: id}})
		.then(res => {
			getHandler();
		})
		.catch(err => {
			console.error(err);
		});
	}

	// addHandler is used to add an item to the database
	const addHandler = () => {

		// uses body parameter
		axios.post('http://localhost:3001/list/create', {data: newItem})
		.then(res => {
			getHandler();
		})
		.catch(err => {
			console.error(err);
		});
	}

	// searchHandler is used to search for items in the database
	const searchHandler = () => {

		if(search === '')
			return getHandler();

		// uses query parameter from url
		axios.get(`http://localhost:3001/list/get?search=${search}`)
		.then(res => {
			setItems(res.data);
		})
		.catch(err => {
			console.error(err);
		});
	}


	//////////////////////////////
	// Define effects
	//////////////////////////////

	// getHandler is called once when the page is loaded
	// it is used to get all items from the database
	useEffect(() => {
		getHandler();
	}, 
	[]);

	return (
		<div>

		<header>
			<h1>Egzamin INF.04</h1>
		</header>

		<main>
			{/* 
				This part is used to search for items in the database
				Input is used to enter the search string and change the search state
				Button is used to call searchHandler
			*/}
			<div className='form-group'>
				<input className='form-control' type='text' placeholder='Szukaj...' onChange={(e)=>setSearch(e.target.value)}/>
				<button className='btn btn-success' onClick={searchHandler}>Szukaj</button>
			</div>

			{/* 
				This part is used to display items
				Items is an array of displayed items
				Each item is displayed using ListItem component
				Each item has a key and id which is its id from the database
				Each item has a delete button which calls deleteHandler
			*/}
			<div>
				{
					items.map(item => (
						<ListItem key={item.id} id={item.id} data={item.data} deleteHandler={deleteHandler}/>
					))
				}
			</div>

			{/* 
				This part is used to add new items to the database
				Input is used to enter the new item and change the newItem state
				Button is used to call addHandler
			*/}
			<div className='form-group'>
				<input  className='form-control' type='text' placeholder='Informacje...' onChange={(e)=>setNewItem(e.target.value)}/>
				<button className='btn btn-success' onClick={addHandler}>Dodaj</button>
			</div>

		</main>

		<footer>
			<p>Autor: 00000000000</p>
		</footer>

		</div>
	);
}

export default App;
