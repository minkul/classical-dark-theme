// ─────────────────────────────────────────────────────────────────────────────
// Syntax and semantic highlighting shared by every theme
// ─────────────────────────────────────────────────────────────────────────────
// Which tokens share a color is decided here, once, for every theme and every
// language; a theme only picks the color of each role:
//
//   comment   → comments, doc comments and docstrings, delimiters included
//   keyword   → keywords, control flow, modifiers, storage, macros,
//               preprocessor directives, escapes and format placeholders,
//               interpolation delimiters, doc tags (@param), HTML entities,
//               markup bold
//   constant  → numbers, true / false / null, this / self / cls, constants
//               (const, readonly, enum members, UPPER_CASE), library
//               constants, CSS property values and units, markdown headings
//               and inline code
//   function  → functions and methods (declarations and calls, static and
//               instance alike), built-ins, decorators / annotations /
//               attributes, shell commands, CSS functions
//   type      → classes, interfaces, enums, structs, type aliases, primitive
//               and built-in types (in every language), namespaces / modules /
//               packages, type parameters, markup italic
//   parameter → parameters and named arguments (never the type hint beside
//               them), markdown list markers
//   variable  → variables and properties alike (plain text), operators
//               (arrows such as `=>` and `->` included), punctuation, labels
//   string    → strings and regular expressions, attribute values, unquoted
//               values in data files, markdown link text
//   tag       → markup tags and components, CSS tag selectors, keys in data
//               files (JSON, YAML, TOML, INI…), markdown quotes
//   attribute → HTML / XML attribute names, CSS class / id / pseudo
//               selectors, CSS property names and custom properties
//   invalid   → invalid code; deprecated code is struck through as well
//
// Nothing is bold or italic in the editor — markup emphasis is shown by color
// instead; underline (links) and strikethrough (deprecated, markdown) are kept.

import type { SemanticTokenStyle, TokenColor } from "./types";

export interface SyntaxPalette {
  variable: string; // default text
  comment: string;
  keyword: string;
  constant: string;
  function: string;
  type: string;
  parameter: string;
  string: string;
  tag: string;
  attribute: string;
  invalid: string;
  tagPunctuation: string; // < > of markup tags
  inserted: string; // diff / patch files
  deleted: string;
  changed: string;
  logError: string;
  logWarning: string;
  logInfo: string;
  logDebug: string;
}

type Role = keyof SyntaxPalette;

interface Rule {
  name: string;
  role: Role;
  scope: string[];
  fontStyle?: string;
}

// Rules are listed by kind of token, never by language: where a grammar scopes
// a token unusually, its scope is listed under the kind it belongs to.
const rules: Rule[] = [
  // ── Plain text ──
  {
    name: "Embedded code / interpolation content",
    role: "variable",
    scope: [
      "meta.embedded",
      "meta.embedded.line",
      "source.groovy.embedded",
      "source.coffee.embedded",
      "meta.template.expression",
      "meta.interpolation",
      // Command substitution is code, wherever the grammar files it under strings.
      "string.interpolated.dollar.shell",
      "string.interpolated.backtick.shell",
      "string.interpolated.makefile",
      // Inline style / event handler attributes: the quoted value is code.
      "string source.css",
      "string source.js",
      "string meta.image.inline.markdown",
      "variable.legacy.builtin.python",
    ],
  },
  {
    name: "Variable / property / object key",
    role: "variable",
    scope: [
      "variable",
      "variable.other",
      "variable.other.readwrite",
      "variable.other.object",
      "variable.other.property",
      "variable.other.object.property",
      "variable.other.member",
      "variable.other.field",
      "variable.other.readwrite.instance",
      "variable.other.readwrite.class",
      "variable.other.readwrite.global",
      "meta.definition.variable.name",
      "entity.name.variable",
      "entity.name.variable.field",
      "entity.global",
      "support.variable",
      "support.variable.property",
      "meta.object-literal.key",
      "variable.other.jsdoc",
      "variable.scss",
      "variable.other.less",
      "support.other.variable",
      "source.css.less variable",
      "source.css.scss variable",
      "entity.other.counter-name",
      "entity.other.counter-style-name",
      "variable.language.wildcard.java",
      // Grammars that scope plain names unusually
      "entity.other.attribute.lua", // table fields
      "constant.other.table-name", // SQL
      "constant.other.database-name",
    ],
  },
  {
    // Punctuation has no rule of its own: it takes the color of what it
    // delimits (quotes of a string, # of a heading…).
    name: "Operator / arrow / label",
    role: "variable",
    scope: [
      "keyword.operator",
      "storage.type.function.arrow",
      "keyword.definition.arrow",
      "keyword.control.ternary",
      "storage.type.generic.wildcard",
      "storage.modifier.pointer",
      "storage.modifier.reference",
      "storage.modifier.array.bracket.square",
      "string.tag.lua",
      "entity.other.attribute-name.bracket.shell",
      "entity.name.label",
      "punctuation.definition.label",
      "entity.name.goto-label",
      "support.other.php",
      "punctuation.definition.block.sequence.item.yaml",
      "entity.other.document.begin.yaml",
      "entity.other.document.end.yaml",
    ],
  },
  {
    // Shell grammars scope bare arguments as unquoted strings; they are
    // words, not string literals.
    name: "Command argument / option",
    role: "variable",
    scope: [
      "source.shell string.unquoted.argument",
      "source.shell constant.other.option",
    ],
  },

  // ── Comments ──
  {
    name: "Comment / doc comment / docstring",
    role: "comment",
    scope: [
      "comment",
      "punctuation.definition.comment",
      "comment.block.documentation",
      "comment.line.documentation",
      "comment.block.javadoc",
      "comment constant",
      "comment.block.documentation punctuation.definition.comment",
      "comment.line.documentation punctuation.definition.comment",
      "string.quoted.docstring",
      "string.quoted.docstring punctuation.definition.string",
      "string.quoted.docstring storage.type.string",
      "string.quoted.docstring constant.character",
      "string.quoted.docstring constant.character.escape",
      "string.quoted.docstring constant.language",
      "meta.shebang",
      "punctuation.definition.comment.shebang",
    ],
  },

  // ── Keywords ──
  {
    name: "Keyword / storage / modifier / control flow",
    role: "keyword",
    scope: [
      "keyword",
      "keyword.control",
      "keyword.other",
      "storage",
      "storage.type",
      "storage.modifier",
      "storage.type.string.python",
      "storage.type.template.argument.typename",
      "storage.type.template.argument.class",
      "meta.preprocessor.cs",
      "punctuation.separator.hash.cs",
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
      "keyword.other.important",
    ],
  },
  {
    name: "Doc comment tag",
    role: "keyword",
    scope: [
      "keyword.other.documentation",
      "storage.type.class.jsdoc",
      "punctuation.definition.block.tag.jsdoc",
      "keyword.other.phpdoc",
      "comment.block.documentation storage.type",
    ],
  },
  {
    name: "Macro",
    role: "keyword",
    scope: [
      "entity.name.function.preprocessor",
      "entity.name.function.macro",
      "entity.name.other.preprocessor.macro",
    ],
  },
  {
    name: "Escape / placeholder / interpolation delimiter / entity",
    role: "keyword",
    scope: [
      "constant.character",
      "constant.character.escape",
      "constant.character.format.placeholder",
      "constant.other.placeholder",
      "constant.character.entity",
      "punctuation.definition.entity.html",
      "punctuation.definition.entity.xml",
      "punctuation.definition.template-expression.begin",
      "punctuation.definition.template-expression.end",
      "punctuation.section.embedded",
      "punctuation.definition.interpolation",
      "punctuation.definition.variable.makefile",
      "string punctuation.definition.variable.shell",
      "string punctuation.definition.variable.shell variable.other.normal",
      "string punctuation.definition.variable.shell variable.other.positional",
      "string punctuation.definition.variable.shell variable.other.special",
      "punctuation.definition.subshell",
      "punctuation.definition.evaluation.backticks",
      "string.regexp constant.character.escape",
    ],
  },

  // ── Constants ──
  {
    name: "Number / unit",
    role: "constant",
    scope: [
      "constant.numeric",
      "keyword.operator.plus.exponent",
      "keyword.operator.minus.exponent",
      "keyword.other.unit",
      // Radix prefixes and suffixes that grammars file under storage
      "storage.type.number",
      "storage.type.imaginary.number",
      "storage.type.numeric",
      "constant.other.unicode-range",
      "constant.codepoint-range",
      "support.unicode-range",
      "constant.sha.git-rebase",
    ],
  },
  {
    name: "Language constant / this / self",
    role: "constant",
    scope: [
      "constant.language",
      "constant.other.ellipsis",
      "variable.language",
      "variable.parameter.function.language.special.self.python",
      "variable.parameter.function.language.special.cls.python",
    ],
  },
  {
    name: "Constant / enum member / symbol / date",
    role: "constant",
    scope: [
      "constant",
      "constant.other",
      "constant.other.caps",
      "constant.other.enum",
      "constant.other.symbol",
      "constant.language.symbol",
      "constant.other.date",
      "constant.other.timestamp",
      "constant.other.time",
      "constant.other.php",
      "constant.other.class.php",
      "variable.other.constant",
      "variable.other.enummember",
      "entity.name.variable.enum-member",
      "entity.name.variable.preprocessor.symbol",
      "entity.name.constant",
      "support.constant",
      "entity.name.type.option.rust",
      "entity.name.type.result.rust",
      "punctuation.definition.constant.ruby",
      "punctuation.definition.constant.hashkey.ruby",
      "entity.other.keyframe-offset",
    ],
  },
  {
    name: "CSS property value / color",
    role: "constant",
    scope: [
      "support.constant.property-value",
      "support.constant.vendored.property-value",
      "support.constant.font-name",
      "support.constant.media",
      "support.constant.media-type",
      "support.constant.color",
      "constant.other.color.rgb-value",
      "constant.other.rgb-value",
      "support.keyword.repetitions",
    ],
  },

  // ── Strings and regular expressions ──
  {
    name: "String / unquoted value / attribute value",
    role: "string",
    scope: [
      "string",
      "meta.embedded.assembly",
      "constant.other.rune",
      "string entity.name.import", // Go import paths
      "property.value.dotenv",
      "entity.other.attribute-value",
      "markup.raw.inline.less",
      "string.unquoted.plain.out.yaml",
      "string.unquoted.plain.in.yaml",
      "string.unquoted.block.yaml",
      "string.unquoted.value.properties",
      "string.unquoted.env",
      "variable.parameter.url",
      "string.unquoted.url",
    ],
  },
  {
    // A regular expression reads as one string; only escapes stand out.
    name: "Regular expression",
    role: "string",
    scope: [
      "string.regexp",
      "constant.regexp",
      "source.regexp",
      "string.regexp keyword",
      "string.regexp punctuation",
      "string.regexp constant",
      "string.regexp support",
      "constant.other.character-class",
      "constant.other.set.regexp",
      "constant.character.character-class.regexp",
      "constant.character.set.regexp",
      "keyword.control.anchor.regexp",
      "keyword.operator.quantifier.regexp",
      "keyword.operator.or.regexp",
      "keyword.operator.negation.regexp",
      "keyword.operator.lookahead.regexp",
      "keyword.operator.lookbehind.regexp",
      "keyword.other.back-reference.regexp",
      "punctuation.definition.group.regexp",
      "punctuation.definition.group.assertion.regexp",
      "punctuation.definition.character-class.regexp",
      "punctuation.character.set.begin.regexp",
      "punctuation.character.set.end.regexp",
      "support.other.parenthesis.regexp",
      "support.other.match.any.regexp",
      "support.other.match.begin.regexp",
      "support.other.match.end.regexp",
      "support.other.escape.special.regexp",
      "entity.name.tag.named.group.regexp",
    ],
  },

  // ── Functions ──
  {
    name: "Function / method — declaration and call",
    role: "function",
    scope: [
      "entity.name.function",
      "entity.name.method",
      "support.function",
      "meta.function-call entity.name.function",
      "meta.method-call entity.name.function",
      "meta.function-call.generic",
      "entity.name.function.call",
      "entity.name.function.support",
      "entity.name.function.member",
      "entity.name.command",
      "support.function.git-rebase",
      "entity.name.operator.custom-literal",
    ],
  },
  {
    name: "Decorator / annotation / attribute",
    role: "function",
    scope: [
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
      "meta.attribute.php support.other.namespace",
      "support.other.attribute",
      "support.attribute",
      "entity.other.attribute",
      "storage.modifier.attribute.swift",
      "punctuation.definition.attribute.swift",
    ],
  },

  // ── Types ──
  {
    name: "Type / class / interface / namespace",
    role: "type",
    scope: [
      "entity.name.type",
      "entity.name.class",
      "entity.name.namespace",
      "entity.name.module",
      "entity.name.scope-resolution",
      "entity.name.section.fsharp",
      "entity.other.inherited-class",
      "entity.other.alias",
      "entity.scope",
      "support.class",
      "support.type",
      "support.namespace",
      "support.other.namespace",
      "support.other.protocol",
      "meta.type.cast.expr",
      "meta.type.new.expr",
      // Grammars that scope type references and import paths as storage
      "storage.modifier.import.java",
      "storage.modifier.package.java",
      "storage.type.template.argument",
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
      "source.cs keyword.type",
    ],
  },
  {
    // Built-in types are types in every language, wherever the grammar files
    // them under keywords.
    name: "Primitive / built-in type",
    role: "type",
    scope: [
      "support.type.primitive",
      "support.type.builtin",
      "support.type.exception.python",
      "storage.type.primitive",
      "storage.type.built-in",
      "entity.name.type.primitive",
      "entity.name.type.numeric.rust",
      "storage.type.core.rust",
      "storage.class.std.rust",
      "storage.type.numeric.go",
      "storage.type.string.go",
      "storage.type.byte.go",
      "storage.type.boolean.go",
      "storage.type.rune.go",
      "storage.type.error.go",
      "storage.type.uintptr.go",
      "entity.name.type.any.go",
      "entity.name.type.comparable.go",
      "storage.type.c",
      "storage.type.objc",
      "storage.type.php",
      "storage.type.haskell",
      "storage.type.ocaml",
      "storage.type.sql",
      "storage.type.basic",
      "storage.type.id",
      "storage.type.integral",
      "keyword.other.type.php",
      "keyword.primitive-datatypes.swift",
    ],
  },
  {
    name: "Type parameter / lifetime / doc comment type",
    role: "type",
    scope: [
      "entity.name.type.parameter",
      "entity.name.type.type-parameter",
      "entity.name.type.lifetime",
      "variable.language.generic-parameter",
      "punctuation.definition.lifetime",
      "entity.name.type.instance.jsdoc",
      "comment.block.documentation entity.name.type",
      "entity.name.type.anchor.yaml",
      "variable.other.anchor.yaml",
      "variable.other.alias.yaml",
      "punctuation.definition.anchor.yaml",
      "punctuation.definition.alias.yaml",
    ],
  },

  // ── Parameters ──
  {
    name: "Parameter / named argument",
    role: "parameter",
    scope: [
      "variable.parameter",
      "meta.parameter variable",
      "meta.function.parameters variable.other",
      "entity.name.variable.parameter",
      "variable.parameter.function-call.python",
    ],
  },

  // ── Markup tags ──
  {
    name: "Tag / component / CSS tag selector",
    role: "tag",
    scope: [
      "entity.name.tag",
      "entity.name.tag.custom",
      "entity.name.tag.component",
      "support.class.component",
      "meta.tag.sgml.doctype",
      "entity.name.tag.namespace",
      "entity.other.namespace-prefix",
      "entity.name.namespace-prefix",
    ],
  },
  {
    name: "Tag brackets",
    role: "tagPunctuation",
    scope: ["punctuation.definition.tag"],
  },
  {
    name: "Attribute name / CSS selector / CSS property name",
    role: "attribute",
    scope: [
      "entity.other.attribute-name",
      "support.type.property-name",
      "support.type.vendored.property-name",
      "meta.property-name",
      "variable.css",
      "source.css variable",
    ],
  },

  // ── Data files (JSON / YAML / TOML / INI / properties / dotenv) ──
  {
    name: "Key",
    role: "tag",
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
      "variable.key.dotenv",
      "variable.other.key.env",
      "variable.other.env",
    ],
  },

  // ── Markdown and other markup ──
  {
    name: "Markdown heading / separator",
    role: "constant",
    scope: [
      "markup.heading",
      "markup.heading entity.name",
      "entity.name.section",
      "meta.separator",
    ],
  },
  {
    name: "Markdown inline code",
    role: "constant",
    scope: ["markup.inline.raw", "markup.raw"],
  },
  {
    name: "Markdown code block",
    role: "variable",
    scope: ["markup.fenced_code.block", "markup.raw.block", "fenced_code.block.language"],
  },
  {
    // Emphasis is shown by color: nothing is bold or italic in the editor.
    name: "Markup bold",
    role: "keyword",
    scope: ["markup.bold", "punctuation.definition.bold"],
  },
  {
    name: "Markup italic",
    role: "type",
    scope: ["markup.italic", "punctuation.definition.italic"],
  },
  {
    name: "Markdown quote",
    role: "tag",
    scope: ["markup.quote", "punctuation.definition.quote.begin.markdown"],
  },
  {
    name: "Markdown list marker",
    role: "parameter",
    scope: [
      "punctuation.definition.list.begin.markdown",
      "beginning.punctuation.definition.list.markdown",
    ],
  },
  {
    name: "Markdown link text",
    role: "string",
    scope: [
      "string.other.link",
      "constant.other.reference.link",
    ],
  },
  {
    name: "Markdown link destination",
    role: "variable",
    scope: ["markup.underline.link"],
    fontStyle: "underline",
  },

  // ── Diff / patch files ──
  {
    name: "Diff header",
    role: "constant",
    scope: ["meta.diff.header", "meta.separator.diff", "punctuation.definition.separator.diff"],
  },
  {
    name: "Diff range",
    role: "function",
    scope: ["meta.diff.range"],
  },
  {
    name: "Diff inserted",
    role: "inserted",
    scope: ["markup.inserted", "punctuation.definition.inserted", "meta.diff.header.to-file"],
  },
  {
    name: "Diff deleted",
    role: "deleted",
    scope: ["markup.deleted", "punctuation.definition.deleted", "meta.diff.header.from-file"],
  },
  {
    name: "Diff changed",
    role: "changed",
    scope: ["markup.changed", "punctuation.definition.changed"],
  },

  // ── Log files / output channels ──
  {
    name: "Log error",
    role: "logError",
    scope: ["log.error", "log.exceptiontype", "token.error-token"],
  },
  {
    name: "Log warning",
    role: "logWarning",
    scope: ["log.warning", "token.warn-token"],
  },
  { name: "Log info", role: "logInfo", scope: ["log.info", "token.info-token"] },
  { name: "Log debug", role: "logDebug", scope: ["log.debug", "token.debug-token"] },
  {
    name: "Log timestamp / verbose",
    role: "comment",
    scope: ["log.date", "log.verbose"],
  },

  // ── Invalid ──
  {
    name: "Invalid",
    role: "invalid",
    scope: ["invalid", "invalid.illegal", "invalid.broken", "invalid.unimplemented"],
  },
  {
    name: "Deprecated",
    role: "invalid",
    scope: ["invalid.deprecated"],
    fontStyle: "strikethrough",
  },
];

export function tokenColors(p: SyntaxPalette): TokenColor[] {
  return [
    // Style-only rules: no color of their own.
    { scope: "markup.underline", settings: { fontStyle: "underline" } },
    { scope: "markup.strikethrough", settings: { fontStyle: "strikethrough" } },
    ...rules.map(({ name, role, scope, fontStyle }) => ({
      name,
      scope,
      settings: fontStyle ? { foreground: p[role], fontStyle } : { foreground: p[role] },
    })),
  ];
}

export function semanticTokenColors(
  p: SyntaxPalette,
): Record<string, string | SemanticTokenStyle> {
  return {
    // Every rule applies to every language; there are no per-language rules.

    // Keywords and operators
    keyword: p.keyword,
    controlKeyword: p.keyword,
    keywordControl: p.keyword,
    modifier: p.keyword,
    newOperator: p.keyword,
    "operator.controlFlow": p.keyword, // e.g. Rust's ?
    macro: p.keyword,
    macroBang: p.keyword,
    operator: p.variable,
    operatorOverloaded: p.function, // a call to a user-defined operator

    // Literals
    string: p.string,
    stringLiteral: p.string,
    stringVerbatim: p.string,
    regexp: p.string,
    escapeSequence: p.keyword,
    stringEscapeCharacter: p.keyword,
    formatSpecifier: p.keyword,
    invalidEscapeSequence: p.invalid,
    character: p.string,
    number: p.constant,
    numberLiteral: p.constant,
    customLiteral: p.function, // user-defined literal suffix: an operator call
    boolean: p.constant,
    builtinConstant: p.constant,
    comment: p.comment,
    "comment.documentation": p.comment,
    excludedCode: p.comment, // inactive #if / #else branches

    // this / self / cls — one treatment in every language
    selfKeyword: p.constant,
    selfParameter: p.constant,
    clsParameter: p.constant,
    selfTypeKeyword: p.type, // Self names a type

    // Types — declarations, references and built-ins alike
    namespace: p.type,
    module: p.type,
    toolModule: p.type,
    type: p.type,
    typeAlias: p.type,
    union: p.type,
    delegate: p.type,
    class: p.type,
    interface: p.type,
    enum: p.type,
    struct: p.type,
    record: p.type,
    builtinType: p.type,
    typeParameter: p.type,
    concept: p.type,
    lifetime: p.type,

    // Variables and properties are plain; constants (const, readonly, enum
    // members, built-in constants) take the constant color; parameters stand
    // apart from both.
    variable: p.variable,
    property: p.variable,
    field: p.variable,
    event: p.variable,
    recordComponent: p.variable,
    annotationMember: p.variable,
    label: p.variable,
    "variable.readonly": p.constant,
    "variable.constant": p.constant,
    "property.readonly": p.constant,
    "field.readonly": p.constant,
    enumMember: p.constant,
    const: p.constant, // Rust const / static items and const generics
    static: p.constant,
    constParameter: p.constant,
    parameter: p.parameter,

    // Functions and methods — declarations and calls, static and instance,
    // user-defined and built-in alike. Language servers report a variable
    // holding a function (e.g. the setter returned by React's useState) as a
    // function too.
    function: p.function,
    method: p.function,
    extensionMethod: p.function,
    magicFunction: p.function,

    // Decorators, annotations and attributes
    decorator: p.function,
    annotation: p.function,
    attribute: p.function,
    builtinAttribute: p.function,
    derive: p.function,
    deriveHelper: p.function,
    procMacro: p.function,

    "*.deprecated": { fontStyle: "strikethrough" },
  };
}
