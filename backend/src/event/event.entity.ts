import { Location } from '../location/location.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  point: object;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Location, (location) => location.events)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
