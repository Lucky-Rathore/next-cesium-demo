import { Cartesian3, Color, Ion, IonResource, createWorldImagery, createOpenStreetMapImageryProvider, ArcGisMapServerImageryProvider } from "cesium";
import { useState, useRef, useCallback } from "react";
import {
  Cesium3DTileset,
  Entity,
  PointGraphics,
  Viewer,
  GeoJsonDataSource as ResiumGeoJsonDataSource,
  ImageryLayer,
} from "resium";

// Sample building data with larger, more visible buildings
const SAMPLE_BUILDINGS = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "building_1",
        name: "Tech Tower",
        type: "Commercial",
        height: 150,
        floors: 40,
        occupancy: 2500,
        yearBuilt: 2018
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [139.767052, 35.681167],
          [139.767552, 35.681167],
          [139.767552, 35.681667],
          [139.767052, 35.681667],
          [139.767052, 35.681167]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "building_2",
        name: "City Mall",
        type: "Retail",
        height: 80,
        floors: 6,
        occupancy: 5000,
        yearBuilt: 2015
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [139.765052, 35.680167],
          [139.765552, 35.680167],
          [139.765552, 35.680667],
          [139.765052, 35.680667],
          [139.765052, 35.680167]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "building_3",
        name: "Residential Complex",
        type: "Residential",
        height: 120,
        floors: 30,
        occupancy: 800,
        yearBuilt: 2020
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [139.768052, 35.682167],
          [139.768552, 35.682167],
          [139.768552, 35.682667],
          [139.768052, 35.682667],
          [139.768052, 35.682167]
        ]]
      }
    }
  ]
};

const DEMO_LOCATIONS = {
  tokyo: Cartesian3.fromDegrees(139.767052, 35.681167, 2000),
  newYork: Cartesian3.fromDegrees(-74.0060, 40.7128, 1000),
  london: Cartesian3.fromDegrees(-0.1276, 51.5074, 1000),
};

export default function CesiumMapViewer({ showBuildings, show3DTiles, currentLayer, onBuildingSelect, onViewerReady }) {
  // Create imagery providers based on current layer
  const getImageryProvider = () => {
    console.log("Creating imagery provider for:", currentLayer);
    
    try {
      switch (currentLayer) {
        case 'satellite':
          return createWorldImagery();
        case 'street':
          return createOpenStreetMapImageryProvider({
            url: 'https://a.tile.openstreetmap.org/'
          });
        case 'terrain':
          return new ArcGisMapServerImageryProvider({
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
          });
        default:
          return createWorldImagery();
      }
    } catch (error) {
      console.error("Error creating imagery provider:", error);
      return createWorldImagery(); // Fallback
    }
  };

  return (
    <Viewer
      full
      ref={onViewerReady}
      terrainProvider={undefined}
      timeline={false}
      animation={false}
      enableLighting={true}
      shadows={true}
      imageryProvider={false} // Disable default imagery so we can use our own
    >
      {/* Custom Imagery Layer */}
      <ImageryLayer 
        imageryProvider={getImageryProvider()}
        key={currentLayer} // Force re-render when layer changes
      />

      {/* GeoJSON Buildings Layer */}
      {showBuildings && (
        <ResiumGeoJsonDataSource
          data={SAMPLE_BUILDINGS}
          onLoad={(dataSource) => {
            console.log("Buildings loaded!", dataSource.entities.values.length, "buildings");
            
            // Style the buildings with more visible colors
            const entities = dataSource.entities.values;
            for (let i = 0; i < entities.length; i++) {
              const entity = entities[i];
              
              // Different colors based on building type
              let buildingColor = Color.BLUE;
              if (entity.properties.type._value === "Commercial") {
                buildingColor = Color.CYAN;
              } else if (entity.properties.type._value === "Retail") {
                buildingColor = Color.ORANGE;
              } else if (entity.properties.type._value === "Residential") {
                buildingColor = Color.GREEN;
              }
              
              entity.polygon.material = buildingColor.withAlpha(0.8);
              entity.polygon.outline = true;
              entity.polygon.outlineColor = Color.WHITE;
              entity.polygon.outlineWidth = 2;
              entity.polygon.extrudedHeight = entity.properties.height;
              entity.polygon.height = 0;
            }
          }}
        />
      )}

      {/* Sample 3D Tileset */}
      {show3DTiles && (
        <Cesium3DTileset
          url={IonResource.fromAssetId(2877167)}
          onReady={(tileset) => {
            console.log("3D Tileset loaded!");
          }}
        />
      )}

      {/* Demo markers */}
      <Entity
        name="Tokyo Demo Point"
        position={DEMO_LOCATIONS.tokyo}
        description="Tokyo, Japan - Demo Location"
      >
        <PointGraphics
          pixelSize={15}
          color={Color.YELLOW}
          outlineColor={Color.BLACK}
          outlineWidth={2}
        />
      </Entity>
    </Viewer>
  );
}