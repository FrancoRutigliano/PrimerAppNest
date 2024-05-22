import { Role } from "../../common/enums/role.enum";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;


    @Column({ nullable: false, select: false }) // select lo que hace es no devolver la password en el payload para no exponer info delicada
    password: string;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: string; 

    @DeleteDateColumn()
    deletedAt: Date
}
