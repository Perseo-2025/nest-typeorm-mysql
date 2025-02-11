import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";


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
    breed_id: Breed; //dejarlo como breed porque el sistema solo lo pone breedId
    //un gato solo tiene ina raza
    //siempre ell manytoone es el que almacena la referencia 
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' }) //referencia
    user: User;

    @Column() //pasar el id del usuario que creo el gato
    userEmail : string;
}
