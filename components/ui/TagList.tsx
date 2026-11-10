/** Small chips (tools, tags). Not a <ul>: the labels are not sentences and are not body copy. */
export function TagList({ tags, className = "" }: { tags: readonly string[]; className?: string }) {
  return (
    <div role="list" className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          role="listitem"
          key={tag}
          className="rounded-pill border border-border px-3 py-1 text-small text-text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
