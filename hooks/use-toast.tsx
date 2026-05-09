"use client";

import * as React from "react";
import { toast as sonnerToast, useSonner, type ExternalToast } from "sonner";

export type Toast = React.ReactNode;

export function toast(message: Toast, options?: ExternalToast) {
  return sonnerToast(message, options);
}

export function useToast() {
  const { toasts } = useSonner();

  return {
    toasts,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
  };
}