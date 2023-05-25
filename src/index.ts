import * as path from 'path';
import { config } from 'dotenv';
import {
  EnvironmentUtil,
  UserInteractionUtil,
  FileUtil,
  Content,
  OpenAIAzureProvider,
} from '@pi-agi/core';
import { ComposerAGI } from './agi/composer-agi.controller';

config();

async function createContent(documentation: string): Promise<Content> {
  const environmentUtil = new EnvironmentUtil();
  const environment = environmentUtil.getEnvironmentInfo();
  console.log('Environment Information: ', environment);
  const maxAttempt = Number.parseInt(process.env.MAX_ATTEMPT as string);

  return {
    input: documentation,
    name: 'Output',
    maxAttempt,
    environment,
  } as Content;
}

function createProvider(): any {
  const apiKey = process.env.API_KEY as string;
  const apiEndpoint = process.env.API_ENDPOINT as string;
  const apiVersion = process.env.API_VERSION as string;
  const maxToken = Number.parseInt(process.env.MAX_TOKEN as string);
  const maxRetryCount = Number.parseInt(process.env.MAX_RETRY_COUNT as string);
  const retryInterval = Number.parseInt(process.env.RETRY_INTERVAL as string);

  const provider = new OpenAIAzureProvider(
    apiKey,
    apiEndpoint,
    apiVersion,
    maxToken,
    maxRetryCount,
    retryInterval
  );

  return { provider, maxRetryCount, retryInterval };
}

/**
 * The main function for the composer AGI.
 */
async function composer() {
  const musicDefinition = await new FileUtil().readFileContent(
    path.join(__dirname, 'asset', 'input', 'music-definition.md')
  );

  const content = await createContent(musicDefinition);
  const { provider, maxRetryCount, maxRetryInterval } = createProvider();
  const agi = new ComposerAGI(provider, maxRetryCount, maxRetryInterval);

  await agi.init();
  await agi.start(content);
}

async function promptUser() {
  const userInteraction = new UserInteractionUtil();

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                PI AGI - Console Application              ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('\nChoose an AGI:');
  console.log('1. Composer');
  console.log('2. Exit');

  const choice = await userInteraction.getUserInput(
    'Enter your choice (1, 2, or 3): '
  );
  switch (choice) {
    case '1':
      await composer();
      break;
    case '2':
      console.log('Goodbye!');
      break;
    default:
      console.log('Invalid choice. Please try again.');
      await promptUser();
      break;
  }
}

promptUser();
