import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import { PLANTS, VASES, BIOMA_LABELS, type Plant, type Vase, type Bioma } from './data';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CanvasItem {
  id: string;
  plantId: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface PlantNodeProps {
  item: CanvasItem;
  plant: Plant;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChange: (id: string, attrs: Partial<CanvasItem>) => void;
}

function PlantNode({ item, plant, isSelected, onSelect, onChange }: PlantNodeProps) {
  const [img] = useImage(plant.svg);
  const imgRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && imgRef.current) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        ref={imgRef}
        image={img}
        x={item.x}
        y={item.y}
        width={plant.width * 0.5}
        height={plant.height * 0.5}
        offsetX={(plant.width * 0.5) / 2}
        offsetY={(plant.height * 0.5) / 2}
        scaleX={item.scaleX}
        scaleY={item.scaleY}
        rotation={item.rotation}
        opacity={item.opacity}
        draggable
        onClick={() => onSelect(item.id)}
        onTap={() => onSelect(item.id)}
        onDragEnd={(e) => {
          onChange(item.id, { x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={(e) => {
          const node = imgRef.current;
          onChange(item.id, {
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox;
            return newBox;
          }}
          rotateEnabled={true}
          keepRatio={false}
          borderStroke="#4a7a4a"
          anchorStroke="#4a7a4a"
          anchorFill="#c45c2a"
          anchorSize={8}
          borderDash={[4, 4]}
        />
      )}
    </>
  );
}

interface VaseNodeProps {
  vase: Vase;
  canvasW: number;
  canvasH: number;
}

function VaseNode({ vase, canvasW, canvasH }: VaseNodeProps) {
  const [img] = useImage(vase.svg);
  const scale = Math.min((canvasW * 0.55) / vase.width, (canvasH * 0.65) / vase.height);
  const w = vase.width * scale;
  const h = vase.height * scale;
  return (
    <KonvaImage
      image={img}
      x={canvasW / 2}
      y={canvasH - 20}
      width={w}
      height={h}
      offsetX={w / 2}
      offsetY={h}
      listening={false}
    />
  );
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────

const IconTrash = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19 7-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/>
  </svg>
);

const IconExport = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
  </svg>
);

const IconClear = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
  </svg>
);

const IconUp = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
  </svg>
);

const IconDown = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
  </svg>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function FlorAI() {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedBioma, setSelectedBioma] = useState<string>('todos');
  const [selectedVaseId, setSelectedVaseId] = useState<string>('barro');
  const [hoveredPlant, setHoveredPlant] = useState<Plant | null>(null);
  const stageRef = useRef<any>(null);

  const CANVAS_W = 600;
  const CANVAS_H = 500;

  const selectedVase = VASES.find((v) => v.id === selectedVaseId) ?? VASES[0];
  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const selectedPlant = selectedItem ? PLANTS.find((p) => p.id === selectedItem.plantId) : null;

  const filteredPlants =
    selectedBioma === 'todos'
      ? PLANTS
      : PLANTS.filter((p) => p.bioma === selectedBioma);

  const addPlant = useCallback((plant: Plant) => {
    const jitter = () => (Math.random() - 0.5) * 80;
    const newItem: CanvasItem = {
      id: `${plant.id}-${Date.now()}`,
      plantId: plant.id,
      x: CANVAS_W / 2 + jitter(),
      y: CANVAS_H * 0.45 + jitter(),
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      opacity: 1,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  }, []);

  const updateItem = useCallback((id: string, attrs: Partial<CanvasItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...attrs } : item))
    );
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const moveLayer = useCallback(
    (dir: 'up' | 'down') => {
      if (!selectedId) return;
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.id === selectedId);
        if (idx === -1) return prev;
        const next = [...prev];
        if (dir === 'up' && idx < next.length - 1) {
          [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
        } else if (dir === 'down' && idx > 0) {
          [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
        }
        return next;
      });
    },
    [selectedId]
  );

  const exportPng = useCallback(() => {
    if (!stageRef.current) return;
    const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });
    const a = document.createElement('a');
    a.download = 'florai-arranjo.png';
    a.href = dataUrl;
    a.click();
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    setSelectedId(null);
  }, []);

  // Deselect on stage background click
  const handleStageClick = useCallback(
    (e: any) => {
      if (e.target === e.target.getStage()) {
        setSelectedId(null);
      }
    },
    []
  );

  // Delete key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        deleteSelected();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedId, deleteSelected]);

  const biomas = ['todos', 'mata-atletica', 'cerrado', 'amazonia', 'caatinga', 'pampa', 'pantanal'];
  const biomaKeys = Object.keys(BIOMA_LABELS);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minHeight: '700px',
        background: '#0d1a0d',
        color: '#f5f0e8',
        fontFamily: "'Inter', 'system-ui', sans-serif",
        userSelect: 'none',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: '56px',
          borderBottom: '1px solid rgba(74,122,74,0.3)',
          background: '#162416',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '0.12em',
              color: '#c45c2a',
              fontFamily: 'serif',
            }}
          >
            FLOR.AI
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(245,240,232,0.35)',
              letterSpacing: '0.08em',
              fontVariant: 'small-caps',
            }}
          >
            Arranjos com Nativas Brasileiras
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportPng}
            style={topBtnStyle('#4a7a4a', '#2D6A4F')}
          >
            <IconExport />
            Exportar PNG
          </button>
          <button
            onClick={clearAll}
            style={topBtnStyle('#7a2a2a', '#5a1a1a')}
          >
            <IconClear />
            Limpar
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left sidebar */}
        <div
          style={{
            width: '280px',
            flexShrink: 0,
            borderRight: '1px solid rgba(74,122,74,0.3)',
            background: '#162416',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Bioma filter */}
          <div
            style={{
              padding: '14px 14px 0',
              borderBottom: '1px solid rgba(74,122,74,0.2)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: 'rgba(245,240,232,0.4)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Bioma
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingBottom: '12px' }}>
              {biomaKeys.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBioma(b)}
                  style={{
                    padding: '4px 9px',
                    borderRadius: '3px',
                    border: '1px solid',
                    borderColor: selectedBioma === b ? '#c45c2a' : 'rgba(74,122,74,0.4)',
                    background: selectedBioma === b ? '#c45c2a22' : 'transparent',
                    color: selectedBioma === b ? '#c45c2a' : 'rgba(245,240,232,0.55)',
                    fontSize: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                >
                  {BIOMA_LABELS[b] ?? b}
                </button>
              ))}
            </div>
          </div>

          {/* Plant grid */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(74,122,74,0.4) transparent',
            }}
          >
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: 'rgba(245,240,232,0.4)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Plantas ({filteredPlants.length})
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
              }}
            >
              {filteredPlants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => addPlant(plant)}
                  onMouseEnter={() => setHoveredPlant(plant)}
                  onMouseLeave={() => setHoveredPlant(null)}
                  title={plant.name}
                  style={{
                    background: '#1e321e',
                    border: '1px solid rgba(74,122,74,0.3)',
                    borderRadius: '6px',
                    padding: '6px 4px 4px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'border-color 0.15s, background 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#c45c2a';
                    (e.currentTarget as HTMLElement).style.background = '#243824';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,122,74,0.3)';
                    (e.currentTarget as HTMLElement).style.background = '#1e321e';
                  }}
                >
                  <img
                    src={plant.svg}
                    alt={plant.name}
                    style={{
                      width: '52px',
                      height: '52px',
                      objectFit: 'contain',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '8px',
                      color: 'rgba(245,240,232,0.6)',
                      textAlign: 'center',
                      lineHeight: '1.2',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {plant.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Vase selector */}
          <div
            style={{
              borderTop: '1px solid rgba(74,122,74,0.2)',
              padding: '12px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: 'rgba(245,240,232,0.4)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Vaso
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
              {VASES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVaseId(v.id)}
                  title={v.name}
                  style={{
                    background: selectedVaseId === v.id ? '#2D6A4F33' : '#1e321e',
                    border: '1px solid',
                    borderColor: selectedVaseId === v.id ? '#4a7a4a' : 'rgba(74,122,74,0.25)',
                    borderRadius: '5px',
                    padding: '5px 2px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                >
                  <img
                    src={v.svg}
                    alt={v.name}
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                  <span style={{ fontSize: '7px', color: 'rgba(245,240,232,0.5)', textAlign: 'center' }}>
                    {v.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#0d1a0d',
            overflow: 'hidden',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedId(null);
          }}
        >
          <div
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(74,122,74,0.4)',
              boxShadow: '0 0 40px rgba(0,0,0,0.5)',
              background: '#1a2e1a',
            }}
          >
            <Stage
              ref={stageRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{ display: 'block', background: '#1a2e1a' }}
              onClick={handleStageClick}
              onTap={handleStageClick}
            >
              {/* Vase layer (bottom, not interactive) */}
              <Layer listening={false}>
                <VaseNode vase={selectedVase} canvasW={CANVAS_W} canvasH={CANVAS_H} />
              </Layer>
              {/* Plants layer */}
              <Layer>
                {items.map((item) => {
                  const plant = PLANTS.find((p) => p.id === item.plantId);
                  if (!plant) return null;
                  return (
                    <PlantNode
                      key={item.id}
                      item={item}
                      plant={plant}
                      isSelected={selectedId === item.id}
                      onSelect={setSelectedId}
                      onChange={updateItem}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            width: '220px',
            flexShrink: 0,
            borderLeft: '1px solid rgba(74,122,74,0.3)',
            background: '#162416',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {selectedItem && selectedPlant ? (
            <>
              {/* Selected plant info */}
              <div>
                <div style={labelStyle}>Selecionado</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f5f0e8', marginBottom: '2px' }}>
                  {selectedPlant.name}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(245,240,232,0.4)', fontStyle: 'italic' }}>
                  {selectedPlant.scientific}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    padding: '2px 7px',
                    borderRadius: '2px',
                    background: 'rgba(74,122,74,0.2)',
                    border: '1px solid rgba(74,122,74,0.3)',
                    fontSize: '9px',
                    color: '#4a7a4a',
                    letterSpacing: '0.05em',
                  }}
                >
                  {BIOMA_LABELS[selectedPlant.bioma] ?? selectedPlant.bioma}
                </div>
              </div>

              {/* Scale */}
              <div>
                <div style={labelStyle}>Escala</div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.05"
                  value={selectedItem.scaleX}
                  onChange={(e) => {
                    const s = parseFloat(e.target.value);
                    updateItem(selectedItem.id, { scaleX: s, scaleY: s });
                  }}
                  style={rangeStyle}
                />
                <div style={valueStyle}>{(selectedItem.scaleX * 100).toFixed(0)}%</div>
              </div>

              {/* Rotation */}
              <div>
                <div style={labelStyle}>Rotação</div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={selectedItem.rotation}
                  onChange={(e) => {
                    updateItem(selectedItem.id, { rotation: parseFloat(e.target.value) });
                  }}
                  style={rangeStyle}
                />
                <div style={valueStyle}>{selectedItem.rotation.toFixed(0)}°</div>
              </div>

              {/* Opacity */}
              <div>
                <div style={labelStyle}>Opacidade</div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={selectedItem.opacity}
                  onChange={(e) => {
                    updateItem(selectedItem.id, { opacity: parseFloat(e.target.value) });
                  }}
                  style={rangeStyle}
                />
                <div style={valueStyle}>{(selectedItem.opacity * 100).toFixed(0)}%</div>
              </div>

              {/* Layer controls */}
              <div>
                <div style={labelStyle}>Camada</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => moveLayer('up')}
                    title="Trazer para frente"
                    style={controlBtnStyle}
                  >
                    <IconUp />
                    Frente
                  </button>
                  <button
                    onClick={() => moveLayer('down')}
                    title="Enviar para trás"
                    style={controlBtnStyle}
                  >
                    <IconDown />
                    Trás
                  </button>
                </div>
              </div>

              {/* Delete */}
              <div style={{ marginTop: 'auto' }}>
                <button
                  onClick={deleteSelected}
                  style={{
                    ...controlBtnStyle,
                    width: '100%',
                    justifyContent: 'center',
                    borderColor: 'rgba(220,38,38,0.4)',
                    color: '#ef4444',
                    background: 'rgba(220,38,38,0.08)',
                  }}
                >
                  <IconTrash />
                  Remover
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '12px',
                color: 'rgba(245,240,232,0.25)',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" opacity="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"/>
              </svg>
              <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                Clique em uma planta para adicioná-la ao arranjo
              </div>
              <div style={{ fontSize: '10px', opacity: 0.6, lineHeight: '1.4' }}>
                Selecione um elemento no canvas para editar
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        style={{
          height: '32px',
          borderTop: '1px solid rgba(74,122,74,0.2)',
          background: '#0d1a0d',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '24px',
          flexShrink: 0,
        }}
      >
        {hoveredPlant ? (
          <>
            <span style={{ fontSize: '11px', color: '#c45c2a', fontWeight: 500 }}>
              {hoveredPlant.name}
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.35)', fontStyle: 'italic' }}>
              {hoveredPlant.scientific}
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(74,122,74,0.8)' }}>
              {BIOMA_LABELS[hoveredPlant.bioma]}
            </span>
          </>
        ) : (
          <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.2)' }}>
            {items.length} {items.length === 1 ? 'elemento' : 'elementos'} no arranjo
            {selectedId ? ' · Tecla Delete remove o selecionado' : ''}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Style helpers ────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(245,240,232,0.35)',
  marginBottom: '6px',
};

const valueStyle: React.CSSProperties = {
  fontSize: '10px',
  color: 'rgba(245,240,232,0.5)',
  marginTop: '3px',
  fontVariantNumeric: 'tabular-nums',
};

const rangeStyle: React.CSSProperties = {
  width: '100%',
  accentColor: '#c45c2a',
  cursor: 'pointer',
};

const controlBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '5px 10px',
  border: '1px solid rgba(74,122,74,0.35)',
  borderRadius: '4px',
  background: 'transparent',
  color: 'rgba(245,240,232,0.65)',
  fontSize: '11px',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.15s',
};

function topBtnStyle(hoverBg: string, bg: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    border: `1px solid ${hoverBg}55`,
    borderRadius: '4px',
    background: `${bg}33`,
    color: 'rgba(245,240,232,0.8)',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  };
}
