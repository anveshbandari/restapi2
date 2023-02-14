const express = require('express');
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
  






 

/*app.post('/', (req, res) => {
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
    });*/




/*
    app.post('/', 
  body('name').isAlpha().withMessage('Name must only contain letters'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('adress').notEmpty(),
  body('contact').isInt().withMessage('Contact must only contain integers'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(error => error.msg) });
      console.log(errorMessages.join(', '));
      return res.status(422).json({ errors: errorMessages });
    }
    
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;
    
    pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
      if (err) {
        return res.status(500).send(err.toString());
      } 
      
      if (result.rows.length > 0) {
        return res.status(400).send('Email already exists');
      } 
      
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
    });
  });
*/
 

  /**//*app.post('/', 
  // body('name').isAlpha().withMessage('Name must only contain letters'),
  body('name')
  .matches(/^[a-zA-Z ]+$/)
  .withMessage('Name must only contain characters'),

  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('adress').notEmpty(),
  body('contact')
  .isLength({ min: 10, max: 10 }).withMessage('Contact must be a 10-digit number')
  .matches(/^\d+$/).withMessage('Contact must only contain digits'),
 (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).send(errorMessages.join(', '));
    }
    
    const name = req.body.name;
    const email = req.body.email;
    const adress = req.body.adress;
    const contact = req.body.contact;
    
    pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
      if (err) {
        return res.status(500).send(err.toString());
      } 
      
      if (result.rows.length > 0) {
        return res.status(400).send('Email already exists');
      } 
      
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
    });
  });*/

//   app.post('/', 
//   body('name')
//     .matches(/^[a-zA-Z ]+$/)
//     .withMessage('Name must only contain characters'),
//   body('email')
//     .notEmpty().withMessage('Email is required')
//     .isEmail().withMessage('Invalid email address'),
//   body('adress')
//     .notEmpty().withMessage('Adress is required'),
//   body('contact')
//     .isLength({ min: 10, max: 10 }).withMessage('Contact must be a 10-digit number')
//     .matches(/^\d+$/).withMessage('Contact must only contain digits'),
//  (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     let errorMessage = '';
//     const errorArray = errors.array();
//     for (let i = 0; i < errorArray.length; i++) {
//       if (errorMessage === '') {
//         errorMessage = errorArray[i].msg;
//       }
//     }
//     return res.status(400).send(errorMessage);
//   }
  
    
//     const name = req.body.name;
//     const email = req.body.email;
//     const address = req.body.address;
//     const contact = req.body.contact;
    
//     // Check if email already exists in the database
//     pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
//       if (err) {
//         return res.status(500).send(err.toString());
//       } 
      
//       if (result.rows.length > 0) {
//         return res.status(400).send('Email already exists');
//       } 
      
//       // Insert data into the database
//       pool.query('INSERT INTO table1 (name, email) VALUES ($1, $2) RETURNING id', [name, email], (err, result) => {
//         if (err) {
//           return res.status(500).send(err.toString());
//         } 
        
//         const table1Id = result.rows[0].id;
//         pool.query('INSERT INTO table2 (table1_id, address, contact) VALUES ($1, $2, $3)', [table1Id, address, contact], (err, result) => {
//           if (err) {
//             return res.status(500).send(err.toString());
//           } 
          
//           res.send('Record created successfully!');
//         });
//       });
//     });
//   });

app.post('/', 
  body('name')
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('Name must only contain characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),
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
  
  // Check if email already exists in the database
  pool.query('SELECT * FROM table1 WHERE email = $1', [email], (err, result) => {
    if (err) {
      return res.status(500).send(err.toString());
    } 
    
    if (result.rows.length > 0) {
      return res.status(400).send('Email already exists');
    } 
    
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
  });
});



    
     

    
//   app.put('/:id',
//   body('name')
//     .matches(/^[a-zA-Z ]+$/)
//     .withMessage('Name must only contain letters'),

//   body('email')
//     .notEmpty().withMessage('Email is required')
//     .isEmail().withMessage('Invalid email address'),

//   body('adress')
//     .notEmpty().withMessage('Address is required'),

//   body('contact')
//     .isLength({ min: 10, max: 10 })
//     .withMessage('Contact must be a 10-digit number')
//     .matches(/^\d+$/)
//     .withMessage('Contact must only contain digits'),

//   (req, res) => {
//     const id = req.params.id;
//     const name = req.body.name;
//     const email = req.body.email;
//     const adress = req.body.adress;
//     const contact = req.body.contact;
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const errorMessages = errors.array().map(error => error.msg);
//       return res.status(400).send(errorMessages.join(', '));
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


app.put('/:id',
  body('name')
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('Name must only contain letters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('adress')
    .notEmpty().withMessage('Address is required'),

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
);







    
    



  /*app.put('/:id',
   (req, res) => {
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
  });*/
  







  



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