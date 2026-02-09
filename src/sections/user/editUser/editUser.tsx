import type { SubmitHandler } from 'react-hook-form';

import { useState } from 'react';
import { ref, object, string, boolean } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Grid from '@mui/material/GridLegacy';
import {
  Radio,
  Button,
  TextField,
  InputLabel,
  IconButton,
  RadioGroup,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { editUser } from 'src/apis/user';

import { Iconify } from 'src/components/iconify';
import { showAlert, capitalizeFirstLetter } from 'src/components/alert';

import { widthImport } from 'src/sections/invoice-it/utils';

import type { EditUserProps, EditUserPayload } from './type';

const editSchema = object({
  userName: string().required('Không để trống tên đăng nhập'),
  //   pass: string()
  //     .required('Không để trống mật khẩu')
  //     .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  //       'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
  //     ),
  //   confirmPass: string()
  //     .required('Vui lòng nhập lại mật khẩu')
  //     .oneOf([ref('pass')], 'Mật khẩu nhập lại không khớp'),
  email: string().email('Email không đúng định dạng').required('Không được để trống email'),
  brithday: string(),
  phone: string().matches(/^\d+$/, 'Phải là số'),
  fullName: string().required('Không được để trống họ tên'),
  address: string(),
  status: boolean(),
});

export function EditUser({ handleClose, rowSelect }: EditUserProps) {
  const queryClient = useQueryClient();
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      fullName: rowSelect?.fullName ?? '',
      userName: rowSelect?.userName ?? '',
      //   pass: '',
      //   confirmPass: '',
      email: rowSelect?.email ?? '',
      phone: rowSelect?.phone ?? '',
      brithday: rowSelect?.brithday ?? '',
      address: rowSelect?.address ?? '',
      status: rowSelect?.status ?? false,
    },
    resolver: yupResolver(editSchema),
    mode: 'onTouched',
  });

  const { mutate } = useMutation({
    mutationFn: (values: EditUserPayload) => {
      const forrmatValues = {
        ...values,
        fullName: capitalizeFirstLetter(values.fullName),
        address: capitalizeFirstLetter(values.address ?? ''),
        status: values.status ? 1 : 0,
      };
      return editUser(forrmatValues);
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      showAlert({ type: 'success', message: 'Đã cập nhật thành công' });
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['dataUser'],
      });
    },
  });

  const handleForSubmit: SubmitHandler<EditUserPayload> = (data) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(handleForSubmit)}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Họ tên</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Tên đăng nhập </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('userName')}
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
          </Grid>
        </Grid>

        {/* <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Mật khẩu </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('pass')}
              error={!!errors.pass}
              helperText={errors.pass?.message}
              type={showPassword ? 'text' : 'password'}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid> */}

        {/* <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Nhập lại mật khẩu</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('confirmPass')}
              error={!!errors.confirmPass}
              helperText={errors.confirmPass?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid> */}

        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Email</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Số điện thoại</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Ngày sinh</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="date"
              variant="standard"
              sx={{ ...widthImport }}
              {...register('brithday')}
              error={!!errors.brithday}
              helperText={errors.brithday?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Địa chỉ</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Trạng thái </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  value={field.value ? 'true' : 'false'}
                  onChange={(e) => field.onChange(e.target.value === 'true')}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Hoạt động" />
                  <FormControlLabel value="false" control={<Radio />} label="Ngưng hoạt động" />
                </RadioGroup>
              )}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Huỷ
          </Button>
          <Button color="primary" type="submit" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
}
