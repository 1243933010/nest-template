import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import {VersioningType} from '@nestjs/common'
import { join } from 'path'
import {Request,Response,NextFunction } from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger:['error','warn','log']
  });
  // console.log(VersioningType.URI,process.env,'---')

  app.enableVersioning({
    type:VersioningType.URI
  })

  await app.listen(3003);
}
bootstrap();
