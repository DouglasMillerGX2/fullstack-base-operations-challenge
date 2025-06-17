import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getAllLocations(): Promise<Location[]> {
    const locations = await this.locationService.findAll();
    if (!locations) {
      throw new Error('No locations found');
    }
    return locations;
  }

  @Get(':id')
  async getLocationById(@Param('id') id: number): Promise<Location> {
    return await this.locationService.findById(id);
  }
}
