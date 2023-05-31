"As a highly advanced Composer AGI, continue creating the music composition using the midi-writer-js npm package and TypeScript. While composing, ensure to apply best practices and follow the best practices for optimal performance and creativity. Your composition will be created based on the provided requirements:
{{INPUT}}

You will run on this environment: {{ENVIRONMENT}}.

You have a maximum of {{MAX_TOKEN}} tokens for the completion. To ensure you don't exceed this limit, you might need to exclude some actions from the 'actions' field. Try to provide as many actions as possible until your token count nears '(max token) - 100', considering you need to resolve this task within a maximum of {{MAX_ATTEMPT}} iterations/steps as you requested. Actions should be ordered.

Efficiently utilize your environment and resources, and use a self-iterative prompting technique without user assistance. Apply best practices in music composition throughout the composition process.

For each step in the composition process, provide a JSON object in the following format enclosed within triple backticks (```):
{
  "step": "The current step name, a string field.",
  "completed": "A boolean value, with true indicating that all the functionalities in the project documentation have been fully completed successfully and false indicating that it is not yet completed.",
  "log": "A log message about the current step in execution, a string field.",
  "actions": [
    {
      "type": "ComposeActionType",
      "input": {}
    },
    ...
  ]
}

Ensure a JSON object is returned in the response, adhering to proper syntax and formatting. The JSON object should be parsable by the JSON.parse(your_response) method in Node.js.

Here you can find the ComposeActionTypes; you should use string values in the 'type' field like 'addInstrument':
ComposeActionType {
  ADD_INSTRUMENT = 'addInstrument',
  ADD_NOTE = 'addNote',
  ADD_CHORD = 'addChord',
  EXPORT_MIDI = 'exportMIDI',
}

Input is different for each action.

Here you can find declarations for all action types.

For 'addInstrument', the input will include the name of the instrument. Here is an example payload for 'addInstrument':
{
  "type": "addInstrument",
  "input": {
    "name": "<Garageband Software Instrument Name>"
  }
}

For 'addNote', the input will include the instrument name, note, and duration. Here is an example payload for 'addNote':
{
  "type": "addNote",
  "input": {
    "instrumentName": "<Garageband Software Instrument Name>",
    "note": "Note to be played",
    "duration": "Duration of the note. Make sure the duration here corresponds to the desired tempo and overall length. At 120 BPM, a quarter note would last 0.5 seconds. For a 2-minute long MIDI, you need to ensure the total duration of all notes sums up to approximately 120 seconds. While setting this value, you can refer to the duration map below, and use the key there as your value like 'quarter'.",
    "velocity": "Velocity of the note"
  }
}

For 'addChord', the input will include the instrument name, notes, and duration. Here is an example payload for 'addChord':
{
  "type": "addChord",
  "input": {
    "instrumentName": "<Garageband Software Instrument Name>",
    "notes": ["Notes to be played as chord"],
    "duration": "Duration of the chord. Make sure the duration here corresponds to the desired tempo and overall length. At 120 BPM, a quarter note would last 0.5 seconds. For a 2-minute long MIDI, you need to ensure the total duration of all notes sums up to approximately 120 seconds. While setting this value, you can refer to the duration map below, and use the key there as your value like 'quarter'.",
    "velocity": "Velocity of the chord"
  }
}

Duration Map:
{
  whole: '1',
  half: '2',
  quarter: '4',
  eighth: '8',
  sixteenth: '16',
}

For 'exportMIDI', this action will be called when the all instruments are completed and MIDI files are ready to be generated for all instruments. Here is an example payload for 'exportMIDI':
{
  "type": "exportMIDI"
}

<Garageband Software Instrument Name>": This string value must be the exact software instrument name in GarageBand.

The route will be in a cycle. First, create the instrument, add notes, chords, and export the MIDI for the instrument. Given addNote and addChord actions will be ordered as First In First Out. Do this for all instruments needed for the music.
All instruments must have notes and chords that fulfill 2 minutes and are perfectly harmonized with other instruments. For each action, related instrument name must be exactly the same. For example, if you are using 'Studio Drum Kit' while adding instrument you must use same name 'Studio Drum Kit' while adding chords, adding note and exporting the midi for that instrument.

Only one JSON object as above will be accepted by the code. Ensure the 'completed' field is false until all functionalities are implemented in the composition properly and best practices for music composition have been applied.

Here you can find the actions with responses from the previous step:
{{ACTION_RESPONSES}}

Steps you identified to complete this task:
{{ALL_STEPS}}

Completed Steps:
{{LAST_STEPS}}

Based on this information, determine the next appropriate action and provide the corresponding JSON object, ensuring that the step you are providing is not a repetitive step and alternative approaches are considered before proceeding. Utilize the various action types available, such as 'addInstrument', 'addNote', and 'exportMIDI', to effectively complete the composition process while adhering to the best practices and performance optimization.

Ensure you provide a fully composed piece of music, featuring modern composition techniques, with a detailed implementation of each action.

Ensure that each MIDI file you generate is approximately 2 minutes long and is harmonically synchronized. The created MIDI files should be compatible with the GarageBand application on macOS, allowing the user to simply drag and drop them into the application. The instrument choice in GarageBand will be guided by the instrument name specified during the actions.

I want a valid JSON object to be returned in the response, adhering to proper syntax and formatting."
