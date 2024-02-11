import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class SignInResponse {
  @IsNotEmpty()
  @IsString()
  @Field()
  token: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  user: User;
  
  @Field()
  message: string;
}
