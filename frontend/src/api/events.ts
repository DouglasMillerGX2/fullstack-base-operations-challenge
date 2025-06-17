import api from './axios';
import type { RecentEventsDto, TimeSeriesDto } from './dtos/events/event.dto';


export const getTimeSeries = async (locationId: number): Promise<TimeSeriesDto[]> => {
  try {
    const res = await api.get(`/event/location/${locationId}/time-series`);
    console.log(res.data, 'res.data.timeSeries');
    return res.data;
  } catch (error) {
    console.error('Error fetching time series:', error);
    throw error;
  }
};

export const getRecentEvents = async (locationId: number): Promise<RecentEventsDto[]> => {
  try {
    const res = await api.get(`/event/location/${locationId}/recent-events`);
    console.log(res.data, 'res.data.recentEvents');
    return res.data;
  } catch (error) {
    console.error('Error fetching recent events:', error);
    throw error;
  }
};
