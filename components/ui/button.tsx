import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "light" | "dark" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide " +
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-out active:scale-[0.97] " +
  "before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:-z-10 before:w-1/3 before:-skew-x-12 before:bg-white/25 " +
  "before:-translate-x-full before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[420%] motion-reduce:before:hidden";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgb(164_30_50/0.6)] hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-[0_14px_32px_-10px_rgb(164_30_50/0.7)]",
  light: "bg-background text-primary shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:bg-white",
  dark: "bg-ink text-white shadow-lg shadow-black/30 hover:-translate-y-0.5 hover:bg-black",
  ghost: "text-current ring-1 ring-current/25 hover:bg-current/10 before:hidden",
  whatsapp:
    "bg-[#25d366] text-[#0b3d1f] shadow-[0_8px_24px_-8px_rgb(37_211_102/0.6)] hover:-translate-y-0.5 hover:bg-[#2fe072] hover:shadow-[0_14px_32px_-10px_rgb(37_211_102/0.7)]",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; icon?: ReactNode; trailing?: ReactNode; className?: string; children: ReactNode };

function Inner({ icon, trailing, children }: Pick<Common, "icon" | "trailing" | "children">) {
  return (
    <>
      {icon && <span className="shrink-0 [&>svg]:size-4">{icon}</span>}
      <span>{children}</span>
      {trailing && (
        <span className="shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1 [&>svg]:size-4">{trailing}</span>
      )}
    </>
  );
}

export function buttonClass({ variant = "primary", size = "md", className = "" }: Pick<Common, "variant" | "size" | "className">) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function ButtonLink({
  variant,
  size,
  icon,
  trailing,
  className,
  children,
  href,
  external,
  ...rest
}: Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "children" | "className">) {
  const cls = buttonClass({ variant, size, className });
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    const newTab = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        <Inner icon={icon} trailing={trailing}>
          {children}
        </Inner>
        {newTab && <span className="sr-only">(abre en otra pestaña)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner icon={icon} trailing={trailing}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  variant,
  size,
  icon,
  trailing,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      <Inner icon={icon} trailing={trailing}>
        {children}
      </Inner>
    </button>
  );
}
