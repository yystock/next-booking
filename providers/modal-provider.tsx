"use client";

import { useEffect, useState } from "react";

import { ActivityModal } from "@/components/modals/activity-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ActivityModal />
    </>
  );
};
