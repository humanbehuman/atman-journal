/**
 * Update Service
 *
 * Auto-updates are intentionally DISABLED for Atman Journal.
 *
 * This app is a fork of the upstream Meetily project; the upstream updater
 * endpoint and signing pubkey have been removed from tauri.conf.json and the
 * updater plugin is no longer registered in src-tauri/src/lib.rs, so the app
 * can never auto-update itself from upstream releases. This service keeps the
 * same public API so existing hooks/components compile, but every check
 * gracefully reports "no update available".
 */

import { getVersion } from '@tauri-apps/api/app';

export interface UpdateInfo {
  available: boolean;
  currentVersion: string;
  version?: string;
  date?: string;
  body?: string;
  downloadUrl?: string;
}

export interface UpdateProgress {
  downloaded: number;
  total: number;
  percentage: number;
}

/**
 * Update Service
 * Singleton service that always reports no updates (auto-update disabled).
 */
export class UpdateService {
  /**
   * Check for available updates.
   * Always resolves with no update available — auto-updating is disabled.
   */
  async checkForUpdates(_force = false): Promise<UpdateInfo> {
    return {
      available: false,
      currentVersion: await getVersion(),
    };
  }

  /**
   * Download and install the available update.
   * No-op: auto-updating is disabled in Atman Journal.
   */
  async downloadAndInstall(
    _update: unknown,
    _onProgress?: (progress: UpdateProgress) => void
  ): Promise<void> {
    console.warn('Auto-update is disabled in Atman Journal.');
  }

  /**
   * Get the current app version
   * @returns Promise with version string
   */
  async getCurrentVersion(): Promise<string> {
    return getVersion();
  }

  /**
   * Check if an update check was performed recently.
   * Always false; checks are free no-ops now.
   */
  wasCheckedRecently(): boolean {
    return false;
  }
}

// Export singleton instance
export const updateService = new UpdateService();
