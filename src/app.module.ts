import * as redisStore from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),

    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get('REDIS_HOST'), // Cambia esto según tu configuración de Redis
        port: config.get('REDIS_PORT'),
        password: config.get('REDIS_PASSWORD') || '', // Contraseña de Redis

        // Puerto de Redis
        ttl: 5, // Tiempo de vida del cache en segundos
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
