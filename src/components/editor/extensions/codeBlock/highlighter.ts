import { createHighlighterCoreSync } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import astro from 'shiki/langs/astro.mjs'
import c from 'shiki/langs/c.mjs'
import cpp from 'shiki/langs/cpp.mjs'
import css from 'shiki/langs/css.mjs'
import graphql from 'shiki/langs/graphql.mjs'
import html from 'shiki/langs/html.mjs'
import http from 'shiki/langs/http.mjs'
import java from 'shiki/langs/java.mjs'
import javascript from 'shiki/langs/javascript.mjs'
import json from 'shiki/langs/json.mjs'
import jsx from 'shiki/langs/jsx.mjs'
import markdown from 'shiki/langs/markdown.mjs'
import php from 'shiki/langs/php.mjs'
import python from 'shiki/langs/python.mjs'
import r from 'shiki/langs/r.mjs'
import regexp from 'shiki/langs/regexp.mjs'
import scss from 'shiki/langs/scss.mjs'
import shellscript from 'shiki/langs/shellscript.mjs'
import sql from 'shiki/langs/sql.mjs'
import svelte from 'shiki/langs/svelte.mjs'
import tsx from 'shiki/langs/tsx.mjs'
import typescript from 'shiki/langs/typescript.mjs'
import vue from 'shiki/langs/vue.mjs'
import wasm from 'shiki/langs/wasm.mjs'
import xml from 'shiki/langs/xml.mjs'
import yaml from 'shiki/langs/yaml.mjs'
import catppuccinLight from 'shiki/themes/catppuccin-latte.mjs'
import catppuccinDark from 'shiki/themes/catppuccin-mocha.mjs'

export const highlighter = createHighlighterCoreSync({
  themes: [
    catppuccinLight,
    catppuccinDark,
  ],
  langs: [
    astro,
    c,
    cpp,
    css,
    graphql,
    html,
    http,
    java,
    javascript,
    json,
    jsx,
    markdown,
    php,
    python,
    r,
    regexp,
    scss,
    shellscript,
    sql,
    svelte,
    tsx,
    typescript,
    vue,
    wasm,
    xml,
    yaml,
  ],
  engine: createJavaScriptRegexEngine(),
})
