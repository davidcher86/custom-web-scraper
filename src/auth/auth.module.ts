import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './JWTConstants';
import { CachedAuthService } from './auth.cached.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000000s' },
        })
    ],
    providers: [AuthService, CachedAuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
