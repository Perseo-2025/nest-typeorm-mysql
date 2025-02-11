import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/env';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
 @Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUser,
      password: envs.dbPassword,
      database: envs.dbName,
      autoLoadEntities: true,
      synchronize: true,
      ssl: envs.postgresSsl === 'true',
      extra: {
        ssl: 
        envs.postgresSsl === 'true'
        ? { 
          rejectUnauthorized: false 
        }
        : null,
      },
    }),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}                                   
