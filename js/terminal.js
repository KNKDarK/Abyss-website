const toggle = document.querySelector('.terminal-toggle');
const overlay = document.querySelector('.terminal-overlay');
const body = document.querySelector('.terminal-body');
const closeBtn = document.querySelector('.terminal-close');

function rng(min, max) { return Math.random() * (max - min) + min; }
function rngInt(min, max) { return Math.floor(rng(min, max + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const COMMANDS = {
  help: {
    desc: 'Show available commands',
    handler: () => {
      const tips = [
        'Try "fortune" for abyss wisdom.',
        'Use "matrix" to toggle katakana rain.',
        '"neofetch" shows the system logo.',
        'Run "ritual" for a digital ceremony.',
        'Check "abyss" for depth readings.',
        'See "whoami" to learn your identity.',
      ];
      return [
        '',
        '╔══════════════════════════════════════╗',
        '║      TEAM ABYSS — COMMANDS          ║',
        '╠══════════════════════════════════════╣',
        '║  help      Show this help menu       ║',
        '║  whoami    Display current identity  ║',
        '║  team      List team members         ║',
        '║  projects  Show active projects      ║',
        '║  status    System status report      ║',
        '║  clear     Clear terminal            ║',
        '║  version   Display system version    ║',
        '║  matrix    Toggle matrix rain        ║',
        '║  whois     User information lookup   ║',
        '║  ping      Connection test           ║',
        '║  about     About this system         ║',
        '║  contact   Contact information       ║',
        '║  date      Current void timestamp    ║',
        '║  echo      Repeat your words         ║',
        '║  fortune   Abyss wisdom              ║',
        '║  sysinfo   Deep system information   ║',
        '║  abyss     Abyss depth reading       ║',
        '║  ritual    Perform a digital ritual  ║',
        '║  motd      Message of the day        ║',
        '║  neofetch  Display system logo       ║',
        '║  uptime    System uptime             ║',
        '╚══════════════════════════════════════╝',
        '',
        '  tip: ' + pick(tips),
        '',
      ];
    }
  },
  whoami: {
    desc: 'Display current identity',
    handler: () => {
      const statuses = ['connected', 'linked', 'bound', 'tethered', 'resonant'];
      const auras = ['arcane', 'void', 'abyssal', 'spectral', 'violet', 'shadow'];
      return [
        '',
        '  USERNAME  : visitor@team.abyss',
        '  GROUP     : ' + pick(['void-walkers', 'shadow-forge', 'abyss-kith', 'dark-weavers']),
        '  UID       : 0x' + rngInt(1000, 9999).toString(16),
        '  SHELL     : /bin/' + pick(['abyssal', 'voidsh', 'darkbash', 'shadow']),
        '  STATUS    : ' + pick(statuses),
        '  SESSION   : ' + Math.random().toString(16).slice(2, 10),
        '  ENTROPY   : ' + rng(50, 100).toFixed(1) + '%',
        '  AURA      : ' + pick(auras),
        '',
      ];
    }
  },
  team: {
    desc: 'List team members',
    handler: () => {
      const statusPool = ['active', 'active', 'active', 'idle', 'deep-focus', 'ritual'];
      const members = [
        ['LEAD', 'Archmage',      'Void Architect'],
        ['DEV',  'Shadow Weaver', 'Systems Engineer'],
        ['DEV',  'Void Seer',     'Frontend Alchemist'],
        ['DEV',  'Rune Carrier',  'Backend Forger'],
        ['DES',  'Phantom',       'Visual Designer'],
        ['OPS',  'Abyss Keeper',  'Infrastructure Mage'],
        ['OPS',  'Nyx',           'Security Warden'],
      ];
      const count = rngInt(4, 7);
      const active = members.slice(0, count).map(m =>
        '  [' + m[0] + ']  ' + m[1].padEnd(14) + m[2].padEnd(22) + pick(statusPool)
      );
      return [
        '',
        '  TEAM ROSTER — ' + new Date().toISOString().split('T')[0],
        '',
        ...active,
        '',
        '  Total: ' + count + ' entities :: All systems nominal',
        '',
      ];
    }
  },
  projects: {
    desc: 'Show active projects',
    handler: () => {
      const projs = [
        ['Project Chimera',    rngInt(2, 7), rngInt(6, 12), rngInt(20, 90)],
        ['Abyss Protocol',     rngInt(3, 8), rngInt(6, 14), rngInt(20, 90)],
        ['Void Engine',        rngInt(1, 5), rngInt(4, 10), rngInt(20, 90)],
        ['Shadow Network',     rngInt(4, 9), rngInt(8, 15), rngInt(20, 90)],
        ['Echo Framework',     rngInt(1, 4), rngInt(4, 8),  rngInt(10, 80)],
      ];
      const count = rngInt(3, 5);
      const bars = projs.slice(0, count).map((p, i) => {
        const filled = Math.floor(p[3] / 10);
        return '  [P' + (i + 1) + ']  ' + p[0].padEnd(20) + ' — Phase: ' + p[1] + '/' + p[2] + '    ' +
          '█'.repeat(filled) + '░'.repeat(10 - filled) + ' ' + p[3] + '%';
      });
      return [
        '',
        '  ACTIVE PROJECTS [Q' + Math.ceil(new Date().getMonth() / 3) + ']',
        '',
        ...bars,
        '',
        '  Next milestone: ' + pick(projs.slice(0, count))[0] + ' — ' + rngInt(5, 30) + ' cycles remaining',
        '',
      ];
    }
  },
  status: {
    desc: 'System status report',
    handler: () => {
      const signals = ['strong', 'stable', 'fading', 'pulsing', 'crystal'];
      const particles = ['OPERATIONAL', 'OPERATIONAL', 'OPERATIONAL', 'DEGRADED', 'BOOSTED'];
      return [
        '',
        '  ╔══════════════════════════════╗',
        '  ║     SYSTEM STATUS REPORT     ║',
        '  ╚══════════════════════════════╝',
        '',
        `  UPTIME    : ${rngInt(1, 720)}h ${rngInt(0, 59)}m`,
        '  NODES     : ' + rngInt(8, 16) + '/' + rngInt(10, 16) + ' online',
        '  PARTICLE  : ' + pick(particles),
        '  ABYSS     : ' + pick(['stable', 'calm', 'resonant', 'unstable']) + ' (flux: ' + rng(0.1, 0.8).toFixed(3) + 'T)',
        '  CONNECT   : ' + rngInt(300, 1500) + ' active links',
        '  MEMORY    : ' + rngInt(40, 90) + '% utilized',
        '  SIGNAL    : ' + pick(signals) + ' (' + rng(50, 100).toFixed(1) + ' dBm)',
        '',
      ];
    }
  },
  clear: {
    desc: 'Clear terminal',
    handler: () => {
      const lines = body.querySelectorAll('.terminal-line');
      lines.forEach(l => l.remove());
      const inputLine = body.querySelector('.terminal-input-line');
      const cursorBlink = body.querySelector('.cursor-blink');
      if (cursorBlink) cursorBlink.remove();
      if (inputLine) inputLine.remove();
      return ['[CLEAR] ' + pick(['Console cleared.', 'Void swept clean.', 'Shadows reset.', 'Buffer purged.', 'Abyss refreshed.'])];
    }
  },
  version: {
    desc: 'Display system version',
    handler: () => {
      const builds = ['0xDEAD_BEEF', '0xCAFE_FACE', '0xABYSS_01', '0xVOID_404', '0xDARK_WEB', '0xSHAD_OW'];
      const engines = ['WebGL + Three.js', 'Void Engine v3', 'Abyssal Core', 'Shadow Render'];
      const protos = ['Abyssal v3', 'VoidLink', 'Dark Protocol', 'ShadowStream'];
      return [
        '',
        '  Team Abyss Terminal v' + rngInt(1, 4) + '.' + rngInt(0, 9) + '.' + rngInt(0, 9),
        '  Build     : ' + pick(builds),
        '  Engine    : ' + pick(engines),
        '  Protocol  : ' + pick(protos),
        '  Kernel    : ' + navigator.platform,
        '  Compiled  : ' + new Date().toISOString().split('T')[0],
        '',
      ];
    }
  },
  matrix: {
    desc: 'Toggle matrix rain',
    handler: function() {
      if (this.isMatrixActive) {
        this.isMatrixActive = false;
        if (this.rainInterval) {
          clearInterval(this.rainInterval);
          this.rainInterval = null;
        }
        return ['', '  [MATRIX] Rain sequence terminated.', ''];
      }
      this.isMatrixActive = true;
      this.startMatrixRain();
      return ['', '  [MATRIX] Initiating rain sequence...', '  [MATRIX] The abyss weeps.', ''];
    }
  },
  whois: {
    desc: 'User information lookup',
    handler: () => {
      const origins = ['Unknown realm', 'Void gate 7', 'The between-space', 'Material plane', 'Ethereal drift'];
      const purposes = ['Abyss exploration', 'Soul indexing', 'Pattern recognition', 'Void cartography', 'Data exhumation'];
      const entities = ['Verified', 'Confirmed', 'Authenticated', 'Recognized'];
      return [
        '',
        '  Looking up visitor@team.abyss...',
        '  Origin     : ' + pick(origins),
        '  Purpose    : ' + pick(purposes),
        '  Clearance  : Level ' + pick(['Ω', 'Δ', 'Σ', 'Ψ', 'Λ', 'Φ']),
        '  Entity     : ' + pick(entities) + ' :: shadow-signature accepted',
        '  Aura       : ' + pick(['arcane', 'void', 'abyssal', 'spectral', 'violet', 'shadow', 'neon']),
        '  Last seen  : ' + rngInt(1, 60) + 'm ago',
        '',
      ];
    }
  },
  ping: {
    desc: 'Connection test',
    handler: () => [
      '',
      '  PING abyss.team (10.0.0.1) 64 bytes',
      '  64 bytes from abyss.team: icmp_seq=1 ttl=64 time=' + (Math.random() * 20 + 5).toFixed(1) + ' ms',
      '  64 bytes from abyss.team: icmp_seq=2 ttl=64 time=' + (Math.random() * 20 + 5).toFixed(1) + ' ms',
      '  64 bytes from abyss.team: icmp_seq=3 ttl=64 time=' + (Math.random() * 20 + 5).toFixed(1) + ' ms',
      '  64 bytes from abyss.team: icmp_seq=4 ttl=64 time=' + (Math.random() * 20 + 5).toFixed(1) + ' ms',
      '',
      '  --- abyss.team ping statistics ---',
      '  4 packets transmitted, 4 received, 0% packet loss',
      '  Connection: STABLE',
      '',
    ]
  },
  about: {
    desc: 'About this system',
    handler: () => {
      const quotes = [
        '"In the darkness, we code."',
        '"The void compiles in silence."',
        '"Every shadow holds a byte of truth."',
        '"We are the architects of the abyss."',
        '"Beyond the veil lies the source."',
      ];
      return [
        '',
        '  Team Abyss — The Abyssal Collective',
        '  Where code meets the void.',
        '  We forge digital experiences that',
        '  blur the line between reality and',
        '  the abyss beyond.',
        '',
        '  ' + pick(quotes),
        '',
      ];
    }
  },
  contact: {
    desc: 'Contact information',
    handler: () => {
      const statuses = ['online', 'active', 'monitored', 'vigilant', 'responsive'];
      return [
        '',
        '  CONTACT CHANNELS',
        '',
        '  Discord   : .gg/abyssal',
        '  GitHub    : /team-abyss',
        '  Email     : void@team.abyss',
        '  Signal    : encrypted channel ' + pick(statuses),
        '',
        '  Response time: ' + pick(['varies', 'instant', 'within the hour', 'next cycle', 'when the stars align']) + ' (void time)',
        '',
      ];
    }
  },
  date: {
    desc: 'Current void timestamp',
    handler: () => [
      '',
      '  VOID TIMESTAMP',
      '  Date    : ' + new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      '  Time    : ' + new Date().toLocaleTimeString(),
      '  Epoch   : ' + Date.now(),
      '  Zone    : ' + Intl.DateTimeFormat().resolvedOptions().timeZone,
      '  Cycle   : ' + Math.floor((Date.now() % 86400000) / 3600000) + 'h since epoch',
      '',
    ]
  },
  fortune: {
    desc: 'Abyss wisdom',
    handler: () => {
      const fortunes = [
        'The abyss gazes also into you — but here, we gaze back.',
        'Every particle in the void has a story. Listen.',
        'Code is the language of the abyss. Speak it well.',
        'In darkness, we find clarity. In silence, we find code.',
        'The void does not judge. It only observes and compiles.',
        'Your presence in the abyss has been noted. Carry on.',
        'Some doors are meant to be opened. Others are meant to be forked.',
        'The deepest shadows cast the brightest glows.',
        'A journey of a thousand lines begins with a single semicolon.',
        'The abyss remembers. The abyss compiles.',
      ];
      return ['', '  fortune: ' + fortunes[Math.floor(Math.random() * fortunes.length)], ''];
    }
  },
  sysinfo: {
    desc: 'Deep system information',
    handler: () => [
      '',
      '  ╔════════════════════════════════╗',
      '  ║       DEEP SYSTEM INFO        ║',
      '  ╚════════════════════════════════╝',
      '',
      '  PLATFORM  : ' + navigator.platform,
      '  CORES     : ' + (navigator.hardwareConcurrency || '?') + ' logical',
      '  MEMORY    : ' + (navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'classified'),
      '  WEBGL     : ' + (document.createElement('canvas').getContext('webgl2') ? 'v2' : 'v1'),
      '  RENDERER  : ' + (window.WebGLRenderingContext ? 'hardware' : 'unknown'),
      '  CONNECTION: ' + (navigator.connection ? navigator.connection.effectiveType : 'unknown'),
      '  LANGUAGE  : ' + navigator.language,
      '  COOKIES   : ' + (navigator.cookieEnabled ? 'enabled' : 'disabled'),
      '  DO NOT TRK: ' + (navigator.doNotTrack || 'unspecified'),
      '',
    ]
  },
  abyss: {
    desc: 'Abyss depth reading',
    handler: () => [
      '',
      '  ╔════════════════════════════════╗',
      '  ║       ABYSS DEPTH REPORT      ║',
      '  ╚════════════════════════════════╝',
      '',
      '  DEPTH     : ' + (Math.random() * 10000 + 1000).toFixed(0) + ' fathoms',
      '  PRESSURE  : ' + (Math.random() * 500 + 100).toFixed(1) + ' atmospheres',
      '  TEMP      : ' + (Math.random() * -5 - 273).toFixed(1) + '°C (absolute)',
      '  DARKNESS  : ' + (Math.random() * 100).toFixed(1) + '%',
      '  WHISPERS  : ' + (Math.random() > 0.3 ? 'detected' : 'silent'),
      '  ANOMALIES : ' + Math.floor(Math.random() * 3),
      '',
      '  Status: The abyss is ' + (Math.random() > 0.2 ? 'calm' : 'restless') + '.',
      '',
    ]
  },
  ritual: {
    desc: 'Perform a digital ritual',
    handler: () => {
      const rituals = [
        ['Summoning particle spirits...', 'Invoking the void...', '✦ The abyss acknowledges your presence ✦', 'Shadow signature sealed.'],
        ['Chanting hex incantations...', 'Weaving shadow threads...', '✦ A resonance echoes through the void ✦', 'Rune bound.'],
        ['Lighting abyssal candles...', 'Drawing pentagrams in code...', '✦ The darkness stirs ✦', 'Soul indexed.'],
        ['Reciting ancient syntax...', 'Compiling forbidden scripts...', '✦ The void answers ✦', 'Contract sealed in shadow.'],
        ['Opening a rift in spacetime...', 'Channeling dark energy...', '✦ Something ancient awakens ✦', 'Presence acknowledged.'],
      ];
      const r = pick(rituals);
      return [
        '',
        '  Initiating digital ritual...',
        '  ' + r[0],
        '  ' + r[1],
        '  ' + r[2],
        '  ' + r[3],
        '',
      ];
    }
  },
  motd: {
    desc: 'Message of the day',
    handler: () => {
      const flavors = [
        'The void is stable. The code flows.',
        'Darkness hums at the edge of perception.',
        'The abyss whispers in WebGL.',
        'Particles dance in silent resonance.',
        'Shadow networks pulse with data.',
      ];
      const motds = [
        '"Every master was once a beginner in the abyss."',
        '"The best code is written in twilight."',
        '"Let the shadows guide your logic."',
        '"In the void, all bugs are visible."',
        '"The abyss rewards the persistent."',
      ];
      return [
        '',
        '  ╔════════════════════════════════╗',
        '  ║        MESSAGE OF THE DAY      ║',
        '  ╚════════════════════════════════╝',
        '',
        '  Welcome to Team Abyss Terminal.',
        '  Today is ' + new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '.',
        '  ' + pick(flavors),
        '',
        '  ' + pick(motds),
        '',
        '  Current phase: ' + pick(['waxing', 'full', 'waning', 'new', 'crimson', 'eclipse']) + ' void',
        '  Abyss temp: ' + rng(-280, -250).toFixed(1) + '°C',
        '',
      ];
    }
  },
  neofetch: {
    desc: 'Display system logo',
    handler: () => [
      '',
      '                  ████████████',
      '                ██            ██',
      '               ██  ██████████  ██',
      '              ██  ██        ██  ██',
      '             ██  ██  ██████  ██  ██',
      '            ██  ██  ████████  ██  ██',
      '           ██  ██  ██████████  ██  ██',
      '            ██  ██  ████████  ██  ██',
      '             ██  ██  ██████  ██  ██',
      '              ██  ██        ██  ██',
      '               ██  ██████████  ██',
      '                ██            ██',
      '                  ████████████',
      '',
      '  visitor@team.abyss',
      '  -------------------',
      '  OS        : Abyssal Void',
      '  Host      : Team Abyss Collective',
      '  Kernel    : ' + navigator.platform,
      '  Uptime    : ' + Math.floor(Math.random() * 720 + 1) + 'h',
      '  Particles : ' + Math.floor(Math.random() * 6000 + 2000),
      '  Shell     : /bin/abyssal',
      '  Resolution: ' + window.innerWidth + 'x' + window.innerHeight,
      '  Theme     : blue-violet',
      '',
    ]
  },
  uptime: {
    desc: 'System uptime',
    handler: () => {
      const h = Math.floor(Math.random() * 720 + 1);
      const m = Math.floor(Math.random() * 60);
      const s = Math.floor(Math.random() * 60);
      return [
        '',
        '  SYSTEM UPTIME',
        '  ' + h + 'h ' + m + 'm ' + s + 's',
        '  First contact: ' + new Date(Date.now() - (h * 3600000 + m * 60000 + s * 1000)).toLocaleString(),
        '',
      ];
    }
  }
};

function addOutput(lines, className = 'output') {
  lines.forEach((text, idx) => {
    const div = document.createElement('div');
    div.className = `terminal-line ${className}`;
    div.textContent = text;
    div.style.animationDelay = `${idx * 0.02}s`;

    const inputLine = body.querySelector('.terminal-input-line');
    if (inputLine) {
      body.insertBefore(div, inputLine);
    } else {
      body.appendChild(div);
    }
  });
  body.scrollTop = body.scrollHeight;
}

function addTypewriterOutput(lines, className = 'output') {
  let charIndex = 0;
  let lineIndex = 0;
  let currentText = '';
  const fullText = lines.join('\n');

  function typeChar() {
    if (lineIndex >= lines.length) {
      body.scrollTop = body.scrollHeight;
      return;
    }

    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      currentText += currentLine[charIndex];
      const lastDiv = body.querySelector('.terminal-line:last-of-type');
      if (lastDiv && lastDiv.dataset.typing === 'true') {
        lastDiv.textContent = currentText;
      }
      charIndex++;
      body.scrollTop = body.scrollHeight;
      const speed = 5 + Math.random() * 15;
      setTimeout(typeChar, speed);
    } else {
      if (currentText) {
        const lastDiv = body.querySelector('.terminal-line:last-of-type');
        if (lastDiv && lastDiv.dataset.typing === 'true') {
          lastDiv.dataset.typing = 'false';
        }
      }
      charIndex = 0;
      currentText = '';
      lineIndex++;
      if (lineIndex < lines.length) {
        const div = document.createElement('div');
        div.className = `terminal-line ${className}`;
        div.dataset.typing = 'true';
        const inputLine = body.querySelector('.terminal-input-line');
        if (inputLine) {
          body.insertBefore(div, inputLine);
        } else {
          body.appendChild(div);
        }
        setTimeout(typeChar, 30);
      }
    }
  }

  if (lines.length > 0) {
    const div = document.createElement('div');
    div.className = `terminal-line ${className}`;
    div.dataset.typing = 'true';
    const inputLine = body.querySelector('.terminal-input-line');
    if (inputLine) {
      body.insertBefore(div, inputLine);
    } else {
      body.appendChild(div);
    }
    setTimeout(typeChar, 50);
  }
}

class Terminal {
  constructor() {
    this.isOpen = false;
    this.history = [];
    this.historyIndex = -1;
    this.promptText = 'abyss@team:~$';
    this.matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/|\\~';
    this.setupEventListeners();
    this.bootSequence();
    this.rainInterval = null;
    this.isMatrixActive = false;
  }

  setupEventListeners() {
    toggle.addEventListener('click', () => this.toggle());
    closeBtn.addEventListener('click', () => this.close());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  bootSequence() {
    const version = rngInt(1, 4) + '.' + rngInt(0, 9) + '.' + rngInt(0, 9);
    const pools = [
      ['Initializing abyssal protocol...', 'Loading void kernel...', 'Mounting shadow fs...'],
      ['Establishing void link...', 'Syncing with abyss...', 'Calibrating dark matter...'],
      ['Loading particle engine...', 'Spawning WebGL context...', 'Priming shader cache...'],
      ['Calibrating shadow signature...', 'Validating aura checksum...', 'Binding spectral nodes...'],
    ];
    const bootLines = [
      '[BOOT] Team Abyss Terminal v' + version,
      '[BOOT] ' + pick(pools[0]),
      '[BOOT] ' + pick(pools[1]),
      '[BOOT] ' + pick(pools[2]),
      '[BOOT] ' + pick(pools[3]),
      '[BOOT] All systems operational.',
      '[BOOT] Type "help" for available commands.',
      '',
    ];
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        const className = line.startsWith('[BOOT]') ? 'output' : '';
        addOutput([line], className);
      }, i * 100);
    });
  }

  startMatrixRain() {
    if (this.rainInterval) clearInterval(this.rainInterval);
    this.rainInterval = setInterval(() => {
      if (!this.isMatrixActive) return;
      const line = document.createElement('div');
      line.className = 'terminal-line output';
      line.style.opacity = (0.3 + Math.random() * 0.7).toString();
      let str = '';
      const len = 20 + Math.floor(Math.random() * 40);
      for (let i = 0; i < len; i++) {
        str += this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
      }
      const fadeLines = body.querySelectorAll('.terminal-line.output');
      if (fadeLines.length > 80) {
        const toRemove = Array.from(fadeLines).slice(0, fadeLines.length - 60);
        toRemove.forEach(el => {
          el.style.transition = 'opacity 0.5s';
          el.style.opacity = '0';
          setTimeout(() => el.remove(), 500);
        });
      }
      line.textContent = '  ' + str;
      const inputLine = body.querySelector('.terminal-input-line');
      if (inputLine) {
        body.insertBefore(line, inputLine);
      } else {
        body.appendChild(line);
      }
      body.scrollTop = body.scrollHeight;
    }, 50);
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    overlay.classList.add('active');

    if (!this.inputCreated) {
      setTimeout(() => {
        this.createInput();
        this.focusInput();
      }, 800);
    } else {
      this.focusInput();
    }
  }

  close() {
    this.isOpen = false;
    overlay.classList.remove('active');
  }

  createInput() {
    if (this.inputCreated) return;
    this.inputCreated = true;

    const line = document.createElement('div');
    line.className = 'terminal-line terminal-input-line';
    line.innerHTML = `<span class="prompt">${this.promptText}</span> `;

    const input = document.createElement('input');
    input.className = 'terminal-input';
    input.type = 'text';
    input.autofocus = true;
    input.setAttribute('aria-label', 'Terminal input');

    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    cursor.textContent = '▊';

    line.appendChild(input);
    line.appendChild(cursor);
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;

    input.addEventListener('keydown', (e) => this.handleInput(e, input));
    input.addEventListener('input', () => {
      body.scrollTop = body.scrollHeight;
    });
  }

  focusInput() {
    const input = body.querySelector('.terminal-input');
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }

  handleInput(e, input) {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      this.executeCommand(cmd);
      this.history.push(cmd);
      this.historyIndex = this.history.length;
      body.scrollTop = body.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.toLowerCase();
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        input.value = matches[0];
      } else if (matches.length > 1) {
        addOutput([`  ${matches.join('  ')}`], 'info');
      }
    }
  }

  executeCommand(cmd) {
    addOutput([`${this.promptText} ${cmd}`], '');

    if (!cmd) {
      this.createInput();
      return;
    }

    if (cmd === 'clear') {
      this.inputCreated = false;
      COMMANDS.clear.handler();
      setTimeout(() => this.createInput(), 50);
      return;
    }

    if (cmd === 'matrix') {
      const output = COMMANDS.matrix.handler.call(this);
      addOutput(output, 'output');
      this.createInput();
      return;
    }

    if (cmd.startsWith('echo')) {
      const args = cmd.slice(4).trim();
      addOutput(['', '  ' + (args || '... silence echoes in the abyss'), ''], 'output');
      this.createInput();
      return;
    }

    const command = COMMANDS[cmd];
    if (command) {
      const output = command.handler();
      addOutput(output, 'output');
    } else {
      addOutput([`  command not found: ${cmd}`, `  Type "help" for available commands.`], 'error');
    }

    this.createInput();
  }
}

let terminal;

document.addEventListener('DOMContentLoaded', () => {
  terminal = new Terminal();
});

export default Terminal;
