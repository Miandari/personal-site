export function Step({
  id,
  number,
  title,
  intro,
  children,
}: {
  id?: string;
  number?: number;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="mb-2 flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
        {number !== undefined && (
          <span className="font-mono text-base text-primary">
            {String(number).padStart(2, "0")}
          </span>
        )}
        {title}
      </h2>
      {intro && <p className="mb-5 text-muted-foreground">{intro}</p>}
      <div className={intro ? undefined : "mt-5"}>{children}</div>
    </section>
  );
}
