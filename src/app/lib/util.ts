export function cloneObject(obj: any): any{
  return JSON.parse(JSON.stringify(obj));
}

export function millisecondsToHms(milliseconds: number, hideHours: boolean = false): string {
  const h: number = Math.floor(milliseconds / 3600000);
  const m: number = Math.floor((milliseconds % 3600000) / 60000);
  const s:number = Math.floor((milliseconds % 3600000) % 60000 / 1000);
  const hDisplay = h < 10 ? '0' + h : h;
  const mDisplay = m < 10 ? '0' + m : m;
  const sDisplay = s < 10 ? '0' + s : s;

  return (h === 0 && hideHours ? '' : hDisplay + ':') + mDisplay + ':' + sDisplay;
}

export function padZeros(str: string, minLength: number): string {
  return '0'.repeat(minLength - str.length) + str;
}
