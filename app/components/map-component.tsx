import maplibregl, { FullscreenControl, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import config from "~/config";
import IndoorDirections from "~/indoor-directions/directions/main";
import IndoorMapLayer from "~/layers/indoor-map-layer";
import Tile3dLayer from "~/layers/tile-3d-layer";
import useMapStore from "~/stores/use-map-store";
import NavigationInput from "./navigation-input";
import MaplibreInspect from "@maplibre/maplibre-gl-inspect";
import "@maplibre/maplibre-gl-inspect/dist/maplibre-gl-inspect.css";

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const setMapInstance = useMapStore((state) => state.setMapInstance);

  useEffect(() => {
    const map = new maplibregl.Map({
      ...config.mapConfig,
      container: mapContainer.current!,
    });
    setMapInstance(map);

    map.on("load", () => {
      map.addLayer(new Tile3dLayer());
      map.addLayer(new IndoorMapLayer());

      const indoorDirections = new IndoorDirections(map);
      indoorDirections.loadMapData("assets/geojson/indoor-routes.geojson");

      const start: [number, number] = [
        3.110_255_339_660_966_5, 45.759_180_103_714_186,
      ];
      const end: [number, number] = [
        3.111_802_160_097_454_4, 45.758_458_704_536_62,
      ];

      setTimeout(() => {
        indoorDirections.setWaypoints([start, end]);
      }, 1500);
    });

    map.addControl(new NavigationControl(), "bottom-right");
    map.addControl(new FullscreenControl(), "bottom-right");
    map.addControl(
      new MaplibreInspect({
        popup: new maplibregl.Popup({
          closeOnClick: false,
        }),
        blockHoverPopupOnClick: true,
      }),
    );
    return () => {
      map.remove();
    };
  });

  return (
    <div className="flex size-full flex-col">
      <NavigationInput />
      <div ref={mapContainer} className="size-full"></div>
    </div>
  );
}
