"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address_ar: string;
  address_en: string;
  careers_visible: boolean;
}

const defaults: SiteSettings = {
  phone: "0557746126",
  whatsapp: "966557746126",
  email: "Info@alfatransport.sa",
  address_ar: "رقم المبنى 2423، طريق مكة المكرمة، حي الربوة، الرياض 12821، المملكة العربية السعودية",
  address_en: "Building No. 2423, Makkah Al Mukarramah Street, Al Rabwah District, Riyadh 12821, Kingdom of Saudi Arabia",
  careers_visible: true,
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
          careers_visible: map.careers_visible !== undefined ? map.careers_visible === "true" : defaults.careers_visible,
        });
      })
      .catch(() => {});
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
