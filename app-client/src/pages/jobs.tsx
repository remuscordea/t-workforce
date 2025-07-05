import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { CONFIG } from 'src/config-global';
import { GET_JOBS } from 'src/graphql/queries';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  createdAt?: string;
};

export default function Page() {
  const { data, loading, error } = useQuery<{ getAllJobs: Job[] }>(GET_JOBS);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const jobs = data?.getAllJobs || [];
  const pageCount = Math.max(1, Math.ceil(jobs.length / rowsPerPage));
  const displayed = jobs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <title>{`Jobs - ${CONFIG.appName}`}</title>
      <DashboardContent>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Jobs
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error loading jobs</Typography>}
        {displayed.map((job) => (
          <Card key={job.id} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {job.location} • {job.type}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {job.description}
            </Typography>
          </Card>
        ))}
        {jobs.length > rowsPerPage && (
          <Box sx={{ mt: 3, mx: 'auto' }}>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} />
          </Box>
        )}
      </DashboardContent>
    </>
  );
}
