// ─────────────────────────────────────────────────────────────────────────────
// Classical Dark — color palette
// ─────────────────────────────────────────────────────────────────────────────
                                                    
// Gray scale — UI structure
const gray1  = "#1E1F22"; // deepest background (editor bg, active tab, window border)
const gray1b = "#27292C"; // chrome background (title bar, status bar, sidebar, activity bar, panel) — a clear gray step above the editor bg
const gray2  = "#2B2D30"; // panel / sidebar background
const gray3  = "#393B40"; // hover backgrounds, input bg, secondary panels
const gray4  = "#43454A"; // borders, separators, dividers
const gray4b = "#34363C"; // subtle structural borders (panel, editor group, tab bar) — tracks the gray1b chrome lift
const gray5  = "#4E5157"; // subtle borders, disabled borders
const gray6  = "#80858C"; // disabled text / very muted foreground
const gray7  = "#A8ACB3"; // muted/secondary foreground, line numbers inactive
const gray9  = "#9DA0A8"; // status bar widget text, breadcrumbs
const gray10 = "#B4B8BF"; // secondary foreground, inactive tab text
const gray11 = "#CED0D6"; // active foreground, selected tab text
const gray12 = "#DFE1E5"; // primary UI foreground (menus, labels)
const gray13 = "#F0F1F2"; // brightest foreground (settings header hover)
const gray14 = "#FFFFFF"; // pure white (button text on colored bg)

// Editor text
const editorForeground = "#BCBEC4"; // default editor text
const editorBackground = gray1;     // #1E1F22

// Blues — accent / interactive
const blue2  = "#4570B8"; // selection bg (list, tree)
const blue3  = "#4570B8"; // focused selection, search option selected
const blue4  = "#375FAD"; // button/extension hover, info border, modified-item indicator
const blue5  = "#366ACE"; // badges, primary button, extension button
const blue6  = "#3574F0"; // focus ring, active border/underline, checkbox select
const blue7  = "#467FF2"; // progress bar
const blue8  = "#548AF7"; // info foreground, ctrl-click link, action icons
const blue9  = "#6B9BFA"; // link foreground, modified item
const blue10 = "#83ACFC"; // hover-widget match highlight, active signature param

// Greens — success / added
const green3 = "#375239"; // passed-test retired icon
const green6 = "#57965C"; // remote status badge bg, test coverage
const green7 = "#5FAD65"; // success icons (debug, test, notebook), editor hint
const green8 = "#73BD79"; // snippet symbol icon

// Yellows — warnings / metadata
const yellow1 = "#3D3223"; // warning bg (deepest)
const yellow3 = "#826A41"; // warning border
const yellow4 = "#9E814A"; // warning marker bg, unhandled conflict border
const yellow5 = "#BA9752"; // search match, warning status badge
const yellow6 = "#D6AE58"; // warning foreground / icons
const yellow7 = "#F2C55C"; // light bulb, breakpoint, warning accents

// Reds — errors / deleted
const red3  = "#5E3838"; // error bg medium, breakpoint bg
const red5  = "#9C4E4E"; // error background (status badge, marker)
const red6  = "#BD5757"; // error border / hover background
const red7  = "#E47474"; // error foreground / icons (squiggles, console, problems)

// Oranges
const orange6 = "#E08855"; // pre-release extension icon, chart orange
const orange8 = "#F0AC81"; // debugger value foreground


// ─────────────────────────────────────────────────────────────────────────────
// Terminal-only colors — classic dark ANSI palette
// ─────────────────────────────────────────────────────────────────────────────
// Dedicated to the integrated terminal — NOT shared with editor/UI keys. These
// reproduce a well-balanced classic dark ANSI palette so the integrated
// terminal renders program output (git, ls, prompts, TUIs) with familiar,
// legible colors.
//
// The ANSI palette stands on its own, but bg/fg are adapted to this theme: the
// terminal shares the editor's background and default text color so the panel
// sits in the same tonal "room" as code. A bluer/lighter bg read out of place
// next to the editor, and a pure-white fg was too flashy next to the softer
// editor text — so we use the editor's values here instead.
const termBg            = gray1;            // editor background #1E1F22
const termFg            = editorForeground; // editor default text #BCBEC4
// Search highlights: unselected match + selected match.
const termSearchBg      = "#FFE082"; // search match background
const termSearchFg      = "#000000"; // search match foreground
const termSearchSelBg   = "#F2A57E"; // selected search match background
// Normal ANSI row (palette 0–7)
const termBlack         = "#1D1F21"; // palette 0  — black
const termRed           = "#CC6666"; // palette 1  — red
const termGreen         = "#B5BD68"; // palette 2  — green
const termYellow        = "#F0C674"; // palette 3  — yellow
const termBlue          = "#81A2BE"; // palette 4  — blue
const termMagenta       = "#B294BB"; // palette 5  — magenta
const termCyan          = "#8ABEB7"; // palette 6  — cyan
const termWhite         = "#C5C8C6"; // palette 7  — white
// Bright ANSI row (palette 8–15)
const termBrightBlack   = "#666666"; // palette 8  — bright black
const termBrightRed     = "#D54E53"; // palette 9  — bright red
const termBrightGreen   = "#B9CA4A"; // palette 10 — bright green
const termBrightYellow  = "#E7C547"; // palette 11 — bright yellow
const termBrightBlue    = "#7AA6DA"; // palette 12 — bright blue
const termBrightMagenta = "#C397D8"; // palette 13 — bright magenta
const termBrightCyan    = "#70C0B1"; // palette 14 — bright cyan
const termBrightWhite   = "#EAEAEA"; // palette 15 — bright white

// ─────────────────────────────────────────────────────────────────────────────
// Semantic syntax colors
// ─────────────────────────────────────────────────────────────────────────────

const syntaxKeyword      = "#CF8E6D"; // keyword (orange-tan)
const syntaxString       = "#6AAB73"; // string (green)
const syntaxNumber       = "#2AACB8"; // number (teal-cyan)
// Lifted from #7A7E86 (4.05:1, fails AA) to clear 4.5:1 on the editor bg.
const syntaxComment      = "#878C94"; // line / block / doc comment
const syntaxDocComment   = syntaxComment;
const syntaxDocTag       = syntaxComment;
const syntaxFunction     = "#56A8F5"; // function declaration (blue)
// Green-teal, pushed away from number cyan #2AACB8 in both hue (165° vs 185°)
// and lightness so `x: number = 42` stays differentiable, incl. for CVD readers.
const syntaxType         = "#3FC0A0"; // type / type parameter (green-teal)
// Member color: used for "key-like" tokens — object literal keys, dict keys,
// property names (obj.prop), enum members, instance fields. Not for variables.
const syntaxMember       = "#C77DBB"; // (purple-pink) keys/properties/enum members
const syntaxField        = syntaxMember; // instance field (same)
const syntaxMetadata     = "#B3AE60"; // metadata / decorators (yellow-green)
const syntaxHtmlTag      = "#D5B778"; // HTML / XML tag name (gold)
const syntaxRegexp       = "#42C3D4"; // regexp
const syntaxInvalid      = "#FA6F7C"; // bad character / errors
const syntaxLabel        = "#32B8AF"; // label (teal)
const syntaxJsxComponent = "#9C9CFF"; // JSX component
const syntaxTypeParam    = syntaxType;

// Line / gutter colors
const lineNumberColor       = "#74787F"; // line numbers
const lineNumberActiveColor = syntaxMember;     // line number on caret row
const caretRowBackground    = "#26282E"; // caret row
const indentGuideColor      = "#313438"; // indent guide
const indentGuideActive     = "#666870"; // selected indent guide
// Highlight palette — each category owns a distinct hue so they are never confused:
//   steel blue (#2A4D7B) → selection (desaturated so syntax colors stay legible
//                          on top; cobalt #1857C2 wash marks other occurrences)
//   amber      (#BA9752) → find / search matches
//   teal       (#0DC4B0) → word occurrence — read access (cool, observational)
//   rose       (#E05585) → word occurrence — write access (warm, signals mutation)
//   violet     (#9B6DF5) → symbol highlight (go-to-definition target)
//   soft blue  (#5480F0) → range / navigation highlight
// Active find: yellow5 bg is dark enough for white text, and the same hue at full
// opacity for the border makes the active match pop against the dimmer siblings.
const findMatchBackground   = green7; // #5FAD65 — solid, legible with white text
const findMatchForeground   = "#FFFFFF"; // white — forced over syntax token colors
const findMatchBorder       = green7;  // #5FAD65 — solid ring for the active match
// Sibling-match fill (search editor, peek view, list filter) — yellow wash, non-dominant
// so none of the siblings claim focus.
const siblingMatchBackground = yellow7 + "33"; // #F2C55C @ 20% — visible but non-dominant
const siblingMatchBorder     = yellow6 + "66"; // #D6AE58 @ 40% — clear edge marker

// ─────────────────────────────────────────────────────────────────────────────
// Transparency overlays (frequently reused alpha-composited values)
// ─────────────────────────────────────────────────────────────────────────────

const transparent           = "#00000000";
const dropOverlay           = "#35538F40"; // drag-and-drop tint (steel blue #35538F @ 25% alpha)
// Non-active find matches: yellow7 wash — same hue family as active match.
// At 27% alpha the highlight reads clearly without competing with the active match.
const findMatchHighlight    = yellow7 + "44"; // #F2C55C @ 27%
const errorBackgroundOverlay= "#DB5C5C18"; // error line background
const warningBackgroundOverlay = "#D6AE5818"; // warning line background
const infoBackgroundOverlay = "#548AF718"; // info line background
const stackFrameOverlay     = "#2A509180"; // debug current frame
const focusedStackFrameOverlay = "#1A3B2D80"; // debug focused frame
// Diff line backgrounds — success green / danger red, so the diff body matches
// the change bars in the gutter beside it. Held at ~16% alpha: the line tint
// must stay light enough that syntax-colored code drawn on top (string green,
// number teal, keyword orange) keeps its contrast — at the old ~33% those tokens
// fell to ~2.7:1, well under AA. At 16% the change still reads at a glance but
// colored tokens recover to ~4.2:1.
const insertedLineOverlay   = "#2ea0432A"; // diff inserted line — success green @ ~16%
const removedLineOverlay    = "#f851492A"; // diff removed line  — danger red @ ~16%
// ─────────────────────────────────────────────────────────────────────────────
// Git colors — two surfaces, two brightness tiers:
//
//   • Change BARS (gutter strokes, minimap ticks, overview-ruler marks) render on
//     the dark editor bg (gray1 #1E1F22). These use the *emphasis* hues at full
//     opacity so changed lines are obvious at a glance.
//   • Decoration FOREGROUNDS (SCM list, file labels) render on the chrome bg
//     (gray1b #27292C) and, when a row is selected, on a saturated blue
//     (~#2E436E). The base decoration hues dip below AA on that blue row, so we
//     adopt *brighter steps* (green, yellow, red, orange, blue) — same hues,
//     lifted one step — which clear 5:1 on the blue row and 5.7–9.5:1 on the
//     sidebar.
//
// The signature red #ff7b72 / orange #f0883e are kept verbatim for
// deleted/conflict (per design call): AA-clean on sidebar/editor, ~3.9:1 only on
// the rare selected-blue row, where they stay clearly legible.
//
// Change bars — emphasis hues (added green, modified gold, deleted red).
const gitAddedBar    = "#3fb950"; // added line bar    — success green (6.49:1 on editor)
const gitModifiedBar = "#dbab36"; // modified line bar — attention gold (7.76:1 on editor)
const gitDeletedBar  = "#ff7b72"; // deleted line bar  — danger red    (6.54:1 on editor)
// Decoration foregrounds — brighter steps, lifted for AA on the selected row.
const gitAdded       = "#3fb950"; // added / staged-modified-add (5.74:1 sidebar)
const gitUntracked   = "#7ee787"; // untracked (new files) — brighter so new ≠ tracked (9.49:1)
const gitModified    = "#d29922"; // modified / staged-modified  — attention gold (5.78:1 sidebar)
const gitDeleted     = "#ff7b72"; // deleted / staged-deleted    — danger red (5.78:1 sidebar)
const gitRenamed     = "#79c0ff"; // renamed                     — accent blue (7.50:1 sidebar)
const gitConflict    = "#f0883e"; // conflicting                 — orange (5.76:1 sidebar)
const gitIgnored     = "#6e7681"; // ignored                     — subtle, intentionally dim (3.17:1)
const gitSubmodule   = "#8b949e"; // submodule                   — muted, brighter step (4.74:1 sidebar)
// SCM history-graph swimlanes — accent ramp (blue / green / purple / orange /
// pink), bright steps chosen for legible strokes on the editor bg.
const gitGraph1      = "#79c0ff"; // accent blue
const gitGraph2      = "#56d364"; // success green
const gitGraph3      = "#d2a8ff"; // purple
const gitGraph4      = "#f0883e"; // orange
const gitGraph5      = "#ff9bce"; // pink
const blackAlpha20          = "#00000033"; // subtle darkening hover (notebook cell)
const whiteAlpha05          = "#FFFFFF08"; // very subtle hover
const whiteAlpha08          = "#FFFFFF14"; // subtle hover (status bar)
const whiteAlpha15          = "#FFFFFF26"; // hover/active (status bar item)
const whiteAlpha30          = "#FFFFFF4D"; // scrollbar slider hover/active
const blackAlpha40          = "#00000060"; // widget shadow
const blueRowFocus          = "#3574F010"; // focused settings row
const blueRowHover          = "#3574F008"; // hovered settings row

// ─────────────────────────────────────────────────────────────────────────────
// Theme definition type
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

// ─────────────────────────────────────────────────────────────────────────────
// Theme export
// ─────────────────────────────────────────────────────────────────────────────

const theme: ThemeDefinition = {
  $schema: "vscode://schemas/color-theme",
  name: "Classical Dark",
  type: "dark",

  // ───────────────────────────────────────────────────────────────────────────
  // UI Colors
  // ───────────────────────────────────────────────────────────────────────────
  colors: {
    // ── Base / shared ──
    "foreground":                                 editorForeground,
    "disabledForeground":                         gray6,
    "descriptionForeground":                      gray7,
    "errorForeground":                            red7,
    "focusBorder":                                blue6,
    "icon.foreground":                            gray10,
    "selection.background":                       blue3,
    "sash.hoverBorder":                           blue6,
    "window.activeBorder":                        gray1,
    "window.inactiveBorder":                      gray1,
    "widget.border":                              gray4b,
    "widget.shadow":                              blackAlpha40,

    // ── Text ──
    "textBlockQuote.background":                  gray2,
    "textBlockQuote.border":                      gray4,
    "textCodeBlock.background":                   gray3,
    "textLink.foreground":                        blue9,
    "textLink.activeForeground":                  blue9,  // was blue8; #548AF7 drops to 3.39 on hover-row, blue9 holds 4.11+
    "textPreformat.foreground":                   syntaxString,
    "textSeparator.foreground":                   gray4,

    // ── Toolbar (editor titlebar action buttons) ──
    "toolbar.hoverBackground":                    whiteAlpha08,
    "toolbar.hoverOutline":                       transparent,
    "toolbar.activeBackground":                   whiteAlpha15,

    // ── Editor ──
    "editor.background":                          editorBackground,
    "editor.foreground":                          editorForeground,
    "editorLineNumber.foreground":                lineNumberColor,
    "editorLineNumber.activeForeground":          lineNumberActiveColor,
    "editorCursor.foreground":                    gray11,
    "editorCursor.background":                    editorBackground,

    // Editor selection — steel blue, desaturated so token colors survive on top
    // (no selectionForeground override: selected code keeps its syntax colors).
    "editor.selectionBackground":                 "#2A4D7BE6",
    "editor.inactiveSelectionBackground":         "#2A4D7B99",
    // Other occurrences of the selected word — cobalt, low-alpha wash.
    "editor.selectionHighlightBackground":        "#1857C242",
    "editor.selectionHighlightBorder":            "#1857C273",

    // Find/search — warm amber family, clearly distinct from cobalt selection.
    "editor.findMatchBackground":                 findMatchBackground,
    "editor.findMatchBorder":                     findMatchBorder,
    "editor.findMatchForeground":                 findMatchForeground,
    "editor.findMatchHighlightBackground":        findMatchHighlight,
    "editor.findMatchHighlightBorder":            yellow7 + "80",
    // The active match carries BOTH the current-match and the all-matches-highlight
    // decorations. Leaving findMatchHighlightForeground undefined lets syntax token
    // colors bleed through the highlight layer (vscode#213686), tinting the active
    // glyphs so findMatchForeground's white reads as a muted off-white. Define it
    // explicitly so no layer bleeds — every match foreground is forced white.
    "editor.findMatchHighlightForeground":        findMatchForeground,
    "editor.findRangeHighlightBackground":        "#5480F018",
    "editor.findRangeHighlightBorder":            transparent,
    // Sidebar search results — amber wash, every hit looks equal, none claims focus.
    "searchEditor.findMatchBackground":           siblingMatchBackground,
    "searchEditor.findMatchBorder":               siblingMatchBorder,

    // Word occurrences under the cursor.
    // Teal  → read  (cool, calm — "this symbol is referenced here").
    // Rose  → write (warm, vivid — "this symbol is modified here").
    // Peach → text  (softer — pure-text match, no semantic info).
    "editor.wordHighlightBackground":             "#0DC4B030",
    "editor.wordHighlightBorder":                 "#0DC4B058",
    "editor.wordHighlightStrongBackground":       "#E0558540",
    "editor.wordHighlightStrongBorder":           "#E0558562",
    "editor.wordHighlightTextBackground":         "#CF8E6D28",
    "editor.wordHighlightTextBorder":             "#CF8E6D48",

    // Hover highlight — neutral white wash (no hue: just "thing under cursor").
    "editor.hoverHighlightBackground":            "#FFFFFF10",
    // Range highlight — soft blue wash for Quick Open / Find in Selection.
    "editor.rangeHighlightBackground":            "#5480F018",
    "editor.rangeHighlightBorder":                transparent,
    // Symbol highlight (go-to-def target) — vibrant violet, distinct destination marker.
    "editor.symbolHighlightBackground":           "#9B6DF540",
    "editor.symbolHighlightBorder":               "#9B6DF562",

    // Unicode anomaly — warm yellow caution wash, clearly a "look at this" signal.
    "editorUnicodeHighlight.background":          "#F2C55C18",
    "editorUnicodeHighlight.border":              yellow7,

    // Current line — flat row tint, no border (border would compete with cursor).
    "editor.lineHighlightBackground":             caretRowBackground,
    "editor.lineHighlightBorder":                 transparent,

    // Indent guides
    "editorIndentGuide.background1":              indentGuideColor,
    "editorIndentGuide.activeBackground1":        indentGuideActive,

    // Rulers
    "editorRuler.foreground":                     indentGuideColor,

    // Bracket matching
    "editorBracketMatch.background":              "#43454A60",
    "editorBracketMatch.border":                  gray5,
    "editorBracketHighlight.foreground1":         syntaxHtmlTag,
    "editorBracketHighlight.foreground2":         syntaxFunction,
    "editorBracketHighlight.foreground3":         syntaxString,
    "editorBracketHighlight.foreground4":         syntaxMember,
    "editorBracketHighlight.foreground5":         syntaxNumber,
    "editorBracketHighlight.foreground6":         syntaxMetadata,
    "editorBracketHighlight.unexpectedBracket.foreground": red7,

    // Bracket-pair indent guides — colors only apply when the user enables
    // `editor.guides.bracketPairs`. Inactive rails are the bracket-pair hues
    // dimmed so they read like guides; the active pair lifts to full color.
    "editorBracketPairGuide.background1":         syntaxHtmlTag + "40",
    "editorBracketPairGuide.background2":         syntaxFunction + "40",
    "editorBracketPairGuide.background3":         syntaxString + "40",
    "editorBracketPairGuide.background4":         syntaxMember + "40",
    "editorBracketPairGuide.background5":         syntaxNumber + "40",
    "editorBracketPairGuide.background6":         syntaxMetadata + "40",
    "editorBracketPairGuide.activeBackground1":   syntaxHtmlTag,
    "editorBracketPairGuide.activeBackground2":   syntaxFunction,
    "editorBracketPairGuide.activeBackground3":   syntaxString,
    "editorBracketPairGuide.activeBackground4":   syntaxMember,
    "editorBracketPairGuide.activeBackground5":   syntaxNumber,
    "editorBracketPairGuide.activeBackground6":   syntaxMetadata,

    // Whitespace — should read as texture, not content (gray6 was comment-bright).
    "editorWhitespace.foreground":                gray5,

    // Folding
    "editor.foldBackground":                      "#393B40A0",
    "editor.foldPlaceholderForeground":           gray7,

    // Linked editing
    "editor.linkedEditingBackground":             "#35538F60",

    // Ctrl/Cmd-hover link in the editor — same hue as hyperlinks elsewhere.
    "editorLink.activeForeground":                blue8,

    // Unused/unreachable code — dim to 75% (default ~67%) so grayed-out code
    // still clears 4.5:1 against the editor background.
    "editorUnnecessaryCode.opacity":              "#000000C0",

    // Snippets
    "editor.snippetTabstopHighlightBackground":   "#35538F40",
    "editor.snippetFinalTabstopHighlightBackground": "#35538F60",
    "editor.snippetFinalTabstopHighlightBorder":  blue6,

    // Hover widget
    "editorHoverWidget.background":               gray3,
    "editorHoverWidget.foreground":               gray12,
    "editorHoverWidget.border":                   gray4b,
    "editorHoverWidget.statusBarBackground":      gray2,
    // Active parameter in signature help — blue10 holds 4.9:1 on the gray3 bg.
    "editorHoverWidget.highlightForeground":      blue10,

    // Widget (find, suggest, etc.)
    "editorWidget.background":                    gray2,
    "editorWidget.foreground":                    gray12,
    "editorWidget.border":                        gray4b,
    "editorWidget.resizeBorder":                  blue6,

    // Suggest widget
    "editorSuggestWidget.background":             gray2,
    "editorSuggestWidget.foreground":             editorForeground,
    "editorSuggestWidget.border":                 gray4b,
    "editorSuggestWidget.selectedBackground":     blue2,
    "editorSuggestWidget.selectedForeground":     gray14,  // white text on blue selection
    // Matched characters: blue9 holds AA on the gray2 rows; on the saturated
    // blue selected row only white stays legible (blue8 there was 1.49:1).
    "editorSuggestWidget.highlightForeground":    blue9,
    "editorSuggestWidget.focusHighlightForeground": gray14,
    // Icon for the selected row — force white so the symbol-kind glyph stays
    // legible against the saturated blue selection background.
    "editorSuggestWidget.selectedIconForeground": gray14,
    "editorSuggestWidgetStatus.foreground":       gray9,

    // Inline hints / inlays
    "editorInlayHint.background":                 "#2F3135",
    "editorInlayHint.foreground":                 gray7,
    "editorInlayHint.typeBackground":             "#2F3135",
    "editorInlayHint.typeForeground":             gray7,
    "editorInlayHint.parameterBackground":        "#2F3135",
    "editorInlayHint.parameterForeground":        gray7,

    // Code lens
    "editorCodeLens.foreground":                  gray7,

    // Code-action list (Quick Fix / refactor popup) — uses the same palette as
    // the suggest widget so the two surfaces look like siblings.
    "editorActionList.background":                gray2,
    "editorActionList.foreground":                gray12,
    "editorActionList.focusBackground":           blue2,
    "editorActionList.focusForeground":           gray14,

    // Light bulb
    "editorLightBulb.foreground":                 yellow7,
    "editorLightBulbAutoFix.foreground":          blue8,

    // Gutter decorations
    "editorGutter.background":                    editorBackground,
    "editorGutter.modifiedBackground":            gitModifiedBar,
    "editorGutter.addedBackground":               gitAddedBar,
    "editorGutter.deletedBackground":             gitDeletedBar,
    "editorGutter.commentRangeForeground":        gray6,
    "editorGutter.foldingControlForeground":      gray7,

    // Editor pane / empty group
    "editorGroup.border":                          gray4b,
    "editorGroup.dropBackground":                  dropOverlay,
    "editorGroup.emptyBackground":                 editorBackground,
    "editorGroupHeader.noTabsBackground":          gray1b,
    "editorGroupHeader.tabsBackground":            gray1b,
    "editorGroupHeader.tabsBorder":                gray4b,
    "editorGroupHeader.border":                    gray4b,
    "editorPane.background":                      editorBackground,

    // Sticky scroll — slightly lifted from editor bg so the pinned region
    // is distinguishable while scrolling, without clashing with syntax colors.
    "editorStickyScroll.background":              "#252629",
    "editorStickyScroll.border":                  gray4b,
    "editorStickyScroll.shadow":                  blackAlpha40,
    "editorStickyScrollHover.background":         gray3,

    // Marker navigation
    "editorMarkerNavigation.background":          gray2,
    "editorMarkerNavigationError.background":     red5,
    "editorMarkerNavigationWarning.background":   yellow4,
    "editorMarkerNavigationInfo.background":      blue5,
    "editorMarkerNavigationError.headerBackground": red3,
    "editorMarkerNavigationWarning.headerBackground": yellow1,
    "editorMarkerNavigationInfo.headerBackground": gray3,

    // Inline diff — word-level highlight sits ON TOP of the line bg, so the two
    // tints STACK on changed chars. Two competing goals: the word mark must stand
    // out from the surrounding line tint (so you can see WHICH words changed in a
    // mixed add/remove line), yet syntax-colored code on top must stay readable.
    // The bright change-bar hues (green/red) give the most separation per unit of
    // darkening, so at ~20% they lift the word mark to ~1.4:1 vs the line tint
    // (was ~1.1:1 — invisible) while colored tokens hold ~3.4:1 and default text
    // ~5:1. Using the bar hues also ties the word marks to the gutter bars.
    // A subtle border outlines each changed word — the fill alone can only
    // separate so far before it crushes text, so the outline carries the rest of
    // the "which words changed" signal at zero text-contrast cost.
    "diffEditor.insertedTextBackground":          "#3fb95033",
    "diffEditor.insertedTextBorder":              "#3fb95066",
    "diffEditor.removedTextBackground":           "#ff7b7233",
    "diffEditor.removedTextBorder":               "#ff7b7266",
    "diffEditor.border":                          gray4,
    "diffEditor.diagonalFill":                    "#43454A60",
    "diffEditor.insertedLineBackground":          insertedLineOverlay,
    "diffEditor.removedLineBackground":           removedLineOverlay,
    "diffEditorGutter.insertedLineBackground":    insertedLineOverlay,
    "diffEditorGutter.removedLineBackground":     removedLineOverlay,
    "diffEditorOverview.insertedForeground":      gitAddedBar,
    "diffEditorOverview.removedForeground":       gitDeletedBar,
    "diffEditor.unchangedRegionBackground":       "#2B2D3080",
    "diffEditor.unchangedRegionForeground":       gray9,
    "diffEditor.unchangedCodeBackground":         "#2B2D3040",

    // Multi-diff editor
    "multiDiffEditor.headerBackground":           gray2,
    "multiDiffEditor.background":                 editorBackground,
    "multiDiffEditor.border":                     gray4b,

    // Error / warning squiggles
    "editorError.foreground":                     red7,
    "editorError.border":                         transparent,
    "editorError.background":                     errorBackgroundOverlay,
    "editorWarning.foreground":                   yellow6,
    "editorWarning.border":                       transparent,
    "editorWarning.background":                   warningBackgroundOverlay,
    "editorInfo.foreground":                      blue8,
    "editorInfo.border":                          transparent,
    "editorInfo.background":                      infoBackgroundOverlay,
    "editorHint.foreground":                      green7,
    "editorHint.border":                          transparent,

    // Overview ruler
    // Foreground markers need alpha so they don't fully obscure the underlying ruler content.
    "editorOverviewRuler.background":             editorBackground,
    "editorOverviewRuler.border":                 gray4b,
    "editorOverviewRuler.findMatchForeground":    findMatchBorder + "B3",
    "editorOverviewRuler.rangeHighlightForeground": "#5480F0B3",
    "editorOverviewRuler.selectionHighlightForeground": "#1857C2B3",
    "editorOverviewRuler.wordHighlightForeground": "#0DC4B0B3",
    "editorOverviewRuler.wordHighlightStrongForeground": "#E05585B3",
    "editorOverviewRuler.wordHighlightTextForeground": "#CF8E6DB3",
    "editorOverviewRuler.modifiedForeground":     gitModifiedBar + "D9",
    "editorOverviewRuler.addedForeground":        gitAddedBar + "D9",
    "editorOverviewRuler.deletedForeground":      gitDeletedBar + "D9",
    "editorOverviewRuler.errorForeground":        red7 + "B3",
    "editorOverviewRuler.warningForeground":      yellow6 + "B3",
    "editorOverviewRuler.infoForeground":         blue8 + "B3",
    "editorOverviewRuler.bracketMatchForeground": gray5 + "B3",
    // Merge regions in the ruler — match the conflict convention: current = accent
    // blue, incoming = success green, common = neutral gray.
    "editorOverviewRuler.currentContentForeground": "#1f6febB3",
    "editorOverviewRuler.incomingContentForeground": "#2ea043B3",
    "editorOverviewRuler.commonContentForeground": gray4 + "B3",

    // Minimap
    "minimap.background":                         editorBackground,
    "minimap.findMatchHighlight":                 findMatchBorder + "B3",
    "minimap.selectionHighlight":                 "#1857C2B3",
    "minimap.selectionOccurrenceHighlight":       "#0DC4B060",
    "minimap.errorHighlight":                     red7,
    "minimap.warningHighlight":                   yellow6,
    "minimap.foregroundOpacity":                  "#000000C0",
    "minimapGutter.addedBackground":              gitAddedBar,
    "minimapGutter.modifiedBackground":           gitModifiedBar,
    "minimapGutter.deletedBackground":            gitDeletedBar,
    "minimapSlider.background":                   whiteAlpha05,
    "minimapSlider.hoverBackground":              whiteAlpha08,
    "minimapSlider.activeBackground":             whiteAlpha15,

    // Peek view
    "peekView.border":                            gray4b,
    "peekViewEditor.background":                  gray2,
    // Peek match highlights — amber wash (sibling tone).
    "peekViewEditor.matchHighlightBackground":    siblingMatchBackground,
    "peekViewEditor.matchHighlightBorder":        siblingMatchBorder,
    "peekViewEditorGutter.background":            gray2,
    "peekViewResult.background":                  gray2,
    "peekViewResult.fileForeground":              gray12,
    "peekViewResult.lineForeground":              gray9,
    "peekViewResult.matchHighlightBackground":    siblingMatchBackground,
    "peekViewResult.selectionBackground":         blue2,
    "peekViewResult.selectionForeground":         gray14,
    "peekViewTitle.background":                   gray2,
    "peekViewTitleDescription.foreground":        gray9,
    "peekViewTitleLabel.foreground":              gray12,
    "peekViewEditorStickyScroll.background":      gray2,

    // ── Activity bar ──
    "activityBar.background":                     gray1b,
    "activityBar.foreground":                     gray12,
    "activityBar.inactiveForeground":             gray6,
    "activityBar.border":                         gray4b,
    "activityBar.activeBorder":                   blue6,
    "activityBar.activeBackground":               "#3574F015",
    "activityBar.activeFocusBorder":              blue6,
    "activityBar.dropBorder":                     blue6,
    "activityBarBadge.background":                blue5,  // white badge digits at 5.1:1 (blue6 was 4.3)
    "activityBarBadge.foreground":                gray14,
    "activityBarTop.foreground":                  gray12,
    "activityBarTop.activeBorder":                blue6,
    "activityBarTop.inactiveForeground":          gray7,
    "activityBarTop.dropBorder":                  blue6,
    "activityBarTop.background":                  gray1b,
    "activityBarTop.activeBackground":            "#3574F015",

    // ── Side bar ──
    "sideBar.background":                         gray1b,
    "sideBar.foreground":                         gray10,
    "sideBar.border":                             gray4b,
    "sideBar.dropBackground":                     dropOverlay,
    "sideBarTitle.foreground":                    gray10,
    "sideBarTitle.background":                    gray1b,
    "sideBarSectionHeader.background":            transparent,
    "sideBarSectionHeader.foreground":            gray10,
    "sideBarSectionHeader.border":                gray4b,
    "sideBarActivityBarTop.border":               gray4b,
    // Sticky scroll lifted from the gray1b sideBar bg so pinned folders are
    // distinguishable while scrolling, but kept below gray3 hover so it
    // does not read as a permanently-hovered row.
    "sideBarStickyScroll.background":             "#35373C",
    "sideBarStickyScroll.border":                 gray4b,
    "sideBarStickyScroll.shadow":                 blackAlpha40,

    // ── Tabs ──
    // Tab bar sits on gray1b (chrome) so it reads distinct from the gray1 editor area.
    // The active tab drops to gray1 to visually "merge" with the editor below it.
    "tab.activeBackground":                       gray1,
    "tab.activeForeground":                       gray12,
    "tab.activeBorderTop":                        blue6,
    "tab.activeBorder":                           gray1,
    "tab.inactiveBackground":                     gray1b,
    "tab.inactiveForeground":                     gray10,
    "tab.inactiveModifiedBorder":                 blue9,
    "tab.activeModifiedBorder":                   blue6,
    "tab.unfocusedActiveModifiedBorder":          gray7,
    "tab.unfocusedInactiveModifiedBorder":        gray7,
    "tab.hoverBackground":                        gray3,
    "tab.hoverForeground":                        gray12,
    "tab.hoverBorder":                            transparent,
    "tab.unfocusedActiveBackground":              gray1,
    "tab.unfocusedActiveForeground":              gray10,
    "tab.unfocusedActiveBorderTop":               gray5,
    "tab.unfocusedHoverBackground":               gray3,
    "tab.unfocusedHoverForeground":               gray11,
    "tab.unfocusedInactiveForeground":            gray7,
    "tab.border":                                 gray4b,
    "tab.lastPinnedBorder":                       gray5,
    "tab.dragAndDropBorder":                      blue6,
    "tab.selectedBackground":                     gray1,
    "tab.selectedForeground":                     gray12,
    "tab.selectedBorderTop":                      blue6,

    // ── Title bar ──
    "titleBar.activeBackground":                  gray1b,
    "titleBar.activeForeground":                  gray12,
    "titleBar.inactiveBackground":                gray1b,
    "titleBar.inactiveForeground":                gray7,
    "titleBar.border":                            gray4b,

    // ── Command center ──
    "commandCenter.foreground":                   gray11,
    "commandCenter.activeForeground":             gray12,
    "commandCenter.inactiveForeground":           gray7,
    "commandCenter.background":                   gray3,
    "commandCenter.activeBackground":             gray4,
    "commandCenter.border":                       gray4b,
    "commandCenter.activeBorder":                 gray4b,
    "commandCenter.inactiveBorder":               gray4b,
    "commandCenter.debuggingBackground":          red3 + "B3",

    // ── Menu ──
    "menu.background":                            gray2,
    "menu.foreground":                            gray12,
    "menu.selectionBackground":                   blue2,
    "menu.selectionForeground":                   gray14,
    "menu.selectionBorder":                       transparent,
    "menu.separatorBackground":                   gray4,
    "menu.border":                                gray4b,
    "menubar.selectionBackground":                gray3,
    "menubar.selectionForeground":                gray12,
    "menubar.selectionBorder":                    transparent,

    // ── Status bar ──
    "statusBar.background":                       gray1b,
    "statusBar.foreground":                       gray9,
    "statusBar.border":                           gray4b,
    "statusBar.debuggingBackground":              red3,
    "statusBar.debuggingForeground":              gray12,
    "statusBar.debuggingBorder":                  transparent,
    "statusBar.noFolderBackground":               gray1b,
    "statusBar.noFolderForeground":               gray9,
    "statusBar.noFolderBorder":                   gray4b,
    "statusBar.focusBorder":                      blue6,
    "statusBarItem.hoverBackground":              whiteAlpha08,
    "statusBarItem.activeBackground":             whiteAlpha15,
    "statusBarItem.hoverForeground":              gray12,
    "statusBarItem.prominentBackground":          gray3,
    "statusBarItem.prominentHoverBackground":     gray4,
    "statusBarItem.prominentForeground":          gray12,
    // Remote/warning status badges use dark text — these mid-bright backgrounds need dark foreground.
    "statusBarItem.remoteBackground":             green6,
    "statusBarItem.remoteForeground":             gray1,
    "statusBarItem.remoteHoverBackground":        green7,
    "statusBarItem.remoteHoverForeground":        gray1,
    "statusBarItem.errorBackground":              red5,
    "statusBarItem.errorForeground":              gray14,
    "statusBarItem.errorHoverBackground":         red6,
    "statusBarItem.errorHoverForeground":         gray14,
    "statusBarItem.warningBackground":            yellow5,  // gray1 text at 6.0:1 (yellow4 was 4.47)
    "statusBarItem.warningForeground":            gray1,
    "statusBarItem.warningHoverBackground":       yellow6,
    "statusBarItem.warningHoverForeground":       gray1,
    "statusBarItem.compactHoverBackground":       whiteAlpha15,
    "statusBarItem.focusBorder":                  blue6,
    "statusBarItem.offlineBackground":            red5,
    "statusBarItem.offlineForeground":            gray14,
    "statusBarItem.offlineHoverBackground":       red6,
    "statusBarItem.offlineHoverForeground":       gray14,

    // ── Quick input / Command palette ──
    "quickInput.background":                      gray2,
    "quickInput.foreground":                      gray12,
    "quickInputList.focusBackground":             "#2E3F5C",
    "quickInputList.focusForeground":             gray12,
    "quickInputList.focusIconForeground":         gray12,
    "quickInputTitle.background":                 gray3,

    // ── Picker group ──
    "pickerGroup.border":                         gray4b,
    "pickerGroup.foreground":                     gray7,

    // ── Lists / Trees ──
    "list.activeSelectionBackground":             blue2,
    "list.activeSelectionForeground":             gray14,
    "list.activeSelectionIconForeground":         gray14,
    // Inactive selection uses a desaturated blue (not gray) so a row clicked in
    // the Search results list — which doesn't immediately receive list focus —
    // still reads as "selected" after the first click rather than looking unfocused.
    "list.inactiveSelectionBackground":           "#2E436E80",
    "list.inactiveSelectionForeground":           gray12,
    "list.inactiveSelectionIconForeground":       gray11,
    "list.hoverBackground":                       gray3,
    "list.hoverForeground":                       gray12,
    "list.focusBackground":                       blue2,
    "list.focusForeground":                       gray14,
    "list.focusOutline":                          transparent,
    "list.focusAndSelectionOutline":              transparent,
    "list.dropBackground":                        dropOverlay,
    "list.dropBetweenBackground":                 blue6,
    // Matched characters in lists / quick input — white on the blue focus row
    // (blue-on-blue was 1.49:1, invisible); blue9 on unfocused rows.
    "list.highlightForeground":                   blue9,
    "list.focusHighlightForeground":              gray14,
    "list.invalidItemForeground":                 red7,
    "list.errorForeground":                       red7,
    "list.warningForeground":                     yellow6,
    "list.deemphasizedForeground":                gray6,
    // List/tree filter matches (Type-to-Search in Explorer, etc.) — sibling tone.
    "list.filterMatchBackground":                 siblingMatchBackground,
    "list.filterMatchBorder":                     siblingMatchBorder,
    "listFilterWidget.background":                gray1,
    "listFilterWidget.outline":                   blue6,
    "listFilterWidget.noMatchesOutline":          red5,
    "listFilterWidget.shadow":                    blackAlpha40,
    "tree.indentGuidesStroke":                    gray5,
    "tree.inactiveIndentGuidesStroke":            gray4,
    "tree.tableColumnsBorder":                    gray4b,
    "tree.tableOddRowsBackground":                "#FFFFFF03",

    // ── Input ──
    "input.background":                           gray3,
    "input.foreground":                           gray12,
    "input.border":                               gray5,
    "input.placeholderForeground":                gray7,
    "inputOption.activeBackground":               blue3,
    "inputOption.activeBorder":                   blue6,
    "inputOption.activeForeground":               gray14,  // white text on blue selection
    "inputOption.hoverBackground":                gray3,
    "inputValidation.errorBackground":            red3,
    "inputValidation.errorBorder":                red6,
    "inputValidation.errorForeground":            gray14,
    "inputValidation.infoBackground":             "#25324D",
    "inputValidation.infoBorder":                 blue4,
    "inputValidation.infoForeground":             gray12,
    "inputValidation.warningBackground":          yellow1,
    "inputValidation.warningBorder":              yellow3,
    "inputValidation.warningForeground":          gray14,

    // ── Scrollbar ──
    "scrollbar.shadow":                           blackAlpha40,
    "scrollbarSlider.background":                 whiteAlpha15,
    "scrollbarSlider.hoverBackground":            whiteAlpha30,
    "scrollbarSlider.activeBackground":           whiteAlpha30,

    // ── Badge ──
    "badge.background":                           blue5,
    "badge.foreground":                           gray14,

    // ── Banner (workspace-trust / restricted-mode strip) ──
    "banner.background":                          gray3,
    "banner.foreground":                          gray12,
    "banner.iconForeground":                      blue8,

    // ── Progress bar ──
    "progressBar.background":                     blue7,

    // ── Breadcrumbs ──
    "breadcrumb.background":                      editorBackground,
    "breadcrumb.foreground":                      gray9,
    "breadcrumb.activeSelectionForeground":       gray11,
    "breadcrumb.focusForeground":                 gray12,
    "breadcrumbPicker.background":                gray2,

    // ── Extensions / Marketplace ──
    "extensionButton.background":                 blue5,
    "extensionButton.foreground":                 gray14,
    "extensionButton.hoverBackground":            blue4,
    "extensionButton.separator":                  "#FFFFFF40",
    "extensionButton.prominentBackground":        blue5,
    "extensionButton.prominentForeground":        gray14,
    "extensionButton.prominentHoverBackground":   blue4,
    "extensionBadge.remoteBackground":            blue4,
    "extensionBadge.remoteForeground":            gray14,
    "extensionIcon.starForeground":               yellow7,
    "extensionIcon.verifiedForeground":           blue8,
    "extensionIcon.preReleaseForeground":         orange6,
    "extensionIcon.sponsorForeground":            syntaxMember,

    // ── Buttons ──
    // blue5 (not blue6) keeps the white label at 5.1:1 AA; hover darkens to blue4.
    "button.background":                          blue5,
    "button.foreground":                          gray14,
    "button.border":                              blue5,
    "button.hoverBackground":                     blue4,
    "button.secondaryBackground":                 gray2,
    "button.secondaryForeground":                 gray12,
    "button.secondaryHoverBackground":            gray3,
    "button.separator":                           "#FFFFFF40",
    "checkbox.background":                        gray3,
    "checkbox.foreground":                        gray12,
    "checkbox.border":                            gray5,
    "checkbox.selectBackground":                  blue6,
    "checkbox.selectBorder":                      blue6,

    // ── Dropdowns ──
    "dropdown.background":                        gray3,
    "dropdown.foreground":                        gray12,
    "dropdown.border":                            gray5,
    "dropdown.listBackground":                    gray2,

    // ── Keybinding ──
    "keybindingTable.headerBackground":           gray3,
    "keybindingTable.rowsBackground":             transparent,
    "keybindingLabel.background":                 gray3,
    "keybindingLabel.foreground":                 gray12,
    "keybindingLabel.border":                     gray5,
    "keybindingLabel.bottomBorder":               gray5,

    // ── Settings ──
    "settings.headerForeground":                  gray12,
    "settings.modifiedItemIndicator":             blue4,
    "settings.dropdownBackground":                gray3,
    "settings.dropdownForeground":                gray12,
    "settings.dropdownBorder":                    gray5,
    "settings.dropdownListBorder":                gray4,
    "settings.checkboxBackground":                gray3,
    "settings.checkboxForeground":                gray12,
    "settings.checkboxBorder":                    gray5,
    "settings.textInputBackground":               gray3,
    "settings.textInputForeground":               gray12,
    "settings.textInputBorder":                   gray5,
    "settings.numberInputBackground":             gray3,
    "settings.numberInputForeground":             gray12,
    "settings.numberInputBorder":                 gray5,
    "settings.focusedRowBackground":              blueRowFocus,
    "settings.focusedRowBorder":                  blue6,
    "settings.rowHoverBackground":                blueRowHover,
    "settings.sashBorder":                        gray4,
    "settings.headerBorder":                      gray3,
    "settings.settingsHeaderHoverForeground":     gray13,

    // ── Notebook ──
    // Jupyter cell anatomy on the gray2 page canvas — every state gets a
    // distinct border + background pairing:
    //   • idle cell (code or markdown) → gray6 hairline
    //   • hovered cell                 → neutral white wash (VS Code exposes no
    //                                    hover-border key, so hover is bg-only)
    //   • selected cell (command mode) → gray5 border, no wash
    //   • focused/active cell          → string-green border, no wash (the blue
    //                                    accent read too loud, so the active cell
    //                                    is marked by the green border alone)
    // VS Code has no markdown-vs-code or executed-state keys: markdown cells
    // inherit this same set, and "executed" reads via the status icons below.
    // Page canvas matches the gray1 cell-editor bg: the cell editor is a
    // sharp-cornered rect under a rounded gray4 border, so a lighter page let
    // the rect's dark corners poke past the border's arc. Same color = the
    // protruding corners blend into the page; the rounded border alone frames.
    "notebook.editorBackground":                  gray1,
    "notebook.cellBorderColor":                   gray6,
    "notebook.focusedCellBorder":                 syntaxString,
    "notebook.inactiveFocusedCellBorder":         gray5,
    "notebook.focusedEditorBorder":               syntaxString,
    "notebook.cellHoverBackground":               blackAlpha20,
    "notebook.focusedCellBackground":             transparent,
    "notebook.selectedCellBackground":            transparent,
    "notebook.selectedCellBorder":                gray5,
    "notebook.inactiveSelectedCellBorder":        gray5,
    "notebook.cellEditorBackground":              editorBackground,
    "notebook.cellInsertionIndicator":            blue6,
    "notebook.cellStatusBarItemHoverBackground":  whiteAlpha08,
    "notebook.cellToolbarSeparator":              gray4,
    // Output area — sits just above the gray1 page as a faintly lighter block.
    // The container border draws a hairline between the code editor and its
    // output below, separating the two regions of the grouped cell.
    "notebook.outputContainerBackgroundColor":    "#25272B",
    "notebook.outputContainerBorderColor":        gray6,
    "notebookStatusSuccessIcon.foreground":       green7,
    "notebookStatusErrorIcon.foreground":         red7,
    "notebookStatusRunningIcon.foreground":       blue8,
    "notebookEditorOverviewRuler.runningCellForeground": blue8,
    "notebookScrollbarSlider.activeBackground":   whiteAlpha30,
    "notebookScrollbarSlider.background":         whiteAlpha15,
    "notebookScrollbarSlider.hoverBackground":    whiteAlpha30,

    // ── Panel (terminal, output, etc.) ──
    "panel.background":                           gray1b,
    "panel.border":                               gray4b,
    "panel.dropBorder":                           blue6,
    "panelTitle.activeBorder":                    blue6,
    "panelTitle.activeForeground":                gray12,
    "panelTitle.inactiveForeground":              gray7,
    "panelTitle.border":                          gray4b,
    "panelSection.border":                        gray4b,
    "panelSection.dropBackground":                dropOverlay,
    "panelSectionHeader.background":              gray1b,
    "panelSectionHeader.foreground":              gray10,
    "panelSectionHeader.border":                  gray4b,
    "panelInput.border":                          gray4,
    "panelStickyScroll.background":               gray1,
    "panelStickyScroll.border":                   gray4b,
    "panelStickyScroll.shadow":                   blackAlpha40,

    // ── Terminal ──
    // Uses the classic dark ANSI palette defined above, so the integrated
    // terminal renders program output with familiar, legible colors.
    // The bg/fg intentionally diverge from the editor (see termBg / termFg).
    "terminal.background":                        termBg,
    "terminal.foreground":                        termFg,
    "terminal.border":                            gray4b,
    // Selection is an inverted window background/foreground. We approximate that
    // inversion with a light, low-alpha wash over the terminal bg (a literal
    // invert would wash out fg colors).
    "terminal.selectionBackground":               "#C5C8C659",
    "terminal.inactiveSelectionBackground":       "#C5C8C633",
    // Find highlights use the terminal's own search colors (amber match / peach
    // selected match) rather than the editor's amber, so search-in-terminal
    // reads consistently within the panel.
    "terminal.findMatchBackground":               termSearchSelBg,
    "terminal.findMatchBorder":                   termSearchSelBg,
    "terminal.findMatchHighlightBackground":      termSearchBg + "59",
    "terminal.findMatchHighlightBorder":          transparent,
    "terminal.hoverHighlightBackground":          whiteAlpha05,
    // Sticky scroll one step lighter than the terminal bg so the pinned
    // command row separates from scrolling output below.
    "terminalStickyScroll.background":            gray3,
    "terminalStickyScroll.border":                gray4b,
    "terminalStickyScrollHover.background":       gray4,
    // The cursor is the foreground color, with the cell's bg showing through
    // the glyph beneath the block.
    "terminalCursor.background":                  termBg,
    "terminalCursor.foreground":                  termFg,
    "terminalCommandDecoration.defaultBackground": termBrightBlack,
    "terminalCommandDecoration.successBackground": termGreen,
    "terminalCommandDecoration.errorBackground":  termRed,
    "terminalOverviewRuler.cursorForeground":     termFg,
    "terminalOverviewRuler.findMatchForeground":  termSearchSelBg,

    // Terminal ANSI colors — classic dark palette, slots 0–15.
    "terminal.ansiBlack":                         termBlack,
    "terminal.ansiRed":                           termRed,
    "terminal.ansiGreen":                         termGreen,
    "terminal.ansiYellow":                        termYellow,
    "terminal.ansiBlue":                          termBlue,
    "terminal.ansiMagenta":                       termMagenta,
    "terminal.ansiCyan":                          termCyan,
    "terminal.ansiWhite":                         termWhite,
    "terminal.ansiBrightBlack":                   termBrightBlack,
    "terminal.ansiBrightRed":                     termBrightRed,
    "terminal.ansiBrightGreen":                   termBrightGreen,
    "terminal.ansiBrightYellow":                  termBrightYellow,
    "terminal.ansiBrightBlue":                    termBrightBlue,
    "terminal.ansiBrightMagenta":                 termBrightMagenta,
    "terminal.ansiBrightCyan":                    termBrightCyan,
    "terminal.ansiBrightWhite":                   termBrightWhite,

    // ── Notifications ──
    "notifications.background":                   gray3,
    "notifications.foreground":                   gray12,
    "notifications.border":                       gray4,
    "notificationLink.foreground":                blue9,
    "notificationsErrorIcon.foreground":          red7,
    "notificationsWarningIcon.foreground":        yellow6,
    "notificationsInfoIcon.foreground":           blue8,
    "notificationCenterHeader.background":        gray2,
    "notificationCenterHeader.foreground":        gray10,
    "notificationCenter.border":                  gray4,
    "notificationToast.border":                   gray4,

    // ── Debug ──
    "debugToolBar.background":                    gray2,
    "debugToolBar.border":                        gray4,
    "debugConsole.errorForeground":               red7,
    "debugConsole.warningForeground":             yellow6,
    "debugConsole.infoForeground":                blue9,
    "debugConsole.sourceForeground":              syntaxString,
    "debugConsoleInputIcon.foreground":           blue8,
    // Inline variable values shown at end-of-line while debugging.
    "editor.inlineValuesForeground":              gray7,
    "editor.inlineValuesBackground":              transparent,
    "editor.stackFrameHighlightBackground":       stackFrameOverlay,
    "editor.focusedStackFrameHighlightBackground":focusedStackFrameOverlay,
    "debugView.exceptionLabelBackground":         red3,
    "debugView.exceptionLabelForeground":         gray12,
    "debugView.stateLabelBackground":             gray3,
    "debugView.stateLabelForeground":             gray10,
    "debugView.valueChangedHighlight":            blue4,
    "debugTokenExpression.name":                  syntaxField,
    "debugTokenExpression.value":                 orange8,
    "debugTokenExpression.string":                syntaxString,
    "debugTokenExpression.boolean":               syntaxKeyword,
    "debugTokenExpression.number":                syntaxNumber,
    "debugTokenExpression.error":                 red7,
    "debugIcon.breakpointForeground":             red7,
    "debugIcon.breakpointDisabledForeground":     gray6,
    "debugIcon.breakpointUnverifiedForeground":   gray7,
    "debugIcon.breakpointCurrentStackframeForeground": yellow7,
    "debugIcon.breakpointStackframeForeground":   yellow6,
    "debugIcon.startForeground":                  green7,
    "debugIcon.pauseForeground":                  blue8,
    "debugIcon.stopForeground":                   red7,
    "debugIcon.disconnectForeground":             gray9,
    "debugIcon.restartForeground":                green7,
    "debugIcon.stepOverForeground":               blue8,
    "debugIcon.stepIntoForeground":               blue8,
    "debugIcon.stepOutForeground":                blue8,
    "debugIcon.continueForeground":               green7,
    "debugIcon.stepBackForeground":               blue8,

    // ── Testing ──
    "testing.iconFailed":                         red7,
    "testing.iconErrored":                        red7,
    "testing.iconPassed":                         green7,
    "testing.iconQueued":                         gray7,
    "testing.iconUnset":                          gray7,
    "testing.iconSkipped":                        yellow5,
    "testing.peekBorder":                         gray4,
    "testing.peekHeaderBackground":               gray2,
    "testing.runAction":                          green7,
    "testing.iconErrored.retired":                red3,
    "testing.iconFailed.retired":                 red3,
    "testing.iconPassed.retired":                 green3,
    "testing.iconQueued.retired":                 gray3,
    "testing.iconUnset.retired":                  gray3,
    "testing.iconSkipped.retired":                yellow1,
    "testing.message.error.lineBackground":       errorBackgroundOverlay,
    "testing.message.info.decorationForeground":  gray7,
    "testing.message.info.lineBackground":        transparent,
    "testing.coveredBackground":                  "#37523930",
    "testing.coveredBorder":                      green6,
    "testing.coveredGutterBackground":            green6,
    "testing.uncoveredBranchBackground":          "#5E383830",
    "testing.uncoveredBackground":                "#5E383830",
    "testing.uncoveredBorder":                    red6,
    "testing.uncoveredGutterBackground":          red6,

    // ── Git decorations ──
    // See the git palette block above. Brighter steps keep every state
    // AA-legible on the SCM list, incl. the selected-blue row.
    "gitDecoration.addedResourceForeground":      gitAdded,
    "gitDecoration.modifiedResourceForeground":   gitModified,
    "gitDecoration.deletedResourceForeground":    gitDeleted,
    "gitDecoration.renamedResourceForeground":    gitRenamed,
    "gitDecoration.untrackedResourceForeground":  gitUntracked,
    "gitDecoration.ignoredResourceForeground":    gitIgnored,
    "gitDecoration.conflictingResourceForeground": gitConflict,
    "gitDecoration.submoduleResourceForeground":  gitSubmodule,
    "gitDecoration.stageDeletedResourceForeground": gitDeleted,
    "gitDecoration.stageModifiedResourceForeground": gitModified,

    // ── Source Control ──
    // History-graph swimlanes + ref badges on the accent ramp. Ref colors:
    // local = accent blue, base = success green, remote = purple.
    // Additions/deletions reuse the git added/deleted hues.
    "scmGraph.foreground1":                       gitGraph1,
    "scmGraph.foreground2":                       gitGraph2,
    "scmGraph.foreground3":                       gitGraph3,
    "scmGraph.foreground4":                       gitGraph4,
    "scmGraph.foreground5":                       gitGraph5,
    "scmGraph.historyItemRefColor":               gitGraph1,
    "scmGraph.historyItemBaseRefColor":           gitGraph2,
    "scmGraph.historyItemRemoteRefColor":         gitGraph3,
    "scmGraph.historyItemHoverDefaultLabelForeground": gray14,
    "scmGraph.historyItemHoverDefaultLabelBackground": blue6,
    "scmGraph.historyItemHoverLabelForeground":   gray12,
    "scmGraph.historyItemHoverAdditionsForeground": gitAdded,
    "scmGraph.historyItemHoverDeletionsForeground": gitDeleted,

    // ── Merge conflicts ──
    // Derived from the accent ramp following the diff convention: current/ours =
    // accent blue (#1f6feb), incoming/theirs = success green (#2ea043),
    // common = neutral gray.
    // Content regions sit at ~26% alpha (code on top reads at 6.1–6.7:1); headers
    // are denser (~55%) since they carry only the conflict-label text.
    "merge.currentHeaderBackground":              "#1f6feb8C", // accent blue @ 55%
    "merge.currentContentBackground":             "#1f6feb42", // accent blue @ 26%
    "merge.incomingHeaderBackground":             "#2ea0438C", // success green @ 55%
    "merge.incomingContentBackground":            "#2ea04342", // success green @ 26%
    "merge.border":                               transparent,
    "merge.commonContentBackground":              "#6e768142", // neutral gray @ 26%
    "merge.commonHeaderBackground":               "#6e768166", // neutral gray @ 40%
    // New (3-way) merge editor — accent-blue change wash; word-level wash denser
    // so the exact changed tokens stand out within an already-tinted line.
    "mergeEditor.change.background":              "#1f6feb2E",
    "mergeEditor.change.word.background":         "#1f6feb73",
    "mergeEditor.conflict.unhandledUnfocused.border": yellow4,
    "mergeEditor.conflict.unhandledFocused.border": yellow6,
    "mergeEditor.conflict.handledUnfocused.border": gray5,
    "mergeEditor.conflict.handledFocused.border": gray7,

    // ── Problems / diagnostics panel ──
    "problemsErrorIcon.foreground":               red7,
    "problemsWarningIcon.foreground":             yellow6,
    "problemsInfoIcon.foreground":                blue8,

    // ── Symbol icons (outline / breadcrumbs) ──
    "symbolIcon.arrayForeground":                 orange8,
    "symbolIcon.booleanForeground":               syntaxKeyword,
    "symbolIcon.classForeground":                 syntaxType,
    "symbolIcon.colorForeground":                 syntaxString,
    "symbolIcon.constantForeground":              syntaxMember,
    "symbolIcon.constructorForeground":           syntaxFunction,
    "symbolIcon.enumeratorForeground":            syntaxMember,
    "symbolIcon.enumeratorMemberForeground":      syntaxMember,
    "symbolIcon.eventForeground":                 syntaxField,
    "symbolIcon.fieldForeground":                 syntaxField,
    "symbolIcon.fileForeground":                  gray9,
    "symbolIcon.folderForeground":                yellow7,
    "symbolIcon.functionForeground":              syntaxFunction,
    "symbolIcon.interfaceForeground":             syntaxType,
    "symbolIcon.keyForeground":                   syntaxMetadata,
    "symbolIcon.keywordForeground":               syntaxKeyword,
    "symbolIcon.methodForeground":                syntaxFunction,
    "symbolIcon.moduleForeground":                syntaxHtmlTag,
    "symbolIcon.namespaceForeground":             syntaxType,
    "symbolIcon.nullForeground":                  syntaxKeyword,
    "symbolIcon.numberForeground":                syntaxNumber,
    "symbolIcon.objectForeground":                syntaxField,
    "symbolIcon.operatorForeground":              editorForeground,
    "symbolIcon.packageForeground":               syntaxHtmlTag,
    "symbolIcon.propertyForeground":              syntaxField,
    "symbolIcon.referenceForeground":             blue8,
    "symbolIcon.snippetForeground":               green8,
    "symbolIcon.stringForeground":                syntaxString,
    "symbolIcon.structForeground":                syntaxType,
    "symbolIcon.textForeground":                  editorForeground,
    "symbolIcon.typeParameterForeground":         syntaxTypeParam,
    "symbolIcon.unitForeground":                  syntaxNumber,
    "symbolIcon.variableForeground":              editorForeground,

    // ── Charts / inline charts ──
    "charts.foreground":                          editorForeground,
    "charts.lines":                               gray4,
    "charts.red":                                 red7,
    "charts.blue":                                blue8,
    "charts.yellow":                              yellow7,
    "charts.orange":                              orange6,
    "charts.green":                               green7,
    "charts.purple":                              syntaxMember,
    "chart.line":                                 gray4,
    "chart.axis":                                 gray5,
    "chart.guide":                                gray3,

    // ── Ports ──
    "ports.iconRunningProcessForeground":         green7,

    // ── Welcome page ──
    "welcomePage.background":                     gray1,
    "welcomePage.tileBackground":                 gray2,
    "welcomePage.tileHoverBackground":            gray3,
    "welcomePage.tileBorder":                     gray4,
    "welcomePage.progress.background":            gray3,
    "welcomePage.progress.foreground":            blue6,
    "walkThrough.embeddedEditorBackground":       editorBackground,
    "walkthrough.stepTitle.foreground":           gray12,

    // ── Interactive window ──
    "interactive.activeCodeBorder":               blue6,
    "interactive.inactiveCodeBorder":             gray4,

    // ── Action bar ──
    "actionBar.toggledBackground":                blue2,

    // ── Inline chat ──
    "inlineChatDiff.inserted":                    "#37523940",
    "inlineChatDiff.removed":                     "#5E383840",
    "inlineChat.background":                      gray2,
    "inlineChat.foreground":                      gray12,
    "inlineChat.border":                          gray4,
    "inlineChat.shadow":                          blackAlpha40,
    "inlineChatInput.background":                 gray3,
    "inlineChatInput.border":                     gray5,
    "inlineChatInput.focusBorder":                blue6,
    "inlineChatInput.placeholderForeground":      gray7,
    "editorGhostText.foreground":                 gray6,
    "editorGhostText.background":                 transparent,
    "editorGhostText.border":                     transparent,
    // Empty-editor placeholder text (e.g., "Type to search" in the search editor).
    "editor.placeholder.foreground":              gray7,

    // ── Chat ──
    "chat.requestBackground":                     gray1b,
    "chat.requestBorder":                         gray4b,
    "chat.slashCommandBackground":                gray3,
    "chat.slashCommandForeground":                gray12,
    "chat.avatarBackground":                      gray4,
    "chat.avatarForeground":                      gray12,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Semantic token colors
  // ───────────────────────────────────────────────────────────────────────────
  semanticHighlighting: true,
  semanticTokenColors: {
    // Operators / new — `new` is a keyword, not a member access
    "newOperator":                                syntaxKeyword,
    "stringLiteral":                              syntaxString,
    "customLiteral":                              syntaxFunction,
    "numberLiteral":                              syntaxNumber,

    // Types
    "type":                                       syntaxType,
    "type.defaultLibrary":                        syntaxType,
    "class":                                      syntaxType,
    "class.defaultLibrary":                       syntaxType,
    "interface":                                  syntaxType,
    "enum":                                       syntaxType,
    "typeParameter":                              syntaxTypeParam,
    "struct":                                     syntaxType,

    // Members (key-like access: obj.prop, enum.MEMBER) → purple-pink
    "property":                                   syntaxMember,
    "property.readonly":                          syntaxMember,

    // Variables of every flavor (var/let/const/readonly/static/parameter/etc.)
    // are uniformly editorForeground. This deliberately overrides language
    // servers that would otherwise tint static fields differently — we want
    // one color for "identifier bound to a value" across all languages.
    "variable":                                   editorForeground,
    "variable.readonly":                          editorForeground,
    "variable.defaultLibrary":                    editorForeground,
    "variable.static":                            editorForeground,
    "variable.readonly.static":                   editorForeground,
    "parameter":                                  editorForeground,

    // Functions/methods — one blue for all callables.
    "function":                                   syntaxFunction,
    "function.defaultLibrary":                    syntaxFunction,
    "method":                                     syntaxFunction,
    "method.static":                              syntaxFunction,
    "property.static":                            syntaxMember,

    // Namespaces/modules
    "namespace":                                  syntaxType,

    // Keywords / operators
    "keyword":                                    syntaxKeyword,
    "operator":                                   editorForeground,

    // Strings, numbers, comments
    "string":                                     syntaxString,
    "number":                                     syntaxNumber,
    "regexp":                                     syntaxRegexp,
    "comment":                                    syntaxComment,
    "comment.documentation":                      syntaxDocComment,

    // Decorators / annotations
    "decorator":                                  syntaxMetadata,

    // Labels
    "label":                                      syntaxLabel,

    // Enum members
    "enumMember":                                 syntaxMember,
    "macro":                                      syntaxKeyword,

    // Deprecated symbols — struck through (color preserved).
    "*.deprecated":                               { fontStyle: "strikethrough" },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TextMate token colors
  // Reference: dark_vs.json + dark_plus.json scopes
  // ───────────────────────────────────────────────────────────────────────────
  tokenColors: [
    // ── Base / embedded ──
    {
      scope: [
        "meta.embedded",
        "source.groovy.embedded",
        "string meta.image.inline.markdown",
        "variable.legacy.builtin.python",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Typography ──
    { scope: "emphasis",        settings: { fontStyle: "italic" } },
    { scope: "strong",          settings: { fontStyle: "bold" } },
    { scope: "markup.underline",settings: { fontStyle: "underline" } },
    { scope: "markup.strikethrough", settings: { fontStyle: "strikethrough" } },

    // ── Comments ──
    {
      name: "Comment",
      scope: "comment",
      settings: { foreground: syntaxComment },
    },
    {
      name: "Doc comment",
      scope: [
        "comment.block.documentation",
        "comment.line.documentation",
      ],
      settings: { foreground: syntaxDocComment },
    },
    {
      name: "Doc comment tag",
      scope: [
        "keyword.other.documentation",
        "punctuation.definition.block.tag.jsdoc",
        "storage.type.class.jsdoc",
      ],
      settings: { foreground: syntaxDocTag },
    },

    // ── Keywords (general) ──
    {
      name: "Keyword",
      scope: "keyword",
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Storage (var, let, const, function...)",
      scope: "storage",
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Storage type",
      scope: "storage.type",
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Storage modifier",
      scope: ["storage.modifier", "keyword.operator.noexcept"],
      settings: { foreground: syntaxKeyword },
    },

    // ── Control flow keywords (must come AFTER `keyword` to override) ──
    {
      name: "Control flow / special keywords",
      scope: [
        "keyword.control",
        "source.cpp keyword.operator.new",
        "keyword.operator.delete",
        "keyword.other.using",
        "keyword.other.directive.using",
        "keyword.other.operator",
        "entity.name.operator",
      ],
      settings: { foreground: syntaxMember },
    },

    // ── Operators ──
    {
      name: "Word-like operators",
      scope: [
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.cast",
        "keyword.operator.sizeof",
        "keyword.operator.alignof",
        "keyword.operator.typeid",
        "keyword.operator.alignas",
        "keyword.operator.instanceof",
        "keyword.operator.logical.python",
        "keyword.operator.wordlike",
      ],
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Operator symbols",
      scope: "keyword.operator",
      settings: { foreground: editorForeground },
    },
    {
      name: "CSS units",
      scope: "keyword.other.unit",
      settings: { foreground: syntaxNumber },
    },

    // ── Constants ──
    {
      name: "Language constant (true, false, null...)",
      scope: "constant.language",
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Numeric constant",
      scope: [
        "constant.numeric",
        "keyword.operator.plus.exponent",
        "keyword.operator.minus.exponent",
      ],
      settings: { foreground: syntaxNumber },
    },
    {
      name: "Enum member",
      scope: "variable.other.enummember",
      settings: { foreground: syntaxMember },
    },
    {
      // Const variable references (SCREAMING_CASE, etc.) — keep uniform with
      // all other variable flavors: editorForeground, not purple-pink.
      name: "Const variable reference",
      scope: "variable.other.constant",
      settings: { foreground: editorForeground },
    },
    {
      name: "Character escape",
      scope: ["constant.character", "constant.other.option"],
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "String escape",
      scope: "constant.character.escape",
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Regexp constant",
      scope: "constant.regexp",
      settings: { foreground: syntaxRegexp },
    },
    {
      name: "Placeholder constant",
      scope: "constant.other.placeholder",
      settings: { foreground: syntaxKeyword },
    },

    // ── Strings ──
    {
      name: "String",
      scope: ["string", "meta.embedded.assembly"],
      settings: { foreground: syntaxString },
    },
    { scope: "string.tag",   settings: { foreground: syntaxString } },
    { scope: "string.value", settings: { foreground: syntaxString } },
    {
      name: "Regexp string",
      scope: "string.regexp",
      settings: { foreground: syntaxRegexp },
    },
    {
      name: "String interpolation punctuation",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Reset JS template expression",
      scope: "meta.template.expression",
      settings: { foreground: editorForeground },
    },
    {
      name: "PHP embedded",
      scope: [
        "punctuation.section.embedded.begin.php",
        "punctuation.section.embedded.end.php",
      ],
      settings: { foreground: syntaxKeyword },
    },

    // ── Functions / methods ──
    {
      name: "Function declaration",
      scope: [
        "entity.name.function",
        "support.function",
        "support.constant.handlebars",
        "source.powershell variable.other.member",
        "entity.name.operator.custom-literal",
      ],
      settings: { foreground: syntaxFunction },
    },
    {
      name: "Preprocessor function",
      scope: ["meta.preprocessor", "entity.name.function.preprocessor"],
      settings: { foreground: syntaxKeyword },
    },

    // ── Types / classes ──
    {
      name: "Type declaration and references",
      scope: [
        "support.class",
        "support.type",
        "entity.name.type",
        "entity.name.namespace",
        "entity.other.attribute",
        "entity.name.scope-resolution",
        "entity.name.class",
        "storage.type.numeric.go",
        "storage.type.byte.go",
        "storage.type.boolean.go",
        "storage.type.string.go",
        "storage.type.uintptr.go",
        "storage.type.error.go",
        "storage.type.rune.go",
        "storage.type.cs",
        "storage.type.generic.cs",
        "storage.type.modifier.cs",
        "storage.type.variable.cs",
        "storage.type.generic.java",
        "storage.type.java",
        "storage.type.object.array.java",
        "storage.type.primitive.array.java",
        "storage.type.primitive.java",
        "storage.type.token.java",
        "storage.type.groovy",
        "storage.type.annotation.groovy",
        "storage.type.parameters.groovy",
        "storage.type.generic.groovy",
        "storage.type.object.array.groovy",
        "storage.type.primitive.array.groovy",
        "storage.type.primitive.groovy",
      ],
      settings: { foreground: syntaxType },
    },
    {
      name: "Type references — TS/JS specific",
      scope: [
        "meta.type.cast.expr",
        "meta.type.new.expr",
        "support.constant.math",
        "support.constant.dom",
        "support.constant.json",
        "entity.other.inherited-class",
        "punctuation.separator.namespace.ruby",
      ],
      settings: { foreground: syntaxType },
    },

    // ── Variables ──
    {
      name: "Variable",
      scope: [
        "variable",
        "meta.definition.variable.name",
        "support.variable",
        "entity.name.variable",
      ],
      settings: { foreground: editorForeground },
    },
    {
      // Python hover popups render annotated names like `(variable) name: str`
      // through the TextMate grammar (no semantic tokens). MagicPython tags the
      // identifier under `meta.attribute.python` and lets `support.type` bleed
      // through — pinning it back to the foreground keeps hover and editor in sync.
      name: "Python annotated identifier (hover popup parity)",
      scope: [
        "meta.attribute.python",
        "meta.indexed-name.python",
      ],
      settings: { foreground: editorForeground },
    },
    {
      // Keys in key-value structures for programming languages. Property reads
      // on objects (obj.prop) and object literal keys share this color.
      name: "Key-like tokens (object keys, property access)",
      scope: [
        // JS/TS object literal keys
        "meta.object-literal.key",
        // Property access in JS/TS/Python/Ruby/PHP (obj.prop)
        "variable.other.property",
        "variable.other.object.property",
        "variable.other.object.access",
        "variable.other.member",
        "support.variable.property",
        "support.variable.property.dom",
      ],
      settings: { foreground: syntaxMember },
    },
    {
      // Keys in structured data / config file formats. Intentionally matches
      // editorForeground so config keys read as plain identifiers, not code.
      name: "Config file keys (JSON, YAML, TOML, Python dict)",
      scope: [
        // JSON keys
        "support.type.property-name.json",
        "support.type.property-name.json.comments",
        // YAML keys
        "entity.name.tag.yaml",
        // TOML keys
        "entity.name.tag.toml",
        // Python dict key
        "meta.structure.dictionary.key.python",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Self / this / super",
      // Same color (keyword orange-tan) for: JS `this`, Python `self`/`cls`,
      // Rust `self`, Ruby `self`, PHP `$this`, Kotlin `this`/`super`.
      scope: [
        "variable.language",
        "variable.parameter.function.language.python",
        "variable.parameter.function.language.special.self.python",
        "variable.parameter.function.language.special.cls.python",
      ],
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "CSS property name / custom var",
      scope: [
        "support.type.vendored.property-name",
        "support.type.property-name",
        "source.css variable",
        "source.coffee.embedded",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Decorators / annotations / metadata ──
    // Same color (yellow-green) for: TS @Component, Python @decorator,
    // Java @Override, C# [Attribute], Kotlin @JvmStatic, etc.
    {
      name: "Decorator / annotation",
      scope: [
        "meta.decorator",
        "punctuation.decorator",
        "storage.type.annotation",
        "storage.type.annotation.java",
        "meta.declaration.annotation.java",
        "meta.function.decorator.python",
        "entity.name.function.decorator",
        "entity.name.function.decorator.python",
        "support.attribute.builtin",
        "meta.attribute.cs",
      ],
      settings: { foreground: syntaxMetadata },
    },

    // ── HTML / XML ──
    {
      name: "HTML/XML tag name",
      scope: "entity.name.tag",
      settings: { foreground: syntaxHtmlTag },
    },
    {
      name: "HTML/XML attribute name",
      scope: "entity.other.attribute-name",
      settings: { foreground: editorForeground },
    },
    {
      name: "JSX/TSX component (capitalized) — uses blue-purple",
      scope: [
        "support.class.component",
        "support.class.component.jsx",
        "support.class.component.tsx",
        "meta.tag.attributes.jsx entity.other.attribute-name",
        "meta.tag.attributes.tsx entity.other.attribute-name",
      ],
      settings: { foreground: syntaxJsxComponent },
    },
    {
      name: "CSS/Less tag",
      scope: ["entity.name.tag.css", "entity.name.tag.less"],
      settings: { foreground: syntaxHtmlTag },
    },
    {
      name: "CSS class / id selectors",
      scope: [
        "entity.other.attribute-name.class.css",
        "source.css entity.other.attribute-name.class",
        "entity.other.attribute-name.id.css",
        "entity.other.attribute-name.parent-selector.css",
        "entity.other.attribute-name.parent.less",
        "source.css entity.other.attribute-name.pseudo-class",
        "entity.other.attribute-name.pseudo-element.css",
        "source.css.less entity.other.attribute-name.id",
        "entity.other.attribute-name.scss",
      ],
      settings: { foreground: syntaxHtmlTag },
    },
    {
      name: "Tag punctuation brackets",
      scope: "punctuation.definition.tag",
      settings: { foreground: gray6 },
    },
    {
      name: "CSS property value",
      scope: [
        "support.constant.property-value",
        "support.constant.font-name",
        "support.constant.media-type",
        "support.constant.media",
        "constant.other.color.rgb-value",
        "constant.other.rgb-value",
        "support.constant.color",
      ],
      settings: { foreground: syntaxString },
    },
    {
      name: "XML prologue / preprocessor strings",
      scope: ["meta.preprocessor.string"],
      settings: { foreground: syntaxString },
    },
    {
      name: "Preprocessor numeric",
      scope: "meta.preprocessor.numeric",
      settings: { foreground: syntaxNumber },
    },

    // ─────────────────────────────────────────────────────────────────────
    // Cross-language consistency
    // Ensure the same language feature gets the same color across grammars.
    // Using JavaScript/TypeScript scopes as the visual reference.
    // ─────────────────────────────────────────────────────────────────────

    // Function / method calls — Ruby & PHP grammars use `variable.function`
    // for invocations; align with JS `entity.name.function` (blue).
    {
      name: "Method invocation (cross-language)",
      scope: [
        "variable.function",
        "entity.name.function.call",
        "meta.function-call entity.name.function",
        "meta.function-call.generic.python entity.name.function",
      ],
      settings: { foreground: syntaxFunction },
    },

    // Built-in functions — print (Python), console.log (JS), puts (Ruby),
    // len/range, etc. Same blue as user-defined functions.
    {
      name: "Built-in functions (cross-language)",
      scope: [
        "support.function.builtin",
        "support.function.builtin.python",
        "support.function.magic.python",
        "support.function.kernel.ruby",
        "support.function.builtin.shell",
      ],
      settings: { foreground: syntaxFunction },
    },

    // Function parameters — JS, Python, Rust, Java, C#, Kotlin etc.
    // Same default-foreground across languages (matches JS/TS).
    {
      name: "Function parameter (cross-language)",
      scope: [
        "variable.parameter",
        "variable.parameter.function",
        "variable.parameter.function-call",
        "meta.function.parameters variable",
      ],
      settings: { foreground: editorForeground },
    },

    // Ruby instance / class variables (@foo, @@foo) — variables are uniformly
    // editorForeground across all languages, regardless of scope qualifier.
    {
      name: "Ruby instance / class variable",
      scope: [
        "variable.other.readwrite.instance.ruby",
        "variable.other.readwrite.class.ruby",
        "variable.other.constant.ruby",
      ],
      settings: { foreground: editorForeground },
    },

    // PHP `$variable` — keep at default foreground so PHP variables look
    // like JS variables, not like a separate language feature.
    {
      name: "PHP variable",
      scope: [
        "variable.other.php",
        "punctuation.definition.variable.php",
      ],
      settings: { foreground: editorForeground },
    },

    // Rust lifetimes (`'a`) — type-level annotations, color them as type
    // parameters (teal) rather than as members or variables.
    {
      name: "Rust lifetime",
      scope: [
        "storage.modifier.lifetime.rust",
        "entity.name.lifetime.rust",
        "punctuation.definition.lifetime.rust",
      ],
      settings: { foreground: syntaxTypeParam },
    },

    // Java enum constants — Java's grammar uses `constant.other.enum.java`
    // for `Direction.UP`, while JS/TS use `variable.other.enummember`. Align
    // Java enum constants with the cross-language member color (purple-pink).
    {
      name: "Java enum constant",
      scope: ["constant.other.enum.java"],
      settings: { foreground: syntaxMember },
    },

    // C++ primitive types (`int`, `void`, `char`, `bool`, `float`, …) — the
    // cpp grammar tags them as `storage.type.primitive.cpp` / `storage.type.built-in.cpp`,
    // which would inherit the orange-tan keyword color. Java primitives are
    // already pinned to teal in the main Types rule above; do the same for C++
    // so that `int` reads the same in `int x;` (C++) as `int x;` (Java).
    {
      name: "C++ primitive types",
      scope: [
        "storage.type.primitive.cpp",
        "storage.type.built-in.cpp",
        "storage.type.built-in.primitive.cpp",
        "support.type.built-in.cpp",
        "support.type.built-in.primitive.cpp",
      ],
      settings: { foreground: syntaxType },
    },

    // C++ template parameters (`template<typename T>` → `T`) — keep generic
    // type parameters teal across all languages (TS `<T>`, Java `<T>`, Rust `<T>`).
    {
      name: "C++ template parameter",
      scope: [
        "entity.name.type.template.cpp",
        "entity.name.type.parameter.cpp",
        "storage.type.template.cpp",
      ],
      settings: { foreground: syntaxTypeParam },
    },

    // TS `satisfies` operator — some grammar versions scope it under
    // `keyword.control.satisfies.ts` (which would route to control-flow
    // purple-pink). Pin it to the keyword orange-tan, alongside `as`, `typeof`,
    // and `instanceof` (already covered by the word-like operators rule).
    {
      name: "TS satisfies operator",
      scope: [
        "keyword.control.satisfies.ts",
        "keyword.control.satisfies.tsx",
      ],
      settings: { foreground: syntaxKeyword },
    },

    // ─────────────────────────────────────────────────────────────────────
    // Markup / data-format cross-consistency
    // The "key in a key/value structure" concept (section header, table
    // header, .env name, config file key) uses editorForeground across data
    // formats — config keys read as plain identifiers, not code. Type-like
    // refs (XML namespaces, YAML tag handles) look like types: teal
    // syntaxType. Datetimes and other primitive literals look like numbers.
    // ─────────────────────────────────────────────────────────────────────

    // YAML directives (`%YAML 1.2`) — these are metadata about the document,
    // same family as decorators/annotations in code → yellow-green.
    {
      name: "YAML directive",
      scope: [
        "entity.tag.directive.yaml",
        "punctuation.definition.directive.begin.yaml",
      ],
      settings: { foreground: syntaxMetadata },
    },

    // YAML tag handles (`!!str`, `!Foo`) — they declare a type, not a key
    // or a keyword. Pin to type teal so they read like `int` / `str` do.
    {
      name: "YAML tag handle",
      scope: [
        "storage.type.tag-handle.yaml",
        "entity.name.type.tag.yaml",
      ],
      settings: { foreground: syntaxType },
    },

    // TOML section / table headers (`[section]`, `[[array.of.tables]]`) —
    // these ARE the keys of the document. Match editorForeground like other
    // config-file keys (JSON/YAML/INI).
    {
      name: "TOML section / table header",
      scope: [
        "entity.name.section.toml",
        "entity.name.table.toml",
        "entity.other.attribute-name.table.toml",
      ],
      settings: { foreground: editorForeground },
    },

    // TOML datetime literals — `1979-05-27T07:32:00-08:00` is a primitive
    // value, not a string. Match number color so it visually groups with
    // other scalars (ints, floats, booleans).
    {
      name: "TOML datetime literal",
      scope: [
        "constant.other.time.datetime.offset.toml",
        "constant.other.time.datetime.local.toml",
        "constant.other.time.date.toml",
        "constant.other.time.time.toml",
      ],
      settings: { foreground: syntaxNumber },
    },

    // XML namespace prefixes (`xmlns:foo`, `<foo:bar>`) — the prefix names
    // a type/schema, not the tag itself. Color it teal so it stands apart
    // from the tag-name gold and signals "this is a namespace reference".
    {
      name: "XML namespace prefix",
      scope: [
        "entity.name.tag.namespace.xml",
        "entity.other.attribute-name.namespace.xml",
        "entity.name.tag.namespace",
      ],
      settings: { foreground: syntaxType },
    },

    // JSON5 unquoted keys — JSON5 allows `{ foo: 1 }`. Some grammars scope
    // these as `meta.mapping.key.json5` or `string.unquoted.key.json5`. Pin
    // to the same editorForeground as quoted JSON keys for visual parity.
    {
      name: "JSON5 unquoted key",
      scope: [
        "meta.mapping.key.json5",
        "string.unquoted.key.json5",
        "entity.name.tag.json5",
      ],
      settings: { foreground: editorForeground },
    },

    // INI / .properties / .env keys and section headers — `[section]` and
    // `KEY=value` are both keys-in-a-key-value-structure. Match editorForeground
    // like other config-file keys (JSON/YAML/TOML) for visual consistency.
    {
      name: "INI / .env / .properties keys and sections",
      scope: [
        "entity.name.section.group-title.ini",
        "entity.name.section.ini",
        "keyword.other.definition.ini",
        "variable.other.key.env",
        "entity.name.tag.env",
        "support.type.property-name.ini",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Markdown ──
    {
      name: "Markdown heading",
      scope: "markup.heading",
      settings: { fontStyle: "bold", foreground: syntaxFunction },
    },
    {
      name: "Markdown bold",
      scope: "markup.bold",
      settings: { fontStyle: "bold", foreground: syntaxFunction },
    },
    {
      name: "Markdown italic",
      scope: "markup.italic",
      settings: { fontStyle: "italic", foreground: syntaxMember },
    },
    {
      name: "Markdown header symbol",
      scope: "header",
      settings: { foreground: syntaxFunction },
    },
    {
      name: "Markdown blockquote",
      scope: "punctuation.definition.quote.begin.markdown",
      settings: { foreground: syntaxComment },
    },
    {
      name: "Markdown list bullet",
      scope: "punctuation.definition.list.begin.markdown",
      settings: { foreground: blue8 },
    },
    {
      name: "Markdown inline code",
      scope: "markup.inline.raw",
      settings: { foreground: syntaxString },
    },
    {
      // Diff convention: green = inserted, red = deleted — aligns Markdown diff
      // rendering with how diff tools conventionally signal additions vs removals.
      name: "Markdown inserted",
      scope: "markup.inserted",
      settings: { foreground: syntaxString },
    },
    {
      name: "Markdown deleted",
      scope: "markup.deleted",
      settings: { foreground: red7 },
    },
    {
      name: "Markdown changed",
      scope: "markup.changed",
      settings: { foreground: syntaxKeyword },
    },
    {
      name: "Markdown link text",
      scope: ["string.other.link.title.markdown", "markup.underline.link.markdown"],
      settings: { foreground: blue9 },
    },

    // ── Regexp ──
    {
      name: "Regexp group punctuation",
      scope: [
        "punctuation.definition.group.regexp",
        "punctuation.definition.group.assertion.regexp",
        "punctuation.definition.character-class.regexp",
        "punctuation.character.set.begin.regexp",
        "punctuation.character.set.end.regexp",
        "keyword.operator.negation.regexp",
        "support.other.parenthesis.regexp",
      ],
      settings: { foreground: syntaxString },
    },
    {
      name: "Regexp character class",
      scope: [
        "constant.character.character-class.regexp",
        "constant.other.character-class.set.regexp",
        "constant.other.character-class.regexp",
        "constant.character.set.regexp",
      ],
      settings: { foreground: syntaxRegexp },
    },
    {
      name: "Regexp alternation / anchor",
      scope: ["keyword.operator.or.regexp", "keyword.control.anchor.regexp"],
      settings: { foreground: syntaxFunction },
    },
    {
      name: "Regexp quantifier",
      scope: "keyword.operator.quantifier.regexp",
      settings: { foreground: syntaxMetadata },
    },

    // ── Diffs ──
    {
      name: "Diff header",
      scope: "meta.diff.header",
      settings: { foreground: syntaxKeyword },
    },

    // ── Git rebase ──
    {
      name: "Git rebase function",
      scope: "support.function.git-rebase",
      settings: { foreground: syntaxFunction },
    },
    {
      name: "Git rebase SHA",
      scope: "constant.sha.git-rebase",
      settings: { foreground: syntaxNumber },
    },

    // ── Java import / wildcard ──
    {
      name: "Java import / package / wildcard",
      scope: [
        "storage.modifier.import.java",
        "variable.language.wildcard.java",
        "storage.modifier.package.java",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Labels ──
    {
      name: "Label",
      scope: "entity.name.label",
      settings: { foreground: syntaxLabel },
    },

    // ── Invalid ──
    {
      name: "Invalid",
      scope: "invalid",
      settings: { foreground: syntaxInvalid },
    },
    {
      // Deprecated ≠ broken: keep normal color, strike it through (otherwise
      // the generic `invalid` red above would paint deprecated usages as errors).
      name: "Deprecated",
      scope: "invalid.deprecated",
      settings: { fontStyle: "strikethrough", foreground: editorForeground },
    },
  ],
};

export default theme;
