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
// Syntax model: seven hues plus the comment slate, each with a single job, and
// no bold or italic on code tokens (prose emphasis in markdown keeps its style).
//   pink   → keywords, storage, operators, tags, escapes; key / value and
//            namespace separators; interpolation delimiters; string prefixes
//   green  → functions and methods (declarations and calls), decorators,
//            markup attribute names, CSS selectors
//   cyan   → types, classes, interfaces, built-in types; keys in data files,
//            CSS property names; regexp character classes
//   yellow → strings
//   purple → numbers, booleans, null, language constants, this / self
//   orange → parameters, markdown bold, regexp groups
//   red    → regular expressions, invalid code
//   slate  → comments and docstrings, delimiters and escapes included
// Nested brackets cycle white → pink → cyan → green → purple → orange, so each
// nesting level reads apart at a glance; their pair guides follow suit.
//
// Palette: every color below is one of the palette constants, a neutral of the
// ramp, or a tint / shade of a palette hue (mixed toward the editor surface).
// The terminal's ANSI palette is the palette itself; it has no true blue, so
// ANSI blue is purple and bright blue lavender. In the UI, "modified" and
// "information" are cyan.

import type { ThemeDefinition } from "./theme";

// ─────────────────────────────────────────────────────────────────────────────
// Color helpers
// ─────────────────────────────────────────────────────────────────────────────

type Rgb = [number, number, number];

const toRgb = (hex: string): Rgb =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;

const toHex = (channels: number[]): string =>
  "#" +
  channels
    .map((v) =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .toUpperCase();

/** Opaque blend of `weight` parts `fg` over `bg`. */
function mix(fg: string, bg: string, weight: number): string {
  const f = toRgb(fg);
  const b = toRgb(bg);
  return toHex(f.map((v, i) => v * weight + b[i] * (1 - weight)));
}

/**
 * Translucent color that, drawn at `alpha` over `base`, composites back to
 * exactly `target`. VS Code requires most editor decorations to be
 * non-opaque; this keeps their on-screen color identical to the palette.
 */
function overlay(
  target: string,
  alpha: number,
  base: string = editorBackground,
): string {
  const t = toRgb(target);
  const b = toRgb(base);
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return toHex(t.map((v, i) => (v - (1 - alpha) * b[i]) / alpha)) + alphaHex;
}

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
const comment = "#6272A4";
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
const gray60 = "#5C5F77"; // disabled text, popup borders
// One border around every floating popup (suggest, hover, parameter hints,
// code actions, peek, quick pick, menus, notifications): ~2:1 against the
// editor and popup surfaces — subtle, but the popup edge never melts into code.
const popupBorder = gray60;
// Control borders reach 3:1 against every surface (WCAG 1.4.11), so the edge
// of an input, dropdown or checkbox is findable without its fill.
const gray70 = "#7A7D94"; // control borders (inputs, dropdowns, checkboxes, secondary buttons), line numbers
const gray80 = "#8E91A8"; // tertiary text on the editor: placeholders, code lens, blame; neutral counter badges
const gray100 = "#A0A3BC"; // muted text: status bar, descriptions, inactive titles
const gray120 = "#C4C6D8"; // icons
const gray130 = "#D9DAE6"; // primary UI text
const gray150 = "#EEEEF5"; // emphasized text
const white = "#FFFFFF";
const black = "#000000";
const transparent = "#00000000";

// Accent ramp (violet) — selection, focus, primary actions
const accent40 = "#352F52"; // multi-selected tabs, keyboard focus row
const accent50 = "#443B6E"; // current tab, list / menu / completion selection
const accent60 = "#54498B"; // selected tab border, toggled options, secondary accent borders
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

const synForeground = foreground; // variables, properties, punctuation, default text
const synComment = comment; // comments, doc comments
const synKeyword = pink; // pink: keywords, storage, operators, tags, escapes
const synFunction = green; // green: functions, methods, decorators, attribute names
const synType = cyan; // cyan: types, classes, interfaces, keys in data files
const synString = yellow; // yellow: strings
const synConstant = purple; // purple: numbers, booleans, null, this / self
const synParameter = orange; // orange: parameters, keyword arguments
const synRegexp = red; // red: regular expressions
const synInvalid = red; // red: invalid / illegal code
const synTodo = cyan; // TODO / FIXME markers inside comments
const synOperator = pink; // key / value and namespace separators, interpolation delimiters
const synRegexpGroup = orange; // regexp groups
const synRegexpClass = cyan; // regexp character classes and sets

// Bracket pair colors, outermost first. Each level takes the next hue of the
// syntax palette; the pair guides show the same hue, dimmed.
const bracketLevels = [foreground, pink, cyan, green, purple, orange];

// ─────────────────────────────────────────────────────────────────────────────
// Editor palette
// ─────────────────────────────────────────────────────────────────────────────

const editorBackground = gray10;
const editorForeground = synForeground;
// Long-form text in panels (chat transcripts, side bar views, typed input)
// is one step softer than code so the editor stays the brightest surface.
const bodyText = "#E2E3EC";
const caret = foreground;
const caretRowBorder = "#474A5F"; // outline around the caret line (no fill)
const lineNumber = gray70;
const lineNumberActive = gray120;
const indentGuide = "#353748"; // indent guides, rulers
const indentGuideActive = "#5A5D7C"; // active indent guide, matched-bracket guide
const whitespace = gray60;
// Clearly visible on the editor, dark enough that every syntax hue except the
// comment slate keeps 3:1 on top of it.
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
// Change bars and diff fills are shared with Classical Dark (same hues, same
// intensities), the one deliberate exception to the palette rule above:
// added = green, modified = blue, removed = gray. Deletions read as gray
// throughout the diff editor, gutter and overview ruler; file decorations
// keep the palette hues below.

const gutterAdded = "#549159";
const gutterModified = "#375FAD";
const gutterDeleted = "#868A91";
const gutterAddedSecondary = "#29583C";
const gutterModifiedSecondary = "#2E4D89";
const gutterDeletedSecondary = "#4C4F56";
const diffInserted = "#294436";
const diffInsertedMark = "#447152";
const diffDeleted = "#484A4A";
const diffDeletedMark = "#656E76";
const diffModified = "#385570";
const diffModifiedMark = "#43698D";
// Changed words: the mark hue pulled toward the surface, a clear ~1.7:1 step
// above the line tint while every syntax hue keeps about 3:1 on top of it.
// (Over this lighter, bluer surface the base diff colors alone barely rise
// above the line tint.)
const diffInsertedWord = mix(diffInsertedMark, editorBackground, 0.7);
const diffDeletedWord = mix(diffDeletedMark, editorBackground, 0.65);
const diffModifiedWord = mix(diffModifiedMark, editorBackground, 0.7);
const diffConflict = "#45302B";
const diffConflictMark = "#8F5247";
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
const fileIgnored = mix(comment, foreground, 0.78); // slate: ignored
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

// Changed lines show 40% of the diff color over the editor background; changed
// words inside them show their word color on top of that line tint. Diff
// fills are drawn above the selection, so they are kept highly translucent
// (same on-screen color via overlay) to let a selection beneath show through.
const diffLine = (color: string): string =>
  overlay(mix(color, editorBackground, 0.4), 0.2);
const diffWord = (color: string, word: string): string =>
  overlay(word, 0.3, mix(color, editorBackground, 0.4));

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
    disabledForeground: gray60,
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
        [`editorBracketPairGuide.background${i + 1}`, overlay(mix(color, editorBackground, 0.3), 0.6)],
        [`editorBracketPairGuide.activeBackground${i + 1}`, overlay(mix(color, editorBackground, 0.7), 0.85)],
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

    // Gutter — change bars: added green, modified blue, deleted gray.
    "editorGutter.addedBackground": gutterAdded,
    "editorGutter.modifiedBackground": gutterModified,
    "editorGutter.deletedBackground": gutterDeleted,
    "editorGutter.addedSecondaryBackground": gutterAddedSecondary,
    "editorGutter.modifiedSecondaryBackground": gutterModifiedSecondary,
    "editorGutter.deletedSecondaryBackground": gutterDeletedSecondary,
    "editorGutter.commentRangeForeground": gray50,
    "editorGutter.commentGlyphForeground": gray120,
    "editorGutter.commentUnresolvedGlyphForeground": iconInfo,
    "editorGutter.commentDraftGlyphForeground": gray100,
    "editorGutter.itemBackground": gray40,
    "editorGutter.itemGlyphForeground": gray120,

    // Overview ruler — scrollbar marks
    "editorOverviewRuler.background": editorBackground,
    "editorOverviewRuler.border": transparent,
    "editorOverviewRuler.findMatchForeground": findMark,
    "editorOverviewRuler.rangeHighlightForeground": gray80,
    "editorOverviewRuler.selectionHighlightForeground": wordReadMark,
    "editorOverviewRuler.wordHighlightForeground": wordReadMark,
    "editorOverviewRuler.wordHighlightStrongForeground": wordWriteMark,
    "editorOverviewRuler.wordHighlightTextForeground": wordReadMark,
    "editorOverviewRuler.modifiedForeground": gutterModified,
    "editorOverviewRuler.addedForeground": gutterAdded,
    "editorOverviewRuler.deletedForeground": gutterDeleted,
    "editorOverviewRuler.errorForeground": errorMark,
    "editorOverviewRuler.warningForeground": warningMark,
    "editorOverviewRuler.infoForeground": weakWarning,
    "editorOverviewRuler.bracketMatchForeground": gray80,
    "editorOverviewRuler.currentContentForeground": diffModifiedMark,
    "editorOverviewRuler.incomingContentForeground": diffInsertedMark,
    "editorOverviewRuler.commonContentForeground": diffDeletedMark,
    "editorOverviewRuler.commentForeground": gray80,
    "editorOverviewRuler.commentUnresolvedForeground": iconInfo,
    "editorOverviewRuler.commentDraftForeground": gray100,
    "editorOverviewRuler.inlineChatInserted": diffInsertedMark,
    "editorOverviewRuler.inlineChatRemoved": diffDeletedMark,
    "editorOverviewRuler.agentFeedbackForeground": iconInfo,

    // Minimap
    "minimap.background": editorBackground,
    "minimap.foregroundOpacity": "#000000CC",
    "minimap.findMatchHighlight": findMark,
    "minimap.selectionHighlight": selection,
    "minimap.selectionOccurrenceHighlight": wordReadMark,
    "minimap.errorHighlight": errorMark,
    "minimap.warningHighlight": warningMark,
    "minimap.infoHighlight": weakWarning,
    "minimap.chatEditHighlight": aiPurple + "66",
    "minimapGutter.addedBackground": gutterAdded,
    "minimapGutter.modifiedBackground": gutterModified,
    "minimapGutter.deletedBackground": gutterDeleted,
    "minimapSlider.background": minimapThumb,
    "minimapSlider.hoverBackground": scrollbarThumb,
    "minimapSlider.activeBackground": scrollbarThumbHover,
    "editorMinimap.inlineChatInserted": diffInsertedMark,

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
    // Inserted = green, removed = gray (deletions read as gray throughout,
    // matching the gutter bar).
    "diffEditor.insertedLineBackground": diffLine(diffInserted),
    "diffEditor.removedLineBackground": diffLine(diffDeleted),
    "diffEditor.insertedTextBackground": diffWord(diffInserted, diffInsertedWord),
    "diffEditor.removedTextBackground": diffWord(diffDeleted, diffDeletedWord),
    "diffEditor.insertedTextBorder": transparent,
    "diffEditor.removedTextBorder": transparent,
    "diffEditorGutter.insertedLineBackground": diffLine(diffInserted),
    "diffEditorGutter.removedLineBackground": diffLine(diffDeleted),
    "diffEditorOverview.insertedForeground": diffInsertedMark,
    "diffEditorOverview.removedForeground": diffDeletedMark,
    "diffEditor.border": gray30,
    "diffEditor.diagonalFill": gray40 + "80",
    "diffEditor.unchangedRegionBackground": blockBackground,
    "diffEditor.unchangedRegionForeground": gray100,
    "diffEditor.unchangedRegionShadow": shadow,
    "diffEditor.unchangedCodeBackground": transparent,
    "diffEditor.move.border": gray80 + "9C",
    "diffEditor.moveActive.border": gutterModified,
    "multiDiffEditor.background": editorBackground,
    "multiDiffEditor.headerBackground": gray20,
    "multiDiffEditor.border": gray30,

    // ── Merge conflicts ──
    // Current (ours) = modified blue, incoming (theirs) = inserted green,
    // common base = deleted gray; unresolved conflicts are outlined in rust.
    "merge.currentHeaderBackground": overlay(diffModified, 0.8),
    "merge.currentContentBackground": diffLine(diffModified),
    "merge.incomingHeaderBackground": overlay(diffInserted, 0.8),
    "merge.incomingContentBackground": diffLine(diffInserted),
    "merge.commonHeaderBackground": overlay(diffDeleted, 0.8),
    "merge.commonContentBackground": diffLine(diffDeleted),
    "merge.border": transparent,
    "mergeEditor.change.background": diffLine(diffModified),
    "mergeEditor.change.word.background": diffWord(diffModified, diffModifiedWord),
    "mergeEditor.changeBase.background": diffLine(diffDeleted),
    "mergeEditor.changeBase.word.background": diffWord(diffDeleted, diffDeletedWord),
    "mergeEditor.conflict.input1.background": diffLine(diffModified),
    "mergeEditor.conflict.input2.background": diffLine(diffInserted),
    "mergeEditor.conflictingLines.background": overlay(diffConflict, 0.8),
    "mergeEditor.conflict.unhandledUnfocused.border": diffConflictMark + "B3",
    "mergeEditor.conflict.unhandledFocused.border": diffConflictMark,
    "mergeEditor.conflict.handledUnfocused.border": gray50,
    "mergeEditor.conflict.handledFocused.border": gray80,
    "mergeEditor.conflict.unhandled.minimapOverViewRuler": diffConflictMark,
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
    "inlineChatDiff.inserted": diffLine(diffInserted),
    "inlineChatDiff.removed": diffLine(diffDeleted),

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
    "inlineEdit.modifiedBackground": diffInserted + "4D",
    "inlineEdit.modifiedBorder": diffInsertedMark,
    "inlineEdit.modifiedChangedLineBackground": diffLine(diffInserted),
    "inlineEdit.modifiedChangedTextBackground": diffWord(diffInserted, diffInsertedWord),
    "inlineEdit.originalBackground": diffDeleted + "33",
    "inlineEdit.originalBorder": diffDeletedMark,
    "inlineEdit.originalChangedLineBackground": diffLine(diffDeleted),
    "inlineEdit.originalChangedTextBackground": diffWord(diffDeleted, diffDeletedWord),
    "inlineEdit.tabWillAcceptModifiedBorder": diffInsertedMark,
    "inlineEdit.tabWillAcceptOriginalBorder": diffDeletedMark,

    // ── Chat ──
    // User requests sit in a gray bubble; AI progress and slash commands use
    // the purple accent.
    "chat.requestBackground": gray20,
    "chat.requestBorder": gray30,
    "chat.requestBubbleBackground": gray40,
    "chat.requestBubbleHoverBackground": gray50,
    "chat.requestCodeBorder": gray30,
    "chat.slashCommandBackground": purple70 + "B3",
    "chat.slashCommandForeground": purple140,
    "chat.avatarBackground": gray40,
    "chat.avatarForeground": gray130,
    "chat.checkpointSeparator": gray50,
    "chat.statusBackground": wash10,
    "chat.thinkingShimmer": purple140,
    "chat.inputWorkingBorderColor1": aiPurple,
    "chat.voiceGlowBaseColor": aiPurple,
    "chat.dictationActiveMicGlow": aiPurple,
    // Model-comparison badge: a cyan-to-purple gradient.
    "chat.fusionBadgeGradientStart": cyan,
    "chat.fusionBadgeGradientEnd": purple,
    "chat.editedFileForeground": fileChatEdited,
    "chat.linesAddedForeground": fileAdded,
    "chat.linesRemovedForeground": red100,
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
  // Semantic token colors
  // ───────────────────────────────────────────────────────────────────────────
  // Every rule sets a color only; code is never bold or italic.
  semanticHighlighting: true,
  semanticTokenColors: {
    // Keywords and operators
    keyword: synKeyword,
    modifier: synKeyword,
    newOperator: synKeyword,
    operator: synKeyword,
    "operator.controlFlow:rust": synKeyword,
    "selfKeyword:rust": synConstant,
    "selfTypeKeyword:rust": synType,
    "lifetime:rust": synKeyword,

    // Literals
    string: synString,
    stringLiteral: synString,
    escapeSequence: synKeyword,
    formatSpecifier: synKeyword,
    regexp: synRegexp,
    number: synConstant,
    numberLiteral: synConstant,
    customLiteral: synConstant,
    boolean: synConstant,
    "boolean:rust": synConstant,
    comment: synComment,
    "comment.documentation": synComment,

    // Types
    namespace: editorForeground,
    type: synType,
    class: synType,
    interface: synType,
    enum: synType,
    struct: synType,
    record: synType,
    typeAlias: synType,
    union: synType,
    builtinType: synType,
    typeParameter: synType,
    "class.defaultLibrary": synType,
    "type.defaultLibrary": synType,

    // Functions — declarations and calls alike
    function: synFunction,
    method: synFunction,
    macro: synFunction,
    decorator: synFunction,
    annotation: synFunction,
    attribute: synFunction,
    builtinAttribute: synFunction,

    // Variables, parameters and members
    variable: editorForeground,
    "variable.readonly.defaultLibrary": synConstant,
    "variable.constant": editorForeground,
    property: editorForeground,
    recordComponent: editorForeground,
    annotationMember: editorForeground,
    parameter: synParameter,
    selfParameter: synConstant,
    clsParameter: synConstant,
    builtinConstant: synConstant,
    magicFunction: synFunction,
    module: editorForeground,
    field: editorForeground,
    extensionMethod: synFunction,
    delegate: synType,
    keywordControl: synKeyword,
    controlKeyword: synKeyword,
    operatorOverloaded: synFunction,
    stringVerbatim: synString,
    stringEscapeCharacter: synKeyword,
    excludedCode: synComment,
    enumMember: synConstant,
    event: editorForeground,
    label: editorForeground,
    "*.deprecated": { fontStyle: "strikethrough" },

    // Language specifics
    "unresolvedReference:rust": synInvalid,
    "variable.defaultLibrary:javascript": synType,
    "variable.defaultLibrary:javascriptreact": synType,
    "variable.defaultLibrary:typescript": synType,
    "variable.defaultLibrary:typescriptreact": synType,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TextMate token colors
  // ───────────────────────────────────────────────────────────────────────────
  // Rules set `fontStyle: ""` wherever a grammar or a later default might add
  // bold or italic, so code renders upright and regular throughout.
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

    // ── Comments ──
    {
      name: "Comment",
      scope: [
        "comment",
        "punctuation.definition.comment",
        "comment.block.documentation",
        "comment.line.documentation",
        "string.quoted.docstring",
        "meta.shebang",
        "punctuation.definition.comment.shebang",
      ],
      settings: { foreground: synComment, fontStyle: "" },
    },
    {
      name: "Doc comment tag",
      scope: [
        "keyword.other.documentation",
        "storage.type.class.jsdoc",
        "punctuation.definition.block.tag.jsdoc",
        "keyword.other.phpdoc",
        "comment.block.documentation storage.type",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "Doc comment parameter / type",
      scope: [
        "variable.other.jsdoc",
        "variable.parameter.javadoc",
        "comment.block.documentation variable",
      ],
      settings: { foreground: synParameter, fontStyle: "" },
    },
    {
      name: "Doc comment type",
      scope: [
        "entity.name.type.instance.jsdoc",
        "comment.block.documentation entity.name.type",
      ],
      settings: { foreground: synType, fontStyle: "" },
    },
    {
      name: "TODO marker",
      scope: ["keyword.codetag.notation", "keyword.other.todo"],
      settings: { foreground: synTodo, fontStyle: "" },
    },

    // ── Keywords, storage, operators ──
    {
      name: "Keyword / storage / operator",
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator",
        "storage",
        "storage.type",
        "storage.modifier",
        "storage.type.function.arrow",
        "punctuation.accessor.optional",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },

    // ── Constants ──
    {
      name: "Number / language constant",
      scope: [
        "constant",
        "constant.numeric",
        "constant.language",
        "constant.other.caps",
        "constant.other.enum",
        "variable.other.enummember",
        "keyword.operator.plus.exponent",
        "keyword.operator.minus.exponent",
        "support.constant",
        "constant.other.symbol",
        "constant.other.ellipsis",
        "constant.other.date",
        "constant.other.timestamp",
      ],
      settings: { foreground: synConstant, fontStyle: "" },
    },
    {
      name: "this / self / super",
      scope: [
        "variable.language",
        "variable.parameter.function.language.special.self.python",
        "variable.parameter.function.language.special.cls.python",
      ],
      settings: { foreground: synConstant, fontStyle: "" },
    },
    {
      name: "Character literal",
      scope: "constant.character",
      settings: { foreground: synString },
    },
    {
      name: "Escape / format placeholder",
      scope: [
        "constant.character.escape",
        "constant.character.format.placeholder",
        "constant.other.placeholder",
        "storage.type.format.python",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },

    // ── Strings ──
    {
      name: "String",
      scope: [
        "string",
        "punctuation.definition.string",
        "meta.embedded.assembly",
      ],
      settings: { foreground: synString, fontStyle: "" },
    },
    {
      // Docstrings, and bare string statements that act as block comments,
      // read as comments end to end: quotes, prefix and escapes included.
      name: "Docstring",
      scope: [
        "string.quoted.docstring",
        "string.quoted.docstring punctuation.definition.string",
        "string.quoted.docstring storage.type.string",
        "string.quoted.docstring constant.character",
        "string.quoted.docstring constant.character.escape",
        "string.quoted.docstring constant.language",
      ],
      settings: { foreground: synComment, fontStyle: "" },
    },
    {
      name: "Regular expression",
      scope: [
        "string.regexp",
        "constant.regexp",
        "string.regexp punctuation.definition.string",
      ],
      settings: { foreground: synRegexp, fontStyle: "" },
    },
    {
      // Python scopes every r"…" string as a regexp, whatever it holds (paths,
      // LaTeX, …), so the body keeps the string hue; regexp syntax inside it
      // still takes the colors below.
      name: "Python raw string",
      scope: [
        "source.python string.regexp",
        "source.python string.regexp punctuation.definition.string",
      ],
      settings: { foreground: synString, fontStyle: "" },
    },
    {
      // Anchors, quantifiers, alternation, back-references and escapes are
      // keywords / escapes already; lookaround openers join them.
      name: "Regexp operators",
      scope: [
        "punctuation.definition.group.assertion.regexp",
        "keyword.operator.lookahead.regexp",
        "keyword.operator.lookbehind.regexp",
        "support.other.match.begin.regexp",
        "support.other.match.end.regexp",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "Regexp group",
      scope: [
        "string.regexp punctuation.definition.group",
        "string.regexp punctuation.parenthesis",
        "string.regexp support.other.parenthesis",
        "entity.name.tag.named.group.regexp",
      ],
      settings: { foreground: synRegexpGroup, fontStyle: "" },
    },
    {
      name: "Regexp character class / set",
      scope: [
        "constant.other.character-class",
        "constant.character.character-class.regexp",
        "constant.character.set.regexp",
        "constant.other.set.regexp",
        "support.other.match.any.regexp",
        "support.other.escape.special.regexp",
        "punctuation.definition.character-class.regexp",
        "string.regexp punctuation.character.set",
      ],
      settings: { foreground: synRegexpClass, fontStyle: "" },
    },
    {
      name: "Template / interpolation delimiters",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
        "punctuation.definition.interpolation",
        "punctuation.definition.variable.makefile",
        "constant.character.format.placeholder.other.python",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "Template expression content",
      scope: ["meta.template.expression", "meta.embedded.line"],
      settings: { foreground: editorForeground },
    },

    // ── Functions ──
    {
      name: "Function / method declaration and call",
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
        "meta.method-call entity.name.function",
        "entity.name.function.call",
        "meta.function-call.generic.python",
        "entity.name.method",
        "entity.name.function.macro",
        "entity.name.function.preprocessor",
        "entity.name.operator.custom-literal",
        "support.function.git-rebase",
      ],
      settings: { foreground: synFunction, fontStyle: "" },
    },
    {
      name: "Decorator / annotation / attribute",
      scope: [
        "meta.decorator",
        "punctuation.decorator",
        "meta.decorator entity.name.function",
        "meta.decorator variable.other.readwrite",
        "entity.name.function.decorator",
        "punctuation.definition.decorator",
        "storage.type.annotation",
        "punctuation.definition.annotation",
        "entity.name.type.annotation",
        "meta.attribute.rust",
        "meta.attribute.php",
      ],
      settings: { foreground: synFunction, fontStyle: "" },
    },

    // ── Types ──
    {
      name: "Type / class / interface",
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.other.inherited-class",
        "support.class",
        "support.type",
        "support.type.primitive",
        "support.type.builtin",
        "storage.type.primitive",
        "storage.type.built-in",
        "entity.name.type.primitive",
        "storage.type.java",
        "storage.type.generic.java",
        "storage.type.object.array.java",
        "storage.type.cs",
        "storage.type.generic.cs",
        "storage.type.groovy",
        "storage.type.generic.groovy",
        "storage.type.numeric.go",
        "storage.type.string.go",
        "storage.type.byte.go",
        "storage.type.boolean.go",
        "storage.type.rune.go",
        "storage.type.error.go",
        "storage.type.uintptr.go",
        "storage.type.c",
        "storage.type.objc",
        "storage.type.php",
        "storage.type.haskell",
        "storage.type.ocaml",
        "storage.type.core.rust",
        "storage.class.std.rust",
        "source.cs keyword.type",
        "keyword.primitive-datatypes.swift",
        "support.type.exception.python",
        "support.variable.dom",
      ],
      settings: { foreground: synType, fontStyle: "" },
    },
    {
      name: "Namespace / module / package",
      scope: [
        "entity.name.namespace",
        "entity.name.scope-resolution",
        "entity.name.type.package.go",
        "entity.name.type.module",
        "storage.modifier.import.java",
        "storage.modifier.package.java",
      ],
      settings: { foreground: editorForeground, fontStyle: "" },
    },

    // ── Variables, parameters, members ──
    {
      name: "Variable / property",
      scope: [
        "variable",
        "variable.other",
        "variable.other.property",
        "variable.other.object.property",
        "variable.other.member",
        "variable.other.readwrite",
        "meta.definition.variable.name",
        "entity.name.variable",
        "support.variable",
        "meta.object-literal.key",
      ],
      settings: { foreground: editorForeground, fontStyle: "" },
    },
    {
      name: "Parameter / keyword argument",
      scope: [
        "variable.parameter",
        "meta.parameter variable",
        "variable.parameter.function-call.python",
        "entity.name.variable.parameter",
        "meta.function.parameters variable.other",
      ],
      settings: { foreground: synParameter, fontStyle: "" },
    },
    {
      name: "Label",
      scope: ["entity.name.label", "punctuation.definition.label"],
      settings: { foreground: editorForeground },
    },
    {
      name: "Punctuation",
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: editorForeground },
    },
    {
      // Separators that relate two things (key and value, namespace and
      // member, class and base, name and annotation) read as operators;
      // commas, dots and terminators stay plain.
      name: "Relating separator",
      scope: [
        "punctuation.separator.key-value",
        "punctuation.separator.dictionary.key-value",
        "punctuation.separator.dict.python",
        "punctuation.separator.annotation",
        "punctuation.separator.namespace",
        "punctuation.separator.scope-resolution",
        "punctuation.separator.inheritance",
        "punctuation.separator.pointer-access",
        "punctuation.separator.slice",
        "punctuation.separator.hash",
        "punctuation.definition.entity.other.inherited-class",
        "punctuation.definition.block.sequence.item.yaml",
        "punctuation.definition.block.scalar.folded.yaml",
        "punctuation.definition.block.scalar.literal.yaml",
        "support.other.chomping-indicator.yaml",
      ],
      settings: { foreground: synOperator, fontStyle: "" },
    },
    {
      // Member access is plain punctuation, even where a grammar scopes the
      // dot as an operator.
      name: "Member access dot",
      scope: [
        "keyword.operator.dereference.java",
        "keyword.operator.navigation.groovy",
        "punctuation.separator.list.comma.css",
      ],
      settings: { foreground: editorForeground, fontStyle: "" },
    },

    // ── HTML / XML / JSX ──
    {
      name: "Tag",
      scope: [
        "entity.name.tag",
        "meta.tag.sgml.doctype",
        "support.class.component",
        "entity.name.tag.component",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "Tag brackets",
      scope: "punctuation.definition.tag",
      settings: { foreground: editorForeground },
    },
    {
      name: "Attribute name",
      scope: [
        "entity.other.attribute-name",
        "entity.other.attribute-name.namespace",
      ],
      settings: { foreground: synFunction, fontStyle: "" },
    },
    {
      name: "Entity reference",
      scope: [
        "constant.character.entity",
        "punctuation.definition.entity.html",
        "punctuation.definition.entity.xml",
      ],
      settings: { foreground: synConstant },
    },

    // ── CSS / SCSS / Less ──
    {
      // Element selectors are covered by the Tag rule.
      name: "CSS keyframe offset",
      scope: "entity.other.keyframe-offset",
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "CSS class / id / pseudo selector",
      scope: [
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.id.css",
        "entity.other.attribute-name.pseudo-class",
        "entity.other.attribute-name.pseudo-element",
        "source.css entity.other.attribute-name",
        "source.css.scss entity.other.attribute-name",
        "source.css.less entity.other.attribute-name",
        "source.sass entity.other.attribute-name",
        "source.css punctuation.definition.entity",
      ],
      settings: { foreground: synFunction, fontStyle: "" },
    },
    {
      name: "CSS parent selector",
      scope: [
        "entity.other.attribute-name.parent-selector",
        "entity.other.attribute-name.parent-selector-suffix",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "CSS property name",
      scope: [
        "support.type.property-name",
        "support.type.vendored.property-name",
        "meta.property-name",
      ],
      settings: { foreground: synType, fontStyle: "" },
    },
    {
      name: "CSS property value",
      scope: [
        "support.constant.property-value",
        "support.constant.vendored.property-value",
        "support.constant.font-name",
        "support.constant.media",
        "support.constant.media-type",
        "constant.other.color.rgb-value",
        "constant.other.rgb-value",
        "support.constant.color",
      ],
      settings: { foreground: synConstant, fontStyle: "" },
    },
    {
      name: "CSS variable",
      scope: [
        "variable.css",
        "variable.scss",
        "variable.other.less",
        "source.css variable",
        "source.css.less variable",
      ],
      settings: { foreground: editorForeground, fontStyle: "" },
    },
    {
      name: "CSS url",
      scope: ["variable.parameter.url", "string.unquoted.url"],
      settings: { foreground: synString },
    },

    // ── Data files: JSON / YAML / TOML / INI / properties / dotenv ──
    {
      name: "Key",
      scope: [
        "support.type.property-name.json",
        "support.type.property-name.json.comments",
        "punctuation.support.type.property-name",
        "entity.name.tag.yaml",
        "support.type.property-name.toml",
        "support.type.property-name.table.toml",
        "support.type.property-name.array.toml",
        "entity.other.attribute-name.table.toml",
        "entity.name.section.toml",
        "keyword.other.definition.ini",
        "entity.name.section.group-title.ini",
        "support.constant.key.properties",
        "entity.name.tag.properties",
        "variable.other.key.env",
        "variable.other.env",
      ],
      settings: { foreground: synType, fontStyle: "" },
    },
    {
      name: "Unquoted value",
      scope: [
        "string.unquoted.plain.out.yaml",
        "string.unquoted.plain.in.yaml",
        "string.unquoted.block.yaml",
        "string.unquoted.value.properties",
        "string.unquoted.env",
      ],
      settings: { foreground: synString },
    },
    {
      name: "YAML anchor / alias / document marker",
      scope: [
        "entity.name.type.anchor.yaml",
        "variable.other.anchor.yaml",
        "variable.other.alias.yaml",
        "punctuation.definition.anchor.yaml",
        "punctuation.definition.alias.yaml",
        "entity.other.document.begin.yaml",
        "entity.other.document.end.yaml",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "TOML date / time",
      scope: [
        "constant.other.time.datetime.offset.toml",
        "constant.other.time.datetime.local.toml",
        "constant.other.time.date.toml",
        "constant.other.time.time.toml",
      ],
      settings: { foreground: synConstant },
    },

    // ── Shell ──
    {
      name: "Shell command",
      scope: [
        "entity.name.command.shell",
        "support.function.builtin.shell",
        "entity.name.function.call.shell",
      ],
      settings: { foreground: synFunction, fontStyle: "" },
    },
    {
      name: "Shell variable",
      scope: [
        "variable.other.normal.shell",
        "variable.other.special.shell",
        "variable.other.positional.shell",
        "variable.other.bracket.shell",
        "punctuation.definition.variable.shell",
      ],
      settings: { foreground: synParameter, fontStyle: "" },
    },
    {
      name: "Shell argument",
      scope: ["source.shell string.unquoted.argument"],
      settings: { foreground: editorForeground },
    },

    // ── Language specifics ──
    {
      name: "PHP variable sigil",
      scope: "punctuation.definition.variable.php",
      settings: { foreground: synKeyword },
    },
    {
      name: "PHP tags",
      scope: [
        "punctuation.section.embedded.begin.php",
        "punctuation.section.embedded.end.php",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Python magic method",
      scope: "support.function.magic.python",
      settings: { foreground: synFunction, fontStyle: "" },
    },
    {
      name: "Python magic variable",
      scope: "support.variable.magic.python",
      settings: { foreground: synConstant, fontStyle: "" },
    },
    {
      name: "Ruby symbol / hash key",
      scope: [
        "constant.language.symbol.ruby",
        "constant.language.symbol.hashkey.ruby",
        "constant.other.symbol.hashkey.ruby",
        "punctuation.definition.constant.ruby",
        "punctuation.definition.constant.hashkey.ruby",
      ],
      settings: { foreground: synConstant },
    },
    {
      name: "Ruby instance / class / global variable",
      scope: [
        "variable.other.readwrite.instance.ruby",
        "variable.other.readwrite.class.ruby",
        "variable.other.readwrite.global.ruby",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Rust lifetime",
      scope: [
        "entity.name.type.lifetime.rust",
        "punctuation.definition.lifetime.rust",
      ],
      settings: { foreground: synKeyword, fontStyle: "" },
    },
    {
      name: "Rust self",
      scope: "variable.language.self.rust",
      settings: { foreground: synConstant },
    },

    // ── Markdown (prose: emphasis styles are kept) ──
    {
      name: "Markdown heading",
      scope: [
        "markup.heading",
        "markup.heading entity.name",
        "entity.name.section.markdown",
      ],
      settings: { foreground: synConstant, fontStyle: "bold" },
    },
    {
      name: "Markdown heading marker",
      scope: "punctuation.definition.heading.markdown",
      settings: { foreground: synConstant, fontStyle: "" },
    },
    {
      name: "Markdown bold",
      scope: ["markup.bold", "punctuation.definition.bold.markdown"],
      settings: { foreground: synParameter, fontStyle: "bold" },
    },
    {
      name: "Markdown italic",
      scope: ["markup.italic", "punctuation.definition.italic.markdown"],
      settings: { foreground: synString, fontStyle: "italic" },
    },
    {
      name: "Markdown bold italic",
      scope: ["markup.bold markup.italic", "markup.italic markup.bold"],
      settings: { fontStyle: "bold italic" },
    },
    {
      name: "Markdown strikethrough",
      scope: "markup.strikethrough",
      settings: { fontStyle: "strikethrough" },
    },
    {
      name: "Markdown underline",
      scope: "markup.underline",
      settings: { fontStyle: "underline" },
    },
    {
      name: "Markdown code",
      scope: [
        "markup.inline.raw",
        "markup.inline.raw.string.markdown",
        "markup.fenced_code.block.markdown",
        "markup.raw.block.markdown",
        "punctuation.definition.raw.markdown",
      ],
      settings: { foreground: synFunction },
    },
    {
      name: "Markdown fence language",
      scope: "fenced_code.block.language",
      settings: { foreground: synType },
    },
    {
      name: "Markdown list / separator / table markers",
      scope: [
        "punctuation.definition.list.begin.markdown",
        "beginning.punctuation.definition.list.markdown",
        "meta.separator.markdown",
        "punctuation.separator.table.markdown",
        "punctuation.definition.markdown",
      ],
      settings: { foreground: synType },
    },
    {
      name: "Markdown quote",
      scope: ["markup.quote", "punctuation.definition.quote.begin.markdown"],
      settings: { foreground: synComment, fontStyle: "italic" },
    },
    {
      name: "Markdown link text",
      scope: [
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
        "string.other.link.description.title.markdown",
        "constant.other.reference.link.markdown",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Markdown link destination",
      scope: [
        "markup.underline.link.markdown",
        "markup.underline.link.image.markdown",
        "meta.link.inet markup.underline.link.markdown",
        "meta.link.email markup.underline.link.markdown",
      ],
      settings: { foreground: hyperlink, fontStyle: "underline" },
    },

    // ── Diff / patch files ──
    {
      name: "Diff inserted",
      scope: ["markup.inserted", "punctuation.definition.inserted"],
      settings: { foreground: fileAdded },
    },
    {
      name: "Diff deleted",
      scope: ["markup.deleted", "punctuation.definition.deleted"],
      settings: { foreground: fileDeleted },
    },
    {
      name: "Diff changed",
      scope: ["markup.changed", "punctuation.definition.changed"],
      settings: { foreground: fileModified },
    },
    {
      name: "Diff header / range",
      scope: [
        "meta.diff.header",
        "meta.diff.range",
        "meta.diff.header.from-file",
        "meta.diff.header.to-file",
      ],
      settings: { foreground: synType },
    },
    {
      name: "Git rebase SHA",
      scope: "constant.sha.git-rebase",
      settings: { foreground: synConstant },
    },

    // ── Log files and the Output panel ──
    {
      name: "Log error",
      scope: ["log.error", "log.exceptiontype", "token.error-token"],
      settings: { foreground: red, fontStyle: "" },
    },
    {
      name: "Log warning",
      scope: ["log.warning", "token.warn-token"],
      settings: { foreground: yellow, fontStyle: "" },
    },
    {
      name: "Log info",
      scope: ["log.info", "token.info-token"],
      settings: { foreground: cyan, fontStyle: "" },
    },
    {
      name: "Log debug",
      scope: ["log.debug", "token.debug-token"],
      settings: { foreground: purple, fontStyle: "" },
    },
    {
      name: "Log timestamp / verbose",
      scope: ["log.date", "log.verbose"],
      settings: { foreground: synComment, fontStyle: "" },
    },

    // ── Invalid ──
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: synInvalid, fontStyle: "" },
    },
    {
      // Deprecated ≠ broken: keep the normal color, strike it through.
      name: "Deprecated",
      scope: "invalid.deprecated",
      settings: { foreground: editorForeground, fontStyle: "strikethrough" },
    },
  ],
};

export default theme;
