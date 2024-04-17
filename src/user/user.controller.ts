import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';


import { CommentService } from 'src/comment/comment.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}
  @UseGuards(JwtGuard)
   @Roles(Role.Admin)
  @Get('all')
  findall() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Roles(Role.User)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.Admin)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.Admin)
  @Get(':id/comments')
  getUserComment(@Param('id') id: string) {
    return this.commentService.findUserComments(id);
  }
}
