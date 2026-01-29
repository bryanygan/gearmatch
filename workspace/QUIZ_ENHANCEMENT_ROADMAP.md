# Quiz Enhancement Roadmap

A comprehensive plan for creating deeper, more accurate quizzes that leverage the full product data while keeping users engaged.

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Untapped Product Data](#untapped-product-data)
3. [New Question Ideas by Category](#new-question-ideas-by-category)
4. [Adaptive Quiz Architecture](#adaptive-quiz-architecture)
5. [UX Strategies for Longer Quizzes](#ux-strategies-for-longer-quizzes)
6. [Implementation Roadmap](#implementation-roadmap)

---

## Current State Analysis

### Mouse Quiz (5 questions)
| Question | Data Used | Scoring Weight |
|----------|-----------|----------------|
| Hand size | `mouse_size_class`, feel tags | 20% |
| Grip style | `mouse_grip_fit` | 25% |
| Weight preference | `mouse_weight_class`, `mouse_weight_g` | 20% |
| Wireless/wired | `wireless`, `connection_type` | 15% |
| Primary use | `mouse_game_fit` | 15% |

### Audio Quiz (5 questions)
| Question | Data Used | Scoring Weight |
|----------|-----------|----------------|
| Primary use | `audio_competitive_fps`, `audio_immersion` | 25% |
| Form factor | `audio_type`, `audio_open_back` | 20% |
| Mic needs | `audio_has_mic`, `audio_mic_quality` | 15% |
| Session length | `audio_comfort` | 20% |
| Budget | `price_tier`, `price_range_usd` | 15% |

### Keyboard Quiz (7 questions)
| Question | Data Used | Scoring Weight |
|----------|-----------|----------------|
| Primary use | `keyboard_use_fit`, scores | 25% |
| Form factor | `keyboard_form_factor` | 20% |
| Switch type | `keyboard_switch_feel`, `keyboard_hot_swappable` | 15% |
| Gaming features | `keyboard_supports_rapid_trigger`, `keyboard_supports_socd`, polling rate | 15% |
| Connectivity | `wireless`, `connection_type` | 15% |
| Priority feature | Latency, noise, mount style, customization features | 10% |
| Budget | `price_range_usd`, `keyboard_value_pick` | 10% |

---

## Untapped Product Data

### Mouse - Currently Unused Attributes

| Attribute | Potential Question | Value |
|-----------|-------------------|-------|
| `mouse_handedness` | Right/Left/Ambi preference | Eliminates incompatible shapes |
| `mouse_shape_profile` | Hump preference (low/mid/high/rear) | Better shape matching |
| `mouse_coating` | Surface finish preference | Grip feel preference |
| `mouse_button_count_class` | Need for extra buttons | MMO vs FPS differentiation |
| `mouse_scroll_features` | Scroll wheel features needed | Productivity users |
| `mouse_sensor_class` | Performance tier preference | Budget vs enthusiast |
| `mouse_polling_rate_max_hz` | Polling rate importance | Competitive gamers |
| `mouse_click_latency_ms` | Click latency sensitivity | Pro players |
| `mouse_feet_quality` | Glide quality importance | Enthusiasts |
| `mouse_build_quality` | Build quality priority | Durability needs |
| `mouse_feel_tags` | Specific feel preferences | Niche matching |
| `platform_fit` | Platform compatibility | Console gamers |
| `software_support` | Software importance | Customization needs |
| `battery_life_hr` | Battery life importance | Wireless users |

### Audio - Currently Unused Attributes

| Attribute | Potential Question | Value |
|-----------|-------------------|-------|
| `audio_sound_signature` | Sound preference (warm/bright/neutral/V-shaped) | Huge for audiophiles |
| `audio_isolation` | Noise isolation needs | Office/travel use |
| `audio_anc` | ANC requirement | Travel/office |
| `audio_driver_type` | Driver preference (dynamic/planar) | Enthusiasts |
| `audio_needs_amp` | Has amp/DAC setup | High-impedance matching |
| `audio_impedance_ohm` | Driving capability | Source matching |
| `audio_wireless_codec_support` | Codec requirements | Android/iOS users |
| `audio_virtual_surround` | Spatial audio needs | Gaming |
| `audio_weight_g` | Weight sensitivity | Comfort |
| `audio_repairability` | Longevity concerns | Value-focused users |
| `platform_fit` | Platform (PC/Console/Mobile) | Compatibility |
| `eq_support` | EQ customization | Sound tweakers |
| `latency_class` | Latency sensitivity | Gaming |

### Keyboard - Currently Unused Attributes

| Attribute | Potential Question | Value |
|-----------|-------------------|-------|
| `keyboard_switch_type` | Technology preference (mechanical/magnetic/optical) | Enthusiast feature |
| `keyboard_switch_name` | Specific switch preference | Deep customization |
| `keyboard_output_type` | Analog output needs | Racing/flight sim |
| `keyboard_case_material` | Material preference | Build quality/weight |
| `keyboard_mount_style` | Mount preference (gasket/tray) | Typing feel |
| `keyboard_keycap_material` | Keycap preference (PBT/ABS) | Durability/feel |
| `keyboard_keycap_profile` | Profile preference | Typing ergonomics |
| `keyboard_has_knob` | Media controls needed | Productivity |
| `keyboard_macro_key_count` | Macro keys needed | Power users |
| `keyboard_supports_analog` | Analog input needed | Specific games |
| `keyboard_has_onboard_memory` | Profile portability | Multi-system use |
| `keyboard_nkro` | N-key rollover importance | Gaming |
| `keyboard_typing_noise_dba` | Noise tolerance | Office use |
| `keyboard_weight_g` | Portability needs | Travel |
| `platform_fit` | Platform compatibility | Mac/Console users |

---

## New Question Ideas by Category

### Mouse Quiz - Expanded Questions

#### Essential Additions (High Impact)

**1. Hand Preference**
```
Which hand do you use for your mouse?
- Right hand (most common)
- Left hand (need left-handed or ambidextrous)
- I switch between hands (need ambidextrous)
```
*Impact: Immediately filters out incompatible products*

**2. Shape Profile Preference**
```
What mouse shape feels best to you?
[Show visual diagrams]
- Low, flat profile (fingertip control)
- Medium hump in center (versatile)
- High hump toward back (palm support)
- Ergonomic/angled (wrist comfort)
- Not sure / show me options
```
*Impact: Uses `mouse_shape_profile` for precise shape matching*

**3. Button Requirements**
```
How many buttons do you need?
- Minimal (just the essentials: L/R click, scroll, maybe 2 side buttons)
- Standard (6-8 buttons for common shortcuts)
- Lots (I play MMOs or use many macros)
- MMO Grid (12+ thumb buttons)
```
*Impact: Uses `mouse_button_count_class` and `mouse_game_fit`*

**4. Surface Finish**
```
What surface finish do you prefer?
- Matte (fingerprint resistant, common)
- Glossy (grippy when hands are dry)
- Rubberized/textured (maximum grip)
- No preference
```
*Impact: Uses `mouse_coating`*

#### Advanced/Optional Questions

**5. Gaming Genre** (conditional - if precision selected)
```
What games do you mainly play?
- FPS / Tactical shooters (precision aim)
- MOBA (League, Dota - lots of clicking)
- MMO (WoW, FFXIV - many abilities)
- RTS / Strategy (macro control)
- Mix of genres
```
*Impact: Fine-tunes `mouse_game_fit` matching*

**6. Scroll Wheel Features** (conditional - if productivity/creative)
```
Do you need special scroll features?
- Standard scroll is fine
- Tilt scroll (horizontal scrolling)
- Free-spinning/infinite scroll (long documents)
- Thumb wheel (CAD/timeline scrubbing)
```
*Impact: Uses `mouse_scroll_features`*

**7. Platform**
```
What platform(s) will you use this mouse on?
- PC only
- PC + PlayStation
- PC + Xbox
- Mac
- Multiple platforms
```
*Impact: Uses `platform_fit`*

**8. Performance Tier** (conditional - if competitive/precision)
```
How important is peak performance?
- Maximum performance (flagship sensor, lowest latency)
- Great performance (high-end, proven reliability)
- Good enough (mid-range, good value)
- Doesn't matter much
```
*Impact: Uses `mouse_sensor_class`, `latency_class`*

---

### Audio Quiz - Expanded Questions

#### Essential Additions (High Impact)

**1. Sound Signature Preference**
```
What sound do you prefer? (Don't worry if unsure)
- Neutral/Flat (accurate, studio-like)
- Warm (emphasized bass, smooth highs)
- Bright (crisp highs, detailed)
- V-Shaped (boosted bass AND treble, fun sound)
- Bassy (deep, punchy low end)
- Not sure / let me hear options
```
*Impact: Uses `audio_sound_signature` - major differentiator*

**2. Noise Environment**
```
Where will you mainly use these?
- Quiet home office (isolation not critical)
- Shared space / office (need isolation)
- Commute / travel (need strong isolation or ANC)
- Gaming room (isolation helps immersion)
```
*Impact: Uses `audio_isolation`, `audio_anc`*

**3. Wireless Requirements** (currently missing)
```
Wireless or wired?
- Wireless essential (hate cables)
- Wireless preferred (but wired OK)
- Wired preferred (no charging, reliability)
- No preference
```
*Impact: Uses `wireless`, `connection_type`*

#### Advanced/Optional Questions

**4. Audio Source Setup**
```
What will you plug these into?
- PC/Mac directly (USB or 3.5mm)
- Phone/tablet
- Game console (PS5, Xbox, Switch)
- I have a DAC/Amp
- Multiple sources
```
*Impact: Uses `audio_needs_amp`, `audio_impedance_ohm`, `platform_fit`*

**5. Driver Preference** (conditional - enthusiast budget)
```
Any driver technology preference?
- Dynamic (punchy, common)
- Planar magnetic (detailed, fast)
- Balanced armature (precise, IEMs)
- Don't know / no preference
```
*Impact: Uses `audio_driver_type`*

**6. Bluetooth Codec** (conditional - if wireless + mobile)
```
Do you need specific Bluetooth codecs?
- aptX / aptX HD (Android high quality)
- LDAC (Sony, highest quality)
- AAC (Apple devices)
- Don't know / standard is fine
```
*Impact: Uses `audio_wireless_codec_support`*

**7. Spatial Audio**
```
Do you want virtual surround / spatial audio?
- Yes, for gaming (footstep positioning)
- Yes, for movies (immersive)
- No, prefer stereo
- Don't know
```
*Impact: Uses `audio_virtual_surround`*

**8. Repairability/Longevity**
```
How important is long-term durability?
- Very - I want replaceable parts
- Somewhat - should last a few years
- Not important - I upgrade often
```
*Impact: Uses `audio_repairability`*

---

### Keyboard Quiz - Expanded Questions

#### Essential Additions (High Impact)

**1. Switch Technology** (deeper than switch feel)
```
What switch technology interests you?
- Standard mechanical (proven, variety of feels)
- Magnetic/Hall Effect (adjustable actuation, Rapid Trigger)
- Optical (fast actuation, durability)
- Don't know / recommend based on my needs
```
*Impact: Uses `keyboard_switch_type` for better matching*

**2. Keycap Preferences**
```
Do you have keycap preferences?
- PBT (durable, textured, won't shine)
- ABS (smooth, can shine over time, vibrant colors)
- Don't know / no preference
```
*Impact: Uses `keyboard_keycap_material`*

**3. Build Material**
```
What case material do you prefer?
- Plastic (lightweight, budget-friendly)
- Aluminum (premium feel, heavier)
- Don't care / whatever sounds best
```
*Impact: Uses `keyboard_case_material`*

**4. Media Controls**
```
Do you need dedicated media controls?
- Yes, volume knob/wheel is essential
- Nice to have but not required
- No, I use shortcuts
```
*Impact: Uses `keyboard_has_knob`, feature tags*

#### Advanced/Optional Questions

**5. Analog Input** (conditional - if casual gaming)
```
Do you need analog input for games?
- Yes (racing games, flight sims - variable speed)
- No (standard on/off is fine)
- What's that?
```
*Impact: Uses `keyboard_supports_analog`, `keyboard_output_type`*

**6. Portability**
```
Will you travel with this keyboard?
- Yes, frequently (need compact + lightweight)
- Sometimes (reasonable size OK)
- No, stays on my desk
```
*Impact: Uses `keyboard_weight_g`, `keyboard_form_factor`*

**7. Platform Compatibility**
```
What OS/platforms do you use?
- Windows only
- Mac (need Mac layout/compatibility)
- Linux (QMK/VIA support helpful)
- Multiple / cross-platform
```
*Impact: Uses `platform_fit`, `keyboard_feature_tags` for QMK/VIA*

**8. Specific Switch Feel** (conditional - if enthusiast)
```
Any specific switches you want?
[Dynamic list based on available products]
- Gateron (smooth linears)
- Cherry MX (proven reliability)
- Magnetic/Wooting-style
- Let me try different options (hot-swap)
```
*Impact: Uses `keyboard_switch_name`, `keyboard_hot_swappable`*

**9. Profile Portability**
```
Do you need to save settings on the keyboard?
- Yes, I use multiple PCs
- No, I always use the same computer
- What does this mean?
```
*Impact: Uses `keyboard_has_onboard_memory`*

---

## Adaptive Quiz Architecture

### The Problem with Long Quizzes
Users drop off when quizzes feel:
- Too long (fatigue)
- Irrelevant (asking about things they don't care about)
- Confusing (technical jargon they don't understand)

### Solution: Conditional Question Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    QUIZ START                                │
├─────────────────────────────────────────────────────────────┤
│  Core Questions (everyone answers)                          │
│  └── 3-5 fundamental questions                              │
├─────────────────────────────────────────────────────────────┤
│  Branch Point: User Intent Detection                        │
│  ├── "Quick Match" → Skip to results (uses defaults)        │
│  ├── "Help Me Decide" → Standard flow                       │
│  └── "I Know What I Want" → Expert flow                     │
├─────────────────────────────────────────────────────────────┤
│  Conditional Questions (based on previous answers)          │
│  └── Only show relevant follow-ups                          │
├─────────────────────────────────────────────────────────────┤
│  Optional Deep Dive                                         │
│  └── "Want more precise results? Answer 3 more questions"   │
└─────────────────────────────────────────────────────────────┘
```

### Question Dependencies Map

#### Mouse Quiz Flow
```
hand-size ─────────────────────────────────────────► ALWAYS
grip-style ────────────────────────────────────────► ALWAYS
handedness ────────────────────────────────────────► ALWAYS (new)
     │
     └─► IF left-handed → filter to ambi/left mice

primary-use ───────────────────────────────────────► ALWAYS
     │
     ├─► IF precision/gaming:
     │       └─► gaming-genre ──────────────────────► CONDITIONAL
     │       └─► performance-tier ──────────────────► CONDITIONAL
     │
     ├─► IF productivity/creative:
     │       └─► scroll-features ───────────────────► CONDITIONAL
     │       └─► button-count ──────────────────────► CONDITIONAL
     │
     └─► IF MMO selected in gaming-genre:
             └─► Boost MMO mice significantly

weight-preference ─────────────────────────────────► ALWAYS
wireless ──────────────────────────────────────────► ALWAYS
     │
     └─► IF wireless:
             └─► battery-importance ────────────────► OPTIONAL

shape-profile ─────────────────────────────────────► OPTIONAL (advanced)
surface-finish ────────────────────────────────────► OPTIONAL (advanced)
platform ──────────────────────────────────────────► OPTIONAL
```

#### Audio Quiz Flow
```
primary-use ───────────────────────────────────────► ALWAYS
     │
     ├─► IF competitive:
     │       └─► latency-sensitivity ───────────────► CONDITIONAL
     │       └─► spatial-audio ─────────────────────► CONDITIONAL
     │
     └─► IF streaming:
             └─► mic-quality becomes CRITICAL

form-factor ───────────────────────────────────────► ALWAYS
     │
     ├─► IF over-ear headphone (audiophile):
     │       └─► sound-signature ───────────────────► ESSENTIAL
     │       └─► driver-type ───────────────────────► OPTIONAL
     │       └─► amp-setup ─────────────────────────► CONDITIONAL
     │
     └─► IF IEM:
             └─► isolation-needs ───────────────────► ESSENTIAL

wireless ──────────────────────────────────────────► NEW (ALWAYS)
     │
     └─► IF wireless + mobile:
             └─► bluetooth-codecs ──────────────────► CONDITIONAL

mic-needs ─────────────────────────────────────────► ALWAYS
session-length ────────────────────────────────────► ALWAYS
noise-environment ─────────────────────────────────► NEW (CONDITIONAL)
budget ────────────────────────────────────────────► ALWAYS
sound-signature ───────────────────────────────────► NEW (ESSENTIAL for audiophile path)
```

#### Keyboard Quiz Flow
```
primary-use ───────────────────────────────────────► ALWAYS
     │
     ├─► IF competitive-gaming:
     │       └─► gaming-features (RT/SOCD) ─────────► ESSENTIAL
     │       └─► switch-technology (magnetic) ──────► RECOMMENDED
     │
     ├─► IF programming/typing:
     │       └─► typing-feel ───────────────────────► ESSENTIAL
     │       └─► noise-level ───────────────────────► CONDITIONAL
     │
     └─► IF productivity:
             └─► media-controls ────────────────────► CONDITIONAL
             └─► numpad (form-factor) ──────────────► WEIGHTED

form-factor ───────────────────────────────────────► ALWAYS
switch-feel ───────────────────────────────────────► ALWAYS
     │
     └─► IF enthusiast budget + tactile/linear:
             └─► specific-switch ───────────────────► OPTIONAL

connectivity ──────────────────────────────────────► ALWAYS
     │
     └─► IF wireless:
             └─► multi-device ──────────────────────► CONDITIONAL

budget ────────────────────────────────────────────► ALWAYS
     │
     └─► IF enthusiast ($250+):
             └─► keycap-material ───────────────────► CONDITIONAL
             └─► build-material ────────────────────► CONDITIONAL
             └─► mount-style ───────────────────────► CONDITIONAL

platform ──────────────────────────────────────────► CONDITIONAL (if Mac mentioned)
portability ───────────────────────────────────────► OPTIONAL
```

---

## UX Strategies for Longer Quizzes

### 1. Quiz Modes

Offer users a choice at the start:

```
┌─────────────────────────────────────────────────────────────┐
│  How much help do you need?                                 │
├─────────────────────────────────────────────────────────────┤
│  ⚡ Quick Match (2 min)                                      │
│     5 essential questions, solid recommendations            │
│                                                             │
│  🎯 Personalized (4 min)                                    │
│     10+ questions, highly tailored results                  │
│                                                             │
│  🔧 Expert Mode (6 min)                                     │
│     Deep dive, every preference counts                      │
└─────────────────────────────────────────────────────────────┘
```

### 2. Progress Transparency

Show users exactly where they are and what's coming:

```
┌─────────────────────────────────────────────────────────────┐
│  [████████░░░░░░░░░░░░] Step 4 of 10                       │
│                                                             │
│  ✓ Basics (3)  →  Features (2)  →  Preferences (3)  →  ✓   │
│                        ↑                                    │
│                   You are here                              │
└─────────────────────────────────────────────────────────────┘
```

### 3. Smart Defaults & Skip Options

Every question should have an escape hatch:

```
┌─────────────────────────────────────────────────────────────┐
│  What sound signature do you prefer?                        │
│                                                             │
│  [Neutral]  [Warm]  [V-Shaped]  [Bassy]                    │
│                                                             │
│  └─► [Not sure - recommend for me] ◄── Always provide this │
│  └─► [Skip - not important to me]  ◄── Let users opt out   │
└─────────────────────────────────────────────────────────────┘
```

### 4. Visual Aids & Education

For technical questions, show don't tell:

```
┌─────────────────────────────────────────────────────────────┐
│  What mouse shape feels best?                               │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  ___    │  │   ___   │  │    __   │  │   /\    │       │
│  │ /   \   │  │  /   \  │  │   /  \  │  │  /  \   │       │
│  │/     \  │  │ /     \ │  │  /    \ │  │ |    |  │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│    Low/Flat    Mid-Hump    Rear-Hump    Ergonomic          │
└─────────────────────────────────────────────────────────────┘
```

### 5. Micro-Rewards & Engagement

Make progress feel rewarding:

```
After every 3 questions:
┌─────────────────────────────────────────────────────────────┐
│  🎯 Nice! Based on your answers so far...                   │
│                                                             │
│  We've narrowed it down to 23 great matches                 │
│  Your profile: Competitive FPS gamer, claw grip             │
│                                                             │
│  [Continue for more precision] [See results now]            │
└─────────────────────────────────────────────────────────────┘
```

### 6. "Why This Question?" Tooltips

Help users understand relevance:

```
┌─────────────────────────────────────────────────────────────┐
│  What keycap material do you prefer?                        │
│                                                      [?]    │
│                                                             │
│  Tooltip: PBT keycaps are more durable and won't develop   │
│  a shiny texture over time. ABS can feel smoother but      │
│  wears faster. This helps us match keyboards that'll       │
│  feel great for years.                                      │
└─────────────────────────────────────────────────────────────┘
```

### 7. Comparison Preview (Audio Specific)

For subjective questions like sound signature:

```
┌─────────────────────────────────────────────────────────────┐
│  What sound signature do you prefer?                        │
│                                                             │
│  [▶ Play Neutral sample]                                   │
│  [▶ Play Warm sample]                                      │
│  [▶ Play V-Shaped sample]                                  │
│                                                             │
│  🎵 These are 10-second clips showing the difference        │
└─────────────────────────────────────────────────────────────┘
```

### 8. Answer Confidence Weighting

Let users express uncertainty:

```
┌─────────────────────────────────────────────────────────────┐
│  What weight do you prefer?                                 │
│                                                             │
│  [Ultralight] [Light] [Medium] [Heavy]                     │
│                                                             │
│  How sure are you?                                          │
│  ○ Very sure (I've tried many mice)                        │
│  ● Somewhat sure                                            │
│  ○ Just guessing (weight won't affect scoring much)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

**Goal:** Create the infrastructure for conditional questions and quiz modes

1. **Refactor Quiz State Management**
   - Create a `QuizEngine` class/hook that manages:
     - Question dependency graph
     - Dynamic question ordering
     - Answer-based branching logic
   - Store quiz mode selection

2. **Update Question Schema**
   ```typescript
   interface QuizQuestion {
     id: string;
     title: string;
     subtitle: string;
     multiSelect?: boolean;
     options: QuizOption[];
     // New fields
     showWhen?: (answers: Record<string, any>) => boolean;
     category?: 'core' | 'standard' | 'advanced';
     importance?: 'essential' | 'recommended' | 'optional';
     helpText?: string;
     visualType?: 'cards' | 'images' | 'slider' | 'grid';
   }
   ```

3. **Create Quiz Mode Selector Component**
   - Quick / Personalized / Expert modes
   - Persist preference for return users

### Phase 2: New Questions (Week 3-4)

**Goal:** Add high-impact questions to each quiz

1. **Mouse Quiz Additions**
   - Handedness (essential - filters incompatible)
   - Shape profile (with visual diagrams)
   - Gaming genre (conditional)
   - Button requirements (conditional)

2. **Audio Quiz Additions**
   - Sound signature (essential for audiophiles)
   - Wireless preference (currently missing!)
   - Noise environment / isolation needs
   - Audio source setup (conditional)

3. **Keyboard Quiz Additions**
   - Switch technology (mechanical vs magnetic vs optical)
   - Media controls preference
   - Keycap material (conditional on budget)
   - Platform compatibility

### Phase 3: Scoring Updates (Week 5)

**Goal:** Update scoring rules to use new data points

1. **Update Type Definitions**
   - Add new answer types to `MouseQuizAnswers`, `AudioQuizAnswers`, `KeyboardQuizAnswers`
   - Update validation schemas

2. **Create New Scoring Rules**
   - `handednessRule` for mice
   - `shapeProfileRule` for mice
   - `soundSignatureRule` for audio
   - `switchTechnologyRule` for keyboards

3. **Adjust Scoring Weights**
   - Rebalance weights to incorporate new factors
   - Implement confidence-based weight adjustment

### Phase 4: UX Enhancements (Week 6-7)

**Goal:** Make longer quizzes feel shorter and more engaging

1. **Progress Enhancements**
   - Category-based progress (Basics → Features → Preferences)
   - Estimated time remaining
   - "X products match so far" counter

2. **Visual Question Types**
   - Image-based options for shape/form factor
   - Slider for continuous values (budget range)
   - Grid selection for multi-factor (genre + use case matrix)

3. **Help System**
   - "Why this question?" tooltips
   - "Not sure" option with smart defaults
   - Skip option with neutral scoring

4. **Micro-Rewards**
   - Checkpoint summaries every 3-4 questions
   - "Early exit" option with current best matches
   - Profile summary before results

### Phase 5: Advanced Features (Week 8+)

**Goal:** Polish and optimize

1. **Answer Confidence System**
   - Let users express certainty
   - Adjust scoring weights based on confidence
   - Show "we're less sure about X" in results

2. **A/B Testing Infrastructure**
   - Track completion rates by quiz length
   - Test question ordering impact
   - Measure result satisfaction

3. **Personalization**
   - Remember returning users' preferences
   - "Update my profile" vs "Start fresh"
   - Cross-category preference inference

4. **Audio Samples** (Audio Quiz)
   - Embed sound signature comparison clips
   - "Test your hearing" fun mini-quiz

---

## Technical Considerations

### State Management for Complex Flows

```typescript
interface QuizState {
  mode: 'quick' | 'standard' | 'expert';
  currentQuestionId: string;
  answers: Record<string, QuizAnswer>;
  questionHistory: string[]; // For back navigation
  skippedQuestions: string[];
  matchCount: number; // Products that match so far
  startTime: Date;
}

interface QuizAnswer {
  value: string | string[];
  confidence?: 'high' | 'medium' | 'low';
  skipped?: boolean;
}
```

### Question Dependency Resolution

```typescript
function getNextQuestion(
  allQuestions: QuizQuestion[],
  answers: Record<string, QuizAnswer>,
  mode: QuizMode
): QuizQuestion | null {
  const availableQuestions = allQuestions.filter(q => {
    // Check if question should be shown based on mode
    if (mode === 'quick' && q.category !== 'core') return false;
    if (mode === 'standard' && q.category === 'advanced') return false;

    // Check if already answered
    if (answers[q.id]) return false;

    // Check conditional visibility
    if (q.showWhen && !q.showWhen(answers)) return false;

    return true;
  });

  // Sort by importance, then by natural order
  return availableQuestions.sort((a, b) => {
    const importanceOrder = { essential: 0, recommended: 1, optional: 2 };
    return importanceOrder[a.importance] - importanceOrder[b.importance];
  })[0] || null;
}
```

### URL Parameter Strategy for New Answers

Current format: `?grip-style=palm,claw&weight=light`

Extended format with confidence:
```
?grip-style=palm,claw&grip-style-conf=high&weight=light&weight-conf=low
```

Or use a compressed JSON approach for complex state:
```
?q=eyJncmlwIjpbInBhbG0iLCJjbGF3Il0sIndlaWdodCI6ImxpZ2h0In0
```

---

## Metrics to Track

1. **Completion Rate** - % of users who finish the quiz
2. **Time to Complete** - Average duration by mode
3. **Drop-off Points** - Which questions cause abandonment
4. **Result Satisfaction** - Post-result survey or click-through
5. **Return Rate** - Users who retake or modify answers
6. **Question Skip Rate** - Which questions are commonly skipped

---

## Summary

The key principles for better quizzes:

1. **Respect user time** - Offer quick/detailed modes
2. **Ask relevant questions** - Use conditional logic
3. **Leverage all your data** - Many attributes are unused
4. **Reduce cognitive load** - Visual aids, smart defaults
5. **Provide escape hatches** - "Not sure" and skip options
6. **Show progress** - Users should know why questions matter
7. **Iterate with data** - Track what works, optimize
