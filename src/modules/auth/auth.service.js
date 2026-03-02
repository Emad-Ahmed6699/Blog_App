import { connection } from "../../DB/connection.db.js";

const signin = (req, res, next) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE u_Email = ? AND u_Password = ?';
    connection.execute(query, [email, password], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            if(results.length > 0){
                return res.json({message: "Success" , results});
            }else{
                return res.json({message: "User not found" });
            }
        }
    })
};

const signup = (req, res, next) => {
    const { fistName ,middleName , lastName , email, password,confirmPassword } = req.body;
            console.log({fistName, middleName, lastName, email, password ,confirmPassword});
            if(password !== confirmPassword){
                return res.json({message: "Password does not match" });
            }
            const findUserQuery = 'SELECT * FROM users WHERE u_Email = ?';
            connection.execute(findUserQuery, [email], (error, results) => {
                if (error) {
                    console.log(error);
                    returnres.status(500).json({message: "Error in the server" , error});
                } else {
                    if(results.length > 0){
                        return res.status(500).json({message: "User alraedy exists" });
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
};

export { signin, signup };