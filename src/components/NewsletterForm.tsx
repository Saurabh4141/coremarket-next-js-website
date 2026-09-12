"use client";

import { useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitRequest } from "@/lib/submitRequest";

type ButtonProps = React.ComponentProps<typeof Button>;

interface NewsletterFormProps {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonVariant?: ButtonProps["variant"];
  buttonSize?: ButtonProps["size"];
  buttonIcon?: ReactNode;
  placeholder?: string;
  /** Where the signup came from, recorded on the request row. */
  source?: string;
}

/** Newsletter signup. Persists to request_master via POST /api/requests.
 *  The API requires a name, so we derive one from the email local-part. */
export const NewsletterForm = ({
  className = "flex flex-col sm:flex-row gap-3",
  inputClassName = "flex-1 h-12",
  buttonClassName = "h-12 px-8 shrink-0",
  buttonVariant,
  buttonSize = "lg",
  buttonIcon,
  placeholder = "Enter your email",
  source = "Newsletter",
}: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === "sending") return;

    setStatus("sending");
    const res = await submitRequest({
      type: "enquiry",
      name: value.split("@")[0] || "Subscriber",
      email: value,
      subject: `${source} subscription`,
      message: `Newsletter signup from ${source}.`,
    });

    if (res.ok) {
      setStatus("done");
      setMessage("Thanks — you're subscribed.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(res.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className={className}>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className={inputClassName}
        />
        <Button
          type="submit"
          variant={buttonVariant}
          size={buttonSize}
          className={buttonClassName}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Subscribing…" : "Subscribe"}
          {buttonIcon}
        </Button>
      </form>
      {status === "done" || status === "error" ? (
        <p
          role="status"
          className={`text-xs mt-2 ${status === "error" ? "text-destructive" : "text-green-600"}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
};
