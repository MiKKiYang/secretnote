// Mocked workspace concept for SecretNote to allow LSP (mainly `pylez`
// because the code intelligence is cross-file) to work properly.

import { BaseWorkspaceService, ILibroWorkspaceService } from '@difizen/libro-jupyter';
import { ApplicationContribution, singleton, URI } from '@difizen/mana-app';

@singleton({ contrib: [ILibroWorkspaceService, ApplicationContribution] })
export class JupyterWorkspaceService
  extends BaseWorkspaceService
  implements ILibroWorkspaceService, ApplicationContribution
{
  onViewStart() {
    this.deferred.resolve(); // no extra logics. resolve directly.
  }

  // Since SecretNote doesn't care about workspace because all notebook files
  // are considered individual and usually no foreign .py file importing are used,
  // we just return empty `notebooks` and `files` list, and mock `workspaceRoot`
  // with an arbitary path that the system user running Jupyter Server can read and write.
  MOCK_WORKSPACE_ROOT = '/tmp'; // TODO what if the backend is running on Windows?
  override get workspaceRoot() {
    return new URI(this.MOCK_WORKSPACE_ROOT);
  }
  override get notebooks() {
    return [];
  }
  override get files() {
    return [];
  }
}
