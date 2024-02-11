import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;
 
  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
