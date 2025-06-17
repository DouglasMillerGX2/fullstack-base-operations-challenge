import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  } from 'recharts';
  import { Typography, Box } from '@mui/material';
  
  function formatMonth(dateString: string) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`; 
  }
  
  export default function TimeSeriesChart({ data }: { data: any[] }) {
    const formattedData = data.map((item) => ({
      ...item,
      month: formatMonth(item.month), 
      total: Number(item.total),   
    }));
  
    return (
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Monthly Events Chart
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 500]} />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#FFD700" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  }
  