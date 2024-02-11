import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "../types";


@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(public config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
            passReqToCallback: true,
        })
    }
    async validate(payload: JwtPayload) {
      return payload;
    }

}