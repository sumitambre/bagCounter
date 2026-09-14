// ---------------------------------------------------------------------------
// CEMENTFLOW – DEMO MOCK DATA
// Realistic cement bag counting and transfer monitoring data.
// Replace with actual JSON data when available.
// ---------------------------------------------------------------------------

// ---- Dashboard KPIs -------------------------------------------------------
export const KPIS = [
  { label: 'Total Bags Transferred', value: 1847, suffix: '', tone: 'neutral', trend: '+12% vs yesterday', trendUp: true },
  { label: 'Bags In (Loading)', value: 962, suffix: '', tone: 'green', trend: '52.1% of total', trendUp: true },
  { label: 'Bags Out (Dispatch)', value: 885, suffix: '', tone: 'amber', trend: '47.9% of total', trendUp: true },
];

// ---- Transfer Events (recent bag movements) --------------------------------
export const TRANSFER_EVENTS = [
  { id: 'TRF-001', timestamp: '2026-09-12 23:32:14', direction: 'IN', count: 3, confidence: 98.5, truck: 'Truck A-17', worker: 'Bay 1' },
  { id: 'TRF-002', timestamp: '2026-09-12 23:31:48', direction: 'OUT', count: 2, confidence: 97.1, truck: 'Truck B-04', worker: 'Bay 2' },
  { id: 'TRF-003', timestamp: '2026-09-12 23:30:22', direction: 'IN', count: 5, confidence: 99.3, truck: 'Truck A-17', worker: 'Bay 1' },
  { id: 'TRF-004', timestamp: '2026-09-12 23:29:51', direction: 'OUT', count: 1, confidence: 96.8, truck: 'Truck C-09', worker: 'Bay 3' },
  { id: 'TRF-005', timestamp: '2026-09-12 23:28:33', direction: 'IN', count: 4, confidence: 98.9, truck: 'Truck A-17', worker: 'Bay 1' },
  { id: 'TRF-006', timestamp: '2026-09-12 23:27:10', direction: 'OUT', count: 3, confidence: 99.1, truck: 'Truck B-04', worker: 'Bay 2' },
  { id: 'TRF-007', timestamp: '2026-09-12 23:25:44', direction: 'IN', count: 2, confidence: 97.5, truck: 'Truck D-22', worker: 'Bay 1' },
  { id: 'TRF-008', timestamp: '2026-09-12 23:24:18', direction: 'OUT', count: 6, confidence: 98.7, truck: 'Truck C-09', worker: 'Bay 3' },
  { id: 'TRF-009', timestamp: '2026-09-12 23:22:55', direction: 'IN', count: 3, confidence: 99.0, truck: 'Truck A-17', worker: 'Bay 1' },
  { id: 'TRF-010', timestamp: '2026-09-12 23:21:30', direction: 'OUT', count: 4, confidence: 98.2, truck: 'Truck B-04', worker: 'Bay 2' },
];

// ---- Transfer Sessions (for detail/inspection view) -------------------------
export const SESSIONS = [
  {
    id: 'SES-101',
    truck: 'Truck A-17',
    bay: 'Loading Bay 1',
    startTime: '2026-09-12 22:00:00',
    endTime: '2026-09-12 23:35:00',
    bagsIn: 142,
    bagsOut: 0,
    status: 'Active',
    confidence: 98.7,
    boxes: [
      { label: 'Cement Bag', confidence: 98, x: 32, y: 45, width: 12, height: 18 },
      { label: 'Cement Bag', confidence: 97, x: 55, y: 40, width: 11, height: 17 },
      { label: 'Cement Bag', confidence: 96, x: 18, y: 52, width: 13, height: 16 },
    ],
  },
  {
    id: 'SES-102',
    truck: 'Truck B-04',
    bay: 'Loading Bay 2',
    startTime: '2026-09-12 21:30:00',
    endTime: '2026-09-12 23:10:00',
    bagsIn: 0,
    bagsOut: 218,
    status: 'Completed',
    confidence: 99.1,
    boxes: [
      { label: 'Cement Bag', confidence: 99, x: 40, y: 38, width: 14, height: 20 },
      { label: 'Cement Bag', confidence: 98, x: 62, y: 44, width: 12, height: 17 },
    ],
  },
  {
    id: 'SES-103',
    truck: 'Truck C-09',
    bay: 'Loading Bay 3',
    startTime: '2026-09-12 20:45:00',
    endTime: '2026-09-12 22:55:00',
    bagsIn: 95,
    bagsOut: 87,
    status: 'Completed',
    confidence: 97.8,
    boxes: [],
  },
];

// ---- Hourly Bag Count Trend (for Analytics) --------------------------------
export const HOURLY_TREND = [
  { hour: '6AM', bagsIn: 45, bagsOut: 32 },
  { hour: '8AM', bagsIn: 78, bagsOut: 65 },
  { hour: '10AM', bagsIn: 112, bagsOut: 98 },
  { hour: '12PM', bagsIn: 95, bagsOut: 88 },
  { hour: '2PM', bagsIn: 134, bagsOut: 120 },
  { hour: '4PM', bagsIn: 156, bagsOut: 142 },
  { hour: '6PM', bagsIn: 128, bagsOut: 115 },
  { hour: '8PM', bagsIn: 89, bagsOut: 78 },
  { hour: '10PM', bagsIn: 62, bagsOut: 55 },
];

// ---- Transfer Direction Distribution (for donut chart) ---------------------
export const DIRECTION_MIX = [
  { label: 'Loading (In)', value: 52, color: '#d97706' },
  { label: 'Dispatch (Out)', value: 48, color: '#0f2544' },
];

// ---- Detection Accuracy Trend (weekly) -------------------------------------
export const ACCURACY_TREND = [
  { week: 'W1', accuracy: 94.5 },
  { week: 'W2', accuracy: 95.8 },
  { week: 'W3', accuracy: 96.2 },
  { week: 'W4', accuracy: 97.4 },
  { week: 'W5', accuracy: 98.1 },
  { week: 'W6', accuracy: 99.2 },
];

// ---- Daily Summary (for Analytics hero stats) ------------------------------
export const DAILY_SUMMARY = {
  totalToday: 1847,
  totalThisWeek: 11420,
  totalThisMonth: 48650,
  avgPerHour: 205,
  peakHour: '4PM',
  peakCount: 298,
  activeLines: 3,
  activeTrucks: 4,
};
