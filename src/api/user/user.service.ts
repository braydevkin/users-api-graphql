import { Model, Types } from 'mongoose';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { Logger } from 'src/shared/logger/Logger';

import { User, UserDocument } from 'src/database/documents/User';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private logger: Logger) { this.logger.log(`${User.name} Service`) }

  async create(createUserInput: CreateUserInput, roles: string[]) {

    await this.logger.log(`Verifing address ${createUserInput.email}`)
    const existingEmail = await this.userModel.exists({
      email: createUserInput.email
    })

    if (existingEmail) {
      this.logger.error(`E-mail already exist`)
      throw new HttpException('E-mail already exist', HttpStatus.BAD_REQUEST)
    }

    await this.logger.log(`Verifing password lenght`)
    if (createUserInput.password.length < 6) {
      this.logger.error(`Password must contain at least 6 characters`)
      throw new HttpException('Password must contain at least 6 characters', HttpStatus.BAD_REQUEST)
    }

    try {
      createUserInput.roles = roles
      await this.logger.log(`Registering user with address ${createUserInput.email}`)

      return this.userModel.create(createUserInput)
    }
    catch (err) {
      this.logger.error(err)
    }

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: Types._ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


