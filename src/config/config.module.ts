import { Global, Module } from '@nestjs/common';
import {ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfiguration, appConfiguration } from './configurations';

const configProviders = [
    AppConfiguration,
];
@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [appConfiguration],
        }),
    ],
    exports: configProviders,
    providers: configProviders,
})
export class ConfigModule {
}
