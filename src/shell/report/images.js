// ============================================================
//  IMAGES — shrinks a screenshot in the browser before upload,
//  and keeps downloaded screenshots in memory for this visit.
//  Code.gs accepts up to 1.5 MB per image; we aim well below.
// ============================================================

import { getReportImage } from './reportApi.js';

const MAX_SIDE = 1600;
const TARGET_BYTES = 900000;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('This file is not an image we can read.')); };
    img.src = url;
  });
}

// File -> JPEG data URL, at most MAX_SIDE pixels on the long side.
export async function shrinkImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file (a screenshot).');
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let quality = 0.86;
  let dataUrl = canvas.toDataURL('image/jpeg', quality);
  while (dataUrl.length * 0.75 > TARGET_BYTES && quality > 0.45) {
    quality -= 0.1;
    dataUrl = canvas.toDataURL('image/jpeg', quality);
  }
  return { dataUrl, width: canvas.width, height: canvas.height };
}

const cache = new Map();

export function rememberImage(fileId, dataUrl) { cache.set(fileId, Promise.resolve(dataUrl)); }

// fileId -> data URL (fetched from the student's Drive folder once per visit).
export function imageData(token, fileId) {
  if (!cache.has(fileId)) {
    cache.set(fileId, getReportImage(token, fileId).then(r => {
      if (!r.success) { cache.delete(fileId); throw new Error(r.message || 'Could not load this screenshot.'); }
      return r.dataUrl;
    }));
  }
  return cache.get(fileId);
}
