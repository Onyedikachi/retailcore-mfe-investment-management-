import { useContext } from "react";
import { AppContext } from "./context";

export function handleCurrencyName(id: string) {
  const { currencies } = useContext(AppContext);
  if (!id) return null;

  return currencies.find((i) => i.id === id)?.text || null;
}
