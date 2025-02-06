import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/env';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUser,
      password: envs.dbPassword,
      database: envs.dbName,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BreedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}                                   
