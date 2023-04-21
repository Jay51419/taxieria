import { useEffect, useState } from "react";

export default function ErrorCard({
  message,
}: {
  message: string | undefined;
}) {
  return <span className={`text-red-800 block`}>{message}</span>;
}
