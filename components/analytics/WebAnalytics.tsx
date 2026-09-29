"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_KEY = "gw_visitor_id";
const SESSION_KEY = "gw_session_id";
const SOURCE_KEY = "gw_source";
const CAMPAIGN_KEY = "gw_campaign";
const REFERENCE_KEY = "gw_reference";

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function getDevice() {
  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getOrCreateVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY);

  if (!id) {
    id = createId("gw");
    localStorage.setItem(VISITOR_KEY, id);
  }

  return id;
}

function getOrCreateSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);

  if (!id) {
    id = createId("session");
    sessionStorage.setItem(SESSION_KEY, id);
  }

  return id;
}

export async function trackEvent(
  event: string,
  options: {
    element?: string;
    destination?: string;
    metadata?: Record<string, unknown>;
  } = {}
) {
  if (typeof window === "undefined") return;

  try {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        visitorId,
        sessionId,
        event,
        page: window.location.pathname,
        element: options.element,
        destination: options.destination,
        source: localStorage.getItem(SOURCE_KEY),
        campaign: localStorage.getItem(CAMPAIGN_KEY),
        reference: localStorage.getItem(REFERENCE_KEY),
        device: getDevice(),
        metadata: options.metadata || {},
      }),
    });
  } catch (error) {
    console.error("GroupW&J analytics:", error);
  }
}

export default function WebAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const source =
      searchParams.get("src") ||
      searchParams.get("utm_source");

    const campaign =
      searchParams.get("campaign") ||
      searchParams.get("utm_campaign");

    const reference =
      searchParams.get("ref") ||
      searchParams.get("cliente_id");

    if (source) localStorage.setItem(SOURCE_KEY, source);
    if (campaign) localStorage.setItem(CAMPAIGN_KEY, campaign);
    if (reference) localStorage.setItem(REFERENCE_KEY, reference);

    const timer = window.setTimeout(() => {
      let event = "page_view";

      if (pathname === "/demo") event = "demo_view";
      if (pathname === "/formulario") event = "form_view";

      trackEvent(event, {
        metadata: {
          query: window.location.search,
          referrer: document.referrer || null,
          title: document.title,
        },
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
