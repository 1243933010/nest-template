import {IsNotEmpty,IsString,IsArray} from 'class-validator'
export class CreateUserDto {
    id?:string
    
    access:string

    avatar?:string

    name:string

    email?:string

    

}

// export class TestDto {
//     version:string
// }

export class TestDto{

    @IsString({message:'名称要为字符串'})
    @IsNotEmpty({message:'名称不能为空'})
    version:string;

}