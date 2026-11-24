'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  MessageCircle,
  Truck,
  Store,
  ShieldCheck,
  Search,
  Plus,
  Minus,
  Trash2,
  FlaskConical,
  CreditCard,
  Landmark,
  CheckCircle2,
  PackageCheck,
} from 'lucide-react';

export interface WholesaleTier {
  min_qty: number;
  requested_discount_pct: number;
  effective_discount_pct: number;
  unit_price_ars: number;
  net_margin_pct: number;
}

export interface StoreProduct {
  id: string;
  sku: string;
  title: string;
  description: string;
  category: string;
  weight_grams: number;
  dimensions_cm: string;
  stock_mode: 'PRE_VALIDATE_ON_DEMAND' | 'LOCAL_STOCK' | 'SUPPLIER_SYNC';
  stock_qty: number;
  retail_pvp_ars: number;
  transfer_pvp_ars: number;
  transfer_discount_pct: number;
  mp_3cuotas_installment_ars: number;
  wholesale_tiers: WholesaleTier[];
}

export interface ShippingZone {
  mode: 'PICKUP_BOLIVAR' | 'LOCAL_CITY' | 'REGIONAL_COMISIONISTA' | 'CORREO_NACIONAL';
  code: string;
  label: string;
  locality: string;
  carrier_name: string;
  departure_days: string;
  cutoff_time: string;
  base_cost_ars: number | string;
  per_kg_ars: number | string;
  eta_label: string;
}

export interface CatalogPayload {
  fx: { rate_ars: number; source: string; fetched_at?: string };
  payment_coordinates: {
    holder: string;
    cuit: string;
    alias_mp: string;
    alias_galicia: string;
    cbu_galicia: string;
    whatsapp: string;
  };
  shipping_zones: ShippingZone[];
  products: StoreProduct[];
}

interface CartLine {
  product: StoreProduct;
  qty: number;
}

const formatArs = (n: number) => `$${Math.round(Number(n) || 0).toLocaleString('es-AR')}`;

const SKU_IMAGE_MAP: Record<string, string> = {
  'ARB-NVME-CNC-10G': '/assets/brand-v2/skus/arb-nvme-cnc-10g.webp',
  'ARB-USBC-240W-DUO': '/assets/brand-v2/skus/arb-usbc-240w-duo.webp',
  'ARB-CAB-AGRO3D': '/assets/brand-v2/skus/arb-cab-agro3d.webp',
  'ARB-IR-THERM550': '/assets/brand-v2/skus/arb-ir-therm550.webp',
  'ARB-LINT-PRO2K': '/assets/brand-v2/skus/arb-lint-pro2k.webp',
  'ARB-MATE-PICKUP': '/assets/brand-v2/skus/arb-mate-pickup.webp',
  'ARB-OBD2-PRO3D': '/assets/brand-v2/skus/arb-obd2-pro3d.webp',
  'ARB-TOOL-BAT4X': '/assets/brand-v2/skus/arb-tool-bat4x.webp',
  // 12/12 SKUs con foto WebP de estudio unica (Nano Banana Ventana 1 + Ventana 2):
  'ARB-DRIVER-S2-PRO': '/assets/brand-v2/skus/arb-driver-s2-pro.webp',
  'ARB-S0-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-CLIP-EID': '/assets/brand-v2/skus/arb-3d-clip-eid.webp',
  'ARB-3D-VESA-DOCK': '/assets/brand-v2/skus/arb-3d-vesa-dock.webp',
};

const VENTANA2_SKU_IMAGE_MAP: Record<string, string> = {
  'ARB-DRIVER-S2-PRO': '/assets/brand-v2/skus/arb-driver-s2-pro.webp',
  'ARB-S0-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-CLIP-EID': '/assets/brand-v2/skus/arb-3d-clip-eid.webp',
  'ARB-3D-VESA-DOCK': '/assets/brand-v2/skus/arb-3d-vesa-dock.webp',
};

const resolveSkuImage = (sku: string) =>
  SKU_IMAGE_MAP[(sku || '').trim().toUpperCase()] || '/assets/brand-v2/arbizu-bit-to-atom-workshop.webp';

const resolveVentana2SkuImage = (sku: string) =>
  VENTANA2_SKU_IMAGE_MAP[(sku || '').trim().toUpperCase()];

export default function HybridStorefrontClient({ initialCatalog }: { initialCatalog: CatalogPayload | null }) {
  const catalog = initialCatalog || {
    fx: { rate_ars: 1380, source: 'fallback' },
    payment_coordinates: {
      holder: 'Aldo Alberto Arbizu',
      cuit: '20-38362060-1',
      alias_mp: 'aldoarbizu',
      alias_galicia: 'ALDO.ARBIZU.GALICIA',
      cbu_galicia: '0070149130004016919618',
      whatsapp: '+54 9 2314 489197',
    },
    shipping_zones: [],
    products: [],
  };

  const [listMode, setListMode] = useState<'minorista' | 'mayorista'>('minorista');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'transfer_cash' | 'mercadopago_contado' | 'mercadopago_3cuotas'>('transfer_cash');
  const [shippingMode, setShippingMode] = useState<'PICKUP_BOLIVAR' | 'LOCAL_CITY' | 'REGIONAL_COMISIONISTA' | 'CORREO_NACIONAL'>('PICKUP_BOLIVAR');
  const [comisionistaCode, setComisionistaCode] = useState<string>('COM_OLAVARRIA');
  const [postalCode, setPostalCode] = useState<string>('6550');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerLocality, setCustomerLocality] = useState<string>('San Carlos de Bolívar');
  const [submitting, setSubmitting] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState<{ code: string; wa_url: string; checkout_url: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(['ALL']);
    catalog.products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [catalog.products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return catalog.products.filter((p) => {
      const catOk = selectedCategory === 'ALL' || p.category === selectedCategory;
      const textOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [catalog.products, selectedCategory, searchQuery]);

  const comisionistaZones = useMemo(
    () => catalog.shipping_zones.filter((z) => z.mode === 'REGIONAL_COMISIONISTA'),
    [catalog.shipping_zones]
  );

  const selectedZone: ShippingZone = useMemo(() => {
    const zones = catalog.shipping_zones;
    if (shippingMode === 'REGIONAL_COMISIONISTA') {
      return (
        zones.find((z) => z.code === comisionistaCode) ||
        comisionistaZones[0] || {
          mode: 'REGIONAL_COMISIONISTA',
          code: 'COM_OLAVARRIA',
          label: 'Comisionista Bolívar ↔ Olavarría',
          locality: 'Olavarría',
          carrier_name: 'Transporte Regional',
          departure_days: 'Lunes, Miércoles y Viernes',
          cutoff_time: '11:30',
          base_cost_ars: 4800,
          per_kg_ars: 0,
          eta_label: 'Mismo día',
        }
      );
    }
    return (
      zones.find((z) => z.mode === shippingMode) || {
        mode: shippingMode,
        code: 'PICKUP_BOL',
        label: 'Retiro en Taller Bolívar',
        locality: 'San Carlos de Bolívar',
        carrier_name: 'Retiro en Taller',
        departure_days: 'Lunes a Sábado',
        cutoff_time: '18:00',
        base_cost_ars: 0,
        per_kg_ars: 0,
        eta_label: 'Hoy',
      }
    );
  }, [catalog.shipping_zones, shippingMode, comisionistaCode, comisionistaZones]);

  const resolveUnitPrice = (product: StoreProduct, qty: number) => {
    if (listMode === 'mayorista') {
      const matched = [...(product.wholesale_tiers || [])]
        .sort((a, b) => a.min_qty - b.min_qty)
        .reverse()
        .find((t) => qty >= t.min_qty);
      if (matched) return matched.unit_price_ars;
      if (product.wholesale_tiers?.length) return product.wholesale_tiers[0].unit_price_ars;
    }
    return product.retail_pvp_ars;
  };

  const trackDemandEvent = (sku: string, eventType: 'view' | 'wa_intent_click' | 'cart_add' | 'mayorista_quote') => {
    try {
      fetch('/api/v1/commerce/events', {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, event_type: eventType, meta: { list_mode: listMode } }),
      }).catch(() => { });
    } catch { }
  };

  const addToCart = (product: StoreProduct, qtyStep?: number) => {
    const step = qtyStep ?? (listMode === 'mayorista' ? product.wholesale_tiers?.[0]?.min_qty || 5 : 1);
    trackDemandEvent(product.sku, listMode === 'mayorista' ? 'mayorista_quote' : 'cart_add');
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.product.sku === product.sku);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + (qtyStep ?? 1) };
        return clone;
      }
      return [...prev, { product, qty: step }];
    });
  };

  const updateCartQty = (sku: string, nextQty: number) => {
    if (nextQty <= 0) {
      setCart((prev) => prev.filter((l) => l.product.sku !== sku));
      return;
    }
    setCart((prev) => prev.map((l) => (l.product.sku === sku ? { ...l, qty: nextQty } : l)));
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    let totalWeightGrams = 0;
    const lines = cart.map((line) => {
      const unit = resolveUnitPrice(line.product, line.qty);
      const lineTotal = Math.round(unit * line.qty);
      subtotal += lineTotal;
      totalWeightGrams += (line.product.weight_grams || 250) * line.qty;
      return {
        sku: line.product.sku,
        title: line.product.title,
        qty: line.qty,
        unit_price_ars: unit,
        line_total_ars: lineTotal,
      };
    });

    const discountArs = paymentMethod === 'transfer_cash' ? Math.round(subtotal * 0.1) : 0;
    const weightKg = Math.max(0.1, totalWeightGrams / 1000);
    let shippingCost = Number(selectedZone.base_cost_ars || 0);
    if (selectedZone.mode === 'CORREO_NACIONAL') {
      const extraKg = Math.max(0, Math.ceil(weightKg) - 1);
      shippingCost += extraKg * Number(selectedZone.per_kg_ars || 0);
    }
    if (cart.length === 0) shippingCost = 0;

    const total = Math.max(0, subtotal - discountArs + shippingCost);
    return {
      lines,
      subtotal,
      discountArs,
      shippingCost,
      weightKg: Number(weightKg.toFixed(2)),
      total,
    };
  }, [cart, listMode, paymentMethod, selectedZone]);

  const liveWhatsappUrl = useMemo(() => {
    if (totals.lines.length === 0) {
      return `https://wa.me/5492314489197?text=${encodeURIComponent(
        `Hola Aldo, quiero consultar por el catálogo ${listMode.toUpperCase()} de Arbizu Labs Store.`
      )}`;
    }
    const text = [
      `*PEDIDO ARBIZU LABS STORE* (${listMode.toUpperCase()})`,
      `Cliente: ${customerName || 'Cliente Web'} (${customerLocality || selectedZone.locality})`,
      '',
      ...totals.lines.map(
        (l) => `• [${l.sku}] x${l.qty} — ${formatArs(l.line_total_ars)} ARS (${formatArs(l.unit_price_ars)} c/u)`
      ),
      '',
      `Subtotal: ${formatArs(totals.subtotal)} ARS`,
      ...(totals.discountArs > 0 ? [`Descuento Transferencia (-10%): -${formatArs(totals.discountArs)} ARS`] : []),
      `Envío (${selectedZone.mode} · ${selectedZone.label}${selectedZone.mode === 'CORREO_NACIONAL' ? ` · CP ${postalCode}` : ''}): ${formatArs(totals.shippingCost)} ARS`,
      `Pago: ${paymentMethod}`,
      `*TOTAL: ${formatArs(totals.total)} ARS*`,
    ].join('\n');
    return `https://wa.me/5492314489197?text=${encodeURIComponent(text)}`;
  }, [totals, listMode, customerName, customerLocality, selectedZone, postalCode, paymentMethod]);

  const handleConfirmOrder = async () => {
    if (!cart.length) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/v1/commerce/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          list_mode: listMode,
          payment_method: paymentMethod,
          shipping_mode: shippingMode,
          shipping_zone_code: selectedZone.code,
          postal_code: postalCode,
          customer_name: customerName || 'Cliente Web',
          customer_locality: customerLocality || selectedZone.locality,
          items: cart.map((c) => ({ sku: c.product.sku, qty: c.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo registrar el pedido.');
      setOrderFeedback({
        code: data.order.order_code,
        wa_url: data.wa_url,
        checkout_url: data.checkout_url,
      });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al generar orden.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0EA] text-[#07080A] pt-24 pb-16 overflow-x-clip">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">
        {/* TOP HEADER & TELEMETRY STRIP */}
        <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span className="px-2 py-0.5 bg-[#1F4E3D] text-[#F2F0EA] font-bold">
                  ARBIZU LABS // MOTOR HÍBRIDO
                </span>
                <span className="px-2 py-0.5 bg-[#F2F0EA] border border-[#D6D3C9] text-[#07080A] font-semibold tabular-nums">
                  FX DolarAPI: ${Math.round(catalog.fx.rate_ars).toLocaleString('es-AR')} ARS ({catalog.fx.source})
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#07080A]">
                Tienda Híbrida · Minorista &amp; Mayorista (Bolívar / País)
              </h1>
              <p className="text-xs sm:text-sm text-[#3E4552] max-w-3xl">
                Catálogo agnóstico con doble lista dinámica por volumen, escudo de margen en tiempo real, descuento
                del 10% por transferencia y envío coordinado por comisionistas regionales o correo nacional.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/tienda/lab"
                className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] border border-[#D6D3C9] bg-[#F2F0EA] text-[#07080A] hover:border-[#07080A] font-mono text-xs font-bold uppercase transition-colors"
              >
                <FlaskConical className="w-4 h-4 text-[#B83800]" />
                <span>Lab &amp; Feeds</span>
              </Link>
              <a
                href="#carrito-hibrido"
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-[#07080A] hover:bg-[#FF4F00] text-[#F2F0EA] hover:text-[#07080A] font-mono font-bold text-xs uppercase transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="tabular-nums">Carrito ({cart.reduce((a, b) => a + b.qty, 0)})</span>
              </a>
            </div>
          </div>

          {/* CONTROLS BAR: RETAIL / WHOLESALE SWITCH + SEARCH + CATEGORIES */}
          <div className="pt-4 border-t border-[#D6D3C9] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="inline-flex border border-[#D6D3C9] bg-[#F2F0EA] p-1 self-start">
              <button
                type="button"
                data-testid="mode-minorista"
                onClick={() => setListMode('minorista')}
                className={`px-3.5 py-2 font-mono text-xs uppercase font-bold transition-colors cursor-pointer ${
                  listMode === 'minorista' ? 'bg-[#07080A] text-[#F2F0EA]' : 'text-[#3E4552] hover:text-[#07080A]'
                }`}
              >
                Modo Minorista
              </button>
              <button
                type="button"
                data-testid="mode-mayorista"
                onClick={() => setListMode('mayorista')}
                className={`px-3.5 py-2 font-mono text-xs uppercase font-bold transition-colors cursor-pointer ${
                  listMode === 'mayorista' ? 'bg-[#FF4F00] text-[#07080A]' : 'text-[#3E4552] hover:text-[#07080A]'
                }`}
              >
                Modo Mayorista (Volumen)
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 flex-1 lg:max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#3E4552] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, SKU o rubro..."
                  className="w-full bg-[#F2F0EA] border border-[#D6D3C9] pl-9 pr-3 py-2 text-xs text-[#07080A] font-mono focus:outline-none focus:border-[#07080A]"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filtrar categoría"
                className="bg-[#F2F0EA] border border-[#D6D3C9] px-3 py-2 text-xs text-[#07080A] font-mono focus:outline-none focus:border-[#07080A]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'ALL' ? 'Todos los rubros' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* MAIN GRID: PRODUCT CATALOG + CART/LOGISTICS SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CATALOG CARDS */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => {
              const displayUnit = resolveUnitPrice(product, listMode === 'mayorista' ? product.wholesale_tiers?.[0]?.min_qty || 5 : 1);
              const transferUnit = Math.round(displayUnit * 0.9);
              const singleWaText = encodeURIComponent(
                `Hola Aldo, quiero consultar / pedir [${product.sku}] ${product.title} en lista ${listMode.toUpperCase()} (${formatArs(displayUnit)} ARS c/u).`
              );
              return (
                <article
                  key={product.id}
                  data-testid={`product-card-${product.sku}`}
                  className="border border-[#D6D3C9] bg-[#FFFFFF] p-4 flex flex-col justify-between gap-4 hover:border-[#07080A] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[5/4] w-full overflow-hidden border border-[#D6D3C9] bg-[#F2F0EA]">
                      <img
                        src={resolveSkuImage(product.sku)}
                        data-ventana2-src={resolveVentana2SkuImage(product.sku)}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#FFFFFF]/95 border border-[#D6D3C9] font-mono text-[10px] uppercase tracking-wider text-[#07080A] font-bold">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase">
                      <span className="text-[#3E4552] truncate">{product.sku}</span>
                      <span
                        className={`px-2 py-0.5 border shrink-0 font-bold ${
                          product.stock_mode === 'LOCAL_STOCK'
                            ? 'border-[#1F4E3D] text-[#1F4E3D] bg-[#F2F0EA]'
                            : 'border-[#D6D3C9] text-[#B83800] bg-[#F2F0EA]'
                        }`}
                      >
                        {product.stock_mode === 'LOCAL_STOCK'
                          ? `Stock: ${product.stock_qty}u`
                          : 'Por Encargo · Validación'}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-[#07080A] leading-snug">{product.title}</h2>
                    <p className="text-xs text-[#3E4552] leading-relaxed">{product.description}</p>

                    <div className="border-t border-[#D6D3C9] pt-3 space-y-1 font-mono">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] uppercase text-[#3E4552]">
                          {listMode === 'mayorista' ? 'Desde Bulto Mayorista' : 'Precio Lista / MP'}
                        </span>
                        <span
                          data-testid={`price-${product.sku}`}
                          className="text-xl font-extrabold text-[#07080A] tabular-nums"
                        >
                          {formatArs(displayUnit)} ARS
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#1F4E3D] tabular-nums">
                        <span>Transferencia / Efectivo (-10%)</span>
                        <strong className="font-bold">{formatArs(transferUnit)} ARS</strong>
                      </div>

                      {listMode === 'minorista' ? (
                        <div className="text-[11px] text-[#3E4552] tabular-nums">
                          3 cuotas MP de {formatArs(product.mp_3cuotas_installment_ars)} ARS · Peso {product.weight_grams}g
                        </div>
                      ) : (
                        <div className="mt-2 bg-[#F2F0EA] border border-[#D6D3C9] p-2 space-y-1">
                          {(product.wholesale_tiers || []).map((t) => (
                            <div
                              key={t.min_qty}
                              className="flex items-center justify-between text-[11px] text-[#07080A] tabular-nums"
                            >
                              <span>{t.min_qty}+ unidades (-{t.effective_discount_pct}%)</span>
                              <strong>{formatArs(t.unit_price_ars)} c/u</strong>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sistema de Botones de Autor: Carbón Primario Sobrio + Outline WhatsApp */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      type="button"
                      data-testid={`add-cart-${product.sku}`}
                      onClick={() => addToCart(product)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#07080A] hover:bg-[#FF4F00] text-[#F2F0EA] hover:text-[#07080A] font-mono font-bold text-xs uppercase py-2.5 px-3 min-h-[40px] rounded-[2px] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        {listMode === 'mayorista'
                          ? `Sumar x${product.wholesale_tiers?.[0]?.min_qty || 5}`
                          : 'Agregar'}
                      </span>
                    </button>
                    <a
                      href={`https://wa.me/5492314489197?text=${singleWaText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackDemandEvent(product.sku, 'wa_intent_click')}
                      className="inline-flex items-center justify-center gap-1.5 border border-[#D6D3C9] bg-[#F2F0EA] hover:border-[#07080A] text-[#07080A] font-mono font-bold text-xs uppercase py-2.5 px-3 min-h-[40px] rounded-[2px] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#1F4E3D]" />
                      <span>WA 1-Clic</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* STICKY CART + LOGISTICS 4 MODALITIES + MIXED CHECKOUT */}
          <aside
            id="carrito-hibrido"
            className="lg:col-span-5 border border-[#D6D3C9] bg-[#FFFFFF] p-5 space-y-5 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between border-b border-[#D6D3C9] pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#B83800]" />
                <h2 className="font-mono text-sm font-extrabold uppercase text-[#07080A]">
                  Pedido Híbrido ({listMode})
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#3E4552] tabular-nums">
                Peso: {totals.weightKg} kg
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-6 text-center border border-dashed border-[#D6D3C9] bg-[#F2F0EA] text-xs text-[#3E4552] font-mono px-3">
                Tu carrito está vacío. Agregá un producto del catálogo para calcular envío y descuento.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {cart.map((line) => {
                  const unit = resolveUnitPrice(line.product, line.qty);
                  return (
                    <div
                      key={line.product.sku}
                      className="border border-[#D6D3C9] bg-[#F2F0EA] p-3 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#07080A] truncate">{line.product.title}</div>
                        <div className="font-mono text-[11px] text-[#1F4E3D] font-bold tabular-nums">
                          {line.product.sku} · {formatArs(unit)} c/u
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 font-mono">
                        <button
                          type="button"
                          aria-label="Restar cantidad"
                          onClick={() => updateCartQty(line.product.sku, line.qty - 1)}
                          className="w-7 h-7 border border-[#D6D3C9] bg-[#FFFFFF] text-[#07080A] flex items-center justify-center hover:border-[#07080A] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums text-[#07080A]">{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Sumar cantidad"
                          onClick={() => updateCartQty(line.product.sku, line.qty + 1)}
                          className="w-7 h-7 border border-[#D6D3C9] bg-[#FFFFFF] text-[#07080A] flex items-center justify-center hover:border-[#07080A] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          aria-label="Eliminar ítem"
                          onClick={() => updateCartQty(line.product.sku, 0)}
                          className="w-7 h-7 border border-red-300 bg-[#FFFFFF] text-red-700 flex items-center justify-center hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4-MODALITY LOGISTICS */}
            <div className="space-y-2.5 border-t border-[#D6D3C9] pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#07080A] font-bold">
                <Truck className="w-4 h-4 text-[#B83800]" />
                <span>Modalidad de Entrega (4 Zonas Reales)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                {[
                  { id: 'PICKUP_BOLIVAR', label: 'Retiro Bolívar ($0)' },
                  { id: 'LOCAL_CITY', label: 'Urbano Bolívar' },
                  { id: 'REGIONAL_COMISIONISTA', label: 'Comisionista Zona' },
                  { id: 'CORREO_NACIONAL', label: 'Correo Nacional' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    data-testid={`ship-${opt.id}`}
                    onClick={() => setShippingMode(opt.id as any)}
                    className={`px-2.5 py-2 border text-left uppercase cursor-pointer transition-colors ${
                      shippingMode === opt.id
                        ? 'border-[#07080A] bg-[#07080A] text-[#F2F0EA] font-bold'
                        : 'border-[#D6D3C9] bg-[#F2F0EA] text-[#3E4552] hover:border-[#07080A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {shippingMode === 'REGIONAL_COMISIONISTA' && (
                <select
                  data-testid="comisionista-select"
                  value={comisionistaCode}
                  onChange={(e) => {
                    setComisionistaCode(e.target.value);
                    const found = comisionistaZones.find((z) => z.code === e.target.value);
                    if (found) setCustomerLocality(found.locality);
                  }}
                  className="w-full bg-[#F2F0EA] border border-[#07080A] px-3 py-2 text-xs font-mono text-[#07080A]"
                >
                  {comisionistaZones.map((z) => (
                    <option key={z.code} value={z.code}>
                      {z.locality} — {formatArs(Number(z.base_cost_ars))} ({z.carrier_name})
                    </option>
                  ))}
                </select>
              )}

              {shippingMode === 'CORREO_NACIONAL' && (
                <div className="flex items-center gap-2 font-mono text-xs">
                  <label htmlFor="cp-input" className="text-[#3E4552] shrink-0">C. Postal:</label>
                  <input
                    id="cp-input"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#F2F0EA] border border-[#D6D3C9] px-3 py-1.5 text-xs text-[#07080A]"
                  />
                </div>
              )}

              <div className="bg-[#F2F0EA] border border-[#D6D3C9] p-3 text-[11px] font-mono space-y-1 text-[#3E4552]">
                <div className="flex justify-between text-[#07080A]">
                  <span>{selectedZone.carrier_name}</span>
                  <strong className="text-[#1F4E3D] tabular-nums">{formatArs(Number(selectedZone.base_cost_ars))} ARS</strong>
                </div>
                <div>
                  Salida: <span className="text-[#07080A] font-semibold">{selectedZone.departure_days}</span> · Corte:{' '}
                  <span className="text-[#B83800] font-bold">{selectedZone.cutoff_time}</span>
                </div>
                <div>Plazo estimado: {selectedZone.eta_label}</div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="space-y-2.5 border-t border-[#D6D3C9] pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#07080A] font-bold">
                <CreditCard className="w-4 h-4 text-[#1F4E3D]" />
                <span>Medio de Pago</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                <button
                  type="button"
                  data-testid="pay-transfer"
                  onClick={() => setPaymentMethod('transfer_cash')}
                  className={`p-2 border text-left uppercase cursor-pointer ${
                    paymentMethod === 'transfer_cash'
                      ? 'border-[#1F4E3D] bg-[#1F4E3D] text-[#F2F0EA] font-bold'
                      : 'border-[#D6D3C9] bg-[#F2F0EA] text-[#3E4552]'
                  }`}
                >
                  Transfer / Efectivo (-10%)
                </button>
                <button
                  type="button"
                  data-testid="pay-mp-contado"
                  onClick={() => setPaymentMethod('mercadopago_contado')}
                  className={`p-2 border text-left uppercase cursor-pointer ${
                    paymentMethod === 'mercadopago_contado'
                      ? 'border-[#07080A] bg-[#07080A] text-[#F2F0EA] font-bold'
                      : 'border-[#D6D3C9] bg-[#F2F0EA] text-[#3E4552]'
                  }`}
                >
                  MP Contado
                </button>
                <button
                  type="button"
                  data-testid="pay-mp-3cuotas"
                  onClick={() => setPaymentMethod('mercadopago_3cuotas')}
                  className={`p-2 border text-left uppercase cursor-pointer ${
                    paymentMethod === 'mercadopago_3cuotas'
                      ? 'border-[#07080A] bg-[#07080A] text-[#F2F0EA] font-bold'
                      : 'border-[#D6D3C9] bg-[#F2F0EA] text-[#3E4552]'
                  }`}
                >
                  MP 3 Cuotas
                </button>
              </div>

              {paymentMethod === 'transfer_cash' && (
                <div className="bg-[#F2F0EA] border border-[#1F4E3D]/40 p-3 font-mono text-[11px] space-y-1 text-[#3E4552]">
                  <div className="flex items-center gap-1.5 text-[#1F4E3D] font-bold">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Coordenadas Oficiales ({catalog.payment_coordinates.holder} · CUIT {catalog.payment_coordinates.cuit})</span>
                  </div>
                  <div>Alias MP: <strong className="text-[#07080A]">{catalog.payment_coordinates.alias_mp}</strong></div>
                  <div>Alias Galicia: <strong className="text-[#07080A]">{catalog.payment_coordinates.alias_galicia}</strong></div>
                  <div>CBU: <strong className="text-[#07080A]">{catalog.payment_coordinates.cbu_galicia}</strong></div>
                </div>
              )}
            </div>

            {/* CUSTOMER IDENTIFIER + SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              <input
                type="text"
                placeholder="Tu nombre / Comercio"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-[#F2F0EA] border border-[#D6D3C9] px-3 py-2 text-[#07080A]"
              />
              <input
                type="text"
                placeholder="Localidad"
                value={customerLocality}
                onChange={(e) => setCustomerLocality(e.target.value)}
                className="bg-[#F2F0EA] border border-[#D6D3C9] px-3 py-2 text-[#07080A]"
              />
            </div>

            <div className="border-t border-[#D6D3C9] pt-3 space-y-1.5 font-mono text-xs tabular-nums">
              <div className="flex justify-between text-[#3E4552]">
                <span>Subtotal Lista ({listMode})</span>
                <span className="text-[#07080A] font-semibold">{formatArs(totals.subtotal)} ARS</span>
              </div>
              {totals.discountArs > 0 && (
                <div className="flex justify-between text-[#1F4E3D] font-bold">
                  <span>Descuento Transferencia (-10%)</span>
                  <span>-{formatArs(totals.discountArs)} ARS</span>
                </div>
              )}
              <div className="flex justify-between text-[#3E4552]">
                <span>Logística ({selectedZone.locality})</span>
                <span data-testid="shipping-cost-display" className="text-[#07080A] font-semibold">
                  {formatArs(totals.shippingCost)} ARS
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#07080A] pt-2 border-t border-[#D6D3C9]">
                <span>TOTAL FINAL</span>
                <span data-testid="order-total-display" className="text-[#B83800]">{formatArs(totals.total)} ARS</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 border border-red-400 bg-red-50 text-red-800 font-mono text-xs">
                {errorMsg}
              </div>
            )}

            {orderFeedback && (
              <div className="p-3 border border-[#1F4E3D] bg-[#F2F0EA] font-mono text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#1F4E3D] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Orden {orderFeedback.code} registrada en PostgreSQL 16</span>
                </div>
                <a
                  href={orderFeedback.checkout_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline text-[#07080A] font-bold"
                >
                  Abrir enlace de confirmación / pago →
                </a>
              </div>
            )}

            {/* 1 CTA Primario Dominante (#FF4F00) + 1 Secundario */}
            <div className="flex flex-col gap-2">
              <a
                data-testid="wa-order-link"
                href={liveWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] font-mono font-extrabold text-xs uppercase py-3.5 px-4 min-h-[44px] rounded-[2px] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Pedido Estructurado por WhatsApp</span>
              </a>

              <button
                type="button"
                data-testid="confirm-order-btn"
                disabled={cart.length === 0 || submitting}
                onClick={handleConfirmOrder}
                className="w-full inline-flex items-center justify-center gap-2 border border-[#07080A] bg-[#FFFFFF] hover:bg-[#07080A] disabled:opacity-40 text-[#07080A] hover:text-[#F2F0EA] font-mono font-bold text-xs uppercase py-2.5 px-4 min-h-[40px] rounded-[2px] transition-colors cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>{submitting ? 'Registrando en DB...' : 'Registrar Pre-Orden + Generar Checkout'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-[#3E4552]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E3D] shrink-0" />
              <span>Coordinación transparente sin stock ficticio · Soporte directo +54 9 2314 489197</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
