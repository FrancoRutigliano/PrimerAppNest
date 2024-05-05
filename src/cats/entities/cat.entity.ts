import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // decorador que define entidad
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    name: string;

    @Column()
    age: string;

    @Column()
    breed: string;

    // almacena fecha y hora de la eliminacion --> cuando se llama a metodo delete. No se elimina de la db
    @DeleteDateColumn()
    deleteDateColumn: Date;
}
