import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../../user/user.service';
import {JwtService} from '@nestjs/jwt'
import { jwtKey } from '../config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService:JwtService,
    private readonly userService:UserService
){ }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findAll(username,password);
    // 注：实际中的密码处理应通过加密措施
    
    if(user===null){
      return {code:400,message:'查无此人'}
    }
    if (user && user.password === password) {
      const { password, ...userInfo } = user;
      return {...userInfo,code:0,message:'success'};
    } else {
      return {code:1,message:'密码错误'}
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      id: user.id
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证',payload);
    try {
      const token = this.jwtService.sign(payload,{secret:jwtKey.secret});
      return {
        code: user.code,
        token,
        msg: user.message,
      };
    } catch (error) {
      console.log(error)
      return {
        code: 400,
        msg: `账号或密码错误`,
      };
    }
  }
}
