/* Pixel Tanks - constantes compartilhadas */
(function (PT) {
  'use strict';

  PT.C = {
    // resolucao virtual (pixel art 1:1, escalado por CSS)
    W: 320, H: 224,

    // arena
    TILE: 16, COLS: 20, ROWS: 12,
    FIELD_X: 0, FIELD_Y: 24,
    FIELD_W: 320, FIELD_H: 192,   // 20*16 x 12*16
    HUD_TOP_H: 24,
    HUD_BOTTOM_Y: 216,

    // tanques
    TANK: 14,
    TANK_SPEED: 0.86,
    BULLET_SPEED: 3.1,
    BULLET_SIZE: 3,
    FIRE_COOLDOWN: 12,        // frames entre tiros
    SPAWN_ANIM: 72,           // frames da animacao de nascer (~1.2s)
    RESPAWN_DELAY: 90,

    // partida
    ROUND_WINS: 3,            // melhor de 5
    ROUND_CRUMBLE: 60 * 60,   // 60s: as paredes de tijolo desmoronam
    ROUND_DRAW: 75 * 60,      // 75s: empate

    // sobrevivencia
    LIVES: 3,
    PU_LIFE: 18 * 60,         // duracao dos itens (frames)
    PU_INTERVAL: 13 * 60,

    COLORS: {
      page: '#070a0e',
      floorA: '#151b24',
      floorB: '#19202b',
      floorDot: '#1f2937',

      brickL: '#d95f31',
      brickM: '#a63b1f',
      brickD: '#5e1f0e',
      brickShade: '#2a1207',

      steelL: '#cdd7e4',
      steelM: '#7f8a9c',
      steelD: '#3d4655',
      steelShade: '#232a35',

      white: '#f4f8ff',
      offwhite: '#cfe3f5',
      dim: '#6b8299',
      yellow: '#ffd24a',
      orange: '#ff8a3d',
      red: '#ff4646',

      hudBg: '#0d1219',
      hudLine: '#26374b',
      panel: '#0b1017',
      panelLine: '#2c4054'
    },

    // paletas de tanque
    SIDES: {
      p1: { name: 'VERDE', L: '#9df38f', M: '#3fc04a', D: '#11301a', accent: '#8ef28a' },
      p2: { name: 'AZUL', L: '#a9d9ff', M: '#3f7fdf', D: '#111d38', accent: '#8fc6ff' },
      cpu: { name: 'VERMELHO', L: '#ffb08c', M: '#e04a2f', D: '#361210', accent: '#ff9b7a' },
      grunt: { name: 'GRUNHIDO', L: '#e6d38a', M: '#b78a2c', D: '#2e2410', accent: '#e6d38a' },
      rusher: { name: 'VELOZ', L: '#ffe6a8', M: '#f08a20', D: '#331f06', accent: '#ffcf6b' },
      sniper: { name: 'ATIRADOR', L: '#dcb4ff', M: '#8f4fd8', D: '#241040', accent: '#d2a4ff' }
    }
  };
})(window.PT = window.PT || {});
