/**
 * Pedigro - BrAPI v2.1 Compatible TypeScript Definitions
 * Author: Jipung (Lone Steed Studio)
 * License: MIT
 */

export interface Germplasm {
  id: string;
  germplasmDbId: string;
  accessionNumber: string;
  defaultDisplayName: string;
  cropName: string;
  scientificName: string;
  biologicalStatus: 'WILD' | 'LANDRACE' | 'BREEDING_MATERIAL' | 'ADVANCED_CULTIVAR';
  breedingMethod: string;
  countryOfOrigin: string;
  acquisitionDate: string;
  isSecretParent: boolean;
  notes: string;
  photoUrl?: string;
  traitsSummary: string[];
}

export interface CrossingProject {
  id: string;
  crossIdentifier: string;
  cropName: string;
  femaleParentId: string;
  maleParentId: string;
  femaleParentName: string;
  maleParentName: string;
  pollinationDate: string;
  generationType: 'F1' | 'F2' | 'F3' | 'BC1' | 'RIL';
  targetObjective: string;
  totalProgeny: number;
  status: 'PLANNED' | 'POLLINATED' | 'SEED_HARVESTED' | 'IN_TRIAL' | 'COMPLETED';
}

export interface ObservationUnit {
  id: string;
  unitToken: string;
  crossingProjectId?: string;
  germplasmId: string;
  displayCode: string;
  studyDbId: string;
  blockNumber: number;
  rowNumber: number;
  plantPosition: number;
  plantingDate: string;
  isActive: boolean;
  latestScoreSummary?: {
    diseaseResistance?: number;
    brix?: number;
    fruitWeight?: number;
    lastObserved?: string;
  };
}

export interface TraitDefinition {
  id: string;
  traitCode: string;
  cropName: string;
  traitCategory: 'PATHOLOGY' | 'MORPHOLOGY' | 'YIELD' | 'QUALITY' | 'PHENOLOGY';
  nameId: string;
  scaleType: 'ORDINAL' | 'NUMERICAL' | 'CATEGORICAL';
  unitOfMeasure?: string;
  minValue?: number;
  maxValue?: number;
  scaleLabels?: { score: number; label: string }[];
  standardRef: string;
}

export interface PhenotypeObservation {
  id: string;
  unitToken: string;
  traitCode: string;
  numericValue: number;
  notes?: string;
  photoDataUrl?: string;
  collectorName: string;
  timestamp: string;
  syncStatus: 'LOCAL' | 'SYNCED';
}

export interface GeolocationStamp {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy: number;
  capturedAt: string;
}

/**
 * Fase 3 & 4 Persistent Storage & Sync Queue Schema
 * Blueprint: 05_BLUEPRINT_OFFLINE_PERSISTEN_DAN_SINKRONISASI.md & 07_BLUEPRINT_KAMERA_FISIK_DAN_GPS_LAPANGAN.md
 */
export interface PersistentObservationRecord {
  obsDbId: string;
  blindToken: string;
  plotLabel: string;
  crop: 'Cabai' | 'Melon';
  scores: Record<string, number>;
  notes?: string;
  photoDataUrl?: string;
  photoSizeKb?: number;
  geolocation?: GeolocationStamp;
  checksum: string;
  createdAt: string;
  syncStatus: 'PENDING' | 'SYNCED' | 'FAILED';
  syncedAt?: string;
}

export interface SyncQueueItem {
  queueId: string;
  action: 'CREATE_OBSERVATION' | 'UPDATE_OBSERVATION';
  obsDbId: string;
  payload: PersistentObservationRecord;
  attempts: number;
  lastError?: string;
  createdAt: number;
}
