let currentvalue = "";
function getHeight(element) {
  let textareaProps;
  const proxy = document.querySelector("#proxy");
  const { padding, width, fontSize, minHeight, lineHeight } =
    getComputedStyle(element);
  const css = [
    "position:absolute",
    "visibility: hidden",
    "pointer-events:none",
    `width: ${width}`,
    `padding:${padding}`,
    `min-height: ${minHeight}`,
    `font-size:${fontSize}`,
    `line-height:${lineHeight}`,
  ].join(";");
  proxy.style.cssText = css;
  proxy.setAttribute("aria-hidden", "true");
  proxy.innerText = element.value + ".";
  return proxy.offsetHeight + parseInt(fontSize.slice(0, -2)) + "px";
}
function resize() {
  fixit.style.height = getHeight(fixit);
  preview.textContent = fixit.value;
  renderMathInElement(preview, {
    throwOnError: false,
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
  });
  document.documentElement.style.setProperty("--scrollbar-width", Math.ceil(container.getBoundingClientRect().width-container.scrollWidth)+"px")
}
fixit.oninput = window.onresize = resize;
resize()
fixit.onpaste = (e) => {
  let gdoc=e.clipboardData.getData(
        "application/x-vnd.google-docs-document-slice-clip+wrapped"
      );
  if(!gdoc) return
  e.preventDefault();
  const data = JSON.parse(
    JSON.parse(
      gdoc
    ).data
  );
  //console.log(equations, data)
  let symbols = data.resolved.dsl_styleslices
    .find((e) => e.stsl_type == "equation_function")
    .stsl_styles.filter((e) => e);
  let text = data.resolved.dsl_spacers.replace(
    /\u0019(.+?)\u001b|\u001f/g,
    (_, args) => {
      let latex = symbols.shift().eqfs_c;
      console.log([_, latex, data.resolved.dsl_spacers]);
      args = (args || "").split("\u001d");
      if (latex == "\\rootof") {
        latex = "\\sqrt[" + args.shift() + "]";
      } else if (latex == "\\superscript") {
        latex = args[0] + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\subscript") {
        latex = args[0] + "_{" + args[1] + "}";
        args = [];
      } else if (latex == "\\subsuperscript") {
        latex = args[0] + "_{" + args[1] + "}" + "^{" + args[2] + "}";
        args = [];
      } else if (latex == "\\bigcupab") {
        latex =
          "\\bigcup\\limits" + "_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\bigcapab") {
        latex = "\\bigcap\\limits_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\prodab") {
        latex = "\\prod\\limits_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\coprodab") {
        latex = "\\coprod\\limits_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\rbracelr") {
        latex = "\\left(" + args[0] + "\\right)";
        args = [];
      } else if (latex == "\\sbracelr") {
        latex = "\\left[" + args[0] + "\\right]";
        args = [];
      } else if (latex == "\\bracelr") {
        latex = "\\left\\{" + args[0] + "\\right\\}";
        args = [];
      } else if (latex == "\\abs") {
        latex = "\\left|" + args[0] + "\\right|";
        args = [];
      } else if (latex == "\\intab") {
        latex = "\\int_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\ointab") {
        latex = "\\oint_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\sumab") {
        latex = "\\sum\\limits_{" + args[0] + "}" + "^{" + args[1] + "}";
        args = [];
      } else if (latex == "\\limab") {
        latex = "\\lim\\limits_{" + args[0] + " \\to " + args[1] + "}";
        args = [];
      }
      return latex + (args.length > 0 ? "{" + args.join("}{") + "}" : "");
    }
  );
  window.text = text;
  window.symbols = symbols;
  window.data = data;
  const equations = text
    .match(/\u001a[^\u001e]+\u001e/g)
    .map((e) => "$" + e.slice(1, -1) + "$");
  document.execCommand("insertText", false, equations.join("\n"));
  resize();
};
info.onclick=()=>Swal.fire({
  title: "About",
  html: `When you copy an equation from Google Docs, it doesn't paste right anywhere else. Formula Fixer fixes that, converting Google Docs formulas into <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mtext>LaTeX</mtext></mrow><annotation encoding="application/x-tex">\LaTeX</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.8988em; vertical-align: -0.2155em;"></span><span class="mord text"><span class="mord textrm">L</span><span class="mspace" style="margin-right: -0.36em;"></span><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.6833em;"><span class="" style="top: -2.905em;"><span class="pstrut" style="height: 2.7em;"></span><span class="mord"><span class="mord textrm mtight sizing reset-size6 size3">A</span></span></span></span></span></span><span class="mspace" style="margin-right: -0.15em;"></span><span class="mord text"><span class="mord textrm">T</span><span class="mspace" style="margin-right: -0.1667em;"></span><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.4678em;"><span class="" style="top: -2.7845em;"><span class="pstrut" style="height: 3em;"></span><span class="mord"><span class="mord textrm">E</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.2155em;"><span class=""></span></span></span></span><span class="mspace" style="margin-right: -0.125em;"></span><span class="mord textrm">X</span></span></span></span></span></span> math, so you can paste <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>y</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt><mi>x</mi></msqrt></mrow><annotation encoding="application/x-tex">y=\frac{1}{2}\sqrt{x}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.625em; vertical-align: -0.1944em;"></span><span style="margin-right: 0.0359em;" class="mord mathnormal">y</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 1.1901em; vertical-align: -0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.8451em;"><span class="" style="top: -2.655em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span class="" style="top: -3.23em;"><span class="pstrut" style="height: 3em;"></span><span class="frac-line" style="border-bottom-width: 0.04em;"></span></span><span class="" style="top: -3.394em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.345em;"><span class=""></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.8003em;"><span class="svg-align" style="top: -3em;"><span class="pstrut" style="height: 3em;"></span><span class="mord" style="padding-left: 0.833em;"><span class="mord mathnormal">x</span></span></span><span class="" style="top: -2.7603em;"><span class="pstrut" style="height: 3em;"></span><span class="hide-tail" style="min-width: 0.853em; height: 1.08em;"><svg width="400em" height="1.08em" viewBox="0 0 400000 1080" preserveAspectRatio="xMinYMin slice"><path d="M95,702 c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14 c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54 c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10 s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429 c69,-144,104.5,-217.7,106.5,-221 l0 -0 c5.3,-9.3,12,-14,20,-14 H400000v40H845.2724 s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7 c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z M834 80h400000v40h-400000z"></path></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.2397em;"><span class=""></span></span></span></span></span></span></span></span> and not y=12x. Formula Fixer is a project by <a href="https://easrng.net">easrng</a>. I am not affiliated with Google. If you find any bugs, please contact me with a sample Google Doc that breaks it. Current known issues:<ul><li>Nested expressions (like <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mfrac><mn>1</mn><mn>2</mn></mfrac></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\frac{1}{2}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1.84em; vertical-align: -0.6049em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 1.2351em;"><span class="svg-align" style="top: -3.8em;"><span class="pstrut" style="height: 3.8em;"></span><span class="mord" style="padding-left: 1em;"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.8451em;"><span class="" style="top: -2.655em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span class="" style="top: -3.23em;"><span class="pstrut" style="height: 3em;"></span><span class="frac-line" style="border-bottom-width: 0.04em;"></span></span><span class="" style="top: -3.394em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.345em;"><span class=""></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span><span class="" style="top: -3.1951em;"><span class="pstrut" style="height: 3.8em;"></span><span class="hide-tail" style="min-width: 1.02em; height: 1.88em;"><svg width="400em" height="1.88em" viewBox="0 0 400000 1944" preserveAspectRatio="xMinYMin slice"><path d="M983 90 l0 -0 c4,-6.7,10,-10,18,-10 H400000v40 H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7 s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744 c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30 c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722 c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5 c53.7,-170.3,84.5,-266.8,92.5,-289.5z M1001 80h400000v40h-400000z"></path></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.6049em;"><span class=""></span></span></span></span></span></span></span></span>) don't work</li></ul>`
})