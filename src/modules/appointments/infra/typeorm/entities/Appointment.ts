import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment
{
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider_id: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

}

export default Appointment;


