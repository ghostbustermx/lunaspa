export default function LeafShadows() {
  return (
    <div className="leaf-shadows" aria-hidden="true">
      <svg className="leaf-shadows-svg leaf-shadows-svg--desktop" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <path id="lf" d="M0 0 C 10 -18 34 -14 32 6 C 30 22 10 20 0 8 Z" />
          <g id="frond">
            <path
              d="M0 0 Q 170 50 340 -90"
              fill="none"
              stroke="#1e331a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <use href="#lf" transform="translate(40 10) rotate(-30) scale(0.8)" />
            <use href="#lf" transform="translate(90 20) rotate(-8) scale(1.1)" />
            <use href="#lf" transform="translate(140 24) rotate(10) scale(1.2)" />
            <use href="#lf" transform="translate(185 22) rotate(-12) scale(1.15)" />
            <use href="#lf" transform="translate(228 15) rotate(8) scale(1.05)" />
            <use href="#lf" transform="translate(265 4) rotate(-18) scale(0.95)" />
            <use href="#lf" transform="translate(298 -12) rotate(0) scale(0.8)" />
            <use href="#lf" transform="translate(320 -34) rotate(-22) scale(0.65)" />
          </g>
        </defs>
        <g transform="translate(30 640) scale(1.35) rotate(10)">
          <g className="sway-a"><use href="#frond" /></g>
        </g>
        <g transform="translate(1400 150) scale(1.45) rotate(150)">
          <g className="sway-c"><use href="#frond" /></g>
        </g>
        <g transform="translate(60 120) scale(1.15) rotate(-32)">
          <g className="sway-b"><use href="#frond" /></g>
        </g>
        <g transform="translate(1390 760) scale(1.25) rotate(158)">
          <g className="sway-b"><use href="#frond" /></g>
        </g>
        <g transform="translate(720 40) scale(0.9) rotate(-42)">
          <g className="sway-a"><use href="#frond" /></g>
        </g>
        <g transform="translate(1180 430) scale(1.05) rotate(120)">
          <g className="sway-c"><use href="#frond" /></g>
        </g>
      </svg>

      <svg className="leaf-shadows-svg leaf-shadows-svg--mobile" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(8 60) scale(0.6) rotate(16)">
          <g className="sway-c"><use href="#frond" /></g>
        </g>
        <g transform="translate(185 30) scale(0.4) rotate(-20)">
          <g className="sway-a"><use href="#frond" /></g>
        </g>
        <g transform="translate(330 300) scale(0.5) rotate(120)">
          <g className="sway-b"><use href="#frond" /></g>
        </g>
        <g transform="translate(16 700) scale(0.6) rotate(-42)">
          <g className="sway-a"><use href="#frond" /></g>
        </g>
        <g transform="translate(300 740) scale(0.55) rotate(140)">
          <g className="sway-c"><use href="#frond" /></g>
        </g>
      </svg>
    </div>
  );
}