/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { HeroUI_Catalog } from './../HeroUI_Catalog';
import type { HeroUI_CatalogProps } from './../HeroUI_Catalog.types';

export default {
  title: 'Documentation/HeroUI Catalog',
  component: HeroUI_Catalog,
} as Meta;

const Template: StoryFn<HeroUI_CatalogProps> = (args: HeroUI_CatalogProps) => {
  return <HeroUI_Catalog {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as HeroUI_CatalogProps;
Basic.parameters = {
  options: { showPanel: false, bottomPanelHeight: 0 },
};
