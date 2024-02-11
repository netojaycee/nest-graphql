import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponse {
 @Field()
 loggedOut: boolean;
 
 @Field()
 message: string;
}
