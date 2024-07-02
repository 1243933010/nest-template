import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,UseInterceptors,UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import {FileInterceptor} from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport';


@Controller({
  path:'/api',
})
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload( @UploadedFile() file) {
    // console.log(file)
    return this.uploadService.upload(file);
  }
}
