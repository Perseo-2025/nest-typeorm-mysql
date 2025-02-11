import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/common/enum/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { IUserActive } from 'src/common/interfaces/user-active.interface';


@Auth(Role.User)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseGuards(AuthGuard) //<-middleware
  create(
  @Body() createCatDto: CreateCatDto,
  @ActiveUser() user: IUserActive
  ) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: IUserActive) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: IUserActive) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: IUserActive) {
    return this.catsService.update(+id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: IUserActive) {
    return this.catsService.remove(+id, user);
  }
}
