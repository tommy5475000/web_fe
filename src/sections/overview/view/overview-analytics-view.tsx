import Slider from 'react-slick';

const SlickSlider: any = Slider;

import { Box, Card, Typography, CardContent } from '@mui/material';

const images = [
  'https://benthanhtsc.com/wp-content/uploads/2019/11/dia_oc_01-1-1024x935.jpg',
  'https://benthanhtsc.com/wp-content/uploads/2019/11/dia_oc_02-1-1024x935.jpg',
  'https://benthanhtsc.com/wp-content/uploads/2019/11/dia_oc_06-1024x935.jpg',
];

export function OverviewAnalyticsView() {
  const slider = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
  };

  return (
    <Box p={3}>
      <Card
        sx={{
          mb: 3,
          p: 3,
          background: 'linear-gradient(135deg,#1976d2,#42a5f5)',
          color: '#fff',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Xin chào 👋
        </Typography>

        <Typography>Chúc bạn một ngày làm việc hiệu quả</Typography>
      </Card>

      {/* Slide */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SlickSlider {...slider}>
            {images.map((img) => (
              <Box key={img}>
                <img
                  src={img}
                  style={{
                    width: '100%',
                    height: 450,
                    objectFit: 'contain',
                    borderRadius: 10,
                  }}
                />
              </Box>
            ))}
          </SlickSlider>
        </CardContent>
      </Card>
    </Box>
  );
}
