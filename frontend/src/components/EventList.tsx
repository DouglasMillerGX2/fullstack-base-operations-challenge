import { Card, CardContent, Typography, Box } from '@mui/material';

export default function EventList({ events }: { events: any[] }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom mb={2}>
      Event List
      </Typography>
      {events.map((event, index) => (
        <Card key={index} sx={{ mb: 2, backgroundColor: '#1a1a1a' }}>
          <CardContent>
            <Typography color="white">
              <strong>{event.total}</strong> events occurred in <strong>{event.name}</strong> on{' '}
              <strong>{new Date(event.date).toLocaleDateString('en-US')}</strong>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
