import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

import { LoggerModule } from 'src/shared/logger/logger.module';
import { User, UserSchema } from 'src/database/documents/User';



@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), LoggerModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule { }
