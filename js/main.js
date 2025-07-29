// 初始化乐器列表，包含类别和采样索引
let instruments = [
{ category: 0, sample: 0 }, // Kick
{ category: 1, sample: 0 }, // Snare
{ category: 2, sample: 0 }, // Hi-Hat
{ category: 3, sample: 0 }  // Clap
];


  const steps = 16;
  const gridState = instruments.map(() => Array(steps).fill(false));
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

// 用data-tooltip代替title属性，因为不想显示浏览器原生的title弹窗
playButton.setAttribute('data-tooltip', "Play or pause the drum sequence");
document.getElementById('addTrackButton').setAttribute('data-tooltip', "Add a new drum track");
document.querySelector('.btn-clear').setAttribute('data-tooltip', "Clear all clicked drum steps");
document.querySelector('.btn-code').setAttribute('data-tooltip', "Generate SonicPi code");
document.getElementById('presetSelect').setAttribute('data-tooltip', "Select drum style preset");
document.getElementById('resetBotton').setAttribute('data-tooltip', "Reset to selected preset");

  bpmRange.addEventListener('input', () => {
  bpm = parseInt(bpmRange.value);
  bpmValue.textContent = bpm;
  if (isPlaying) {
    restartPlayback();
  }
  });

  document.getElementById('presetSelect').onchange = resetTracks;

  // 页面加载时
window.addEventListener('DOMContentLoaded', () => {
  // 加载风格选项栏
  const presetSelect = document.getElementById('presetSelect');
    presetSelect.innerHTML = '';
    Object.keys(drumPresets).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        presetSelect.appendChild(option);
    });
    // 初始化为默认鼓点  
  resetTracks();

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
        // 不显示代码区域
        document.getElementById('output-area').style.display = 'none';
    }

/* 功能：添加新轨道
实现：向乐器列表添加一个新轨道，初始类别和样本为 0，重新构建网格以显示新轨道。
*/
function addTrack() {
    instruments.push({ category: 0, sample: 0 });
    gridState.push(Array(steps).fill(false));
    buildGrid();
}

function resetTracks() {
    const preset = drumPresets[document.getElementById('presetSelect').value];
    if (!preset) preset = drumPresets.classic; // 默认使用 classic 预设
    instruments = JSON.parse(JSON.stringify(preset.instruments)); // 深拷贝默认乐器列表
    gridState.length = 0; // 清空当前状态
    preset.grid.forEach(row => gridState.push([...row])); // 深拷贝默认网格状态
    bpm = preset.bpm || 120; // 使用预设的 BPM 或默认值
    bpmRange.value = bpm;
    bpmValue.textContent = bpm;
    buildGrid();
    clearCurrentCells();
    loadSamples();
    // 不显示代码区域
    document.getElementById('output-area').style.display = 'none';
}


  function getStepIntervalMs() {
    return (60 / bpm) * 1000 / 4; // 1 step = 1/4 beat
  }

  function restartPlayback() {
    clearInterval(intervalId);
    intervalId = setInterval(stepPlay, getStepIntervalMs());
  }

  async function loadSamples() {
    audioBuffers.length = 0; // 清空之前的音频缓冲区
    // 遍历乐器列表，加载每个乐器的音频文件
    for (const inst of instruments) {
      const response = await fetch(instrumentCategories[inst.category].samples[inst.sample].audio);
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
    const cellSize = 40, cellGap = 5;
    const labelWidth = 150;
    const deleteButtonWidth = 45;
    const dividerWidth = deleteButtonWidth + labelWidth + 10;
    const steps = 16;
    
    // 计算实际需要的总宽度
    const totalWidth = dividerWidth + steps * (cellSize + cellGap) - cellGap; // 减去最后一个gap
    const totalHeight = instruments.length * (cellSize + cellGap) - cellGap; // 减去最后一个gap

    // 1. 步数标签
    const stepLabels = document.getElementById('stepLabels');
    stepLabels.innerHTML = '';
    stepLabels.style.display = 'flex';
    stepLabels.style.gap = cellGap + 'px';
    stepLabels.style.alignItems = 'center';
    stepLabels.style.marginBottom = '10px'; // 添加间距避免重叠
    
    // spacer - 对应删除按钮和标签的宽度
    const spacer = document.createElement('span');
    spacer.style.display = 'inline-block';
    spacer.style.width = dividerWidth + 'px';
    stepLabels.appendChild(spacer);
    
    // 步数标签
    for (let col = 0; col < steps; col++) {
        const label = document.createElement('span');
        label.classList.add('grid-step-label');
        label.textContent = col + 1;
        label.style.width = cellSize + 'px';
        label.style.textAlign = 'center';
        stepLabels.appendChild(label);
    }

    // 2. drumGrid - 使用计算出的实际宽度和高度
    gridContainer.innerHTML = '';
    gridContainer.setAttribute('width', totalWidth);
    gridContainer.setAttribute('height', totalHeight);

    instruments.forEach((inst, row) => {
        // 删除按钮
        const foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreign.setAttribute('x', 0);
        foreign.setAttribute('y', row * (cellSize + cellGap));
        foreign.setAttribute('width', deleteButtonWidth);
        foreign.setAttribute('height', cellSize);

        if (instruments.length > 1) {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'track-delete-button';
            deleteButton.innerHTML = '✕';
            deleteButton.onclick = () => {
                instruments.splice(row, 1);
                gridState.splice(row, 1);
                buildGrid();
            };
            foreign.appendChild(deleteButton);
        }
        gridContainer.appendChild(foreign);

        // 乐器选择按钮
        const labelforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        labelforeign.setAttribute('x', deleteButtonWidth + 10);
        labelforeign.setAttribute('y', row * (cellSize + cellGap));
        labelforeign.setAttribute('width', labelWidth);
        labelforeign.setAttribute('height', cellSize);

        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.appendChild(createInstrumentSelect(row));
        labelforeign.appendChild(div);
        gridContainer.appendChild(labelforeign);

        // 网格 cell
        for (let col = 0; col < steps; col++) {
            const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            cell.setAttribute('x', dividerWidth + col * (cellSize + cellGap));
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
  //创建单列下拉选项框
// function createInstrumentSelect(trackIdx) {
//     // 创建下拉选择框
//     const select = document.createElement('select');
//     select.className = 'instrument-select';
//     select.dataset.track = trackIdx; // 记录当前轨道索引

//     //为选择框添加选项
//     instrumentCategories.forEach((type, typeIdx) => {
//         //先遍历每个乐器类别
//         //以乐器类别为分组，创建选项group
//         const group = document.createElement('optgroup');
//         group.label = type.name;
//         //再遍历每个类别下的样本
//         //为每个样本创建选项
//         type.samples.forEach((sample, sampleIdx) => {
//         const option = document.createElement('option');
//         option.value = `${typeIdx},${sampleIdx}`;
//         option.textContent = sample.label;
//         // 判断当前轨道是否选中这个采样
//         if (instruments[trackIdx].category === typeIdx && instruments[trackIdx].sample === sampleIdx) {
//             option.selected = true;
//         }
//         group.appendChild(option);
//         });
//         select.appendChild(group);
//     });

//     // 监听选择框的选项切换,当用户选择了新的采样，会更新当前轨道的乐器类型，并重建网格
//     select.onchange = function() {
//         const [typeIdx, sampleIdx] = this.value.split(',').map(Number);
//         instruments[trackIdx].category = typeIdx;
//         instruments[trackIdx].sample = sampleIdx;
//         buildGrid();
//     };
//     return select;
// }

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

/* 功能：创建乐器自定义选项栏
    实现：为每个轨道创建一个按钮，点击后弹出乐器选择器。
*/
function createInstrumentSelect(trackIndex) {
    // 创建按钮
    const button = document.createElement('button');
    button.className = 'instrument-btn';
    // button.title = 'Select instrument for this track';
    // 显示当前轨道的乐器
    const instrument = instruments[trackIndex];
    const category = instrumentCategories[instrument.category];
    const sample = category.samples[instrument.sample];
    button.textContent = sample.label;
    // 监听按钮点击事件
    button.onclick = function () {
        showInstrumentPicker(trackIndex, button);
    };
    return button;
}

function showInstrumentPicker(trackIndex, anchorButton) {
    // 移除已存在的选择器（页面上每时只允许有一个选择器）
    let oldPicker = document.getElementById('instrument-picker');
    if (oldPicker) oldPicker.remove();
    // 当前选中的类别和采样
    let selectedCategory = instruments[trackIndex].category;
    let selectedSample = instruments[trackIndex].sample;
    // 创建选择器容器
    const picker = document.createElement('div');
    picker.id = 'instrument-picker';
    picker.className = 'instrument-picker';
    // 创建完成按钮
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done-btn';
    // 监听完成按钮点击事件，应用选项并退出选择器（即清除整个选择器容器）
    doneButton.onclick = () => {
        instruments[trackIndex].category = selectedCategory;
        instruments[trackIndex].sample = selectedSample;
        buildGrid();
        loadSamples(); //别忘了更改乐器后要重新加载音频
        picker.remove();
    };
    picker.appendChild(doneButton);

    // 将选择栏定位到轨道按钮下方
    const rect = anchorButton.getBoundingClientRect();
    picker.style.left = rect.left + 'px';
    picker.style.top = (rect.bottom + window.scrollY) + 'px';

    // 平铺展示所有类别和采样
    instrumentCategories.forEach((category, categoryIndex) => {
        // 创建类别区
        const categoryTitle = document.createElement('div');
        categoryTitle.textContent = category.name;
        categoryTitle.className = 'instrument-picker-category';
        picker.appendChild(categoryTitle);
        // 创建采样选择区
        const sampleWrap = document.createElement('div');
        sampleWrap.className = 'instrument-picker-sample-wrap';
        // 遍历每个采样，创建按钮
        category.samples.forEach((sample, sampleIndex) => {
            const sampleButton = document.createElement('button');
            sampleButton.textContent = sample.label;
            sampleButton.className = 'instrument-picker-sample-btn';
            // 显示预先选中状态
            if (categoryIndex === selectedCategory && sampleIndex === selectedSample) {
                sampleButton.classList.add('selected');
            }
            // 监听按钮点击事件，播放采样，并显示更新的选中状态
            sampleButton.onclick = () => {
                // 播放选中采样
                playInstrumentSample(categoryIndex, sampleIndex);
                selectedCategory = categoryIndex;
                selectedSample = sampleIndex;
                // 清除之前的选中状态，设置当前按钮为选中
                picker.querySelectorAll('.instrument-picker-sample-btn').forEach(btn => btn.classList.remove('selected'));
                sampleButton.classList.add('selected');
            };
            sampleWrap.appendChild(sampleButton);
        });
        picker.appendChild(sampleWrap);
    });

    // 点击外部关闭
    setTimeout(() => {
        document.addEventListener('mousedown', function handler(event) {
            if (!picker.contains(event.target)) {
                picker.remove();
                document.removeEventListener('mousedown', handler);
            }
        });
    }, 10);

    document.body.appendChild(picker);
}

/* 功能：播放乐器采样
    实现：根据类别和采样索引创建音频对象，播放对应的音频文件。
*/
function playInstrumentSample(categoryIndex, sampleIndex) {
    const audio = new Audio(instrumentCategories[categoryIndex].samples[sampleIndex].audio);
    audio.currentTime = 0;
    audio.play();
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
        const categoryIdx = instruments[r].category;
        const sampleIdx = instruments[r].sample;
        const sample = instrumentCategories[categoryIdx].samples[sampleIdx].sample;
        const name = instrumentCategories[categoryIdx].samples[sampleIdx].label.replace(/\s+/g, '_').toLowerCase();

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

