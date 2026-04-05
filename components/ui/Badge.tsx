import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "muted" | "green";
  className?: string;
}

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    muted: "bg-[#232636] text-[#9ca3af] border border-[#2d3148]",
    green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
