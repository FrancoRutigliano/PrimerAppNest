import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;
  
    @IsInt()
    @MinLength(1)
    @IsOptional()
    age?: number;
  
    @IsString()
    @IsOptional()
    breed?: string;
}
