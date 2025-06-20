import { Cartesian3, Color, Ion, IonResource } from "cesium";
import { useState, useRef, useCallback } from "react";
import {
  Cesium3DTileset,
  Entity,
  PointGraphics,
  Viewer,
  GeoJsonDataSource as ResiumGeoJsonDataSource,
} from "resium";
// Component 2: Building Info Panel

export default function BuildingInfoPanel({ selectedBuilding, onClose, onFlyTo }) {
  if (!selectedBuilding) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '8px',
      minWidth: '250px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#333' }}>{selectedBuilding.name}</h3>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      
      <div style={{ color: '#666', lineHeight: '1.6' }}>
        <p><strong>Type:</strong> {selectedBuilding.type}</p>
        <p><strong>Height:</strong> {selectedBuilding.height}m</p>
        <p><strong>Floors:</strong> {selectedBuilding.floors}</p>
        <p><strong>Occupancy:</strong> {selectedBuilding.occupancy?.toLocaleString()}</p>
        <p><strong>Built:</strong> {selectedBuilding.yearBuilt}</p>
      </div>

      <button
        onClick={() => onFlyTo(selectedBuilding.id)}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Fly to Building
      </button>
    </div>
  );
}

