'use strict';

/**
 * Avaliador de expressoes matematicas SEM eval/Function.
 * Suporta + - * / % ^ (), constantes (pi, e, tau) e funcoes basicas.
 * Gramatica: expr -> term (('+'|'-') term)* ; term -> unary (('*'|'/'|'%') unary)* ;
 *            unary -> ('+'|'-') unary | power ; power -> primary ('^' unary)?
 */

const MAX_EXPR_LENGTH = 200;

const FUNCTIONS = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  trunc: Math.trunc,
  sign: Math.sign,
  ln: Math.log,
  log: Math.log10,
  log10: Math.log10,
  log2: Math.log2,
  exp: Math.exp,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  min: Math.min,
  max: Math.max,
  pow: Math.pow,
};

const CONSTANTS = { pi: Math.PI, e: Math.E, tau: Math.PI * 2 };

function tokenize(expression) {
  const tokens = [];
  let i = 0;
  while (i < expression.length) {
    const char = expression[i];
    if (/\s/.test(char)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(char)) {
      let j = i;
      while (j < expression.length && /[0-9._]/.test(expression[j])) j += 1;
      const raw = expression.slice(i, j).replace(/_/g, '');
      if ((raw.match(/\./g) || []).length > 1) throw new Error(`Número inválido: ${raw}`);
      const value = Number(raw);
      if (!Number.isFinite(value)) throw new Error(`Número inválido: ${raw}`);
      tokens.push({ type: 'number', value });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(char)) {
      let j = i;
      while (j < expression.length && /[a-zA-Z0-9_]/.test(expression[j])) j += 1;
      tokens.push({ type: 'identifier', value: expression.slice(i, j).toLowerCase() });
      i = j;
      continue;
    }
    if ('+-*/%^(),'.includes(char)) {
      tokens.push({ type: 'operator', value: char });
      i += 1;
      continue;
    }
    throw new Error(`Caractere não permitido na expressão: "${char}"`);
  }
  return tokens;
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
  }

  peek() {
    return this.tokens[this.position];
  }

  next() {
    return this.tokens[this.position++];
  }

  isOperator(...values) {
    const token = this.peek();
    return Boolean(token && token.type === 'operator' && values.includes(token.value));
  }

  expect(value) {
    const token = this.next();
    if (!token || token.type !== 'operator' || token.value !== value) {
      throw new Error(`Esperava "${value}" na expressão.`);
    }
  }

  parseExpression() {
    let value = this.parseTerm();
    while (this.isOperator('+', '-')) {
      const operator = this.next().value;
      const right = this.parseTerm();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  }

  parseTerm() {
    let value = this.parseUnary();
    while (this.isOperator('*', '/', '%')) {
      const operator = this.next().value;
      const right = this.parseUnary();
      if ((operator === '/' || operator === '%') && right === 0) {
        throw new Error('Divisão por zero.');
      }
      value = operator === '*' ? value * right : operator === '/' ? value / right : value % right;
    }
    return value;
  }

  parseUnary() {
    if (this.isOperator('+', '-')) {
      const operator = this.next().value;
      const value = this.parseUnary();
      return operator === '-' ? -value : value;
    }
    return this.parsePower();
  }

  parsePower() {
    const base = this.parsePrimary();
    if (this.isOperator('^')) {
      this.next();
      return Math.pow(base, this.parseUnary());
    }
    return base;
  }

  parsePrimary() {
    const token = this.peek();
    if (!token) throw new Error('Expressão incompleta.');

    if (token.type === 'number') {
      this.next();
      return token.value;
    }

    if (this.isOperator('(')) {
      this.next();
      const value = this.parseExpression();
      this.expect(')');
      return value;
    }

    if (token.type === 'identifier') {
      this.next();
      const name = token.value;
      if (this.isOperator('(')) {
        this.next();
        const args = [];
        if (!this.isOperator(')')) {
          do {
            args.push(this.parseExpression());
          } while (this.isOperator(',') && this.next());
        }
        this.expect(')');
        const fn = FUNCTIONS[name];
        if (!fn) throw new Error(`Função desconhecida: ${name}`);
        return fn(...args);
      }
      if (Object.prototype.hasOwnProperty.call(CONSTANTS, name)) return CONSTANTS[name];
      throw new Error(`Identificador desconhecido: ${name}`);
    }

    throw new Error(`Token inesperado: ${token.value}`);
  }
}

function evaluate(expression) {
  if (typeof expression !== 'string' || !expression.trim()) {
    throw new Error('Informe uma expressão matemática.');
  }
  const clean = expression.trim().slice(0, MAX_EXPR_LENGTH);
  const tokens = tokenize(clean);
  if (!tokens.length) throw new Error('Expressão vazia.');
  const parser = new Parser(tokens);
  const result = parser.parseExpression();
  if (parser.position !== tokens.length) throw new Error('Expressão com sintaxe inválida.');
  if (!Number.isFinite(result)) throw new Error('Resultado indefinido ou infinito.');
  const rounded = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
  return { expression: clean, result: rounded };
}

module.exports = { evaluate, tokenize, FUNCTIONS, CONSTANTS };
