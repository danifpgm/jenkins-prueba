import { Usuario } from "src/modulos/auth/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('criptomonedas')
export class Cripto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    nombre: string;

     @Column('numeric', {
       default: 0
    })
    precio: number;

    @ManyToMany(
       () => Usuario,
       ( usuario ) => usuario.criptos,
       {  onDelete: 'CASCADE' }
    )
    usuarios: Usuario[]
}