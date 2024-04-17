import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

import config from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, CommentModule, TypeOrmModule.forRoot(config), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
