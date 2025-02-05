import { Column, Entity } from "typeorm";


@Entity()
export class Cat {

    //@PrimaryGeneratedColumn('uuid')
    @Column({primary: true, generated: 'increment'})
    id: number;
    
    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;

}
