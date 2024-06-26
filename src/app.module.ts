import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaModule} from './prisma/prisma.module';
import { ConfigModule,ConfigService } from '@nestjs/config';  //@nestjs/config插件需要额外npm，使用它来给nest设定全局环境变量
import { UserModule } from './user/user.module';


let envFilePath = ['.env'];   //判断指令执行的是dev还是pro
if(process.env.NODE_ENV=='dev'){
  envFilePath.push('.env.dev')
}else{
  envFilePath.push('.env.pro')
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath
    }),
    PrismaModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
