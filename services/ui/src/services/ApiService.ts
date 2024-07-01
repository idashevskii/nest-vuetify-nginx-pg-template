import { injectable, inject } from 'inversify';
import { AppConfig } from './AppConfig';

export interface ApiConfig {
  dummyApi: boolean;
  llmKey: string;
  tavilyApiKey: string;
  llmPreset: string;
}

export interface CrudLoadOpts {
  page?: number;
  perPage?: number;
  sorting?: { key: string; reverse: boolean }[];
  searchQuery?: string;
}

export interface CrudApiProvider<T> {
  keyProp: keyof T;
  create: (item: T) => Promise<void>;
  update: (item: T) => Promise<void>;
  read: (opts: CrudLoadOpts) => Promise<{ items: T[]; total: number }>;
  delete: (item: T) => Promise<void>;
}

type FetchOpts<R> = {
  data?: R;
  query?: { [k: string]: string };
  fetchTotal?: (total: number) => void;
};

@injectable()
export class ApiService {
  public constructor(@inject(AppConfig) private appConfig: AppConfig) {}

  private async fetch<R>(method: string, endpoint: string, { data, query, fetchTotal }: FetchOpts<R> = {}) {
    if (query) {
      endpoint += '?' + new URLSearchParams(query).toString();
    }
    const request: RequestInit = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      request.body = JSON.stringify(data);
    }
    const url = this.appConfig.getApiBaseUrl() + '/' + endpoint;

    const res = await fetch(url, request);
    if (res.status < 200 || 299 < res.status) {
      alert(`API error ${res.status}`);
      return null as never;
    }
    try {
      if (fetchTotal) {
        fetchTotal(Number(res.headers.get('X-Total') || 0));
      }
      return await res.json();
    } catch (e) {
      alert(`Response parse error ${res.status}`);
      return null as never;
    }
  }

  public async getUserSettings(): Promise<Map<string, string>> {
    const res = await this.fetch<{ key: string; value: string }[]>('GET', 'v1/user/1/settings');
    const ret: Map<string, string> = new Map();
    for (const { key, value } of res) {
      ret.set(key, value);
    }
    return ret;
  }

  public async setUserSettings(config: Map<string, string>) {
    const data: { key: string; value: string }[] = [];
    for (const [key, value] of config.entries()) {
      data.push({ key, value });
    }
    return this.fetch('PUT', 'v1/user/1/settings', { data });
  }
}
