type FormMessageProps = {
  error?: string;
  message?: string;
};

export function FormMessage({ error, message }: FormMessageProps) {
  if (!error && !message) return null;

  return (
    <p className={`auth-message ${error ? "is-error" : "is-success"}`} role="status">
      {error ?? message}
    </p>
  );
}
