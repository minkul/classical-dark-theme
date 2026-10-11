// ─────────────────────────────────────────────────────────────────────────────
// Classical Dark — color palette
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the theme: `npm run build` (src/build-theme.ts)
// writes it to themes/classical-dark.json.
//
// Layout model: the workbench is a set of dark panels — editor, side bar,
// panel, terminal, all `gray10` — resting on a lighter frame (`gray30`): title
// bar, activity bar, status bar and the shell that shows between floating
// panels in the modern layout. Panels draw no border of their own; in the
// classic layout a 1px frame-colored separator stands in for the gap.

// Neutral ramp — surfaces, borders and text
const gray10 = "#191A1C"; // panel surface: editor, side bar, panel, terminal, inputs
const gray20 = "#212326"; // inline surface: find widget, peek editor, alternating rows
const gray30 = "#26282C"; // frame: title/activity/status bars, modern shell; popups; panel separators
const gray40 = "#33353B"; // popup borders, inactive selection, notifications, tree guides
const gray50 = "#40434A"; // control borders (inputs, dropdowns, secondary buttons), progress track
const gray60 = "#4C4F56"; // disabled text
const gray70 = "#5F6269"; // disabled icons, raised control borders
const gray80 = "#73767C"; // tertiary text: placeholders, group labels; neutral counter badges
const gray100 = "#9FA2A8"; // muted text: status bar, descriptions, inactive titles
const gray120 = "#C3C5CB"; // icons
const gray130 = "#D1D3D9"; // primary UI text
const gray150 = "#E9EAEE"; // emphasized text
const white = "#FFFFFF";
const black = "#000000";
const transparent = "#00000000";

// Blue ramp — accent, selection, focus
const blue30 = "#1B283F"; // muted info surface (multi-selected tabs)
const blue40 = "#233558"; // selected tab, info banners/validation, muted selection
const blue50 = "#2A4371"; // list / menu / completion selection
const blue60 = "#2E4D89"; // selected tab border, toggled options, secondary accent borders
const blue70 = "#2F5EB9"; // accent hover
const blue80 = "#3871E1"; // accent: primary buttons, focus ring, progress, selected activity item
const blue90 = "#538AF9"; // completion match text, blue badge
const blue100 = "#71A1FE"; // links, modified-setting marker
const blue110 = "#92B7FF"; // completion match text on the selected row
const blueVivid = "#3574F0"; // checked boxes, chart lines, selected terminal block

// Green / red / yellow / purple ramps — feedback surfaces and accents
const green40 = "#203B2A";
const green60 = "#29583C";
const green80 = "#338555"; // success / running accent
const green100 = "#6DB083"; // success text
const red40 = "#56272B"; // error surface
const red60 = "#80383E"; // error surface border
const red70 = "#A4414A";
const red80 = "#C54E58"; // error accent / error border
const red100 = "#F57E84"; // error text
const yellow40 = "#44321D"; // warning surface
const yellow60 = "#694820"; // warning surface border
const yellow70 = "#875817";
const yellow80 = "#A56906"; // warning accent / warning border
const yellow100 = "#D59637"; // warning text
const yellow110 = "#E4AD5F"; // match text on the selected row
const purple20 = "#261E3C"; // AI surface
const purple50 = "#4A387B"; // AI surface border
const purple70 = "#6C4EBB";
const purple100 = "#A894F6";
const purple140 = "#E2DBFC";
const orange100 = "#E18C71";
const teal100 = "#6AAEA6";
const matchGold = "#BA9752"; // matched characters in lists and type-to-find
const shellTint = "#3F448D"; // gradient tint of the agents shell

// Translucent washes, shadow and scrollbar thumbs
const wash05 = "#FFFFFF0A"; // hovered terminal block
const wash10 = "#FFFFFF10"; // list / tree / editor hover
const wash20 = "#FFFFFF17"; // toolbar / tab / status item hover
const wash30 = "#FFFFFF21"; // separators on the frame
const wash40 = "#FFFFFF29"; // pressed state, neutral badge
const wash50 = "#FFFFFF3B"; // keybinding outline, sash grips
const shadow = "#00000020";
const dropTarget = "#366ACF4D"; // drag-and-drop target area
const whiteMuted = "#FFFFFFCC"; // text on neutral translucent badges
const scrollbarThumb = "#80808059";
const scrollbarThumbHover = "#8080808C";
const minimapThumb = "#80808033";
const windowBorder = "#5A5D63";

// Icon colors (status glyphs, symbol kinds, run / debug controls)
const iconRed = "#DB5C5C"; // error, breakpoint, stop, methods / functions
const iconYellow = "#F2C55C"; // warning, failed test, light bulb, execution point
const iconBlue = "#548AF7"; // info, classes / types, running
const iconGreen = "#57965C"; // success, run / debug / resume, interfaces
const iconOrange = "#C77D55"; // fields / variables / constants
const iconPurple = "#A571E6"; // enums
const iconLavender = "#B589EC"; // properties, AI
const iconAmber = "#D6AE58"; // exceptions
const aiPurple = "#955AE0"; // AI working accent

// Checkbox / radio glyphs
const checkFill = "#2B2D30";
const checkBorder = "#5A5D63";
const checkSelected = blueVivid;
const checkDisabledFill = "#393B40";
const checkDisabledMark = "#6F737A";

// ─────────────────────────────────────────────────────────────────────────────
// Editor palette
// ─────────────────────────────────────────────────────────────────────────────

const editorBackground = gray10;
const editorForeground = "#BCBEC4";
const caret = "#CED0D6";
const caretRow = "#1F2024";
const lineNumber = "#4B5059";
const lineNumberActive = "#A1A3AB";
const indentGuide = "#323438"; // indent guides, rulers
const indentGuideActive = "#4E5157"; // active indent guide, matched-bracket guide
const whitespace = "#6F737A";
const selection = "#214283";
const selectionInactive = "#4C4F56";
const popupEditorBackground = "#27282B"; // completion list and documentation popups
const codeBlockBackground = "#2B2D30"; // markdown code blocks / quotes, diff separators
const inlineCodeBackground = "#343539";
const inlineCodeForeground = "#CED0D6";
const foldedForeground = "#868991";
const foldedBackground = "#393B40";
const inlayBackground = "#393B40";
const inlayForeground = "#868A91";
const inlayParameterForeground = "#858A94";
const inlayTextForeground = "#727782"; // hints without background: code lens
const ghostText = "#808080"; // inline completions
const matchedBracket = "#43454A";
const breadcrumbForeground = "#9DA0A8";
const breadcrumbActive = "#DFE1E5";

// Highlights — each kind keeps its own hue:
//   teal  → find results (box border + scrollbar mark)
//   green → usages / navigation targets
//   gray-green / rose → occurrences under the caret (read / write)
const textSearch = "#114957";
const textSearchBorder = "#165E70";
const textSearchMark = "#72D6D6";
const usage = "#2D543F";
const usageMark = "#42BD77";
const caretWord = "#373B39";
const caretWordMark = "#5B786A";
const caretWriteWord = "#402F33";
const caretWriteWordMark = "#BA6387";
const liveTemplate = "#467FF2"; // snippet placeholders, linked editing
const liveTemplateInactive = "#9DA0A8";
const hyperlink = "#548AF7";

// Diagnostics (underline color + scrollbar mark)
const errorUnderline = "#FA6675";
const errorMark = "#D64D5B";
const warningUnderline = "#F2C55C";
const warningMark = "#C29E4A";
const weakWarning = "#857042"; // information-level diagnostics
const errorHint = "#402929"; // inline test-failure line

// Debugging
const executionLine = "#2A5091";
const otherFrameLine = "#273552";
const inlineValue = "#666D75";
const debugValue = "#F0AC81";
const debugType = "#6F737A";
const debugChanged = "#548AF7";

// Version control
const gutterAdded = "#549159";
const gutterModified = "#375FAD";
const gutterDeleted = "#868A91";
const diffInserted = "#294436";
const diffInsertedMark = "#447152";
const diffDeleted = "#484A4A";
const diffDeletedMark = "#656E76";
const diffModified = "#385570";
const diffModifiedMark = "#43698D";
const diffConflict = "#45302B";
const diffConflictMark = "#8F5247";
const fileAdded = "#73BD79";
const fileModified = "#70AEFF";
const fileDeleted = "#6F737A";
const fileUnversioned = "#E88F89";
const fileIgnored = "#D69A6B";
const fileConflict = "#DE6A66";
const modifiedTab = "#4083C9";
const blameText = "#8D9199";
const branchHead = "#F5D273";
const branchLocal = "#5FAD65";
const branchRemote = "#B589EC";
const branchTag = "#868A91";
const coverageFull = "#375239";
const coveragePartial = "#5E4D33";
const coverageNone = "#5E3838";

// ─────────────────────────────────────────────────────────────────────────────
// Syntax colors
// ─────────────────────────────────────────────────────────────────────────────
// Language defaults. Calls, classes, types, parameters and local variables are
// deliberately plain text; color marks declarations, members and literals.

const synKeyword = "#CF8E6D"; // keywords, primitive types, escapes, markup markers
const synString = "#6AAB73";
const synNumber = "#2AACB8";
const synComment = "#7A7E85"; // line / block comments
const synDocComment = "#5F826B"; // doc comments, docstrings (italic)
const synDocTag = "#67A37C"; // @param, @return …
const synDocTagValue = "#ABADB3"; // doc tag arguments
const synFunction = "#56A8F5"; // function / method declarations
const synMethod = "#57AAF7"; // static / instance member functions
const synMember = "#C77DBB"; // fields, properties, object keys, constants (italic)
const synMetadata = "#B3AE60"; // annotations, decorators, attributes
const synTypeParameter = "#16BAAC";
const synTag = "#D5B778"; // HTML / XML tags, CSS selectors and functions
const synCustomTag = "#2FBAA3";
const synAttribute = "#BABABA"; // HTML attribute names, CSS property names
const synEntity = "#56A8F5"; // HTML entities, CSS colors
const synInvalid = "#F75464"; // bad characters, unmatched brackets, unresolved references
const synTodo = "#8BB33D";
const synRegexpClass = "#B2AE60";
const synSeparator = "#808080"; // key-value separators in properties files

// Language-specific colors
const jsLocalVariable = "#A9B7C6";
const jsGlobalVariable = "#C77DBA";
const jsComponent = "#9C9CFF"; // JSX / TSX components
const jsRegexp = "#42C3D4";
const tsTypeParameter = "#507874";
const cssUrl = "#5C92FF";
const yamlAnchor = "#E8BF6A";
const kotlinLabel = "#32B8AF";
const pySelf = "#94558D";
const pyBuiltin = "#8888C6";
const pyKeywordArgument = "#AA4926";
const pyMagic = "#B200B2";
const pyBytes = "#A5C261";
const goBuiltin = "#CC7832";
const goCall = "#B09D79";
const goPackage = "#AFBF7E";
const goType = "#6FAFBD";
const rsType = "#86985D"; // structs, enums, unions, type aliases
const rsVariant = "#6DA1AB";
const rsTrait = "#8D91DC"; // traits, crates
const rsLifetime = "#20999D"; // lifetimes, type parameters
const rsMacro = "#4EADE5";
const rsSelf = "#D98EB3";
const rsStatic = "#9876AA";
const rsQuestion = "#CC7832";
const phpVariable = "#9876AA";
const phpNamedArgument = "#467CDA";
const rbMethod = "#FFC66D";
const rbSymbol = "#89A6AF";
const rbGlobal = "#D0D0FF";
const rbEscape = "#CC7832";
const lessVariable = "#D0D0FF";
const rbRegexp = "#979E5A";
const rbComment = "#808080";
const rbNumber = "#74A4C8";
const rbLocal = "#D4B01D";
const rbConstant = "#FEFFF9";
const rbSpecialCall = "#FC9800";
const shCommand = "#C57633";

// ─────────────────────────────────────────────────────────────────────────────
// Terminal
// ─────────────────────────────────────────────────────────────────────────────
// VS Code re-tints any ANSI color below `terminal.integrated.minimumContrastRatio`
// (default 4.5), so black and bright black text are lifted at render time.

const terminalAnsi = {
  black: black,
  red: "#F27481",
  green: "#6BCC62",
  yellow: "#E0CE70",
  blue: "#5594FA",
  magenta: "#C092FA",
  cyan: "#47CCBD",
  white: "#CED0D6",
  brightBlack: "#4E5157",
  brightRed: "#FF6B7A",
  brightGreen: "#67FF59",
  brightYellow: "#FFEC1A",
  brightBlue: "#3399FF",
  brightMagenta: "#D970FF",
  brightCyan: "#40FFE9",
  brightWhite: white,
};
const terminalBlock = "#2B2D30"; // command block / pinned command
const terminalBlockSeparator = "#393B40";
const terminalSelectedBlock = blueVivid;
const terminalSearchMatch = "#FFEA00";
const terminalSearchCurrent = "#FF941A";

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
function overlay(target: string, alpha: number, base: string = editorBackground): string {
  const t = toRgb(target);
  const b = toRgb(base);
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return toHex(t.map((v, i) => (v - (1 - alpha) * b[i]) / alpha)) + alphaHex;
}

// Changed lines use 40% of the diff color over the editor background; changed
// words inside them use the full diff color on top of that line tint.
const diffLine = (color: string): string => color + "66";
const diffWord = (color: string): string =>
  overlay(color, 0.8, mix(color, editorBackground, 0.4));

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
    foreground: gray130,
    disabledForeground: gray60,
    descriptionForeground: gray100,
    errorForeground: red100,
    focusBorder: blue80,
    strongForeground: white,
    "icon.foreground": gray120,
    "selection.background": blue50,
    "sash.hoverBorder": blue80,
    "widget.border": gray40,
    "widget.shadow": shadow,
    "window.activeBorder": windowBorder,
    "window.inactiveBorder": gray50,
    "scrollbar.shadow": transparent,
    "scrollbar.background": transparent,
    "scrollbarSlider.background": scrollbarThumb,
    "scrollbarSlider.hoverBackground": scrollbarThumbHover,
    "scrollbarSlider.activeBackground": scrollbarThumbHover,
    "progressBar.background": blue80,

    // ── Text ──
    "textLink.foreground": blue100,
    "textLink.activeForeground": blue100,
    "textBlockQuote.background": codeBlockBackground,
    "textBlockQuote.border": synComment,
    "textCodeBlock.background": codeBlockBackground,
    "textPreformat.foreground": inlineCodeForeground,
    "textPreformat.background": inlineCodeBackground,
    "textPreformat.border": transparent,
    "textSeparator.foreground": gray40,

    // ── Toolbars ──
    "toolbar.hoverBackground": wash20,
    "toolbar.activeBackground": wash40,
    "toolbar.hoverOutline": transparent,
    "actionBar.toggledBackground": blue60,

    // ── Frame: title bar, command center, menu bar ──
    "titleBar.activeBackground": gray30,
    "titleBar.activeForeground": gray130,
    "titleBar.inactiveBackground": gray30,
    "titleBar.inactiveForeground": gray100,
    "titleBar.border": transparent,
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
    // Panel borders match the panel surface, so a panel is defined only by its
    // contrast with the frame around it.
    "modernUI.shellBackground": gray30,
    "modernUI.inactiveShellBackground": gray30,
    "surface.background": gray10,
    "surface.foreground": gray130,
    "surface.border": gray10,
    "editor.border": gray10,
    "modernPanel.border": gray10,
    "modernSash.gripForeground": wash50,
    "modernActivityBar.background": gray30,
    "modernActivityBar.inactiveBackground": gray30,
    "modernActivityBar.border": transparent,
    "modernActivityBarItem.activeBackground": blue80,
    "modernActivityBarItem.activeForeground": white,
    "modernActivityBarItem.hoverBackground": wash20,
    "modernActivityBarItem.hoverForeground": gray130,
    // Modern tabs: the selected tab is a blue-tinted pill.
    "modernTab.activeBackground": blue40,
    "modernTab.activeForeground": gray130,
    "modernTab.hoverBackground": wash20,
    "modernTab.hoverForeground": gray130,
    "modernEditorTab.activeBackground": blue40,
    "modernEditorTab.activeForeground": gray130,
    "modernEditorTab.activeHoverBackground": blue50,
    "modernEditorTab.inactiveBackground": transparent,
    "modernEditorTab.hoverBackground": wash20,
    "modernEditorTab.hoverForeground": gray130,
    "modernEditorTab.activeActionBackground": blue40,
    "modernEditorTab.activeHoverActionBackground": blue50,
    "modernEditorTab.hoverActionBackground": mix(white, editorBackground, 0x17 / 255),
    "modernEditorTab.selectedActionBackground": blue30,
    "browser.border": gray30,

    // ── Activity bar ──
    // The activity bar sits on the frame; the active item is a solid accent
    // tile with a white glyph instead of an edge indicator.
    "activityBar.background": gray30,
    "activityBar.foreground": white,
    "activityBar.inactiveForeground": gray120,
    "activityBar.border": transparent,
    "activityBar.activeBorder": transparent,
    "activityBar.activeBackground": blue80,
    "activityBar.activeFocusBorder": white,
    "activityBar.dropBorder": blue80,
    "activityBarBadge.background": blue90,
    "activityBarBadge.foreground": gray10,
    "activityErrorBadge.background": red80,
    "activityErrorBadge.foreground": white,
    "activityWarningBadge.background": yellow80,
    "activityWarningBadge.foreground": white,
    // Activity bar docked at the top of the side bar — inside the panel.
    "activityBarTop.background": gray10,
    "activityBarTop.foreground": gray130,
    "activityBarTop.inactiveForeground": gray100,
    "activityBarTop.activeBackground": blue40,
    "activityBarTop.activeBorder": transparent,
    "activityBarTop.dropBorder": blue80,

    // ── Side bar ──
    "sideBar.background": gray10,
    "sideBar.foreground": gray130,
    "sideBar.border": gray30,
    "sideBar.dropBackground": dropTarget,
    "sideBarTitle.background": gray10,
    "sideBarTitle.foreground": gray130,
    "sideBarTitle.border": gray30,
    "sideBarSectionHeader.background": gray10,
    "sideBarSectionHeader.foreground": gray130,
    "sideBarSectionHeader.border": gray30,
    "sideBarActivityBarTop.border": gray30,
    "sideBarStickyScroll.background": gray10,
    "sideBarStickyScroll.border": gray30,
    "sideBarStickyScroll.shadow": shadow,

    // ── Panel (problems, output, debug console, terminal, ports) ──
    "panel.background": gray10,
    "panel.border": gray30,
    "panel.dropBorder": blue80,
    "panelTitle.activeForeground": gray130,
    "panelTitle.inactiveForeground": gray100,
    "panelTitle.activeBorder": blue80,
    "panelTitle.border": gray30,
    "panelTitleBadge.background": gray80,
    "panelTitleBadge.foreground": black,
    "panelSection.border": gray30,
    "panelSection.dropBackground": dropTarget,
    "panelSectionHeader.background": gray10,
    "panelSectionHeader.foreground": gray130,
    "panelSectionHeader.border": gray30,
    "panelInput.border": gray50,
    "panelStickyScroll.background": gray10,
    "panelStickyScroll.border": gray30,
    "panelStickyScroll.shadow": shadow,
    "outputView.background": gray10,
    "outputViewStickyScroll.background": gray10,

    // ── Status bar ──
    "statusBar.background": gray30,
    "statusBar.foreground": gray100,
    "statusBar.border": transparent,
    "statusBar.inactiveBackground": gray30,
    "statusBar.focusBorder": blue80,
    "statusBar.noFolderBackground": gray30,
    "statusBar.noFolderForeground": gray100,
    "statusBar.noFolderBorder": transparent,
    "statusBar.debuggingBackground": green80,
    "statusBar.debuggingForeground": white,
    "statusBar.debuggingBorder": transparent,
    "statusBarItem.hoverBackground": wash20,
    "statusBarItem.hoverForeground": gray130,
    "statusBarItem.activeBackground": wash40,
    "statusBarItem.compactHoverBackground": wash40,
    "statusBarItem.focusBorder": blue80,
    "statusBarItem.prominentBackground": wash30,
    "statusBarItem.prominentForeground": gray130,
    "statusBarItem.prominentHoverBackground": wash40,
    "statusBarItem.prominentHoverForeground": gray130,
    "statusBarItem.remoteBackground": blue80,
    "statusBarItem.remoteForeground": white,
    "statusBarItem.remoteHoverBackground": blue70,
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
    // Tabs live inside the editor panel: the strip shares the editor
    // background, the selected tab is a blue-tinted block with a blue edge, and
    // unselected labels are dimmed to 75%.
    "editorGroup.border": gray30,
    "editorGroup.dropBackground": dropTarget,
    "editorGroup.emptyBackground": editorBackground,
    "editorGroup.focusedEmptyBorder": blue80,
    "editorGroup.dropIntoPromptBackground": gray30,
    "editorGroup.dropIntoPromptForeground": gray130,
    "editorGroup.dropIntoPromptBorder": gray40,
    "editorGroupHeader.tabsBackground": editorBackground,
    "editorGroupHeader.noTabsBackground": editorBackground,
    "editorGroupHeader.connectedTabsBackground": editorBackground,
    "editorGroupHeader.tabsBorder": gray30,
    "editorGroupHeader.border": gray30,
    "editorPane.background": editorBackground,
    "sideBySideEditor.horizontalBorder": gray30,
    "sideBySideEditor.verticalBorder": gray30,
    "tab.activeBackground": blue40,
    "tab.activeForeground": gray130,
    "tab.activeBorder": blue60,
    "tab.activeBorderTop": transparent,
    "tab.inactiveBackground": editorBackground,
    "tab.inactiveForeground": gray130 + "BF",
    "tab.hoverBackground": wash20,
    "tab.hoverForeground": gray130,
    "tab.hoverBorder": transparent,
    "tab.unfocusedActiveBackground": gray30,
    "tab.unfocusedActiveForeground": gray130,
    "tab.unfocusedActiveBorder": gray50,
    "tab.unfocusedActiveBorderTop": transparent,
    "tab.unfocusedInactiveBackground": editorBackground,
    "tab.unfocusedInactiveForeground": gray130 + "BF",
    "tab.unfocusedHoverBackground": wash20,
    "tab.unfocusedHoverForeground": gray130,
    "tab.unfocusedHoverBorder": transparent,
    "tab.selectedBackground": blue30,
    "tab.selectedForeground": gray130,
    "tab.selectedBorderTop": transparent,
    "tab.border": transparent,
    "tab.divider": transparent,
    "tab.lastPinnedBorder": wash30,
    "tab.dragAndDropBorder": blue80,
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
    "editor.lineHighlightBackground": caretRow,
    "editor.inactiveLineHighlightBackground": caretRow,
    "editor.lineHighlightBorder": transparent,
    "editorLineNumber.foreground": lineNumber,
    "editorLineNumber.activeForeground": lineNumberActive,
    "editorLineNumber.dimmedForeground": mix(lineNumber, editorBackground, 0.5),
    "editorGutter.background": editorBackground,
    "editor.compositionBorder": caret,
    "editor.placeholder.foreground": gray80,

    // Selection — solid; selected code keeps its syntax colors.
    "editor.selectionBackground": selection,
    "editor.inactiveSelectionBackground": overlay(selectionInactive, 0.8),
    // Occurrences of the word / selection under the caret.
    "editor.selectionHighlightBackground": overlay(caretWord, 0.8),
    "editor.selectionHighlightBorder": transparent,
    "editor.wordHighlightBackground": overlay(caretWord, 0.8),
    "editor.wordHighlightBorder": transparent,
    "editor.wordHighlightStrongBackground": overlay(caretWriteWord, 0.8),
    "editor.wordHighlightStrongBorder": transparent,
    "editor.wordHighlightTextBackground": overlay(caretWord, 0.8),
    "editor.wordHighlightTextBorder": transparent,

    // Find — every result gets a teal block with a teal box; the current one is
    // the selection inside that box. Match foregrounds stay unset so matched
    // code keeps its syntax colors.
    "editor.findMatchBackground": selection,
    "editor.findMatchBorder": textSearchBorder,
    "editor.findMatchHighlightBackground": overlay(textSearch, 0.8),
    "editor.findMatchHighlightBorder": textSearchBorder,
    "editor.findRangeHighlightBackground": wash10,
    "editor.findRangeHighlightBorder": transparent,
    "searchEditor.findMatchBackground": overlay(textSearch, 0.8),
    "searchEditor.findMatchBorder": textSearchBorder,
    "searchEditor.textInputBorder": gray50,
    "search.resultsInfoForeground": gray100,

    "editor.hoverHighlightBackground": wash10,
    "editor.rangeHighlightBackground": wash10,
    "editor.rangeHighlightBorder": transparent,
    "editor.symbolHighlightBackground": overlay(usage, 0.8),
    "editor.symbolHighlightBorder": transparent,
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

    // Brackets — brackets keep the text color at every nesting level; the
    // matching pair gets a block and its guide lights up.
    "editorBracketMatch.background": overlay(matchedBracket, 0.8),
    "editorBracketMatch.border": transparent,
    "editorBracketHighlight.foreground1": editorForeground,
    "editorBracketHighlight.foreground2": editorForeground,
    "editorBracketHighlight.foreground3": editorForeground,
    "editorBracketHighlight.foreground4": editorForeground,
    "editorBracketHighlight.foreground5": editorForeground,
    "editorBracketHighlight.foreground6": editorForeground,
    "editorBracketHighlight.unexpectedBracket.foreground": synInvalid,
    "editorBracketPairGuide.background1": indentGuide,
    "editorBracketPairGuide.background2": indentGuide,
    "editorBracketPairGuide.background3": indentGuide,
    "editorBracketPairGuide.background4": indentGuide,
    "editorBracketPairGuide.background5": indentGuide,
    "editorBracketPairGuide.background6": indentGuide,
    "editorBracketPairGuide.activeBackground1": indentGuideActive,
    "editorBracketPairGuide.activeBackground2": indentGuideActive,
    "editorBracketPairGuide.activeBackground3": indentGuideActive,
    "editorBracketPairGuide.activeBackground4": indentGuideActive,
    "editorBracketPairGuide.activeBackground5": indentGuideActive,
    "editorBracketPairGuide.activeBackground6": indentGuideActive,

    // Folding
    "editor.foldBackground": foldedBackground + "40",
    "editor.foldPlaceholderForeground": foldedForeground,
    "editorGutter.foldingControlForeground": gray100,

    // Unused code — dimmed to ~53%, which renders default text at the unused
    // gray (#6F737A).
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
    "problemsInfoIcon.foreground": iconBlue,

    // Sticky scroll
    "editorStickyScroll.background": editorBackground,
    "editorStickyScroll.border": gray30,
    "editorStickyScroll.shadow": shadow,
    "editorStickyScrollGutter.background": editorBackground,
    "editorStickyScrollHover.background": wash10,

    // Gutter — change bars: added green, modified blue, deleted gray.
    "editorGutter.addedBackground": gutterAdded,
    "editorGutter.modifiedBackground": gutterModified,
    "editorGutter.deletedBackground": gutterDeleted,
    "editorGutter.addedSecondaryBackground": green60,
    "editorGutter.modifiedSecondaryBackground": blue60,
    "editorGutter.deletedSecondaryBackground": gray60,
    "editorGutter.commentRangeForeground": gray50,
    "editorGutter.commentGlyphForeground": gray120,
    "editorGutter.commentUnresolvedGlyphForeground": iconBlue,
    "editorGutter.commentDraftGlyphForeground": gray100,
    "editorGutter.itemBackground": gray40,
    "editorGutter.itemGlyphForeground": gray120,

    // Overview ruler — scrollbar marks
    "editorOverviewRuler.background": editorBackground,
    "editorOverviewRuler.border": transparent,
    "editorOverviewRuler.findMatchForeground": textSearchMark,
    "editorOverviewRuler.rangeHighlightForeground": gray80,
    "editorOverviewRuler.selectionHighlightForeground": caretWordMark,
    "editorOverviewRuler.wordHighlightForeground": caretWordMark,
    "editorOverviewRuler.wordHighlightStrongForeground": caretWriteWordMark,
    "editorOverviewRuler.wordHighlightTextForeground": caretWordMark,
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
    "editorOverviewRuler.commentUnresolvedForeground": iconBlue,
    "editorOverviewRuler.commentDraftForeground": gray100,
    "editorOverviewRuler.inlineChatInserted": diffInsertedMark,
    "editorOverviewRuler.inlineChatRemoved": diffDeletedMark,
    "editorOverviewRuler.agentFeedbackForeground": iconBlue,

    // Minimap
    "minimap.background": editorBackground,
    "minimap.foregroundOpacity": "#000000CC",
    "minimap.findMatchHighlight": textSearchMark,
    "minimap.selectionHighlight": selection,
    "minimap.selectionOccurrenceHighlight": caretWordMark,
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
    "editorWidget.border": gray30,
    "editorWidget.resizeBorder": blue80,
    "editorHoverWidget.background": popupEditorBackground,
    "editorHoverWidget.foreground": gray130,
    "editorHoverWidget.border": gray40,
    "editorHoverWidget.statusBarBackground": gray30,
    "editorHoverWidget.highlightForeground": white, // active parameter in signature help
    "editorSuggestWidget.background": popupEditorBackground,
    "editorSuggestWidget.foreground": editorForeground,
    "editorSuggestWidget.border": gray40,
    "editorSuggestWidget.selectedBackground": blue50,
    "editorSuggestWidget.selectedForeground": gray130,
    "editorSuggestWidget.selectedIconForeground": gray120,
    "editorSuggestWidget.highlightForeground": blue90,
    "editorSuggestWidget.focusHighlightForeground": blue110,
    "editorSuggestWidget.focusOutline": transparent,
    "editorSuggestWidgetStatus.foreground": gray80,
    "editorActionList.background": gray30,
    "editorActionList.foreground": gray130,
    "editorActionList.focusBackground": blue50,
    "editorActionList.focusForeground": gray130,

    // Error / warning navigation (F8)
    "editorMarkerNavigation.background": gray20,
    "editorMarkerNavigationError.background": red80,
    "editorMarkerNavigationError.headerBackground": red40,
    "editorMarkerNavigationWarning.background": yellow80,
    "editorMarkerNavigationWarning.headerBackground": yellow40,
    "editorMarkerNavigationInfo.background": blue80,
    "editorMarkerNavigationInfo.headerBackground": blue40,

    // Peek view — embedded editor on the inline surface, results on the popup
    // surface; usages are marked green.
    "peekView.border": gray40,
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
    "peekViewResult.selectionBackground": blue50,
    "peekViewResult.selectionForeground": gray130,
    "peekViewTitle.background": gray30,
    "peekViewTitleLabel.foreground": gray130,
    "peekViewTitleDescription.foreground": gray100,

    // ── Diff editor ──
    // Inserted = green, removed = gray (deletions read as gray throughout,
    // matching the gutter bar and file decoration).
    "diffEditor.insertedLineBackground": diffLine(diffInserted),
    "diffEditor.removedLineBackground": diffLine(diffDeleted),
    "diffEditor.insertedTextBackground": diffWord(diffInserted),
    "diffEditor.removedTextBackground": diffWord(diffDeleted),
    "diffEditor.insertedTextBorder": transparent,
    "diffEditor.removedTextBorder": transparent,
    "diffEditorGutter.insertedLineBackground": diffLine(diffInserted),
    "diffEditorGutter.removedLineBackground": diffLine(diffDeleted),
    "diffEditorOverview.insertedForeground": diffInsertedMark,
    "diffEditorOverview.removedForeground": diffDeletedMark,
    "diffEditor.border": gray30,
    "diffEditor.diagonalFill": gray40 + "80",
    "diffEditor.unchangedRegionBackground": codeBlockBackground,
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
    // common base = deleted gray; unresolved conflicts are outlined in the
    // conflict red-brown.
    "merge.currentHeaderBackground": overlay(diffModified, 0.8),
    "merge.currentContentBackground": diffLine(diffModified),
    "merge.incomingHeaderBackground": overlay(diffInserted, 0.8),
    "merge.incomingContentBackground": diffLine(diffInserted),
    "merge.commonHeaderBackground": overlay(diffDeleted, 0.8),
    "merge.commonContentBackground": diffLine(diffDeleted),
    "merge.border": transparent,
    "mergeEditor.change.background": diffLine(diffModified),
    "mergeEditor.change.word.background": diffWord(diffModified),
    "mergeEditor.changeBase.background": diffLine(diffDeleted),
    "mergeEditor.changeBase.word.background": diffWord(diffDeleted),
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
    "gitDecoration.addedResourceForeground": fileAdded,
    "gitDecoration.modifiedResourceForeground": fileModified,
    "gitDecoration.deletedResourceForeground": fileDeleted,
    "gitDecoration.renamedResourceForeground": fileModified,
    "gitDecoration.untrackedResourceForeground": fileUnversioned,
    "gitDecoration.ignoredResourceForeground": fileIgnored,
    "gitDecoration.conflictingResourceForeground": fileConflict,
    "gitDecoration.submoduleResourceForeground": gray100,
    "gitDecoration.stageModifiedResourceForeground": fileModified,
    "gitDecoration.stageDeletedResourceForeground": fileDeleted,
    "git.blame.editorDecorationForeground": blameText,
    // History graph — lanes on the accent ramp; refs: local branch green,
    // remote purple, base ref yellow.
    "scmGraph.foreground1": blue100,
    "scmGraph.foreground2": green100,
    "scmGraph.foreground3": purple100,
    "scmGraph.foreground4": orange100,
    "scmGraph.foreground5": teal100,
    "scmGraph.historyItemRefColor": branchLocal,
    "scmGraph.historyItemRemoteRefColor": branchRemote,
    "scmGraph.historyItemBaseRefColor": branchHead,
    "scmGraph.historyItemHoverDefaultLabelBackground": blue90,
    "scmGraph.historyItemHoverDefaultLabelForeground": gray10,
    "scmGraph.historyItemHoverLabelForeground": gray10,
    "scmGraph.historyItemHoverAdditionsForeground": fileAdded,
    "scmGraph.historyItemHoverDeletionsForeground": red100,

    // ── Quick input / command palette ──
    "quickInput.background": gray30,
    "quickInput.foreground": gray130,
    "quickInputTitle.background": gray30,
    "quickInputList.focusBackground": blue50,
    "quickInputList.focusForeground": gray130,
    "quickInputList.focusIconForeground": gray120,
    "quickInputList.focusHighlightForeground": yellow110,
    "pickerGroup.border": gray40,
    "pickerGroup.foreground": gray80,

    // ── Menus ──
    "menu.background": gray30,
    "menu.foreground": gray130,
    "menu.border": gray40,
    "menu.selectionBackground": blue50,
    "menu.selectionForeground": gray130,
    "menu.selectionBorder": transparent,
    "menu.separatorBackground": gray40,

    // ── Lists / trees ──
    // Selection keeps the normal text color; keyboard focus without selection
    // gets the muted accent. Matched characters are gold, as in type-to-find.
    "list.activeSelectionBackground": blue50,
    "list.activeSelectionForeground": gray130,
    "list.activeSelectionIconForeground": gray120,
    "list.inactiveSelectionBackground": gray40,
    "list.inactiveSelectionForeground": gray130,
    "list.inactiveSelectionIconForeground": gray120,
    "list.hoverBackground": wash10,
    "list.hoverForeground": gray130,
    "list.focusBackground": blue40,
    "list.focusForeground": gray130,
    "list.focusOutline": transparent,
    "list.focusAndSelectionOutline": transparent,
    "list.inactiveFocusBackground": transparent,
    "list.inactiveFocusOutline": transparent,
    "list.highlightForeground": matchGold,
    "list.focusHighlightForeground": yellow110,
    "list.filterMatchBackground": matchGold + "40",
    "list.filterMatchBorder": matchGold,
    "list.dropBackground": blueVivid + "26",
    "list.dropBetweenBackground": blue80,
    "list.errorForeground": red100,
    "list.warningForeground": yellow100,
    "list.invalidItemForeground": red100,
    "list.deemphasizedForeground": gray80,
    "listFilterWidget.background": gray10,
    "listFilterWidget.outline": gray50,
    "listFilterWidget.noMatchesOutline": red80,
    "listFilterWidget.shadow": shadow,
    "tree.indentGuidesStroke": gray50,
    "tree.inactiveIndentGuidesStroke": gray40,
    "tree.tableColumnsBorder": gray30,
    "tree.tableOddRowsBackground": gray20,

    // ── Inputs ──
    // Outlined fields on the surface they sit on.
    "input.background": gray10,
    "input.foreground": gray130,
    "input.border": gray50,
    "input.placeholderForeground": gray80,
    "inputOption.activeBackground": blue60,
    "inputOption.activeBorder": blue60,
    "inputOption.activeForeground": white,
    "inputOption.hoverBackground": wash20,
    "inputValidation.errorBackground": red40,
    "inputValidation.errorBorder": red60,
    "inputValidation.errorForeground": gray130,
    "inputValidation.warningBackground": yellow40,
    "inputValidation.warningBorder": yellow60,
    "inputValidation.warningForeground": gray130,
    "inputValidation.infoBackground": blue40,
    "inputValidation.infoBorder": blue60,
    "inputValidation.infoForeground": gray130,
    "dropdown.background": gray30,
    "dropdown.foreground": gray130,
    "dropdown.border": gray50,
    "dropdown.listBackground": gray30,

    // ── Buttons and toggles ──
    "button.background": blue80,
    "button.foreground": white,
    "button.border": blue80,
    "button.hoverBackground": blue70,
    "button.separator": wash50,
    "button.secondaryBackground": transparent,
    "button.secondaryForeground": gray130,
    "button.secondaryBorder": gray50,
    "button.secondaryHoverBackground": wash20,
    "checkbox.background": checkFill,
    "checkbox.foreground": gray130,
    "checkbox.border": checkBorder,
    "checkbox.selectBackground": checkFill,
    "checkbox.selectBorder": checkSelected,
    "checkbox.disabled.background": checkDisabledFill,
    "checkbox.disabled.foreground": checkDisabledMark,
    "radio.activeBackground": blue60,
    "radio.activeForeground": white,
    "radio.activeBorder": blue60,
    "radio.inactiveBackground": transparent,
    "radio.inactiveForeground": gray130,
    "radio.inactiveBorder": gray50,
    "radio.inactiveHoverBackground": wash20,

    // ── Badges ──
    // Counters are neutral gray with dark digits; notification-style badges
    // are light blue with dark digits.
    "badge.background": gray80,
    "badge.foreground": black,
    "profileBadge.background": gray80,
    "profileBadge.foreground": black,
    "extensionBadge.remoteBackground": blue90,
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
    "settings.modifiedItemIndicator": blue100,
    "settings.headerBorder": gray30,
    "settings.sashBorder": gray30,
    "settings.dropdownBackground": gray30,
    "settings.dropdownForeground": gray130,
    "settings.dropdownBorder": gray50,
    "settings.dropdownListBorder": gray40,
    "settings.checkboxBackground": checkFill,
    "settings.checkboxForeground": gray130,
    "settings.checkboxBorder": checkBorder,
    "settings.textInputBackground": gray10,
    "settings.textInputForeground": gray130,
    "settings.textInputBorder": gray50,
    "settings.numberInputBackground": gray10,
    "settings.numberInputForeground": gray130,
    "settings.numberInputBorder": gray50,
    "settings.focusedRowBackground": wash20,
    "settings.focusedRowBorder": blue80,
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
    "notificationLink.foreground": blue100,
    "notificationCenter.border": gray40,
    "notificationCenterHeader.background": gray40,
    "notificationCenterHeader.foreground": gray130,
    "notificationToast.border": gray40,
    "notificationsErrorIcon.foreground": iconRed,
    "notificationsWarningIcon.foreground": iconYellow,
    "notificationsInfoIcon.foreground": iconBlue,
    "banner.background": blue40,
    "banner.foreground": gray130,
    "banner.iconForeground": iconBlue,

    // ── Extensions ──
    "extensionButton.background": blue80,
    "extensionButton.foreground": white,
    "extensionButton.border": blue80,
    "extensionButton.hoverBackground": blue70,
    "extensionButton.separator": wash50,
    "extensionButton.prominentBackground": blue80,
    "extensionButton.prominentForeground": white,
    "extensionButton.prominentHoverBackground": blue70,
    "extensionIcon.starForeground": iconYellow,
    "extensionIcon.verifiedForeground": iconBlue,
    "extensionIcon.preReleaseForeground": iconOrange,
    "extensionIcon.sponsorForeground": red100,
    "extensionIcon.privateForeground": gray80,
    "mcpIcon.starForeground": iconYellow,

    // ── Terminal ──
    "terminal.background": editorBackground,
    "terminal.foreground": editorForeground,
    "terminal.border": gray30,
    "terminal.tab.activeBorder": blue80,
    "terminal.dropBackground": dropTarget,
    "terminal.initialHintForeground": gray80,
    "terminal.selectionBackground": selection,
    "terminal.inactiveSelectionBackground": overlay(selectionInactive, 0.8),
    "terminal.hoverHighlightBackground": wash10,
    // Find — every match yellow, the current one orange, both translucent so
    // the output text stays readable.
    "terminal.findMatchBackground": terminalSearchCurrent + "59",
    "terminal.findMatchBorder": terminalSearchCurrent,
    "terminal.findMatchHighlightBackground": terminalSearchMatch + "40",
    "terminal.findMatchHighlightBorder": terminalSearchMatch + "80",
    "terminalCursor.foreground": caret,
    "terminalCursor.background": editorBackground,
    "terminalCommandDecoration.defaultBackground": gray80,
    "terminalCommandDecoration.successBackground": iconGreen,
    "terminalCommandDecoration.errorBackground": iconRed,
    "terminalCommandGuide.foreground": terminalSelectedBlock,
    "terminalOverviewRuler.cursorForeground": gray100,
    "terminalOverviewRuler.findMatchForeground": terminalSearchCurrent,
    "terminalOverviewRuler.border": transparent,
    "terminalStickyScroll.background": terminalBlock,
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
    "terminalSymbolIcon.aliasForeground": iconBlue,
    "terminalSymbolIcon.argumentForeground": iconOrange,
    "terminalSymbolIcon.branchForeground": branchLocal,
    "terminalSymbolIcon.commitForeground": gray120,
    "terminalSymbolIcon.fileForeground": gray120,
    "terminalSymbolIcon.folderForeground": gray120,
    "terminalSymbolIcon.flagForeground": iconPurple,
    "terminalSymbolIcon.inlineSuggestionForeground": ghostText,
    "terminalSymbolIcon.methodForeground": iconRed,
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
    "debugConsole.errorForeground": synInvalid,
    "debugConsole.sourceForeground": hyperlink,
    "debugConsoleInputIcon.foreground": iconBlue,
    "debugView.exceptionLabelBackground": red40,
    "debugView.exceptionLabelForeground": gray130,
    "debugView.stateLabelBackground": wash40,
    "debugView.stateLabelForeground": whiteMuted,
    "debugView.valueChangedHighlight": debugChanged,
    "debugTokenExpression.name": synMember,
    "debugTokenExpression.value": debugValue,
    "debugTokenExpression.string": synString,
    "debugTokenExpression.boolean": synKeyword,
    "debugTokenExpression.number": synNumber,
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
    "testing.messagePeekBorder": iconBlue,
    "testing.messagePeekHeaderBackground": blue40,
    "testing.message.error.lineBackground": overlay(errorHint, 0.8),
    "testing.message.error.badgeBackground": red80,
    "testing.message.error.badgeBorder": red80,
    "testing.message.error.badgeForeground": white,
    "testing.message.info.decorationForeground": gray100,
    "testing.message.info.lineBackground": transparent,
    "testing.coverCountBadgeBackground": gray80,
    "testing.coverCountBadgeForeground": black,
    // Coverage — full green, partial amber, none red.
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
    "notebook.focusedCellBorder": blue80,
    "notebook.focusedEditorBorder": blue80,
    "notebook.inactiveFocusedCellBorder": gray50,
    "notebook.selectedCellBackground": transparent,
    "notebook.selectedCellBorder": gray50,
    "notebook.inactiveSelectedCellBorder": gray50,
    "notebook.symbolHighlightBackground": wash10,
    "notebook.cellInsertionIndicator": blue80,
    "notebook.cellStatusBarItemHoverBackground": wash20,
    "notebook.cellToolbarSeparator": gray40,
    "notebook.outputContainerBackgroundColor": editorBackground,
    "notebook.outputContainerBorderColor": gray30,
    "notebookStatusSuccessIcon.foreground": iconGreen,
    "notebookStatusErrorIcon.foreground": iconRed,
    "notebookStatusRunningIcon.foreground": iconBlue,
    "notebookEditorOverviewRuler.runningCellForeground": iconBlue,
    "notebookScrollbarSlider.background": scrollbarThumb,
    "notebookScrollbarSlider.hoverBackground": scrollbarThumbHover,
    "notebookScrollbarSlider.activeBackground": scrollbarThumbHover,
    "interactive.activeCodeBorder": blue80,
    "interactive.inactiveCodeBorder": gray50,

    // ── Welcome / walkthrough ──
    "welcomePage.background": editorBackground,
    "welcomePage.tileBackground": gray20,
    "welcomePage.tileHoverBackground": gray30,
    "welcomePage.tileBorder": gray30,
    "welcomePage.progress.background": gray50,
    "welcomePage.progress.foreground": blue80,
    "walkThrough.embeddedEditorBackground": gray20,
    "walkthrough.stepTitle.foreground": gray130,

    // ── Comments (code review) ──
    "editorCommentsWidget.rangeBackground": iconBlue + "1A",
    "editorCommentsWidget.rangeActiveBackground": iconBlue + "33",
    "editorCommentsWidget.resolvedBorder": gray80,
    "editorCommentsWidget.unresolvedBorder": iconBlue,
    "editorCommentsWidget.replyInputBackground": gray30,
    "commentsView.resolvedIcon": gray80,
    "commentsView.unresolvedIcon": iconBlue,

    // ── Markdown alerts ──
    "markdownAlert.note.foreground": iconBlue,
    "markdownAlert.tip.foreground": iconGreen,
    "markdownAlert.important.foreground": iconLavender,
    "markdownAlert.warning.foreground": iconYellow,
    "markdownAlert.caution.foreground": iconRed,

    // ── Charts ──
    "charts.foreground": gray130,
    "charts.lines": gray40,
    "charts.red": iconRed,
    "charts.blue": iconBlue,
    "charts.yellow": iconYellow,
    "charts.orange": orange100,
    "charts.green": iconGreen,
    "charts.purple": iconPurple,
    "chart.line": blueVivid,
    "chart.axis": gray80,
    "chart.guide": gray40,

    // ── Symbol icons (outline, breadcrumbs, suggest) ──
    // Kinds share a hue per family: types blue, interfaces green, enums
    // purple, callables red, fields / variables orange, properties lavender,
    // containers and text neutral.
    "symbolIcon.classForeground": iconBlue,
    "symbolIcon.structForeground": iconBlue,
    "symbolIcon.objectForeground": iconBlue,
    "symbolIcon.typeParameterForeground": iconBlue,
    "symbolIcon.interfaceForeground": iconGreen,
    "symbolIcon.enumeratorForeground": iconPurple,
    "symbolIcon.enumeratorMemberForeground": iconPurple,
    "symbolIcon.methodForeground": iconRed,
    "symbolIcon.functionForeground": iconRed,
    "symbolIcon.constructorForeground": iconRed,
    "symbolIcon.fieldForeground": iconOrange,
    "symbolIcon.variableForeground": iconOrange,
    "symbolIcon.constantForeground": iconOrange,
    "symbolIcon.arrayForeground": iconOrange,
    "symbolIcon.booleanForeground": iconOrange,
    "symbolIcon.numberForeground": iconOrange,
    "symbolIcon.unitForeground": iconOrange,
    "symbolIcon.eventForeground": iconOrange,
    "symbolIcon.propertyForeground": iconLavender,
    "symbolIcon.keyForeground": iconLavender,
    "symbolIcon.fileForeground": gray120,
    "symbolIcon.folderForeground": gray120,
    "symbolIcon.moduleForeground": gray120,
    "symbolIcon.namespaceForeground": gray120,
    "symbolIcon.packageForeground": gray120,
    "symbolIcon.keywordForeground": gray120,
    "symbolIcon.operatorForeground": gray120,
    "symbolIcon.nullForeground": gray120,
    "symbolIcon.referenceForeground": gray120,
    "symbolIcon.snippetForeground": gray120,
    "symbolIcon.stringForeground": gray120,
    "symbolIcon.textForeground": gray120,
    "symbolIcon.colorForeground": gray120,

    // ── Inline chat ──
    // AI surfaces are tinted purple.
    "inlineChat.background": purple20,
    "inlineChat.foreground": gray130,
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
    "inlineEdit.gutterIndicator.primaryBackground": blue80 + "66",
    "inlineEdit.gutterIndicator.primaryBorder": blue80,
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
    "inlineEdit.modifiedChangedTextBackground": diffWord(diffInserted),
    "inlineEdit.originalBackground": diffDeleted + "33",
    "inlineEdit.originalBorder": diffDeletedMark,
    "inlineEdit.originalChangedLineBackground": diffLine(diffDeleted),
    "inlineEdit.originalChangedTextBackground": diffWord(diffDeleted),
    "inlineEdit.tabWillAcceptModifiedBorder": diffInsertedMark,
    "inlineEdit.tabWillAcceptOriginalBorder": diffDeletedMark,

    // ── Chat ──
    // User requests sit in a gray bubble; AI progress and slash commands use
    // the purple accent.
    "chat.requestBackground": gray10,
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
    "chat.editedFileForeground": fileModified,
    "chat.linesAddedForeground": fileAdded,
    "chat.linesRemovedForeground": red100,
    "chat.findMatchBackground": selection,
    "chat.findMatchHighlightBackground": overlay(textSearch, 0.8),
    "chat.sessionStateIndicator.inProgressBorder": iconYellow,
    "chat.sessionStateIndicator.needsInputBorder": iconRed,
    "chat.sessionStateIndicator.unvisitedBorder": iconGreen,
    "chat.mcpCompatibilityWarningForeground": yellow100,
    "chat.workingProgressStableIconForeground": iconBlue,
    "chat.workingProgressInsidersIconForeground": iconGreen,
    "agentStatusIndicator.background": wash10,

    // ── Agents window ──
    // Same model as the workbench: panels on a frame.
    "agents.background": gray30,
    "agentsPanel.background": gray10,
    "agentsPanel.foreground": gray130,
    "agentsPanel.border": gray10,
    "agentsCard.border": gray10,
    "agentsBottomPanel.border": gray10,
    "agentsDetail.background": editorBackground,
    "activeSessionView.background": gray10,
    "activeSessionView.foreground": gray130,
    "inactiveSessionView.background": gray30,
    "inactiveSessionView.foreground": gray100,
    "agentsGradient.tintColor": shellTint,
    "agentsChatInput.background": gray10,
    "agentsChatInput.foreground": gray130,
    "agentsChatInput.border": gray50,
    "agentsChatInput.focusBorder": blue80,
    "agentsChatInput.placeholderForeground": gray80,
    "agentsNewSessionButton.background": transparent,
    "agentsNewSessionButton.foreground": gray130,
    "agentsNewSessionButton.border": gray50,
    "agentsNewSessionButton.hoverBackground": wash20,
    "agentsBadge.background": blue90,
    "agentsBadge.foreground": gray10,
    "agentsUnreadBadge.background": blue90,
    "agentsUnreadBadge.foreground": gray10,
    "agentsUpdateButton.downloadedBackground": blue80 + "B3",
    "agentsUpdateButton.downloadingBackground": blue80 + "66",
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
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Semantic token colors
  // ───────────────────────────────────────────────────────────────────────────
  // Styles resolve per attribute, so modifier rules that set only a font style
  // (e.g. `*.static`) combine with the color of the base token type.
  semanticHighlighting: true,
  semanticTokenColors: {
    // Literals and operators
    keyword: synKeyword,
    newOperator: synKeyword,
    "builtinType:rust": synKeyword,
    "boolean:rust": synKeyword,
    string: synString,
    stringLiteral: synString,
    number: synNumber,
    numberLiteral: synNumber,
    customLiteral: synNumber,
    regexp: jsRegexp,
    escapeSequence: synKeyword,
    formatSpecifier: synKeyword,
    operator: editorForeground,
    "operator.controlFlow:rust": { foreground: rsQuestion, fontStyle: "bold" },
    comment: synComment,
    "comment.documentation": { foreground: synDocComment, fontStyle: "italic" },

    // Types — declarations and references read as plain text.
    namespace: editorForeground,
    type: editorForeground,
    class: editorForeground,
    interface: editorForeground,
    enum: editorForeground,
    struct: editorForeground,
    record: editorForeground,
    typeParameter: synTypeParameter,
    "typeParameter:typescript": tsTypeParameter,
    "typeParameter:typescriptreact": tsTypeParameter,
    "typeParameter:python": editorForeground,

    // Variables, parameters and members
    variable: editorForeground,
    parameter: editorForeground,
    property: synMember,
    "property.static": { fontStyle: "italic" },
    recordComponent: synMember,
    enumMember: { foreground: synMember, fontStyle: "italic" },
    event: synMember,
    annotationMember: editorForeground,
    "*.mutable": { fontStyle: "underline" },
    "*.deprecated": { fontStyle: "strikethrough" },

    // Functions — declarations blue, calls plain (italic when static).
    function: editorForeground,
    method: editorForeground,
    "function.declaration": synFunction,
    "method.declaration": synFunction,
    "function.definition": synFunction,
    "method.definition": synFunction,
    "method.static": { fontStyle: "italic" },
    "function.static": { fontStyle: "italic" },

    // Metadata
    decorator: synMetadata,
    annotation: synMetadata,
    macro: synMetadata,
    modifier: synKeyword,
    label: editorForeground,

    // JavaScript / TypeScript — calls blue, locals gray-blue, platform
    // globals (console, window, document…) purple italic.
    "function:javascript": synFunction,
    "function:javascriptreact": synFunction,
    "function:typescript": synFunction,
    "function:typescriptreact": synFunction,
    "method:javascript": synFunction,
    "method:javascriptreact": synFunction,
    "method:typescript": synFunction,
    "method:typescriptreact": synFunction,
    "method.static:javascript": { foreground: synMethod, fontStyle: "italic" },
    "method.static:javascriptreact": { foreground: synMethod, fontStyle: "italic" },
    "method.static:typescript": { foreground: synMethod, fontStyle: "italic" },
    "method.static:typescriptreact": { foreground: synMethod, fontStyle: "italic" },
    "variable.local:javascript": jsLocalVariable,
    "variable.local:javascriptreact": jsLocalVariable,
    "variable.local:typescript": jsLocalVariable,
    "variable.local:typescriptreact": jsLocalVariable,
    "variable.defaultLibrary:javascript": { foreground: jsGlobalVariable, fontStyle: "italic" },
    "variable.defaultLibrary:javascriptreact": { foreground: jsGlobalVariable, fontStyle: "italic" },
    "variable.defaultLibrary:typescript": { foreground: jsGlobalVariable, fontStyle: "italic" },
    "variable.defaultLibrary:typescriptreact": { foreground: jsGlobalVariable, fontStyle: "italic" },

    // Python — self / cls, builtins, plain attributes.
    selfParameter: pySelf,
    clsParameter: pySelf,
    "*.builtin:python": pyBuiltin,
    "property:python": editorForeground,

    // Kotlin
    "label:kotlin": kotlinLabel,

    // Go — calls khaki, builtins orange, packages green, types teal.
    "function:go": goCall,
    "method:go": goCall,
    "function.defaultLibrary:go": goBuiltin,
    "type.defaultLibrary:go": goBuiltin,
    "variable.defaultLibrary:go": goBuiltin,
    "variable.readonly:go": { foreground: synMember, fontStyle: "italic" },
    "namespace:go": goPackage,
    "type:go": goType,
    "property:go": editorForeground,

    // Rust — calls blue, structs / enums olive, traits periwinkle.
    "function:rust": synFunction,
    "method:rust": synFunction,
    "method.trait:rust": { fontStyle: "italic" },
    "function.trait:rust": { fontStyle: "italic" },
    "struct:rust": rsType,
    "union:rust": rsType,
    "enum:rust": { foreground: rsType, fontStyle: "italic" },
    "typeAlias:rust": { foreground: rsType, fontStyle: "italic" },
    "enumMember:rust": { foreground: rsVariant, fontStyle: "italic" },
    "interface:rust": rsTrait,
    "namespace.crateRoot:rust": rsTrait,
    "typeParameter:rust": rsLifetime,
    "lifetime:rust": { foreground: rsLifetime, fontStyle: "italic" },
    "macro:rust": rsMacro,
    "selfKeyword:rust": rsSelf,
    "selfTypeKeyword:rust": rsSelf,
    "static:rust": rsStatic,
    "const:rust": { foreground: synMember, fontStyle: "italic" },
    "attribute:rust": synMetadata,
    "builtinAttribute:rust": synMetadata,
    "unresolvedReference:rust": synInvalid,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TextMate token colors
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
    { scope: "emphasis", settings: { fontStyle: "italic" } },
    { scope: "strong", settings: { fontStyle: "bold" } },
    { scope: "markup.underline", settings: { fontStyle: "underline" } },
    { scope: "markup.strikethrough", settings: { fontStyle: "strikethrough" } },

    // ── Comments ──
    {
      name: "Comment",
      scope: "comment",
      settings: { foreground: synComment },
    },
    {
      name: "Doc comment / docstring",
      scope: [
        "comment.block.documentation",
        "comment.line.documentation",
        "comment.block.javadoc",
        "string.quoted.docstring",
      ],
      settings: { foreground: synDocComment, fontStyle: "italic" },
    },
    {
      name: "Doc comment tag",
      scope: [
        "keyword.other.documentation",
        "storage.type.class.jsdoc",
        "punctuation.definition.block.tag.jsdoc",
        "keyword.other.phpdoc",
      ],
      settings: { foreground: synDocTag, fontStyle: "italic" },
    },
    {
      name: "Doc comment tag value",
      scope: [
        "variable.other.jsdoc",
        "entity.name.type.instance.jsdoc",
        "variable.parameter.javadoc",
      ],
      settings: { foreground: synDocTagValue, fontStyle: "italic" },
    },
    {
      name: "TODO marker",
      scope: ["keyword.codetag.notation", "keyword.other.todo"],
      settings: { foreground: synTodo, fontStyle: "italic" },
    },

    // ── Keywords ──
    // One color for every keyword, control flow included.
    {
      name: "Keyword / storage",
      scope: ["keyword", "storage", "storage.type", "storage.modifier"],
      settings: { foreground: synKeyword },
    },
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
        "keyword.operator.delete",
        "keyword.operator.noexcept",
        "keyword.operator.logical.python",
        "keyword.operator.wordlike",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Operator symbols",
      scope: ["keyword.operator", "storage.type.function.arrow"],
      settings: { foreground: editorForeground },
    },
    {
      name: "Primitive types",
      scope: [
        "support.type.primitive",
        "support.type.builtin",
        "storage.type.primitive",
        "storage.type.built-in",
        "entity.name.type.primitive",
      ],
      settings: { foreground: synKeyword },
    },

    // ── Constants ──
    {
      name: "Language constant (true, false, null…)",
      scope: "constant.language",
      settings: { foreground: synKeyword },
    },
    {
      name: "Number",
      scope: [
        "constant.numeric",
        "keyword.operator.plus.exponent",
        "keyword.operator.minus.exponent",
        "keyword.other.unit",
      ],
      settings: { foreground: synNumber },
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
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Enum member / constant",
      scope: [
        "variable.other.enummember",
        "constant.other.enum",
        "constant.other.caps",
      ],
      settings: { foreground: synMember, fontStyle: "italic" },
    },

    // ── Strings ──
    {
      name: "String",
      scope: ["string", "meta.embedded.assembly"],
      settings: { foreground: synString },
    },
    {
      name: "Regular expression",
      scope: ["string.regexp", "constant.regexp", "string.regexp keyword.other"],
      settings: { foreground: jsRegexp },
    },
    {
      name: "Template / interpolation delimiters",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "JSX expression braces",
      scope: [
        "source.js.jsx punctuation.section.embedded",
        "source.tsx punctuation.section.embedded",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Template expression content",
      scope: "meta.template.expression",
      settings: { foreground: editorForeground },
    },

    // ── Functions ──
    {
      name: "Function declaration",
      scope: [
        "entity.name.function",
        "support.function.git-rebase",
        "entity.name.operator.custom-literal",
      ],
      settings: { foreground: synFunction },
    },
    {
      name: "Function / method call",
      scope: [
        "support.function",
        "meta.method-call entity.name.function",
        "meta.function-call.php entity.name.function",
        "meta.method-call.php entity.name.function",
        "entity.name.function.call",
        "entity.name.function.member.cpp",
        "entity.name.function.member.c",
        "meta.function-call.cpp entity.name.function",
        "meta.function-call.c entity.name.function",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Function / method call (JavaScript, TypeScript)",
      scope: [
        "source.js support.function",
        "source.ts support.function",
        "source.tsx support.function",
        "source.jsx support.function",
      ],
      settings: { foreground: synFunction },
    },
    {
      name: "Preprocessor macro",
      scope: ["entity.name.function.preprocessor", "meta.preprocessor.macro entity.name.function"],
      settings: { foreground: synMetadata },
    },

    // ── Types ──
    {
      name: "Types and namespaces (plain)",
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "entity.name.scope-resolution",
        "entity.other.inherited-class",
        "support.class",
        "support.type",
        "meta.type.cast.expr",
        "meta.type.new.expr",
        // Grammars that scope type references as storage.type
        "storage.type.java",
        "storage.type.generic.java",
        "storage.type.object.array.java",
        "storage.type.token.java",
        "storage.type.cs",
        "storage.type.generic.cs",
        "storage.type.groovy",
        "storage.type.generic.groovy",
        "storage.type.object.array.groovy",
        "storage.type.parameters.groovy",
        "storage.modifier.import.java",
        "storage.modifier.package.java",
        "variable.language.wildcard.java",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Variables and members ──
    {
      name: "Variable / parameter",
      scope: [
        "variable",
        "variable.parameter",
        "meta.definition.variable.name",
        "support.variable",
        "entity.name.variable",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Field / property / object key",
      scope: [
        "variable.other.property",
        "variable.other.object.property",
        "variable.other.member",
        "variable.other.field",
        "entity.name.variable.field",
        "support.variable.property",
        "meta.object-literal.key",
      ],
      settings: { foreground: synMember },
    },
    {
      name: "this / super",
      scope: "variable.language",
      settings: { foreground: synKeyword },
    },

    // ── Metadata ──
    {
      name: "Annotation / decorator / attribute",
      scope: [
        "punctuation.decorator",
        "meta.decorator entity.name.function",
        "meta.decorator variable.other.readwrite",
        "storage.type.annotation",
        "punctuation.definition.annotation",
        "entity.name.type.annotation",
        "entity.name.function.decorator",
        "punctuation.definition.decorator",
        "meta.attribute.rust",
        "meta.attribute.php",
      ],
      settings: { foreground: synMetadata },
    },

    // ── Labels ──
    {
      name: "Label",
      scope: ["entity.name.label", "punctuation.definition.label"],
      settings: { foreground: editorForeground },
    },

    // ── HTML / XML ──
    {
      name: "Tag",
      scope: ["entity.name.tag", "punctuation.definition.tag", "meta.tag.sgml.doctype"],
      settings: { foreground: synTag },
    },
    {
      name: "Custom element",
      scope: "entity.name.tag.custom",
      settings: { foreground: synCustomTag },
    },
    {
      name: "Attribute name",
      scope: "entity.other.attribute-name",
      settings: { foreground: synAttribute },
    },
    {
      name: "XML attribute name",
      scope: "text.xml entity.other.attribute-name",
      settings: { foreground: editorForeground },
    },
    {
      name: "XML namespace prefix",
      scope: [
        "entity.name.tag.namespace",
        "entity.other.attribute-name.namespace",
      ],
      settings: { foreground: synMember },
    },
    {
      name: "Entity reference",
      scope: ["constant.character.entity", "punctuation.definition.entity.html", "punctuation.definition.entity.xml"],
      settings: { foreground: synEntity },
    },
    {
      name: "JSX / TSX component",
      scope: [
        "support.class.component",
        "entity.name.tag.component",
      ],
      settings: { foreground: jsComponent },
    },

    // ── CSS / SCSS / Less ──
    {
      name: "Selectors",
      scope: [
        "entity.name.tag.css",
        "entity.name.tag.scss",
        "entity.name.tag.less",
        "source.css entity.other.attribute-name",
        "source.css.scss entity.other.attribute-name",
        "source.css.less entity.other.attribute-name",
        "source.sass entity.other.attribute-name",
        "entity.other.keyframe-offset",
        "source.css punctuation.definition.entity",
        "source.css.scss punctuation.definition.entity",
        "source.css.less punctuation.definition.entity",
      ],
      settings: { foreground: synTag },
    },
    {
      name: "CSS property name",
      scope: [
        "support.type.property-name",
        "support.type.vendored.property-name",
        "meta.property-name",
        "source.css variable",
        "source.css.scss variable.css",
      ],
      settings: { foreground: synAttribute },
    },
    {
      name: "CSS property value / unit",
      scope: [
        "support.constant.property-value",
        "support.constant.vendored.property-value",
        "support.constant.font-name",
        "support.constant.media",
        "support.constant.media-type",
        "source.css keyword.other.unit",
        "source.css.scss keyword.other.unit",
        "source.css.less keyword.other.unit",
      ],
      settings: { foreground: synString },
    },
    {
      name: "CSS color",
      scope: [
        "constant.other.color.rgb-value",
        "constant.other.rgb-value",
        "support.constant.color",
      ],
      settings: { foreground: synEntity },
    },
    {
      name: "CSS function",
      scope: [
        "support.function.misc.css",
        "support.function.transform.css",
        "support.function.gradient.css",
        "support.function.calc.css",
        "support.function.url.css",
        "support.function.misc.scss",
        "support.function.misc.less",
      ],
      settings: { foreground: synTag },
    },
    {
      name: "CSS url",
      scope: ["variable.parameter.url", "string.unquoted.url"],
      settings: { foreground: cssUrl },
    },
    {
      name: "CSS !important",
      scope: "keyword.other.important",
      settings: { foreground: synKeyword, fontStyle: "bold" },
    },
    {
      name: "Less variable",
      scope: ["variable.other.less", "source.css.less variable"],
      settings: { foreground: lessVariable },
    },

    // ── JSON ──
    {
      name: "JSON key",
      scope: [
        "support.type.property-name.json",
        "support.type.property-name.json.comments",
        "punctuation.support.type.property-name.json",
      ],
      settings: { foreground: synMember },
    },

    // ── YAML ──
    {
      name: "YAML key",
      scope: "entity.name.tag.yaml",
      settings: { foreground: synKeyword },
    },
    {
      name: "YAML plain scalar",
      scope: [
        "string.unquoted.plain.out.yaml",
        "string.unquoted.plain.in.yaml",
        "string.unquoted.block.yaml",
        "source.yaml constant.numeric",
        "source.yaml constant.language",
        "entity.other.document.begin.yaml",
        "entity.other.document.end.yaml",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "YAML anchor / alias",
      scope: [
        "entity.name.type.anchor.yaml",
        "variable.other.anchor.yaml",
        "variable.other.alias.yaml",
        "punctuation.definition.anchor.yaml",
        "punctuation.definition.alias.yaml",
      ],
      settings: { foreground: yamlAnchor },
    },
    {
      name: "YAML comment",
      scope: "comment.line.number-sign.yaml",
      settings: { foreground: synDocComment, fontStyle: "italic" },
    },

    // ── TOML / INI / properties / dotenv ──
    {
      name: "Config file key / section",
      scope: [
        "support.type.property-name.toml",
        "support.type.property-name.table.toml",
        "support.type.property-name.array.toml",
        "entity.other.attribute-name.table.toml",
        "entity.name.section.toml",
        "entity.name.tag.toml",
        "keyword.other.definition.ini",
        "entity.name.section.group-title.ini",
        "support.constant.key.properties",
        "entity.name.tag.properties",
        "variable.other.key.env",
        "variable.other.env",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Config file value",
      scope: ["string.unquoted.value.properties", "string.unquoted.env"],
      settings: { foreground: synString },
    },
    {
      name: "TOML boolean / date",
      scope: [
        "constant.language.boolean.toml",
        "constant.other.time.datetime.offset.toml",
        "constant.other.time.datetime.local.toml",
        "constant.other.time.date.toml",
        "constant.other.time.time.toml",
      ],
      settings: { foreground: editorForeground, fontStyle: "italic" },
    },
    {
      name: "Key-value separator",
      scope: [
        "punctuation.separator.key-value.ini",
        "punctuation.separator.key-value.properties",
      ],
      settings: { foreground: synSeparator },
    },

    // ── Markdown ──
    {
      name: "Markdown heading",
      scope: ["markup.heading", "entity.name.section.markdown"],
      settings: { foreground: synMember, fontStyle: "italic" },
    },
    {
      name: "Markdown markers",
      scope: [
        "punctuation.definition.heading.markdown",
        "punctuation.definition.bold.markdown",
        "punctuation.definition.italic.markdown",
        "punctuation.definition.strikethrough.markdown",
        "punctuation.definition.raw.markdown",
        "punctuation.definition.markdown",
        "punctuation.definition.list.begin.markdown",
        "meta.separator.markdown",
        "punctuation.separator.table.markdown",
        "constant.other.reference.link.markdown",
      ],
      settings: { foreground: synKeyword },
    },
    { name: "Markdown bold", scope: "markup.bold", settings: { fontStyle: "bold" } },
    { name: "Markdown italic", scope: "markup.italic", settings: { fontStyle: "italic" } },
    {
      name: "Markdown code",
      scope: [
        "markup.inline.raw",
        "markup.fenced_code.block.markdown",
        "markup.raw.block.markdown",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Markdown fence language",
      scope: "fenced_code.block.language",
      settings: { foreground: synMember, fontStyle: "italic" },
    },
    {
      name: "Markdown quote marker",
      scope: "punctuation.definition.quote.begin.markdown",
      settings: { foreground: synComment },
    },
    {
      name: "Markdown link text",
      scope: [
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
        "meta.link.inet markup.underline.link.markdown",
        "meta.link.email markup.underline.link.markdown",
      ],
      settings: { foreground: synFunction, fontStyle: "underline" },
    },
    {
      name: "Markdown link destination",
      scope: ["markup.underline.link.markdown", "markup.underline.link.image.markdown"],
      settings: { foreground: synMethod, fontStyle: "italic" },
    },

    // ── Diff / patch files ──
    {
      name: "Diff inserted",
      scope: "markup.inserted",
      settings: { foreground: fileAdded },
    },
    {
      name: "Diff deleted",
      scope: "markup.deleted",
      settings: { foreground: gutterDeleted },
    },
    {
      name: "Diff changed",
      scope: "markup.changed",
      settings: { foreground: fileModified },
    },
    {
      name: "Diff header",
      scope: ["meta.diff.header", "meta.diff.range"],
      settings: { foreground: synKeyword },
    },
    {
      name: "Git rebase SHA",
      scope: "constant.sha.git-rebase",
      settings: { foreground: synNumber },
    },

    // ── Regular expression internals ──
    {
      name: "Regexp character class",
      scope: [
        "constant.other.character-class.set.regexp",
        "constant.character.character-class.regexp",
        "constant.other.character-class.regexp",
        "constant.character.set.regexp",
      ],
      settings: { foreground: synRegexpClass, fontStyle: "bold" },
    },
    {
      name: "Regexp meta / anchor / alternation",
      scope: [
        "keyword.control.anchor.regexp",
        "keyword.operator.or.regexp",
        "keyword.operator.negation.regexp",
        "keyword.other.back-reference.regexp",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Regexp quantifier",
      scope: "keyword.operator.quantifier.regexp",
      settings: { foreground: synNumber },
    },
    {
      name: "Regexp group punctuation",
      scope: [
        "punctuation.definition.group.regexp",
        "punctuation.definition.group.assertion.regexp",
        "punctuation.definition.character-class.regexp",
        "punctuation.character.set.begin.regexp",
        "punctuation.character.set.end.regexp",
        "support.other.parenthesis.regexp",
      ],
      settings: { foreground: editorForeground },
    },

    // ─────────────────────────────────────────────────────────────────────
    // Language-specific colors
    // ─────────────────────────────────────────────────────────────────────

    // JavaScript / TypeScript — locals gray-blue, platform globals purple
    // italic.
    {
      name: "JS/TS local variable",
      scope: [
        "source.js variable.other.readwrite",
        "source.js variable.other.constant",
        "source.js variable.other.object",
        "source.jsx variable.other.readwrite",
        "source.jsx variable.other.constant",
        "source.jsx variable.other.object",
        "source.ts variable.other.readwrite",
        "source.ts variable.other.constant",
        "source.ts variable.other.object",
        "source.tsx variable.other.readwrite",
        "source.tsx variable.other.constant",
        "source.tsx variable.other.object",
      ],
      settings: { foreground: jsLocalVariable },
    },
    {
      name: "JS/TS global object",
      scope: [
        "support.variable.dom",
        "support.class.console",
        "support.variable.object.process",
        "support.variable.object.node",
        "support.constant.math",
        "support.constant.json",
      ],
      settings: { foreground: jsGlobalVariable, fontStyle: "italic" },
    },

    // Python
    {
      name: "Python self / cls",
      scope: [
        "variable.parameter.function.language.special.self.python",
        "variable.language.special.self.python",
        "variable.parameter.function.language.special.cls.python",
        "variable.language.special.cls.python",
      ],
      settings: { foreground: pySelf },
    },
    {
      name: "Python builtin",
      scope: [
        "support.function.builtin.python",
        "support.type.python",
        "support.type.exception.python",
      ],
      settings: { foreground: pyBuiltin },
    },
    {
      name: "Python magic name",
      scope: ["support.function.magic.python", "support.variable.magic.python"],
      settings: { foreground: pyMagic },
    },
    {
      name: "Python keyword argument",
      scope: "variable.parameter.function-call.python",
      settings: { foreground: pyKeywordArgument },
    },
    {
      name: "Python bytes",
      scope: [
        "string.quoted.binary.single.python",
        "string.quoted.binary.multi.python",
        "string.quoted.binary.single.python storage.type.string.python",
        "string.quoted.binary.multi.python storage.type.string.python",
      ],
      settings: { foreground: pyBytes },
    },
    {
      name: "Python string prefix",
      scope: "storage.type.string.python",
      settings: { foreground: synString },
    },
    {
      name: "Python f-string braces / format spec",
      scope: [
        "constant.character.format.placeholder.other.python",
        "storage.type.format.python",
      ],
      settings: { foreground: synKeyword },
    },

    // Go
    {
      name: "Go builtin",
      scope: [
        "entity.name.function.support.builtin.go",
        "storage.type.numeric.go",
        "storage.type.string.go",
        "storage.type.byte.go",
        "storage.type.boolean.go",
        "storage.type.rune.go",
        "storage.type.error.go",
        "storage.type.uintptr.go",
        "entity.name.type.any.go",
        "entity.name.type.comparable.go",
        "constant.language.boolean.go",
        "constant.language.null.go",
        "constant.language.iota.go",
      ],
      settings: { foreground: goBuiltin },
    },
    {
      name: "Go call",
      scope: "entity.name.function.support.go",
      settings: { foreground: goCall },
    },
    {
      name: "Go package",
      scope: "entity.name.type.package.go",
      settings: { foreground: goPackage },
    },
    {
      name: "Go type",
      scope: "entity.name.type.go",
      settings: { foreground: goType },
    },
    {
      name: "Go constant",
      scope: "variable.other.constant.go",
      settings: { foreground: synMember, fontStyle: "italic" },
    },
    {
      name: "Go field",
      scope: "variable.other.property.go",
      settings: { foreground: editorForeground },
    },

    // Rust
    {
      name: "Rust type",
      scope: ["source.rust entity.name.type", "entity.name.type.struct.rust"],
      settings: { foreground: rsType },
    },
    {
      name: "Rust enum",
      scope: "entity.name.type.enum.rust",
      settings: { foreground: rsType, fontStyle: "italic" },
    },
    {
      name: "Rust enum variant (Some / None / Ok / Err)",
      scope: ["entity.name.type.option.rust", "entity.name.type.result.rust"],
      settings: { foreground: rsVariant, fontStyle: "italic" },
    },
    {
      name: "Rust trait",
      scope: "entity.name.type.trait.rust",
      settings: { foreground: rsTrait },
    },
    {
      name: "Rust primitive type",
      scope: ["entity.name.type.primitive.rust", "entity.name.type.numeric.rust"],
      settings: { foreground: synKeyword },
    },
    {
      name: "Rust lifetime",
      scope: ["entity.name.type.lifetime.rust", "punctuation.definition.lifetime.rust"],
      settings: { foreground: rsLifetime, fontStyle: "italic" },
    },
    {
      name: "Rust macro",
      scope: ["entity.name.function.macro.rust", "entity.name.function.macro.rules.rust"],
      settings: { foreground: rsMacro },
    },
    {
      name: "Rust self",
      scope: "variable.language.self.rust",
      settings: { foreground: rsSelf },
    },
    {
      name: "Rust ? operator",
      scope: "keyword.operator.question.rust",
      settings: { foreground: rsQuestion, fontStyle: "bold" },
    },

    // PHP
    {
      name: "PHP variable / $this",
      scope: [
        "variable.other.php",
        "punctuation.definition.variable.php",
        "variable.language.this.php",
      ],
      settings: { foreground: phpVariable },
    },
    {
      name: "PHP constant",
      scope: ["constant.other.php", "constant.other.class.php"],
      settings: { foreground: phpVariable, fontStyle: "italic" },
    },
    {
      name: "PHP named argument",
      scope: "entity.name.variable.parameter.php",
      settings: { foreground: phpNamedArgument },
    },
    {
      name: "PHP tags",
      scope: [
        "punctuation.section.embedded.begin.php",
        "punctuation.section.embedded.end.php",
      ],
      settings: { foreground: synKeyword },
    },

    // Ruby
    {
      name: "Ruby method declaration",
      scope: "source.ruby entity.name.function",
      settings: { foreground: rbMethod },
    },
    {
      name: "Ruby symbol / hash key",
      scope: [
        "constant.language.symbol.ruby",
        "constant.language.symbol.hashkey.ruby",
        "constant.other.symbol.ruby",
        "constant.other.symbol.hashkey.ruby",
        "punctuation.definition.constant.ruby",
        "punctuation.definition.constant.hashkey.ruby",
      ],
      settings: { foreground: rbSymbol },
    },
    {
      name: "Ruby instance variable",
      scope: "variable.other.readwrite.instance.ruby",
      settings: { foreground: synMember },
    },
    {
      name: "Ruby class variable",
      scope: "variable.other.readwrite.class.ruby",
      settings: { foreground: synMember, fontStyle: "italic" },
    },
    {
      name: "Ruby global variable",
      scope: "variable.other.readwrite.global.ruby",
      settings: { foreground: rbGlobal },
    },
    {
      name: "Ruby local variable / parameter",
      scope: ["source.ruby variable.other", "variable.parameter.function.ruby"],
      settings: { foreground: rbLocal, fontStyle: "italic" },
    },
    {
      name: "Ruby constant",
      scope: "variable.other.constant.ruby",
      settings: { foreground: rbConstant },
    },
    {
      name: "Ruby regexp / heredoc",
      scope: [
        "string.regexp.classic.ruby",
        "string.regexp.mod-r.ruby",
        "string.regexp.interpolated.ruby",
        "string.unquoted.heredoc.ruby",
      ],
      settings: { foreground: rbRegexp },
    },
    {
      name: "Ruby comment",
      scope: ["source.ruby comment"],
      settings: { foreground: rbComment, fontStyle: "italic" },
    },
    {
      name: "Ruby number",
      scope: "source.ruby constant.numeric",
      settings: { foreground: rbNumber },
    },
    {
      name: "Ruby escape",
      scope: "source.ruby constant.character.escape",
      settings: { foreground: rbEscape },
    },
    {
      name: "Ruby special method",
      scope: ["keyword.other.special-method.ruby", "support.function.kernel.ruby"],
      settings: { foreground: rbSpecialCall },
    },

    // Shell
    {
      name: "Shell command / function",
      scope: [
        "entity.name.command.shell",
        "support.function.builtin.shell",
        "entity.name.function.shell",
        "entity.name.function.call.shell",
      ],
      settings: { foreground: shCommand },
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
      settings: { foreground: editorForeground },
    },
    {
      name: "Shell argument / option / heredoc body",
      scope: [
        "source.shell string.unquoted.argument",
        "source.shell constant.other.option",
        "string.unquoted.heredoc.shell",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Shell shebang",
      scope: ["meta.shebang", "punctuation.definition.comment.shebang"],
      settings: { foreground: synComment, fontStyle: "bold" },
    },

    // ── Invalid ──
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: synInvalid },
    },
    {
      // Deprecated ≠ broken: keep the normal color, strike it through.
      name: "Deprecated",
      scope: "invalid.deprecated",
      settings: { fontStyle: "strikethrough", foreground: editorForeground },
    },
  ],
};

export default theme;
