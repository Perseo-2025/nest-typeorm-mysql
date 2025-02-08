import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn( 'uuid' )
    id: number;

    @Column({unique: true, nullable: false})
    dni: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 255, default: 'user' })
    role: string;

    @Column({default: true})
    active: boolean;

    @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
    create_at: Date;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
    update_at: Date;

    @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
    delete_at: Date;
}
