const clamp = n => Math.min(100, Math.max(0, Math.round(Number(n))));
const read = value => (value == null || value === '' || !Number.isFinite(Number(value)) ? 40 : clamp(value));

const GradeControl = ({ forID, value, onChange }) => {
  const n = read(value);
  return html`
    <div>
      <input id=${forID} type="range" min="0" max="100" step="1" value=${n} onInput=${e => onChange(clamp(e.target.value))} style="width:100%;max-width:280px;vertical-align:middle" />
      <span>${n}%</span>
    </div>
  `;
};

CMS.registerFieldType('grade', GradeControl);
