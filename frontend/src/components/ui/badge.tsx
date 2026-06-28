import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        gray: "border-transparent bg-muted text-muted-foreground",
        blue: "border-transparent bg-accent text-accent-foreground",
        green: "border-transparent bg-success/10 text-success",
        yellow: "border-transparent bg-warning/10 text-warning",
        red: "border-transparent bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "gray",
    },
  }
)

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
