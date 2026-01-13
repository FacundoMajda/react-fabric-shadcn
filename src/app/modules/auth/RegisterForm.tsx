import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/form";
import React from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema, type IRegister } from './schemas/register.schema';

interface RegisterFormProps {
    onSubmit: (data: IRegister) => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    isRegisterPending?: boolean;
    isRegisterError?: boolean;
}
const RegisterForm: React.FC<RegisterFormProps> = ({
    onSubmit: onRegisterSubmit,
    isRegisterPending,
    isRegisterError,

}) => {

    const registerForm = useForm<IRegister>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    })

    return (
        <Form {...registerForm}>
            <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                    control={registerForm.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">
                                Nombre de usuario
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="register-username"
                                    type="text"
                                    placeholder="usuario123"
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">
                                Contraseña
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="register-password"
                                    type="password"
                                    placeholder="********"
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full mt-6 font-bold"
                    disabled={isRegisterPending}
                >
                    {isRegisterPending ? "Registrando..." : "Registrarse"}
                </Button>
                {isRegisterError && (
                    <div className="mt-4 text-destructive text-sm font-semibold text-center">
                        {isRegisterError || "Error al registrarse"}
                    </div>
                )}
            </form>
        </Form>
    )
}

export default RegisterForm