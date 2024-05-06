import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor( 
    // inyectamos un repositorio asociado a una entidad --> cat
    @InjectRepository(Cat)
    // en esta var se almacenará el Repo inyectado arriba
    private catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    return 'this action adds a new cat';
  }

  findAll() {
    return this.catRepository.find();
  }

  findOne(id: number) {
    return this.catRepository.findOneBy({ id });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `this action updates a #${id} cat`;
  }

  remove(id: number) {
    return this.catRepository.delete(id);
  }
}
