export type EditUserProps = {
  handleClose: () => void;
  rowSelect: EditUserForm | null;
};

export type EditUserForm = {
  userId?:string;
  userName: string;
  // pass: string;
  // confirmPass: string;
  email: string;
  brithday?: string;
  phone?: string;
  fullName: string;
  address?: string;
  status?: boolean;
};

export type EditUserPayload = Omit<EditUserForm, 'confirmPass'>;
