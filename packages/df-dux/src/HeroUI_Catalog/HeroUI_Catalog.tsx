/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useState } from 'react';
import { type Key, useFilter } from '@heroui/react';

import {
  ArrowsRotateLeft,
  Box,
  ChevronDown,
  CreditCard,
  PlanetEarth,
  Receipt,
  ShoppingBag,
} from '@gravity-ui/icons';

import {
  Accordion,
  Alert,
  AlertDialog,
  Autocomplete,
  Button,
  CloseButton,
  EmptyState,
  Spinner,
  SearchField,
  Label,
  ListBox,
  Tag,
  TagGroup,
} from '@df/dux';

import type { HeroUI_CatalogProps } from './HeroUI_Catalog.types';
import { useHeroUI_CatalogStyles } from './HeroUI_Catalog.styles';

// Render Config Object
const acco_items = [
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <ShoppingBag />,
    title: 'How do I place an order?',
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <Receipt />,
    title: 'Can I modify or cancel my order?',
  },
  {
    content: 'We accept all major credit cards, including Visa, Mastercard, and American Express.',
    icon: <CreditCard />,
    title: 'What payment methods do you accept?',
  },
  {
    content:
      'Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.',
    icon: <Box />,
    title: 'How much does shipping cost?',
  },
  {
    content:
      'Yes, we ship to most countries. Please check our shipping rates and policies for more information.',
    icon: <PlanetEarth />,
    title: 'Do you ship internationally?',
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <ArrowsRotateLeft />,
    title: 'How do I request a refund?',
  },
];


const auto_items = [
  { id: 'florida', name: 'Florida' },
  { id: 'delaware', name: 'Delaware' },
  { id: 'california', name: 'California' },
  { id: 'texas', name: 'Texas' },
  { id: 'new-york', name: 'New York' },
  { id: 'washington', name: 'Washington' },
];

/**
 * Render the final JSX of HeroUI_Catalog
 */
export const HeroUI_Catalog: React.FC<HeroUI_CatalogProps> = (props: HeroUI_CatalogProps): JSX.Element => {
  const styles = useHeroUI_CatalogStyles();

  const { contains } = useFilter({ sensitivity: 'base' });

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const onRemoveTags = (keys: Set<Key>) => {
    setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
  };

  return (
    <article>
      <section>
        <h2>Accordion</h2>

        <hr />

        <Accordion className="w-full max-w-md">
          {acco_items.map((item, index) => (
            <Accordion.Item key={index}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  {item.icon ? <span className="mr-3 size-4 shrink-0 text-muted">{item.icon}</span> : null}
                  {item.title}
                  <Accordion.Indicator>
                    <ChevronDown />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>{item.content}</Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      <section>
        <h2>Alert</h2>

        <hr />

        <div className="grid w-full max-w-xl gap-4">
          {/* Default - General information */}
          <Alert>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>New features available</Alert.Title>
              <Alert.Description>
                Check out our latest updates including dark mode support and improved accessibility features.
              </Alert.Description>
            </Alert.Content>
          </Alert>
          {/* Accent - Important information with action */}
          <Alert status="accent">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Update available</Alert.Title>
              <Alert.Description>
                A new version of the application is available. Please refresh to get the latest features and
                bug fixes.
              </Alert.Description>
              <Button className="mt-2 sm:hidden" size="sm" variant="primary">
                Refresh
              </Button>
            </Alert.Content>
            <Button className="hidden sm:block" size="sm" variant="primary">
              Refresh
            </Button>
          </Alert>
          {/* Danger - Error with detailed steps */}
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Unable to connect to server</Alert.Title>
              <Alert.Description>
                We're experiencing connection issues. Please try the following:
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>Check your internet connection</li>
                  <li>Refresh the page</li>
                  <li>Clear your browser cache</li>
                </ul>
              </Alert.Description>
              <Button className="mt-2 sm:hidden" size="sm" variant="danger">
                Retry
              </Button>
            </Alert.Content>
            <Button className="hidden sm:block" size="sm" variant="danger">
              Retry
            </Button>
          </Alert>
          {/* Without description */}
          <Alert status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Profile updated successfully</Alert.Title>
            </Alert.Content>
            <CloseButton />
          </Alert>
          {/* Custom indicator - Loading state */}
          <Alert status="accent">
            <Alert.Indicator>
              <Spinner size="sm" />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>Processing your request</Alert.Title>
              <Alert.Description>
                Please wait while we sync your data. This may take a few moments.
              </Alert.Description>
            </Alert.Content>
          </Alert>
          {/* Without close button */}
          <Alert status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Scheduled maintenance</Alert.Title>
              <Alert.Description>
                Our services will be unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM UTC for
                scheduled maintenance.
              </Alert.Description>
            </Alert.Content>
          </Alert>
        </div>
      </section>

      <section>
        <h2>Alert Dialog</h2>

        <hr />

        <AlertDialog>
          <Button variant="danger">Delete Project</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    This will permanently delete <strong>My Awesome Project</strong> and all of its data. This
                    action cannot be undone.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button slot="close" variant="danger">
                    Delete Project
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </section>

      <section>
        <h2>Autocomplete</h2>

        <hr />

        <Autocomplete
          className="w-[256px]"
          placeholder="Select states"
          selectionMode="multiple"
          value={selectedKeys}
          onChange={(keys: Key | Key[] | null) => setSelectedKeys(keys as Key[])}
        >
          <Label>States to Visit</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value>
              {({ defaultChildren, isPlaceholder, state }: any) => {
                if (isPlaceholder || state.selectedItems.length === 0) {
                  return defaultChildren;
                }
                const selectedItemsKeys = state.selectedItems.map((item: any) => item.key);
                return (
                  <TagGroup size="sm" onRemove={onRemoveTags}>
                    <TagGroup.List>
                      {selectedItemsKeys.map((selectedItemKey: Key) => {
                        const item = auto_items.find((s) => s.id === selectedItemKey);
                        if (!item) return null;
                        return (
                          <Tag key={item.id} id={item.id}>
                            {item.name}
                          </Tag>
                        );
                      })}
                    </TagGroup.List>
                  </TagGroup>
                );
              }}
            </Autocomplete.Value>
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {auto_items.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
      </section>
    </article>
  );
};
