import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Index()
    @Column({
        type:'varchar',
        length:50
    })
    name:string;

    @Index()
    @Column({
        type:'varchar',
        length:255,
        unique:true
    })
    email:string;

    @Column({
        type:'varchar', 
        length:15, 
        nullable:true,
        unique:true
    })
    phone:string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt:Date;
}