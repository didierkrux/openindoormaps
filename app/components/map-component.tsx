import MaplibreInspect from "@maplibre/maplibre-gl-inspect";
import "@maplibre/maplibre-gl-inspect/dist/maplibre-gl-inspect.css";
import maplibregl, { FullscreenControl, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useMemo, useRef } from "react";
import config from "~/config";
import IndoorMapLayer from "~/layers/indoor-map-layer";
import POIsLayer from "~/layers/pois-layer";
import building from "~/mock/building.json";
import useMapStore from "~/stores/use-map-store";
import DiscoveryPanel from "./discovery-panel/discovery-panel";
import { FloorUpDownControl } from "./floor-up-down-control";
import { IndoorMapGeoJSON } from "~/types/geojson";
// import DemoBanner from "./demo-banner";
import { Theme, useTheme } from "remix-themes";
import "~/maplibre.css";

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [theme] = useTheme();

  const setMapInstance = useMapStore((state) => state.setMapInstance);
  const indoorMapLayer = useMemo(
    () =>
      new IndoorMapLayer(
        building.indoor_map as IndoorMapGeoJSON,
        theme as string,
      ),
    [theme],
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    // Log current config for debugging
    // console.log("Current map config:", config.mapConfig);

    const map = new maplibregl.Map({
      ...config.mapConfig,
      style: config.mapStyles[theme as Theme],
      container: mapContainer.current,
    });
    setMapInstance(map);

    map.on("load", () => {
      try {
        // map.addLayer(new Tile3dLayer());
        map.addLayer(indoorMapLayer);
        map.addLayer(
          new POIsLayer(building.pois as GeoJSON.GeoJSON, theme as string),
        );
      } catch (error) {
        console.error("Failed to initialize map layers:", error);
      }
    });

    map.addControl(new NavigationControl(), "bottom-right");
    map.addControl(new FullscreenControl(), "bottom-right");

    // Log map position when moved
    // map.on("moveend", () => {
    //   const center = map.getCenter();
    //   const zoom = map.getZoom();
    //   const bearing = map.getBearing();
    //   const pitch = map.getPitch();
    //   console.log("Map moved to:", {
    //     center: [center.lng, center.lat],
    //     zoom: zoom,
    //     bearing: bearing,
    //     pitch: pitch,
    //     coordinates: `${center.lat},${center.lng},${zoom.toFixed(2)}z`,
    //   });
    // });

    if (process.env.NODE_ENV === "development") {
      map.addControl(
        new MaplibreInspect({
          popup: new maplibregl.Popup({
            closeOnClick: false,
          }),
          blockHoverPopupOnClick: true,
        }),
        "bottom-right",
      );
    }

    // map.addControl(new OIMLogo());

    return () => {
      map.remove();
    };
  }, [indoorMapLayer, setMapInstance, theme]);

  return (
    <div className="flex size-full flex-col">
      <DiscoveryPanel />
      {process.env.NODE_ENV === "development" && (
        <>
          {/* <FloorSelector indoorMapLayer={indoorMapLayer} /> */}
          <FloorUpDownControl indoorMapLayer={indoorMapLayer} />
        </>
      )}

      <div ref={mapContainer} className="size-full" />
      {/* <DemoBanner /> */}
    </div>
  );
}
