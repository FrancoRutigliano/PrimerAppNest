import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Result } from 'src/common/result/result';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

@Injectable()
export class CatsService {
  constructor( 
    // inyectamos un repositorio asociado a una entidad --> cat
    @InjectRepository(Cat)
    // en esta var se almacenará el Repo inyectado arriba
    private catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.validateBreed(createCatDto.breed);

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email,
    });
}
  async findAll(): Promise<Result<Cat[]>> {
    const cats = await this.catRepository.find();
    
    if (cats.length === 0) {
      return Result.failure<Cat[]>('Cats not found');
    }
    
    return Result.success(cats);
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOneBy({ id });
    
    if (!cat) {
      throw new BadRequestException(`Cat with id #${id} is not found`)
    }

    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    let breed;

    if (updateCatDto.breed) {
      breed  = await this.breedsRepository.findOneBy({
        name: updateCatDto.breed,
      });
      
      if (!breed) {
        throw new BadRequestException('breed not found');
      }
    }

    return await this.catRepository.save({
      ...cat,
      ...updateCatDto,
      breed,
    });
  }

  async remove(id: number) {
    return await this.catRepository.softDelete(id);
  }

  private async validateBreed(breed: string): Promise<Breed> { 
    const BreedEntity = await this.breedsRepository.findOneBy({ name: breed });

    if (!BreedEntity) {
      throw new BadRequestException('Breed not found');
    }

    return BreedEntity;
}
}
