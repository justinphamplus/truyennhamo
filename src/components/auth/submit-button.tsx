"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingText: string;
};

export function SubmitButton({ children, pendingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className="button primary auth-submit" type="submit" disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
