export interface Prediction { kind: 'f1' | 'cricket'; eventId: string; player: string; picks: string[]; startsAt: string; savedAt: string }
export interface Result { kind: Prediction['kind']; eventId: string; picks: string[] }
export const predictionKey = 'cmnafi.play.predictions.v1';
export const profileKey = 'cmnafi.play.profile.v1';
export function validPrediction(value: unknown): value is Prediction {
  if (!value || typeof value !== 'object') return false;
  const p = value as Prediction;
  return (p.kind === 'f1' || p.kind === 'cricket') && typeof p.eventId === 'string' && typeof p.player === 'string' && p.player.length > 0 && p.player.length <= 40 && Array.isArray(p.picks) && p.picks.every(v => typeof v === 'string') && p.picks.length === (p.kind === 'f1' ? 3 : 1) && (p.kind !== 'f1' || new Set(p.picks).size === 3) && Number.isFinite(Date.parse(p.startsAt)) && Number.isFinite(Date.parse(p.savedAt)) && Date.parse(p.savedAt) < Date.parse(p.startsAt);
}
export function scorePrediction(prediction: Prediction, result: Result): number | null {
  if (prediction.kind !== result.kind || prediction.eventId !== result.eventId) return null;
  if (prediction.kind === 'cricket') return prediction.picks[0] === result.picks[0] ? 10 : 0;
  return prediction.picks.reduce((points, driver, i) => points + (driver === result.picks[i] ? [25,18,15][i] : 0), 0);
}
export function upsertPrediction(saved: Prediction[], next: Prediction, now = Date.now()): Prediction[] {
  if (!validPrediction(next) || Date.parse(next.startsAt) <= now) throw new Error('This event has started. Picks are locked.');
  return [...saved.filter(p => !(p.kind === next.kind && p.eventId === next.eventId && p.player.toLowerCase() === next.player.toLowerCase())), next];
}
