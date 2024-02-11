import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SignInInput } from './dto/signin-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await bcrypt.hash(signUpInput.password, 10);
    await this.prisma.user.create({
      data: {
        username: signUpInput.username,
        hashedPassword,
        email: signUpInput.email,
      },
    });
    // const { token } = await this.createTokens(user.id, user.email);
    // return { token, user };
    return { message: 'User created successfully' };
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: signInInput.username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await bcrypt.compare(
      signInInput.password,
      user.hashedPassword,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { token } = await this.createTokens(user.id, user.email);
    await this.updateToken(user.id, token);
    return { token, user, message: 'User logged in successfully' };
  }


  async logout(userId: number) {
      const user = await this.prisma.user.findUnique({
          where: {
              id: userId,
          },
      });
  
      if (!user) {
          throw new NotFoundException('User not found');
      }
  
      if (user.hashedToken === null) {
          throw new UnauthorizedException('User not logged in');
      }
  
      await this.prisma.user.update({
          where: { id: userId },
          data: { hashedToken: null },
      });
  
      return { message: 'User logged out successfully', loggedOut: true };
  }
  
  async createTokens(userId: number, email: string) {
    const token = await this.jwtService.signAsync(
      { userId, email },
      { expiresIn: '15m', secret: this.configService.get('JWT_SECRET') },
    );
    return { token };
  }

  async updateToken(userId: number, token: string) {
    const hashedToken = await bcrypt.hash(token, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedToken },
    });
  }
}
