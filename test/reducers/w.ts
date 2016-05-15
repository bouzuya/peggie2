import test from 'ava';

import { Action } from 'redux';
import { W, p, h, toString } from '../../src/models/w';
import { create as add } from '../../src/actions/add';
import { create as remove } from '../../src/actions/remove';
import { reducer } from '../../src/reducers/w';

const replay = (actions: Action[]): W => {
  return actions.reduce(reducer, undefined);
};

// test data
const p1 = p('2016-05-13', 2000);
const p2 = p('2016-05-23', 1000);
const h1 = h('2016-05-11', 500, 'Lunch');
const h2 = h('2016-05-12', 1500, 'Dinner');
const h3 = h('2016-05-15', 500, 'Breakfast');

test(t => {
  const actions = [
    add(0, p1)
  ];
  const lines = [
    'P 2016-05-13 2000 ? 2000'
  ];

  const s1 = toString(replay(actions));
  const s2 = lines.join('\n');
  t.true(s1 === s2);
});

test(t => {
  const actions = [
    add(0, p1),
    add(1, p2)
  ];
  const lines = [
    'P 2016-05-13 2000 ? 2000',
    'P 2016-05-23 1000 ? 1000'
  ];

  const s1 = toString(replay(actions));
  const s2 = lines.join('\n');
  t.true(s1 === s2);
});

test('3 add', t => {
  const actions = [
    add(0, p1),
    add(1, p2),
    add(0, h1)
  ];
  const lines = [
    'H 2016-05-11 500 Lunch',
    'P 2016-05-13 2000 ? 1500',
    'P 2016-05-23 1000 ? 1000'
  ];

  const s1 = toString(replay(actions));
  const s2 = lines.join('\n');
  t.true(s1 === s2);
});

test('4 add', t => {
  const actions = [
    add(0, p1),
    add(1, p2),
    add(0, h1),
    add(1, h2)
  ];
  const lines = [
    'H 2016-05-11 500 Lunch',
    'H 2016-05-12 1500 Dinner',
    'P 2016-05-13 2000 ',
    'P 2016-05-23 1000 ? 1000'
  ];

  const s1 = toString(replay(actions));
  const s2 = lines.join('\n');
  t.true(s1 === s2);
});

test('5 add', t => {
  const actions = [
    add(0, p1),
    add(1, p2),
    add(0, h1),
    add(1, h2),
    add(3, h3)
  ];
  const lines = [
    'H 2016-05-11 500 Lunch',
    'H 2016-05-12 1500 Dinner',
    'P 2016-05-13 2000 ',
    'H 2016-05-15 500 Breakfast',
    'P 2016-05-23 1000 ? 500'
  ];

  const s1 = toString(replay(actions));
  const s2 = lines.join('\n');
  t.true(s1 === s2);
});

test('5 add 1 remove', t => {
  const actions = [
    add(0, p1),
    add(1, p2),
    add(0, h1),
    add(1, h2),
    add(3, h3),
    remove(4)
  ];

  const lines = [
    'H 2016-05-11 500 Lunch',
    'H 2016-05-12 1500 Dinner',
    'P 2016-05-13 2000 ',
    'H 2016-05-15 500 Breakfast'
  ];

  const s1 = toString(replay(actions));
  const s2 = lines.join('\n');
  t.true(s1 === s2);
});
