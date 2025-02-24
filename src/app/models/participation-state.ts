export enum ParticipationState {
  REGISTERED,
  PRESENT,
  FINISHED,
  ABSENT,
  ABORTED
}

export const ParticipationStateNames: string[] = [
  $localize`angemeldet`,
  $localize`anwesend`,
  $localize`abgegeben`,
  $localize`abwesend`,
  $localize`abgebrochen`
];
