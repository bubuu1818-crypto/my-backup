import { CardData, PlatformSpec } from '../types';

const TOKENS = `
  --color-primary:    #2D9B6E;
  --color-secondary:  #F0FAF5;
  --color-white:      #FFFFFF;
  --color-black-60:   rgba(0,0,0,0.6);
  --color-gray-900:   #1A1A1A;
  --color-gray-700:   #3D3D3D;
  --color-gray-400:   #9E9E9E;
  --font-primary:     'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
  --font-numeric:     'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
`;

function base(spec: PlatformSpec, bg = 'var(--color-white)'): string {
  const { top, bottom, horizontal } = spec.safeZone;
  return `
    * { margin:0; padding:0; box-sizing:border-box; }
    :root { ${TOKENS} }
    html, body { width:${spec.width}px; height:${spec.height}px; overflow:hidden; }
    body { background:${bg}; font-family:var(--font-primary); }
    .card {
      width:100%; height:100%; position:relative;
      padding:${top}px ${horizontal}px ${bottom}px;
      display:flex; flex-direction:column;
    }
    .progress {
      position:absolute; top:32px; right:${horizontal}px;
      font-size:13px; color:var(--color-gray-400);
      font-family:var(--font-numeric);
    }
    .label {
      font-size:12px; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:var(--color-primary);
      margin-bottom:16px;
    }
  `;
}

function html(style: string, body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>${style}</style></head><body>${body}</body></html>`;
}

function renderHook(card: CardData, spec: PlatformSpec): string {
  const { horizontal } = spec.safeZone;
  const imgStyle = card.imagePath
    ? `background-image:url('${card.imagePath}');background-size:cover;background-position:center;`
    : 'background:var(--color-gray-900);';

  return html(`
    ${base(spec)}
    body { ${imgStyle} }
    .overlay { position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,var(--color-black-60) 100%); }
    .card { justify-content:flex-end; z-index:1; }
    .progress { color:rgba(255,255,255,0.6); }
    .label { color:var(--color-primary); }
    h1 { font-size:${spec.height > 1080 ? 56 : 48}px; font-weight:800; line-height:1.2; color:var(--color-white); word-break:keep-all; }
    p.summary { margin-top:16px; font-size:20px; line-height:1.5; color:rgba(255,255,255,0.85); word-break:keep-all; }
  `, `
    <div class="overlay"></div>
    <div class="card">
      <span class="progress">${card.index} / ${card.total}</span>
      <p class="label">Card News</p>
      <h1>${card.title ?? card.content}</h1>
      <p class="summary">${card.content}</p>
    </div>
  `);
}

function renderContext(card: CardData, spec: PlatformSpec): string {
  return html(`
    ${base(spec, 'var(--color-white)')}
    .card { justify-content:center; gap:20px; }
    .divider { width:40px; height:4px; background:var(--color-primary); border-radius:2px; }
    p.body { font-size:22px; font-weight:400; line-height:1.75; color:var(--color-gray-900); word-break:keep-all; }
  `, `
    <div class="card">
      <span class="progress">${card.index} / ${card.total}</span>
      <div class="divider"></div>
      <p class="label">배경</p>
      <p class="body">${card.content.replace(/\n/g, '<br>')}</p>
    </div>
  `);
}

function renderCore(card: CardData, spec: PlatformSpec): string {
  return html(`
    ${base(spec, 'var(--color-primary)')}
    .card { justify-content:center; gap:20px; }
    .progress, .label { color:rgba(255,255,255,0.65); }
    .accent { width:40px; height:4px; background:rgba(255,255,255,0.4); border-radius:2px; }
    p.body { font-size:${spec.height > 1080 ? 28 : 24}px; font-weight:600; line-height:1.65; color:var(--color-white); word-break:keep-all; }
  `, `
    <div class="card">
      <span class="progress">${card.index} / ${card.total}</span>
      <div class="accent"></div>
      <p class="label">핵심</p>
      <p class="body">${card.content.replace(/\n/g, '<br>')}</p>
    </div>
  `);
}

function renderProof(card: CardData, spec: PlatformSpec): string {
  const stat = card.stat!;
  return html(`
    ${base(spec, 'var(--color-secondary)')}
    .card { justify-content:center; gap:12px; }
    .stat-value { font-size:${spec.height > 1080 ? 96 : 76}px; font-weight:800; line-height:1; color:var(--color-primary); font-family:var(--font-numeric); }
    .stat-label { font-size:24px; font-weight:600; color:var(--color-gray-900); }
    .stat-source { font-size:14px; color:var(--color-gray-400); margin-top:8px; }
  `, `
    <div class="card">
      <span class="progress">${card.index} / ${card.total}</span>
      <p class="label">데이터</p>
      <p class="stat-value">${stat.value}</p>
      <p class="stat-label">${stat.label}</p>
      ${stat.source ? `<p class="stat-source">출처: ${stat.source}</p>` : ''}
    </div>
  `);
}

function renderCta(card: CardData, spec: PlatformSpec): string {
  return html(`
    ${base(spec, 'var(--color-white)')}
    .card { justify-content:center; align-items:center; text-align:center; gap:32px; }
    p.message { font-size:28px; font-weight:700; color:var(--color-gray-900); word-break:keep-all; }
    .button { background:var(--color-primary); color:var(--color-white); font-size:22px; font-weight:700; padding:20px 48px; border-radius:14px; display:inline-block; }
    p.url { font-size:14px; color:var(--color-gray-400); }
  `, `
    <div class="card">
      <span class="progress">${card.index} / ${card.total}</span>
      <p class="message">${card.title}</p>
      <div class="button">${card.title}</div>
      ${card.content ? `<p class="url">${card.content}</p>` : ''}
    </div>
  `);
}

export function renderCard(card: CardData, spec: PlatformSpec): string {
  switch (card.position) {
    case 'hook':    return renderHook(card, spec);
    case 'context': return renderContext(card, spec);
    case 'core':    return renderCore(card, spec);
    case 'proof':   return renderProof(card, spec);
    case 'cta':     return renderCta(card, spec);
  }
}
