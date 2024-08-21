"use client";

// TODO: Make a minimalistic error handling page and import.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong! Design pending for global error page</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
