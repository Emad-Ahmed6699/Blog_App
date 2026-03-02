import { connection } from "../../DB/connection.db.js";

const profiles =(req, res) => {//we need to retrieve data from the database
    const query = 'SELECT * FROM users';
    connection.execute(query, (error, results) => { //COnnection.query ,but the execute is more secure and most effective
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            res.json({message: "Success" , results});
        }
    })
}
const profile =(req, res) => {
    const {id} = req.params; //thats a destructuring
    console.log(id);
    const query = 'SELECT * FROM users WHERE u_ID = ?';
    connection.execute(query, [id], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            return results.length > 0 ? res.json({message: "Success" , results}) : res.json({message: "User not found" });
        }
    })
}

const modifyprofile =(req, res) => {
    const {id} = req.params; 
    const fields = [];
    const values = [];

    if (req.body.firstName !== undefined) {
        fields.push('u_FirstName = ?');
        values.push(req.body.firstName);
    }

    if (req.body.middleName !== undefined) {
        fields.push('u_MiddleName = ?');
        values.push(req.body.middleName);
    }

    if (req.body.lastName !== undefined) {
        fields.push('u_LastName = ?');
        values.push(req.body.lastName);
    }

    if (req.body.DOB !== undefined) {
        fields.push('u_Dob = ?');
        values.push(req.body.DOB);
    }

    if (fields.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const query = `UPDATE users SET ${fields.join(', ')} WHERE u_ID = ?`;
    values.push(id);

    connection.execute(query, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error", error });
        }

        return results.affectedRows > 0
            ? res.json({ message: "Success" })
            : res.json({ message: "User not found" });
    })
};

const deleteprofile =(req, res) => {
    const {id} = req.params; 
    const query = 'DELETE FROM users WHERE u_ID = ?';
    connection.execute(query, [id], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            return results.affectedRows > 0 ? res.json({message: "deleted Success" , results}) : res.json({message: "User not found" });
        }
    })
};

const searchprofile =(req, res) => {
    const {searchTerm} = req.query;
    const query = 'SELECT * FROM users WHERE u_FirstName LIKE ? OR u_MiddleName LIKE ? OR u_LastName LIKE ?';
    connection.execute(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            return results.length > 0 ? res.json({message: "Success" , results}) : res.json({message: "User not found" });
        }
    })
}


export {profiles , profile , modifyprofile , deleteprofile , searchprofile}