import { useEffect } from "react";

const SITE_NAME = "GearMatch";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — ${SITE_NAME}`;
    return () => {
      document.title = `${SITE_NAME} - Find Your Perfect Peripherals`;
    };
  }, [title]);
}
