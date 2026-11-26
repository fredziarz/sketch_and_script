const clamp = n => Math.min(100, Math.max(0, Math.round(n)));
const read = value => {
  if (typeof value === 'string') return { src: value, x: 50, y: 50 };
  const src = value && typeof value.src === 'string' ? value.src : '';
  const axis = v => (v == null || v === '' || !Number.isFinite(Number(v)) ? 50 : clamp(v));
  return { src, x: value ? axis(value.x) : 50, y: value ? axis(value.y) : 50 };
};
const save = (src, x, y) => (x === 50 && y === 50 ? src : { src, x, y });

const { useImperativeHandle } = CMS.React;

const FocusControl = ({ forID, field, value, onChange, getAsset, pickFile, ref }) => {
  useImperativeHandle(ref, () => ({
    isValid: value => (
      value == null || value === '' || typeof value === 'string'
      || (typeof value === 'object' && typeof value.src === 'string')
      || { error: { message: 'Wybierz zdjęcie' } }
    ),
  }), []);
  const current = read(value);
  const url = current.src ? (getAsset(current.src)?.url || current.src) : '';
  const move = (x, y) => onChange(save(current.src, clamp(x), clamp(y)));
  const pick = async () => {
    const picked = await pickFile({ kind: 'image' });
    if (picked) onChange(picked.value);
  };
  const click = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    move((event.clientX - rect.left) / rect.width * 100, (event.clientY - rect.top) / rect.height * 100);
  };
  const key = event => {
    const step = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[event.key];
    if (!step) return;
    event.preventDefault();
    move(current.x + step[0], current.y + step[1]);
  };

  return html`
    <div>
      <button type="button" id=${forID} onClick=${pick}>${current.src ? 'Zmień zdjęcie' : 'Wybierz zdjęcie'}</button>
      ${field.get('required') === false && current.src ? html`<button type="button" onClick=${() => onChange('')}>Usuń</button>` : ''}
      ${url ? html`
        <div tabindex="0" role="button" aria-label="Punkt kadrowania. Strzałki przesuwają go o 5 punktów." onClick=${click} onKeyDown=${key} style="position:relative;display:inline-block;margin-top:8px;cursor:crosshair;max-width:100%">
          <img src=${url} alt="" style="display:block;max-width:280px;max-height:320px" />
          <span style=${`position:absolute;left:${current.x}%;top:${current.y}%;width:12px;height:12px;border:2px solid #fff;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 0 1px #1a1916;pointer-events:none`}></span>
        </div>
      ` : ''}
    </div>
  `;
};

CMS.registerFieldType('focus', FocusControl);
