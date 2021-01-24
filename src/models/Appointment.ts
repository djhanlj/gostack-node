import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment
{
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  provider: String;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;


