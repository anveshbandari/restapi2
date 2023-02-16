/*const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const { body, validationResult } = require('express-validator');
const validator = require('validator');
// const { check, validationResult } = require('express-validator');
// const { validationResult } = require('express-validator');


app.use(bodyParser.json());

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restapi',
  password: 'A262626a',
  port: '5432'
});


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
  


// /*
// app.post('/', 
//   body('name')
//     .matches(/^[a-zA-Z.-]+$/)
//     .withMessage('Name must only contain characters'),
//   body('email')
//     .notEmpty().withMessage('Email is required')
//     .isEmail().withMessage('Invalid email address'),
//   body('adress')
//     .notEmpty().withMessage('Adress is required'),
//   body('contact')
//   .matches(/^\d+$/).withMessage('Contact must only contain digits')
//   .isLength({ min: 10, max: 10 }).withMessage('Contact must be a 10-digit number'),
//  (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const sortedErrors = errors.array().sort((a, b) => {
//       const order = ['name', 'email', 'adress', 'contact'];
//       return order.indexOf(a.param) - order.indexOf(b.param);
//     });
//     const errorMessage = sortedErrors[0].msg;
//     return res.status(400).send(errorMessage);
//   }
  
//   const name = req.body.name;
//   const email = req.body.email;
//   const adress = req.body.adress;
//   const contact = req.body.contact;
  
//   // Check if email already exists in the database
//   pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
//     if (err) {
//       return res.status(500).send(err.toString());
//     } 
    
//     if (result.rows.length > 0) {
//       return res.status(400).send('Email already exists');
//     } 
    
//     // Insert data into the database
//     pool.query('INSERT INTO table1 (name, email) VALUES ($1, $2) RETURNING id', [name, email], (err, result) => {
//       if (err) {
//         return res.status(500).send(err.toString());
//       } 
      
//       const table1Id = result.rows[0].id;
//       pool.query('INSERT INTO table2 (table1_id, adress, contact) VALUES ($1, $2, $3)', [table1Id, adress, contact], (err, result) => {
//         if (err) {
//           return res.status(500).send(err.toString());
//         } 
        
//         res.send('Record created successfully!');
//       });
//     });
//   });
// });
// 





app.post('/', 
  body('name')
    .matches(/^[a-zA-Z.-]+$/)
    .withMessage('Name must only contain characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM table1 WHERE email = $1', [value], (err, result) => {
          if (err) {
            reject(new Error('Database error'));
          }
          if (result.rows.length > 0) {
            reject(new Error('Email already in use'));
          }
          resolve(true);
        });
      });
    }),
  body('adress')
    .notEmpty().withMessage('Adress is required'),
  body('contact')
    .matches(/^\d+$/).withMessage('Contact must only contain digits')
    .isLength({ min: 10, max: 10 }).withMessage('Contact must be a 10-digit number'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const sortedErrors = errors.array().sort((a, b) => {
        const order = ['name', 'email', 'adress', 'contact'];
        return order.indexOf(a.param) - order.indexOf(b.param);
      });
      const errorMessage = sortedErrors[0].msg;
      return res.status(400).send(errorMessage);
    }

    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;

    // Insert data into the database
    pool.query('INSERT INTO table1 (name, email) VALUES ($1, $2) RETURNING id', [name, email], (err, result) => {
      if (err) {
        return res.status(500).send(err.toString());
      } 

      const table1Id = result.rows[0].id;
      pool.query('INSERT INTO table2 (table1_id, adress, contact) VALUES ($1, $2, $3)', [table1Id, adress, contact], (err, result) => {
        if (err) {
          return res.status(500).send(err.toString());
        } 

        res.send('Record created successfully!');
      });
    });
  }
);


    
     

// /*
// app.put('/:id',
//   body('name')
//     .matches(/^[a-zA-Z.-]+$/)
//     .withMessage('Name must only contain letters'),

//   body('email')
//     .notEmpty().withMessage('Email is required')
//     .isEmail().withMessage('Invalid email address'),

//   body('adress')
//     .notEmpty().withMessage('Address is required'),

//   body('contact')
//   .matches(/^\d+$/)
//   .withMessage('Contact must only contain digits')
//   .isLength({ min: 10, max: 10 })
//   .withMessage('Contact must be a 10-digit number'),

//   (req, res) => {
//     const id = req.params.id;
//     const name = req.body.name;
//     const email = req.body.email;
//     const adress = req.body.adress;
//     const contact = req.body.contact;
    
//     const errors = validationResult(req).array();
//     const fieldOrder = ['name', 'email', 'adress', 'contact'];
//     let errorMessage = '';
    
//     for (let fieldName of fieldOrder) {
//       const error = errors.find(err => err.param === fieldName);
//       if (error) {
//         errorMessage = error.msg;
//         break;
//       }
//     }
    
//     if (errorMessage) {
//       return res.status(400).send(errorMessage);
//     }
    
//     pool.query('UPDATE table1 SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, result) => {
//       if (err) {
//         res.status(500).send(err.toString());
//       } else {
//         pool.query('UPDATE table2 SET adress = $1, contact = $2 WHERE table1_id = $3', [adress, contact, id], (err, result) => {
//           if (err) {
//             res.status(500).send(err.toString());
//           } else {
//             res.send('Student updated successfully');
//           }
//         });
//       }
//     });
//   }
// );
// 

app.put('/:id',
  body('name')
    .matches(/^[a-zA-Z.-]+$/)
    .withMessage('Name must only contain letters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('adress')
    .notEmpty().withMessage('Adress is required'),

  body('contact')
    .matches(/^\d+$/)
    .withMessage('Contact must only contain digits')
    .isLength({ min: 10, max: 10 })
    .withMessage('Contact must be a 10-digit number'),

  (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;
    
    const errors = validationResult(req).array();
    const fieldOrder = ['name', 'email', 'adress', 'contact'];
    let errorMessage = '';
    
    for (let fieldName of fieldOrder) {
      const error = errors.find(err => err.param === fieldName);
      if (error) {
        errorMessage = error.msg;
        break;
      }
    }
    
    if (errorMessage) {
      return res.status(400).send(errorMessage);
    }

    pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else if (result.rows.length > 0 && result.rows[0].id != id) {
        res.status(400).send('Email already in use');
      } else {
        pool.query('UPDATE table1 SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, result) => {
          if (err) {
            res.status(500).send(err.toString());
          } else {
            pool.query('UPDATE table2 SET adress = $1, contact = $2 WHERE table1_id = $3', [adress, contact, id], (err, result) => {
              if (err) {
                res.status(500).send(err.toString());
              } else {
                res.send('Student updated successfully');
              }
            });
          }
        });
      }
    });
  }
);



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
      });*/


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { body, validationResult } = require('express-validator');
const validator = require('validator');
const knex = require('knex');

app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'restapi',
    password: 'A262626a',
    port: '5432'
  }
});

app.get('/', (req, res) => {
  db.select('*').from('table1')
    .join('table2', 'table1.id', '=', 'table2.table1_id')
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});




app.get('/:id', (req, res) => {
  const id = req.params.id;
  db.select('*').from('table1')
    .join('table2', 'table1.id', '=', 'table2.table1_id')
    .where('table1.id', '=', id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});




app.post('/',
  body('name')
    .matches(/^[a-zA-Z.-]+$/)
    .withMessage('Name must only contain characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .custom((value, { req }) => {
      return db.select('*').from('table1').where('email', '=', value)
        .then((result) => {
          if (result.length > 0) {
            return Promise.reject('Email already in use');
          }
          return Promise.resolve();
        });
    }),
  body('adress')
    .notEmpty().withMessage('Adress is required'),
  body('contact')
    .matches(/^\d+$/).withMessage('Contact must only contain digits')
    .isLength({ min: 10, max: 10 }).withMessage('Contact must be a 10-digit number'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const sortedErrors = errors.array().sort((a, b) => {
        const order = ['name', 'email', 'adress', 'contact'];
        return order.indexOf(a.param) - order.indexOf(b.param);
      });
      const errorMessage = sortedErrors[0].msg;
      return res.status(400).send(errorMessage);
    }

    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;

    db.transaction((trx) => {
      return trx.insert({ name, email }).into('table1')
        .returning('id')
        .then((table1Id) => {
          const id = table1Id[0].id;
          return trx.insert({ table1_id: id, adress, contact }).into('table2');
        });
    })
      .then(() => {
        res.send('Record created successfully!');
      })
      .catch((err) => {
        res.status(500).send(err.toString());
      });
  });

app.listen(4000, () => {
  console.log('Server running on port 4000');
});




app.put('/:id',
  body('name')
    .matches(/^[a-zA-Z.-]+$/)
    .withMessage('Name must only contain letters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('adress')
    .notEmpty().withMessage('Adress is required'),

  body('contact')
    .matches(/^\d+$/)
    .withMessage('Contact must only contain digits')
    .isLength({ min: 10, max: 10 })
    .withMessage('Contact must be a 10-digit number'),

  (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;

    const errors = validationResult(req).array();
    const fieldOrder = ['name', 'email', 'adress', 'contact'];
    let errorMessage = '';

    for (let fieldName of fieldOrder) {
      const error = errors.find(err => err.param === fieldName);
      if (error) {
        errorMessage = error.msg;
        break;
      }
    }

    if (errorMessage) {
      return res.status(400).send(errorMessage);
    }

    db.select('*').from('table1').where('email', email).then((result) => {
      if (result.length > 0 && result[0].id != id) {
        res.status(400).send('Email already in use');
      } else {
        db.transaction((trx) => {
          trx('table1')
            .where('id', id)
            .update({ name: name, email: email })
            .then(() => {
              return trx('table2')
                .where('table1_id', id)
                .update({ adress: adress, contact: contact });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
          .then(() => {
            res.send('Student updated successfully');
          })
          .catch((err) => {
            res.status(500).send(err.toString());
          });
      }
    })
      .catch((err) => {
        res.status(500).send(err.toString());
      });
  }
);


/*
app.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.transaction((trx) => {
    trx('table2')
      .where('table1_id', id)
      .del()
      .then(() => {
        return trx('table1')
          .where('id', id)
          .del();
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then(() => {
      res.send('Student removed successfully');
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});
*/

app.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.transaction((trx) => {
    trx('table2')
      .where('table1_id', id)
      .del()
      .then(() => {
        return trx('table1')
          .where('id', id)
          .del();
      })
      .then((result) => {
        if (result === 0) {
          return trx.rollback(new Error('ID not found'));
        }
        return trx.commit();
      })
      .catch(trx.rollback);
  })
    .then(() => {
      res.send('Student removed successfully');
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

      
  
