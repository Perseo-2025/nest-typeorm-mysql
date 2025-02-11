import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userService : Repository<User>
  )
  {}


  async create(createUserDto: CreateUserDto) {
    const respuesta = await this.userService.save(createUserDto);
    return respuesta;
  }

  /* Buscar el email */
  async finOneByEmail(email: string) {
    return this.userService.findOne({ where: { email } });
  }

  /* Buscar el email con y el password */
  async findOneByEmailWhithPassword(email: string) {
    const respuesta = await this.userService.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'name', 'dni', 'active'],
    })
    return respuesta;
  }

  async findAll() {
    const respuesta = await this.userService.find();
    return respuesta;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
