const isMobile =
  typeof globalThis === "undefined" ? false : globalThis.innerWidth < 640;

const config = {
  geoCodingApi: "https://nominatim.openstreetmap.org",
  routingApi: "https://router.project-osrm.org/route/v1",
  mapConfig: {
    center: [-58.420_565_460_088_71, -34.578_168_374_243_42], // La Rural, Buenos Aires, Argentina coordinates
    zoom: isMobile ? 16.15 : 16.15,
    bearing: -55.106_250_000_000_67,
    pitch: 30,
    maxBounds: [
      [-58.430_565_460_088_71, -34.588_168_374_243_42], // Southwest bounds
      [-58.410_565_460_088_71, -34.568_168_374_243_42], // Northeast bounds
    ],
  } as maplibregl.MapOptions,
  mapStyles: {
    light: "https://tiles.openfreemap.org/styles/bright",
    dark: "/styles/dark/style.json",
  },
};

export default config;
