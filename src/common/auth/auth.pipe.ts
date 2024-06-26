import { ArgumentMetadata, Injectable, PipeTransform,HttpException,HttpStatus } from '@nestjs/common';
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'
@Injectable()
export class AuthPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype,value);
    const errors =  await validate(DTO);
    if(errors.length){
      throw new HttpException(Object.values(errors[0].constraints)[0],HttpStatus.BAD_REQUEST);
   }
   return value;
  }
}



