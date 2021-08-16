import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import { Container } from './styles';

type TableProps = {
  columns: GridColDef[];
  rows: Array<Object>;
}

const Table: React.FC<TableProps> = ({ rows, columns }) => {
  return (
    <Container>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Container>
  );
}

export default Table;