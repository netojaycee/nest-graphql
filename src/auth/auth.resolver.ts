import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignInResponse } from './dto/signin-response';
import { SignInInput } from './dto/signin-input';
import { SignUpResponse } from './dto/signup-response';
import { LogoutResponse } from './dto/logout-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  async signup(@Args('signUpInput') signUpInput: SignUpInput) {
    const response = await this.authService.signup(signUpInput);
    return response;
  }

  @Mutation(() => SignInResponse)
  async signin(@Args('signInInput') signInInput: SignInInput) {
    const response = await this.authService.signin(signInInput);
    return response;
  }

  @Mutation(() => LogoutResponse)
  async logout(@Args('id', { type: () => Int }) id: number) {
    const response = await this.authService.logout(id);
    return response;
  }
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}
