import express from 'express'
import { createUser, getAllUsers } from '../controllers/user'

const router = express.Router()

//create user
router.post('/', createUser)

//retrieve all users
router.get('/', getAllUsers)

export default router
