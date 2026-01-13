import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/form";
import React from 'react'
import { useForm, } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type ILogin } from "./schemas/login.schema";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface LoginFormProps {
    onSubmit: (data: ILogin) => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    isLoginPending?: boolean;
    isLoginError?: boolean;
    loginError?: any;
}

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit: onLoginSubmit,
    isLoginPending,
    isLoginError,
    loginError,
}) => {

    const loginForm = useForm<ILogin>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    return (
        <Form {...loginForm}>
            <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="login-email"
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">
                                Contraseña
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="login-password"
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
                    disabled={isLoginPending}
                >
                    {isLoginPending
                        ? "Iniciando sesión..."
                        : "Iniciar Sesión"}
                </Button>
                {isLoginError && (
                    <div className="mt-4 text-destructive text-sm font-semibold text-center">
                        {loginError?.message || "Error al iniciar sesión"}
                    </div>
                )}
            </form>
        </Form>
    )
}

export default LoginForm