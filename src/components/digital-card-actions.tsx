"use client";

import { useState } from "react";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { site } from "@/lib/site";

export function DigitalCardActions() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(site.cardUrl);
      setCopied(true);
      setStatus("Link copiado. Já podes partilhar o cartão.");
    } catch {
      setStatus(`Copia este endereço para partilhar: ${site.cardUrl}`);
    }
  }

  async function shareCard() {
    if (!navigator.share) return copyLink();
    try {
      await navigator.share({
        title: site.legalName,
        text: "Encontra a SAMMAC e todos os seus contactos.",
        url: site.cardUrl,
      });
      setStatus("Cartão partilhado.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      await copyLink();
    }
  }

  return (
    <div className="digital-actions">
      <div className="digital-action-buttons">
        <a href="/sammac.vcf" download="SAMMAC.vcf">
          <Download size={18} aria-hidden="true" />
          Guardar contacto
        </a>
        <button onClick={shareCard} type="button">
          <Share2 size={18} aria-hidden="true" />
          Partilhar
        </button>
        <button
          onClick={copyLink}
          type="button"
          aria-label="Copiar link do cartão"
        >
          {copied ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
        </button>
      </div>
      <p className="digital-status" role="status">
        {status}
      </p>
    </div>
  );
}
