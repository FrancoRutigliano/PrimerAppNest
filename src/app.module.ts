import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule , ConfigModule.forRoot(), // carga variables de entorno
    TypeOrmModule.forRoot({
    type: "mysql",
    host:"localhost",
    port:3307,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }), BreedsModule, UsersModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
