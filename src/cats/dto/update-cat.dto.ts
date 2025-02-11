import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  // Add any additional fields you want to update
  // For example, you can add a field to update the cat's name

}
