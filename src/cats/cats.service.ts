import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) private readonly catsRepository: Repository<Cat>,
    
    @InjectRepository(Breed) private readonly breedService: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto) { //debemos pasar la raza

    const raza = await this.breedService.findOne({where: {name: createCatDto.breed}})
    
    if(!raza){
      throw new Error('No se encontro la raza')
    }
    
    const respuesta = await this.catsRepository.save({...createCatDto, breed_id: raza});
    return respuesta;
  }

  async findAll() {
    const respuesta = await this.catsRepository.find()
    return respuesta;
  }


  async findOne(id: number) {
    const respuesta = await this.catsRepository.findOne({where: {id}})
    return respuesta;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const respuesta = await this.catsRepository.update(id, updateCatDto);
    return respuesta;
  }

  async remove(id: number) {
    const respuesta1 = await this.catsRepository.delete(id);
    /* const respuesta2 = await this.catsRepository.softDelete(id); */ /* Elimina de manera logica, se le pasa el id */
    /* const respuesta3 = await this.catsRepository.softRemove({id}) */; /* Elimina de manera logica, se le pasa el id */
    
   /*  console.log(respuesta2, respuesta3); */
    return respuesta1;
  }
}
