import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import { Container } from './styles';

type TableProps = {
  columns: GridColDef[];
  rows: Array<Object>;
  rowsPerPageOptions?: number;
}

const Table: React.FC<TableProps> = ({ rows, columns, rowsPerPageOptions }) => {
  return (
    <Container>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[rowsPerPageOptions ? rowsPerPageOptions : 5]}
      />
    </Container>
  );
}

export default Table;