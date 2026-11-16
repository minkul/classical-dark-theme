// ─────────────────────────────────────────────────────────────────────────────
// Classical Dark Midnight — color palette
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the theme: `npm run build` (src/build-theme.ts)
// writes it to themes/classical-dark-midnight.json.
//
// Layout model: the workbench is a set of deep midnight panels — editor,
// side bar, panel, terminal — resting on a slightly lighter indigo frame
// (`gray30`): title bar, activity bar, status bar and the shell that shows
// between floating panels in the modern layout.
//
// Syntax model: which tokens share a color is decided in src/syntax.ts, the
// same for every theme and every language; this theme picks a hue per role.
// No bold or italic anywhere in the editor; strikethrough (deprecated) and
// underline (links) are kept.
//   pink   → keywords, control flow, modifiers, macros, escapes, doc tags
//   purple → constants: numbers, true / null, this / self, const / readonly
//            values, enum members, CSS values, markdown headings
//   green  → functions and methods, declarations and calls alike
//   cyan   → types, classes, namespaces, primitive types, type parameters;
//            also markup tags and keys in data files
//   orange → parameters; also attribute names, CSS selectors and property
//            names
//   yellow → strings and regular expressions
//   red    → invalid code
//   slate  → comments; variables and properties are plain text
// Nested brackets cycle white → pink → cyan → green → purple → orange, so each
// nesting level reads apart at a glance; their pair guides follow suit.
//
// Palette: every color below is one of the palette constants, a neutral of the
// ramp, or a tint / shade of a palette hue (mixed toward the editor surface).
// The terminal's ANSI palette is the palette itself; it has no true blue, so
// ANSI blue is purple and bright blue lavender. In the UI, "modified" and
// "information" are cyan.

import { compositingOver, mix } from "./color";
import { semanticTokenColors, tokenColors, type SyntaxPalette } from "./syntax";
import type { ThemeDefinition } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Color helpers
// ─────────────────────────────────────────────────────────────────────────────

/** A palette hue darkened toward black: deeper color at the same lightness once tinted. */
const shade = (hue: string, weight: number): string => mix(hue, black, weight);

// ─────────────────────────────────────────────────────────────────────────────
// Palette
// ─────────────────────────────────────────────────────────────────────────────
// Accents, icons, highlights and file states below reference these names, so
// retuning a hue retunes it everywhere.

const background = "#282A36";
const backgroundDark = "#21222C";
const backgroundLight = "#343746";
const backgroundLighter = "#424450";
const currentLine = "#44475A";
const foreground = "#F8F8F2";
// Lifted from the classic #6272A4 slate (3:1) so comments reach 4.5:1 on the
// editor and panel surfaces and keep 3:1 under the selection.
const comment = "#8894B8";
const pink = "#FF79C6";
const green = "#50FA7B";
const cyan = "#8BE9FD";
const yellow = "#F1FA8C";
const purple = "#BD93F9";
const orange = "#F3BA78";
const red = "#FF5555";
// Bright variants: the terminal's bright ANSI colors, and lighter accents in
// the UI (staged file states, data-member icons, error text).
const brightRed = "#FF6E6E";
const brightGreen = "#69FF94";
const brightYellow = "#FFFFA5";
const lavender = "#D6ACFF";
const brightPink = "#FF92DF";
const brightCyan = "#A4FFFF";

// Neutral ramp — surfaces, borders and text (cool indigo tint)
const gray10 = background; // editor surface: editor, inputs
const gray20 = "#2B2C3A"; // panel surface: side bar, panel, output, chat; find widget, peek editor, alternating rows
const gray30 = backgroundLight; // frame: title/activity/status bars, modern shell; popups; panel separators
const gray40 = backgroundLighter; // popup separators, view section separators, inactive selection, current tab of an unfocused group, notifications
const gray50 = "#4B4E63"; // structural borders (notebook cells, merge regions), progress track
const gray60 = "#5C5F77"; // popup borders, line numbers
// One border around every floating popup (suggest, hover, parameter hints,
// code actions, peek, quick pick, menus, notifications): ~2:1 against the
// editor and popup surfaces — subtle, but the popup edge never melts into code.
const popupBorder = gray60;
// Control borders reach 3:1 against the editor, panel, popup and frame
// surfaces (WCAG 1.4.11), so the edge of an input, dropdown or checkbox is
// findable without its fill. The frame (gray30) is the tightest at ~3.05:1.
const gray70 = "#7D8097"; // control borders (inputs, dropdowns, checkboxes, secondary buttons)
const gray80 = "#8E91A8"; // tertiary text on the editor: disabled text, placeholders, code lens, blame; neutral counter badges
const gray100 = "#A0A3BC"; // muted text: status bar, descriptions, inactive titles
const gray120 = "#C4C6D8"; // icons
const gray130 = "#D9DAE6"; // primary UI text
const gray150 = "#EEEEF5"; // emphasized text
const white = "#FFFFFF";
const black = "#000000";
const transparent = "#00000000";

// Accent ramp (violet) — selection, focus, primary actions
// The selection steps share one muted indigo-violet (hue 250°, ~30%
// saturation) and differ only in lightness. The selection sits ~1.5:1 against
// popups and ~1.7:1 against the side bar, so a selected row or menu item stands
// out from its surface; toggled buttons sit one step brighter still.
const accent40 = "#443B6E"; // multi-selected tabs, keyboard focus row
const accent50 = "#524785"; // current tab, list / menu / completion selection
const accent60 = "#60549C"; // toggled buttons and options, active tab hover
const accent70 = "#6247BF"; // accent hover
const accent80 = "#7056CF"; // accent: primary buttons, progress, drop targets, active panel title
const accent90 = "#A48BF5"; // accent badge
const accent100 = purple; // active activity item, modified-setting marker
const accentVivid = "#8A6CF0"; // focus ring, checked boxes, chart lines, selected terminal block
// Keyboard focus outlines stay at 3:1 or more on every surface (WCAG 1.4.11).
const focusRing = accentVivid;

// Cyan ramp — information and "modified". Accent violet means selection and
// action; cyan means "for your information", as on the info icons.
const cyan40 = mix(cyan, gray10, 0.15); // info surface: banners, validation, info peek headers
const cyan60 = mix(cyan, gray10, 0.35); // info surface border
const cyan80 = mix(cyan, gray10, 0.8); // info accent: F8 info border

// Green / red / yellow / purple ramps — feedback surfaces and accents
const green60 = "#2A5A3E";
const green80 = "#2B7F4F"; // success / running accent
const green100 = green; // success text, added files
const red40 = "#512736"; // error surface
const red60 = "#7A3343"; // error surface border
const red70 = "#A33849";
const red80 = "#C2455A"; // error accent / error border
const red100 = brightRed; // error text
const yellow40 = "#3F3F27"; // warning surface
const yellow60 = "#5E5D2A"; // warning surface border
const yellow70 = "#6A6512";
const yellow80 = "#7D7716"; // warning accent / warning border
const yellow100 = yellow; // warning text
const yellow110 = yellow; // match text on the selected row
const purple20 = "#2E2748"; // AI surface
const purple50 = "#4A3C80"; // AI surface border
const purple70 = "#6B52C2";
const purple100 = purple;
const purple140 = "#E6DCFF";
const pink100 = pink;
const cyan100 = cyan;
const matchCyan = cyan; // matched characters in lists and type-to-find
const shellTint = "#3B3470"; // gradient tint of the agents shell

// Translucent washes, shadow and scrollbar thumbs
const wash05 = "#FFFFFF0A"; // hovered terminal block
const wash10 = "#FFFFFF0F"; // list / tree / editor hover
const wash20 = "#FFFFFF17"; // toolbar / tab / status item hover
const wash30 = "#FFFFFF21"; // separators on the frame
const wash40 = "#FFFFFF29"; // pressed state, neutral badge
const wash50 = "#FFFFFF3B"; // keybinding outline, sash grips
const shadow = "#0000004D";
// Outline drawn around every workbench area (panels, editor, bars). Translucent
// so one value reads as the same soft edge on the panels and on the frame.
const uiOutline = "#FFFFFF21";
const dropTarget = "#7056CF4D"; // drag-and-drop target area
const whiteMuted = "#FFFFFFCC"; // text on neutral translucent badges
const scrollbarThumb = "#8B8FB04D";
const scrollbarThumbHover = "#8B8FB080";
const minimapThumb = "#8B8FB02E";
const windowBorder = gray60;

// Icon colors (status glyphs, symbol kinds, run / debug controls) — the
// syntax hues. Types, callables, constants and keywords take the hue they have
// in code; variables, fields and properties are plain text in code, so their
// icons get lavender to stay distinguishable.
const iconRed = red; // error, breakpoint, stop
const iconYellow = yellow; // warning, failed test, light bulb, execution point
const iconInfo = cyan; // info, running, unresolved comments
const iconGreen = green; // success, run / debug / resume, functions / methods
const iconCyan = cyan; // classes / types / interfaces
const iconPurple = purple; // enums, constants, literals
const iconPink = pink; // keywords, operators, events
const iconLavender = lavender; // variables, fields, properties, AI
const aiPurple = "#9A7CF2"; // AI working accent

// Checkbox / radio glyphs
const checkFill = gray30;
const checkBorder = gray70;
const checkSelected = accentVivid;
const checkDisabledFill = gray40;
const checkDisabledMark = "#646782";

// ─────────────────────────────────────────────────────────────────────────────
// Syntax colors
// ─────────────────────────────────────────────────────────────────────────────

// Roles are defined in src/syntax.ts; the palette below assigns them hues.
// With seven hues for ten roles, two pairs share: markup tags and data-file
// keys take the type cyan (a JSX component is a type too), and attribute /
// CSS property names take the parameter orange (they never meet a parameter
// outside JSX).
const synForeground = foreground; // variables, properties, operators, default text
const synComment = comment;
const synKeyword = pink;
const synFunction = green;
const synType = cyan;
const synString = yellow;
const synConstant = purple;
const synParameter = orange;
const synInvalid = red;

// Bracket pair colors, outermost first. Each level takes the next hue of the
// syntax palette; the pair guides show the same hue, dimmed.
const bracketLevels = [foreground, pink, cyan, green, purple, orange];

// ─────────────────────────────────────────────────────────────────────────────
// Editor palette
// ─────────────────────────────────────────────────────────────────────────────

const editorBackground = gray10;
const { overlay, layer, veil } = compositingOver(editorBackground);
// Marks VS Code wants non-opaque but that should look solid (overview ruler,
// minimap, chat fills): mostly opaque, composited back to the palette color.
const markAlpha = 0.8;
const editorForeground = synForeground;
// Long-form text in panels (chat transcripts, side bar views, typed input)
// is one step softer than code so the editor stays the brightest surface.
const bodyText = "#E2E3EC";
const caret = foreground;
const caretRowBorder = "#474A5F"; // outline around the caret line (no fill)
const lineNumber = gray60;
const lineNumberActive = gray120;
const indentGuide = "#353748"; // indent guides, rulers
const indentGuideActive = "#5A5D7C"; // active indent guide, matched-bracket guide
const whitespace = gray60;
// Clearly visible on the editor, dark enough that every syntax hue, the
// comment slate included, keeps 3:1 on top of it.
const selection = currentLine;
const selectionInactive = "#3F4155";
const popupEditorBackground = "#2E3040"; // completion list and documentation popups
const blockBackground = gray30; // markdown quotes, collapsed diff regions
// Sticky scroll headers sit one step below the surface they pin over, so the
// pinned lines read as a recessed band. Opaque: the terminal hands this color
// to xterm, which flattens alpha to black unless image support is on.
const editorStickyBackground = backgroundDark; // editor (gray10) minus one step
const terminalStickyBackground = "#252632"; // terminal (gray20) minus one step
const inlineCodeBackground = "#383A4C";
const inlineCodeForeground = synForeground;
const foldedForeground = gray100;
const foldedBackground = gray40;
const inlayBackground = "#333546";
const inlayForeground = gray100;
const inlayParameterForeground = gray100;
const inlayTextForeground = gray80; // hints without background: code lens
const ghostText = "#8287A1"; // inline completions
const matchedBracket = selection;
const matchedBracketBorder = "#7C7F99";
const breadcrumbForeground = gray100;
const breadcrumbActive = gray150;

// ─────────────────────────────────────────────────────────────────────────────
// Highlights
// ─────────────────────────────────────────────────────────────────────────────
// Each kind keeps its own hue. Find results and peek targets are tinted blocks
// inside a matching box; occurrences are the box alone, so the selection is
// the only fill on a selected occurrence. Every highlight stays visible on the
// caret row, inside a selection and on top of a diff tint. Fills are dark
// enough that syntax colors stay legible.
//   yellow → the current find result (strong fill, solid box)
//   cyan   → the other find results (soft fill, translucent box)
//   purple → occurrences of the symbol under the caret (read access) and of
//            the selected text (box only)
//   pink   → write-access occurrences of the symbol under the caret (box only)
//   green  → go-to-definition / peek targets

const findCurrent = mix(yellow, editorBackground, 0.3);
const findCurrentBorder = yellow;
const findOther = mix(cyan, editorBackground, 0.17);
const findOtherBorder = cyan + "99";
const findMark = yellow;
const wordReadBorder = purple + "99";
const wordReadMark = purple;
const wordWriteBorder = pink + "99";
const wordWriteMark = pink;
const usage = mix(green, editorBackground, 0.16);
// Find-result fills are drawn above the selection, so they are mostly
// see-through (same on-screen color via overlay): a selected match reads as a
// lighter block than the unselected matches around it.
const highlightAlpha = 0.25;
const usageBorder = green + "80";
const liveTemplate = purple; // snippet placeholders, linked editing
const liveTemplateInactive = gray100;
const hyperlink = cyan;

// Diagnostics (underline color + scrollbar mark)
const errorUnderline = red;
const errorMark = mix(red, editorBackground, 0.85);
const warningUnderline = yellow;
const warningMark = mix(yellow, editorBackground, 0.8);
const weakWarning = cyan; // information-level diagnostics
const errorHint = "#422837"; // inline test-failure line

// Debugging
const executionLine = mix(yellow, editorBackground, 0.14);
const otherFrameLine = mix(purple, editorBackground, 0.14);
const inlineValue = synComment;
const debugValue = synConstant;
const debugType = synType;
const debugChanged = cyan;

// ─────────────────────────────────────────────────────────────────────────────
// Version control
// ─────────────────────────────────────────────────────────────────────────────
// One hue per kind of change, the same in the gutter, diff editor, merge
// editor, inline edits, scrollbar and minimap:
//   green  → added; the incoming side of a merge
//   red    → removed; a merge's base (the code both sides replace)
//   cyan   → modified; the current side of a merge
//   orange → unresolved merge conflicts
//
// Diff fills come in two strengths of each hue:
//   line → a faint tint on every changed line
//   word → a deeper shade on the changed words inside it. It stands apart
//          from the line tint mostly by color, not lightness, so code on top
//          keeps its contrast: VS Code also paints wholly added or removed
//          blocks (and notebook cells) in the word shade.
// The tints start from palette hues darkened toward black (`shade`), which
// carry more color per step of lightness over this violet surface; plain
// tints of green and red fade to near-gray here and look alike.
// Fills are drawn above the selection, so each is a `layer`: the lowest alpha
// that reaches its color. A selection keeps ~90% of its lift on a changed line
// and ~70% on a changed word, so it reads on every diff tint.

// Line tints: ~4 ΔE (OKLab ×100) above the editor surface, ~5.5 ΔE apart.
// (Red reads stronger than green on this surface, so its tint is lighter.)
const addedLine = mix(shade(green, 0.34), editorBackground, 0.27);
const removedLine = mix(shade(red, 0.44), editorBackground, 0.26);
// Word shades: ~9–10 ΔE above their line tint, ~14 ΔE apart, and 6–7 ΔE from
// a selected line tint, so a selection is never mistaken for a changed word.
// The main syntax hues keep 3.5:1 on them (regexp red ~3:1); comments ~2:1,
// as on the selection.
const addedWord = mix(shade(green, 0.38), editorBackground, 0.78);
const removedWord = mix(shade(red, 0.66), editorBackground, 0.48);
// Inline merge-conflict blocks: content tints a step stronger than diff lines
// (the three sides sit back to back, ≥6 ΔE apart); the marker line above each
// takes the word-strength shade.
const currentBlock = mix(cyan, editorBackground, 0.11);
const incomingBlock = mix(shade(green, 0.32), editorBackground, 0.51);
const commonBlock = mix(shade(red, 0.4), editorBackground, 0.46);
const currentMarker = mix(shade(cyan, 0.88), editorBackground, 0.27);
const incomingMarker = addedWord;
const commonMarker = removedWord;
const conflictLabel = mix(orange, editorBackground, 0.22); // "Conflicting Lines" label in the merge result

// Marks — gutter bars, scrollbar and minimap: softened hues at one shared
// lightness (~4.5:1 on the editor), so no kind of change outshines another.
// Secondary bars (a second quick-diff source, e.g. staged changes) are the
// same hues at ~2:1.
const markAdded = mix(mix(green, foreground, 0.75), editorBackground, 0.59);
const markRemoved = mix(mix(red, foreground, 0.7), editorBackground, 0.79);
const markModified = mix(cyan, editorBackground, 0.6);
const markConflict = mix(orange, editorBackground, 0.67);
const markAddedSecondary = mix(markAdded, editorBackground, 0.45);
const markRemovedSecondary = mix(markRemoved, editorBackground, 0.45);
const markModifiedSecondary = mix(markModified, editorBackground, 0.45);
const markConflictUnfocused = mix(markConflict, editorBackground, 0.55);

// Unchanged lines shown around collapsed regions recede to the sticky-scroll
// shade, so the changes between them stand out.
const unchangedCode = backgroundDark;
const fileAdded = green100;
const fileModified = cyan;
const fileDeleted = red;
// File states (explorer, open editors, SCM, tabs). Every state gets its own
// color; the staged variant of a change is the lighter variant of its
// unstaged hue. Saturated red is reserved for errors, so deleted files use
// red tints. Every label reaches 4.5:1 on the side bar (ignored files, which
// recede on purpose, reach 4:1) and 3:1 on a selected row.
const fileUntracked = green; // green: new file, not yet added
const fileStagedAdded = brightGreen; // bright green: new file, staged
const fileStagedModified = brightCyan; // bright cyan: modified, staged
const fileStateDeleted = mix(red, foreground, 0.6); // rose: deleted (struck through by VS Code)
const fileStagedDeleted = mix(red, foreground, 0.45); // light rose: deleted, staged
const fileRenamed = purple; // purple: renamed / copied
const fileConflict = pink; // pink: merge conflict
const fileSubmodule = orange; // orange: submodule
const fileIgnored = comment; // slate: ignored
const fileError = brightRed; // red: has errors (the error-text red)
const fileWarning = yellow; // yellow: has warnings
const fileInvalid = mix(red, orange, 0.5); // coral: invalid item (e.g. unresolvable workspace root)
const fileChatEdited = lavender; // lavender: edited by chat
const modifiedTab = cyan;
const blameText = gray80;
const branchHead = yellow;
const branchLocal = green;
const branchRemote = purple;
const branchTag = gray100;
const coverageFull = green60;
const coveragePartial = yellow60;
const coverageNone = "#6A2A38";

// ─────────────────────────────────────────────────────────────────────────────
// Terminal
// ─────────────────────────────────────────────────────────────────────────────
// The palette's own ANSI set: the syntax hues, with purple standing in for
// blue and lavender for bright blue. VS Code re-tints any ANSI color below
// `terminal.integrated.minimumContrastRatio` (default 4.5), so black and bright
// black text are lifted at render time.

const terminalAnsi = {
  black: backgroundDark,
  red,
  green,
  yellow,
  blue: purple,
  magenta: pink,
  cyan,
  white: foreground,
  brightBlack: comment,
  brightRed,
  brightGreen,
  brightYellow,
  brightBlue: lavender,
  brightMagenta: brightPink,
  brightCyan,
  brightWhite: white,
};
const terminalBlockSeparator = gray40;
const terminalSelectedBlock = accentVivid;

const syntaxPalette: SyntaxPalette = {
  variable: synForeground,
  comment: synComment,
  keyword: synKeyword,
  constant: synConstant,
  function: synFunction,
  type: synType,
  parameter: synParameter,
  string: synString,
  tag: synType,
  attribute: synParameter,
  invalid: synInvalid,
  tagPunctuation: gray100,
  inserted: fileAdded,
  deleted: fileDeleted,
  changed: fileModified,
  logError: red,
  logWarning: yellow,
  logInfo: cyan,
  logDebug: purple,
};

// ─────────────────────────────────────────────────────────────────────────────
// Theme export
// ─────────────────────────────────────────────────────────────────────────────

const theme: ThemeDefinition = {
  $schema: "vscode://schemas/color-theme",
  name: "Classical Dark Midnight",
  type: "dark",

  // ───────────────────────────────────────────────────────────────────────────
  // UI Colors
  // ───────────────────────────────────────────────────────────────────────────
  colors: {
    // ── Base / shared ──
    foreground: bodyText,
    disabledForeground: gray80,
    descriptionForeground: gray100,
    errorForeground: red100,
    focusBorder: focusRing,
    strongForeground: white,
    "icon.foreground": gray120,
    "selection.background": accent50,
    "sash.hoverBorder": accent80,
    "widget.border": popupBorder,
    "widget.shadow": shadow,
    "window.activeBorder": windowBorder,
    "window.inactiveBorder": gray50,
    "scrollbar.shadow": transparent,
    "scrollbar.background": transparent,
    "scrollbarSlider.background": scrollbarThumb,
    "scrollbarSlider.hoverBackground": scrollbarThumbHover,
    "scrollbarSlider.activeBackground": scrollbarThumbHover,
    "progressBar.background": accent80,

    // ── Text ──
    "textLink.foreground": hyperlink,
    "textLink.activeForeground": hyperlink,
    "textBlockQuote.background": blockBackground,
    "textBlockQuote.border": synComment,
    // Code blocks in rendered markdown (hovers, previews, chat webviews) sit on
    // the editor background, so code in a panel reads like the editor. In the
    // markdown preview the widget border keeps them outlined.
    "textCodeBlock.background": editorBackground,
    "textPreformat.foreground": inlineCodeForeground,
    "textPreformat.background": inlineCodeBackground,
    "textPreformat.border": transparent,
    "textSeparator.foreground": gray40,

    // ── Toolbars ──
    "toolbar.hoverBackground": wash20,
    "toolbar.activeBackground": wash40,
    "toolbar.hoverOutline": transparent,
    "actionBar.toggledBackground": accent60,

    // ── Frame: title bar, command center, menu bar ──
    "titleBar.activeBackground": gray30,
    "titleBar.activeForeground": gray130,
    "titleBar.inactiveBackground": gray30,
    "titleBar.inactiveForeground": gray100,
    "titleBar.border": uiOutline,
    "commandCenter.background": wash10,
    "commandCenter.foreground": gray130,
    "commandCenter.activeBackground": wash20,
    "commandCenter.activeForeground": gray130,
    "commandCenter.inactiveForeground": gray100,
    "commandCenter.border": wash30,
    "commandCenter.activeBorder": wash40,
    "commandCenter.inactiveBorder": wash10,
    // Running / debugging tints the frame widgets green.
    "commandCenter.debuggingBackground": green80 + "80",
    "menubar.selectionBackground": wash20,
    "menubar.selectionForeground": gray130,
    "menubar.selectionBorder": transparent,

    // ── Modern layout: panels floating on the frame ──
    // Every panel carries a soft translucent outline (uiOutline) on top of its
    // contrast with the frame around it.
    "modernUI.shellBackground": gray30,
    "modernUI.inactiveShellBackground": gray30,
    "surface.background": gray10,
    "surface.foreground": bodyText,
    "surface.border": uiOutline,
    "editor.border": uiOutline,
    "modernPanel.border": uiOutline,
    "modernSash.gripForeground": wash50,
    "modernActivityBar.background": gray30,
    "modernActivityBar.inactiveBackground": gray30,
    "modernActivityBar.border": uiOutline,
    "modernActivityBarItem.activeBackground": transparent,
    "modernActivityBarItem.activeForeground": accent100,
    "modernActivityBarItem.hoverBackground": wash10,
    "modernActivityBarItem.hoverForeground": gray130,
    // Modern tabs: the current tab is a filled block in the selection violet,
    // lifting one step on hover.
    "modernTab.activeBackground": accent50,
    "modernTab.activeForeground": gray130,
    "modernTab.hoverBackground": wash20,
    "modernTab.hoverForeground": gray130,
    "modernEditorTab.activeBackground": accent50,
    "modernEditorTab.activeForeground": gray130,
    "modernEditorTab.activeHoverBackground": accent60,
    "modernEditorTab.inactiveBackground": transparent,
    "modernEditorTab.hoverBackground": wash20,
    "modernEditorTab.hoverForeground": gray130,
    "modernEditorTab.activeActionBackground": accent50,
    "modernEditorTab.activeHoverActionBackground": accent60,
    "modernEditorTab.hoverActionBackground": mix(
      white,
      editorBackground,
      0x17 / 255,
    ),
    "modernEditorTab.selectedActionBackground": accent40,
    "browser.border": gray30,

    // ── Activity bar ──
    // The activity bar sits on the frame. The active item is marked by its violet
    // glyph alone, with no tile behind it; inactive glyphs stay neutral so the
    // violet one reads as the selection.
    "activityBar.background": gray30,
    "activityBar.foreground": accent100,
    "activityBar.inactiveForeground": gray100,
    "activityBar.border": uiOutline,
    "activityBar.activeBorder": transparent,
    "activityBar.activeBackground": transparent,
    "activityBar.activeFocusBorder": focusRing,
    "activityBar.dropBorder": accent80,
    "activityBarBadge.background": accent90,
    "activityBarBadge.foreground": gray10,
    "activityErrorBadge.background": red80,
    "activityErrorBadge.foreground": white,
    "activityWarningBadge.background": yellow80,
    "activityWarningBadge.foreground": white,
    // Activity bar docked at the top of the side bar — inside the panel.
    "activityBarTop.background": gray20,
    "activityBarTop.foreground": accent100,
    "activityBarTop.inactiveForeground": gray100,
    "activityBarTop.activeBackground": transparent,
    "activityBarTop.activeBorder": transparent,
    "activityBarTop.dropBorder": accent80,

    // ── Side bar ──
    "sideBar.background": gray20,
    "sideBar.foreground": bodyText,
    "sideBar.border": uiOutline,
    "sideBar.dropBackground": dropTarget,
    "sideBarTitle.background": gray20,
    "sideBarTitle.foreground": gray130,
    "sideBarTitle.border": gray30,
    "sideBarSectionHeader.background": gray20,
    "sideBarSectionHeader.foreground": gray130,
    // Separators between stacked views sit on the panel surface, where the
    // frame color barely shows, so they step up one shade.
    "sideBarSectionHeader.border": gray40,
    "sideBarActivityBarTop.border": gray30,
    "sideBarStickyScroll.background": gray20,
    "sideBarStickyScroll.border": gray30,
    "sideBarStickyScroll.shadow": shadow,

    // ── Panel (problems, output, debug console, terminal, ports) ──
    "panel.background": gray20,
    "panel.border": uiOutline,
    "panel.dropBorder": accent80,
    "panelTitle.activeForeground": gray130,
    "panelTitle.inactiveForeground": gray100,
    "panelTitle.activeBorder": accent80,
    "panelTitle.border": gray30,
    "panelTitleBadge.background": gray80,
    "panelTitleBadge.foreground": black,
    "panelSection.border": gray40,
    "panelSection.dropBackground": dropTarget,
    "panelSectionHeader.background": gray20,
    "panelSectionHeader.foreground": gray130,
    "panelSectionHeader.border": gray40,
    "panelInput.border": gray70,
    "panelStickyScroll.background": gray20,
    "panelStickyScroll.border": gray30,
    "panelStickyScroll.shadow": shadow,
    "outputView.background": gray20,
    "outputViewStickyScroll.background": gray20,

    // ── Status bar ──
    "statusBar.background": gray30,
    "statusBar.foreground": gray100,
    "statusBar.border": uiOutline,
    "statusBar.inactiveBackground": gray30,
    "statusBar.focusBorder": focusRing,
    "statusBar.noFolderBackground": gray30,
    "statusBar.noFolderForeground": gray100,
    "statusBar.noFolderBorder": uiOutline,
    "statusBar.debuggingBackground": green80,
    "statusBar.debuggingForeground": white,
    "statusBar.debuggingBorder": transparent,
    "statusBarItem.hoverBackground": wash20,
    "statusBarItem.hoverForeground": gray130,
    "statusBarItem.activeBackground": wash40,
    "statusBarItem.compactHoverBackground": wash40,
    "statusBarItem.focusBorder": focusRing,
    "statusBarItem.prominentBackground": wash30,
    "statusBarItem.prominentForeground": gray130,
    "statusBarItem.prominentHoverBackground": wash40,
    "statusBarItem.prominentHoverForeground": gray130,
    "statusBarItem.remoteBackground": accent80,
    "statusBarItem.remoteForeground": white,
    "statusBarItem.remoteHoverBackground": accent70,
    "statusBarItem.remoteHoverForeground": white,
    "statusBarItem.errorBackground": red80,
    "statusBarItem.errorForeground": white,
    "statusBarItem.errorHoverBackground": red70,
    "statusBarItem.errorHoverForeground": white,
    "statusBarItem.warningBackground": yellow80,
    "statusBarItem.warningForeground": white,
    "statusBarItem.warningHoverBackground": yellow70,
    "statusBarItem.warningHoverForeground": white,
    "statusBarItem.offlineBackground": red80,
    "statusBarItem.offlineForeground": white,
    "statusBarItem.offlineHoverBackground": red70,
    "statusBarItem.offlineHoverForeground": white,

    // ── Editor groups and tabs ──
    // Tabs live inside the editor panel and the strip shares the editor
    // background. The current tab is marked by its fill alone, with no edge
    // line — selection violet in the focused group, the neutral inactive-selection gray elsewhere so it stays
    // findable but subdued. Other labels are dimmed to 75%.
    // The modern "connected" tab style always paints the current tab with the
    // editor background (theme tab colors only reach the classic and "pill"
    // styles), so there the strip carries the contrast instead: the other tabs
    // sit on a lighter gray and the current tab reads as the dark top of the
    // editor rising out of it.
    "editorGroup.border": uiOutline,
    "editorGroup.dropBackground": dropTarget,
    "editorGroup.emptyBackground": editorBackground,
    "editorGroup.focusedEmptyBorder": focusRing,
    "editorGroup.dropIntoPromptBackground": gray30,
    "editorGroup.dropIntoPromptForeground": gray130,
    "editorGroup.dropIntoPromptBorder": gray40,
    "editorGroupHeader.tabsBackground": editorBackground,
    "editorGroupHeader.noTabsBackground": editorBackground,
    "editorGroupHeader.connectedTabsBackground": gray40,
    "editorGroupHeader.tabsBorder": gray30,
    "editorGroupHeader.border": gray30,
    "editorPane.background": editorBackground,
    "sideBySideEditor.horizontalBorder": gray30,
    "sideBySideEditor.verticalBorder": gray30,
    "tab.activeBackground": accent50,
    "tab.activeForeground": gray130,
    "tab.activeBorder": transparent,
    "tab.activeBorderTop": transparent,
    "tab.inactiveBackground": editorBackground,
    "tab.inactiveForeground": gray130 + "BF",
    "tab.hoverBackground": wash20,
    "tab.hoverForeground": gray130,
    "tab.hoverBorder": transparent,
    "tab.unfocusedActiveBackground": gray40,
    "tab.unfocusedActiveForeground": gray130,
    "tab.unfocusedActiveBorder": transparent,
    "tab.unfocusedActiveBorderTop": transparent,
    "tab.unfocusedInactiveBackground": editorBackground,
    "tab.unfocusedInactiveForeground": gray130 + "BF",
    "tab.unfocusedHoverBackground": wash20,
    "tab.unfocusedHoverForeground": gray130,
    "tab.unfocusedHoverBorder": transparent,
    "tab.selectedBackground": accent40,
    "tab.selectedForeground": gray130,
    "tab.selectedBorderTop": transparent,
    "tab.border": transparent,
    "tab.divider": transparent,
    "tab.lastPinnedBorder": wash30,
    "tab.dragAndDropBorder": accent80,
    "tab.activeModifiedBorder": modifiedTab,
    "tab.inactiveModifiedBorder": modifiedTab + "B3",
    "tab.unfocusedActiveModifiedBorder": modifiedTab + "80",
    "tab.unfocusedInactiveModifiedBorder": modifiedTab + "60",

    // ── Editor ──
    "editor.background": editorBackground,
    "editor.foreground": editorForeground,
    "editorCursor.foreground": caret,
    "editorCursor.background": editorBackground,
    "editorMultiCursor.primary.foreground": caret,
    "editorMultiCursor.primary.background": editorBackground,
    "editorMultiCursor.secondary.foreground": caret,
    "editorMultiCursor.secondary.background": editorBackground,
    // Caret line — outlined, never filled, so the code keeps its exact
    // background and the selection / find / diff tints read unaltered.
    "editor.lineHighlightBackground": transparent,
    "editor.inactiveLineHighlightBackground": transparent,
    "editor.lineHighlightBorder": caretRowBorder,
    "editorLineNumber.foreground": lineNumber,
    "editorLineNumber.activeForeground": lineNumberActive,
    "editorLineNumber.dimmedForeground": mix(lineNumber, editorBackground, 0.5),
    "editorGutter.background": editorBackground,
    "editor.compositionBorder": caret,
    "editor.placeholder.foreground": gray80,

    // Selection — translucent; selected code keeps its syntax colors.
    "editor.selectionBackground": overlay(selection, 0.6),
    "editor.inactiveSelectionBackground": overlay(selectionInactive, 0.8),
    // Occurrences of the symbol / selection under the caret — purple boxes with
    // no fill (pink for write access). Every occurrence, including the one under
    // the caret, is boxed, so the whole set reads at a glance; a selected
    // occurrence (keyboard selection, Add Selection To Next Find Match) is the
    // same box with the selection fill inside, so it stands apart from the rest.
    "editor.selectionHighlightBackground": transparent,
    "editor.selectionHighlightBorder": wordReadBorder,
    "editor.wordHighlightBackground": transparent,
    "editor.wordHighlightBorder": wordReadBorder,
    "editor.wordHighlightStrongBackground": transparent,
    "editor.wordHighlightStrongBorder": wordWriteBorder,
    "editor.wordHighlightTextBackground": transparent,
    "editor.wordHighlightTextBorder": wordReadBorder,

    // Find — the current result is a strong yellow block in a solid yellow box;
    // every other result is a soft cyan block in a translucent cyan box. The
    // current result's text turns white so it never blends into its own fill;
    // the other results keep their syntax colors.
    "editor.findMatchBackground": overlay(findCurrent, 0.8),
    "editor.findMatchBorder": findCurrentBorder,
    "editor.findMatchForeground": white,
    "editor.findMatchHighlightBackground": overlay(findOther, highlightAlpha),
    "editor.findMatchHighlightBorder": findOtherBorder,
    "editor.findRangeHighlightBackground": wash10,
    "editor.findRangeHighlightBorder": transparent,
    "searchEditor.findMatchBackground": overlay(findOther, highlightAlpha),
    "searchEditor.findMatchBorder": findOtherBorder,
    "searchEditor.textInputBorder": gray70,
    "search.resultsInfoForeground": gray100,

    "editor.hoverHighlightBackground": wash10,
    "editor.rangeHighlightBackground": wash10,
    "editor.rangeHighlightBorder": transparent,
    "editor.symbolHighlightBackground": overlay(usage, 0.7),
    "editor.symbolHighlightBorder": usageBorder,
    "editor.linkedEditingBackground": liveTemplate + "26",
    "editorLink.activeForeground": hyperlink,
    "editorUnicodeHighlight.background": transparent,
    "editorUnicodeHighlight.border": warningUnderline,

    // Snippets — placeholders are boxed; the active one is also selected.
    "editor.snippetTabstopHighlightBackground": transparent,
    "editor.snippetTabstopHighlightBorder": liveTemplateInactive,
    "editor.snippetFinalTabstopHighlightBackground": transparent,
    "editor.snippetFinalTabstopHighlightBorder": liveTemplate,

    // Guides, rulers, whitespace
    "editorIndentGuide.background1": indentGuide,
    "editorIndentGuide.background2": indentGuide,
    "editorIndentGuide.background3": indentGuide,
    "editorIndentGuide.background4": indentGuide,
    "editorIndentGuide.background5": indentGuide,
    "editorIndentGuide.background6": indentGuide,
    "editorIndentGuide.activeBackground1": indentGuideActive,
    "editorIndentGuide.activeBackground2": indentGuideActive,
    "editorIndentGuide.activeBackground3": indentGuideActive,
    "editorIndentGuide.activeBackground4": indentGuideActive,
    "editorIndentGuide.activeBackground5": indentGuideActive,
    "editorIndentGuide.activeBackground6": indentGuideActive,
    "editorRuler.foreground": indentGuide,
    "editorWhitespace.foreground": whitespace,
    "editorWordWrapIndicator.foreground": whitespace,

    // Brackets — each nesting level takes the next syntax hue (white, pink,
    // cyan, green, purple, orange, then around again), so a closing bracket is
    // matched to its opener by color. Pair guides show the level's hue dimmed,
    // and brighten for the pair around the caret. The matching pair under the
    // caret also gets a block.
    "editorBracketMatch.background": overlay(matchedBracket, 0.8),
    "editorBracketMatch.border": matchedBracketBorder,
    ...Object.fromEntries(
      bracketLevels.flatMap((color, i) => [
        [`editorBracketHighlight.foreground${i + 1}`, color],
        [
          `editorBracketPairGuide.background${i + 1}`,
          overlay(mix(color, editorBackground, 0.3), 0.6),
        ],
        [
          `editorBracketPairGuide.activeBackground${i + 1}`,
          overlay(mix(color, editorBackground, 0.7), 0.85),
        ],
      ]),
    ),
    "editorBracketHighlight.unexpectedBracket.foreground": synInvalid,

    // Folding
    "editor.foldBackground": foldedBackground + "40",
    "editor.foldPlaceholderForeground": foldedForeground,
    "editorGutter.foldingControlForeground": gray100,

    // Unused code — dimmed to ~53% of its normal color.
    "editorUnnecessaryCode.opacity": "#00000087",
    "editorUnnecessaryCode.border": transparent,

    // Inline hints, code lens, inline completions
    "editorInlayHint.background": inlayBackground,
    "editorInlayHint.foreground": inlayForeground,
    "editorInlayHint.typeBackground": inlayBackground,
    "editorInlayHint.typeForeground": inlayForeground,
    "editorInlayHint.parameterBackground": inlayBackground,
    "editorInlayHint.parameterForeground": inlayParameterForeground,
    "editorCodeLens.foreground": inlayTextForeground,
    "editorGhostText.foreground": ghostText,
    "editorGhostText.background": transparent,
    "editorGhostText.border": transparent,

    // Light bulbs — intention (yellow), quick fix (red), AI (lavender)
    "editorLightBulb.foreground": iconYellow,
    "editorLightBulbAutoFix.foreground": iconRed,
    "editorLightBulbAi.foreground": iconLavender,

    // Diagnostics — underline only, no line tint.
    "editorError.foreground": errorUnderline,
    "editorError.border": transparent,
    "editorError.background": transparent,
    "editorWarning.foreground": warningUnderline,
    "editorWarning.border": transparent,
    "editorWarning.background": transparent,
    "editorInfo.foreground": weakWarning,
    "editorInfo.border": transparent,
    "editorInfo.background": transparent,
    "editorHint.foreground": gray100,
    "editorHint.border": transparent,
    "problemsErrorIcon.foreground": iconRed,
    "problemsWarningIcon.foreground": iconYellow,
    "problemsInfoIcon.foreground": iconInfo,

    // Sticky scroll
    "editorStickyScroll.background": editorStickyBackground,
    "editorStickyScroll.border": gray30,
    "editorStickyScroll.shadow": shadow,
    "editorStickyScrollGutter.background": editorStickyBackground,
    "editorStickyScrollHover.background": wash10,

    // Gutter — change bars: added green, modified cyan, deleted rose; the
    // secondary quick-diff source (e.g. staged changes) in dimmer bars.
    "editorGutter.addedBackground": markAdded,
    "editorGutter.modifiedBackground": markModified,
    "editorGutter.deletedBackground": markRemoved,
    "editorGutter.addedSecondaryBackground": markAddedSecondary,
    "editorGutter.modifiedSecondaryBackground": markModifiedSecondary,
    "editorGutter.deletedSecondaryBackground": markRemovedSecondary,
    "editorGutter.commentRangeForeground": gray50,
    "editorGutter.commentGlyphForeground": gray120,
    "editorGutter.commentUnresolvedGlyphForeground": iconInfo,
    "editorGutter.commentDraftGlyphForeground": gray100,
    "editorGutter.itemBackground": gray40,
    "editorGutter.itemGlyphForeground": gray120,

    // Overview ruler — scrollbar marks
    "editorOverviewRuler.background": editorBackground,
    "editorOverviewRuler.border": transparent,
    "editorOverviewRuler.findMatchForeground": veil(findMark, markAlpha),
    "editorOverviewRuler.rangeHighlightForeground": veil(gray80, markAlpha),
    "editorOverviewRuler.selectionHighlightForeground": veil(wordReadMark, markAlpha),
    "editorOverviewRuler.wordHighlightForeground": veil(wordReadMark, markAlpha),
    "editorOverviewRuler.wordHighlightStrongForeground": veil(wordWriteMark, markAlpha),
    "editorOverviewRuler.wordHighlightTextForeground": veil(wordReadMark, markAlpha),
    "editorOverviewRuler.modifiedForeground": markModified,
    "editorOverviewRuler.addedForeground": markAdded,
    "editorOverviewRuler.deletedForeground": markRemoved,
    "editorOverviewRuler.errorForeground": errorMark,
    "editorOverviewRuler.warningForeground": warningMark,
    "editorOverviewRuler.infoForeground": weakWarning,
    "editorOverviewRuler.bracketMatchForeground": gray80,
    "editorOverviewRuler.currentContentForeground": markModified,
    "editorOverviewRuler.incomingContentForeground": markAdded,
    "editorOverviewRuler.commonContentForeground": markRemoved,
    "editorOverviewRuler.commentForeground": gray80,
    "editorOverviewRuler.commentUnresolvedForeground": iconInfo,
    "editorOverviewRuler.commentDraftForeground": gray100,
    "editorOverviewRuler.inlineChatInserted": markAdded,
    "editorOverviewRuler.inlineChatRemoved": markRemoved,
    "editorOverviewRuler.agentFeedbackForeground": iconInfo,

    // Minimap
    "minimap.background": editorBackground,
    "minimap.foregroundOpacity": "#000000CC",
    "minimap.findMatchHighlight": veil(findMark, markAlpha),
    "minimap.selectionHighlight": veil(selection, markAlpha),
    "minimap.selectionOccurrenceHighlight": veil(wordReadMark, markAlpha),
    "minimap.errorHighlight": errorMark,
    "minimap.warningHighlight": warningMark,
    "minimap.infoHighlight": weakWarning,
    "minimap.chatEditHighlight": aiPurple + "66",
    "minimapGutter.addedBackground": markAdded,
    "minimapGutter.modifiedBackground": markModified,
    "minimapGutter.deletedBackground": markRemoved,
    "minimapSlider.background": minimapThumb,
    "minimapSlider.hoverBackground": scrollbarThumb,
    "minimapSlider.activeBackground": scrollbarThumbHover,
    "editorMinimap.inlineChatInserted": markAdded,

    // ── Editor widgets ──
    // Find / replace and other in-editor widgets use the inline surface; hover
    // docs and completion use the editor-popup surface.
    "editorWidget.background": gray20,
    "editorWidget.foreground": gray130,
    "editorWidget.border": popupBorder,
    "editorWidget.resizeBorder": accent80,
    "editorHoverWidget.background": popupEditorBackground,
    "editorHoverWidget.foreground": gray130,
    "editorHoverWidget.border": popupBorder,
    "editorHoverWidget.statusBarBackground": gray30,
    "editorHoverWidget.highlightForeground": white, // active parameter in signature help
    "editorSuggestWidget.background": popupEditorBackground,
    "editorSuggestWidget.foreground": editorForeground,
    "editorSuggestWidget.border": popupBorder,
    "editorSuggestWidget.selectedBackground": accent50,
    "editorSuggestWidget.selectedForeground": gray130,
    "editorSuggestWidget.selectedIconForeground": gray120,
    "editorSuggestWidget.highlightForeground": matchCyan,
    "editorSuggestWidget.focusHighlightForeground": yellow110,
    "editorSuggestWidget.focusOutline": transparent,
    "editorSuggestWidgetStatus.foreground": gray100,
    "editorActionList.background": gray30,
    "editorActionList.foreground": gray130,
    "editorActionList.focusBackground": accent50,
    "editorActionList.focusForeground": gray130,

    // Error / warning navigation (F8)
    "editorMarkerNavigation.background": gray20,
    "editorMarkerNavigationError.background": red80,
    "editorMarkerNavigationError.headerBackground": red40,
    "editorMarkerNavigationWarning.background": yellow80,
    "editorMarkerNavigationWarning.headerBackground": yellow40,
    "editorMarkerNavigationInfo.background": cyan80,
    "editorMarkerNavigationInfo.headerBackground": cyan40,

    // Peek view — embedded editor on the inline surface, results on the popup
    // surface; usages are marked green.
    "peekView.border": popupBorder,
    "peekViewEditor.background": gray20,
    "peekViewEditorGutter.background": gray20,
    "peekViewEditorStickyScroll.background": gray20,
    "peekViewEditorStickyScrollGutter.background": gray20,
    "peekViewEditor.matchHighlightBackground": overlay(usage, 0.8, gray20),
    "peekViewEditor.matchHighlightBorder": transparent,
    "peekViewResult.background": gray30,
    "peekViewResult.fileForeground": gray130,
    "peekViewResult.lineForeground": gray100,
    "peekViewResult.matchHighlightBackground": overlay(usage, 0.8, gray30),
    "peekViewResult.selectionBackground": accent50,
    "peekViewResult.selectionForeground": gray130,
    "peekViewTitle.background": gray30,
    "peekViewTitleLabel.foreground": gray130,
    "peekViewTitleDescription.foreground": gray100,

    // ── Diff editor ──
    // Inserted = green, removed = red: a faint tint on changed lines, a deeper
    // shade on changed words (and on wholly added / removed blocks). The
    // line-number margin of a changed line takes the word shade, so changed
    // lines stay easy to scan under their faint tint.
    "diffEditor.insertedLineBackground": layer(addedLine),
    "diffEditor.removedLineBackground": layer(removedLine),
    "diffEditor.insertedTextBackground": layer(addedWord, addedLine),
    "diffEditor.removedTextBackground": layer(removedWord, removedLine),
    "diffEditor.insertedTextBorder": transparent,
    "diffEditor.removedTextBorder": transparent,
    "diffEditorGutter.insertedLineBackground": layer(addedWord),
    "diffEditorGutter.removedLineBackground": layer(removedWord),
    "diffEditorOverview.insertedForeground": markAdded,
    "diffEditorOverview.removedForeground": markRemoved,
    "diffEditor.border": gray30,
    "diffEditor.diagonalFill": gray40 + "80",
    "diffEditor.unchangedRegionBackground": blockBackground,
    "diffEditor.unchangedRegionForeground": gray100,
    "diffEditor.unchangedRegionShadow": shadow,
    "diffEditor.unchangedCodeBackground": layer(unchangedCode),
    // Moved code: neutral outline; the move under the caret in the modified
    // hue.
    "diffEditor.move.border": gray80 + "9C",
    "diffEditor.moveActive.border": markModified,
    "multiDiffEditor.background": editorBackground,
    "multiDiffEditor.headerBackground": gray20,
    "multiDiffEditor.border": gray30,

    // ── Merge conflicts ──
    // Inline conflict blocks: current (ours) cyan, incoming (theirs) green,
    // common ancestor red — a soft tint on the content, a deeper shade on the
    // marker line.
    "merge.currentHeaderBackground": layer(currentMarker),
    "merge.currentContentBackground": layer(currentBlock),
    "merge.incomingHeaderBackground": layer(incomingMarker),
    "merge.incomingContentBackground": layer(incomingBlock),
    "merge.commonHeaderBackground": layer(commonMarker),
    "merge.commonContentBackground": layer(commonBlock),
    "merge.border": transparent,
    // Merge editor: each input is a diff against the base — the changes in an
    // input (and in the result) are green, the replaced base code red.
    // Unresolved conflicts are outlined in orange, resolved ones in gray.
    "mergeEditor.change.background": layer(addedLine),
    "mergeEditor.change.word.background": layer(addedWord, addedLine),
    "mergeEditor.changeBase.background": layer(removedLine),
    "mergeEditor.changeBase.word.background": layer(removedWord, removedLine),
    // Input 1 is "Incoming" and input 2 "Current" in a git merge.
    "mergeEditor.conflict.input1.background": layer(incomingBlock),
    "mergeEditor.conflict.input2.background": layer(currentBlock),
    "mergeEditor.conflictingLines.background": layer(conflictLabel),
    "mergeEditor.conflict.unhandledUnfocused.border": markConflictUnfocused,
    "mergeEditor.conflict.unhandledFocused.border": markConflict,
    "mergeEditor.conflict.handledUnfocused.border": gray50,
    "mergeEditor.conflict.handledFocused.border": gray80,
    "mergeEditor.conflict.unhandled.minimapOverViewRuler": markConflict,
    "mergeEditor.conflict.handled.minimapOverViewRuler": gray80,

    // ── Source control ──
    // One color per state: untracked green, modified cyan, renamed purple,
    // deleted rose, conflicts pink, submodules orange; staged changes take
    // the lighter variant of their unstaged hue; ignored files recede.
    "gitDecoration.addedResourceForeground": fileStagedAdded,
    "gitDecoration.modifiedResourceForeground": fileModified,
    "gitDecoration.deletedResourceForeground": fileStateDeleted,
    "gitDecoration.renamedResourceForeground": fileRenamed,
    "gitDecoration.untrackedResourceForeground": fileUntracked,
    "gitDecoration.ignoredResourceForeground": fileIgnored,
    "gitDecoration.conflictingResourceForeground": fileConflict,
    "gitDecoration.submoduleResourceForeground": fileSubmodule,
    "gitDecoration.stageModifiedResourceForeground": fileStagedModified,
    "gitDecoration.stageDeletedResourceForeground": fileStagedDeleted,
    "git.blame.editorDecorationForeground": blameText,
    // History graph — lanes on the syntax hues; refs: local branch green,
    // remote purple, base ref yellow.
    "scmGraph.foreground1": synParameter,
    "scmGraph.foreground2": green100,
    "scmGraph.foreground3": purple100,
    "scmGraph.foreground4": pink100,
    "scmGraph.foreground5": cyan100,
    "scmGraph.historyItemRefColor": branchLocal,
    "scmGraph.historyItemRemoteRefColor": branchRemote,
    "scmGraph.historyItemBaseRefColor": branchHead,
    "scmGraph.historyItemHoverDefaultLabelBackground": accent90,
    "scmGraph.historyItemHoverDefaultLabelForeground": gray10,
    "scmGraph.historyItemHoverLabelForeground": gray10,
    "scmGraph.historyItemHoverAdditionsForeground": fileAdded,
    "scmGraph.historyItemHoverDeletionsForeground": red100,

    // ── Quick input / command palette ──
    "quickInput.background": gray30,
    "quickInput.foreground": gray130,
    "quickInputTitle.background": gray30,
    "quickInputList.focusBackground": accent50,
    "quickInputList.focusForeground": gray130,
    "quickInputList.focusIconForeground": gray120,
    "quickInputList.focusHighlightForeground": yellow110,
    "pickerGroup.border": gray40,
    "pickerGroup.foreground": gray100,

    // ── Menus ──
    "menu.background": gray30,
    "menu.foreground": gray130,
    "menu.border": popupBorder,
    "menu.selectionBackground": accent50,
    "menu.selectionForeground": gray130,
    "menu.selectionBorder": transparent,
    "menu.separatorBackground": gray40,

    // ── Lists / trees ──
    // Selection keeps the normal text color; keyboard focus without selection
    // gets the muted accent. Matched characters are cyan (yellow on the focused
    // row) here, in quick input and in the completion list.
    "list.activeSelectionBackground": accent50,
    "list.activeSelectionForeground": gray130,
    "list.activeSelectionIconForeground": gray120,
    "list.inactiveSelectionBackground": gray40,
    "list.inactiveSelectionForeground": gray130,
    "list.inactiveSelectionIconForeground": gray120,
    "list.hoverBackground": wash10,
    "list.hoverForeground": gray130,
    "list.focusBackground": accent40,
    "list.focusForeground": gray130,
    "list.focusOutline": transparent,
    "list.focusAndSelectionOutline": transparent,
    "list.inactiveFocusBackground": transparent,
    "list.inactiveFocusOutline": transparent,
    "list.highlightForeground": matchCyan,
    "list.focusHighlightForeground": yellow110,
    "list.filterMatchBackground": matchCyan + "40",
    "list.filterMatchBorder": matchCyan,
    "list.dropBackground": accentVivid + "26",
    "list.dropBetweenBackground": accent80,
    // Files with problems take their problem colors: errors in the error-text
    // red, warnings yellow, unresolvable items coral.
    "list.errorForeground": fileError,
    "list.warningForeground": fileWarning,
    "list.invalidItemForeground": fileInvalid,
    "list.deemphasizedForeground": gray100,
    "listFilterWidget.background": gray10,
    "listFilterWidget.outline": gray70,
    "listFilterWidget.noMatchesOutline": red80,
    "listFilterWidget.shadow": shadow,
    "tree.indentGuidesStroke": gray50,
    "tree.inactiveIndentGuidesStroke": gray40,
    "tree.tableColumnsBorder": gray30,
    "tree.tableOddRowsBackground": gray20,

    // ── Inputs ──
    // Outlined fields on the surface they sit on.
    "input.background": gray10,
    "input.foreground": bodyText,
    "input.border": gray70,
    "input.placeholderForeground": gray80,
    "inputOption.activeBackground": accent60,
    "inputOption.activeBorder": accent60,
    "inputOption.activeForeground": white,
    "inputOption.hoverBackground": wash20,
    "inputValidation.errorBackground": red40,
    "inputValidation.errorBorder": red60,
    "inputValidation.errorForeground": gray130,
    "inputValidation.warningBackground": yellow40,
    "inputValidation.warningBorder": yellow60,
    "inputValidation.warningForeground": gray130,
    "inputValidation.infoBackground": cyan40,
    "inputValidation.infoBorder": cyan60,
    "inputValidation.infoForeground": gray130,
    "dropdown.background": gray30,
    "dropdown.foreground": gray130,
    "dropdown.border": gray70,
    "dropdown.listBackground": gray30,

    // ── Buttons and toggles ──
    "button.background": accent80,
    "button.foreground": white,
    "button.border": accent80,
    "button.hoverBackground": accent70,
    "button.separator": wash50,
    "button.secondaryBackground": transparent,
    "button.secondaryForeground": gray130,
    "button.secondaryBorder": gray70,
    "button.secondaryHoverBackground": wash20,
    "checkbox.background": checkFill,
    "checkbox.foreground": gray130,
    "checkbox.border": checkBorder,
    "checkbox.selectBackground": checkFill,
    "checkbox.selectBorder": checkSelected,
    "checkbox.disabled.background": checkDisabledFill,
    "checkbox.disabled.foreground": checkDisabledMark,
    "radio.activeBackground": accent60,
    "radio.activeForeground": white,
    "radio.activeBorder": accent60,
    "radio.inactiveBackground": transparent,
    "radio.inactiveForeground": gray130,
    "radio.inactiveBorder": gray70,
    "radio.inactiveHoverBackground": wash20,

    // ── Badges ──
    // Counters are neutral gray with dark digits; notification-style badges
    // are light violet with dark digits.
    "badge.background": gray80,
    "badge.foreground": black,
    "profileBadge.background": gray80,
    "profileBadge.foreground": black,
    "extensionBadge.remoteBackground": accent90,
    "extensionBadge.remoteForeground": gray10,

    // ── Keybindings ──
    "keybindingLabel.background": transparent,
    "keybindingLabel.foreground": gray100,
    "keybindingLabel.border": wash50,
    "keybindingLabel.bottomBorder": wash50,
    "keybindingTable.headerBackground": gray30,
    "keybindingTable.rowsBackground": gray20,

    // ── Settings editor ──
    "settings.headerForeground": gray130,
    "settings.settingsHeaderHoverForeground": gray150,
    "settings.modifiedItemIndicator": accent100,
    "settings.headerBorder": gray30,
    "settings.sashBorder": gray30,
    "settings.dropdownBackground": gray30,
    "settings.dropdownForeground": gray130,
    "settings.dropdownBorder": gray70,
    "settings.dropdownListBorder": gray40,
    "settings.checkboxBackground": checkFill,
    "settings.checkboxForeground": gray130,
    "settings.checkboxBorder": checkBorder,
    "settings.textInputBackground": gray10,
    "settings.textInputForeground": bodyText,
    "settings.textInputBorder": gray70,
    "settings.numberInputBackground": gray10,
    "settings.numberInputForeground": bodyText,
    "settings.numberInputBorder": gray70,
    "settings.focusedRowBackground": wash20,
    "settings.focusedRowBorder": focusRing,
    "settings.rowHoverBackground": wash10,
    "profiles.sashBorder": gray30,
    "simpleFindWidget.sashBorder": gray30,

    // ── Breadcrumbs ──
    "breadcrumb.background": editorBackground,
    "breadcrumb.foreground": breadcrumbForeground,
    "breadcrumb.focusForeground": breadcrumbActive,
    "breadcrumb.activeSelectionForeground": breadcrumbActive,
    "breadcrumbPicker.background": gray30,

    // ── Notifications and banners ──
    "notifications.background": gray40,
    "notifications.foreground": gray130,
    "notifications.border": gray40,
    "notificationLink.foreground": hyperlink,
    "notificationCenter.border": popupBorder,
    "notificationCenterHeader.background": gray40,
    "notificationCenterHeader.foreground": gray130,
    "notificationToast.border": popupBorder,
    "notificationsErrorIcon.foreground": iconRed,
    "notificationsWarningIcon.foreground": iconYellow,
    "notificationsInfoIcon.foreground": iconInfo,
    "banner.background": cyan40,
    "banner.foreground": gray130,
    "banner.iconForeground": iconInfo,

    // ── Extensions ──
    "extensionButton.background": accent80,
    "extensionButton.foreground": white,
    "extensionButton.border": accent80,
    "extensionButton.hoverBackground": accent70,
    "extensionButton.separator": wash50,
    "extensionButton.prominentBackground": accent80,
    "extensionButton.prominentForeground": white,
    "extensionButton.prominentHoverBackground": accent70,
    "extensionIcon.starForeground": iconYellow,
    "extensionIcon.verifiedForeground": iconInfo,
    "extensionIcon.preReleaseForeground": iconPink,
    "extensionIcon.sponsorForeground": red100,
    "extensionIcon.privateForeground": gray80,
    "mcpIcon.starForeground": iconYellow,

    // ── Terminal ──
    // Terminals use the panel surface wherever they open (panel, side bar or
    // editor tab), so the sticky header can be tuned to a single background.
    "terminal.background": gray20,
    "terminal.foreground": editorForeground,
    "terminal.border": gray30,
    "terminal.tab.activeBorder": accent80,
    "terminal.dropBackground": dropTarget,
    "terminal.initialHintForeground": gray80,
    "terminal.selectionBackground": selection,
    "terminal.inactiveSelectionBackground": overlay(selectionInactive, 0.8),
    "terminal.hoverHighlightBackground": wash10,
    // Find — as in the editor: the current match is a yellow block in a solid
    // yellow box, the others cyan blocks in cyan boxes. Fills sit under the text.
    "terminal.findMatchBackground": overlay(findCurrent, 0.8),
    "terminal.findMatchBorder": findCurrentBorder,
    "terminal.findMatchHighlightBackground": overlay(findOther, highlightAlpha),
    "terminal.findMatchHighlightBorder": findOtherBorder,
    "terminalCursor.foreground": caret,
    "terminalCursor.background": editorBackground,
    "terminalCommandDecoration.defaultBackground": gray80,
    "terminalCommandDecoration.successBackground": iconGreen,
    "terminalCommandDecoration.errorBackground": iconRed,
    "terminalCommandGuide.foreground": terminalSelectedBlock,
    "terminalOverviewRuler.cursorForeground": gray100,
    "terminalOverviewRuler.findMatchForeground": findMark,
    "terminalOverviewRuler.border": transparent,
    "terminalStickyScroll.background": terminalStickyBackground,
    "terminalStickyScroll.border": terminalBlockSeparator,
    "terminalStickyScrollHover.background": wash05,
    "terminal.ansiBlack": terminalAnsi.black,
    "terminal.ansiRed": terminalAnsi.red,
    "terminal.ansiGreen": terminalAnsi.green,
    "terminal.ansiYellow": terminalAnsi.yellow,
    "terminal.ansiBlue": terminalAnsi.blue,
    "terminal.ansiMagenta": terminalAnsi.magenta,
    "terminal.ansiCyan": terminalAnsi.cyan,
    "terminal.ansiWhite": terminalAnsi.white,
    "terminal.ansiBrightBlack": terminalAnsi.brightBlack,
    "terminal.ansiBrightRed": terminalAnsi.brightRed,
    "terminal.ansiBrightGreen": terminalAnsi.brightGreen,
    "terminal.ansiBrightYellow": terminalAnsi.brightYellow,
    "terminal.ansiBrightBlue": terminalAnsi.brightBlue,
    "terminal.ansiBrightMagenta": terminalAnsi.brightMagenta,
    "terminal.ansiBrightCyan": terminalAnsi.brightCyan,
    "terminal.ansiBrightWhite": terminalAnsi.brightWhite,
    // Terminal suggest widget icons — same families as the symbol icons.
    "terminalSymbolIcon.aliasForeground": iconLavender,
    "terminalSymbolIcon.argumentForeground": iconLavender,
    "terminalSymbolIcon.branchForeground": branchLocal,
    "terminalSymbolIcon.commitForeground": gray120,
    "terminalSymbolIcon.fileForeground": gray120,
    "terminalSymbolIcon.folderForeground": gray120,
    "terminalSymbolIcon.flagForeground": iconPurple,
    "terminalSymbolIcon.inlineSuggestionForeground": ghostText,
    "terminalSymbolIcon.methodForeground": iconGreen,
    "terminalSymbolIcon.optionForeground": iconPurple,
    "terminalSymbolIcon.optionValueForeground": iconPurple,
    "terminalSymbolIcon.pullRequestForeground": iconGreen,
    "terminalSymbolIcon.pullRequestDoneForeground": iconPurple,
    "terminalSymbolIcon.remoteForeground": branchRemote,
    "terminalSymbolIcon.stashForeground": gray120,
    "terminalSymbolIcon.symbolText": gray120,
    "terminalSymbolIcon.symbolicLinkFileForeground": gray120,
    "terminalSymbolIcon.symbolicLinkFolderForeground": gray120,
    "terminalSymbolIcon.tagForeground": branchTag,

    // ── Debug ──
    "debugToolBar.background": gray40,
    "debugToolBar.border": gray40,
    "debugExceptionWidget.background": red40,
    "debugExceptionWidget.border": red60,
    "editor.stackFrameHighlightBackground": overlay(executionLine, 0.8),
    "editor.focusedStackFrameHighlightBackground": overlay(otherFrameLine, 0.8),
    "editor.inlineValuesForeground": inlineValue,
    "editor.inlineValuesBackground": transparent,
    "debugConsole.infoForeground": editorForeground,
    "debugConsole.warningForeground": yellow100,
    "debugConsole.errorForeground": red100,
    "debugConsole.sourceForeground": hyperlink,
    "debugConsoleInputIcon.foreground": iconInfo,
    "debugView.exceptionLabelBackground": red40,
    "debugView.exceptionLabelForeground": gray130,
    "debugView.stateLabelBackground": wash40,
    "debugView.stateLabelForeground": whiteMuted,
    "debugView.valueChangedHighlight": debugChanged,
    "debugTokenExpression.name": editorForeground,
    "debugTokenExpression.value": debugValue,
    "debugTokenExpression.string": synString,
    "debugTokenExpression.boolean": synConstant,
    "debugTokenExpression.number": synConstant,
    "debugTokenExpression.type": debugType,
    "debugTokenExpression.error": red100,
    "debugIcon.breakpointForeground": iconRed,
    "debugIcon.breakpointDisabledForeground": iconRed + "80",
    "debugIcon.breakpointUnverifiedForeground": gray120,
    "debugIcon.breakpointCurrentStackframeForeground": iconYellow,
    "debugIcon.breakpointStackframeForeground": gray120,
    "debugIcon.startForeground": iconGreen,
    "debugIcon.continueForeground": iconGreen,
    "debugIcon.restartForeground": iconGreen,
    "debugIcon.pauseForeground": gray120,
    "debugIcon.stopForeground": iconRed,
    "debugIcon.disconnectForeground": iconRed,
    "debugIcon.stepOverForeground": gray120,
    "debugIcon.stepIntoForeground": gray120,
    "debugIcon.stepOutForeground": gray120,
    "debugIcon.stepBackForeground": gray120,
    "ports.iconRunningProcessForeground": iconGreen,

    // ── Testing ──
    // Failed assertions are yellow, errors red, skipped / queued neutral.
    "testing.iconPassed": iconGreen,
    "testing.iconFailed": iconYellow,
    "testing.iconErrored": iconRed,
    "testing.iconSkipped": gray120,
    "testing.iconQueued": gray120,
    "testing.iconUnset": gray120,
    "testing.iconPassed.retired": iconGreen + "80",
    "testing.iconFailed.retired": iconYellow + "80",
    "testing.iconErrored.retired": iconRed + "80",
    "testing.iconSkipped.retired": gray120 + "80",
    "testing.iconQueued.retired": gray120 + "80",
    "testing.iconUnset.retired": gray120 + "80",
    "testing.runAction": iconGreen,
    "testing.peekBorder": iconRed,
    "testing.peekHeaderBackground": red40,
    "testing.messagePeekBorder": iconInfo,
    "testing.messagePeekHeaderBackground": cyan40,
    "testing.message.error.lineBackground": overlay(errorHint, 0.8),
    "testing.message.error.badgeBackground": red80,
    "testing.message.error.badgeBorder": red80,
    "testing.message.error.badgeForeground": white,
    "testing.message.info.decorationForeground": gray100,
    "testing.message.info.lineBackground": transparent,
    "testing.coverCountBadgeBackground": gray80,
    "testing.coverCountBadgeForeground": black,
    // Coverage — full green, partial olive, none red.
    "testing.coveredBackground": coverageFull + "40",
    "testing.coveredBorder": coverageFull,
    "testing.coveredGutterBackground": coverageFull,
    "testing.coveredMinimapBackground": coverageFull,
    "testing.uncoveredBranchBackground": coveragePartial + "40",
    "testing.uncoveredBackground": coverageNone + "40",
    "testing.uncoveredBorder": coverageNone,
    "testing.uncoveredGutterBackground": coverageNone,
    "testing.uncoveredMinimapBackground": coverageNone,

    // ── Notebooks ──
    "notebook.editorBackground": editorBackground,
    "notebook.cellEditorBackground": gray20,
    "notebook.cellBorderColor": gray40,
    "notebook.cellHoverBackground": wash10,
    "notebook.focusedCellBackground": transparent,
    "notebook.focusedCellBorder": focusRing,
    "notebook.focusedEditorBorder": focusRing,
    "notebook.inactiveFocusedCellBorder": gray50,
    "notebook.selectedCellBackground": transparent,
    "notebook.selectedCellBorder": gray50,
    "notebook.inactiveSelectedCellBorder": gray50,
    "notebook.symbolHighlightBackground": wash10,
    "notebook.cellInsertionIndicator": accent80,
    "notebook.cellStatusBarItemHoverBackground": wash20,
    "notebook.cellToolbarSeparator": gray40,
    "notebook.outputContainerBackgroundColor": editorBackground,
    "notebook.outputContainerBorderColor": gray30,
    "notebookStatusSuccessIcon.foreground": iconGreen,
    "notebookStatusErrorIcon.foreground": iconRed,
    "notebookStatusRunningIcon.foreground": iconInfo,
    "notebookEditorOverviewRuler.runningCellForeground": iconInfo,
    "notebookScrollbarSlider.background": scrollbarThumb,
    "notebookScrollbarSlider.hoverBackground": scrollbarThumbHover,
    "notebookScrollbarSlider.activeBackground": scrollbarThumbHover,
    "interactive.activeCodeBorder": focusRing,
    "interactive.inactiveCodeBorder": gray50,

    // ── Welcome / walkthrough ──
    "welcomePage.background": editorBackground,
    "welcomePage.tileBackground": gray20,
    "welcomePage.tileHoverBackground": gray30,
    "welcomePage.tileBorder": gray30,
    "welcomePage.progress.background": gray50,
    "welcomePage.progress.foreground": accent80,
    "walkThrough.embeddedEditorBackground": gray20,
    "walkthrough.stepTitle.foreground": gray130,

    // ── Comments (code review) ──
    "editorCommentsWidget.rangeBackground": iconInfo + "1A",
    "editorCommentsWidget.rangeActiveBackground": iconInfo + "33",
    "editorCommentsWidget.resolvedBorder": gray80,
    "editorCommentsWidget.unresolvedBorder": iconInfo,
    "editorCommentsWidget.replyInputBackground": gray30,
    "commentsView.resolvedIcon": gray80,
    "commentsView.unresolvedIcon": iconInfo,

    // ── Markdown alerts ──
    "markdownAlert.note.foreground": iconInfo,
    "markdownAlert.tip.foreground": iconGreen,
    "markdownAlert.important.foreground": iconLavender,
    "markdownAlert.warning.foreground": iconYellow,
    "markdownAlert.caution.foreground": iconRed,

    // ── Charts ──
    "charts.foreground": gray130,
    "charts.lines": gray40,
    "charts.red": iconRed,
    "charts.blue": iconCyan,
    "charts.yellow": iconYellow,
    "charts.orange": synParameter,
    "charts.green": iconGreen,
    "charts.purple": iconPurple,
    "confetti.color1": iconRed,
    "confetti.color2": iconPink,
    "confetti.color3": iconYellow,
    "confetti.color4": iconGreen,
    "confetti.color5": iconCyan,
    "confetti.color6": iconPurple,
    "chart.line": accentVivid,
    "chart.axis": gray80,
    "chart.guide": gray40,

    // ── Symbol icons (outline, breadcrumbs, suggest) ──
    // Kinds that are colored in code take that hue: types cyan, callables
    // green, constants and literals purple, keywords / operators / events pink,
    // strings yellow. Fields, variables, properties and keys are plain text
    // in code, so their icons get lavender; containers and text stay neutral.
    "symbolIcon.classForeground": iconCyan,
    "symbolIcon.structForeground": iconCyan,
    "symbolIcon.objectForeground": iconCyan,
    "symbolIcon.interfaceForeground": iconCyan,
    "symbolIcon.typeParameterForeground": iconCyan,
    "symbolIcon.enumeratorForeground": iconCyan,
    "symbolIcon.enumeratorMemberForeground": iconPurple,
    "symbolIcon.methodForeground": iconGreen,
    "symbolIcon.functionForeground": iconGreen,
    "symbolIcon.constructorForeground": iconGreen,
    "symbolIcon.fieldForeground": iconLavender,
    "symbolIcon.variableForeground": iconLavender,
    "symbolIcon.arrayForeground": iconLavender,
    "symbolIcon.propertyForeground": iconLavender,
    "symbolIcon.keyForeground": iconLavender,
    "symbolIcon.constantForeground": iconPurple,
    "symbolIcon.booleanForeground": iconPurple,
    "symbolIcon.numberForeground": iconPurple,
    "symbolIcon.nullForeground": iconPurple,
    "symbolIcon.unitForeground": iconPurple,
    "symbolIcon.eventForeground": iconPink,
    "symbolIcon.keywordForeground": iconPink,
    "symbolIcon.operatorForeground": iconPink,
    "symbolIcon.stringForeground": iconYellow,
    "symbolIcon.fileForeground": gray120,
    "symbolIcon.folderForeground": gray120,
    "symbolIcon.moduleForeground": gray120,
    "symbolIcon.namespaceForeground": gray120,
    "symbolIcon.packageForeground": gray120,
    "symbolIcon.referenceForeground": gray120,
    "symbolIcon.snippetForeground": gray120,
    "symbolIcon.textForeground": gray120,
    "symbolIcon.colorForeground": gray120,

    // ── Inline chat ──
    // AI surfaces are tinted purple.
    "inlineChat.background": purple20,
    "inlineChat.foreground": bodyText,
    "inlineChat.border": purple50,
    "inlineChat.shadow": shadow,
    "inlineChatInput.background": gray10,
    "inlineChatInput.border": purple50,
    "inlineChatInput.focusBorder": aiPurple,
    "inlineChatInput.placeholderForeground": gray80,
    "inlineChatDiff.inserted": layer(addedLine),
    "inlineChatDiff.removed": layer(removedLine),

    // ── Inline edits (next edit suggestions) ──
    "inlineEdit.gutterIndicator.background": gray30,
    "inlineEdit.gutterIndicator.primaryBackground": accent80 + "66",
    "inlineEdit.gutterIndicator.primaryBorder": accent80,
    "inlineEdit.gutterIndicator.primaryForeground": white,
    "inlineEdit.gutterIndicator.secondaryBackground": popupEditorBackground,
    "inlineEdit.gutterIndicator.secondaryBorder": gray40,
    "inlineEdit.gutterIndicator.secondaryForeground": gray130,
    "inlineEdit.gutterIndicator.successfulBackground": green80,
    "inlineEdit.gutterIndicator.successfulBorder": green80,
    "inlineEdit.gutterIndicator.successfulForeground": white,
    // Suggested code is green, the code it replaces red — the diff editor's
    // line tints and word shades. The preview boxes take half a line tint
    // (changed lines inside them add the rest) and a bar-colored outline.
    "inlineEdit.modifiedBackground": layer(
      mix(addedLine, editorBackground, 0.5),
    ),
    "inlineEdit.modifiedBorder": markAdded,
    "inlineEdit.modifiedChangedLineBackground": layer(addedLine),
    "inlineEdit.modifiedChangedTextBackground": layer(addedWord, addedLine),
    "inlineEdit.originalBackground": layer(
      mix(removedLine, editorBackground, 0.5),
    ),
    "inlineEdit.originalBorder": markRemoved,
    "inlineEdit.originalChangedLineBackground": layer(removedLine),
    "inlineEdit.originalChangedTextBackground": layer(removedWord, removedLine),
    "inlineEdit.tabWillAcceptModifiedBorder": markAdded,
    "inlineEdit.tabWillAcceptOriginalBorder": markRemoved,

    // ── Chat ──
    // User requests sit in a gray bubble; AI progress and slash commands use
    // the purple accent.
    "chat.requestBackground": gray20,
    "chat.requestBorder": gray30,
    "chat.requestBubbleBackground": veil(gray40, markAlpha, gray20),
    "chat.requestBubbleHoverBackground": veil(gray50, markAlpha, gray20),
    "chat.requestCodeBorder": veil(gray30, markAlpha, gray40),
    "chat.slashCommandBackground": purple70 + "B3",
    "chat.slashCommandForeground": purple140,
    "chat.avatarBackground": gray40,
    "chat.avatarForeground": gray130,
    "chat.checkpointSeparator": gray50,
    "chat.statusBackground": wash10,
    "chat.thinkingShimmer": purple140,
    "chat.inputWorkingBorderColor1": aiPurple,
    "chat.voiceGlowBaseColor": veil(aiPurple, markAlpha, gray20),
    "chat.voiceListeningGlow": veil(aiPurple, markAlpha, gray20),
    "chat.dictationActiveMicGlow": aiPurple,
    // Model-comparison badge: a cyan-to-purple gradient.
    "chat.fusionBadgeGradientStart": cyan,
    "chat.fusionBadgeGradientEnd": purple,
    "chat.editedFileForeground": fileChatEdited,
    "chat.linesAddedForeground": veil(fileAdded, markAlpha, gray20),
    "chat.linesRemovedForeground": veil(red100, markAlpha, gray20),
    "chat.findMatchBackground": overlay(findCurrent, 0.8),
    "chat.findMatchHighlightBackground": overlay(findOther, highlightAlpha),
    "chat.sessionStateIndicator.inProgressBorder": iconYellow,
    "chat.sessionStateIndicator.needsInputBorder": iconRed,
    "chat.sessionStateIndicator.unvisitedBorder": iconGreen,
    "chat.mcpCompatibilityWarningForeground": yellow100,
    "chat.workingProgressStableIconForeground": iconInfo,
    "chat.workingProgressInsidersIconForeground": iconGreen,
    "agentStatusIndicator.background": wash10,

    // ── Agents window ──
    // Same model as the workbench: panels on a frame.
    "agents.background": gray30,
    "agentsPanel.background": gray10,
    "agentsPanel.foreground": bodyText,
    "agentsPanel.border": uiOutline,
    "agentsCard.border": uiOutline,
    "agentsBottomPanel.border": uiOutline,
    "agentsDetail.background": editorBackground,
    "activeSessionView.background": gray10,
    "activeSessionView.foreground": bodyText,
    "inactiveSessionView.background": gray30,
    "inactiveSessionView.foreground": gray100,
    "agentsGradient.tintColor": shellTint,
    "agentsChatInput.background": gray10,
    "agentsChatInput.foreground": bodyText,
    "agentsChatInput.border": gray70,
    "agentsChatInput.focusBorder": focusRing,
    "agentsChatInput.placeholderForeground": gray80,
    "agentsNewSessionButton.background": transparent,
    "agentsNewSessionButton.foreground": gray130,
    "agentsNewSessionButton.border": gray70,
    "agentsNewSessionButton.hoverBackground": wash20,
    "agentsBadge.background": accent90,
    "agentsBadge.foreground": gray10,
    "agentsUnreadBadge.background": accent90,
    "agentsUnreadBadge.foreground": gray10,
    "agentsUpdateButton.downloadedBackground": accent80 + "B3",
    "agentsUpdateButton.downloadingBackground": accent80 + "66",
    "agentSessionReadIndicator.foreground": gray60,
    "agentSessionSelectedBadge.border": wash50,
    "agentSessionSelectedUnfocusedBadge.border": wash30,
    "agentFeedbackEditorWidget.background": gray30,
    "agentFeedbackEditorWidget.border": gray40,
    "agentFeedbackInputWidget.border": gray40,
    "agentsMobileDiff.addedForeground": fileAdded,
    "agentsMobileDiff.modifiedForeground": fileModified,
    "agentsMobileDiff.deletedForeground": fileDeleted,
    "agentsVoice.speakingForeground": iconLavender,
    "agentsVoice.speakingBackground": iconLavender + "14",
    "agentsWindowGraphic.orange": orange, // welcome-page illustration accent
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Syntax highlighting — shared rules (src/syntax.ts), this theme's palette
  // ───────────────────────────────────────────────────────────────────────────
  semanticHighlighting: true,
  semanticTokenColors: semanticTokenColors(syntaxPalette),
  tokenColors: tokenColors(syntaxPalette),
};

export default theme;
