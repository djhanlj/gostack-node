import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointments')
class Appointment
{
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  provider: String;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

}

export default Appointment;


