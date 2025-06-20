import { Cartesian3, Color, Ion, IonResource } from "cesium";
import { useState, useRef, useCallback } from "react";
import {
  Cesium3DTileset,
  Entity,
  PointGraphics,
  Viewer,
  GeoJsonDataSource as ResiumGeoJsonDataSource,
} from "resium";
// Component 3: Interactive Chat
export default function InteractiveChat({ chatMessages, onSendMessage }) {
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = useCallback((e) => {
    if (chatInput.trim()) {
      onSendMessage(chatInput);
      setChatInput('');
    }
  }, [chatInput, onSendMessage]);

  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      width: '350px',
      height: '300px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 1000
    }}>
      <div style={{
        padding: '15px',
        borderBottom: '1px solid #eee',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px 8px 0 0'
      }}>
        <h4 style={{ margin: 0, color: '#333' }}>Interactive Chat</h4>
      </div>
      
      <div style={{
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        fontSize: '14px'
      }}>
        {chatMessages.map((msg, idx) => (
          <div key={idx} style={{
            marginBottom: '8px',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: msg.type === 'user' ? '#e3f2fd' : '#f5f5f5',
            borderLeft: `3px solid ${msg.type === 'user' ? '#2196f3' : '#4caf50'}`
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              {msg.type === 'user' ? 'You' : 'System'} {msg.timestamp && `• ${msg.timestamp}`}
            </div>
            {msg.text}
          </div>
        ))}
      </div>
      
      <div style={{ padding: '10px', borderTop: '1px solid #eee' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Try: 'show tokyo' or 'highlight commercial'"
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

