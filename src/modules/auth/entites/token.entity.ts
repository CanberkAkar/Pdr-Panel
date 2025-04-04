import { Column, CreateDateColumn, Entity ,PrimaryGeneratedColumn} from "typeorm";


@Entity('user_tokens')
export class UserToken {
    //DB MODELINI OLUŞTURUYORUZ
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    token:string;
    @CreateDateColumn()
    createDate!:Date;
}