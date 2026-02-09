export type createUserPros = {
  handleClose: () => void;
};

export type CreateUserForm = {
  userName: string;
  pass: string;
  confirmPass: string;
  email: string;
  brithday?: string;
  phone?: string;
  fullName: string;
  address?: string;
  // vaiTro:string;
};

export type CreateUserPayload = Omit<CreateUserForm, 'confirmPass'>;
