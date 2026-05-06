# Beyond Earth — Premium Futuristic Space Design System

## Tone & Direction
Cinematic space exploration interface. Immersive, premium, futuristic. Electric neon accents over deep cosmic void. Premium space agency aesthetic — NOT educational blog, NOT cartoon.

## Differentiation
Glassmorphic cards with backdrop blur float over animated starfield. Neon cyan & purple glow pulses on interactive elements. Geometric Space Grotesk headings command attention. Deep space black (#0B0F1A) void creates infinite depth.

## Color Palette (Dark Mode — Hex)

| Token | Hex | Purpose |
|-------|-----|----------|
| background | #0B0F1A → #05070D | Deep space void gradient core |
| card | #10151E | Elevated glass surface |
| neon-cyan | #00E5FF | Primary electric accent, glow |
| neon-purple | #6C63FF | Secondary vibrant accent |
| success | #00FF9C | Positive action, confirmation |
| error | #FF4D4D | Destructive, alert states |
| warning | #FFC857 | Warning, caution messaging |
| foreground | #F1F5F9 | Primary text, high contrast |

## Typography

| Layer | Font | Use |
|-------|------|-----|
| Display | Space Grotesk 700 | H1/H2/H3, hero, section titles (geometric, sci-fi) |
| Body | Plus Jakarta Sans 400 | Content, descriptions, UI copy (clean, readable) |
| Mono | JetBrains Mono 400 | Technical data, calculations, code |

## Structural Zones

| Zone | Treatment | Visual |
|------|-----------|--------|
| Navigation | Glass card, backdrop-blur(12px), neon-cyan glow | Sticky top, elevated |
| Hero | Starfield-animated background, gradient text | Full-width immersive |
| Content cards | Glass-card (rgba(255,255,255,0.05), border rgba(0,229,255,0.15)) | Hover glow-cyan |
| Section alt | Gradient overlay rgba(11,15,26,0.8) to rgba(5,7,13,0.8) | Subtle depth |
| CTA buttons | Gradient neon-cyan→neon-purple, glow-intense shadow | Pulse animation |
| Footer | Glass card, subtle border, text-muted-foreground | Card level |

## Component Patterns
- **Buttons:** Gradient neon (cyan→purple), box-shadow glow, 0.5rem border-radius
- **Cards:** Glass background + backdrop-filter blur(12px), 1px border rgba(0,229,255,0.15), hover glow transition
- **Inputs:** Dark background, neon-cyan border on focus, glow effect
- **Navigation:** Text hover smooth to neon-cyan, active state underline glow
- **Text:** Gradient cyan→purple for headings, plain foreground for body

## Motion & Animation
- **Global:** cubic-bezier(0.4, 0, 0.2, 1) ease (smooth, premium)
- **Entrance:** fade-in + slide-down 0.3s
- **Hover:** glow-intense shadow pulse, border-color shift to neon-cyan
- **Background:** starfield twinkle 3s infinite, floating particles 8s linear
- **Button pulse:** pulse-glow 2s infinite (shadow animates)

## Elevation & Depth
Depth via: background gradient (#0B0F1A→#05070D), glass frosting + blur, neon glow halos, floating particles in background.

## Signature Detail
Neon cyan & purple glow effects on all interactive surfaces. Glassmorphic cards hover with pulse-glow animation. Starfield background with animated particle system. No harsh shadows — only glows.

## Constraints
- No rounded-full pills — use 0.5rem (rounded-lg) minimum
- No color shift on hover — use glow + border-color shift
- No harsh box-shadows — all depth via glow (rgba with blur)
- All text gradients cyan→purple, never single color accents
- Transitions 0.3s–0.5s cubic-bezier only
