import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import * as process from 'process';
import { AwsModule } from 'LIBS/aws/aws.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.enableVersioning({
        type: VersioningType.URI,
    });
    const configService = app.select(AwsModule).get(ConfigService);
    // @ts-ignore
    const PORT = +configService.get<number>('PORT') || 3000;

    await app.listen(PORT, () => {
        console.log(`Server Start PORT - ${PORT}`);
    });
}
bootstrap();
