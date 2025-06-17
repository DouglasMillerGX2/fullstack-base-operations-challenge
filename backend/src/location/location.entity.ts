import { Event } from '../event/event.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timezone: string;

  @OneToMany(() => Event, (event) => event.location)
  events: Event[];
}
