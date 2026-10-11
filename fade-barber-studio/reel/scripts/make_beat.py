"""Base dark phonk originale per il Reel (120 BPM, 30 s). Generata da zero: nessun campione esterno, nessun diritto da pagare.

Uso: python3 scripts/make_beat.py public/beat.wav
I cambi di scena del Reel cadono su battiti esatti (120 BPM = 1 battito ogni 0,5 s):
3 s problema, 8 s drop sul sito, 13,5 / 17 / 20,5 / 24 / 27,5 s soluzioni, 30 s invito finale.
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM
STEP = BEAT / 4  # sedicesimo
DUR = 35.0
N = int(SR * DUR)
rng = np.random.default_rng(7)


def env(n, attack=0.002, decay=0.2):
    t = np.arange(n) / SR
    a = np.clip(t / attack, 0, 1)
    return a * np.exp(-t / decay)


def fft_filter(x, lo=None, hi=None):
    """Filtro passa-banda morbido nel dominio della frequenza (adatto a suoni brevi)."""
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    g = np.ones_like(f)
    if lo:
        g *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi:
        g *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(spec * g, len(x))


def place(track, sound, t, gain=1.0):
    i = int(t * SR)
    if i >= len(track):
        return
    j = min(len(track), i + len(sound))
    track[i:j] += sound[: j - i] * gain


def kick():
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    freq = 45 + 110 * np.exp(-t / 0.035)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    s = np.sin(phase) * env(n, 0.001, 0.22)
    click = fft_filter(rng.standard_normal(n), lo=2000) * env(n, 0.0005, 0.004) * 0.4
    return np.tanh((s + click) * 3.2) * 0.9


def clap():
    n = int(0.35 * SR)
    noise = fft_filter(rng.standard_normal(n), lo=900, hi=7000)
    e = np.zeros(n)
    for k, off in enumerate([0, 0.011, 0.022]):
        e += env(n, 0.0005, 0.012) * np.roll(np.ones(n), int(off * SR)) * (0.7 if k < 2 else 1)
    e += np.roll(env(n, 0.001, 0.14), int(0.022 * SR)) * 0.8
    return np.tanh(noise * e * 2.5) * 0.55


def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR)
    s = fft_filter(rng.standard_normal(n), lo=7500)
    return s * env(n, 0.0005, 0.06 if open_ else 0.012) * 0.22


def cowbell(semi):
    n = int(0.32 * SR)
    t = np.arange(n) / SR
    r = 2 ** (semi / 12)
    s = np.sign(np.sin(2 * np.pi * 540 * r * t)) + np.sign(np.sin(2 * np.pi * 800 * r * t))
    s = fft_filter(s, lo=450 * r, hi=3200 * r) * env(n, 0.001, 0.09)
    return np.tanh(s * 1.8) * 0.28


def bass808(freq, length):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = freq * (1 + 0.6 * np.exp(-t / 0.02))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, length * 0.9)
    return np.tanh(s * 2.2) * 0.62


def impact():
    n = int(1.4 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / 0.08)) / SR) * env(n, 0.001, 0.45)
    hiss = fft_filter(rng.standard_normal(n), lo=200, hi=5000) * env(n, 0.001, 0.25) * 0.35
    return np.tanh((boom + hiss) * 2.5) * 0.75


def riser(length):
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    chunk = n // 24
    for k in range(24):  # filtro che si apre progressivamente
        seg = noise[k * chunk:(k + 1) * chunk]
        out[k * chunk:(k + 1) * chunk] = fft_filter(seg, lo=300 + 120 * k, hi=1500 + 450 * k)
    return out * t ** 2 * 0.45


def whoosh():
    n = int(0.5 * SR)
    t = np.linspace(0, 1, n)
    return fft_filter(rng.standard_normal(n), lo=500, hi=6000) * np.sin(np.pi * t) ** 2 * 0.35


L = np.zeros(N)
R = np.zeros(N)
drums = np.zeros(N)
music = np.zeros(N)
fx = np.zeros(N)

K, C = kick(), clap()
H, HO = hat(), hat(True)
D = 73.42  # Re
ROOTS = [D, D, D * 2 ** (-4 / 12), D * 2 ** (-5 / 12)]  # Re, Re, Si bemolle, La
RIFF = [0, None, 0, 3, None, 0, 5, None, 3, None, 0, None, -2, None, 0, 3]  # campanaccio in Re minore

bars = int(DUR / (BEAT * 4)) + 1
for bar in range(bars):
    t0 = bar * BEAT * 4
    root = ROOTS[bar % 4]
    full = 8.0 <= t0 < 33.0  # drop sul sito, pausa 22-24 s per l'invito, ripartenza
    half = 3.0 <= t0 < 8.0
    for s in range(16):
        t = t0 + s * STEP
        if t >= DUR:
            break
        # campanaccio: filtrato nell'intro, pieno dal drop
        note = RIFF[s]
        if note is not None and t < 34:
            place(music, cowbell(note + (12 if bar % 8 >= 6 else 0)), t, 0.55 if t < 3 else 1.0)
        if full or half:
            if s in (0, 6, 10) or (full and s == 14 and bar % 2):
                place(drums, K, t)
            if full and s in (4, 12):
                place(drums, C, t)
            if full:
                if bar % 4 == 3 and s >= 12:
                    for sub in range(2):
                        place(drums, H, t + sub * STEP / 2, 0.8)
                else:
                    place(drums, HO if s % 8 == 6 else H, t, 1.0 if s % 2 == 0 else 0.6)
        if s in (0, 6, 10) and t < 34:
            place(music, bass808(root * (2 if s == 10 and bar % 2 else 1), STEP * (6 if s == 0 else 4)), t, 0.9 if t >= 3 else 0.5)

for t, g in ((3.0, 0.55), (8.0, 0.9), (13.5, 0.45), (17.0, 0.45), (20.5, 0.45), (24.0, 0.45), (27.5, 0.45), (30.0, 0.85)):
    place(fx, impact(), t, g)
    place(fx, whoosh(), t - 0.45, 0.8)
place(fx, riser(2.0), 6.0, 1.0)
place(fx, riser(1.5), 28.5, 0.7)

mix = drums + music * 0.9 + fx
# volume finale: dissolvenza negli ultimi 2 secondi
fade = np.ones(N)
fade[-int(2 * SR):] = np.linspace(1, 0, int(2 * SR)) ** 1.5
mix = np.tanh(mix * 1.1) * fade
L = mix + np.roll(music, int(0.011 * SR)) * 0.12  # leggera apertura stereo sul campanaccio
R = mix - np.roll(music, int(0.011 * SR)) * 0.12
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = L / peak * 0.89, R / peak * 0.89
pcm = (np.stack([L, R], axis=1) * 32767).astype("<i2")

with wave.open(sys.argv[1] if len(sys.argv) > 1 else "beat.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
