"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Por favor, complete todos los campos")
      return
    }

    const success = login(username, password)
    if (success) {
      router.push("/")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="container mx-auto flex h-[calc(100vh-8rem)] items-center justify-center px-4 py-8">
      <Card className="mx-auto w-full max-w-md border-border/40 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Acceso Administrador</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder al panel de administración</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="/recuperar-contrasena" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Si tienes problemas para acceder, contacta al administrador de la liga
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
