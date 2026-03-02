//////// apply ES6 modules

//npm i mysql2
import mysql from 'mysql2';

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

//write in function
const checkConnection = ()=>{
    connection.connect((error)=>{
    if(error){
        console.log("Error in connection (NAME  OF THE DATABASE)");
    }else{
        console.log("Connected to database (NAME  OF THE DATABASE)");
    }
});
}

export {connection,checkConnection}