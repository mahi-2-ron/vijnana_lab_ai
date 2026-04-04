import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required.')
  .email('Please enter a valid email address.')
  .max(254, 'Email is too long.')
  .transform(val => val.toLowerCase());

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters.');

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters.')
  .max(100, 'Name is too long.')
  .regex(/^[a-zA-Z\s'\-\.]+$/, 'Name contains invalid characters.')
  .transform(val => val.replace(/\s+/g, ' '));

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotInput = z.infer<typeof forgotPasswordSchema>;
 
