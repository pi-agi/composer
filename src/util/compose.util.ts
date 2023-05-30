import { FileUtil } from '@pi-agi/core';
import * as MidiWriter from 'midi-writer-js';

export class ComposeUtil {
  private instruments: { [name: string]: any[] };

  constructor(private taskDir: string) {
    this.instruments = {};
  }

  addInstrument(name: string): string {
    this.instruments[name] = [];
    return `Created and added instrument '${name}'`;
  }

  addChord(
    instrumentName: string,
    notes: string[],
    duration: string,
    velocity: number = 70
  ): string {
    const instrument = this.instruments[instrumentName];

    if (!instrument) {
      return `Instrument '${instrumentName}' not found`;
    }

    const midiDuration = this.getMIDIDuration(duration);

    if (!midiDuration) {
      return `Invalid duration '${duration}' for instrument '${instrumentName}'`;
    }

    const chord = { notes, duration: midiDuration, velocity };
    instrument.push(chord);

    const chordNotes = notes.join('+');
    return `Added chord '${chordNotes}' with duration '${duration}' to instrument '${instrumentName}'`;
  }

  addNote(
    instrumentName: string,
    note: string,
    duration: string,
    velocity: number = 70
  ): string {
    const instrument = this.instruments[instrumentName];

    if (!instrument) {
      return `Instrument '${instrumentName}' not found`;
    }

    const midiDuration = this.getMIDIDuration(duration);

    if (!midiDuration) {
      return `Invalid duration '${duration}' for instrument '${instrumentName}'`;
    }

    instrument.push({ note, duration: midiDuration, velocity });
    return `Added note '${note}' with duration '${duration}' to instrument '${instrumentName}'`;
  }

  getMIDIDuration(duration: string): string {
    const durationMap: { [key: string]: string } = {
      whole: '1',
      half: '2',
      quarter: '4',
      eighth: '8',
      sixteenth: '16',
    };

    return durationMap[duration] || duration;
  }

  async exportMIDI(instrumentName: string): Promise<string> {
    const filePath = `${this.taskDir}/${instrumentName.toLowerCase()}.mid`;

    try {
      const instrument = this.instruments[instrumentName];

      if (!instrument) {
        return `Instrument '${instrumentName}' not found`;
      }

      const track = new MidiWriter.Track();

      instrument.forEach(({ note, duration }) => {
        track.addEvent(
          new MidiWriter.NoteEvent({
            pitch: [note as MidiWriter.Pitch],
            duration,
          })
        );
      });

      const write = new MidiWriter.Writer([track]);
      const dataUri = write.dataUri().split(',')[1];
      const buffer = Buffer.from(dataUri, 'base64');

      const fileUtil = new FileUtil();

      await fileUtil.writeFileWithBuffer(filePath, buffer);
      return `Exported MIDI file: ${filePath}`;
    } catch (e: any) {
      return `Error while exporting the MIDI file: ${filePath}, ${e.message}`;
    }
  }
}
