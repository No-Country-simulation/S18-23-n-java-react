import './registerFormStyles.css';

export const Register = () => {

    return(
    <form>
      <div className='second-div'>
        <div>
          <span>Crear cuenta</span>
        </div>  
        <div>
          <label htmlFor="firstName">Nombre:</label>
          <input type="text" id='firstName' name='firstName' pattern='[A-Za-z\s]+' placeholder='Ingresa tu nombre' required />
        </div>
        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input type="text" id='lastName' name='lastName' pattern='[A-Za-z\s]+' placeholder='Ingresa tu apellido' required />
        </div>
        <div>
          <label htmlFor="email">Correo:</label>
          <input type="email" id='email' name='email' placeholder='mail@abc.com' required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id='password' name='password' placeholder='Ingresa tu contraseña' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" id='confirmPassword' name='confirmPassword' placeholder='Confirma tu contraseña' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}" required />
        </div>
      </div>
      <label className='checkbox'>
        <input type="checkbox" required />
        <p>Acepto los <a href="#" target="_blank" rel="noopener noreferrer">términos y condiciones</a> y las 
        <a href="#" target="_blank" rel="noopener noreferrer"> políticas de privacidad</a>.</p> 
      </label>
      <button type="submit">Registrarte</button>
      <p>¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a></p>  
    </form>
    );
};