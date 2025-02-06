import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";


@Entity()
export class Cat {

    //@PrimaryGeneratedColumn('uuid')
    @Column({primary: true, generated: 'increment'})
    id: number;
    
    @Column()
    name: string;

    @Column()
    age: number;

    @DeleteDateColumn()
    deletedAt: Date;

    //relacion
    @ManyToOne(() => Breed , (breed) => breed.id, {
        eager: true
    })
    breed_id: Breed

    //un gato solo tiene ina raza
}
