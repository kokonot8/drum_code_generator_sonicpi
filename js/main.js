const instruments = [
    { name: "Kick", sample: ":bd_haus", audio: "sounds/bd_haus.flac" },
    { name: "Snare", sample: ":sn_dolf", audio: "sounds/sn_dolf.flac" },
    { name: "Hi-Hat", sample: ":drum_cymbal_closed", audio: "sounds/drum_cymbal_closed.flac" },
    { name: "Clap", sample: ":perc_snap", audio: "sounds/perc_snap.flac" }
  ];

  const steps = 16;
  const gridState = Array(instruments.length).fill().map(() => Array(steps).fill(false));
  const gridContainer = document.getElementById('drumGrid');
  let isPlaying = false;
  let currentStep = 0;
  let intervalId;

  const audioBuffers = [];
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  let bpm = 120;

  const bpmRange = document.getElementById('bpmRange');
  const bpmValue = document.getElementById('bpmValue');

  const playButton = document.getElementById('playButton');

  bpmRange.addEventListener('input', () => {
  bpm = parseInt(bpmRange.value);
  bpmValue.textContent = bpm;
  if (isPlaying) {
    restartPlayback();
  }
  });

   /* 功能：切换播放状态和图标
  实现：
  如果当前未播放，则开始播放，设置定时器每隔一定时间调用 stepPlay。
  如果当前正在播放，则停止播放，清除定时器，重置当前步。
  */
  function togglePlayback() {
    if (!isPlaying) {
        audioContext.resume();
        intervalId = setInterval(stepPlay, getStepIntervalMs());
        isPlaying = true;
        playButton.innerHTML = '<i class="icon-pause"></i>';
    } else {
        clearInterval(intervalId);
        isPlaying = false;
        currentStep = 0;
        clearCurrentCells();
        playButton.innerHTML = '<i class="icon-play"></i>';
    }
    }

    /* 功能：清空网格
    实现：将网格所有状态值设置为 false，重新构建网格，清除当前步的高亮。
    如果当前正在播放，则停止播放，清除定时器，重置当前步。
    */
    function toggleClear() {
        gridState.forEach(row => row.fill(false));
        buildGrid();
        clearCurrentCells();
        if (isPlaying) {
            clearInterval(intervalId);
            isPlaying = false;
            currentStep = 0;
        }
    }


  function getStepIntervalMs() {
    return (60 / bpm) * 1000 / 4; // 1 step = 1/4 beat
  }

  function restartPlayback() {
    clearInterval(intervalId);
    intervalId = setInterval(stepPlay, getStepIntervalMs());
  }

  async function loadSamples() {
    for (const inst of instruments) {
      const response = await fetch(inst.audio);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(buffer);
    }
  }

  function playSound(index) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffers[index];
    source.connect(audioContext.destination);
    source.start();
  }

  /* 功能：构建网格：
  实现：遍历乐器列表，创建每个乐器的标签和对应的网格单元。每个单元格可以点击切换激活状态（高亮显示）。
  */
  function buildGrid() {
    gridContainer.innerHTML = '';
    const cellSize = 40, cellGap = 5;
    const labelWidth = 100;
    
    instruments.forEach((inst, row) => {
      const label = document.createElementNS('http://www.w3.org/2000/svg','text');
      label.setAttribute('x', 10);
      label.setAttribute('y', row * (cellSize + cellGap) + 30);
      label.textContent = inst.name;
      gridContainer.appendChild(label);

      for (let col = 0; col < steps; col++) {
        // 创建 SVG 矩形元素作为网格单元
        const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        cell.setAttribute('x', labelWidth + col * (cellSize + cellGap));
        cell.setAttribute('y', row * (cellSize + cellGap));
        cell.setAttribute('width', cellSize);
        cell.setAttribute('height', cellSize);
        cell.classList.add('cell');
        if (gridState[row][col]) {
          cell.classList.add('active');
        }
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.addEventListener('click', () => {
          const r = +cell.dataset.row;
          const c = +cell.dataset.col;
          gridState[r][c] = !gridState[r][c];
          cell.classList.toggle('active', gridState[r][c]);
        });

        gridContainer.appendChild(cell);
      }
    });
  }

  function updateCurrentStepUI() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('current');
      if (+cell.dataset.col === currentStep) {
        cell.classList.add('current');
      }
    });
  }

  function clearCurrentCells() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('current');
    });
  }

  /*
  功能：播放当前步的音频：
  实现：遍历每个乐器轨，如果当前拍被激活，则播放对应的音频。更新UI高亮。步进到下一排，循环到头又回到0。
  */
  function stepPlay() {
    for (let r = 0; r < instruments.length; r++) {
      if (gridState[r][currentStep]) {
        playSound(r);
      }
    }
    updateCurrentStepUI();
    currentStep = (currentStep + 1) % steps;
  }

 
  function generateCode() {
    let code = '';
    code += `use_bpm ${bpm}\n\n`;
    for (let r = 0; r < instruments.length; r++) {
        const name = instruments[r].name.toLowerCase().replace(/[^a-z0-9]/g, '_'); // loop 名
        const sample = instruments[r].sample;

        const pattern = gridState[r].map(val => val ? 1 : 0).join(', ');

        code += `live_loop :${name} do\n`;
        code += `  sample ${sample} if (ring ${pattern}).tick == 1\n`;
        code += `  sleep 0.25\n`;
        code += `end\n\n`;
    }

    document.getElementById('output-title').innerText = 'Generate SonicPi Code:';
    document.getElementById('output-code').textContent = code.trim();
    document.getElementById('output-area').style.display = 'block'; 
  }


  buildGrid();
  loadSamples();