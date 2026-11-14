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

import { compositingOver, mix } from "./color";
import type { ThemeDefinition } from "./types";

// Neutral ramp — surfaces, borders and text
const gray10 = "#191A1C"; // editor surface: editor, editor-area terminals, inputs
const gray20 = "#212326"; // panel surface: side bar, panel, output, chat; find widget, peek editor, alternating rows
const gray30 = "#26282C"; // frame: title/activity/status bars, modern shell; popups; panel separators
const gray40 = "#33353B"; // popup separators, view section separators, inactive selection, current tab of an unfocused group, notifications
const gray50 = "#40434A"; // structural borders (notebook cells, merge regions), progress track
const gray60 = "#4C4F56"; // disabled text, popup borders
const gray70 = "#5F6269"; // disabled icons, raised control borders
const gray80 = "#73767C"; // tertiary text: placeholders, group labels; neutral counter badges; control borders
const gray100 = "#9FA2A8"; // muted text: status bar, descriptions, inactive titles
const gray120 = "#C3C5CB"; // icons
const gray130 = "#D1D3D9"; // primary UI text
const gray150 = "#E9EAEE"; // emphasized text
const white = "#FFFFFF";
const black = "#000000";
const transparent = "#00000000";
// One border around every floating popup (suggest, hover, parameter hints,
// code actions, peek, quick pick, menus, notifications): ~2:1 against the
// editor surface — subtle, but the popup edge never melts into code.
const popupBorder = gray60;
// Control borders reach 3:1 against the editor, panel and frame surfaces
// (WCAG 1.4.11), so the edge of an input, dropdown or checkbox is findable
// without its fill.
const controlBorder = gray80;

// Blue ramp — accent, selection, focus
const blue40 = "#233558"; // multi-selected tabs, info banners / validation, keyboard focus row
const blue50 = "#2A4371"; // current tab, list / menu / completion selection
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
const checkBorder = controlBorder;
const checkSelected = blueVivid;
const checkDisabledFill = "#393B40";
const checkDisabledMark = "#6F737A";

// ─────────────────────────────────────────────────────────────────────────────
// Editor palette
// ─────────────────────────────────────────────────────────────────────────────

const editorBackground = gray10;
const { overlay } = compositingOver(editorBackground);
const editorForeground = "#BCBEC4";
// Long-form text in panels (chat transcripts, side bar views, typed input)
// uses the editor text tone; titles, menus, tabs and selections keep the
// brighter gray130 so they read as a step above body text.
const bodyText = editorForeground;
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
const blockBackground = "#2B2D30"; // markdown quotes, collapsed diff regions
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
const matchedBracketBorder = gray80;
const breadcrumbForeground = "#9DA0A8";
const breadcrumbActive = "#DFE1E5";

// Highlights — each kind keeps its own hue:
//   teal  → find results (box border + scrollbar mark); the current result
//           is the selection in a light box
//   green → usages / navigation targets
//   gray-green / rose → occurrences under the caret (read / write): a box in
//           the scrollbar-mark color with no fill, so the selection is the only
//           fill on a selected occurrence
const textSearch = "#114957";
const textSearchBorder = "#165E70";
const textSearchMark = "#72D6D6";
const textSearchCurrentBorder = caret;
const usage = "#2D543F";
const usageMark = "#42BD77";
const usageBorder = usageMark + "80"; // box around go-to-definition / peek targets
const caretWordMark = "#5B786A";
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
// One palette for every language: each kind of token takes the same color
// whatever the language, and no language gets colors of its own. Calls,
// classes, types, parameters and variables are deliberately plain text; color
// marks keywords, declarations, members and literals.
//   orange  → keywords, storage, primitive / built-in types, language
//             constants, this / self, escapes, interpolation delimiters,
//             markup markers, YAML indicators
//   green   → strings, unquoted values in data files
//   cyan    → numbers, dates and times
//   blue    → function / method declarations
//   pink    → fields, properties, object keys (data-file keys included),
//             enum members, named constants, symbols
//   olive   → annotations, decorators, attributes, macros
//   teal    → type parameters, lifetimes
//   gold    → markup tags, CSS selectors; teal-green for custom elements and
//             components
//   gray    → comments (doc comments green-gray)

const synKeyword = "#CF8E6D"; // keywords, primitive types, escapes, markup markers
const synString = "#6AAB73";
const synNumber = "#2AACB8";
const synComment = "#7A7E85"; // line / block comments
const synDocComment = "#5F826B"; // doc comments, docstrings
const synDocTag = "#67A37C"; // @param, @return …
const synDocTagValue = "#ABADB3"; // doc tag arguments
const synFunction = "#56A8F5"; // function / method declarations
const synMember = "#C77DBB"; // fields, properties, object keys, constants
const synMetadata = "#B3AE60"; // annotations, decorators, attributes, macros
const synTypeParameter = "#16BAAC"; // type parameters, lifetimes
const synTag = "#D5B778"; // HTML / XML tags, CSS selectors and functions
const synCustomTag = "#2FBAA3"; // custom elements, JSX / TSX components
const synAttribute = "#BABABA"; // HTML / XML attribute names, CSS property names
const synEntity = "#56A8F5"; // HTML entities, CSS colors
const synRegexp = "#42C3D4"; // regular expressions
const synInvalid = "#F75464"; // bad characters, unmatched brackets, unresolved references
const synTodo = "#8BB33D";
const synRegexpClass = "#B2AE60";

// Bracket pair colors, outermost first. Each level takes the next hue of the
// syntax palette (red stays reserved for unmatched brackets); the pair guides
// show the same hue, dimmed.
const bracketLevels = [
  editorForeground,
  synKeyword,
  synFunction,
  synString,
  synMember,
  synTag,
];

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

// Find-result fills are drawn above the selection, so they are mostly
// see-through (same on-screen color via overlay): a selected match reads as a
// lighter block than the unselected matches around it.
const highlightAlpha = 0.3;

// Changed lines show 40% of the diff color over the editor background; changed
// words inside them show the full diff color on top of that line tint. Diff
// fills are drawn above the selection, so they are kept highly translucent
// (same on-screen color via overlay) to let a selection beneath show through.
const diffLine = (color: string): string =>
  overlay(mix(color, editorBackground, 0.4), 0.2);
const diffWord = (color: string): string =>
  overlay(color, 0.3, mix(color, editorBackground, 0.4));

// File states (explorer, open editors, SCM, tabs). Every state gets its own
// color, none of them red: red names belong to files with errors. The staged
// variant of a change is the lighter variant of its unstaged hue. Every label
// reaches 4.5:1 on the side bar and 3:1 on a selected row.
const fileUntracked = synNumber; // cyan: new file, not yet added
const fileStagedAdded = fileAdded; // green: new file, staged
const fileStagedModified = mix(fileModified, white, 0.6); // light blue: modified, staged
const fileStateDeleted = mix(fileDeleted, white, 0.8); // gray: deleted (struck through by VS Code)
const fileStagedDeleted = mix(fileDeleted, white, 0.6); // light gray: deleted, staged
const fileRenamed = purple100; // purple: renamed / copied
const fileConflict = synKeyword; // keyword orange: merge conflict
const fileSubmodule = "#B09D79"; // khaki: submodule
const fileIgnored = "#86985D"; // olive: ignored
const fileError = errorUnderline; // red: has errors
const fileWarning = warningUnderline; // yellow: has warnings
const fileInvalid = debugValue; // peach: invalid item (e.g. unresolvable workspace root)
const fileChatEdited = purple140; // pale lavender: edited by chat

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
    foreground: bodyText,
    disabledForeground: gray60,
    descriptionForeground: gray100,
    errorForeground: red100,
    focusBorder: blue80,
    strongForeground: white,
    "icon.foreground": gray120,
    "selection.background": blue50,
    "sash.hoverBorder": blue80,
    "widget.border": popupBorder,
    "widget.shadow": shadow,
    "window.activeBorder": windowBorder,
    "window.inactiveBorder": gray50,
    "scrollbar.shadow": transparent,
    "scrollbar.background": transparent,
    "scrollbarSlider.background": scrollbarThumb,
    "scrollbarSlider.hoverBackground": scrollbarThumbHover,
    "scrollbarSlider.activeBackground": scrollbarThumbHover,
    "progressBar.background": blue80,
    // Gauges (usage meters, e.g. chat quota): an accent fill on the progress
    // track; warning and error levels on their feedback ramps.
    "gauge.background": gray50,
    "gauge.foreground": blue80,
    "gauge.border": transparent,
    "gauge.warningBackground": yellow40,
    "gauge.warningForeground": yellow80,
    "gauge.errorBackground": red40,
    "gauge.errorForeground": red80,

    // ── Text ──
    "textLink.foreground": blue100,
    "textLink.activeForeground": blue100,
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
    "surface.foreground": bodyText,
    "surface.border": gray10,
    "editor.border": gray10,
    "modernPanel.border": gray20,
    "modernSash.gripForeground": wash50,
    "modernActivityBar.background": gray30,
    "modernActivityBar.inactiveBackground": gray30,
    "modernActivityBar.border": transparent,
    "modernActivityBarItem.activeBackground": transparent,
    "modernActivityBarItem.activeForeground": blue100,
    "modernActivityBarItem.hoverBackground": wash10,
    "modernActivityBarItem.hoverForeground": gray130,
    // Modern tabs: the current tab is a filled block in the selection blue,
    // lifting one step on hover.
    "modernTab.activeBackground": blue50,
    "modernTab.activeForeground": gray130,
    "modernTab.hoverBackground": wash20,
    "modernTab.hoverForeground": gray130,
    "modernEditorTab.activeBackground": blue50,
    "modernEditorTab.activeForeground": gray130,
    "modernEditorTab.activeHoverBackground": blue60,
    "modernEditorTab.inactiveBackground": transparent,
    "modernEditorTab.hoverBackground": wash20,
    "modernEditorTab.hoverForeground": gray130,
    "modernEditorTab.activeActionBackground": blue50,
    "modernEditorTab.activeHoverActionBackground": blue60,
    "modernEditorTab.hoverActionBackground": mix(
      white,
      editorBackground,
      0x17 / 255,
    ),
    "modernEditorTab.selectedActionBackground": blue40,
    "browser.border": gray30,

    // ── Activity bar ──
    // The activity bar sits on the frame. The active item is marked by its blue
    // glyph alone, with no tile behind it; inactive glyphs stay neutral so the
    // blue one reads as the selection.
    "activityBar.background": gray30,
    "activityBar.foreground": blue100,
    "activityBar.inactiveForeground": gray100,
    "activityBar.border": transparent,
    "activityBar.activeBorder": transparent,
    "activityBar.activeBackground": transparent,
    "activityBar.activeFocusBorder": blue80,
    "activityBar.dropBorder": blue80,
    "activityBarBadge.background": blue90,
    "activityBarBadge.foreground": gray10,
    "activityErrorBadge.background": red80,
    "activityErrorBadge.foreground": white,
    "activityWarningBadge.background": yellow80,
    "activityWarningBadge.foreground": white,
    // Activity bar docked at the top of the side bar — inside the panel.
    "activityBarTop.background": gray20,
    "activityBarTop.foreground": blue100,
    "activityBarTop.inactiveForeground": gray100,
    "activityBarTop.activeBackground": transparent,
    "activityBarTop.activeBorder": transparent,
    "activityBarTop.dropBorder": blue80,

    // ── Side bar ──
    "sideBar.background": gray20,
    "sideBar.foreground": bodyText,
    "sideBar.border": gray30,
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
    "panel.border": gray30,
    "panel.dropBorder": blue80,
    "panelTitle.activeForeground": gray130,
    "panelTitle.inactiveForeground": gray100,
    "panelTitle.activeBorder": blue80,
    "panelTitle.border": gray30,
    "panelTitleBadge.background": gray80,
    "panelTitleBadge.foreground": black,
    "panelSection.border": gray40,
    "panelSection.dropBackground": dropTarget,
    "panelSectionHeader.background": gray20,
    "panelSectionHeader.foreground": gray130,
    "panelSectionHeader.border": gray40,
    "panelInput.border": controlBorder,
    "panelStickyScroll.background": gray20,
    "panelStickyScroll.border": gray30,
    "panelStickyScroll.shadow": shadow,
    "outputView.background": gray20,
    "outputViewStickyScroll.background": gray20,

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
    // Tabs live inside the editor panel and the strip shares the editor
    // background. The current tab is marked by its fill alone, with no edge
    // line — selection blue in the focused group (~1.8:1 against the strip,
    // label 6.6:1), the neutral inactive-selection gray elsewhere so it stays
    // findable but subdued. Other labels are dimmed to 75%.
    // The modern "connected" tab style always paints the current tab with the
    // editor background (theme tab colors only reach the classic and "pill"
    // styles), so there the strip carries the contrast instead: the other tabs
    // sit on a lighter gray and the current tab reads as the dark top of the
    // editor rising out of it.
    "editorGroup.border": gray30,
    "editorGroup.dropBackground": dropTarget,
    "editorGroup.emptyBackground": editorBackground,
    "editorGroup.focusedEmptyBorder": blue80,
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
    "tab.activeBackground": blue50,
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
    "tab.selectedBackground": blue40,
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

    // Selection — translucent; selected code keeps its syntax colors.
    "editor.selectionBackground": overlay(selection, 0.6),
    "editor.inactiveSelectionBackground": overlay(selectionInactive, 0.8),
    // Occurrences of the word / selection under the caret — gray-green boxes
    // with no fill (rose for write access). Every occurrence, including the one
    // under the caret, is boxed; a selected occurrence (keyboard selection, Add
    // Selection To Next Find Match) is the same box with the selection fill
    // inside, so it stands apart from the rest.
    "editor.selectionHighlightBackground": transparent,
    "editor.selectionHighlightBorder": caretWordMark,
    "editor.wordHighlightBackground": transparent,
    "editor.wordHighlightBorder": caretWordMark,
    "editor.wordHighlightStrongBackground": transparent,
    "editor.wordHighlightStrongBorder": caretWriteWordMark,
    "editor.wordHighlightTextBackground": transparent,
    "editor.wordHighlightTextBorder": caretWordMark,

    // Find — every result gets a teal block with a teal box; the current one is
    // the selection inside a light box. Match foregrounds stay unset so matched
    // code keeps its syntax colors.
    "editor.findMatchBackground": selection,
    "editor.findMatchBorder": textSearchCurrentBorder,
    "editor.findMatchHighlightBackground": overlay(textSearch, highlightAlpha),
    "editor.findMatchHighlightBorder": textSearchBorder,
    "editor.findRangeHighlightBackground": wash10,
    "editor.findRangeHighlightBorder": transparent,
    "searchEditor.findMatchBackground": overlay(textSearch, highlightAlpha),
    "searchEditor.findMatchBorder": textSearchBorder,
    "searchEditor.textInputBorder": controlBorder,
    "search.resultsInfoForeground": gray100,

    "editor.hoverHighlightBackground": wash10,
    "editor.rangeHighlightBackground": wash10,
    "editor.rangeHighlightBorder": transparent,
    "editor.symbolHighlightBackground": overlay(usage, 0.8),
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
    "editorIndentGuide.background": indentGuide, // pre-1.67 key, still read
    "editorIndentGuide.background1": indentGuide,
    "editorIndentGuide.background2": indentGuide,
    "editorIndentGuide.background3": indentGuide,
    "editorIndentGuide.background4": indentGuide,
    "editorIndentGuide.background5": indentGuide,
    "editorIndentGuide.background6": indentGuide,
    "editorIndentGuide.activeBackground": indentGuideActive, // pre-1.67 key, still read
    "editorIndentGuide.activeBackground1": indentGuideActive,
    "editorIndentGuide.activeBackground2": indentGuideActive,
    "editorIndentGuide.activeBackground3": indentGuideActive,
    "editorIndentGuide.activeBackground4": indentGuideActive,
    "editorIndentGuide.activeBackground5": indentGuideActive,
    "editorIndentGuide.activeBackground6": indentGuideActive,
    "editorRuler.foreground": indentGuide,
    "editorWhitespace.foreground": whitespace,
    "editorWordWrapIndicator.foreground": whitespace,

    // Brackets — each nesting level takes the next syntax hue (text, orange,
    // blue, green, orchid, gold, then around again), so a closing bracket is
    // matched to its opener by color. Pair guides show the level's hue dimmed,
    // and brighten for the pair around the caret. The matching pair under the
    // caret also gets a block in a light box.
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
    "editorWidget.border": popupBorder,
    "editorWidget.resizeBorder": blue80,
    "editorHoverWidget.background": popupEditorBackground,
    "editorHoverWidget.foreground": gray130,
    "editorHoverWidget.border": popupBorder,
    "editorHoverWidget.statusBarBackground": gray30,
    "editorHoverWidget.highlightForeground": white, // active parameter in signature help
    "editorSuggestWidget.background": popupEditorBackground,
    "editorSuggestWidget.foreground": editorForeground,
    "editorSuggestWidget.border": popupBorder,
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
    "diffEditor.unchangedRegionBackground": blockBackground,
    "diffEditor.unchangedRegionForeground": gray100,
    "diffEditor.unchangedRegionShadow": shadow,
    // Unchanged lines shown around collapsed regions recede under a light
    // shadow, so the changes between them stand out.
    "diffEditor.unchangedCodeBackground": shadow,
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
    // Input 1 is "Incoming" and input 2 "Current" in a git merge.
    "mergeEditor.conflict.input1.background": diffLine(diffInserted),
    "mergeEditor.conflict.input2.background": diffLine(diffModified),
    "mergeEditor.conflictingLines.background": overlay(diffConflict, 0.8),
    "mergeEditor.conflict.unhandledUnfocused.border": diffConflictMark + "B3",
    "mergeEditor.conflict.unhandledFocused.border": diffConflictMark,
    "mergeEditor.conflict.handledUnfocused.border": gray50,
    "mergeEditor.conflict.handledFocused.border": gray80,
    "mergeEditor.conflict.unhandled.minimapOverViewRuler": diffConflictMark,
    "mergeEditor.conflict.handled.minimapOverViewRuler": gray80,

    // ── Source control ──
    // One color per file status, none of them red: red names belong to files
    // with errors (list.errorForeground). Added green, untracked the number
    // cyan, modified blue, renamed purple, deleted gray, conflicts the keyword
    // orange, submodules khaki, ignored olive; staged changes take the lighter
    // variant of their unstaged hue.
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
    "menu.border": popupBorder,
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
    // Files with problems take their squiggle colors; unresolvable items are
    // peach, so they don't look like errors.
    "list.errorForeground": fileError,
    "list.warningForeground": fileWarning,
    "list.invalidItemForeground": fileInvalid,
    "list.deemphasizedForeground": gray80,
    "listFilterWidget.background": gray10,
    "listFilterWidget.outline": controlBorder,
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
    "input.border": controlBorder,
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
    "dropdown.border": controlBorder,
    "dropdown.listBackground": gray30,

    // ── Buttons and toggles ──
    "button.background": blue80,
    "button.foreground": white,
    "button.border": blue80,
    "button.hoverBackground": blue70,
    "button.separator": wash50,
    "button.secondaryBackground": transparent,
    "button.secondaryForeground": gray130,
    "button.secondaryBorder": controlBorder,
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
    "radio.inactiveBorder": controlBorder,
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
    "chatManagement.sashBorder": gray30,
    "aiCustomizationManagement.sashBorder": gray30,
    "settings.dropdownBackground": gray30,
    "settings.dropdownForeground": gray130,
    "settings.dropdownBorder": controlBorder,
    "settings.dropdownListBorder": gray40,
    "settings.checkboxBackground": checkFill,
    "settings.checkboxForeground": gray130,
    "settings.checkboxBorder": checkBorder,
    "settings.textInputBackground": gray10,
    "settings.textInputForeground": bodyText,
    "settings.textInputBorder": controlBorder,
    "settings.numberInputBackground": gray10,
    "settings.numberInputForeground": bodyText,
    "settings.numberInputBorder": controlBorder,
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
    "notificationCenter.border": popupBorder,
    "notificationCenterHeader.background": gray40,
    "notificationCenterHeader.foreground": gray130,
    "notificationToast.border": popupBorder,
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
    // terminal.background is left unset so a terminal takes its host's surface:
    // gray20 in the panel or side bar, the editor background in an editor tab.
    "terminal.foreground": editorForeground,
    "terminal.border": gray30,
    "terminal.tab.activeBorder": blue80,
    "terminal.dropBackground": dropTarget,
    "terminal.initialHintForeground": gray80,
    "terminal.selectionBackground": selection,
    "terminal.inactiveSelectionBackground": overlay(selectionInactive, 0.8),
    "terminal.hoverHighlightBackground": wash10,
    // Find — as in the editor: teal blocks in teal boxes, the current match
    // the selection inside a light box. Both fills sit under the text.
    "terminal.findMatchBackground": selection,
    "terminal.findMatchBorder": textSearchCurrentBorder,
    "terminal.findMatchHighlightBackground": overlay(
      textSearch,
      highlightAlpha,
    ),
    "terminal.findMatchHighlightBorder": textSearchBorder,
    "terminalCursor.foreground": caret,
    "terminalCursor.background": editorBackground,
    "terminalCommandDecoration.defaultBackground": gray80,
    "terminalCommandDecoration.successBackground": iconGreen,
    "terminalCommandDecoration.errorBackground": iconRed,
    "terminalCommandGuide.foreground": terminalSelectedBlock,
    "terminalOverviewRuler.cursorForeground": gray100,
    "terminalOverviewRuler.findMatchForeground": textSearchMark,
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
    "confetti.color1": iconRed,
    "confetti.color2": iconLavender,
    "confetti.color3": iconYellow,
    "confetti.color4": iconGreen,
    "confetti.color5": iconBlue,
    "confetti.color6": iconPurple,
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
    // Model-comparison badge: a teal-to-purple gradient.
    "chat.fusionBadgeGradientStart": teal100,
    "chat.fusionBadgeGradientEnd": purple100,
    "chat.editedFileForeground": fileChatEdited,
    "chat.linesAddedForeground": fileAdded,
    "chat.linesRemovedForeground": red100,
    "chat.findMatchBackground": selection,
    "chat.findMatchHighlightBackground": overlay(textSearch, highlightAlpha),
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
    "agentsPanel.foreground": bodyText,
    "agentsPanel.border": gray10,
    "agentsCard.border": gray10,
    "agentsBottomPanel.border": gray10,
    "agentsDetail.background": editorBackground,
    "activeSessionView.background": gray10,
    "activeSessionView.foreground": bodyText,
    "inactiveSessionView.background": gray30,
    "inactiveSessionView.foreground": gray100,
    "agentsGradient.tintColor": shellTint,
    "agentsChatInput.background": gray10,
    "agentsChatInput.foreground": bodyText,
    "agentsChatInput.border": controlBorder,
    "agentsChatInput.focusBorder": blue80,
    "agentsChatInput.placeholderForeground": gray80,
    "agentsNewSessionButton.background": transparent,
    "agentsNewSessionButton.foreground": gray130,
    "agentsNewSessionButton.border": controlBorder,
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
    "agentsWindowGraphic.orange": iconOrange, // welcome-page illustration accent
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Semantic token colors
  // ───────────────────────────────────────────────────────────────────────────
  // Styles resolve per attribute, so modifier rules that set only a font style
  // (e.g. `*.static`) combine with the color of the base token type.
  semanticHighlighting: true,
  semanticTokenColors: {
    // Every rule applies to every language; there are no per-language rules.

    // Keywords, literals and operators
    keyword: synKeyword,
    controlKeyword: synKeyword,
    keywordControl: synKeyword,
    modifier: synKeyword,
    newOperator: synKeyword,
    "operator.controlFlow": synKeyword, // e.g. Rust's ?
    builtinType: synKeyword,
    "type.defaultLibrary": synKeyword, // built-in types (Go int, error…)
    boolean: synKeyword,
    builtinConstant: synKeyword,
    "variable.readonly.defaultLibrary": synKeyword, // built-in constants (Go nil, true…)
    selfKeyword: synKeyword,
    selfTypeKeyword: synKeyword,
    selfParameter: synKeyword,
    clsParameter: synKeyword,
    string: synString,
    stringLiteral: synString,
    stringVerbatim: synString,
    number: synNumber,
    numberLiteral: synNumber,
    customLiteral: synNumber,
    regexp: synRegexp,
    escapeSequence: synKeyword,
    stringEscapeCharacter: synKeyword,
    formatSpecifier: synKeyword,
    operator: editorForeground,
    operatorOverloaded: editorForeground,
    comment: synComment,
    "comment.documentation": synDocComment,
    excludedCode: synComment, // inactive #if / #else branches

    // Types — declarations and references read as plain text, built-in ones
    // included; type parameters and lifetimes are teal.
    namespace: editorForeground,
    module: editorForeground,
    type: editorForeground,
    typeAlias: editorForeground,
    union: editorForeground,
    delegate: editorForeground,
    class: editorForeground,
    interface: editorForeground,
    enum: editorForeground,
    struct: editorForeground,
    record: editorForeground,
    typeParameter: synTypeParameter,
    lifetime: synTypeParameter,

    // Variables, parameters and members — variables and parameters plain;
    // fields, properties, enum members and named constants pink.
    variable: editorForeground,
    parameter: editorForeground,
    property: synMember,
    field: synMember,
    recordComponent: synMember,
    enumMember: synMember,
    event: synMember,
    "variable.constant": synMember,
    annotationMember: editorForeground,
    label: editorForeground,
    "*.mutable": { fontStyle: "underline" },
    "*.deprecated": { fontStyle: "strikethrough" },

    // Functions — declarations blue, calls plain.
    function: editorForeground,
    method: editorForeground,
    extensionMethod: editorForeground,
    magicFunction: editorForeground,
    "function.declaration": synFunction,
    "method.declaration": synFunction,
    "function.definition": synFunction,
    "method.definition": synFunction,
    "magicFunction.declaration": synFunction,

    // Metadata
    decorator: synMetadata,
    annotation: synMetadata,
    attribute: synMetadata,
    builtinAttribute: synMetadata,
    macro: synMetadata,

    unresolvedReference: synInvalid,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TextMate token colors
  // ───────────────────────────────────────────────────────────────────────────
  tokenColors: [
    // Every rule is a kind of token, not a language: where a grammar scopes a
    // token unusually, its scope is listed under the kind it belongs to.

    // ── Base / embedded ──
    {
      scope: [
        "meta.embedded",
        "source.groovy.embedded",
        "source.coffee.embedded",
        "string meta.image.inline.markdown",
        "variable.legacy.builtin.python",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Typography ──
    // Nothing in the editor is bold or italic, markdown source included
    // (previews render the real emphasis). Strikethrough and underline are
    // kept: deprecated code is struck through, links are underlined.
    { scope: "markup.underline", settings: { fontStyle: "underline" } },
    { scope: "markup.strikethrough", settings: { fontStyle: "strikethrough" } },

    // ── Comments ──
    {
      name: "Comment",
      scope: [
        "comment",
        "meta.shebang",
        "punctuation.definition.comment.shebang",
        "punctuation.definition.comment",
        "comment constant",
      ],
      settings: { foreground: synComment },
    },
    {
      name: "Doc comment / docstring",
      scope: [
        "comment.block.documentation",
        "comment.line.documentation",
        "comment.block.javadoc",
        "string.quoted.docstring",
        "comment.block.documentation punctuation.definition.comment",
        "comment.line.documentation punctuation.definition.comment",
        "comment.block.javadoc punctuation.definition.comment",
        "comment.block.documentation constant",
        "comment.line.documentation constant",
        "comment.block.javadoc constant",
      ],
      settings: { foreground: synDocComment },
    },
    {
      name: "Doc comment tag",
      scope: [
        "keyword.other.documentation",
        "storage.type.class.jsdoc",
        "punctuation.definition.block.tag.jsdoc",
        "keyword.other.phpdoc",
      ],
      settings: { foreground: synDocTag },
    },
    {
      name: "Doc comment tag value",
      scope: [
        "variable.other.jsdoc",
        "entity.name.type.instance.jsdoc",
        "variable.parameter.javadoc",
      ],
      settings: { foreground: synDocTagValue },
    },
    {
      name: "TODO marker",
      scope: ["keyword.codetag.notation", "keyword.other.todo"],
      settings: { foreground: synTodo },
    },

    // ── Keywords ──
    // One color for every keyword, control flow included.
    {
      name: "Keyword / storage",
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "entity.other.attribute",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Word-like / control-flow operators",
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
        "keyword.operator.question.rust",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Operator symbols",
      scope: ["keyword.operator", "storage.type.function.arrow"],
      settings: { foreground: editorForeground },
    },
    {
      name: "Primitive / built-in types",
      scope: [
        "support.type.primitive",
        "support.type.builtin",
        "storage.type.primitive",
        "storage.type.built-in",
        "entity.name.type.primitive",
        "entity.name.type.numeric.rust",
        "entity.name.type.any.go",
        "entity.name.type.comparable.go",
      ],
      settings: { foreground: synKeyword },
    },

    // ── Constants ──
    {
      name: "Language constant (true, false, null…)",
      scope: ["constant.language", "constant.other.ellipsis"],
      settings: { foreground: synKeyword },
    },
    {
      name: "Number",
      scope: [
        "constant.numeric",
        "keyword.operator.plus.exponent",
        "keyword.operator.minus.exponent",
        "keyword.other.unit",
        "constant.other.unicode-range",
        "support.unicode-range",
        "constant.codepoint-range",
      ],
      settings: { foreground: synNumber },
    },
    {
      name: "Date / time",
      scope: [
        "constant.other.time.datetime.offset.toml",
        "constant.other.time.datetime.local.toml",
        "constant.other.time.date.toml",
        "constant.other.time.time.toml",
        "constant.other.date",
        "constant.other.timestamp",
      ],
      settings: { foreground: synNumber },
    },
    {
      name: "Character literal",
      scope: ["constant.character", "constant.other.rune"],
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
      name: "Enum member / named constant",
      scope: [
        "variable.other.enummember",
        "constant.other.enum",
        "constant.other.caps",
        "support.constant",
        "constant.other.php",
        "constant.other.class.php",
        "entity.name.type.option.rust",
        "entity.name.type.result.rust",
        "entity.name.constant",
        "constant",
      ],
      settings: { foreground: synMember },
    },
    {
      name: "Symbol / atom",
      scope: [
        "constant.other.symbol",
        "constant.language.symbol",
        "punctuation.definition.constant.ruby",
        "punctuation.definition.constant.hashkey.ruby",
      ],
      settings: { foreground: synMember },
    },

    // ── Strings ──
    {
      name: "String / string prefix",
      scope: [
        "string",
        "meta.embedded.assembly",
        "storage.type.string.python",
        "entity.other.attribute-value",
        "markup.raw.inline.less",
      ],
      settings: { foreground: synString },
    },
    {
      name: "Regular expression",
      scope: [
        "string.regexp",
        "constant.regexp",
        "string.regexp keyword.other",
      ],
      settings: { foreground: synRegexp },
    },
    {
      name: "Template / interpolation / embedded code delimiters",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Template expression content",
      scope: "meta.template.expression",
      settings: { foreground: editorForeground },
    },

    // ── Functions ──
    {
      name: "Function / method declaration",
      scope: [
        "entity.name.function",
        "entity.name.function support.function", // Python __init__ and co.
        "support.function.git-rebase",
        "entity.name.operator.custom-literal",
      ],
      settings: { foreground: synFunction },
    },
    {
      name: "Function / method call, command",
      scope: [
        "support.function",
        "meta.function-call entity.name.function",
        "meta.method-call entity.name.function",
        "meta.function-call.generic",
        "entity.name.function.call",
        "entity.name.function.support",
        "entity.name.function.member.cpp",
        "entity.name.function.member.c",
        "entity.name.command",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Macro",
      scope: [
        "entity.name.function.preprocessor",
        "meta.preprocessor.macro entity.name.function",
        "entity.name.function.macro",
        "entity.name.other.preprocessor.macro",
      ],
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
        "entity.name.module",
        "entity.name.import",
        "support.namespace",
        "support.other.namespace",
        "support.other.protocol",
        "entity.other.alias",
        "entity.scope",
        "entity.name.section.fsharp",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Type parameter / lifetime",
      scope: [
        "entity.name.type.parameter",
        "entity.name.type.type-parameter",
        "entity.name.type.lifetime",
        "punctuation.definition.lifetime",
      ],
      settings: { foreground: synTypeParameter },
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
        "entity.global",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Field / property / instance variable",
      scope: [
        "variable.other.property",
        "variable.other.object.property",
        "variable.other.member",
        "variable.other.field",
        "variable.other.readwrite.instance",
        "variable.other.readwrite.class",
        "entity.name.variable.field",
        "support.variable.property",
        "meta.object-literal.key",
      ],
      settings: { foreground: synMember },
    },
    {
      name: "this / self / super",
      scope: [
        "variable.language",
        "variable.parameter.function.language.special.self.python",
        "variable.parameter.function.language.special.cls.python",
      ],
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
        "support.other.attribute",
        "support.attribute",
        "meta.attribute.php support.other.namespace",
      ],
      settings: { foreground: synMetadata },
    },

    // ── Labels ──
    {
      name: "Label",
      scope: [
        "entity.name.label",
        "punctuation.definition.label",
        "entity.name.goto-label",
        "support.other.php",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Markup tags (HTML / XML / JSX) ──
    {
      name: "Tag",
      scope: [
        "entity.name.tag",
        "punctuation.definition.tag",
        "meta.tag.sgml.doctype",
      ],
      settings: { foreground: synTag },
    },
    {
      name: "Custom element / component",
      scope: [
        "entity.name.tag.custom",
        "support.class.component",
        "entity.name.tag.component",
      ],
      settings: { foreground: synCustomTag },
    },
    {
      name: "Attribute name",
      scope: "entity.other.attribute-name",
      settings: { foreground: synAttribute },
    },
    {
      name: "Namespace prefix",
      scope: [
        "entity.name.tag.namespace",
        "entity.other.attribute-name.namespace",
        "entity.other.namespace-prefix",
        "entity.name.namespace-prefix",
      ],
      settings: { foreground: synMember },
    },
    {
      name: "Entity reference",
      scope: [
        "constant.character.entity",
        "punctuation.definition.entity.html",
        "punctuation.definition.entity.xml",
      ],
      settings: { foreground: synEntity },
    },

    // ── Stylesheets (CSS / SCSS / Less) ──
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
      ],
      settings: { foreground: synAttribute },
    },
    {
      name: "Stylesheet variable (custom property, $scss, @less)",
      scope: [
        "variable.css",
        "variable.scss",
        "variable.other.less",
        "source.css variable",
        "source.css.less variable",
        "support.other.variable",
        "entity.other.counter-name",
        "entity.other.counter-style-name",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "CSS property value / unit / url",
      scope: [
        "support.constant.property-value",
        "support.constant.vendored.property-value",
        "support.constant.font-name",
        "support.constant.media",
        "support.constant.media-type",
        "source.css keyword.other.unit",
        "source.css.scss keyword.other.unit",
        "source.css.less keyword.other.unit",
        "variable.parameter.url",
        "string.unquoted.url",
        "support.keyword.repetitions",
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
      name: "CSS !important",
      scope: "keyword.other.important",
      settings: { foreground: synKeyword },
    },

    // ── Data files (JSON / YAML / TOML / INI / properties / dotenv) ──
    // Keys are object keys and take the member color; unquoted values are
    // strings; YAML's structural indicators are markers.
    {
      name: "Key",
      scope: [
        "support.type.property-name.json",
        "support.type.property-name.json.comments",
        "punctuation.support.type.property-name.json",
        "entity.name.tag.yaml",
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
      settings: { foreground: synMember },
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
      name: "YAML indicator / anchor / alias / document marker",
      scope: [
        "punctuation.definition.block.scalar.folded.yaml",
        "punctuation.definition.block.scalar.literal.yaml",
        "support.other.chomping-indicator.yaml",
        "punctuation.definition.block.sequence.item.yaml",
        "entity.name.type.anchor.yaml",
        "variable.other.anchor.yaml",
        "variable.other.alias.yaml",
        "punctuation.definition.anchor.yaml",
        "punctuation.definition.alias.yaml",
        "entity.other.document.begin.yaml",
        "entity.other.document.end.yaml",
      ],
      settings: { foreground: synKeyword },
    },

    // ── Command lines ──
    {
      // Shell grammars scope bare arguments as unquoted strings; they are
      // words, not string literals.
      name: "Command argument / option",
      scope: [
        "source.shell string.unquoted.argument",
        "source.shell constant.other.option",
      ],
      settings: { foreground: editorForeground },
    },

    // ── Markdown ──
    {
      name: "Markdown heading",
      scope: [
        "markup.heading",
        "entity.name.section.markdown",
        "entity.name.section",
      ],
      settings: { foreground: synMember },
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
        "beginning.punctuation.definition.list.markdown",
        "meta.separator.markdown",
        "punctuation.separator.table.markdown",
        "constant.other.reference.link.markdown",
      ],
      settings: { foreground: synKeyword },
    },
    {
      // Emphasis is told apart by color, never by weight or slant.
      name: "Markdown bold",
      scope: "markup.bold",
      settings: { foreground: synTag },
    },
    {
      name: "Markdown italic",
      scope: "markup.italic",
      settings: { foreground: synString },
    },
    {
      name: "Markdown code",
      scope: [
        "markup.inline.raw",
        "markup.fenced_code.block.markdown",
        "markup.raw.block.markdown",
        "markup.raw",
      ],
      settings: { foreground: editorForeground },
    },
    {
      name: "Markdown fence language",
      scope: "fenced_code.block.language",
      settings: { foreground: synMember },
    },
    {
      name: "Markdown quote",
      scope: ["markup.quote", "punctuation.definition.quote.begin.markdown"],
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
      scope: [
        "markup.underline.link.markdown",
        "markup.underline.link.image.markdown",
        "markup.underline.link",
      ],
      settings: { foreground: synFunction },
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
      scope: [
        "meta.diff.header",
        "meta.diff.range",
        "meta.separator.diff",
        "punctuation.definition.separator.diff",
      ],
      settings: { foreground: synKeyword },
    },
    {
      name: "Git rebase SHA",
      scope: "constant.sha.git-rebase",
      settings: { foreground: synNumber },
    },

    // ── Log files / output channels ──
    // Levels take their diagnostic colors: errors red, warnings yellow, info
    // blue; debug purple; timestamps and verbose lines recede like comments.
    {
      name: "Log error",
      scope: ["log.error", "log.exceptiontype", "token.error-token"],
      settings: { foreground: errorUnderline },
    },
    {
      name: "Log warning",
      scope: ["log.warning", "token.warn-token"],
      settings: { foreground: warningUnderline },
    },
    {
      name: "Log info",
      scope: ["log.info", "token.info-token"],
      settings: { foreground: iconBlue },
    },
    {
      name: "Log debug",
      scope: ["log.debug", "token.debug-token"],
      settings: { foreground: purple100 },
    },
    {
      name: "Log timestamp / verbose",
      scope: ["log.date", "log.verbose"],
      settings: { foreground: synComment },
    },

    // ── Regular expression internals ──
    {
      name: "Regexp character class",
      scope: [
        "constant.other.character-class.set.regexp",
        "constant.character.character-class.regexp",
        "constant.other.character-class.regexp",
        "constant.character.set.regexp",
        "constant.other.set.regexp",
        "support.other.match.any.regexp",
        "support.other.escape.special.regexp",
        "constant.other.character-class",
      ],
      settings: { foreground: synRegexpClass },
    },
    {
      name: "Regexp meta / anchor / alternation",
      scope: [
        "keyword.control.anchor.regexp",
        "keyword.operator.or.regexp",
        "keyword.operator.negation.regexp",
        "keyword.other.back-reference.regexp",
        "support.other.match.begin.regexp",
        "support.other.match.end.regexp",
        "keyword.operator.lookahead.regexp",
        "keyword.operator.lookbehind.regexp",
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
