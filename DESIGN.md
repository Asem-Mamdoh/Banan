# Design System Specification: The Architectural Curator

## 1. Overview & Creative North Star: "The Architectural Curator"
This design system is engineered to transcend the "template" look of commercial real estate. It is built upon the philosophy of **"The Architectural Curator"**—a digital experience that mirrors the precision of modern architecture and the sensory richness of Omani heritage. 

We reject the standard grid in favor of **Intentional Asymmetry** and **Editorial Scale**. The system utilizes generous white space not as "empty room," but as a luxury material itself. By layering high-contrast typography against a warm, stone-like palette, we create an environment that feels authoritative, bespoke, and permanent.

## 2. Color & Surface Strategy
The palette transitions from the deep, vastness of the Omani sea (`primary`) to the sun-bleached warmth of limestone (`surface`). 

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are strictly prohibited** for sectioning or containment. Boundaries must be defined through:
*   **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
*   **Tonal Transitions:** Utilizing `surface-variant` to subtly set apart a functional area.
*   **Whitespace:** Using the spacing scale to create invisible boundaries.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials (marble, glass, silk).
*   **Base:** `surface` (#faf9f5) serves as the canvas.
*   **Layer 1 (The Plinth):** Use `surface-container-low` (#f4f4f0) for large structural areas like property filters.
*   **Layer 2 (The Feature):** Use `surface-container-lowest` (#ffffff) for high-priority cards to create a "lifted" effect without heavy shadows.

### The Glass & Gradient Rule
To prevent the design from feeling "flat," use **Glassmorphism** for floating navigation bars or property detail overlays. 
*   **Token:** `surface` at 80% opacity + 20px backdrop-blur.
*   **Signature Textures:** Apply subtle linear gradients (e.g., `primary` to `primary-container`) on hero buttons to provide "soul" and depth.

## 3. Typography: Editorial Authority
The type system pairs the structural precision of **Manrope** for headlines with the approachable sophistication of **Plus Jakarta Sans** for body text.

*   **Display (Manrope):** Used for property names and brand statements. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create a "bold architectural" footprint.
*   **Headline (Manrope):** All headlines should be `on-surface` (#1b1c1a). Use `headline-lg` for section headers, always paired with a `label-md` "kicker" in `secondary` (#735c00) for an editorial touch.
*   **Body (Plus Jakarta Sans):** Optimized for high-end readability. Use `body-lg` (1rem) for descriptions to ensure a premium, easy-on-the-eyes experience.

## 4. Elevation & Depth: Tonal Layering
Traditional "drop shadows" are replaced by **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural, soft lift.
*   **Ambient Shadows:** Where floating elements (like a "Contact Agent" FAB) are required, use extra-diffused shadows:
    *   *Blur:* 40px | *Opacity:* 6% | *Color:* Tinted with `on-surface`.
*   **The Ghost Border:** If a boundary is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.

## 5. Components & Signature Patterns

### Buttons (The Statement)
*   **Primary:** `primary` background with `on-primary` text. Shape: `sm` (0.125rem) for a sharp, professional edge.
*   **Secondary (The Gold Standard):** `secondary` (#735c00) text with a `secondary-fixed-dim` subtle underline. No container.
*   **Interaction:** On hover, primary buttons should slightly expand in width (2-4px) rather than just changing color, mimicking a physical "growth."

### Cards & Property Listings
*   **Rule:** Forbid divider lines. 
*   **Layout:** Use an asymmetrical "bleed" where the property image extends to the top and sides of the card, while the text sits on a `surface-container-lowest` base with generous internal padding (2rem).

### Input Fields
*   **Style:** Minimalist under-line style or a subtle `surface-container-high` fill. 
*   **Active State:** The label should animate into a `label-sm` in `secondary` (Gold) to signal focus without using harsh blue outlines.

### Chips & Filters
*   **Selection Chips:** Use `primary-container` for active states. Use `surface-variant` for inactive. Avoid borders; use background fills only.

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Offset images from text blocks to create a dynamic, curated flow.
*   **Use High-Contrast Scaling:** Pair a massive `display-lg` headline with a tiny, all-caps `label-sm` for a luxury magazine aesthetic.
*   **Respect the "Warmth":** Always use the warm off-white `surface` (#faf9f5). Pure white (#ffffff) should only be used for the most elevated "lowest" surface containers.

### Don’t:
*   **Don't use 1px borders:** They look "cheap" and digital. Use color shifts.
*   **Don't use pure black:** Use `tertiary` (#2f2f2f) or `on-surface` (#1b1c1a) for text to maintain the soft, high-end feel.
*   **Don't crowd the content:** If a section feels full, add 40px of vertical padding. Luxury is space.
