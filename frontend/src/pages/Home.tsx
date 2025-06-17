import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Box
} from '@mui/material';
import {
  getTimeSeries,
  getRecentEvents
} from '../api/events';
import { getLocations } from '../api/locations';
import TimeSeriesChart from '../components/TimeSeriesChart';
import EventList from '../components/EventList';
import type { RecentEventsDto, TimeSeriesDto } from '../api/dtos/events/event.dto';

interface Location {
  id: number;
  name: string;
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [chartData, setChartData] = useState<TimeSeriesDto[]>([]);  
  const [events, setEvents] = useState<RecentEventsDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch(() => {
        alert('Erro ao carregar localidades.');
      });
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;

    setLoading(true);

    Promise.all([
      getTimeSeries(selectedLocation.id),
      getRecentEvents(selectedLocation.id),
    ])
      .then(([chart, recent]) => {
        setChartData(chart);
        setEvents(recent);
      })
      .catch(() => alert('Erro ao carregar dados da localização.'))
      .finally(() => setLoading(false));
  }, [selectedLocation]);

  return (
    <Container
      sx={{
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#fff',
        py: 4,
      }}
    >
      <Typography variant="h4" color="primary" mb={2}>
        Base Operations Dashboard
      </Typography>
      <Autocomplete
  options={locations}
  getOptionLabel={(option) => option.name || ''}
  sx={{ mb: 4, width: 300 }}
  value={selectedLocation}
  onChange={(_, newValue) => setSelectedLocation(newValue)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Location"
      variant="outlined"
      InputLabelProps={{
        style: { color: '#FFD700' },
      }}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: '#1a1a1a',
          color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#FFD700',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#FFD700',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#FFD700',
        },
      }}
    />
  )}
/>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="inherit" />
        </Box>
      )}

      {!loading && selectedLocation && (
        <>
          <TimeSeriesChart data={chartData} />
          <EventList events={events} />
        </>
      )}

      {!selectedLocation && !loading && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please select a location to view event data.
        </Typography>
      )}
    </Container>
  );
}
