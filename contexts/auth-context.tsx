"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  username: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("lifus_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const validUsers = {
    david: { password: "david2025", isAdmin: true },
    misael: { password: "misael123", isAdmin: true },
    pablo: { password: "pabloadmin", isAdmin: true },
    eric: { password: "eric2025", isAdmin: true },
    victor: { password: "victor321", isAdmin: true },
    mateo: { password: "mateoadmin", isAdmin: true },
  }

  const login = (username: string, password: string): boolean => {
    const lowercaseUsername = username.toLowerCase()
    const userInfo = validUsers[lowercaseUsername as keyof typeof validUsers]

    if (userInfo && userInfo.password === password) {
      const userData = {
        username: lowercaseUsername,
        isAdmin: userInfo.isAdmin,
      }
      setUser(userData)
      localStorage.setItem("lifus_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lifus_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
