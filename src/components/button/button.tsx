import { Grid, Button } from '@mui/material';

import { ButtonGroupProps } from './types';

export function ButtonGroup({ handleOpen, handleExport, handleImport }: ButtonGroupProps) {
  return (
    <Grid>
      {handleOpen && (
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mr: 0.5 }}>
          Thêm
        </Button>
      )}
      {handleExport && (
        <Button variant="contained" color="primary" onClick={handleImport} sx={{ mr: 0.5 }}>
          Import
        </Button>
      )}
      {handleImport && (
        <Button variant="contained" color="primary" onClick={handleExport} sx={{ mr: 0.5 }}>
          Export
        </Button>
      )}
    </Grid>
  );
}
