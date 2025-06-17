import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { Location } from '../location/location.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async locationExists(locationId: number): Promise<boolean> {
    const count = await this.locationRepository.count({ where: { id: locationId } });
    return count > 0;
  }

  async getMonthlyTimeSeries(locationId: number) {
    try {
      return await this.eventRepository.query(
        `
        SELECT 
          DATE_TRUNC('month', date) AS month,
          SUM(count)::int AS total
        FROM events
        WHERE location_id = $1
        GROUP BY month
        ORDER BY month ASC
        `,
        [locationId],
      );
    } catch (error) {
      console.error('Error fetching monthly time series:', error);
      throw new InternalServerErrorException('Unable to fetch time series data');
    }
  }

  async getRecentEvents(locationId: number) {
    try {
      const result = await this.eventRepository.query(
        `
        SELECT 
          DATE(e.date) AS date,
          SUM(e.count)::int AS total,
          l.name
        FROM events e
        JOIN locations l ON e.location_id = l.id
        WHERE e.location_id = $1
        GROUP BY DATE(e.date), l.name
        ORDER BY DATE(e.date) DESC
        LIMIT 3
        `,
        [locationId],
      );
  
      return result.map((row: any) => ({
        date: row.date,
        total: row.total,
        name: row.name,
      }));
    } catch (error) {
      console.error('Error fetching recent aggregated events:', error);
      throw new InternalServerErrorException('Unable to fetch aggregated events');
    }
  }
  
}
