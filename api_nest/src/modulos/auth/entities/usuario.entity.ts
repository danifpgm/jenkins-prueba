import { Broker } from "src/modulos/broker/entities/broker.entity";
import { Cripto } from "src/modulos/cripto/entities/cripto.entity";
import { Nft } from "src/modulos/nft/entities/nft.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios') 
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    // @PrimaryColumn()
    // dni: string;

    @Column('text', { select: false })
    passwd: string;

    @Column('text', { unique: true })
    correo: string;

    @Column('text')
    nombreCompleto: string;

    @Column('bool', { default: true })
    esActivo: boolean;

    @Column('text', {
        array: true,
        default: ['usuario']
    })
    roles: string[]

    @OneToOne(
    () => Nft,
    (nft) => nft.creadoPorUsuario,
    { cascade: true, eager: true }
    )
    creaNft?: Nft;
    
    @OneToMany(
        () => Nft,
        (nft) => nft.poseeUsuario,
        { cascade: true, eager: true }
    )
    poseeNft?: Nft[];

    @ManyToMany(
    () => Cripto,
    ( cripto ) => cripto.usuarios
    )
    @JoinTable({ name: 'usuario_posee_cripto' })
    criptos: Cripto[]

    @ManyToMany(
        () => Broker,
        ( broker ) => broker.usuarios,
        {  onDelete: 'CASCADE' }
     )
     brokers: Broker[]

     @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.correo = this.correo.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }
}
