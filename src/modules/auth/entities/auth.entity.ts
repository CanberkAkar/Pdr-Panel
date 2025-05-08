import { Column, CreateDateColumn, DeleteDateColumn, Entity ,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class Users {
    //DB MODELINI OLUŞTURUYORUZ
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    contact:string;
    @Column()
    role:string;
    @Column()
    phoneNumber:string;
    @CreateDateColumn()
    createDate!:Date;
    @UpdateDateColumn()
    updatedDate!:Date;
    @DeleteDateColumn()
    deletedDate!:Date;
    @Column({default:1})
    isPatients:number;
    @Column()
    doctorId:number;
}