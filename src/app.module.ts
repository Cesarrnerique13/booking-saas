import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { joinValidationSchema } from './config/joi.validation';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/repositories/users.repository';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: joinValidationSchema
}),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:(confi: ConfigService) => ({
        type: "postgres",
        host: confi.get<string>('DB_HOST'),
        port: confi.get<number>('DB_PORT'),
        username: confi.get<string>('DB_USERNAME'),
        password: confi.get<string>('DB_PASSWORD'),
        database: confi.get<string>('DB_NAME'),
        autoLoadEntities:true,
        synchronize:true
      })
    }),
   UsersModule,
   CommonModule
  ],
})
export class AppModule {}
