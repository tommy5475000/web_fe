import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DashboardContent } from 'src/layouts/dashboard';
import { getAllDashboardAdmin } from 'src/apis/dashboardAdmin';

export function ReportView() {
  const { data = [] } = useQuery({
    queryKey: ['dashboardAdmin'],
    queryFn: getAllDashboardAdmin,
  });
    const [current, setCurrent] = useState(0);
  
    return (
      <DashboardContent
        maxWidth="xl"
        sx={{ height: 'calc(102vh)', width: '100%', overflow: 'hidden' }}
      >

        <iframe
          title={data[current]?.title}
          height="100%"
          width="100%"
          src={data[current]?.link}
          frameBorder={0}
          style={{ border: 0, display: 'block' }}
          allowFullScreen
        />
  
      </DashboardContent>
    );
  
}
