import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }


  async updateUser(email: string, updateData: Partial<User>): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
        throw new BadRequestException('User not found');
    }
    await this.usersRepository.merge(user, updateData);
    await this.usersRepository.save(user);
}
}
