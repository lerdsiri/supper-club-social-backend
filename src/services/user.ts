import User, { UserDocument } from '../models/User'
//import { NotFoundError } from '../helpers/apiError';

//POST
const create = async (user: UserDocument): Promise<UserDocument> => {
  return await user.save()
}

//GET all users
const findAllUsers = async () => {
  return await User.find().sort({ lastName: 1, firstName: 1 })
}

export default { create, findAllUsers }
