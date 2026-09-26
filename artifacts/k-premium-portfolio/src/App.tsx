import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Disc3,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Menu,
  Music2,
  MousePointer2,
  Pin,
  Sparkles,
  Terminal,
  Volume2,
  X,
  Youtube,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const discordUrl = 'https://discord.com/users/1370616404771868722';
const orbeezInvite = 'https://discord.gg/qcMW93wVS4';

function HaloBackground() {
  useEffect(() => {
    const vanta = (window as Window & { VANTA?: { HALO?: (options: Record<string, unknown>) => { destroy?: () => void } } }).VANTA;
    if (!vanta?.HALO) return undefined;
    const probe = document.createElement('canvas');
    const canUseWebgl = Boolean(
      probe.getContext('webgl') || probe.getContext('experimental-webgl'),
    );
    if (!canUseWebgl) return undefined;

    try {
      const effect = vanta.HALO({
        el: '#vanta-halo',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        baseColor: 0xf5efe7,
        backgroundColor: 0xf5efe7,
        amplitudeFactor: 0.7,
        xOffset: 0.08,
        yOffset: 0.05,
        size: 1.25,
      });
      return () => effect?.destroy?.();
    } catch {
      return undefined;
    }
  }, []);

  return <div id="vanta-halo" aria-hidden="true" className="ambient-halo" />;
}

function Wordmark() {
  return (
    <a href="#top" aria-label="K home" data-testid="link-home" className="group flex items-center">
      <span className="grid size-9 place-items-center rounded-full bg-[hsl(var(--secondary))] text-sm font-bold text-[hsl(var(--secondary-foreground))] transition-transform group-hover:rotate-12">K</span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['about', '#about'],
    ['the people', '#people'],
    ['connect', '#connect'],
    ['music', '#music'],
    ['the work', '#work'],
  ];
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 border-b border-[hsl(var(--border)/.7)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Primary navigation">
        <Wordmark />
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} data-testid={`link-nav-${label.replace(' ', '-')}`} className="font-mono-k text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]">{label}</a>
          ))}
          <a href={discordUrl} target="_blank" rel="noreferrer" data-testid="link-nav-discord" className="group flex items-center gap-2 rounded-full border border-[hsl(var(--secondary)/.25)] bg-[hsl(var(--card)/.7)] px-4 py-2 font-mono-k text-[10px] uppercase tracking-[.12em] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))]">
            find me on Discord <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-menu" className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-[hsl(var(--border)/.7)] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-${label.replace(' ', '-')}`} className="font-mono-k text-xs uppercase tracking-[.18em]">{label}</a>)}
            <a href={discordUrl} target="_blank" rel="noreferrer" data-testid="link-mobile-discord" className="font-mono-k text-xs uppercase tracking-[.18em] text-[hsl(var(--primary))]">open Discord profile <ArrowUpRight size={14} className="inline" /></a>
          </div>
        </div>
      )}
    </header>
  );
}

function Sticker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex -rotate-2 items-center gap-2 rounded-full border border-[hsl(var(--primary)/.35)] bg-[hsl(var(--card))] px-3 py-1.5 font-mono-k text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))] shadow-sm ${className}`}>{children}</span>;
}

function ProfileTile({ name, image, banner, tone, note }: { name: string; image: string; banner: string; tone: string; note: string }) {
  const isOrbeez = name === 'Orbeez';
  return (
    <a href={isOrbeez ? orbeezInvite : '#farah-note'} target={isOrbeez ? '_blank' : undefined} rel={isOrbeez ? 'noreferrer' : undefined} data-testid={`card-profile-${name.toLowerCase()}`} className="scrap-card hover-lift group block rounded-[1.6rem] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.83)] p-2">
      <div className="relative h-36 overflow-hidden rounded-[1.1rem]">
        <img src={banner} alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-gradient-to-t ${tone} to-transparent opacity-65`} />
        <img src={image} alt={`${name} avatar`} data-testid={`img-avatar-${name.toLowerCase()}`} className="absolute bottom-3 left-4 size-16 rounded-2xl border-4 border-[hsl(var(--card))] object-cover shadow-lg transition-transform group-hover:-rotate-3" />
        <span className="absolute right-4 top-4 rounded-full bg-[hsl(var(--card)/.85)] px-2.5 py-1 font-mono-k text-[9px] uppercase tracking-widest">archive 0{name === 'Orbeez' ? '1' : '2'}</span>
      </div>
      <div className="flex items-end justify-between gap-3 px-3 pb-3 pt-4">
        <div>
          <h3 className="font-display text-2xl">{name}</h3>
          <p className="mt-1 max-w-[18rem] text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{note}</p>
        </div>
        <ArrowUpRight size={18} className="shrink-0 text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </a>
  );
}

function DiscordProfileTile() {
  return (
    <a href={discordUrl} target="_blank" rel="noreferrer" data-testid="link-top-discord-profile" className="discord-profile-tile hover-lift group flex items-center justify-between gap-4 rounded-[1.4rem] border border-[hsl(var(--secondary)/.18)] bg-[hsl(var(--secondary))] p-3 text-[hsl(var(--secondary-foreground))]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-[1rem] border-2 border-white/20">
          <img src="/assets/k-pfp.jpg" alt="K profile photo" className="h-full w-full object-cover" />
          <span className="absolute bottom-1 right-1 size-2.5 rounded-full border-2 border-[hsl(var(--secondary))] bg-[#6ee7b7]" />
        </div>
        <div className="min-w-0">
          <p className="font-mono-k text-[9px] uppercase tracking-[.2em] opacity-60">discord profile / online-ish</p>
          <h2 className="mt-1 truncate text-xl">k</h2>
          <p className="truncate font-mono-k text-[10px] opacity-70">@ashiqhoon · making things</p>
        </div>
      </div>
      <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

const connectionLinks = [
  { label: 'GitHub', href: 'https://github.com/krishnaflx', icon: Github },
  { label: 'LinkedIn', href: null, icon: Linkedin },
  { label: 'YouTube', href: null, icon: Youtube },
  { label: 'Instagram', href: null, icon: Instagram },
  { label: 'Pinterest', href: null, icon: Pin },
];

function ConnectionShelf() {
  return (
    <div className="connection-shelf mt-3 flex items-center justify-between gap-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/.72)] px-3 py-2">
      <span className="font-mono-k text-[9px] uppercase tracking-[.17em] text-[hsl(var(--muted-foreground))]">connect / keep in touch</span>
      <div className="flex items-center gap-1">
        {connectionLinks.map(({ label, href, icon: Icon }) => (
            href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`K on ${label}`} data-testid={`link-${label.toLowerCase()}`} className="grid size-8 place-items-center rounded-full text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))]">
                <Icon size={15} strokeWidth={1.7} />
              </a>
            ) : (
              <span key={label} aria-label={`${label} link coming soon`} aria-disabled="true" title="Link coming soon" className="grid size-8 cursor-not-allowed place-items-center rounded-full text-[hsl(var(--muted-foreground)/.35)]">
                <Icon size={15} strokeWidth={1.7} />
              </span>
            )
        ))}
      </div>
    </div>
  );
}

const musicTracks = [
  {
    title: 'Boom Shaka',
    artist: 'KR$NA & Dhanda Nyoliwala',
    previewUrl: 'https://p.scdn.co/mp3-preview/766e1ea397f2804944f390f1be0d4a96a16af7ed',
    sourceUrl: 'https://open.spotify.com/track/1g6nQTE5x7eLJX7tXCTiSz',
    sourceLabel: 'open on Spotify',
  },
  {
    title: '3 DRAGS',
    artist: 'vichaar',
    previewUrl: 'https://p.scdn.co/mp3-preview/ae0b99cbd18502b25d9605d50d09226c7522191e',
    sourceUrl: 'https://open.spotify.com/track/6TkzDmN6oVbfXNG3C83J9J',
    sourceLabel: 'open on Spotify',
  },
  {
    title: 'I Guess',
    artist: 'KR$NA',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c7/5c/68/c75c68ce-1eea-c2c9-ed81-505afe695ea0/mzaf_690900378708172363.plus.aac.p.m4a',
    sourceUrl: 'https://music.apple.com/us/album/i-guess/6776936952?i=6776936956&uo=4',
    sourceLabel: 'open on Apple Music',
  },
];

function MusicPlaylist() {
  const [trackIndex, setTrackIndex] = useState(() => Math.floor(Math.random() * musicTracks.length));
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = musicTracks[trackIndex];
  const chooseRandomTrack = () => {
    setTrackIndex((currentIndex) => {
      let nextIndex = Math.floor(Math.random() * musicTracks.length);
      while (musicTracks.length > 1 && nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * musicTracks.length);
      }
      return nextIndex;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const playAttempt = audio.play();
    playAttempt.catch(() => setAutoplayBlocked(true));
  }, [trackIndex]);

  return (
    <section id="music" className="music-card mt-5 overflow-hidden rounded-[1.4rem] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.75)]" aria-labelledby="music-heading">
      <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4">
        <div>
          <p className="font-mono-k text-[9px] uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">random rotation / rap shelf</p>
          <h2 id="music-heading" className="mt-2 text-xl tracking-tight">{track.title}</h2>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{track.artist}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]"><Music2 size={16} /></span>
      </div>
      <div className="music-frame mx-4 overflow-hidden rounded-[1rem] bg-[hsl(var(--muted)/.45)] p-3">
        <audio
          ref={audioRef}
          key={track.previewUrl}
          src={track.previewUrl}
          autoPlay
          controls
          preload="auto"
          onPlay={() => setAutoplayBlocked(false)}
          onEnded={chooseRandomTrack}
          onError={() => setAutoplayBlocked(true)}
          className="music-player w-full"
        />
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono-k text-[9px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]"><Volume2 size={13} /> {autoplayBlocked ? 'tap play to start the mix' : 'random preview / 30 sec'}</p>
          <a href={track.sourceUrl} target="_blank" rel="noreferrer" className="shrink-0 font-mono-k text-[9px] uppercase tracking-[.12em] text-[hsl(var(--primary))] hover:underline">{track.sourceLabel}</a>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {musicTracks.map((item, index) => (
            <button key={item.previewUrl} type="button" onClick={() => setTrackIndex(index)} aria-label={`Play ${item.title}`} className={`rounded-full border px-2.5 py-1 font-mono-k text-[9px] uppercase tracking-[.1em] transition-colors ${index === trackIndex ? 'border-[hsl(var(--primary)/.45)] bg-[hsl(var(--primary)/.1)] text-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/.35)]'}`}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [copied, setCopied] = useState(false);
  const copyHandle = async () => {
    await navigator.clipboard?.writeText('@ashiqhoon');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main id="top" className="site-shell min-h-[100dvh]">
      <HaloBackground />
      <Nav />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-32 lg:px-8">
        <section className="relative grid min-h-[650px] items-center lg:grid-cols-[1.1fr_.9fr] lg:gap-12" aria-labelledby="intro-heading">
          <div className="relative z-10">
            <div className="reveal flex items-center gap-3">
              <span className="font-mono-k text-[10px] uppercase tracking-[.23em] text-[hsl(var(--muted-foreground))]">a small internet corner</span>
              <span className="ink-line w-12" />
              <span className="font-mono-k text-[10px] text-[hsl(var(--primary))]">2024—∞</span>
            </div>
            <h1 id="intro-heading" className="reveal reveal-2 mt-7 max-w-3xl text-balance text-[clamp(4.9rem,15vw,10.8rem)] font-semibold leading-[.77] tracking-[-.1em]">
              hello,<br /><span className="font-display font-normal italic text-[hsl(var(--primary))]">i’m K.</span>
            </h1>
            <p className="reveal reveal-3 mt-10 max-w-lg text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              I make things for Discord, then keep making them stranger until they feel like they belong to someone. Bots, apps, experiments, and the occasional beautiful mess.
            </p>
            <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-4">
              <a href={discordUrl} target="_blank" rel="noreferrer" data-testid="link-hero-discord" className="group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--secondary))] px-6 py-3.5 font-mono-k text-xs uppercase tracking-[.12em] text-[hsl(var(--secondary-foreground))] transition-transform hover:-translate-y-1">
                <Disc3 size={17} /> talk to me on Discord <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#work" data-testid="link-hero-work" className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-mono-k text-[10px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]">see what I make <ArrowDown size={14} /></a>
            </div>
          </div>
          <div className="collage-stage relative mt-16 min-h-[520px] lg:mt-0">
            <div className="relative z-20 mx-auto w-full max-w-sm lg:mr-0">
              <DiscordProfileTile />
              <ConnectionShelf />
              <MusicPlaylist />
            </div>
            <div className="collage-layer absolute left-[8%] top-8 h-64 w-64 rounded-full border border-[hsl(var(--primary)/.3)] lg:h-80 lg:w-80" />
            <div className="collage-layer absolute left-[18%] top-20 h-64 w-64 rounded-full border border-dashed border-[hsl(var(--accent)/.5)] lg:h-80 lg:w-80" />
            <a href={orbeezInvite} target="_blank" rel="noreferrer" aria-label="Join the Orbeez Discord server" className="collage-layer floaty absolute right-[2%] top-40 z-10 block w-44 -rotate-6 overflow-hidden rounded-2xl border-8 border-[hsl(var(--card))] shadow-xl lg:right-[5%] lg:w-52">
              <img src="/assets/orbeez-pfp.jpeg" alt="Orbeez artwork" className="aspect-square w-full object-cover" />
              <span className="absolute bottom-2 left-2 rounded bg-[hsl(var(--card)/.8)] px-2 py-1 font-mono-k text-[8px] uppercase">join Orbeez</span>
            </a>
            <div className="collage-layer floaty absolute bottom-5 left-[4%] z-10 w-52 rotate-6 overflow-hidden rounded-2xl border-8 border-[hsl(var(--card))] shadow-xl [animation-delay:-2s] lg:w-60">
              <img src="/assets/farah-pfp.jpg" alt="Farah artwork" className="aspect-square w-full object-cover" />
              <span className="absolute bottom-2 right-2 rounded bg-[hsl(var(--card)/.85)] px-2 py-1 font-mono-k text-[8px] uppercase">ink & signal</span>
            </div>
            <div className="collage-layer absolute bottom-14 right-[2%] max-w-44 rotate-3 rounded-2xl bg-[hsl(var(--accent))] px-5 py-4 text-sm leading-snug shadow-lg lg:right-[8%]">
              <Sparkles size={15} className="mb-3" /> “make it feel a little more alive.”
            </div>
            <div className="collage-layer absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-display text-[11rem] italic text-[hsl(var(--primary)/.08)] lg:block">K</div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 border-t border-[hsl(var(--border))] py-24" aria-labelledby="about-heading">
          <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
            <div>
              <Sticker><Terminal size={12} /> note to self</Sticker>
              <p className="mt-5 font-mono-k text-xs uppercase tracking-[.17em] text-[hsl(var(--muted-foreground))]">01 / about</p>
            </div>
            <div>
              <h2 id="about-heading" className="max-w-3xl text-4xl leading-tight tracking-tight md:text-6xl">I like software with a <span className="font-display italic text-[hsl(var(--primary))]">point of view.</span></h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">The internet is already full of things that work. I’m interested in the ones that have a pulse. A bot that answers with the right kind of weird. An interface that makes a tiny task feel like a ritual. An experiment that teaches me something before it breaks.</p>
              <div className="mt-10 grid gap-4 border-t border-[hsl(var(--border))] pt-5 text-sm sm:grid-cols-3">
                <div><p className="font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">usually found</p><p className="mt-2">inside Discord</p></div>
                <div><p className="font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">currently learning</p><p className="mt-2">how to ship softer</p></div>
                <div><p className="font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">timezone</p><p className="mt-2">somewhere online</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="people" className="scroll-mt-28 py-10" aria-labelledby="people-heading">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div><p className="font-mono-k text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">02 / the people</p><h2 id="people-heading" className="mt-3 text-3xl tracking-tight md:text-5xl">the <span className="font-display italic">lore</span> folder</h2></div>
            <p className="max-w-xs text-right text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Some of the energy behind the screen. Kept here with permission and a little sentimentality.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
             <ProfileTile name="Orbeez" image="/assets/orbeez-pfp.jpeg" banner="/assets/orbeez-banner.jpeg" tone="from-[#e58fb7]" note="a quest-completer bot for Discord — jump in, run quests, and let the pink chaos do the remembering." />
            <ProfileTile name="Farah" image="/assets/farah-pfp.jpg" banner="/assets/farah-banner.jpeg" tone="from-[#45535b]" note="a little black-and-white reminder that quiet things can still say a lot." />
          </div>
          <a href={discordUrl} target="_blank" rel="noreferrer" data-testid="link-discord-profile-tile" className="hover-lift mt-5 flex items-center justify-between gap-5 rounded-[1.4rem] border border-[hsl(var(--secondary)/.18)] bg-[hsl(var(--secondary))] px-5 py-4 text-[hsl(var(--secondary-foreground))] md:px-7">
            <div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-full border border-current/20 bg-white/10"><Disc3 size={21} /></span><div><p className="font-mono-k text-[9px] uppercase tracking-[.2em] opacity-60">direct line</p><p className="mt-1 text-sm">K / @ashiqhoon</p></div></div>
            <span className="flex items-center gap-2 font-mono-k text-[10px] uppercase tracking-[.13em]">open Discord profile <ArrowUpRight size={15} /></span>
          </a>
        </section>

        <section id="connect" className="scroll-mt-28 border-y border-[hsl(var(--border))] py-24" aria-labelledby="connect-heading">
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <Sticker><MousePointer2 size={12} /> connection page</Sticker>
              <p className="mt-5 font-mono-k text-xs uppercase tracking-[.17em] text-[hsl(var(--muted-foreground))]">03 / everywhere else</p>
            </div>
            <div>
              <h2 id="connect-heading" className="max-w-3xl text-4xl leading-tight tracking-tight md:text-6xl">find me in a few <span className="font-display italic text-[hsl(var(--primary))]">different tabs.</span></h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[hsl(var(--muted-foreground))]">A small shelf for the places where I post, build, collect, and disappear for a while. Tap any icon to open the profile in a new tab.</p>
              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {connectionLinks.map(({ label, href, icon: Icon }) => (
                  href ? (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="hover-lift flex items-center gap-3 rounded-[1.1rem] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.65)] px-4 py-4" data-testid={`card-connection-${label.toLowerCase()}`}>
                      <span className="grid size-9 place-items-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]"><Icon size={17} /></span>
                      <span className="font-mono-k text-[10px] uppercase tracking-[.12em]">{label}</span>
                      <ArrowUpRight size={13} className="ml-auto text-[hsl(var(--muted-foreground))]" />
                    </a>
                  ) : (
                    <div key={label} aria-disabled="true" className="flex cursor-not-allowed items-center gap-3 rounded-[1.1rem] border border-[hsl(var(--border)/.65)] bg-[hsl(var(--card)/.35)] px-4 py-4 opacity-50" data-testid={`card-connection-${label.toLowerCase()}`}>
                      <span className="grid size-9 place-items-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]"><Icon size={17} /></span>
                      <span className="min-w-0"><span className="block font-mono-k text-[10px] uppercase tracking-[.12em]">{label}</span><span className="mt-1 block font-mono-k text-[8px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">coming soon</span></span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 py-28" aria-labelledby="work-heading">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
               <p className="font-mono-k text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">04 / the work</p>
              <h2 id="work-heading" className="mt-4 text-5xl leading-[.95] tracking-tight md:text-7xl">small tools,<br /><span className="font-display italic text-[hsl(var(--primary))]">big feelings.</span></h2>
               <p className="mt-6 max-w-xs text-sm leading-7 text-[hsl(var(--muted-foreground))]">The one project I keep coming back to: a little Discord bot with a lot of personality.</p>
            </div>
            <div className="space-y-4">
              {[
                  { number: '01', title: 'Orbeez / quest completer', desc: 'A Discord quest-completer bot for turning game quests into a shared little ritual with your server.', tags: ['discord', 'quests'], icon: Heart, wash: 'pink-wash' },
              ].map((item) => {
                const Icon = item.icon;
                return <article key={item.number} data-testid={`card-project-${item.number}`} className={`scrap-card hover-lift ${item.wash} rounded-[1.5rem] border border-[hsl(var(--border))] p-6 md:p-8`}>
                   <div className="flex items-start justify-between gap-5"><span className="font-mono-k text-[10px] text-[hsl(var(--muted-foreground))]">{item.number} / 01</span><Icon size={22} strokeWidth={1.5} /></div>
                  <h3 className="mt-12 text-2xl tracking-tight md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                  <div className="mt-7 flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="rounded-full border border-current/15 px-3 py-1 font-mono-k text-[9px] uppercase tracking-wider">{tag}</span>)}</div>
                   {item.number === '01' && <a href={orbeezInvite} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-mono-k text-[10px] uppercase tracking-[.13em] text-[hsl(var(--primary))] hover:underline" data-testid="link-work-orbeez">join the Orbeez server <ArrowUpRight size={14} /></a>}
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="orbeez-note" className="scroll-mt-28 border-y border-[hsl(var(--border))] py-20" aria-label="Scrapbook notes">
          <div className="grid gap-5 md:grid-cols-[1fr_.65fr_1fr]">
            <div className="rotate-[-1deg] rounded-[1.4rem] bg-[hsl(var(--secondary))] p-7 text-[hsl(var(--secondary-foreground))] shadow-lg">
               <p className="font-mono-k text-[10px] uppercase tracking-widest opacity-60">orbeez / field note</p>
               <p className="mt-9 font-display text-3xl italic leading-tight">“A tiny quest completer bot for servers that want the side-quests to feel less lonely.”</p>
               <p className="mt-8 font-mono-k text-[10px] uppercase tracking-widest opacity-60">quests · friends · pink chaos</p>
               <a href={orbeezInvite} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono-k text-[10px] uppercase tracking-[.12em] hover:bg-white/10" data-testid="link-orbeez-note">join the Orbeez server <ArrowUpRight size={13} /></a>
            </div>
            <div className="flex flex-col justify-center rounded-[1.4rem] border border-dashed border-[hsl(var(--primary)/.5)] p-7 text-center">
              <Code2 size={24} className="mx-auto text-[hsl(var(--primary))]" />
              <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">This page is made of opinions, a few divs, and an unreasonable amount of care.</p>
              <span className="mt-5 font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">no template energy</span>
            </div>
            <div id="farah-note" className="overflow-hidden rounded-[1.4rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <img src="/assets/farah-banner.jpeg" alt="Farah banner artwork" className="h-36 w-full object-cover opacity-80" />
              <div className="p-6"><p className="font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">field note / 002</p><p className="mt-4 font-display text-2xl italic">keep the quiet parts.</p></div>
            </div>
          </div>
        </section>

        <section className="py-28 text-center" aria-labelledby="contact-heading">
          <Sticker className="rotate-2"><Sparkles size={12} /> open invitation</Sticker>
          <h2 id="contact-heading" className="mx-auto mt-7 max-w-3xl text-5xl leading-[.95] tracking-tight md:text-8xl">got a weird idea?<br /><span className="font-display italic text-[hsl(var(--primary))]">let’s make it real.</span></h2>
          <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-[hsl(var(--muted-foreground))]">No pitch deck required. Tell me what you’re building, what’s broken, or what you can’t stop thinking about.</p>
          <a href={discordUrl} target="_blank" rel="noreferrer" data-testid="link-footer-discord" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-7 py-4 font-mono-k text-xs uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)/.18)] transition-transform hover:-translate-y-1">find k on Discord <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/.55)] px-4 py-2">
            <span className="font-mono-k text-[11px] text-[hsl(var(--muted-foreground))]">@ashiqhoon</span>
            <button type="button" onClick={copyHandle} data-testid="button-copy-handle" aria-label="Copy Discord handle" className="rounded-full p-1.5 hover:bg-[hsl(var(--muted))]">{copied ? <Check size={14} className="text-[hsl(var(--accent))]" /> : <Copy size={14} />}</button>
          </div>
        </section>
      </div>
      <footer className="border-t border-[hsl(var(--border))] px-5 py-7 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-[hsl(var(--secondary))] text-xs text-[hsl(var(--secondary-foreground))]">K</span><span className="font-mono-k text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">made with intent, somewhere online</span></div>
           <div className="flex items-center gap-5"><a href={orbeezInvite} target="_blank" rel="noreferrer" data-testid="link-footer-orbeez" aria-label="Join Orbeez Discord server" className="font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--primary))] hover:underline">join Orbeez</a><a href="#top" data-testid="link-back-top" aria-label="Back to top" className="font-mono-k text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]">back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;