export interface ProjectCandidate {
  name: string;
  dateRange?: string;
  description?: string;
  technologies?: string[];
}

const MONTHS_ES = /(ene\.|feb\.|mar\.|abr\.|may\.|jun\.|jul\.|ago\.|sept\.|oct\.|nov\.|dic\.)/i;
const DATE_RANGE_REGEX = new RegExp(
  `(?:${MONTHS_ES.source}\\s?\\d{4}|\\d{4}(?:-\\d{2})?)\\s*-\\s*(?:actualidad|${MONTHS_ES.source}\\s?\\d{4}|\\d{4}(?:-\\d{2})?)`,
  'i'
);

function isTitleLine(line: string): boolean {
  if (!line) return false;
  const l = line.trim();
  if (l.length < 2 || l.length > 120) return false;
  // Excluir líneas claramente no título
  if (/^(asociad[ao]\s+con|logotipo\s+de|technologies:|contributions:)/i.test(l)) return false;
  if (/^[-•]/.test(l)) return false; // bullets
  // Evitar que una fecha sea considerada título
  if (DATE_RANGE_REGEX.test(l)) return false;
  return true;
}

function normalizeTechnologies(lines: string[]): string[] {
  const techs: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^technologies:?/i.test(trimmed)) {
      const rest = trimmed.replace(/^[Tt]echnologies:?/i, '').trim();
      const parts = rest
        .split(/[,•]|\s-\s|\n|\t|\s{2,}|-/)
        .map(s => s.trim())
        .filter(Boolean);
      techs.push(...parts);
    } else if (/^[-•]/.test(trimmed)) {
      const item = trimmed.replace(/^[-•]\s?/, '').trim();
      if (item) techs.push(item);
    }
  }
  // Deduplicar conservando orden
  const seen = new Set<string>();
  const unique = techs.filter(t => {
    const key = t.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique;
}

export function extractProjectCandidates(raw: string): ProjectCandidate[] {
  if (!raw || !raw.trim()) return [];

  const lines = raw
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const candidates: ProjectCandidate[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Detectar título
    if (isTitleLine(line)) {
      const name = line;
      let j = i + 1;
      let dateRange: string | undefined;
      const descParts: string[] = [];
      const techLines: string[] = [];

      // Capturar bloque siguiente hasta que inicie un nuevo posible título
      while (j < lines.length) {
        const cur = lines[j];
        if (DATE_RANGE_REGEX.test(cur) && !dateRange) {
          dateRange = cur;
          j += 1;
          continue;
        }
        if (/^technologies:?/i.test(cur) || /^[-•]/.test(cur)) {
          techLines.push(cur);
          j += 1;
          continue;
        }
        if (isTitleLine(cur)) {
          break; // Nuevo proyecto
        }
        // Texto descriptivo genérico
        descParts.push(cur);
        j += 1;
      }

      const technologies = normalizeTechnologies(techLines);
      const description = descParts.join(' ').trim();

      // Validación mínima del candidato
      if (name && (description || technologies.length > 0 || dateRange)) {
        candidates.push({ name, dateRange, description, technologies });
      }

      i = j;
      continue;
    }

    i += 1;
  }

  return candidates;
}


