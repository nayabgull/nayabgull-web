import type { ReactNode } from "react";

const CONTROL =
  "mt-1.5 block min-h-12 w-full rounded-md border border-border-strong bg-bg-raised px-3.5 py-2.5 text-text placeholder:text-text-muted aria-invalid:border-danger";

export interface FieldProps {
  id: string;
  name: string;
  label: string;
  /** Shown after the label, for example "optional". */
  hint?: string;
  error?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}

function Shell({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: Pick<FieldProps, "id" | "label" | "hint" | "error" | "className"> & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-small font-semibold">
        {label}
        {hint ? <span className="font-normal text-text-muted"> ({hint})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-small font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string) => (error ? `${id}-error` : undefined);

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  ...field
}: FieldProps & {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
}) {
  return (
    <Shell {...field}>
      <input
        id={field.id}
        name={field.name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={field.required}
        defaultValue={field.defaultValue}
        aria-invalid={field.error ? true : undefined}
        aria-describedby={describedBy(field.id, field.error)}
        className={CONTROL}
      />
    </Shell>
  );
}

export function SelectField({
  options,
  placeholder,
  ...field
}: FieldProps & {
  options: readonly { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <Shell {...field}>
      <select
        id={field.id}
        name={field.name}
        required={field.required}
        defaultValue={field.defaultValue ?? ""}
        aria-invalid={field.error ? true : undefined}
        aria-describedby={describedBy(field.id, field.error)}
        className={CONTROL}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Shell>
  );
}

export function TextAreaField({ rows = 3, ...field }: FieldProps & { rows?: number }) {
  return (
    <Shell {...field}>
      <textarea
        id={field.id}
        name={field.name}
        rows={rows}
        required={field.required}
        defaultValue={field.defaultValue}
        aria-invalid={field.error ? true : undefined}
        aria-describedby={describedBy(field.id, field.error)}
        className={CONTROL}
      />
    </Shell>
  );
}
