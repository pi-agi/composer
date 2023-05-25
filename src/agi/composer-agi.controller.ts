import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { MainAGI, OpenAIAzureProvider } from '@pi-agi/core';
import { MergedActionType } from '../enum/compose-action-type.enum';
import { ComposeActionUtil } from '../util/compose-action.util';

/**
 * A class representing a Composer AGI.
 */
export class ComposerAGI extends MainAGI<MergedActionType> {
  constructor(
    openAIProvider: OpenAIAzureProvider,
    maxRetryCount: number,
    maxRetryInterval: number
  ) {
    super(openAIProvider, maxRetryCount, maxRetryInterval);
  }

  /**
   * Initializes the AGI.
   */
  async init() {
    this.consolidationId = uuidv4();
    super.consolidationId = this.consolidationId;

    super.initialize(__dirname, this.consolidationId);

    this.mainPrompt = await this.fileUtil.readFileContent(
      path.join(
        __dirname,
        '..',
        'asset',
        'agi',
        'music',
        'composer-main.agi.md'
      )
    );

    this.nextPrompt = await this.fileUtil.readFileContent(
      path.join(
        __dirname,
        '..',
        'asset',
        'agi',
        'music',
        'composer-next.agi.md'
      )
    );

    this.actionUtil = new ComposeActionUtil(this.taskDir);
  }
}
