import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendGeminiEmergencyTriage } from '../services/geminiService';

describe('Gemini AI Emergency Triage Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('generates structured emergency triage for a fall scenario via fallback when offline', async () => {
    // Mock fetch to simulate offline/network error
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const result = await sendGeminiEmergencyTriage({
      prompt: 'I fell down and cannot stand up',
    });

    expect(result).toBeDefined();
    expect(result.urgency).toBe('high');
    expect(result.situation_summary).toContain('fall');
    expect(Array.isArray(result.recommended_actions)).toBe(true);
    expect(result.recommended_actions.length).toBeGreaterThan(0);
    expect(result.disclaimer).toBeDefined();
  });

  it('prioritizes critical urgency for chest pain or breathing symptoms', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const result = await sendGeminiEmergencyTriage({
      prompt: 'Severe sudden chest pain and shortness of breath',
    });

    expect(result).toBeDefined();
    expect(result.urgency).toBe('critical');
    expect(result.recommended_actions.some((a) => a.includes('911'))).toBe(true);
  });

  it('throws a descriptive error for API validation failures', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: {
        get: () => 'application/json',
      },
      json: vi.fn().mockResolvedValue({ error: 'Prompt is required.' }),
    });

    await expect(sendGeminiEmergencyTriage({ prompt: 'Need help' })).rejects.toThrow(
      'Prompt is required.'
    );
  });

  it('normalizes incomplete API response payloads safely', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        urgency: 'critical',
        recommended_actions: ['  Call emergency services now  '],
      }),
    });

    const result = await sendGeminiEmergencyTriage({
      prompt: 'Severe reaction and breathing issue',
    });

    expect(result.urgency).toBe('critical');
    expect(result.recommended_actions).toEqual(['Call emergency services now']);
    expect(result.what_to_tell_responders.length).toBeGreaterThan(0);
    expect(result.important_information.length).toBeGreaterThan(0);
  });
});
