import Swal from 'sweetalert2';
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getAllUser, removeUser } from 'src/apis/user';
import { DashboardContent } from 'src/layouts/dashboard';

import { showAlert } from 'src/components/alert';
import { ModalManager } from 'src/components/modal';
import { ButtonGroup } from 'src/components/button';
// import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { headLabelUser } from 'src/components/Item/item';

import { EditUser } from '../editUser';
import { CreateUser } from '../createUser';
import { ChangePass } from '../changePass';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const queryClient = useQueryClient();
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [rowSelect, setRowSelect] = useState<UserProps | null>(null);
  const [openChangePass, setOpenChangePass] = useState(false);

  const handleOpenCreateUser = () => {
    setOpenCreateUser(true);
  };
  const handleCloseCreateUser = () => {
    setOpenCreateUser(false);
  };

  const handleOpenEditUser = (row: UserProps) => {
    if (table.selected.length === 0) {
      showAlert({ type: 'error', message: 'Chọn User cần thay đổi thông tin' });
      return;
    }

    if (table.selected.length > 1) {
      showAlert({ type: 'error', message: 'Chỉ chọn 1 User' });
      return;
    }

    setRowSelect(rowSelect);
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
    setRowSelect(null);
    table.onSelectAllRows(false, []);
  };

  const { data: dataUser = [] } = useQuery<UserProps[]>({
    queryKey: ['dataUser'],
    queryFn: getAllUser,
  });

  const handleOpenChangePass = (row: UserProps) => {
    if (table.selected.length === 0) {
      showAlert({ type: 'error', message: 'Chọn User cần thay đổi mật khẩu' });
      return;
    }
    if (table.selected.length > 1) {
      showAlert({ type: 'error', message: 'Chỉ chọn 1 User' });
    }
    setRowSelect(rowSelect);
    setOpenChangePass(true);
  };

  const handleCloseChangePass = () => {
    setOpenChangePass(false);
    setRowSelect(null);
    table.onSelectAllRows(false, []);
  };

  const dataFiltered: UserProps[] = applyFilter({
    inputData: dataUser,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleRemove = () => {
    Swal.fire({
      title: 'Bạn có chắc sẽ xoá User này',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        table.selected.forEach((selectId) => {
          handleDelete(selectId);
        });
        table.onSelectAllRows(false, []);
      }
    });
  };

  const { mutate: handleDelete } = useMutation<void, Error, string>({
    mutationFn: (userId) => removeUser(userId),
    onError: () => {
      showAlert({ type: 'error', message: 'User này không tồn tại hoặc đã được xoá' });
    },
    onSuccess: () => {
      showAlert({ type: 'success', message: 'Xoá thành công' });
      queryClient.invalidateQueries({
        queryKey: ['dataUser'],
      });
    },
  });

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Users
        </Typography>
        <ButtonGroup handleOpen={handleOpenCreateUser} />
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          delUser={handleRemove}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((user) => user.userId)
                  )
                }
                headLabel={headLabelUser}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.userId}
                      row={row}
                      selected={table.selected.includes(row.userId)}
                      onSelectRow={() => {
                        table.onSelectRow(row.userId);
                        setRowSelect(row);
                      }}
                      onEditUser={() => handleOpenEditUser(row)}
                      onChangPass={() => handleOpenChangePass(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <ModalManager open={openCreateUser} handleClose={handleCloseCreateUser}>
        <CreateUser handleClose={handleCloseCreateUser} />
      </ModalManager>

      <ModalManager open={openEditUser} handleClose={handleCloseEditUser}>
        {rowSelect && <EditUser handleClose={handleCloseEditUser} rowSelect={rowSelect} />}
      </ModalManager>

      <ModalManager open={openChangePass} handleClose={handleCloseChangePass}>
        {rowSelect && <ChangePass handleClose={handleCloseChangePass} rowSelect={rowSelect} />}
      </ModalManager>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
