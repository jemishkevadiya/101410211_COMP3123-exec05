const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

app.use(express.json());

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

app.get('/', (req, res) => {
  fs.readFile('home.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the HTML file');
    } else {
      res.send(data);
    }
  });
});

router.get('/home', (req,res) => {
  res.send('This is home router');
});

/*
- Return all details from user.json file to client as JSON format
*/

app.get('/user', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
        return res.status(500).send('Error reading user data');
    }
    res.json(JSON.parse(data));  
  });
});

router.get('/profile', (req,res) => {
  res.send('This is profile router');
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

app.post('/login', (req, res) => {
  const { username, password } = req.body; 
  
  fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send('Error reading user data'); 
      }

      const user = JSON.parse(data); 

      if (user.username !== username) {
          return res.json({ 
              status: false, 
              message: "User Name is invalid" 
          });
      }

      if (user.password !== password) {
          return res.json({ 
              status: false, 
              message: "Password is invalid" 
          });
      }

      return res.json({ 
          status: true, 
          message: "User Is valid" 
      });
  });
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  res.send('This is logout router');
});

app.get('/logout/:username', (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
  res.send(`<b>${username} successfully logged out.</b>`); // Send HTML response
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  res.send('This is error router');
  console.error(err.stack); 
  res.status(500).send('Server Error'); 

});

app.use('/', router);

app.listen(process.env.port || 8080);

console.log('Web Server is listening at port '+ (process.env.port || 8080));