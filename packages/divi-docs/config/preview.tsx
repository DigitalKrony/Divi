/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type Parameters, type Decorator } from "@storybook/react-vite";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";

import { StoryWrapper } from "../src/StoryWrapper";

export const parameters: Parameters = {
  options: {
    showPanel: true,
    storySort: {
      order: [
        "Documentation",
        "DUX Controls",
        "HeroUI Controls",
        "App Controls",
        "Child Controls",
        "Pages",
        "Layouts",
        "Patterns",
      ],
    },
  },
  tags: ["autodocs"],
  a11y: {
    test: "todo",
  },
  controls: {
    disable: false,
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  docs: {
    toc: false,
    title: "TOC",
    ignoreSelector: "#Basic",
    disabled: false,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        {/* <Stories /> */}
      </>
    ),
  },
};

export const decorators: Decorator[] = [
  (LoadedStory: any, args: any) => {
    const { options } = args.parameters;

    return (
      <StoryWrapper>
        <LoadedStory />
      </StoryWrapper>
    );
  },
];
