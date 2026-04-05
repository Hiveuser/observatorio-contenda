import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import { PLANTS, VASES, BIOMA_LABELS, type Plant, type Vase } from './data';

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

// ─── Sub-components ────────────────────────────────────────────────────��──────

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
        onDragEnd={(e) => onChange(item.id, { x: e.target.x(), y: e.target.y() })}
        onTransformEnd={(e) => {
          const node = imgRef.current;
          onChange(item.id, {
            x: node.x(), y: node.y(),
            scaleX: node.scaleX(), scaleY: node.scaleY(),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 || newBox.height < 20 ? oldBox : newBox)}
          rotateEnabled
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

interface VaseNodeProps { vase: Vase; canvasW: number; canvasH: number; }
function VaseNode({ vase, canvasW, canvasH }: VaseNodeProps) {
  const [img] = useImage(vase.svg);
  const scale = Math.min((canvasW * 0.55) / vase.width, (canvasH * 0.65) / vase.height);
  const w = vase.width * scale;
  const h = vase.height * scale;
  return (
    <KonvaImage image={img} x={canvasW / 2} y={canvasH - 20}
      width={w} height={h} offsetX={w / 2} offsetY={h} listening={false} />
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconTrash = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19 7-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/></svg>;
const IconExport = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>;
const IconClear = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>;
const IconUp = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/></svg>;
const IconDown = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>;
const IconSparkle = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/></svg>;
const IconCard = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"/></svg>;
const IconAI = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg>;
const IconClose = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>;
const IconDownload = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>;

// ─── Realistic Image Modal ────────────────────────────────────────────────────

interface ImageModalProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onOpenCard: (url: string) => void;
}

function ImageModal({ imageUrl, isLoading, error, onClose, onOpenCard }: ImageModalProps) {
  const download = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'florai-realista.jpg';
    a.click();
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyle, maxWidth: '700px', width: '90vw' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f5f0e8', marginBottom: '2px' }}>
              Imagem Realista
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(245,240,232,0.4)' }}>
              Gerada por IA · FLUX model
            </div>
          </div>
          <button onClick={onClose} style={iconBtnStyle}><IconClose /></button>
        </div>

        {/* Content */}
        <div style={{
          width: '100%', aspectRatio: '4/3',
          background: '#0d1a0d',
          border: '1px solid rgba(74,122,74,0.3)',
          borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', marginBottom: '16px',
        }}>
          {isLoading && (
            <div style={{ textAlign: 'center', color: 'rgba(245,240,232,0.4)' }}>
              <LoadingSpinner />
              <div style={{ marginTop: '16px', fontSize: '13px' }}>Gerando imagem realista...</div>
              <div style={{ marginTop: '6px', fontSize: '11px', opacity: 0.5 }}>pode levar 10–20 segundos</div>
            </div>
          )}
          {error && (
            <div style={{ textAlign: 'center', color: '#ef4444', padding: '20px' }}>
              <div style={{ fontSize: '13px', marginBottom: '8px' }}>{error}</div>
              <div style={{ fontSize: '11px', opacity: 0.6 }}>Verifique sua conexão e tente novamente.</div>
            </div>
          )}
          {imageUrl && !isLoading && (
            <img src={imageUrl} alt="Arranjo realista"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>

        {imageUrl && !isLoading && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={download} style={secondaryBtnStyle}>
              <IconDownload /> Baixar imagem
            </button>
            <button onClick={() => onOpenCard(imageUrl)} style={primaryBtnStyle}>
              <IconCard /> Criar Cartão Presente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card Modal ───────────────────────────────────────────────────────────────

interface CardModalProps {
  imageUrl: string | null;
  arrangementDescription: string;
  onClose: () => void;
}

function CardModal({ imageUrl, arrangementDescription, onClose }: CardModalProps) {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [msgError, setMsgError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const generateMessage = async () => {
    setIsGenerating(true);
    setMsgError('');
    const recipientHint = recipient ? `para ${recipient}` : 'para alguém especial';
    const prompt = `Escreva uma mensagem de presente curta (2-3 frases, máximo 180 caracteres), carinhosa e poética ${recipientHint}, acompanhando um arranjo floral com ${arrangementDescription}. Use português brasileiro. Sem aspas, sem formatação. Apenas o texto da mensagem.`;
    try {
      const res = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
        { headers: { 'Accept': 'text/plain' } }
      );
      if (!res.ok) throw new Error('Falha na geração');
      const text = await res.text();
      setMessage(text.trim().replace(/^["']|["']$/g, ''));
    } catch {
      setMsgError('Não foi possível gerar a mensagem. Tente novamente ou escreva à mão.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext('2d')!;

    // Background gradient (parchment)
    const grad = ctx.createLinearGradient(0, 0, 900, 600);
    grad.addColorStop(0, '#fdf6e3');
    grad.addColorStop(1, '#f5ead0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 900, 600);

    // Left photo area
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, 400, 600);
        ctx.clip();
        ctx.drawImage(img, 0, 0, 400, 600);
        ctx.restore();

        // Gradient fade from photo to parchment
        const fade = ctx.createLinearGradient(320, 0, 420, 0);
        fade.addColorStop(0, 'rgba(253,246,227,0)');
        fade.addColorStop(1, 'rgba(253,246,227,1)');
        ctx.fillStyle = fade;
        ctx.fillRect(320, 0, 100, 600);

        renderCardText(ctx, canvas, recipient, message, sender);
        triggerDownload(canvas);
      };
      img.src = imageUrl;
    } else {
      // No image — floral background pattern
      ctx.fillStyle = '#2D6A4F22';
      ctx.fillRect(0, 0, 400, 600);
      renderCardText(ctx, canvas, recipient, message, sender);
      triggerDownload(canvas);
    }
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyle, maxWidth: '860px', width: '95vw', display: 'flex', gap: '24px' }}>
        {/* Left: card preview */}
        <div style={{ flex: '0 0 380px' }}>
          <div style={{
            fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.35)', marginBottom: '10px',
          }}>
            Prévia do Cartão
          </div>
          <div style={{
            width: '100%', aspectRatio: '3/2',
            background: 'linear-gradient(135deg, #fdf6e3 0%, #f5ead0 60%, #ede0c0 100%)',
            borderRadius: '10px', overflow: 'hidden',
            border: '1px solid rgba(196,92,42,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
            position: 'relative', display: 'flex',
          }}>
            {imageUrl && (
              <img src={imageUrl} alt="" style={{
                width: '45%', height: '100%', objectFit: 'cover',
                borderRadius: '8px 0 0 8px',
              }} />
            )}
            <div style={{
              flex: 1, padding: '18px 16px', display: 'flex',
              flexDirection: 'column', justifyContent: 'center', gap: '10px',
            }}>
              {recipient && (
                <div style={{ fontSize: '13px', color: '#5a3e28', fontFamily: 'serif', fontStyle: 'italic' }}>
                  Para {recipient},
                </div>
              )}
              <div style={{
                fontSize: '11px', color: '#7a5c3a', lineHeight: '1.6',
                fontFamily: 'serif', flex: 1,
              }}>
                {message || <span style={{ opacity: 0.3 }}>sua mensagem aqui...</span>}
              </div>
              {sender && (
                <div style={{ fontSize: '11px', color: '#8a6c4a', fontFamily: 'serif', textAlign: 'right', fontStyle: 'italic' }}>
                  — {sender}
                </div>
              )}
              <div style={{
                fontSize: '9px', letterSpacing: '0.15em', color: '#c45c2a',
                textTransform: 'uppercase', marginTop: '4px',
              }}>
                FLOR.AI · Nativas Brasileiras
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f5f0e8', marginBottom: '2px' }}>Cartão Presente</div>
              <div style={{ fontSize: '11px', color: 'rgba(245,240,232,0.4)' }}>Personalize a mensagem</div>
            </div>
            <button onClick={onClose} style={iconBtnStyle}><IconClose /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <div>
              <label style={fieldLabelStyle}>Para</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="nome de quem vai receber"
                style={inputStyle}
              />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ ...fieldLabelStyle, marginBottom: 0 }}>Mensagem</label>
                <button
                  onClick={generateMessage}
                  disabled={isGenerating}
                  style={{
                    ...secondaryBtnStyle,
                    padding: '4px 10px',
                    fontSize: '11px',
                    opacity: isGenerating ? 0.6 : 1,
                  }}
                >
                  {isGenerating ? <><LoadingDots /> Gerando...</> : <><IconAI /> Gerar com IA</>}
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva uma mensagem ou deixe a IA criar..."
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', flex: 1, minHeight: '100px' }}
              />
              {msgError && <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{msgError}</div>}
            </div>

            <div>
              <label style={fieldLabelStyle}>De</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="seu nome"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={secondaryBtnStyle}>Cancelar</button>
            <button onClick={downloadCard} style={primaryBtnStyle}>
              <IconDownload /> Baixar Cartão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCardText(
  ctx: CanvasRenderingContext2D,
  _canvas: HTMLCanvasElement,
  recipient: string,
  message: string,
  sender: string
) {
  const x = 440;
  const maxW = 420;

  // Decorative line
  ctx.strokeStyle = '#c45c2a55';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, 80);
  ctx.lineTo(x + maxW, 80);
  ctx.stroke();

  ctx.fillStyle = '#5a3e28';
  if (recipient) {
    ctx.font = 'italic 22px Georgia, serif';
    ctx.fillText(`Para ${recipient},`, x, 130);
  }

  // Message body — word wrap
  ctx.font = '18px Georgia, serif';
  ctx.fillStyle = '#7a5c3a';
  const words = message.split(' ');
  let line = '';
  let y = recipient ? 180 : 150;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxW && line !== '') {
      ctx.fillText(line.trim(), x, y);
      line = word + ' ';
      y += 30;
    } else {
      line = test;
    }
  }
  if (line.trim()) ctx.fillText(line.trim(), x, y);

  if (sender) {
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillStyle = '#8a6c4a';
    ctx.textAlign = 'right';
    ctx.fillText(`— ${sender}`, x + maxW, 500);
    ctx.textAlign = 'left';
  }

  // Branding
  ctx.font = '11px "DM Sans", Arial, sans-serif';
  ctx.fillStyle = '#c45c2a';
  ctx.letterSpacing = '2px';
  ctx.fillText('FLOR.AI · NATIVAS BRASILEIRAS', x, 560);

  // Bottom decorative line
  ctx.strokeStyle = '#c45c2a55';
  ctx.beginPath();
  ctx.moveTo(x, 540);
  ctx.lineTo(x + maxW, 540);
  ctx.stroke();
}

function triggerDownload(canvas: HTMLCanvasElement) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'florai-cartao.png';
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

// ─── Loading helpers ─────────────────────────────────────────────────────��────

function LoadingSpinner() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 10) % 360), 40);
    return () => clearInterval(id);
  }, []);
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(74,122,74,0.2)" strokeWidth="3"/>
      <path d="M20 4 A16 16 0 0 1 36 20" fill="none" stroke="#4a7a4a" strokeWidth="3" strokeLinecap="round"
        transform={`rotate(${angle} 20 20)`}/>
    </svg>
  );
}

function LoadingDots() {
  return <span style={{ letterSpacing: '2px', fontSize: '14px' }}>···</span>;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FlorAI() {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedBioma, setSelectedBioma] = useState<string>('todos');
  const [selectedVaseId, setSelectedVaseId] = useState<string>('barro');
  const [hoveredPlant, setHoveredPlant] = useState<Plant | null>(null);
  const stageRef = useRef<any>(null);

  // Realistic image state
  const [showImageModal, setShowImageModal] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Card state
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);

  const CANVAS_W = 600;
  const CANVAS_H = 500;

  const selectedVase = VASES.find((v) => v.id === selectedVaseId) ?? VASES[0];
  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const selectedPlant = selectedItem ? PLANTS.find((p) => p.id === selectedItem.plantId) : null;
  const filteredPlants = selectedBioma === 'todos' ? PLANTS : PLANTS.filter((p) => p.bioma === selectedBioma);

  // Build a human-readable description of the current arrangement
  const arrangementDescription = useCallback(() => {
    if (items.length === 0) return 'plantas nativas brasileiras';
    const plantNames = [...new Set(items.map((i) => {
      const p = PLANTS.find((pl) => pl.id === i.plantId);
      return p?.name ?? '';
    }).filter(Boolean))];
    const vase = VASES.find((v) => v.id === selectedVaseId);
    const parts = plantNames.slice(0, 4).join(', ');
    return `${parts}${vase ? ` em ${vase.name.toLowerCase()}` : ''}`;
  }, [items, selectedVaseId]);

  // Build image generation prompt
  const buildImagePrompt = useCallback(() => {
    const desc = arrangementDescription();
    const vase = VASES.find((v) => v.id === selectedVaseId);
    return [
      'hyperrealistic studio photograph of a beautiful floral arrangement',
      `featuring Brazilian native plants: ${desc}`,
      vase ? `arranged in a ${vase.name}` : '',
      'professional flower photography, soft natural lighting, shallow depth of field',
      'elegant gift presentation, white marble surface, 8K, sharp focus',
      'botanical art, lush vibrant colors, photorealistic',
    ].filter(Boolean).join(', ');
  }, [arrangementDescription, selectedVaseId]);

  const generateRealisticImage = useCallback(async () => {
    setShowImageModal(true);
    setIsGeneratingImage(true);
    setGeneratedImageUrl(null);
    setImageError(null);

    const prompt = buildImagePrompt();
    const width = 1024;
    const height = 768;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&model=flux&seed=${Math.floor(Math.random() * 99999)}`;

    try {
      // Pollinations returns the image directly at the URL — we just set it as src
      // Preload to check it loads correctly
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Falha ao carregar imagem gerada.'));
        img.src = url;
        // Timeout after 40s
        setTimeout(() => reject(new Error('Tempo esgotado. Tente novamente.')), 40000);
      });
      setGeneratedImageUrl(url);
    } catch (err: any) {
      setImageError(err.message ?? 'Erro ao gerar imagem.');
    } finally {
      setIsGeneratingImage(false);
    }
  }, [buildImagePrompt]);

  const addPlant = useCallback((plant: Plant) => {
    const jitter = () => (Math.random() - 0.5) * 80;
    const newItem: CanvasItem = {
      id: `${plant.id}-${Date.now()}`,
      plantId: plant.id,
      x: CANVAS_W / 2 + jitter(),
      y: CANVAS_H * 0.45 + jitter(),
      scaleX: 1, scaleY: 1, rotation: 0, opacity: 1,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  }, []);

  const updateItem = useCallback((id: string, attrs: Partial<CanvasItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...attrs } : item)));
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const moveLayer = useCallback((dir: 'up' | 'down') => {
    if (!selectedId) return;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === selectedId);
      if (idx === -1) return prev;
      const next = [...prev];
      if (dir === 'up' && idx < next.length - 1) [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      else if (dir === 'down' && idx > 0) [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
      return next;
    });
  }, [selectedId]);

  const exportPng = useCallback(() => {
    if (!stageRef.current) return;
    const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });
    const a = document.createElement('a');
    a.download = 'florai-arranjo.png';
    a.href = dataUrl;
    a.click();
  }, []);

  const clearAll = useCallback(() => { setItems([]); setSelectedId(null); }, []);

  const handleStageClick = useCallback((e: any) => {
    if (e.target === e.target.getStage()) setSelectedId(null);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) deleteSelected();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedId, deleteSelected]);

  const biomaKeys = Object.keys(BIOMA_LABELS);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh', minHeight: '700px',
      background: '#060e06',
      backgroundImage: 'radial-gradient(ellipse at 60% 0%, rgba(45,106,79,0.18) 0%, transparent 60%), radial-gradient(ellipse at 10% 100%, rgba(196,92,42,0.08) 0%, transparent 50%)',
      color: '#f5f0e8',
      fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif", userSelect: 'none',
    }}>
      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '56px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(14,24,14,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 1px 0 rgba(74,122,74,0.2)',
        flexShrink: 0,
        position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '0.12em', color: '#c45c2a', fontFamily: 'serif' }}>
            FLOR.AI
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.08em' }}>
            Arranjos com Nativas Brasileiras
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={generateRealisticImage}
            disabled={items.length === 0}
            title={items.length === 0 ? 'Adicione plantas ao arranjo primeiro' : 'Gerar imagem fotorrealista'}
            style={{
              ...topBtnStyle('#a855f7', '#7c3aed'),
              opacity: items.length === 0 ? 0.4 : 1,
              cursor: items.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <IconSparkle /> Gerar Imagem Realista
          </button>
          <button
            onClick={() => { setCardImageUrl(null); setShowCardModal(true); }}
            style={topBtnStyle('#c45c2a', '#a03818')}
          >
            <IconCard /> Cartão Presente
          </button>
          <button onClick={exportPng} style={topBtnStyle('#4a7a4a', '#2D6A4F')}>
            <IconExport /> PNG
          </button>
          <button onClick={clearAll} style={topBtnStyle('#7a2a2a', '#5a1a1a')}>
            <IconClear />
          </button>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left sidebar */}
        <div style={{
          width: '280px', flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(12,22,12,0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: 'inset -1px 0 0 rgba(74,122,74,0.15)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Bioma filter */}
          <div style={{ padding: '14px 14px 0', borderBottom: '1px solid rgba(74,122,74,0.2)', flexShrink: 0 }}>
            <div style={microLabel}>Bioma</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingBottom: '12px' }}>
              {biomaKeys.map((b) => (
                <button key={b} onClick={() => setSelectedBioma(b)} style={{
                  padding: '4px 9px', borderRadius: '3px', border: '1px solid',
                  borderColor: selectedBioma === b ? '#c45c2a' : 'rgba(74,122,74,0.4)',
                  background: selectedBioma === b ? '#c45c2a22' : 'transparent',
                  color: selectedBioma === b ? '#c45c2a' : 'rgba(245,240,232,0.55)',
                  fontSize: '10px', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {BIOMA_LABELS[b] ?? b}
                </button>
              ))}
            </div>
          </div>

          {/* Plant grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(74,122,74,0.4) transparent' }}>
            <div style={microLabel}>Plantas ({filteredPlants.length})</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {filteredPlants.map((plant) => (
                <button key={plant.id} onClick={() => addPlant(plant)}
                  onMouseEnter={() => setHoveredPlant(plant)}
                  onMouseLeave={() => setHoveredPlant(null)}
                  title={plant.name}
                  style={{
                    background: 'rgba(20,36,20,0.6)', border: '1px solid rgba(74,122,74,0.25)',
                    borderRadius: '8px', padding: '8px 4px 6px',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '5px',
                    transition: 'all 0.18s ease', fontFamily: 'inherit',
                    backdropFilter: 'blur(4px)',
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(196,92,42,0.7)';
                    el.style.background = 'rgba(36,56,28,0.85)';
                    el.style.transform = 'scale(1.04) translateY(-1px)';
                    el.style.boxShadow = '0 6px 20px rgba(196,92,42,0.15)';
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(74,122,74,0.25)';
                    el.style.background = 'rgba(20,36,20,0.6)';
                    el.style.transform = 'scale(1) translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <img src={plant.svg} alt={plant.name} style={{ width: '52px', height: '52px', objectFit: 'contain', pointerEvents: 'none' }} />
                  <span style={{ fontSize: '8px', color: 'rgba(245,240,232,0.6)', textAlign: 'center', lineHeight: '1.2', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {plant.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Vase selector */}
          <div style={{ borderTop: '1px solid rgba(74,122,74,0.2)', padding: '12px', flexShrink: 0 }}>
            <div style={microLabel}>Vaso</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
              {VASES.map((v) => (
                <button key={v.id} onClick={() => setSelectedVaseId(v.id)} title={v.name} style={{
                  background: selectedVaseId === v.id ? '#2D6A4F33' : '#1e321e',
                  border: '1px solid', borderColor: selectedVaseId === v.id ? '#4a7a4a' : 'rgba(74,122,74,0.25)',
                  borderRadius: '5px', padding: '5px 2px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontFamily: 'inherit',
                }}>
                  <img src={v.svg} alt={v.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '7px', color: 'rgba(245,240,232,0.5)', textAlign: 'center' }}>
                    {v.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas area */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
          background: 'radial-gradient(ellipse at center, rgba(30,50,30,0.6) 0%, rgba(6,14,6,0.95) 100%)',
          overflow: 'hidden', position: 'relative',
        }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}>

          {/* Empty state hint */}
          {items.length === 0 && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px',
              pointerEvents: 'none', zIndex: 0,
            }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ opacity: 0.12 }}>
                <circle cx="28" cy="28" r="27" stroke="#4a7a4a" strokeWidth="1.5" strokeDasharray="4 3"/>
                <path d="M28 14c0 0-8 6-8 14s8 14 8 14" stroke="#c45c2a" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M28 14c0 0 8 6 8 14s-8 14-8 14" stroke="#4a7a4a" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="28" cy="28" r="3" fill="#c45c2a" opacity="0.6"/>
              </svg>
              <span style={{ fontSize: '12px', color: 'rgba(245,240,232,0.18)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                selecione uma planta ←
              </span>
            </div>
          )}

          <div style={{
            borderRadius: '10px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 1px rgba(74,122,74,0.2), 0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(45,106,79,0.1)',
            position: 'relative', zIndex: 1,
          }}>
            <Stage ref={stageRef} width={CANVAS_W} height={CANVAS_H}
              style={{ display: 'block', background: 'linear-gradient(160deg, #1c321c 0%, #152515 50%, #121e12 100%)' }}
              onClick={handleStageClick} onTap={handleStageClick}>
              <Layer listening={false}>
                <VaseNode vase={selectedVase} canvasW={CANVAS_W} canvasH={CANVAS_H} />
              </Layer>
              <Layer>
                {items.map((item) => {
                  const plant = PLANTS.find((p) => p.id === item.plantId);
                  if (!plant) return null;
                  return (
                    <PlantNode key={item.id} item={item} plant={plant}
                      isSelected={selectedId === item.id}
                      onSelect={setSelectedId} onChange={updateItem} />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          width: '220px', flexShrink: 0,
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(12,22,12,0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: 'inset 1px 0 0 rgba(74,122,74,0.15)',
          padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          {selectedItem && selectedPlant ? (
            <>
              <div>
                <div style={labelStyle}>Selecionado</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f5f0e8', marginBottom: '2px' }}>{selectedPlant.name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(245,240,232,0.4)', fontStyle: 'italic' }}>{selectedPlant.scientific}</div>
                <div style={{ display: 'inline-block', marginTop: '6px', padding: '2px 7px', borderRadius: '2px', background: 'rgba(74,122,74,0.2)', border: '1px solid rgba(74,122,74,0.3)', fontSize: '9px', color: '#4a7a4a', letterSpacing: '0.05em' }}>
                  {BIOMA_LABELS[selectedPlant.bioma] ?? selectedPlant.bioma}
                </div>
              </div>
              <div>
                <div style={labelStyle}>Escala</div>
                <input type="range" min="0.2" max="3" step="0.05" value={selectedItem.scaleX} style={rangeStyle}
                  onChange={(e) => { const s = parseFloat(e.target.value); updateItem(selectedItem.id, { scaleX: s, scaleY: s }); }} />
                <div style={valueStyle}>{(selectedItem.scaleX * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div style={labelStyle}>Rotação</div>
                <input type="range" min="-180" max="180" step="1" value={selectedItem.rotation} style={rangeStyle}
                  onChange={(e) => updateItem(selectedItem.id, { rotation: parseFloat(e.target.value) })} />
                <div style={valueStyle}>{selectedItem.rotation.toFixed(0)}°</div>
              </div>
              <div>
                <div style={labelStyle}>Opacidade</div>
                <input type="range" min="0.1" max="1" step="0.05" value={selectedItem.opacity} style={rangeStyle}
                  onChange={(e) => updateItem(selectedItem.id, { opacity: parseFloat(e.target.value) })} />
                <div style={valueStyle}>{(selectedItem.opacity * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div style={labelStyle}>Camada</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => moveLayer('up')} title="Trazer para frente" style={controlBtnStyle}><IconUp /> Frente</button>
                  <button onClick={() => moveLayer('down')} title="Enviar para trás" style={controlBtnStyle}><IconDown /> Trás</button>
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button onClick={deleteSelected} style={{ ...controlBtnStyle, width: '100%', justifyContent: 'center', borderColor: 'rgba(220,38,38,0.4)', color: '#ef4444', background: 'rgba(220,38,38,0.08)' }}>
                  <IconTrash /> Remover
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: 'rgba(245,240,232,0.25)', textAlign: 'center', padding: '20px' }}>
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" opacity="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"/>
              </svg>
              <div style={{ fontSize: '12px', lineHeight: '1.5' }}>Clique em uma planta para adicioná-la ao arranjo</div>
              <div style={{ fontSize: '10px', opacity: 0.6, lineHeight: '1.4' }}>Selecione um elemento no canvas para editar</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom info bar */}
      <div style={{
        height: '32px', borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(6,10,6,0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: '24px', flexShrink: 0,
      }}>
        {hoveredPlant ? (
          <>
            <span style={{ fontSize: '11px', color: '#c45c2a', fontWeight: 500 }}>{hoveredPlant.name}</span>
            <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.35)', fontStyle: 'italic' }}>{hoveredPlant.scientific}</span>
            <span style={{ fontSize: '10px', color: 'rgba(74,122,74,0.8)' }}>{BIOMA_LABELS[hoveredPlant.bioma]}</span>
          </>
        ) : (
          <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.2)' }}>
            {items.length} {items.length === 1 ? 'elemento' : 'elementos'} no arranjo
            {selectedId ? ' · Delete remove o selecionado' : ''}
            {items.length === 0 ? ' · Clique em uma planta à esquerda para começar' : ''}
          </span>
        )}
      </div>

      {/* ── Modals ── */}
      {showImageModal && (
        <ImageModal
          imageUrl={generatedImageUrl}
          isLoading={isGeneratingImage}
          error={imageError}
          onClose={() => setShowImageModal(false)}
          onOpenCard={(url) => {
            setCardImageUrl(url);
            setShowImageModal(false);
            setShowCardModal(true);
          }}
        />
      )}
      {showCardModal && (
        <CardModal
          imageUrl={cardImageUrl}
          arrangementDescription={arrangementDescription()}
          onClose={() => setShowCardModal(false)}
        />
      )}
    </div>
  );
}

// ─── Style constants ──────────────────────────────────────────────────────────

const microLabel: React.CSSProperties = {
  fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.4)',
  textTransform: 'uppercase', marginBottom: '8px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'rgba(245,240,232,0.35)', marginBottom: '6px',
};

const valueStyle: React.CSSProperties = {
  fontSize: '10px', color: 'rgba(245,240,232,0.5)', marginTop: '3px',
  fontVariantNumeric: 'tabular-nums',
};

const rangeStyle: React.CSSProperties = { width: '100%', accentColor: '#c45c2a', cursor: 'pointer' };

const controlBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 10px',
  border: '1px solid rgba(74,122,74,0.35)', borderRadius: '4px', background: 'transparent',
  color: 'rgba(245,240,232,0.65)', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit',
};

function topBtnStyle(border: string, bg: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
    border: `1px solid ${border}44`, borderRadius: '6px',
    background: `${bg}22`,
    backdropFilter: 'blur(8px)',
    color: 'rgba(245,240,232,0.85)', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all 0.18s ease',
    letterSpacing: '0.01em',
  };
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0,
  background: 'rgba(5,10,5,0.72)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000, padding: '20px',
};

const modalStyle: React.CSSProperties = {
  background: 'rgba(18,30,18,0.88)',
  backdropFilter: 'blur(40px)',
  WebkitBackdropFilter: 'blur(40px)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '16px', padding: '28px',
  boxShadow: '0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
  color: '#f5f0e8', fontFamily: "'DM Sans', system-ui, sans-serif",
  maxHeight: '90vh', overflowY: 'auto',
};

const iconBtnStyle: React.CSSProperties = {
  background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.5)',
  cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex',
};

const primaryBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px',
  background: 'linear-gradient(135deg, #c45c2a, #a03818)',
  border: '1px solid rgba(196,92,42,0.5)',
  boxShadow: '0 2px 12px rgba(196,92,42,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
  borderRadius: '7px',
  color: '#f5f0e8', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
  transition: 'all 0.18s ease', letterSpacing: '0.01em',
};

const secondaryBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px',
  color: 'rgba(245,240,232,0.7)', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  transition: 'all 0.18s ease',
};

const fieldLabelStyle: React.CSSProperties = {
  display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'rgba(245,240,232,0.4)', marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '7px', padding: '9px 12px', color: '#f5f0e8', fontSize: '13px',
  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};
