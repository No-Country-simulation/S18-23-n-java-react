import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, Link } from '@mui/material';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        minHeight: '100vh', // Altura mínima para ocupar toda la pantalla
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
            <Typography>
              Acepto los <Link href="#" target="_blank" rel="noopener noreferrer">términos y condiciones</Link> y las
              <Link href="#" target="_blank" rel="noopener noreferrer"> políticas de privacidad</Link>.
            </Typography>
          }
        />
        {errors.termsAccepted && <Typography color="error">{errors.termsAccepted.message}</Typography>}

        {/* Botón de envío */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrarte
        </Button>

        {/* Enlace para iniciar sesión */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta? <Link href="#">Iniciar Sesión</Link>
        </Typography>
      </Box>
    </Box>
  );
};
// import './registerFormStyles.css';

// export const Register = () => {

//     return(
//     <form>
//       <div className='second-div'>
//         <div>
//           <span>Crear cuenta</span>
//         </div>  
//         <div>
//           <label htmlFor="firstName">Nombre:</label>
//           <input type="text" id='firstName' name='firstName' pattern='[A-Za-z\s]+' placeholder='Ingresa tu nombre' required />
//         </div>
//         <div>
//           <label htmlFor="lastName">Apellido:</label>
//           <input type="text" id='lastName' name='lastName' pattern='[A-Za-z\s]+' placeholder='Ingresa tu apellido' required />
//         </div>
//         <div>
//           <label htmlFor="email">Correo:</label>
//           <input type="email" id='email' name='email' placeholder='mail@abc.com' required />
//         </div>
//         <div>
//           <label htmlFor="password">Contraseña:</label>
//           <input type="password" id='password' name='password' placeholder='Ingresa tu contraseña' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}" required />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
//           <input type="password" id='confirmPassword' name='confirmPassword' placeholder='Confirma tu contraseña' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}" required />
//         </div>
//       </div>
//       <label className='checkbox'>
//         <input type="checkbox" required />
//         <p>Acepto los <a href="#" target="_blank" rel="noopener noreferrer">términos y condiciones</a> y las 
//         <a href="#" target="_blank" rel="noopener noreferrer"> políticas de privacidad</a>.</p> 
//       </label>
//       <button type="submit">Registrarte</button>
//       <p>¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a></p>  
//     </form>
//     );
// };