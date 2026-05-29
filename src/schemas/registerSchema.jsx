import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string('Nombre de usuario requerido').min(5, 'El nombre debe al menos 5 caracteres').max(20, 'El nombre de usuario no puede tener mas de 20 caracteres')
                .regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, numeros y guion bajo'),
    email: z.email({
        error: (email) => email.input === undefined ? "Email es requerido" : "Formato de email invalido"
    }),
    password: z.string('Contrasena requerida').min(6, 'La contrasena debe de tener al menos 6 caracetres').max(20, 'Contrasena demasiado larga'),
    confirm: z.string('Confirmacion de contrasena requerida').min(6, 'La confirmacion debe de tener al menos 6 caracteres').max(20, 'Confirmacion demasiado larga'),
})
.refine((data)=> data.password === data.confirm, {
    message: 'Las contrasena no coinciden',
    path: ['confirm']
});