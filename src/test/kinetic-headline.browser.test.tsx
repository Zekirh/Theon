import { render } from "vitest-browser-react";

import KineticHeadline from "@/components/fx/KineticHeadline";

test("reveals every word of an in-view headline together", async () => {
  await render(
    <KineticHeadline
      as="h2"
      mode="inview"
      segments={[{ text: "Services designed to create" }]}
    />,
  );

  await new Promise((resolve) => window.setTimeout(resolve, 1400));

  const heading = document.querySelector("h2");
  expect(heading?.textContent).toContain("Services designed to create");

  const wordStyles = Array.from(
    heading?.querySelectorAll("span > span") ?? [],
    (word) => word.getAttribute("style") ?? "",
  );
  expect(wordStyles).toHaveLength(4);
  expect(wordStyles.every((style) => !style.includes("translateY(115%)"))).toBe(true);
});
