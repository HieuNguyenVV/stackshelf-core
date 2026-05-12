import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

export const appConfiguration = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  apiVersion: process.env.API_VERSION ?? 'v1',
}));

@Injectable()
export class AppConfiguration {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('app.nodeEnv', 'development');
  }

  get port(): number {
    return this.configService.get<number>('app.port', 3000);
  }

  get apiPrefix(): string {
    return this.configService.get<string>('app.apiPrefix', 'api');
  }

  get apiVersion(): string {
    return this.configService.get<string>('app.apiVersion', 'v1');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get isStaging(): boolean {
    return this.nodeEnv === 'staging';
  }
}