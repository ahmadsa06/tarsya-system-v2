import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-outline-variant bg-surface-container-lowest",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-md p-lg pb-md", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  as: Tag = "h3",
  id,
}: {
  children: React.ReactNode;
  as?: "h2" | "h3" | "h4";
  id?: string;
}) {
  return (
    <Tag id={id} className="text-title-md text-on-surface">
      {children}
    </Tag>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-lg pt-0", className)}>{children}</div>;
}
