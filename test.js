/*global $, test, ok, _, Gaddag, Scorer, dictionary_sample */

"use strict";

var gaddag = new Gaddag(),
  scorer = new Scorer(),
  wordArray = ["A", "AT", "CAR", "CAT", "CARE", "CARREL", "DATE", "PRECEDE", "PRESTO", "RADIUS"];

test("Gaddag", function () {
  ok(gaddag.add(wordArray), "should add words to its inner trie structure");

  ok(gaddag.getJSON() === '{"A":{">":{"$":0,"T":0},"C":{">":{"R":{"$":0,"E":0,"R":{"E":{"L":0}}},"T":0}},"D":{">":{"T":{"E":0}}},"R":{">":{"D":{"I":{"U":{"S":0}}}}}},"T":{"A":{">":0,"C":{">":0},"D":{">":{"E":0}}},"S":{"E":{"R":{"P":{">":{"O":0}}}}}},"C":{">":{"A":{"R":{"$":0,"E":0,"R":{"E":{"L":0}}},"T":0}},"E":{"R":{"P":{">":{"E":{"D":{"E":0}}}}}}},"R":{"A":{"C":{">":{"$":0,"E":0,"R":{"E":{"L":0}}}}},"R":{"A":{"C":{">":{"E":{"L":0}}}}},"P":{">":{"E":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}},">":{"A":{"D":{"I":{"U":{"S":0}}}}}},"E":{"R":{"A":{"C":{">":0}},"R":{"A":{"C":{">":{"L":0}}}},"P":{">":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}},"T":{"A":{"D":{">":0}}},"C":{"E":{"R":{"P":{">":{"D":{"E":0}}}}}},"D":{"E":{"C":{"E":{"R":{"P":{">":0}}}}}}},"L":{"E":{"R":{"R":{"A":{"C":{">":0}}}}}},"D":{">":{"A":{"T":{"E":0}}},"E":{"C":{"E":{"R":{"P":{">":{"E":0}}}}}},"A":{"R":{">":{"I":{"U":{"S":0}}}}}},"P":{">":{"R":{"E":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}}},"S":{"E":{"R":{"P":{">":{"T":{"O":0}}}}},"U":{"I":{"D":{"A":{"R":{">":0}}}}}},"O":{"T":{"S":{"E":{"R":{"P":{">":0}}}}}},"I":{"D":{"A":{"R":{">":{"U":{"S":0}}}}}},"U":{"I":{"D":{"A":{"R":{">":{"S":0}}}}}}}', "should get its JSON representation");

  ok(_.isEqual(gaddag.findWordsWithHook("U"), ["RADIUS"]), "should find all words with U");
  ok(_.isEqual(gaddag.findWordsWithHook("E"), ["CARE", "CARREL", "PRECEDE", "PRESTO", "DATE", "PRECEDE", "PRECEDE"]), "should find all words with E");
  ok(_.isEqual(gaddag.findWordsWithHook("D"), ["DATE", "PRECEDE", "RADIUS"]), "should find all words with D");

  ok(_.isEqual(gaddag.findWordsWithRackAndHook(["S", "T"], "U"), []), "should find all words with U that can be formed using S and T");
  ok(_.isEqual(gaddag.findWordsWithRackAndHook(["S", "D", "T", "I", "A", "R"], "U"), ["RADIUS"]), "should find all words with U that can be formed using S, D, T, I, A and R");
  ok(_.isEqual(gaddag.findWordsWithRackAndHook(["D", "P", "A", "T", "R", "O", "S"], "E"), ["PRESTO", "DATE"]), "should find all words with E that can be formed using D, P, A, T, R, O and S");

  ok(_.isEqual(gaddag.findWordsWithRackAndHook(["D", "P", "A", "T", "R", "C", "E"], ""), ["A", "AT", "CAR", "CARE", "CAT", "DATE", "PRECEDE"]), 'should find all words that can be formed using ["D", "P", "A", "T", "R", "C", "E"] at start of game (no hook)');
});

test("Scorer", function () {
  ok(scorer.score("RADIUS") === 7, "should find the score for RADIUS");
  ok(_.isEqual(scorer.sortByScore(wordArray), ["PRECEDE", "PRESTO", "CARREL", "RADIUS", "CARE", "DATE", "CAT", "CAR", "AT", "A"]), "should sort the words by decreasing score");
  ok(scorer.findBestWord(wordArray) === "PRECEDE", "should find the best scoring word");
});

test("Performance", function () {
  ok(gaddag.add(dictionary_sample), "for adding words to a GADDAG");
});
