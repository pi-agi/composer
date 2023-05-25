import { ActionType } from '@pi-agi/core';

export enum ComposeActionType {
  ADD_INSTRUMENT = 'addInstrument',
  ADD_NOTE = 'addNote',
  EXPORT_MIDI = 'exportMIDI',
}

export type MergedActionType = ActionType & ComposeActionType;
