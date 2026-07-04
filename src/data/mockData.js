// ---------------------------------------------------------------------------
// DEMO MOCK DATA
// All values are fictional and safe to show.
//
// ➕ HOW TO ADD A NEW PAIR OF GLASSES:
//   1. Create a folder:  /public/images/<folder-name>/
//   2. Drop the photos:  front.jpg, side.jpg, hinge.jpg, temple.jpg
//      (any you don't have will show a clean labeled placeholder)
//   3. Copy one CLAIM block below, point `imageFolder` at your new folder,
//      list the `angles` you actually have photos for, and paste the defect
//      bounding box(es) into `boxes`.
//
// Bounding boxes use PERCENTAGES (0-100) of the image, so they scale to any
// size and toggle live. Paste the {x, y, width, height} you get from the AI.
// ---------------------------------------------------------------------------

export const ANGLES = ['Front', 'Side', 'Hinge', 'Temple'];

// Builds the image path for a claim + angle, e.g. "/images/screencrack/front.jpg".
// Set `ext: 'png'` on a claim if its photos are PNGs (defaults to jpg).
export function angleSrc(claim, angle) {
  return `${claim.imageFolder}/${angle.toLowerCase()}.${claim.ext || 'jpg'}`;
}

export const KPIS = [
  { label: 'Total Claims (Today)', value: 1240, suffix: '', tone: 'neutral', trend: '+8% vs yesterday', trendUp: true },
  { label: 'Pending Manual Review', value: 45, suffix: '', tone: 'amber', trend: '-12% vs yesterday', trendUp: false },
  { label: 'AI Auto-Processed', value: 1195, suffix: '', tone: 'green', trend: '96.4% of volume', trendUp: true },
  { label: 'Avg AI Confidence', value: 94.2, suffix: '%', tone: 'neutral', trend: '+1.3% this week', trendUp: true },
];

export const CLAIMS = [
  // ---- REAL ITEM #1 · Lens Crack (photos in /public/images/screencrack) ----
  {
    id: 'CLM-8821',
    date: '2026-07-04',
    customer: 'Rahul Sharma',
    model: 'Titan Acetate Round — Maroon',
    sku: 'T460-MRN-49',
    purchaseDate: 'Oct 12, 2025',
    defect: 'Lens Crack',
    part: 'Right Lens',
    status: 'Review Needed',
    confidence: 96,
    recommendation: 'REJECT',
    recommendationReason: 'Radial spider-web fracture consistent with a point impact — accidental damage, outside manufacturing warranty.',
    imageFolder: '/images/screencrack',
    angles: ['Front', 'Temple', 'Hinge'], // photos available for this item
    activeAngle: 'Front',
    boxes: {
      // Star-crack on the right lens (viewer's right). Nudge these % if needed.
      Front: [{ label: 'Lens Crack', confidence: 96, x: 68, y: 51, width: 19, height: 20 }],
      // Same crack seen from the back — now on the viewer's left lens.
      Temple: [{ label: 'Lens Crack', confidence: 95, x: 21, y: 37, width: 15, height: 18 }],
      Hinge: [],
    },
  },

  // ---- REAL ITEM #3 · Lens Scratch (photos in /public/images/screencrack2) -
  {
    id: 'CLM-8822',
    date: '2026-07-04',
    customer: 'Ananya Iyer',
    model: 'Titan Rectangle — Matte Black',
    sku: 'TSR0043-MBK-54',
    purchaseDate: 'Jan 08, 2026',
    defect: 'Lens Scratch',
    part: 'Left Lens',
    status: 'Review Needed',
    confidence: 98,
    recommendation: 'REJECT',
    recommendationReason: 'Surface abrasion consistent with daily handling — classified as non-warranty wear & tear.',
    imageFolder: '/images/screencrack2',
    angles: ['Front', 'Hinge'], // only two photos supplied for this item
    activeAngle: 'Front',
    boxes: {
      // Scratch on the viewer's-left lens (your AI-supplied coordinates).
      Front: [{ label: 'Scratch', confidence: 98, x: 27.5, y: 50.5, width: 6.6, height: 3.4 }],
      Hinge: [],
    },
  },

  // ---- CLEAN ITEM · Auto-Approved (add photos to /images/clean) ------------
  {
    id: 'CLM-8823',
    date: '2026-07-04',
    customer: 'Vikram Nair',
    model: 'Titan Titanium Rimless',
    sku: 'TT-441-GUN',
    purchaseDate: 'Mar 22, 2026',
    defect: 'None',
    part: '—',
    status: 'Auto-Approved',
    confidence: 99,
    recommendation: 'APPROVE',
    recommendationReason: 'No structural or surface anomalies detected across all four angles.',
    imageFolder: '/images/clean',
    angles: ['Front', 'Side', 'Hinge', 'Temple'],
    activeAngle: 'Front',
    boxes: { Front: [], Side: [], Hinge: [], Temple: [] },
  },

  // ---- REAL ITEM #2 · Hinge Bend (PNG photos in /public/images/hingebend) --
  {
    id: 'CLM-8824',
    date: '2026-07-04',
    customer: 'Priya Deshmukh',
    model: 'Titan Acetate Rectangle — Wine',
    sku: 'T292-WIN-52',
    purchaseDate: 'Dec 02, 2025',
    defect: 'Hinge Bend',
    part: 'Left Temple Arm',
    status: 'Review Needed',
    confidence: 88,
    recommendation: 'REVIEW',
    recommendationReason: 'Temple-arm deformation near the hinge — ambiguous between material fatigue and accidental force. Routed for human context.',
    imageFolder: '/images/hingebend',
    ext: 'png',
    angles: ['Side', 'Front', 'Back'], // labels now match the actual photos
    activeAngle: 'Side',
    boxes: {
      // Bend/kink in the lower temple arm — only visible from the side view.
      Side: [{ label: 'Hinge Bend', confidence: 88, x: 40, y: 57, width: 20, height: 15 }],
      Front: [],
      Back: [],
    },
  },

  // =========================================================================
  // SCAFFOLDED CASES · shows a clean placeholder until you add the photo, then
  // goes live automatically. For each: generate the image with the prompt,
  // drop it in the folder as <angle>.jpg, then replace the PLACEHOLDER box
  // coordinates with the AI-supplied {x, y, width, height}.
  //   To hide a case until it's ready, comment its block out.
  // =========================================================================

  // ---- REAL ITEM #4 · Coating Peel (photos in /public/images/coatingpeel) --
  {
    id: 'CLM-8826',
    date: '2026-07-04',
    customer: 'Sneha Reddy',
    model: 'Fastrack Aviator — Gunmetal',
    sku: 'FT-M1013-GUN',
    purchaseDate: 'Feb 25, 2025',
    defect: 'Coating Peel',
    part: 'Left Lens',
    status: 'Review Needed',
    confidence: 93,
    recommendation: 'REJECT',
    recommendationReason: 'Anti-reflective coating degradation consistent with age and cleaning wear — non-warranty.',
    imageFolder: '/images/coatingpeel',
    ext: 'png',
    angles: ['Front', 'Side'],
    activeAngle: 'Front',
    boxes: {
      // Peeled/cracked coating covering the viewer's-left lens.
      Front: [{ label: 'Coating Peel', confidence: 93, x: 12, y: 45, width: 33, height: 28 }],
      // Same coating damage visible on the lens edge from the side.
      Side: [{ label: 'Coating Peel', confidence: 89, x: 84, y: 46, width: 14, height: 21 }],
    },
  },
];

// ---- Analytics page data --------------------------------------------------

export const CLAIMS_TREND = [
  { day: 'Mon', claims: 980, auto: 928 },
  { day: 'Tue', claims: 1105, auto: 1051 },
  { day: 'Wed', claims: 1042, auto: 1003 },
  { day: 'Thu', claims: 1198, auto: 1152 },
  { day: 'Fri', claims: 1240, auto: 1195 },
  { day: 'Sat', claims: 1360, auto: 1318 },
  { day: 'Sun', claims: 1180, auto: 1142 },
];

export const DEFECT_MIX = [
  { label: 'No Defect', value: 71, color: '#00a651' },
  { label: 'Lens Scratch', value: 14, color: '#f59e0b' },
  { label: 'Lens Crack', value: 8, color: '#f43f5e' },
  { label: 'Temple / Hinge', value: 5, color: '#6366f1' },
  { label: 'Other', value: 2, color: '#94a3b8' },
];

export const ACCURACY_TREND = [
  { week: 'W1', accuracy: 82 },
  { week: 'W2', accuracy: 86 },
  { week: 'W3', accuracy: 89 },
  { week: 'W4', accuracy: 91 },
  { week: 'W5', accuracy: 93 },
  { week: 'W6', accuracy: 94.2 },
];
