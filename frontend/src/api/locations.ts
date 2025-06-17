import api from './axios';
import type { LocationDto } from './dtos/locations/location.dto';

export const getLocations = async (): Promise<LocationDto[]> => {
    try {
      const res = await api.get('/locations');
      return res.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  };