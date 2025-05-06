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
    patientId:number;
    @Column()
    dateTime:Date;
    @Column()
    duration:string;
    @Column()
    status:string;
    @Column()
    notes:string;
    @CreateDateColumn()
    createDate!:Date;
    @UpdateDateColumn()
    updatedDate!:Date;
    @DeleteDateColumn()
    deletedDate!:Date;
}