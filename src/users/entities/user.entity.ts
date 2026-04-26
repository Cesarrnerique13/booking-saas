import { Exclude } from "class-transformer";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'varchar',
        length:50
    })
    name:string;

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

    @Column({
        type: 'text',
        select: false
    })
    password:string;

    @Column({
        type: 'text',
        array: true,
        default: ['user']
    })
    roles:string[]

    @Column({
        type: 'bool',
        default: true
    })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedAt:Date;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
            this.checkFieldsBeforeInsert();
    }
}