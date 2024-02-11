import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenStrategy } from './strategy/token.strategy';
@Module({
  providers: [AuthResolver, AuthService, JwtService, PrismaService, TokenStrategy],
})
export class AuthModule {}
