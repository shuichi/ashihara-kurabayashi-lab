import type { ComponentPropsWithoutRef } from "react";
import { pageHref } from "@/lib/navigation";
import { useSite } from "./site-shell";

export function PageLink({ href, ...props }: ComponentPropsWithoutRef<"a">) {
  const { language, base } = useSite();
  return <a {...props} href={href === undefined ? undefined : pageHref(href, language, base)} />;
}
