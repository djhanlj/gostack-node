import User from '../models/User';
import { getRepository } from 'typeorm';

interface Request{
  name: String;
  email: String;
  password: String;
}

class CreateUserService
{
  public async execute({name, email, password }: Request): Promise<User>{
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email }
    })

    if(checkUserExists){
      throw Error('Email address already exists')
    }

    const user = userRepository.create({
      name,
      email,
      password,
    })

    await userRepository.save(user);

    return user;
  }
}


export default CreateUserService
