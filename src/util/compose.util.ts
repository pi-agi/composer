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

  async exportMIDI(): Promise<string[]> {
    const fileUtil = new FileUtil();
    const results: string[] = [];

    try {
      for (const instrumentName in this.instruments) {
        const instrument = this.instruments[instrumentName];
        const filePath = `${this.taskDir}/${instrumentName.toLowerCase()}.mid`;

        if (!instrument) {
          results.push(`Instrument '${instrumentName}' not found`);
          continue;
        }

        const track = new MidiWriter.Track();

        instrument.forEach(({ notes, note, duration }) => {
          let pitch: MidiWriter.Pitch[] = [];

          if (notes) {
            // Handling chords
            pitch = notes;
          } else if (note) {
            // Handling single notes
            pitch = [note];
          }

          track.addEvent(
            new MidiWriter.NoteEvent({
              pitch: pitch as MidiWriter.Pitch[],
              duration,
            })
          );
        });

        const write = new MidiWriter.Writer([track]);
        const dataUri = write.dataUri().split(',')[1];
        const buffer = Buffer.from(dataUri, 'base64');

        await fileUtil.writeFileWithBuffer(filePath, buffer);
        results.push(`Exported MIDI file: ${filePath}`);
      }
    } catch (e: any) {
      results.push(`Error while exporting the MIDI files: ${e.message}`);
    }

    return results;
  }
}
