import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import LoginForm from "../modules/auth/LoginForm";
import RegisterForm from "../modules/auth/RegisterForm";

interface AuthPageProps {
    title?: string;
    subtitle?: string;
    brandName?: string;
    loginText?: string;
    registerText?: string;
}

const AuthPage: React.FC<AuthPageProps> = ({
    title = "Bienvenido",
    subtitle = "Inicia sesión en tu cuenta o crea una nueva.",
    brandName = "Tu App",
    loginText = "Inicia sesión para continuar con tu experiencia.",
    registerText = "Únete hoy para comenzar.",
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    useEffect(() => {
        if (location.pathname === "/register") {
            setActiveTab("register");
        } else {
            setActiveTab("login");
        }
    }, [location.pathname]);

    const handleTabChange = (value: string) => {
        const newTab = value as "login" | "register";
        setActiveTab(newTab);
        navigate(`/${newTab}`, { replace: true });
    };

    // const {
    //   mutate: loginUser,
    //   isPending: isLoginPending,
    //   isError: isLoginError,
    //   error: loginError,
    // } = useLogin();

    const onLoginSubmit = (data: any) => {
        console.log("Login data:", data);
        // loginUser(data, {
        //   onSuccess: () => {
        //     navigate("/dashboard");
        //   },
        // });
    };

    // const {
    //   mutate: registerUser,
    //   isPending: isRegisterPending,
    //   isError: isRegisterError,
    //   error: registerError,
    // } = useRegister();

    const onRegisterSubmit = (data: any) => {
        console.log("Register data:", data);
        // const payload = {
        //   userName: data.userName,
        //   email: data.email,
        //   password: data.password,
        //   role: data.role,
        // };
        // registerUser(payload, {
        //   onSuccess: () => {
        //     loginUser(
        //       { email: data.email, password: data.password },
        //       {
        //         onSuccess: () => {
        //           navigate("/dashboard");
        //         },
        //         onError: (err) => {
        //           console.error("Auto-login error:", err);
        //           navigate("/login");
        //         },
        //       }
        //     );
        //   },
        //   onError: (err) => {
        //     console.error("Registration error:", err);
        //   },
        // });
    };

    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center p-6 lg:p-12">
                <Card className="w-full max-w-md border-none">
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center mb-6">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground mt-4">
                                {title}
                            </h1>
                            <p className="text-muted-foreground text-center mt-2">
                                {subtitle}
                            </p>
                        </div>

                        <Tabs
                            value={activeTab}
                            onValueChange={handleTabChange}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                                <TabsTrigger value="register">Registrarse</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <LoginForm
                                    onSubmit={onLoginSubmit}
                                    isLoginPending={false}
                                    isLoginError={false}
                                    loginError={null}
                                />
                            </TabsContent>

                            <TabsContent value="register">
                                <RegisterForm
                                    onSubmit={onRegisterSubmit}
                                    isRegisterPending={false}
                                    isRegisterError={false}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden lg:flex items-center justify-center bg-linear-to-b from-transparent to-zinc-900/90">
                <div className="text-center text-zinc-50 max-w-lg">
                    <h2 className="text-6xl font-bold tracking-tight mb-4">{brandName}</h2>
                    <p className="text-lg text-zinc-200">
                        {activeTab === "register" ? registerText : loginText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
