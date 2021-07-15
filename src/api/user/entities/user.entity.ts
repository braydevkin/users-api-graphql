import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => [String], { nullable: false })
  roles: string[];
}
