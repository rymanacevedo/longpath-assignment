import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RandomController } from './random/random.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { NumberGenerationGateway } from './number-generation/number-generation.gateway';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'


@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10
  }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
  ],
  controllers: [AppController, RandomController],
  providers: [AppService, NumberGenerationGateway,
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
],
})
export class AppModule {}
