// Initializing every important package
const express = require('express');
const cors = require('cors')
const app = express();

const mysql = require('mysql');

// Cors is used to allow cross-origin requests (idk what it does, you need it)
// express.json() is used to parse JSON bodies
app.use(cors())
app.use(express.json())


// create connection
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'egzamin'
})

// get data from table list
app.get('/list', (req,res)=>{
    db.query("SELECT * FROM list", (err, result)=> {
        if(err)
            console.error(err)
        else
            res.send(result)
    });
})

// get data from table list with search
// uses query parameter from url
app.get('/list/get', (req,res)=>{
    const data = req.query.search;
    const sql = `SELECT * FROM list WHERE data LIKE '%${data}%'`;
    db.query(sql, (err, result)=> {
        if(err)
            console.error(err)
        else
            res.send(result)
    });
})


// add data to table list
// uses body parameter
app.post('/list/create', (req,res) => {
    const data = req.body.data;
    const sql = `INSERT INTO list (data) VALUES ('${data}')`;
    db.query(sql, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting row into table list');
        } else {
          res.send('Row inserted successfully into table list');
        }
      });
});

// delete data from table laboranci
// uses query parameter
app.delete('/list/delete', (req,res)=>{
    const id = req.query.id;
    const sql = `DELETE FROM list WHERE id = ${id}`;
    db.query(sql, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting row from table list');
      } else {
        res.send('Row deleted successfully from table list');
      }
    });
});
    
// update rekordy
// app.put('/list/update', (req,res) => {
//     const id = req.body.id;
//     const sql = 'UPDATE list SET ? WHERE id = ?';
//     db.query(sql,[req.body, id],(error) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send('Error updating row in table list');
//         } else {
//             res.send('Row updated successfully in table list');
//         }
//     })
// })

// run server on port 3001
app.listen(3001, ()=> {
    console.log("Your server is running!");
})