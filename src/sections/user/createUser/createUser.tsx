import type { SubmitHandler } from 'react-hook-form';

import { useState } from 'react';
import { ref, object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Grid from '@mui/material/GridLegacy';
import {
  Button,
  TextField,
  InputLabel,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { createUser } from 'src/apis/user';

import { Iconify } from 'src/components/iconify';
import { showAlert, capitalizeFirstLetter } from 'src/components/alert';

import { widthImport } from 'src/sections/invoice-it/utils';

import type { CreateUserForm, createUserPros, CreateUserPayload } from './type';

const createUserSchema = object({
  userName: string().required('Không để trống tên đăng nhập'),
  pass: string()
    .required('Không để trống mật khẩu')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
    ),
  confirmPass: string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([ref('pass')], 'Mật khẩu nhập lại không khớp'),
  email: string().email('Email không đúng định dạng').required('Không được để trống email'),
  brithday: string(),
  phone: string().matches(/^\d+$/, 'Phải là số'),
  fullName: string().required('Không được để trống họ tên'),
  address: string(),
  // vaiTro: string().required('Không được để trống chức vụ'),
});

export function CreateUser({ handleClose }: createUserPros) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      userName: '',
      pass: '',
      email: '',
      brithday: '',
      phone: '',
      fullName: '',
      address: '',
      // vaiTro: '',
    },
    resolver: yupResolver(createUserSchema),
    mode: 'onTouched',
  });

  const pass = watch('pass');

  const { mutate } = useMutation({
    mutationFn: (values: CreateUserPayload) => {
      const forrmatValues = {
        ...values,
        fullName: capitalizeFirstLetter(values.fullName),
        address: capitalizeFirstLetter(values.address ?? ''),
        // vaiTro: capitalizeFirstLetter(values.vaiTro),
      };

      return createUser(forrmatValues);
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      showAlert({ message: 'Thành công', type: 'success' });
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['dataUser'],
      });
    },
  });

  const handleFormSubmit: SubmitHandler<CreateUserForm> = ({ confirmPass, ...data }) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Họ tên:</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.fullName}
              {...register('fullName')}
              helperText={errors.fullName?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Tên đăng nhập:</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.userName}
              {...register('userName')}
              helperText={errors.userName?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Mật khẩu</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.pass}
              {...register('pass')}
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
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Nhập lại mật khẩu</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.confirmPass}
              {...register('confirmPass')}
              helperText={errors.confirmPass?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        <Iconify icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Email:</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.email}
              {...register('email')}
              helperText={errors.email?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Số điện thoại:</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.phone}
              {...register('phone')}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Ngày sinh:</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="date"
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.brithday}
              {...register('brithday')}
              helperText={errors.brithday?.message}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Địa chỉ</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.address}
              {...register('address')}
              helperText={errors.address?.message}
            />
          </Grid>
        </Grid>
        {/* <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <InputLabel>Chức vụ:</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              sx={{ ...widthImport }}
              error={!!errors.vaiTro}
              {...register('vaiTro')}
              helperText={errors.vaiTro?.message}
            />
          </Grid>
        </Grid> */}

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Huỷ
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Tạo
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
}
