"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address_ar: string;
  address_en: string;
}

const defaults: SiteSettings = {
  phone: "0114152675",
  whatsapp: "966555955056",
  email: "alfa.ex@hotmail.com",
  address_ar: "الرياض ١١٤٣٣ - السلي شارع هارون الرشيد - س.ب ١٠٤٨٤",
  address_en: "Riyadh 11433 - As Sulay, Harun Al Rashid St - P.O.Box 10484",
};

const SettingsContext = createContext<SiteSettings>(defaults);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : []))
      .then((items: { key: string; value: string }[]) => {
        if (!Array.isArray(items)) return;
        const map: Record<string, string> = {};
        items.forEach((item) => { map[item.key] = item.value; });
        setSettings({
          phone: map.phone || defaults.phone,
          whatsapp: map.whatsapp || defaults.whatsapp,
          email: map.email || defaults.email,
          address_ar: map.address_ar || defaults.address_ar,
          address_en: map.address_en || defaults.address_en,
        });
      })
      .catch(() => {});
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
