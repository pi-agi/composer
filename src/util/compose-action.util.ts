import { Action, Actionable } from '@pi-agi/core';
import {
  ComposeActionType,
  MergedActionType,
} from '../enum/compose-action-type.enum';
import { ComposeUtil } from './compose.util';

export class ComposeActionUtil implements Actionable<MergedActionType> {
  private composeUtil: ComposeUtil;

  constructor(private taskDir: string) {
    this.composeUtil = new ComposeUtil(this.taskDir);
  }

  async takeAction(action: Action<MergedActionType>): Promise<any> {
    try {
      switch (action.type) {
        case ComposeActionType.ADD_INSTRUMENT:
          return this.composeUtil.addInstrument(action.input.name);
        case ComposeActionType.ADD_NOTE:
          return this.composeUtil.addNote(
            action.input.instrumentName,
            action.input.note,
            action.input.duration,
            action.input.velocity
          );
        case ComposeActionType.EXPORT_MIDI:
          return await this.composeUtil.exportMIDI(action.input.name);
        default:
          throw new Error('Invalid action type');
      }
    } catch (e) {
      return e;
    }
  }
}
