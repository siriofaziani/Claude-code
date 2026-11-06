"""Base dark trap originale per il Reel promozionale (140 BPM, 30 s, 70 battiti). Generata da zero:
nessun campione esterno, nessun diritto da pagare.

Uso: python3 scripts/make_promo_beat.py public/promo/beat.wav
Griglia: 1 battito = 60/140 s = 0,4286 s (12,857 fotogrammi a 30 fps). I tempi degli effetti
coincidono con quelli del montaggio in src/SitoReel.jsx (stesse posizioni in battiti).
  0-7,5   intro filtrata + notifiche          7,5-8   silenzio            8 DROP
  8-47    beat pieno (showcase)               47-63   break (solo 808)    63-69 ultima battuta, stop a 69
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 140
BEAT = 60 / BPM
STEP = BEAT / 4
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(11)


def B(n):
    return n * BEAT


def env(n, attack=0.002, decay=0.2):
    t = np.arange(n) / SR
    return np.clip(t / attack, 0, 1) * np.exp(-t / decay)


def soft_filter(x, lo=None, hi=None):
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
    n = min(len(sound), len(track) - i)
    track[i : i + n] += sound[:n] * gain


# ───────────── suoni ─────────────
def kick(dur=0.45):
    n = int(SR * dur)
    t = np.arange(n) / SR
    f = 48 + 110 * np.exp(-t * 32)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * env(n, 0.001, 0.22)
    click = soft_filter(rng.standard_normal(n), lo=2500) * env(n, 0.0005, 0.006) * 0.4
    return np.tanh((body + click) * 1.6)


def clap():
    n = int(SR * 0.35)
    noise = soft_filter(rng.standard_normal(n), lo=900, hi=7000)
    e = np.zeros(n)
    for d in (0, 0.011, 0.022):
        e += np.roll(env(n, 0.0005, 0.012), int(d * SR))
    e += env(n, 0.001, 0.13) * 0.8
    return noise * e * 0.6


def hat(open_=False):
    n = int(SR * (0.2 if open_ else 0.05))
    noise = soft_filter(rng.standard_normal(n), lo=7000)
    return noise * env(n, 0.0005, 0.07 if open_ else 0.014) * 0.32


def sub808(freq, dur):
    n = int(SR * dur)
    t = np.arange(n) / SR
    f = freq * (1 + 0.6 * np.exp(-t * 40))  # attacco con piccola discesa
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) + 0.25 * np.sin(2 * ph)
    e = np.clip(t / 0.004, 0, 1) * np.clip((dur - t) / 0.05, 0, 1)
    return np.tanh(x * 1.8) * e * 0.75


def ding(freq=1568):
    n = int(SR * 0.5)
    t = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * t) + 0.5 * np.sin(2 * np.pi * freq * 2.01 * t)
    x = np.tanh(x * 3) * 0.6  # distorto
    return x * env(n, 0.001, 0.12) * 0.35


def whoosh(dur=0.6, reverse=False, lo=300, hi=6000):
    n = int(SR * dur)
    noise = soft_filter(rng.standard_normal(n), lo=lo, hi=hi)
    t = np.linspace(0, 1, n)
    e = np.sin(np.pi * t) ** 2
    if reverse:
        e = t**3
    return noise * e * 0.35


def impact():
    n = int(SR * 2.2)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (38 + 60 * np.exp(-t * 9)) * t) * env(n, 0.001, 0.7)
    crack = soft_filter(rng.standard_normal(n), lo=1500) * env(n, 0.0005, 0.05) * 0.6
    glass = np.zeros(n)
    for _ in range(26):  # schegge: brevi suoni acuti sparsi nei primi 0,5 s
        f0 = rng.uniform(3000, 9000)
        st = int(rng.uniform(0, 0.5) * SR)
        m = int(SR * 0.08)
        tt = np.arange(m) / SR
        g = np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 70) * rng.uniform(0.05, 0.15)
        glass[st : st + m] += g[: max(0, min(m, n - st))]
    return np.tanh(boom * 1.4 + crack + glass)


def click():
    n = int(SR * 0.03)
    return soft_filter(rng.standard_normal(n), lo=3000) * env(n, 0.0003, 0.004) * 0.7


def pop(freq=900):
    n = int(SR * 0.12)
    t = np.arange(n) / SR
    f = freq * (1 + 1.5 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.04) * 0.4


def pad(freqs, dur):
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for f in freqs:
        for d in (-0.12, 0, 0.11):  # tre oscillatori leggermente scordati
            ph = 2 * np.pi * f * (1 + d / 100) * t
            x += 2 * (ph / (2 * np.pi) % 1) - 1
    x = soft_filter(x / (len(freqs) * 3), hi=900)
    return x * np.clip(t / 0.4, 0, 1) * np.clip((dur - t) / 0.4, 0, 1) * 0.22


# ───────────── arrangiamento ─────────────
L = np.zeros(N)
R = np.zeros(N)
both = np.zeros(N)

# Fa minore: F1, Db1(scuro), Eb1, C1 — giro di 2 battute (8 battiti) per accordo
roots = [43.65, 34.65, 38.89, 32.70]
chords = [[174.6, 207.7, 261.6], [138.6, 174.6, 207.7], [155.6, 196.0, 233.1], [130.8, 164.8, 196.0]]

# pad scuro su tutto il brano, aperto dopo il drop
for k, start in enumerate(np.arange(0, 70, 8)):
    c = chords[k % 4]
    p = pad(c, B(8) + 0.4)
    if start < 8:
        p = soft_filter(p, hi=350)  # intro filtrata
    place(both, p, B(start), 0.9 if start >= 8 else 0.7)

# intro (0-7,5): sub che pulsa sui battiti, filtrato
for b in range(0, 8):
    place(both, soft_filter(sub808(43.65, BEAT * 0.9), hi=200), B(b), 0.55)
# notifiche distorte (coincidono con le notifiche rosse sullo schermo)
for b, f in ((0.35, 1568), (2, 1397), (4, 1760)):
    place(L, ding(f), B(b), 0.9)
    place(R, ding(f * 1.003), B(b) + 0.006, 0.9)
# parole: piccolo colpo secco su ogni parola
for b in (1, 1.5, 2, 3, 4, 5):
    place(both, click(), B(b), 0.5)
# riser invertito verso il drop, poi silenzio (7,5-8)
place(both, whoosh(B(3), reverse=True, lo=500, hi=9000), B(4.5), 0.9)

# DROP a 8: impatto + vetro
place(both, impact(), B(8), 1.0)


def drums(b0, b1, full=True):
    for bar in range(int(b0), int(b1), 4):
        for s in range(16):
            t = B(bar) + s * STEP
            if t >= B(b1):
                break
            if full and s in (0, 7, 10):
                place(both, kick(), t, 0.95)
            if full and s == 8:
                place(both, clap(), t, 0.85)
            if full and s % 2 == 0:
                place(L if s % 4 else R, hat(), t, 0.8)
            if full and s == 14:
                place(both, hat(open_=True), t, 0.6)
        if full and (bar // 4) % 2 == 1:  # terzine di charleston a fine di ogni seconda battuta
            for i in range(6):
                place(R, hat(), B(bar + 3) + i * BEAT / 3, 0.6)


def bass(b0, b1, gain=1.0):
    for k, bar in enumerate(range(int(b0), int(b1), 4)):
        root = roots[(bar // 8) % 4]
        for s, length in ((0, 6), (7, 3), (10, 6)):
            t = B(bar) + s * STEP
            if t < B(b1):
                place(both, sub808(root, length * STEP), t, gain)


drums(8, 47)
bass(8, 47)
# whoosh sui cambi di momento dello showcase
for b in (14, 22, 30, 38):
    place(both, whoosh(0.5), B(b) - 0.25, 0.8)
# tocchi della prenotazione (31, 32,5, 34, 36) + passaggio alla chat
for b in (31, 32.5, 34, 36):
    place(both, click(), B(b), 1.0)
place(both, whoosh(0.4, lo=800), B(36.4), 0.8)
# stelle che si accendono (39 + i/4) e badge (38)
place(both, pop(700), B(38), 1.0)
for i in range(5):
    place(both, pop(1000 + i * 150), B(39 + i * 0.25), 0.9)

# break (47-63): solo 808 e un clap lontano, più spazio
bass(47, 63, 0.8)
for bar in range(47, 63, 4):
    place(both, soft_filter(clap(), hi=3000), B(bar + 2), 0.35)
place(both, whoosh(B(4), reverse=True, lo=400, hi=8000), B(59), 0.8)

# ultima battuta piena (63-69) e stop secco a 69 con coda
drums(63, 69)
bass(63, 69)
tail = np.zeros(N)
place(tail, impact()[: int(SR * 1.0)], B(69), 0.8)

mix = np.stack([both + L, both + R], axis=1)
# silenzio vero prima del drop (7,5-8) e stop secco a 69: resta solo la coda dell'ultimo colpo
fade = int(SR * 0.01)
for a, b in ((B(7.5), B(8)), (B(69), DUR)):
    i, j = int(a * SR), int(b * SR)
    mix[i - fade : i] *= np.linspace(1, 0, fade)[:, None]
    mix[i:j] = 0
mix += tail[:, None]
mix /= np.max(np.abs(mix)) + 1e-9
mix = np.tanh(mix * 1.3) / np.tanh(1.3) * 0.95

out = sys.argv[1] if len(sys.argv) > 1 else "public/promo/beat.wav"
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print(out, f"{DUR}s", f"{BPM} BPM")
