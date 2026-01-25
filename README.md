# GearMatch

A personalized gaming gear recommendation platform that helps gamers find the perfect peripherals based on their specific needs and playstyle.

## About

GearMatch takes a quiz-based approach to match users with gaming gear that fits their requirements, rather than relying on generic "top 10" lists. Built by gamers, for gamers.

**Core Values:**
- 0% sponsored picks - no brand partnerships
- Transparent reasoning for every recommendation
- Real-world testing focused on actual user feedback
- Free to use with no account required

## Features

**Available Now:**
- **Mouse Recommendation Quiz** - 5-question quiz covering hand size, grip style, weight preference, wireless vs wired, and game genre
- **Audio Equipment Quiz** - 5-question quiz covering primary use case, form factor, microphone needs, session length, and budget
- **Responsive Design** - Fully mobile-optimized interface

**Coming Soon:**
- Keyboard recommendations
- Controller recommendations
- Results matching and product database

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Vitest** - Testing framework

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bryanygan/gearmatch.git

# Navigate to project directory
cd gearmatch

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs at `http://localhost:8080`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build development version |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── MouseQuiz.tsx   # Mouse recommendation quiz
│   ├── AudioQuiz.tsx   # Audio recommendation quiz
│   └── NotFound.tsx    # 404 page
├── components/
│   ├── landing/        # Landing page sections
│   ├── quiz/           # Quiz components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── test/               # Test files
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/quiz/mouse` | Mouse recommendation quiz |
| `/quiz/audio` | Audio equipment quiz |

## License

This project is private and not licensed for public use.
