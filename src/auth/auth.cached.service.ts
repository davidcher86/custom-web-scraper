import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthService } from './auth.service';

@Injectable()
export class CachedAuthService extends AuthService {
  constructor(
    protected usersService: UsersService, 
    protected jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {
    super(usersService, jwtService);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.findUser(username);

    if (!user) {
      return null;
    }

    const cachedToken = await this.cacheService.get(`auth-token-${user.userId}`);

    if (cachedToken) {
      console.log(`Getting token from cache for user ${username}`);
      return {
        access_token: cachedToken,
      };
    }

    const accesToken = await this.retrieveToken(user, pass);
    
    await this.cacheService.set(`auth-token-${user.userId}`, accesToken);
    
    return this.generateBody(accesToken);
  }
}