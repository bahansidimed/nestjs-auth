import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from 'src/comment/comment.service';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),   JwtModule.register({
    secret: `${process.env.jwt_secret}`,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UserController],
  providers: [UserService, CommentService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }, ],
})
export class UserModule {}
