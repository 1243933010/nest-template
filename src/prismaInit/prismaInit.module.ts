import { Module ,Global} from '@nestjs/common';
import {PrismaService} from './prismaInit.service';

@Global()
@Module({
    providers:[PrismaService],
    exports:[PrismaService]
})

export class PrismaInitModule{};