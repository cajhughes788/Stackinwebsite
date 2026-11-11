export type GridItem = { title: string; description: string };

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

// Feature points as open columns: a hairline over each title, no boxes and no
// icons. Replaces the bordered card grid, which read as a template.
export function OpenGrid({ items, columns = 4 }: { items: GridItem[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-12 ${columnClasses[columns]}`}>
      {items.map((item) => (
        <li key={item.title} className="border-t border-border pt-6">
          <h3 className="mb-2 text-[1.05rem] font-medium leading-snug text-foreground">{item.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
