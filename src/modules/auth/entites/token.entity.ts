import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  token: string;

  @CreateDateColumn()
  create_date: Date;

  @Column({ type: 'timestamp' })
  expires_at: Date;
}
