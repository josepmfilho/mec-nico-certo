import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: "default" | "primary" | "mecanico" | "admin";
}

const variantStyles = {
  default: "border-border",
  primary: "border-primary/20 bg-primary/5",
  mecanico: "border-mecanico/20 bg-mecanico/5",
  admin: "border-admin/20 bg-admin/5",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  mecanico: "bg-mecanico/10 text-mecanico",
  admin: "bg-admin/10 text-admin",
};

export const KPICard = ({ title, value, subtitle, icon: Icon, trend, variant = "default" }: KPICardProps) => {
  return (
    <Card className={cn("border transition-all hover:shadow-md", variantStyles[variant])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold font-display tracking-tight">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trend && (
              <p className={cn("text-xs font-medium", trend.value >= 0 ? "text-success" : "text-destructive")}>
                {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
              </p>
            )}
          </div>
          <div className={cn("rounded-xl p-2.5", iconStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
