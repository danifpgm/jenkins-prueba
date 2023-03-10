import { Usuario } from "src/modulos/auth/entities/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity('broker')
export class Broker {
    @PrimaryColumn('text')
    cif: string;

    @Column('text')
    nombre: string;

    @Column('text')
    url: string;

    @Column('text')
    direccion: string;

    @Column('text')
    correo_contacto: string;

    @Column('numeric')
    tlfn_contacto: number;

    @ManyToMany(
    () => Usuario,
    ( usuario ) => usuario.brokers
    )
    @JoinTable({ name: 'broker_tiene_cliente' })
    usuarios: Usuario[]
}
