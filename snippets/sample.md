---
title: Sample Markdown
tags: [theme, test]
draft: false
---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

Alternative Heading
===================

Paragraph with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`,
and a [link](https://example.com "Link title"). Here is an autolink: <https://example.com>
and a reference link to [the docs][docs]. Escaped \*asterisks\* stay plain.

![Image alt text](https://example.com/image.png)

[docs]: https://code.visualstudio.com/docs "VS Code Docs"

---

## Lists

- Unordered item
- Another item
  - Nested item
  * Different marker
+ Plus marker

1. Ordered item
2. Second item
   1. Nested ordered

- [x] Completed task
- [ ] Open task

## Quote

> A blockquote with **bold** text.
>
> > Nested quote.

## Code

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

```bash
npm install && npm run build
```

    Indented code block

## Table

| Left aligned | Center aligned | Right aligned |
| :----------- | :------------: | ------------: |
| Cell         | `code`         |          42.0 |
| **Bold**     | *Italic*       |             1 |

## HTML and misc

<details>
<summary>Click to expand</summary>

Hidden content with a footnote.[^1]

</details>

Line ending with two spaces  
forces a line break.

[^1]: This is the footnote.

<!-- HTML comment -->
