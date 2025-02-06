import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsString } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {

    // Add any additional fields you want to update
    // For example, you can add a field to update the cat's name
    @IsString()
    name?: string;

}
