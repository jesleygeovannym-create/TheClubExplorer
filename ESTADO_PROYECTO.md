# ESTADO DEL PROYECTO — The Club Explorer
**Fecha:** 2026-11-18  
**Versión:** 1.2  
**Responsable:** Auxiliar de Diseño Gráfico y Redes Sociales  
**Jefe inmediato:** Irais Salinas Melgarejo (irais.salinas@iberostartheclub.com)

---

## ✅ SEGURIDAD — Completado

| Servicio | Estado | Detalle |
|----------|--------|---------|
| **OpenWeatherMap** | ✅ Rotada | Nueva key en `js/weather.js:5` |
| **Supabase** | ✅ Rotadas | Ambas keys (anon + secret); invitación *owner* enviada a Irais |
| **Mapbox** | ⚠️ Parcial | Password cambiado (credencial no documentada aquí); **token no rotado** (requiere payment method); **no permite invitaciones externas** |
| **Google Maps API** | ✅ Eliminada | Código muerto borrado (`function.js`, `js/mapas.js`) |

> **Nota:** Las claves **no** están en el manual ni en el repo público. El token Mapbox sigue en `mapbox/mapbox-guia-playa-paraiso.html` (pendiente mover a variable de entorno).

---

## ✅ UI / BRANDING — Completado

| Elemento | Antes | Ahora |
|----------|-------|-------|
| **Footer fondo** | Navy `#002855` (bloque grande) | Brand beige `#83786F` (color de marca, uso permitido en áreas grandes) |
| **Footer texto** | "Iberostar Hotels & Resorts – Reserve sus vacaciones…" | Contenido de **Iberostar The Club** (fuente: https://www.iberostartheclub.com/) |
| **Footer logo** | Hotels & Resorts | **Iberostar The Club** (marca) |
| **Footer enlace** | `iberostar.com` | `https://www.iberostartheclub.com/` |
| **Rutas color** | Dorados genéricos | **Brand gold `#B9A385`** en Leaflet y Mapbox |

---

## 🔄 TRADUCCIONES (EN) — En progreso

- ✅ 4 descripciones hoteles agregadas en `js/page-translations.js`
- 🔄 **Ampliación sistemática** en todo el sitio: `i18n.js` + `page-translations.js`
- Pendientes clave: "Ubicarme", "Cocina de mariscos", "Buffet Mediterráneo", descripciones 5 hoteles principales

---

## ✅ DATOS RESTAURANTES — 24/24 completados

Todos con `verified: true`, coordenadas confirmadas, en Leaflet y Mapbox:

| # | ID | Nombre | Hotel | Lat | Lng |
|---|----|--------|-------|-----|-----|
| 1 | hashiru | Hashiro | Waves Paraíso Beach | 20.7606093 | -86.9637212 |
| 2 | la-dorada | La Dorada | Selection Paraíso del Mar | 20.76156 | -86.9631079 |
| 3 | rodizio | Rodizio | Selection Paraíso del Mar | 20.76112 | -86.9634612 |
| 4 | el-mercado | El Mercado | Selection Paraíso del Mar | 20.7612549 | -86.9626755 |
| 5 | la-plaza | La Plaza | Waves Paraíso Beach | 20.7608481 | -86.9629956 |
| 6 | la-hacienda | La Hacienda | Waves Paraíso Beach | 20.7614866 | -86.9629864 |
| 7 | el-puerto | El Puerto | Waves Paraíso Beach | 20.7578601 | -86.9591398 |
| 8 | el-museo | El Museo | Waves Paraíso Lindo | 20.7589083 | -86.9636421 |
| 9 | la-pagoda | La Pagoda | Waves Paraíso Lindo | 20.7587578 | -86.9632596 |
| 10 | el-rancho | El Rancho (Steak House) | Selection Paraíso Maya | 20.7580548 | -86.964155 |
| 11 | la-geisha | **La Geisha** | Selection Paraíso Maya | 20.7572267 | -86.9646975 |
| 12 | letoile | L'Etoile | Selection Paraíso Maya | 20.7570704 | -86.9644942 |
| 13 | el-tapatio | El Tapatío | Waves Paraíso Lindo | 20.7567139 | -86.960329 |
| 14 | venecia | Venecia | JOIA Paraíso | 20.755841 | -86.9626532 |
| 15 | bellavista | Bellavista | JOIA Paraíso | 20.7549173 | -86.9612041 |
| 16 | latelier | L'Atelier | JOIA Paraíso | 20.7551676 | -86.9609817 |
| 17 | haiku | Haiku | JOIA Paraíso | 20.755212 | -86.9610284 |
| 18 | olivetti | The Olivetti | Selection Paraíso Maya | 20.7567218 | -86.9604135 |
| 19 | lemon-spices | Lemon & Spices | Waves Paraíso Lindo | 20.7589371 | -86.9634247 |
| 20 | under-the-sea | **American Seafood Grill Under the Sea** | Selection Paraíso Maya | 20.75687 | -86.95974 |
| 21 | buffet-la-marina | **La Marina** (mariscos, buffet mediodía) | Selection Paraíso Maya | 20.757842 | -86.963819 |
| 22 | legado | Legado | JOIA Paraíso | 20.754923 | -86.961316 |
| 23 | el-colonial | El Colonial | Waves Paraíso Beach | 20.7609943 | -86.963447 |
| 24 | trattoria | Trattoria by El Faro | Selection Paraíso del Mar | 20.7589509 | -86.9583723 |

**Correcciones aplicadas:**
- "La Gueisha" → **La Geisha**
- "America Seafood Grill" → **American Seafood Grill**
- "Buffet La Marina" → **La Marina** (tipo: especialidad mariscos; buffet mediterráneo solo almuerzo 12:00-16:00; cena a la carta 18:30-22:00)

---

## ✅ STAR PRESTIGE PARAÍSO MAYA
- Ubicación **definitiva** (zona en remodelación) — coords actualizadas en POIs

---

## ✅ HORARIOS Y CARTAS
- Proporcionados por **Member Experience** + corroborados en `iberostar.com`
- Sincronizados en `js/guia-playa-paraiso.js` y `js/datos-complejo.js`

---

## ✅ LEYENDA MAPA
- Texto "Pendiente de verificación" **eliminado** (solo aparece si hay POIs sin `verified: true` en vista actual)

---

## ✅ ARCHIVOS DE TRABAJO — Fuera de raíz
- `AUDITORIA_*.md` → subcarpeta / eliminados
- `inventory_final.json` → subcarpeta
- `mapbox-guia-playa-paraiso.html` → `mapbox/`

---

## ✅ MANUAL OPERATIVO — `DOCUMENTACION_STAR_MAGAZINE.md` actualizado

| Cambio | Estado |
|--------|--------|
| Nombre: "Star Magazine" → **The Club Explorer** | ✅ |
| Concepto: revista → **herramienta operativa socio/colaborador** | ✅ |
| Marco teórico/referencias → **eliminado** | ✅ |
| Formato: **manual práctico** (actualizar carta/horario/ubicación, alta editor, troubleshooting) | ✅ |
| Alcance: **solo Playa Paraíso** (Quetzal/Tucán en Playacar) | ✅ |
| Script `npx serve` inexistente → **guías de ejecución reales** | ✅ |
| Sección 2.1 (APIs con archivo/línea) → **eliminada** (sin claves en manual) | ✅ |

---

## 📋 PENDIENTES MENORES

1. **Mapbox token** → mover a variable de entorno / GitHub Pages secrets
2. **Traducciones EN** → completar cobertura total del sitio
3. **Burger Box** (restaurante 11 de Paraíso Maya) → confirmar si aplica / agregar si falta

---

## 🚀 DESPLIEGUE
- **GitHub Pages** (branch `main`) → automático en push
- Commits recientes: `910ede3` (branding, seguridad, datos), `1528936` (restaurantes, POIs), `7928cc5` (docs APIs), `09a9b0a` (manual v1.2)
- Cache busting activo: CSS `v84`, JS assets versionados en `index.html`

---

**Próxima revisión:** Según avances de traducciones EN y token Mapbox.