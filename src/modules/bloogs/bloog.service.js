import { connection } from "../../DB/connection.db.js";

const insertbloog =(req, res) => {
    const {title, content,authorid} = req.body;
    console.log({title, content,authorid});
    const query = 'select * from users where u_id = ?';
    connection.execute(query, [authorid], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        }
         if(results.length) {
            const insertBlogQuery = 'INSERT INTO bloogs (b_title, b_content, b_author_id) VALUES (?, ?, ?)';
            connection.execute(insertBlogQuery, [title, content, authorid], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({message: "Error in the server" , error});
                } else {
                    return res.json({message: "Success data" });
                }
            })
        }
        else{
            return res.status(400).json({message: "User not found" });
        }
    })
}

const getallbloog =(req, res) => {
    const query = 'SELECT * FROM bloogs';
    connection.execute(query, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: "Error in the server" , error});
        } else {
            res.json({message: "Success" , results});
        }
    })
}

export {insertbloog, getallbloog};