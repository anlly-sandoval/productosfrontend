import { z } from 'zod';

export const addressSchema = z.object({
    name: z.string()
        .min(2, {message: 'El nombre debe tener al menos 2 caracteres'})
        .max(50, {message: 'El nombre no puede exceder 50 caracteres'})
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
            message: 'El nombre solo puede contener letras y espacios'
        }),
    address: z.string()
        .min(10, {message: 'La direccion debe tener al menos 10 caracteres'})
        .max(200, {message: 'La direccion no puede exceder 200 caracteres'})
        .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-]+$/,{
            message: 'La direccion contiene caracteres no validos'
        }),
    phone: z.string()
        .min(10, {message: 'El telefono debe tener al menos 10 digitos'})
        .max(15, {message: 'El telefono no puede exceder 15 digitos'})
        .regex(/^[\d\s\+\-\(\)]+$/, {
            message: 'Formato de telefono invalido. Use solo numeros, espacios, +, -, (, )'
        })
        .transform((val) => val.replace(/\s+/g, ''))
        .refine((val) => {
            const digitsOnly = val.replace(/\D/g, '');
            return digitsOnly.length >= 10;
        }, {message: 'El telefono debe contener al menos 10 digitos'})     
});