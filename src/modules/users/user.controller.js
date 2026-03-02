import { Router } from "express";
import {deleteprofile, modifyprofile, profile, profiles, searchprofile } from "./user.service.js";

const router = Router();


router.get('/', profiles);

//we need to access the data of specific user by id taken from the front end in url parameter
router.get('/:id/profile',profile )

//update some data(columns not all ) of user then use patch method  (if all columns we use put method)
router.patch('/:id/profile', modifyprofile)

router.delete('/:id/profile', deleteprofile) 

//search
router.get('/search', searchprofile)


export default router