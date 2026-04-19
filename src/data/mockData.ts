export interface Hospital {
  id: string;
  name: string;
  wallet: string;
  status: "Active";
  submissions: number;
  lastRound: number;
}

export const initialHospitals: Hospital[] = [
  {
    id: "1",
    name: "Owner Hospital",
    wallet: "0x8296f080dEd707845562f45893f42256B47E6B4b",
    status: "Active",
    submissions: 7,
    lastRound: 7,
  },
  {
    id: "2",
    name: "Hospital Alpha",
    wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    status: "Active",
    submissions: 7,
    lastRound: 7,
  },
  {
    id: "3",
    name: "Hospital Beta",
    wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    status: "Active",
    submissions: 7,
    lastRound: 7,
  },
];

export const CONTRACT_ADDRESS = "0x8296f080dEd707845562f45893f42256B47E6B4b";

export const truncateWallet = (addr: string) =>
  `${addr.slice(0, 6)}…${addr.slice(-4)}`;

// Per-hospital per-round accuracy (sparkline data)
export const hospitalAccuracyHistory: Record<string, number[]> = {
  "Owner Hospital": [0.55, 0.62, 0.71, 0.78, 0.82, 0.85, 0.87],
  "Hospital Alpha": [0.53, 0.60, 0.69, 0.76, 0.81, 0.84, 0.86],
  "Hospital Beta": [0.54, 0.61, 0.70, 0.77, 0.81, 0.84, 0.86],
};

export const hospitalEpsilon: Record<string, number> = {
  "Owner Hospital": 8.78,
  "Hospital Alpha": 9.12,
  "Hospital Beta": 7.94,
};

export interface BlockchainTx {
  round: number;
  hospital: string;
  txHash: string;
  block: number;
  status: "Confirmed";
}

export const recentTransactions: BlockchainTx[] = [
  { round: 7, hospital: "Owner Hospital", txHash: "0x9f3a8b12c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1", block: 5_421_983, status: "Confirmed" },
  { round: 7, hospital: "Hospital Alpha", txHash: "0xa2b3c4d5e6f7081928374650a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4", block: 5_421_984, status: "Confirmed" },
  { round: 7, hospital: "Hospital Beta", txHash: "0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7081928374650a1b2c3d4e5f6071829", block: 5_421_985, status: "Confirmed" },
  { round: 6, hospital: "Owner Hospital", txHash: "0xc3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2", block: 5_421_502, status: "Confirmed" },
  { round: 6, hospital: "Hospital Alpha", txHash: "0xd4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3", block: 5_421_503, status: "Confirmed" },
  { round: 6, hospital: "Hospital Beta", txHash: "0xe5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4", block: 5_421_504, status: "Confirmed" },
];

// Global model performance across 20 rounds
export interface GlobalMetric {
  round: number;
  accuracy: number;
  f1: number;
  auc: number;
}

export const globalMetrics: GlobalMetric[] = [
  { round: 1, accuracy: 0.54, f1: 0.00, auc: 0.82 },
  { round: 2, accuracy: 0.61, f1: 0.32, auc: 0.85 },
  { round: 3, accuracy: 0.68, f1: 0.55, auc: 0.88 },
  { round: 4, accuracy: 0.74, f1: 0.68, auc: 0.90 },
  { round: 5, accuracy: 0.79, f1: 0.76, auc: 0.92 },
  { round: 6, accuracy: 0.83, f1: 0.81, auc: 0.94 },
  { round: 7, accuracy: 0.85, f1: 0.84, auc: 0.95 },
  { round: 8, accuracy: 0.87, f1: 0.86, auc: 0.96 },
  { round: 9, accuracy: 0.87, f1: 0.86, auc: 0.96 },
  { round: 10, accuracy: 0.88, f1: 0.87, auc: 0.96 },
  { round: 11, accuracy: 0.88, f1: 0.87, auc: 0.96 },
  { round: 12, accuracy: 0.88, f1: 0.87, auc: 0.97 },
  { round: 13, accuracy: 0.89, f1: 0.88, auc: 0.97 },
  { round: 14, accuracy: 0.89, f1: 0.88, auc: 0.97 },
  { round: 15, accuracy: 0.89, f1: 0.88, auc: 0.97 },
  { round: 16, accuracy: 0.89, f1: 0.88, auc: 0.97 },
  { round: 17, accuracy: 0.90, f1: 0.89, auc: 0.97 },
  { round: 18, accuracy: 0.90, f1: 0.89, auc: 0.97 },
  { round: 19, accuracy: 0.90, f1: 0.89, auc: 0.97 },
  { round: 20, accuracy: 0.90, f1: 0.89, auc: 0.97 },
];

export const TOTAL_ROUNDS = 20;
