import { curveAt, pointAt } from "../../lib/knowledge-field";
const svg = document.querySelector<SVGSVGElement>("[data-knowledge-field]");
const control = document.querySelector<HTMLButtonElement>("[data-motion-toggle]");
const hero = svg?.closest<HTMLElement>(".hero");
if (svg && control && hero) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let visible = false;
  let initialized = false;
  const phases = Array.from({ length: 13 }, (_, i) => (i / 12) * Math.PI * 2);
  const animate = (node: SVGElement, attribute: string, values: string[]) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    element.setAttribute("attributeName", attribute);
    element.setAttribute("dur", "18s");
    element.setAttribute("repeatCount", "indefinite");
    element.setAttribute("values", values.join(";"));
    node.append(element);
  };
  const initialize = () => {
    svg.querySelectorAll<SVGPathElement>("[data-row]").forEach((path) =>
      animate(
        path,
        "d",
        phases.map((phase) => curveAt(Number(path.dataset.row) / 42, phase)),
      ),
    );
    svg.querySelectorAll<SVGCircleElement>("[data-u]").forEach((point) => {
      for (const [attribute, coordinate] of [
        ["cx", "x"],
        ["cy", "y"],
      ] as const)
        animate(
          point,
          attribute,
          phases.map((phase) =>
            pointAt(Number(point.dataset.u), Number(point.dataset.v), phase)[coordinate].toFixed(2),
          ),
        );
    });
    initialized = true;
  };
  const sync = () => {
    const running = visible && !paused && !preference.matches && !document.hidden;
    if (running && !initialized) initialize();
    hero.classList.toggle("is-paused", !running);
    if (running) svg.unpauseAnimations();
    else svg.pauseAnimations();
    control.hidden = preference.matches;
    control.setAttribute("aria-pressed", String(paused));
    control.setAttribute(
      "aria-label",
      (paused ? control.dataset.playLabel : control.dataset.pauseLabel)!,
    );
  };
  control.addEventListener("click", () => {
    paused = !paused;
    sync();
  });
  preference.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    sync();
  });
  observer.observe(hero);
  sync();
}
