// Accurate video detection and loading events derived directly from 0912.mov & detections (2).json

export const DEMO_VIDEO = {
  src: '/videos/0912_overlay_h264.mp4',
  gdriveSrc: 'https://drive.google.com/file/d/1kJWNR9RY6f3t6dthpYr8Wv8412kHE07S/preview',
  duration: 297.16, // 4m 57s (8915 frames @ 30fps)
  totalFrames: 8915,
  fps: 30,
  resolution: '1914 × 1080',
  truckId: 'Truck A-17',
  bay: 'Loading Bay 1 (Main Chute)',
  operator: 'Operator Ramesh K.',
  product: 'Cement 50kg Bags',
};

export const BAG_LOADING_EVENTS = [
  {
    id: 1,
    bagNumber: 1,
    t: 0.0,
    timestamp: '00:00',
    frame: 0,
    trackId: 'Base',
    confidence: 99.8,
    weightKg: 50.0,
    flowRateBpm: 0.0,
    status: 'Pre-loaded',
    note: 'Initial bag in truck bed before chute loading starts'
  },
  {
    id: 2,
    bagNumber: 2,
    t: 25.5,
    timestamp: '00:25',
    frame: 765,
    trackId: 5,
    confidence: 98.6,
    weightKg: 50.0,
    flowRateBpm: 2.3,
    status: 'Verified',
    note: 'Chute entry clean · Verified on rear gate'
  },
  {
    id: 3,
    bagNumber: 3,
    t: 55.3,
    timestamp: '00:55',
    frame: 1658,
    trackId: 9,
    confidence: 99.2,
    weightKg: 50.1,
    flowRateBpm: 2.1,
    status: 'Verified',
    note: 'Uniform slide trajectory'
  },
  {
    id: 4,
    bagNumber: 4,
    t: 80.5,
    timestamp: '01:20',
    frame: 2414,
    trackId: 12,
    confidence: 98.7,
    weightKg: 49.9,
    flowRateBpm: 2.4,
    status: 'Verified',
    note: 'Aligned center-chute'
  },
  {
    id: 5,
    bagNumber: 5,
    t: 111.0,
    timestamp: '01:51',
    frame: 3330,
    trackId: 19,
    confidence: 98.1,
    weightKg: 50.0,
    flowRateBpm: 2.0,
    status: 'Verified',
    note: 'High contrast detection'
  },
  {
    id: 6,
    bagNumber: 6,
    t: 133.8,
    timestamp: '02:13',
    frame: 4014,
    trackId: 27,
    confidence: 97.8,
    weightKg: 50.2,
    flowRateBpm: 2.5,
    status: 'Verified',
    note: 'Full chute traverse logged'
  },
  {
    id: 7,
    bagNumber: 7,
    t: 144.9,
    timestamp: '02:25',
    frame: 4346,
    trackId: 31,
    confidence: 99.0,
    weightKg: 50.0,
    flowRateBpm: 2.6,
    status: 'Verified',
    note: 'Fast transfer interval (11s)'
  },
  {
    id: 8,
    bagNumber: 8,
    t: 161.6,
    timestamp: '02:41',
    frame: 4848,
    trackId: 35,
    confidence: 98.9,
    weightKg: 50.1,
    flowRateBpm: 2.3,
    status: 'Verified',
    note: 'Truck bed placement confirmed'
  },
  {
    id: 9,
    bagNumber: 9,
    t: 192.7,
    timestamp: '03:12',
    frame: 5780,
    trackId: 36,
    confidence: 99.4,
    weightKg: 49.8,
    flowRateBpm: 2.1,
    status: 'Verified',
    note: 'Optimal speed chute slide'
  },
  {
    id: 10,
    bagNumber: 10,
    t: 205.3,
    timestamp: '03:25',
    frame: 6158,
    trackId: 38,
    confidence: 98.4,
    weightKg: 50.0,
    flowRateBpm: 2.5,
    status: 'Verified',
    note: 'No tilt or tear detected'
  },
  {
    id: 11,
    bagNumber: 11,
    t: 224.4,
    timestamp: '03:44',
    frame: 6733,
    trackId: 41,
    confidence: 99.1,
    weightKg: 50.2,
    flowRateBpm: 2.2,
    status: 'Verified',
    note: 'Batch 10 milestone reached'
  },
  {
    id: 12,
    bagNumber: 12,
    t: 294.2,
    timestamp: '04:54',
    frame: 8827,
    trackId: 44,
    confidence: 99.3,
    weightKg: 50.0,
    flowRateBpm: 1.8,
    status: 'Verified',
    note: 'Session final bag loaded'
  }
];

export const TOTAL_BAGS_IN_SESSION = BAG_LOADING_EVENTS.length; // 12 bags
