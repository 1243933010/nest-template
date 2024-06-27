import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,TestDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthPipe} from '../common/auth/auth.pipe'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/common/auth/auth.service';

@Controller({
  path:'/api',
})
// @Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')   //测试post接口 /api/test
  test(@Body(AuthPipe) body:TestDto) {
    // console.log(body,UseGuards(AuthGuard('jwt')))
    return this.userService.testFnc(body);
  }

  @Post('/login/account')
  logon(@Body() body) {
    return this.userService.login(this.authService,body);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
