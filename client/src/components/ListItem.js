import 'bootstrap/dist/css/bootstrap.css';

function ListItem(params){
    return (
        <div className='ListItem'>
            <p>{params.data}</p>
            {/* 
                Button calls deleteHandler with the id of the item to be deleted
            */}
            <button className='btn' onClick={() => {params.deleteHandler(params.id)}}>Usuń</button>
        </div>
    );
}

export default ListItem;