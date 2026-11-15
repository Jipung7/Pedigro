/**
 * Pedigro - Realistic Mock Breeding Dataset (Chili & Melon)
 * Author: Jipung (Lone Steed Studio)
 * License: MIT
 */

import { Germplasm, CrossingProject, ObservationUnit, TraitDefinition } from '../types/brapi';

export const INITIAL_GERMPLASM: Germplasm[] = [
  {
    id: 'G-CAB-01',
    germplasmDbId: 'BF-GERM-01',
    accessionNumber: 'ACC-HIYUNG-01',
    defaultDisplayName: 'Cabai Rawit Hiyung Asli (Tetua-A)',
    cropName: 'Cabai',
    scientificName: 'Capsicum frutescens',
    biologicalStatus: 'LANDRACE',
    breedingMethod: 'PURE_LINE_SELECTION',
    countryOfOrigin: 'IDN (Tapin, Kalsel)',
    acquisitionDate: '2024-03-15',
    isSecretParent: true,
    notes: 'Kadar kepedasan sangat tinggi (94.500 SHU), sangat toleran lahan rawa/kering, rentan antraknosa buah.',
    photoUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80',
    traitsSummary: ['Capsaicin Sangat Tinggi', 'Toleran Kering', 'Rentan Antraknosa']
  },
  {
    id: 'G-CAB-02',
    germplasmDbId: 'BF-GERM-02',
    accessionNumber: 'ACC-AVRDC-98',
    defaultDisplayName: 'Galur Introdusir Tahan Jamur (Tetua-B)',
    cropName: 'Cabai',
    scientificName: 'Capsicum annuum',
    biologicalStatus: 'BREEDING_MATERIAL',
    breedingMethod: 'PEDIGREE_SELECTION',
    countryOfOrigin: 'TWN (WorldVeg)',
    acquisitionDate: '2023-11-20',
    isSecretParent: true,
    notes: 'Membawa gen Cc-1 resisten terhadap Colletotrichum acutatum (antraknosa), buah besar tapi rasa agak hambar.',
    photoUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80',
    traitsSummary: ['Resisten Antraknosa (Skor 5)', 'Kulit Buah Tebal', 'Kurang Pedas']
  },
  {
    id: 'G-CAB-F1-01',
    germplasmDbId: 'BF-GERM-03',
    accessionNumber: 'F1-HIYUNG-PRO-01',
    defaultDisplayName: 'Kandidat Hibrida F1 "Nusantara Hiyung"',
    cropName: 'Cabai',
    scientificName: 'Capsicum annuum x frutescens',
    biologicalStatus: 'ADVANCED_CULTIVAR',
    breedingMethod: 'HYBRID_CROSS_F1',
    countryOfOrigin: 'IDN (Lone Steed Farm)',
    acquisitionDate: '2025-08-10',
    isSecretParent: false,
    notes: 'Hasil silang Hiyung x AVRDC. Kombinasi kepedasan 70.000 SHU dan ketahanan antraknosa skor 4.5.',
    photoUrl: 'https://images.unsplash.com/photo-1563865436874-9aef32095afd?w=400&q=80',
    traitsSummary: ['Pedas Tinggi', 'Resisten Antraknosa', 'Potensi Panen 22 Ton/Ha']
  },
  {
    id: 'G-MEL-01',
    germplasmDbId: 'BF-GERM-04',
    accessionNumber: 'MEL-GOLD-09',
    defaultDisplayName: 'Melon Golden Honey (Induk Betina ♀)',
    cropName: 'Melon',
    scientificName: 'Cucumis melo var. reticulatus',
    biologicalStatus: 'BREEDING_MATERIAL',
    breedingMethod: 'INBRED_LINE_S6',
    countryOfOrigin: 'JPN',
    acquisitionDate: '2024-01-10',
    isSecretParent: true,
    notes: 'Daging buah oranye renyah, kadar gula 14.5 Brix, peka terhadap embun tepung (powdery mildew).',
    photoUrl: 'https://images.unsplash.com/photo-1571575173700-afb9492e8a50?w=400&q=80',
    traitsSummary: ['Brix 14.5°', 'Warna Oranye', 'Daging Renyah']
  },
  {
    id: 'G-MEL-02',
    germplasmDbId: 'BF-GERM-05',
    accessionNumber: 'MEL-RESIST-03',
    defaultDisplayName: 'Melon Rock Hijau Tahan Jamur (Induk Jantan ♂)',
    cropName: 'Melon',
    scientificName: 'Cucumis melo',
    biologicalStatus: 'BREEDING_MATERIAL',
    breedingMethod: 'BACKCROSS_BC2',
    countryOfOrigin: 'IDN (Lokal Lamongan)',
    acquisitionDate: '2023-09-05',
    isSecretParent: true,
    notes: 'Sangat tahan jamur Podosphaera xanthii, jaring/netting rapat sempurna, rasa sedang (10.5 Brix).',
    photoUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    traitsSummary: ['Tahan Embun Tepung', 'Netting Tebal', 'Toleran Busuk Batang']
  }
];

export const INITIAL_CROSSINGS: CrossingProject[] = [
  {
    id: 'CROSS-2025-CAB-01',
    crossIdentifier: 'CR-CAB-HIYUNG-RESIST',
    cropName: 'Cabai',
    femaleParentId: 'G-CAB-01',
    maleParentId: 'G-CAB-02',
    femaleParentName: 'Hiyung Asli (Tetua-A)',
    maleParentName: 'AVRDC Tahan Jamur (Tetua-B)',
    pollinationDate: '2025-05-12',
    generationType: 'F1',
    targetObjective: 'Menyatukan kepedasan ekstrim Hiyung dengan ketahanan jamur antraknosa AVRDC',
    totalProgeny: 24,
    status: 'IN_TRIAL'
  },
  {
    id: 'CROSS-2025-MEL-02',
    crossIdentifier: 'CR-MEL-GOLDEN-NET',
    cropName: 'Melon',
    femaleParentId: 'G-MEL-01',
    maleParentId: 'G-MEL-02',
    femaleParentName: 'Golden Honey (♀)',
    maleParentName: 'Rock Hijau Resisten (♂)',
    pollinationDate: '2025-06-20',
    generationType: 'F1',
    targetObjective: 'Melon jaring rapat warna emas, manis 13.5+ Brix dan tahan embun tepung',
    totalProgeny: 30,
    status: 'IN_TRIAL'
  }
];

export const INITIAL_UNITS: ObservationUnit[] = [
  {
    id: 'UNIT-001',
    unitToken: 'PLT-7X9K2',
    displayCode: 'Plot A - Ajir 01',
    crossingProjectId: 'CROSS-2025-CAB-01',
    germplasmId: 'G-CAB-F1-01',
    studyDbId: 'TRIAL-KEDIRI-2026-MK',
    blockNumber: 1,
    rowNumber: 2,
    plantPosition: 1,
    plantingDate: '2026-01-10',
    isActive: true,
    latestScoreSummary: {
      diseaseResistance: 5,
      brix: 9.2,
      fruitWeight: 6.8,
      lastObserved: '2026-03-28'
    }
  },
  {
    id: 'UNIT-002',
    unitToken: 'PLT-4M8P1',
    displayCode: 'Plot A - Ajir 02',
    crossingProjectId: 'CROSS-2025-CAB-01',
    germplasmId: 'G-CAB-F1-01',
    studyDbId: 'TRIAL-KEDIRI-2026-MK',
    blockNumber: 1,
    rowNumber: 2,
    plantPosition: 2,
    plantingDate: '2026-01-10',
    isActive: true,
    latestScoreSummary: {
      diseaseResistance: 4,
      brix: 8.9,
      fruitWeight: 7.1,
      lastObserved: '2026-03-28'
    }
  },
  {
    id: 'UNIT-003',
    unitToken: 'PLT-9Q2V5',
    displayCode: 'Plot B - Ajir 14',
    crossingProjectId: 'CROSS-2025-CAB-01',
    germplasmId: 'G-CAB-F1-01',
    studyDbId: 'TRIAL-KEDIRI-2026-MK',
    blockNumber: 2,
    rowNumber: 1,
    plantPosition: 14,
    plantingDate: '2026-01-10',
    isActive: true,
    latestScoreSummary: {
      diseaseResistance: 5,
      brix: 9.6,
      fruitWeight: 7.4,
      lastObserved: '2026-03-29'
    }
  },
  {
    id: 'UNIT-004',
    unitToken: 'PLT-3K1N8',
    displayCode: 'Greenhouse 2 - Pot 08',
    crossingProjectId: 'CROSS-2025-MEL-02',
    germplasmId: 'G-MEL-01',
    studyDbId: 'TRIAL-GH-MALANG-2026',
    blockNumber: 3,
    rowNumber: 1,
    plantPosition: 8,
    plantingDate: '2026-02-01',
    isActive: true,
    latestScoreSummary: {
      diseaseResistance: 4,
      brix: 14.1,
      fruitWeight: 1850,
      lastObserved: '2026-04-02'
    }
  }
];

export const INITIAL_TRAITS: TraitDefinition[] = [
  {
    id: 'TR-ANTHRACNOSE',
    traitCode: 'ANTHRACNOSE_RES',
    cropName: 'Cabai',
    traitCategory: 'PATHOLOGY',
    nameId: 'Ketahanan Antraknosa (Colletotrichum)',
    scaleType: 'ORDINAL',
    minValue: 1,
    maxValue: 5,
    scaleLabels: [
      { score: 1, label: '1 - Sangat Rentan (Busuk Buah Parah >70%)' },
      { score: 2, label: '2 - Rentan (Bercak Melingkar 30-70%)' },
      { score: 3, label: '3 - Sedang / Toleran Moderat (Bercak 10-30%)' },
      { score: 4, label: '4 - Tahan / Resisten (Bercak Sedikit <10%)' },
      { score: 5, label: '5 - Sangat Tahan / Imun (Buah Mulus Bersih)' }
    ],
    standardRef: 'UPOV TG/76/8 Rev.'
  },
  {
    id: 'TR-FRUIT-WEIGHT',
    traitCode: 'FRUIT_WEIGHT',
    cropName: 'Cabai',
    traitCategory: 'YIELD',
    nameId: 'Bobot Buah Rata-Rata',
    scaleType: 'NUMERICAL',
    unitOfMeasure: 'gram',
    minValue: 1,
    maxValue: 50,
    standardRef: 'Bioversity IPGRI Descriptor'
  },
  {
    id: 'TR-BRIX',
    traitCode: 'BRIX_CONTENT',
    cropName: 'Semua',
    traitCategory: 'QUALITY',
    nameId: 'Kadar Padatan Terlarut (°Brix / Kemanisan)',
    scaleType: 'NUMERICAL',
    unitOfMeasure: '°Brix',
    minValue: 4,
    maxValue: 22,
    standardRef: 'Refraktometer Digital'
  }
];
