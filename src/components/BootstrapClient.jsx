"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/css/bootstrap.min.css');
  }, []);

  return null;
}
