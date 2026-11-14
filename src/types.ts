// ─────────────────────────────────────────────────────────────────────────────
// Theme definition types — the shape of a VS Code color theme JSON file
// ─────────────────────────────────────────────────────────────────────────────

export interface TokenColor {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  };
}

export interface SemanticTokenStyle {
  foreground?: string;
  fontStyle?: string;
}

export interface ThemeDefinition {
  $schema: string;
  name: string;
  type: string;
  colors: Record<string, string>;
  tokenColors: TokenColor[];
  semanticHighlighting: boolean;
  semanticTokenColors: Record<string, string | SemanticTokenStyle>;
}
