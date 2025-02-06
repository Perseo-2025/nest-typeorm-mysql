import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(@InjectRepository(Breed) private readonly breedService: Repository<Breed>) 
  {}

  async create(createBreedDto: CreateBreedDto) {
    const respuesta = await this.breedService.save(createBreedDto);
    return respuesta;
  }

  async findAll() {
    const respuesta = await this.breedService.find();
    return respuesta;
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    console.log(updateBreedDto);
    
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
