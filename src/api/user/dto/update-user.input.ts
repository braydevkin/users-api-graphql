import { InputType, Field, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';


@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true, })
  password: string;

  @Field(() => [String], { nullable: true })
  roles: string[];
}
