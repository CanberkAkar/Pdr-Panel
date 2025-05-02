import { Column, CreateDateColumn, DeleteDateColumn, Entity ,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class Appointments {
    //DB MODELINI OLUŞTURUYORUZ
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    psychologistId: number;
    @Column()
    patientName:string;
    @Column()
    patientId:string;
    @Column()
    dateTime:Date;
    @Column()
    duration:number;
    @Column()
    status:string;
    @Column()
    note:string;
    @CreateDateColumn()
    createDate!:Date;
    @UpdateDateColumn()
    updatedDate!:Date;
    @DeleteDateColumn()
    deletedDate!:Date;
}