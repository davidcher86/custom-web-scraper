import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CachedAuthService } from './auth.cached.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: CachedAuthService) {}
  
    // @HttpCode(HttpStatus.OK)
    // @UseInterceptors(CacheInterceptor)
    // @CacheKey('authToken')
    // @CacheTTL(600000)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
