import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() // decorador que define entidad
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    name: string;

    @Column()
    age: string;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true, // para que traiga las razasal hacer un findOne
    }) 
    breed: string;

    // almacena fecha y hora de la eliminacion --> cuando se llama a metodo delete. No se elimina de la db
    @DeleteDateColumn()
    deleteDateColumn: Date;
}
