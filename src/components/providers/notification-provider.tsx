"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Toast } from "@/components/ui/toast";

interface NotificationContextValue {
  notify: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notify: () => {},
});

export function useNotify() {
  return useContext(NotificationContext).notify;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const notify = useCallback((msg: string) => {
    setMessage(msg);
    setOpen(true);
    setTimeout(() => setOpen(false), 4000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Toast message={message} open={open} onClose={() => setOpen(false)} />
    </NotificationContext.Provider>
  );
}
