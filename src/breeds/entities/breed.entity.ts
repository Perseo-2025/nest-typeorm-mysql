import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";



@Entity()
export class Breed {
    //una raza tiene muchos gatos
    
    @Column({primary: true, generated: 'increment'})
    id: number;

    @Column({length: 500})
    name: string;

    @OneToMany(() => Cat, (cat) => cat.breed_id)
    cats: Cat[];
    
}
