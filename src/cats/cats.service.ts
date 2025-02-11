import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { IUserActive } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enum/rol.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) private readonly catsRepository: Repository<Cat>,
    
    @InjectRepository(Breed) private readonly breedService: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto, user : IUserActive) { //debemos pasar la raza

    const breed = await this.validateBreed(createCatDto.breed);
    
    const respuesta = await this.catsRepository.save({
      ...createCatDto, 
      breed_id: breed,
      userEmail: user.email
    });
    return respuesta;
  }

  async findAll(user:IUserActive) {
    if(user.role === Role.Admin){
      return this.catsRepository.find();
    }
    const respuesta = await this.catsRepository.find({where: {userEmail: user.email}});
    return respuesta;
  }


  async findOne(id: number, user: IUserActive) {
    
    const cat = await this.catsRepository.findOne({where: {id}})
    
    if(!cat){
      throw new BadRequestException('No se encontro el gato')
    }

    this.validateOwnerShip(cat, user);

    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto,
    user : IUserActive
  ) {
    
     await this.findOne(id, user);

     const respuesta = await this.catsRepository.update(id, {
      ...updateCatDto,
      breed_id: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email
    });
    return respuesta;
  }

  async remove(id: number, user : IUserActive) {

    await this.findOne(id, user);

    const respuesta1 = await this.catsRepository.softDelete(id);
    /* const respuesta2 = await this.catsRepository.softDelete(id); */ /* Elimina de manera logica, se le pasa el id */
    /* const respuesta3 = await this.catsRepository.softRemove({id}) */; /* Elimina de manera logica, se le pasa el id */
    
   /*  console.log(respuesta2, respuesta3); */
    return respuesta1;
  }

  
  /* Metodo SOLID */
  private validateOwnerShip(cat: Cat, user : IUserActive){
    if(user.role !== Role.Admin && cat.userEmail !== user.email){
      throw new UnauthorizedException('No puedes eliminar este gato, no está autorizado')
    }
  }

  private async validateBreed(breed: string){
    const breedEntity = await this.breedService.findOne({where: {name: breed}})
    
    if(!breedEntity){
      throw new BadRequestException('No se encontro la raza')
    }
    return breedEntity;
  }

}
