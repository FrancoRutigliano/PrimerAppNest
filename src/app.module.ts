import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CatsModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
