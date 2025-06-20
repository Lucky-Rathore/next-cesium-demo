import { Cartesian3, Ion } from "cesium";
import { useState, useRef, useCallback } from "react";

import CesiumMapViewer from "./CesiumMapViewer";
import LayerControlPanel from "./LayerControlPanel";
import BuildingInfoPanel from "./BuildingInfoPanel";
import InteractiveChat from "./InteractiveChat";

// Set the Ion access token
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTI2M2QxOS05OTYwLTQ1MTktYTFhYi0xYTVlY2RkNzdiMzkiLCJpZCI6MTk0MTk3LCJpYXQiOjE3MDcyMDI2OTZ9.pzcYX35HlYrsBQ1xwz0A5YcksLX3gsRpYIxF8yBYbIs";

const DEMO_LOCATIONS = {
  tokyo: Cartesian3.fromDegrees(139.767052, 35.681167, 1000),
  newYork: Cartesian3.fromDegrees(-74.0060, 40.7128, 1000),
  london: Cartesian3.fromDegrees(-0.1276, 51.5074, 1000),
};

// Main Component that orchestrates everything
export default function Cesium() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'system', text: 'Welcome! Click on buildings or try commands like "show tokyo" or "highlight commercial"' }
  ]);
  const [currentLayer, setCurrentLayer] = useState('satellite');
  const [showBuildings, setShowBuildings] = useState(true);
  const [show3DTiles, setShow3DTiles] = useState(false);
  
  const viewerRef = useRef(null);

  const handleViewerReady = useCallback((element) => {
    if (element?.cesiumElement) {
      const viewer = element.cesiumElement;
      viewerRef.current = viewer;
      
      // Set initial camera position
      viewer.camera.setView({
        destination: DEMO_LOCATIONS.tokyo,
        orientation: {
          heading: 0,
          pitch: -Math.PI / 4,
          roll: 0,
        },
      });

      // Add click handler for building selection
      viewer.selectedEntityChanged.addEventListener(() => {
        const selectedEntity = viewer.selectedEntity;
        if (selectedEntity && selectedEntity.properties) {
          const props = selectedEntity.properties;
          const buildingData = {
            id: props.id?._value,
            name: props.name?._value,
            type: props.type?._value,
            height: props.height?._value,
            floors: props.floors?._value,
            occupancy: props.occupancy?._value,
            yearBuilt: props.yearBuilt?._value,
          };
          setSelectedBuilding(buildingData);
          addChatMessage('system', `Selected: ${buildingData.name} - ${buildingData.type} building with ${buildingData.floors} floors`);
        }
      });
    }
  }, []);

  const addChatMessage = useCallback((type, text) => {
    setChatMessages(prev => [...prev, { type, text, timestamp: new Date().toLocaleTimeString() }]);
  }, []);

  const handleChatCommand = useCallback((command) => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('tokyo')) {
      viewer.camera.flyTo({
        destination: DEMO_LOCATIONS.tokyo,
        duration: 2.0
      });
      addChatMessage('system', 'Flying to Tokyo...');
    } else if (lowerCommand.includes('new york')) {
      viewer.camera.flyTo({
        destination: DEMO_LOCATIONS.newYork,
        duration: 2.0
      });
      addChatMessage('system', 'Flying to New York...');
    } else if (lowerCommand.includes('london')) {
      viewer.camera.flyTo({
        destination: DEMO_LOCATIONS.london,
        duration: 2.0
      });
      addChatMessage('system', 'Flying to London...');
    } else if (lowerCommand.includes('highlight commercial')) {
      addChatMessage('system', 'Highlighting all commercial buildings...');
    } else if (lowerCommand.includes('satellite')) {
      setCurrentLayer('satellite');
      addChatMessage('system', 'Switched to satellite imagery');
    } else if (lowerCommand.includes('street')) {
      setCurrentLayer('street');
      addChatMessage('system', 'Switched to street map');
    } else if (lowerCommand.includes('terrain')) {
      setCurrentLayer('terrain');
      addChatMessage('system', 'Switched to terrain map');
    } else {
      addChatMessage('system', 'Try commands like: "show tokyo", "highlight commercial", "satellite view", "terrain"');
    }
  }, [addChatMessage]);

  const handleChatMessage = useCallback((message) => {
    addChatMessage('user', message);
    handleChatCommand(message);
  }, [addChatMessage, handleChatCommand]);

  const flyToBuilding = useCallback((buildingId) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    
    viewer.camera.flyTo({
      destination: DEMO_LOCATIONS.tokyo,
      duration: 1.5
    });
    addChatMessage('system', `Flying to building ${buildingId}...`);
  }, [addChatMessage]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <CesiumMapViewer
        showBuildings={showBuildings}
        show3DTiles={show3DTiles}
        currentLayer={currentLayer}
        onBuildingSelect={setSelectedBuilding}
        onViewerReady={handleViewerReady}
      />

      <LayerControlPanel
        currentLayer={currentLayer}
        setCurrentLayer={setCurrentLayer}
        showBuildings={showBuildings}
        setShowBuildings={setShowBuildings}
        show3DTiles={show3DTiles}
        setShow3DTiles={setShow3DTiles}
      />

      <BuildingInfoPanel
        selectedBuilding={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        onFlyTo={flyToBuilding}
      />

      <InteractiveChat
        chatMessages={chatMessages}
        onSendMessage={handleChatMessage}
      />
    </div>
  );
}