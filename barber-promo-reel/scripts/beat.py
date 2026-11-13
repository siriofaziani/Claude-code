"""Base musicale originale del reel (140 BPM, 21 s), sincronizzata con la timeline di BarberPromoReel.jsx.

Uso: python3 scripts/beat.py  ->  public/beat.wav  (44.1 kHz, stereo, 16 bit). Solo numpy, nessun campione esterno.

Struttura (B = un battito = 60/140 s):
  0B-9B   problema: drone scuro, tic dell'orologio, colpo profondo a ogni frase (0B, 3B, 6B), salita verso il drop
  9B      drop: impatto + piatto, parte il groove (cassa, clap, charleston, 808, accordi)
  17B, 25B, 33B  cambio scena: soffio + piatto
  41B     chiusura: impatto, il groove si ferma, resta un accordo che sfuma fino a 49B (21 s)
"""

import os
import wave

import numpy as np

SR = 44100
BPM = 140
B = 60 / BPM
DUR = 49 * B  # 21.0 s
N = int(DUR * SR) + 1
rng = np.random.default_rng(7)

L = np.zeros(N)
R = np.zeros(N)


def at(sec):
    return int(round(sec * SR))


def add(sig, start, gain=1.0, pan=0.0):
    i = at(start)
    if i >= N:
        return
    s = sig[: N - i] * gain
    L[i : i + len(s)] += s * np.sqrt(0.5 * (1 - pan))
    R[i : i + len(s)] += s * np.sqrt(0.5 * (1 + pan))


def env(n, a=0.002, d=0.2, curve=1.0):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d) ** curve
    return e


def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for k in range(len(x)):
        acc = (1 - a) * x[k] + a * acc
        y[k] = acc
    return y


def hp(x, fc):
    return x - onepole_lp(x, fc)


def kick(dur=0.45, f0=150, f1=42, punch=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t / 0.22)
    click = rng.standard_normal(n) * np.exp(-t / 0.004) * 0.35 * punch
    return np.tanh((body + click) * 1.6) * 0.9


def clap(dur=0.35):
    n = int(dur * SR)
    t = np.arange(n) / SR
    nz = hp(rng.standard_normal(n), 900)
    e = np.zeros(n)
    for o in (0, 0.011, 0.022):
        e += np.where(t >= o, np.exp(-(t - o) / 0.009), 0) * 0.6
    e += np.where(t >= 0.03, np.exp(-(t - 0.03) / 0.12), 0)
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05) * 0.4
    return (nz * e + tone) * 0.5


def hat(dur=0.06, open_=False):
    n = int((0.32 if open_ else dur) * SR)
    t = np.arange(n) / SR
    nz = hp(hp(rng.standard_normal(n), 6000), 6000)
    return nz * np.exp(-t / (0.11 if open_ else 0.018)) * 0.32


def tick():
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 2600 * t) + 0.5 * np.sin(2 * np.pi * 5200 * t)) * np.exp(-t / 0.006) * 0.25


def boom(dur=2.4, f0=80, f1=32):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t / 0.18)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.75)
    nz = onepole_lp(rng.standard_normal(n), 900) * np.exp(-t / 0.25) * 0.8
    return np.tanh((s + nz) * 1.4) * 0.85


def crash(dur=2.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    nz = hp(rng.standard_normal(n), 3500)
    return nz * np.exp(-t / 0.7) * 0.22


def whoosh(dur=0.55, up=True):
    n = int(dur * SR)
    t = np.arange(n) / SR
    nz = rng.standard_normal(n)
    # passa-banda che sale: due passaggi con frequenza crescente (approssimazione a blocchi)
    out = np.zeros(n)
    blocks = 24
    for b in range(blocks):
        s, e = b * n // blocks, (b + 1) * n // blocks
        k = b / (blocks - 1)
        fc = 300 + (5000 if up else 2000) * (k if up else 1 - k)
        seg = nz[max(0, s - 400) : e]
        y = hp(onepole_lp(seg, fc * 1.6), fc * 0.5)
        out[s:e] = y[-(e - s) :]
    shape = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.5
    return out * shape * 0.55


def riser(dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    k = t / dur
    f = 180 * (2 ** (k * 3))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.18
    nz = hp(rng.standard_normal(n), 2000) * 0.22
    return (tone + nz) * k**2


def note_hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def bass808(midi, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = note_hz(midi) * (1 + 0.6 * np.exp(-t / 0.02))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR)
    e = np.minimum(1, t / 0.004) * np.minimum(1, (dur - t) / 0.03).clip(0) * np.exp(-t / 1.4)
    return np.tanh(s * 1.8) * e * 0.55


def pad(midis, dur, bright=1200):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for m in midis:
        for det in (-0.12, 0.0, 0.11):
            f = note_hz(m + det)
            ph = rng.uniform(0, 2 * np.pi)
            s += 2 * ((f * t + ph / (2 * np.pi)) % 1) - 1  # dente di sega
    s = onepole_lp(onepole_lp(s, bright), bright)
    e = np.minimum(1, t / 0.35) * np.minimum(1, (dur - t) / 0.6).clip(0)
    return s * e * 0.05


# 1) PROBLEMA ------------------------------------------------------------------
drone = pad([33, 40, 45], 9 * B + 0.4, bright=380) * 2.2
add(drone, 0, 1.0)
for k in range(9):
    add(tick(), k * B, 0.9 if k % 3 else 1.2, pan=0.35 if k % 2 else -0.35)
for k in (0, 3, 6):
    add(boom(1.6, 70, 34), k * B, 0.9)
    add(kick(0.5, 120, 40), k * B, 0.6)
add(riser(2 * B), 7 * B, 1.0)
for k in range(12):  # rullata che accelera
    tt = 7 * B + (2 * B - 0.12) * (1 - (1 - k / 12) ** 1.6)
    add(clap(0.12), tt, 0.25 + 0.5 * k / 12)

# 2) DROP + GROOVE --------------------------------------------------------------
D = 9 * B
add(boom(2.6, 90, 30), D, 1.1)
add(crash(3.0), D, 1.0, pan=-0.2)
add(crash(3.0), D + 0.01, 0.9, pan=0.2)
END_GROOVE = 41 * B
prog = [45, 41, 36 + 12, 43]  # La, Fa, Do, Sol (808 un'ottava sotto)
chords = [[57, 60, 64], [53, 57, 60], [55, 60, 64], [55, 59, 62]]
for bar in range(8):
    t0 = D + bar * 4 * B
    # cassa: 1, (2 e), 3 e mezzo (stile trap a metà tempo)
    for o in (0, 1.5, 2.75) if bar % 2 == 0 else (0, 1.5, 2.5, 3.25):
        if t0 + o * B < END_GROOVE:
            add(kick(), t0 + o * B, 0.95)
    add(clap(), t0 + 2 * B, 0.85)
    # charleston in ottavi con rullate in sedicesimi
    for s in range(16):
        tt = t0 + s * B / 4
        if s % 2 == 0 or (bar % 2 == 1 and s >= 12):
            add(hat(), tt, 0.7 if s % 4 == 0 else 0.5, pan=0.25)
    if bar % 4 == 3:
        add(hat(open_=True), t0 + 3.5 * B, 0.6, pan=-0.3)
    note = prog[(bar // 2) % 4] - 12
    add(bass808(note, 4 * B * 0.98), t0, 1.0)
    add(pad(chords[(bar // 2) % 4], 4 * B + 0.3), t0, 1.0)

# cambi scena: soffio prima, piatto sul taglio
for k in (17, 25, 33):
    add(whoosh(0.5), k * B - 0.42, 0.9)
    add(crash(1.8), k * B, 0.55)
add(riser(B * 1.0), 40 * B, 0.9)
add(whoosh(0.6), 41 * B - 0.5, 1.0)

# 3) CHIUSURA ------------------------------------------------------------------
O = 41 * B
add(boom(3.2, 75, 28), O, 1.0)
add(pad([45, 52, 57, 60, 64], DUR - O, bright=900) * 1.6, O, 1.0)
add(tick(), O + 1.45, 0.8)

# riverbero leggero (convoluzione con coda di rumore)
ir_n = int(1.6 * SR)
ir_t = np.arange(ir_n) / SR
ir = rng.standard_normal(ir_n) * np.exp(-ir_t / 0.35)
ir = onepole_lp(ir, 4000)
ir /= np.sqrt((ir**2).sum())


def conv(x):
    n = len(x) + ir_n
    m = 1 << (n - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[: len(x)]
    return y


L = L + conv(L) * 0.18
R = R + conv(R) * 0.18

# sfumatura finale e normalizzazione con limitatore morbido
fade = np.ones(N)
fl = at(1.2)
fade[-fl:] = np.linspace(1, 0, fl) ** 2
mix = np.stack([L, R], 1) * fade[:, None]
mix = np.tanh(mix / np.abs(mix).max() * 1.5) * 0.92
pcm = (mix * 32767).astype("<i2")

out = os.path.join(os.path.dirname(__file__), "..", "public", "beat.wav")
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", out, f"{DUR:.2f}s")
