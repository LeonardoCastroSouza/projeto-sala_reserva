
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const AuthHeader = () => {
  const { logout, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        <span>{user?.email}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="h-4 w-4" />
        <span>Sair</span>
      </Button>
    </div>
  );
};
