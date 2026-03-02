import { Router } from "express";
import { getallbloog, insertbloog } from "./bloog.service.js";

const router = Router();

//insert
router.post('/', insertbloog )
//get all bloogs
router.get('/',getallbloog );

export default router