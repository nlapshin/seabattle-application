import { IField } from '../models/field';

export interface FieldState {
  [key: string]: IField;
}

export interface BattlefieldState {
  battlefield: FieldState;
}