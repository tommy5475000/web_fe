export type EditChangePassProps = {
  handleClose: () => void;
  rowSelect: EditChangePassForm | null;
};

export type EditChangePassForm = {
  userId?: string;
  pass: string;
};

// export type EditChangePassPayload = Omit<EditChangePassForm, 'confirmPass'>;
