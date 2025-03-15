import {Injectable} from '@angular/core';
export interface Script {
  name: string;
  src: string;
}

const ScriptStore: Script[] = [
  {name: 'lodash', src: 'https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js'},
  {name: 'PN532_core', src: 'https://cdn.jsdelivr.net/npm/pn532.js@0/dist/pn532.min.js'},
  {name: 'PN532_Hf14a', src: 'https://cdn.jsdelivr.net/npm/pn532.js@0/dist/plugin/Hf14a.min.js'},
  {name: 'PN532_WebSerial', src: 'https://cdn.jsdelivr.net/npm/pn532.js@0/dist/plugin/WebserialAdapter.min.js'}
];

export interface ScriptWrapper {
  script: string;
  loaded: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private scripts: Record<string, { loaded: boolean; src: string }> = {};
  private subscribers: Record<string, (() => void)[]> = {};

  constructor() {
    ScriptStore.forEach((script: Script) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]): Promise<ScriptWrapper[]> {
    const promises: Promise<ScriptWrapper>[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string): Promise<ScriptWrapper> {
    return new Promise<ScriptWrapper>((resolve) => {
      //resolve if already loaded
      if (this.scripts[name]?.loaded) {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      } else {
        //load script
        const script: HTMLScriptElement = document.createElement('script');
        script.type = 'text/javascript';
        // @ts-expect-error IE compatibility
        if (script.readyState) {  //IE
          // @ts-expect-error IE compatibility
          script.onreadystatechange = (): void => {
            // @ts-expect-error IE compatibility
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              // @ts-expect-error IE compatibility
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              this.notifyScriptLoadFinished(name);
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  //Others
          script.onload = (): void => {
            this.scripts[name].loaded = true;
            this.notifyScriptLoadFinished(name);
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (): void => resolve({script: name, loaded: false, status: 'Error'});
        script.src = this.scripts[name].src;
        document.head.appendChild(script);
      }
    });
  }


  subscribeScriptLoaded(scriptName: string, callback: () => void): void {
    if (this.subscribers[scriptName] === undefined) {
      this.subscribers[scriptName] = [];
    }
    this.subscribers[scriptName].push(callback);
    if (this.scripts[scriptName]?.loaded) {
      callback();
    }
  }

  notifyScriptLoadFinished(scriptName: string): void {
    if (this.scripts[scriptName] === undefined) {
      this.scripts[scriptName] = {loaded: true, src: ''};
    }
    this.subscribers[scriptName]?.forEach(callback => {
      callback();
    });
  }
}
