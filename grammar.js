// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  let parser, State;
  var grammar = {
    Lexer: undefined,
    ParserRules: [
      { name: "Main$ebnf$1", symbols: ["Ele"], postprocess: id },
      {
        name: "Main$ebnf$1",
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: "Main",
        symbols: ["Main$ebnf$1"],
        postprocess: (d) => d.flat(Infinity),
      },
      { name: "Ele", symbols: ["TextThenSpecial"] },
      { name: "Ele", symbols: ["SpecialThenText"] },
      {
        name: "TextThenSpecial$ebnf$1",
        symbols: ["SpecialThenText"],
        postprocess: id,
      },
      {
        name: "TextThenSpecial$ebnf$1",
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: "TextThenSpecial",
        symbols: ["Text", "TextThenSpecial$ebnf$1"],
        postprocess: function (d, l, reject) {
          return d[1] ? [d[0], d[1]] : [d[0]];
        },
      },
      { name: "SpecialThenText$ebnf$1", symbols: ["Special"] },
      {
        name: "SpecialThenText$ebnf$1",
        symbols: ["Special", "SpecialThenText$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        },
      },
      {
        name: "SpecialThenText$ebnf$2",
        symbols: ["TextThenSpecial"],
        postprocess: id,
      },
      {
        name: "SpecialThenText$ebnf$2",
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: "SpecialThenText",
        symbols: ["SpecialThenText$ebnf$1", "SpecialThenText$ebnf$2"],
        postprocess: function (d, l, reject) {
          return d[1] ? [d[0], d[1]] : [d[0]];
        },
      },
      { name: "Text$ebnf$1", symbols: [/[^\u0019\u001b\u001f]/] },
      {
        name: "Text$ebnf$1",
        symbols: [/[^\u0019\u001b\u001f]/, "Text$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        },
      },
      {
        name: "Text",
        symbols: ["Text$ebnf$1"],
        postprocess: function (d, l, reject) {
          return d.flat(Infinity).join("");
        },
      },
      {
        name: "Special$subexpression$1$subexpression$1",
        symbols: [{ literal: "\u0019", pos: 60 }],
        postprocess: function ([_, args], __, ___, index) {
          return { index };
        },
      },
      {
        name: "Special$subexpression$1",
        symbols: [
          "Special$subexpression$1$subexpression$1",
          "Main",
          { literal: "\u001b", pos: 67 },
        ],
        postprocess: function ([{index}, args]) {
          return { args, index };
        },
      },
      {
        name: "Special$subexpression$1",
        symbols: [{ literal: "\u001f", pos: 73 }],
        postprocess: function (_, __, ___, index) {
          return { index };
        },
      },
      { name: "Special", symbols: ["Special$subexpression$1"], postprocess: id },
    ],
    ParserStart: "Main",
    setParser: (p) => {
      parser = p;
      State = parser.table[parser.current].states[0].constructor;
      State.prototype.nextState = function (child) {
        var state = new State(
          this.rule,
          this.dot + 1,
          this.reference,
          this.wantedBy
        );
        state.left = this;
        state.right = child;
        state.index=parser.lexer.index
        if (state.isComplete) {
          state.data = state.build();
          // Having right set here will prevent the right state and its children
          // form being garbage collected
          state.right = undefined;
        }
        return state;
      };
      State.prototype.finish = function() {
        if (this.rule.postprocess) {
          this.data = this.rule.postprocess(this.data, this.reference, null, this.index);            
        }
    }
    },
  };
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
