import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import {VersioningType} from '@nestjs/common'
import { join } from 'path'
import {Request,Response,NextFunction } from 'express'
import {Respon} from './common/response'
import {HttpFilter} from './common/filter'
import  {WinstonClass} from './common/winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger:['error','warn','log']
  });


  function MiddleWareAll(req:Request,res:Response,next:NextFunction){  //全局中间件
    console.log(`全局中间件:当前请求接口${req.originalUrl}`);
    next();
  }

  app.useStaticAssets(join(__dirname,'./../src/images'),{
    prefix:'/images'
  })

  app.useGlobalInterceptors(new Respon(WinstonClass()));  //全局响应拦截
  app.useGlobalFilters(new HttpFilter(WinstonClass()));   //全局异常过滤器
  app.use(MiddleWareAll);
  // console.log(VersioningType,'---')

  // app.enableVersioning({
  //   type:VersioningType.URI
  // })

  await app.listen(3003);
}
bootstrap();
