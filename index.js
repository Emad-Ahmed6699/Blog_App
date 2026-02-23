//npm i mysql2
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
const connection = mysql.createConnection({
    database: 'blogdb',
    port: '3306',
    user: 'root',
    password: '',
})
//in case we wrote the name of the database in the code wrong so we must listen to the error
connection.on('error',e => {
    console.log("Error in connection (NAME  OF THE DATABASE)");
})
//or 
connection.connect((error)=>{
    if(error){
        console.log("Error in connection (NAME  OF THE DATABASE)");
    }else{
        console.log("Connected to database (NAME  OF THE DATABASE)");
    }
});

//signup 
app.post('/auth/signup', (req, res, next) => {
    const { fistName ,middleName , lastName , email, password,confirmPassword } = req.body;
    //const query = 'INSERT INTO users (fistName, ,middleName , lastName , email, password ,confirmPassword) VALUES (?, ?, ? ,?, ?, ?, ?)';
    // connection.execute(query, [fistName, middleName, lastName, email, password ,confirmPassword], (error, results) => {
    //     if (error) {
    //         console.log(error);
    //         res.status(500).json({message: "Error in the server" , error});
    //     } else {
            console.log({fistName, middleName, lastName, email, password ,confirmPassword});
            if(password !== confirmPassword){
                return res.json({message: "Password does not match" });
            }
            const findUserQuery = 'SELECT * FROM users WHERE u_Email = ?';
            connection.execute(findUserQuery, [email], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({message: "Error in the server" , error});
                } else {
                    if(results.length > 0){
                        return res.json({message: "User already exists" });
                    }
                }
            })
            const insertuserQuery = 'INSERT INTO users (u_FirstName, u_MiddleName, u_LastName, u_Email, u_Password) VALUES (?, ?, ?, ?, ?)';
            connection.execute(insertuserQuery, [fistName, middleName, lastName, email, password], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({message: "Error in the server" , error});
                } else {
                    console.log(results);
                }
            })
            return res.json({message: "Success" });
        // }
    // })
});

app.get('/', (req, res) => {//we need to retrieve data from the database
    const query = 'SELECT * FROM users';
    connection.execute(query, (error, results) => { //COnnection.query ,but the execute is more secure and most effective
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            res.json({message: "Success" , results});
        }
    })
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});