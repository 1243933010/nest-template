import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {TestPostData} from './interface'
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from 'src/common/auth/auth.service';
import {LogoBody} from './interface'
@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(username:string,password:string):Promise<any> {
   
    const users = await this.prisma.user.findFirst(
      {
        where:{
          name:username,
          // password
        }
      }
    );
    return users;
  }

  async login(AuthService:AuthService,body:LogoBody){
    let auth = await AuthService.validateUser(body.username,body.password);
    if(auth.code!==0){
      return auth
    }
   
    let tokens = await AuthService.certificate({username:auth.name,id:auth.id})
    
    return tokens;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  testFnc(body:TestPostData){
    console.log(body)
    return {
      
    }
  }
}
