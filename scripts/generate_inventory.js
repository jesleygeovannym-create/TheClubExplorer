const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'js', 'guia-playa-paraiso.js'), 'utf8');

const sandbox = {
  window: {
    L: { divIcon: () => ({}), marker: () => ({ bindPopup: () => ({}), addTo: () => ({}) }) },
    RevistaDigital: {}
  },
  console: console
};

const fn = new Function('window', code);
fn(sandbox.window);

const gp = sandbox.window.RevistaDigital.guiapa;
const pois = gp.POIS || [];

const complexPerimeter = [
  [20.7531065, -86.9697573],
  [20.7648525, -86.9573717]
];

const complexBounds = [
  [20.7525065, -86.9710573],
  [20.7654525, -86.9560717]
];

function isInBox(lat, lng, box) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  const minLat = Math.min(box[0][0], box[1][0]);
  const maxLat = Math.max(box[0][0], box[1][0]);
  const minLng = Math.min(box[0][1], box[1][1]);
  const maxLng = Math.max(box[0][1], box[1][1]);
  return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}

const inventory = pois.map(poi => {
  const hasCoords = Number.isFinite(poi.lat) && Number.isFinite(poi.lng);
  let state = "Pendiente de coordenadas";
  if (hasCoords) {
    state = poi.verified ? "Verificado" : "Pendiente de ubicación";
  }

  const inPerimeter = hasCoords ? isInBox(poi.lat, poi.lng, complexPerimeter) : false;
  const inBounds = hasCoords ? isInBox(poi.lat, poi.lng, complexBounds) : false;

  return {
    id: poi.id,
    name: poi.name,
    cat: poi.category || "servicio",
    hotelId: poi.hotelId || null,
    source: poi.source || "plano",
    verified: Boolean(poi.verified),
    lat: hasCoords ? poi.lat : null,
    lng: hasCoords ? poi.lng : null,
    description: poi.description || "",
    external: false,
    kind: poi.kind || null,
    state: state,
    inPerimeter: inPerimeter,
    inBounds: inBounds
  };
});

fs.writeFileSync(
  path.join(__dirname, '..', 'inventory_final.json'),
  JSON.stringify(inventory, null, 2),
  'utf8'
);

console.log("=== INVENTARIO GENERADO CON ÉXITO ===");
console.log("Total registros:", inventory.length);
const verifiedCount = inventory.filter(x => x.verified && x.lat != null).length;
const pendingCoordsCount = inventory.filter(x => x.lat == null).length;
const pendingLocationCount = inventory.filter(x => x.lat != null && !x.verified).length;
console.log("Verificados con coordenadas:", verifiedCount);
console.log("Pendientes de coordenadas:", pendingCoordsCount);
console.log("Pendientes de ubicación:", pendingLocationCount);

