import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { appDevOnce, appUninstall } from 'twenty-sdk/cli';

const APP_PATH = process.cwd();
const CONFIG_DIR = path.join(os.homedir(), '.twenty');

function validateEnv(): { apiUrl: string; apiKey: string } {
  const apiUrl = process.env.TWENTY_API_URL;
  const apiKey = process.env.TWENTY_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error(
      'TWENTY_API_URL and TWENTY_API_KEY are required for integration tests.',
    );
  }

  return { apiUrl, apiKey };
}

async function checkServer(apiUrl: string) {
  const response = await fetch(`${apiUrl}/healthz`);
  if (!response.ok) {
    throw new Error(`Twenty server returned ${response.status} at ${apiUrl}`);
  }
}

function writeConfig(apiUrl: string, apiKey: string) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(CONFIG_DIR, 'config.test.json'),
    JSON.stringify(
      {
        remotes: {
          ci: { apiUrl, apiKey, accessToken: apiKey },
        },
        defaultRemote: 'ci',
      },
      null,
      2,
    ),
  );
}

export async function setup() {
  const { apiUrl, apiKey } = validateEnv();
  await checkServer(apiUrl);
  writeConfig(apiUrl, apiKey);

  await appUninstall({ appPath: APP_PATH }).catch(() => {});

  const result = await appDevOnce({
    appPath: APP_PATH,
    onProgress: (message: string) => console.log(`[twenty] ${message}`),
  });

  if (!result.success) {
    throw new Error(
      `Twenty app sync failed: ${result.error?.message ?? 'Unknown error'}`,
    );
  }
}

export async function teardown() {
  const result = await appUninstall({ appPath: APP_PATH });
  if (!result.success) {
    console.warn(
      `Twenty app uninstall failed: ${result.error?.message ?? 'Unknown error'}`,
    );
  }
}
