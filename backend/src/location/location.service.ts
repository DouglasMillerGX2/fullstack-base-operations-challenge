import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    try {
      const locations = await this.locationRepo.find();

      if (!locations || locations.length === 0) {
        throw new NotFoundException('No locations found');
      }

      return locations;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Unable to retrieve locations');
    }
  }

  async findById(id: number): Promise<Location> {
    try {
      const location = await this.locationRepo.findOneBy({ id });

      if (!location) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      return location;
    } catch (error) {
      console.error(`Error in findById(${id}):`, error);
      throw new InternalServerErrorException('Unable to retrieve location');
    }
  }
}
