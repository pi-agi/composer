import { ActionType } from '@pi-agi/core';

export enum ComposeActionType {
  ADD_INSTRUMENT = 'addInstrument',
  ADD_NOTE = 'addNote',
  ADD_CHORD = 'addChord',
  EXPORT_MIDI = 'exportMIDI',
}

export type MergedActionType = ActionType & ComposeActionType;
