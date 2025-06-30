
"use client"

import { Calendar, Settings, Building, UserCircle, LogOut } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"

// Menu items
const items = [
  {
    title: "Cadastrar Sala",
    url: "/",
    icon: Settings,
  },
  {
    title: "Salas Cadastradas",
    url: "/salas",
    icon: Building,
  },
  {
    title: "Reservas",
    url: "/reservas",
    icon: Calendar,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const { logout, user } = useAuth()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Building className="h-6 w-6 text-orange-600" />
          {!isCollapsed && (
            <h1 className="text-lg font-semibold text-orange-600">
              Sistema de Salas
            </h1>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentPath === item.url}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserCircle />
              <span className="truncate">{user?.email || 'Usuário'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
