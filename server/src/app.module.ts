import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RandomController } from './random/random.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RandomService } from './random/random.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
  ],
  controllers: [AppController, RandomController],
  providers: [AppService, RandomService],
})
export class AppModule {}
