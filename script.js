const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

const state = {
  clips: [],
  processedBlob: null
};

const $ = (id) => document.getElementById(id);
const statusEl = $('status');

function setStatus(msg) {
  statusEl.textContent = msg;
}

function refreshClipUI() {
  const list = $('clipList');
  const select = $('trimClip');
  list.innerHTML = '';
  select.innerHTML = '';

  state.clips.forEach((clip, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${clip.file.name}`;
    list.appendChild(li);

    const option = document.createElement('option');
    option.value = String(idx);
    option.textContent = `${idx + 1}. ${clip.file.name}`;
    select.appendChild(option);
  });
}

$('videoInput').addEventListener('change', (e) => {
  state.clips = [...e.target.files].map((file) => ({ file }));
  refreshClipUI();
  setStatus(`${state.clips.length} clip(s) loaded.`);
});

async function ensureFFmpeg() {
  if (!ffmpeg.isLoaded()) {
    setStatus('Loading video engine...');
    await ffmpeg.load();
  }
}

$('trimBtn').addEventListener('click', async () => {
  if (!state.clips.length) return alert('Please add clips first.');
  const idx = Number($('trimClip').value || 0);
  const start = $('trimStart').value;
  const end = $('trimEnd').value;
  const clip = state.clips[idx];
  await ensureFFmpeg();

  setStatus('Trimming clip...');
  ffmpeg.FS('writeFile', 'trim-input.mp4', await fetchFile(clip.file));
  await ffmpeg.run('-i', 'trim-input.mp4', '-ss', String(start), '-to', String(end), '-c', 'copy', 'trim-output.mp4');
  const out = ffmpeg.FS('readFile', 'trim-output.mp4');
  clip.file = new File([out.buffer], `trimmed-${clip.file.name}`, { type: 'video/mp4' });
  setStatus('Clip trimmed.');
  refreshClipUI();
});

$('mergeBtn').addEventListener('click', async () => {
  if (state.clips.length < 2) return alert('Add at least 2 clips to merge.');
  await ensureFFmpeg();

  setStatus('Merging clips...');
  const entries = [];
  for (let i = 0; i < state.clips.length; i++) {
    const filename = `clip-${i}.mp4`;
    ffmpeg.FS('writeFile', filename, await fetchFile(state.clips[i].file));
    entries.push(`file '${filename}'`);
  }

  ffmpeg.FS('writeFile', 'list.txt', new TextEncoder().encode(entries.join('\n')));
  await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'list.txt', '-c', 'copy', 'merged.mp4');
  const out = ffmpeg.FS('readFile', 'merged.mp4');
  state.clips = [{ file: new File([out.buffer], 'merged.mp4', { type: 'video/mp4' }) }];
  refreshClipUI();
  setStatus('Merged into single clip.');
});

$('processBtn').addEventListener('click', async () => {
  if (!state.clips.length) return alert('Please add at least one clip.');
  await ensureFFmpeg();

  setStatus('Processing final video...');
  ffmpeg.FS('writeFile', 'source.mp4', await fetchFile(state.clips[0].file));

  const mute = $('muteVideo').checked;
  const speed = Number($('speed').value);
  const rotate = Number($('rotate').value);
  const music = $('musicInput').files[0];
  const musicVolume = Number($('musicVolume').value);

  const filters = [];
  if (speed !== 1) filters.push(`setpts=${(1 / speed).toFixed(4)}*PTS`);
  if (rotate === 1) filters.push('transpose=1');
  if (rotate === 2) filters.push('transpose=1,transpose=1');
  if (rotate === 3) filters.push('transpose=2');

  if (music) {
    ffmpeg.FS('writeFile', 'music.mp3', await fetchFile(music));
  }

  const args = ['-i', 'source.mp4'];
  if (music) args.push('-i', 'music.mp3');

  if (filters.length) args.push('-vf', filters.join(','));

  if (music) {
    args.push('-filter_complex', `[1:a]volume=${musicVolume}[bgm];[0:a][bgm]amix=inputs=2:duration=first`);
  }

  if (mute) args.push('-an');

  args.push('-preset', 'veryfast', '-movflags', '+faststart', 'final.mp4');

  await ffmpeg.run(...args);
  const out = ffmpeg.FS('readFile', 'final.mp4');
  state.processedBlob = new Blob([out.buffer], { type: 'video/mp4' });
  const url = URL.createObjectURL(state.processedBlob);

  $('preview').src = url;
  const dl = $('downloadLink');
  dl.href = url;
  dl.style.display = 'inline-block';
  setStatus('Done! Preview and download are ready.');
});
