const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

app.use(bodyParser.json());

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restapi',
  password: 'A262626a',
  port: '5432'
});

/*app.get('/', (req, res) => {
  pool.query('SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id', (err, result) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});*/


app.get('/', (req, res) => {
    pool.query('SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id', (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.send(JSON.stringify(result.rows, null, 2));
      }
    });
  });
  
  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
  







app.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id WHERE table1.id = $1', [id], (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.send(result.rows);
      }
    });
  });
  






 /* app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;
    pool.query('INSERT INTO table1 (name, email) VALUES ($1, $2) RETURNING id', [name, email], (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        const table1Id = result.rows[0].id;
        pool.query('INSERT INTO table2 (table1_id, adress, contact) VALUES ($1, $2, $3)', [table1Id, adress, contact], (err, result) => {
          if (err) {
            res.status(500).send(err.toString());
          } else {
            res.send('students created successfully!');
          }
        });
      }
    });
  });
  
*/

app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;
    
    pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
    if (err) {
    res.status(500).send(err.toString());
    } else if (result.rows.length > 0) {
    res.status(400).send('Email already exists');
    } else {
    pool.query('INSERT INTO table1 (name, email) VALUES ($1, $2) RETURNING id', [name, email], (err, result) => {
    if (err) {
    res.status(500).send(err.toString());
    } else {
    const table1Id = result.rows[0].id;
    pool.query('INSERT INTO table2 (table1_id, adress, contact) VALUES ($1, $2, $3)', [table1Id, adress, contact], (err, result) => {
    if (err) {
    res.status(500).send(err.toString());
    } else {
    res.send('Record created successfully!');
    }
    });
    }
    });
    }
    });
    });
    
    
    
    



  app.put('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;
    pool.query('UPDATE table1 SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        pool.query('UPDATE table2 SET adress = $1, contact = $2 WHERE table1_id = $3', [adress, contact, id], (err, result) => {
          if (err) {
            res.status(500).send(err.toString());
          } else {
            res.send('student updated successfully');
          }
        });
      }
    });
  });
  



  app.delete('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM table2 WHERE table1_id = $1', [id], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
          } else {
            pool.query('DELETE FROM table1 WHERE id = $1', [id], (err, result) => {
              if (err) {
                res.status(500).send(err.toString());
              } else {
                res.send('student removed successfully');
              }
            });
          }
        });
      });
      
  
