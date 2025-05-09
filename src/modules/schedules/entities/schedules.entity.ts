import { Column, CreateDateColumn, DeleteDateColumn, Entity ,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class Schedules {
    //DB MODELINI OLUŞTURUYORUZ
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    psychologistId: number;
    @Column()
    day:Date;
    @Column({ type: "time" })
    startTime: string;
    @Column({ type: "time" })
    endTime: string;
    @CreateDateColumn()
    createDate!:Date;
    @UpdateDateColumn()
    updatedDate!:Date;
    @DeleteDateColumn()
    deletedDate!:Date;
}