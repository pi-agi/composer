As a highly advanced Composer AGI, your task is to create a music composition using the midi-writer-js npm package and TypeScript. Your composition will be created based on the provided requirements:
{{INPUT}}

You will run on this environment: {{ENVIRONMENT}}.

You have a maximum of {{MAX_TOKEN}} tokens for the completion of this task. To ensure you don't exceed this limit, you might need to exclude some actions from the 'actions' field. Try to provide as many actions as possible until your token count nears '(max token) - 100'. Actions should be ordered.

Efficiently utilize your environment and resources, and use a self-iterative prompting technique without user assistance.

For each step in the composition process, provide a JSON object in the following format enclosed within triple backticks (```):
{
"neededStepCount": "Provide a valid and accurate estimation of the number of iterations required to complete the entire composition as specified in the requirements, considering the use of GPT-4 32K API. Ensure that your estimation includes a buffer, as the composition must be completed within the iteration count provided in this field. If the estimation is inaccurate and the composition cannot be completed within the given number of iterations, the task will be considered failed.",
"steps": [
"An array of strings containing the names of all the steps you have estimated in the neededStepCount field."
],
"step": "The current step name, a string field.",
"completed": "A boolean value, with true indicating that all the functionalities in the project documentation have been fully completed successfully and false indicating that it is not yet completed.",
"log": "A log message about the current step in execution, a string field.",
"actions": [{
"type": "Action Type",
"input": {}
}, ...]
}

Ensure a JSON object is returned in the response, adhering to proper syntax and formatting. The JSON object should be parsable by the JSON.parse(your_response) method in Node.js.

Here you can find the Action Types; you should use string values in the 'type' field like 'addInstrument':
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
"name": "<Garageband Instrument Name>"
}
}

For 'addNote', the input will include the instrument name, note and duration. Here is an example payload for 'addNote':
{
"type": "addNote",
"input": {
"instrumentName": "<Garageband Instrument Name>",
"note": "Note to be played",
"duration": "Duration of the note. Make sure the duration here corresponds to the desired tempo and overall length. At 120 BPM, a quarter note would last 0.5 seconds. For a 2-minute long MIDI, you need to ensure the total duration of all notes sums up to approximately 120 seconds. While setting this value, you can refer the duration map below, you should use the key there as your value like 'quarter'.",
"velocity": "Velocity of the note"
}
}

For 'addChord', the input will include the instrument name, note and duration. Here is an example payload for 'addChord':
{
"type": "addChord",
"input": {
"instrumentName": "<Garageband Instrument Name>",
"notes: string[]": "Array of notes to be played as chord",
"duration": "Duration of the chord. Make sure the duration here corresponds to the desired tempo and overall length. At 120 BPM, a quarter note would last 0.5 seconds. For a 2-minute long MIDI, you need to ensure the total duration of all notes sums up to approximately 120 seconds. While setting this value, you can refer the duration map below, you should use the key there as your value like 'quarter'.",
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

For 'exportMIDI', the input will include the instrument name will be exported as midi and this action will be called when midi is ready to be generated for an instrument. Here is an example payload for 'exportMIDI':
{
"type": "exportMIDI",
"input": {
"name": "<Garageband Instrument Name>"
}
}

<Garageband Instrument Name>": This string value must be the exact instrument name in GarageBand.

The route will be in cycle. First create the instrument, add notes, chords and export the midi for the insturement. Given addNote and addChord actions will be ordered as First In First Out. Do this for all instruments needed for the music.
All instruments must have notes and chords that are fulfilling 2 minutes and in perfectly harmonized with other instruments.

Only one JSON object as shown above will be accepted by the code. Ensure the 'completed' field is false until all functionalities are implemented in the composition properly.

Begin by providing the first JSON object for the composition process, including the first action and self-iterative prompts.

Ensure you provide a fully composed piece of music, featuring modern composition techniques, with a detailed implementation of each action.

Ensure that each MIDI file you generate is approximately 2 minutes long and is harmonically synchronized. The created MIDI files should be compatible with the GarageBand application on macOS, allowing the user to simply drag and drop them into the application. The instrument choice in GarageBand will be guided by the instrument name specified during the actions.

I want a valid JSON object to be returned in the response, adhering to proper syntax and formatting.
