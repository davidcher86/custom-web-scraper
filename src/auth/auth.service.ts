import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJWT } from './auth.interface';

@Injectable()
export class AuthService implements AuthJWT {
  constructor(
    protected usersService: UsersService,
    protected jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const accesToken = await this.retrieveToken(user, pass);

    return this.generateBody(accesToken);
  }

  async findUser(username: string): Promise<any> {
    return await this.usersService.findOne(username);
  }
  
  async retrieveToken(user: any, pass: string): Promise<any> {
    const costFactor = 16;
    const hashPassword = await bcrypt.hash(pass, costFactor);
    const isMatch = await bcrypt.compare(pass, hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    const jwtToken = await this.jwtService.signAsync(payload);
    
    return jwtToken;
  }

  generateBody(accesToken: string): any {
    return {
      access_token: accesToken,
    };
  }
}
