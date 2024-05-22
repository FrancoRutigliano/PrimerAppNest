import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedsService } from '../breeds/breeds.service';
import { BreedsModule } from '../breeds/breeds.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cat]), BreedsModule], // cargamos la entidad disponible en el contexto del módulos
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
  exports: [],
})
export class CatsModule {}
