/**
 * Pedigro - Official Trait Dictionaries Registry
 * Author: Jipung (Lone Steed Studio)
 * License: MIT
 */

import chiliTraits from './traits_chili.json';
import melonTraits from './traits_melon.json';

export interface TraitItem {
  traitDbId: string;
  traitCode: string;
  officialRef: string;
  nameId: string;
  nameEn: string;
  category: string;
  scaleType: 'ORDINAL' | 'NUMERICAL' | 'CATEGORICAL';
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  scaleLabels?: { score: number; labelId: string }[];
}

export interface CropTraitDictionary {
  crop: string;
  scientificName: string;
  officialStandard: string;
  traits: TraitItem[];
}

export const TRAIT_DICTIONARIES: Record<string, CropTraitDictionary> = {
  Cabai: chiliTraits as CropTraitDictionary,
  Melon: melonTraits as CropTraitDictionary
};

export const getTraitsByCrop = (cropName: string): TraitItem[] => {
  return TRAIT_DICTIONARIES[cropName]?.traits || [];
};
