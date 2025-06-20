export default function LayerControlPanel({ currentLayer, setCurrentLayer, showBuildings, setShowBuildings, show3DTiles, setShow3DTiles }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(42, 42, 42, 0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      minWidth: '200px',
      zIndex: 1000
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Layer Controls</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Imagery:</label>
        <select 
          value={currentLayer} 
          onChange={(e) => setCurrentLayer(e.target.value)}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="satellite">Satellite</option>
          <option value="street">Street Map</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showBuildings}
            onChange={(e) => setShowBuildings(e.target.checked)}
          />
          Buildings Layer
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={show3DTiles}
            onChange={(e) => setShow3DTiles(e.target.checked)}
          />
          3D City Model
        </label>
      </div>
    </div>
  );
}

