// This only contributes to the notebook preview.
// see `src/modules/editor/contents/contents-contrib.ts`

import type { NotebookModel, NotebookOption } from '@difizen/libro-jupyter';
import { ContentContribution } from '@difizen/libro-jupyter';
import { URI, inject, singleton } from '@difizen/mana-app';

import type { SecretNoteModel } from '@/modules/editor';

import { PreviewNotebookFileService } from './service';

@singleton({ contrib: ContentContribution })
export class PreviewSecretNoteContentContribution implements ContentContribution {
  protected readonly notebookFileService: PreviewNotebookFileService;

  constructor(
    @inject(PreviewNotebookFileService) notebookFileService: PreviewNotebookFileService,
  ) {
    this.notebookFileService = notebookFileService;
  }

  canHandle = () => {
    return 3;
  };

  async loadContent(options: NotebookOption, model: NotebookModel) {
    const secretNoteModel = model as SecretNoteModel;
    const fileUri = new URI(options.resource);
    // TODO make it clear why we pass fileUri directly
    const currentFileContents = await this.notebookFileService.getFile(
      fileUri.toString(),
    );

    if (currentFileContents) {
      currentFileContents.content.nbformat_minor = 5;
      secretNoteModel.currentFileContents = currentFileContents;
      // use file path as id, will be passed to editor and lsp
      // @see https://github.com/difizen/libro/commit/b91cd7588ba4adcb3ca83f241fe42471b30cdc26#diff-32d01fca78d40feed75dcc29437fae22f74ebe33ec16ee11fde7c6c220bedbdbR23
      secretNoteModel.id = secretNoteModel.filePath = currentFileContents.path;

      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      if (!secretNoteModel.quickEditMode && !secretNoteModel.readOnly) {
        secretNoteModel.startKernelConnection();
      }

      return secretNoteModel.currentFileContents.content;
    }
  }
}
