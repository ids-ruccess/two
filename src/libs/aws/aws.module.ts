import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import secretManagerConfig from "LIBS/aws/secretManager/secretManger.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            load:[secretManagerConfig],
            isGlobal: true
        })
    ]
})
export class AwsModule {}
