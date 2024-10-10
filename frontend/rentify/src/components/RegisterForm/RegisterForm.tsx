import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Snackbar, Alert, Link, SnackbarCloseReason } from '@mui/material';


interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>({
    mode: 'onChange',
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const password = watch("password");

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
    
    // Simulamos una lógica de registro
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      setMessage('Registro exitoso');
      setSeverity('success');
    } else {
      setMessage('Error en el registro');
      setSeverity('error');
    }
    
    setOpen(true);
  };

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear cuenta
        </Typography>
        
        {/* Nombre */}
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          {...register("firstName", {
            required: "El nombre es obligatorio",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Solo se permiten letras y espacios"
            }
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        
        {/* Apellido */}
        <TextField
          label="Apellido"
          fullWidth
          margin="normal"
          {...register("lastName", {
            required: "El apellido es obligatorio",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Solo se permiten letras y espacios"
            }
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        
        {/* Correo */}
        <TextField
          label="Correo"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Correo electrónico no válido"
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        
        {/* Contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "La contraseña es obligatoria",
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}/,
              message: "Debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un símbolo especial"
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        
        {/* Confirmar Contraseña */}
        <TextField
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword", {
            required: "Por favor confirma tu contraseña",
            validate: value => value === password || "Las contraseñas no coinciden"
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {/* Aceptar Términos */}
        <FormControlLabel
          control={
            <Checkbox
              {...register("termsAccepted", { required: "Debes aceptar los términos y condiciones" })}
            />
          }
          label={
            <Typography sx={{ fontSize: '12px' }}>
              Acepto los <Link href="#" target="_blank" rel="noopener noreferrer">términos y condiciones</Link> y las
              <Link href="#" target="_blank" rel="noopener noreferrer"> políticas de privacidad</Link>.
            </Typography>
          }
        />
        {errors.termsAccepted && <Typography sx={{ fontSize: '14px' }} color="error">{errors.termsAccepted.message}</Typography>}

        {/* Botón de envío */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrarte
        </Button>

        {/* Enlace para iniciar sesión */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta? <Link href="#">Iniciar Sesión</Link>
        </Typography>

        {/* Snackbar para mostrar mensajes */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key={'top' + 'right'}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      </Box>
    </Box>
  );
};