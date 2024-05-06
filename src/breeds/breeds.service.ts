import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    // almacenar el repo inyectado unicamente de lectura
    private readonly breedRepository: Repository<Breed>,
  ) {}
  
  
  async create(createBreedDto: CreateBreedDto) {
    const breed = this.breedRepository.create(createBreedDto);
    return await this.breedRepository.save(breed);
  }

  async findAll() {
    return await this.breedRepository.find();
  }
}