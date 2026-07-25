/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { useState } from 'react';
import { cn } from '@heroui/react';

import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Calendar,
  Card,
  CardHeader,
  Image,
  CardFooter,
  CheckboxGroup,
  Checkbox,
  Chip,
  CircularProgress,
  Code,
  DateInput,
  DatePicker,
  DateRangePicker,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Form,
  Input,
  InputOtp,
  Kbd,
  Link,
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NumberInput,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
  RadioGroup,
  Radio,
  RangeCalendar,
  ScrollShadow,
  Select,
  SelectItem,
  Skeleton,
  Slider,
  Snippet,
  Spacer,
  Spinner,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  ToastProvider,
  addToast,
  Textarea,
  Text,
  TimeInput,
  Tooltip,
  User,
} from '@df/dux';
import { Time, CalendarDate, today, getLocalTimeZone } from '@internationalized/date';

import type { ComponentShowcaseProps } from './ComponentShowcase.types';
import { useComponentShowcaseStyles } from './ComponentShowcase.styles';

type IconProps = {
  size?: number;
  height?: number;
  width?: number;
};

const ListboxWrapper = (props: { children?: JSX.Element }): JSX.Element => {
  const { children } = props;
  return (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
};

const CustomCard = () => {
  return (
    <Card className="w-[200px] space-y-5 p-4 r-3">
      <div className="h-24 rounded-lg bg-default-300" />
      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
      </div>
    </Card>
  );
};

const NotificationIcon = (props: IconProps) => {
  const { size, width, height } = props;
  return (
    <svg
      fill="none"
      height={props.size || props.height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const CheckIcon = (props: IconProps) => {
  const { size, width, height } = props;
  return (
    <svg
      fill="none"
      height={size || height || 18}
      viewBox="0 0 24 24"
      width={size || width || 18}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const AcmeLogo = (props: IconProps) => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const animals = [
  { label: 'Cat', key: 'cat', description: 'The second most popular pet in the world' },
  { label: 'Dog', key: 'dog', description: 'The most popular pet in the world' },
  { label: 'Elephant', key: 'elephant', description: 'The largest land animal' },
  { label: 'Lion', key: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', key: 'tiger', description: 'The largest cat species' },
  { label: 'Giraffe', key: 'giraffe', description: 'The tallest land animal' },
  {
    label: 'Dolphin',
    key: 'dolphin',
    description: 'A widely distributed and diverse group of aquatic mammals',
  },
  { label: 'Penguin', key: 'penguin', description: 'A group of aquatic flightless birds' },
  { label: 'Zebra', key: 'zebra', description: 'A several species of African equids' },
  {
    label: 'Shark',
    key: 'shark',
    description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
  },
  {
    label: 'Whale',
    key: 'whale',
    description: 'Diverse group of fully aquatic placental marine mammals',
  },
  { label: 'Otter', key: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
  { label: 'Crocodile', key: 'crocodile', description: 'A large semiaquatic reptile' },
];

/**
 * Render the final JSX of ComponentShowcase
 */
export const ComponentShowcase: React.FC<ComponentShowcaseProps> = (
  props: ComponentShowcaseProps
): JSX.Element => {
  const { children } = props;
  const styles = useComponentShowcaseStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [value, setValue] = useState('');

  const variants = ['solid', 'underlined', 'bordered', 'light'];

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data as any);
  };

  return (
    <div className={cn(styles.root, 'flex', 'flex-col', 'gap-4', 'pl-4')}>
      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Accordion
        </Text>
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Autocomplete
        </Text>
        <Autocomplete
          className="max-w-xs"
          defaultItems={animals}
          label="Favorite Animal"
          placeholder="Search an animal"
        >
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Alert
        </Text>
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col w-full">
            {['default', 'primary', 'secondary', 'success', 'warning', 'danger'].map((color) => (
              <div key={color} className="w-full flex items-center my-3">
                <Alert color={color as any} title={`This is a ${color} alert`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Avatar
        </Text>
        <div className="flex gap-3 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar name="Junior" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar name="Jane" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar name="Joe" />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Badge
        </Text>
        <div className="flex gap-5 items-center">
          <Badge color="danger" content="5">
            <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </Badge>
          <Badge color="success" content="" placement="bottom-right" shape="circle">
            <Avatar radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          </Badge>
          <Badge color="danger" content="new" size="sm">
            <Avatar
              isBordered
              color="danger"
              radius="md"
              src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
            />
          </Badge>
          <Badge isOneChar color="success" content={<CheckIcon />} placement="bottom-right">
            <Avatar
              isBordered
              color="success"
              radius="md"
              src="https://i.pravatar.cc/300?u=a042581f4e290267072"
            />
          </Badge>
          <Badge
            isOneChar
            color="danger"
            content={<NotificationIcon size={12} />}
            placement="top-right"
            shape="circle"
          >
            <Avatar radius="full" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026704f" />
          </Badge>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Breadcrumbs
        </Text>
        <Breadcrumbs isDisabled>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Music</BreadcrumbItem>
          <BreadcrumbItem>Artist</BreadcrumbItem>
          <BreadcrumbItem>Album</BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Button
        </Text>
        <div className="flex flex-wrap gap-4 items-center">
          <Button color="default">Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Calendar
        </Text>
        <div className="flex gap-x-4">
          <Calendar aria-label="Date (No Selection)" />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Card
        </Text>
        <div className="min-w-[60px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-black font-medium text-2xl">Acme camera</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src="https://heroui.com/images/card-example-6.jpeg"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button className="text-tiny" color="primary" radius="full" size="sm">
                Notify Me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
              <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src="https://heroui.com/images/card-example-5.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex grow gap-2 items-center">
                <Image
                  alt="Breathing app icon"
                  className="rounded-full w-10 h-11 bg-black"
                  src="https://heroui.com/images/breathing-app-icon.jpeg"
                />
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">Breathing App</p>
                  <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Get App
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Checkbox
        </Text>
        <Checkbox defaultSelected>Option</Checkbox>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Checkbox Group
        </Text>
        <CheckboxGroup defaultValue={['buenos-aires', 'london']} label="Select cities">
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </CheckboxGroup>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Chip
        </Text>
        <Chip>Chip</Chip>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Circular Progress
        </Text>
        <div className="flex gap-4">
          <CircularProgress aria-label="Loading..." color="default" />
          <CircularProgress aria-label="Loading..." color="primary" />
          <CircularProgress aria-label="Loading..." color="secondary" />
          <CircularProgress aria-label="Loading..." color="success" />
          <CircularProgress aria-label="Loading..." color="warning" />
          <CircularProgress aria-label="Loading..." color="danger" />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Code
        </Text>
        <Code>npm install @heroui/react</Code>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Date Input
        </Text>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <DateInput
            className="max-w-sm"
            label={'Birth date'}
            placeholderValue={new CalendarDate(1995, 11, 6)}
          />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Date Picker
        </Text>
        <DatePicker className="max-w-[284px]" label="Birth date" />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Date Range Picker
        </Text>
        <DateRangePicker className="max-w-xs" label="Stay duration" />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Divider
        </Text>
        <div className="max-w-md">
          <div className="space-y-1">
            <h4 className="text-medium font-medium">HeroUI Components</h4>
            <p className="text-small text-default-400">Beautiful, fast and modern React UI library.</p>
          </div>
          <Divider className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-small">
            <div className={cn('')}>Blog</div>
            <Divider orientation="vertical" />
            <div>Docs</div>
            <Divider orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Dropdown
        </Text>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Drawer
        </Text>
        <Button onPress={() => setDrawerOpen(!drawerOpen)}>Open Drawer</Button>
        <Drawer isOpen={drawerOpen} onOpenChange={(value) => setDrawerOpen(value)}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                <DrawerBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
                    hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
                    hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia
                    eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
                    esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Form
        </Text>
        <Form className="w-full max-w-xs" onSubmit={onSubmit}>
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Button type="submit" variant="bordered">
            Submit
          </Button>
          {submitted && (
            <div className="text-small text-default-500">
              You submitted: <code>{JSON.stringify(submitted)}</code>
            </div>
          )}
        </Form>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Image
        </Text>
        <Image
          alt="HeroUI hero Image with delay"
          height={200}
          src="https://app.requestly.io/delay/5000/https://heroui.com/images/hero-card-complete.jpeg"
          width={300}
        />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Input
        </Text>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input label="Email" type="email" />
          <Input label="Email" placeholder="Enter your email" type="email" />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Input OTP
          <br />
          <sub>Accessability issues with roles for both the Parent and Children</sub>
        </Text>
        <div className="flex flex-col items-start gap-2">
          <InputOtp length={4} value={value} onValueChange={setValue} />
          <div className="text-small text-default-500">
            OTP value: <span className="text-md font-medium">{value}</span>
          </div>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          KBD
        </Text>
        <Kbd keys={['command']}>K</Kbd>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Link
        </Text>
        <Link href="#">Default Link</Link>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          ListBox Wrapper
        </Text>
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="new">New file</ListboxItem>
            <ListboxItem key="copy">Copy link</ListboxItem>
            <ListboxItem key="edit">Edit file</ListboxItem>
            <ListboxItem key="delete" className="text-danger" color="danger">
              Delete file
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Modal
        </Text>
        <Button onPress={() => setModalOpen(!modalOpen)}>Open Modal</Button>
        <Modal isOpen={modalOpen} onOpenChange={(value) => setModalOpen(value)}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
                  hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
                  hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia
                  eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
                  esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => setModalOpen(false)}>
                  Close
                </Button>
                <Button color="primary" onPress={() => setModalOpen(false)}>
                  Action
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          NavBar
        </Text>
        <Navbar>
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link aria-current="page" href="#">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Number Input
        </Text>
        <NumberInput className="max-w-xs" placeholder="Enter the amount" />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Pagination
        </Text>
        <Pagination initialPage={1} total={10} />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Popover
        </Text>
        <Popover placement="right">
          <PopoverTrigger>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Progress
        </Text>
        <Progress aria-label="Loading..." className="max-w-md" value={60} />
        <Progress isIndeterminate aria-label="Loading..." className="max-w-md" size="sm" />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          RadioGroup
        </Text>
        <RadioGroup label="Select your favorite city">
          <Radio value="buenos-aires">Buenos Aires</Radio>
          <Radio value="sydney">Sydney</Radio>
          <Radio value="san-francisco">San Francisco</Radio>
          <Radio value="london">London</Radio>
          <Radio value="tokyo">Tokyo</Radio>
        </RadioGroup>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Range Calendar
        </Text>
        <div className="flex gap-x-4">
          <RangeCalendar aria-label="Date (No Selection)" />
          <RangeCalendar
            aria-label="Date (Uncontrolled)"
            defaultValue={{
              start: today(getLocalTimeZone()),
              end: today(getLocalTimeZone()).add({ weeks: 1 }),
            }}
          />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Scroll Shadow
        </Text>
        <ScrollShadow className="w-[300px] h-[400px]">
          <div>
            <p>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
              veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud
              elit officia tempor esse quis.
            </p>
            <p>
              Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
              duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
              veniam.
            </p>
            <p>
              Est velit labore esse esse cupidatat. Velit id elit consequat minim. Mollit enim excepteur ea
              laboris adipisicing aliqua proident occaecat do do adipisicing adipisicing ut fugiat. Consequat
              pariatur ullamco aute sunt esse. Irure excepteur eu non eiusmod. Commodo commodo et ad ipsum
              elit esse pariatur sit adipisicing sunt excepteur enim.
            </p>
            <p>
              Incididunt duis commodo mollit esse veniam non exercitation dolore occaecat ea nostrud laboris.
              Adipisicing occaecat fugiat fugiat irure fugiat in magna non consectetur proident fugiat.
              Commodo magna et aliqua elit sint cupidatat. Sint aute ullamco enim cillum anim ex. Est eiusmod
              commodo occaecat consequat laboris est do duis. Enim incididunt non culpa velit quis aute in
              elit magna ullamco in consequat ex proident.
            </p>
            <p>
              Dolore incididunt mollit fugiat pariatur cupidatat ipsum laborum cillum. Commodo consequat velit
              cupidatat duis ex nisi non aliquip ad ea pariatur do culpa. Eiusmod proident adipisicing tempor
              tempor qui pariatur voluptate dolor do ea commodo. Veniam voluptate cupidatat ex nisi do ullamco
              in quis elit.
            </p>
            <p>
              Cillum proident veniam cupidatat pariatur laborum tempor cupidatat anim eiusmod id nostrud
              pariatur tempor reprehenderit. Do esse ullamco laboris sunt proident est ea exercitation
              cupidatat. Do Lorem eiusmod aliqua culpa ullamco consectetur veniam voluptate cillum. Dolor
              consequat cillum tempor laboris mollit laborum reprehenderit reprehenderit veniam aliqua
              deserunt cupidatat consequat id.
            </p>
            <p>
              Est id tempor excepteur enim labore sint aliquip consequat duis minim tempor proident. Dolor
              incididunt aliquip minim elit ea. Exercitation non officia eu id.
            </p>
            <p>
              Ipsum ipsum consequat incididunt do aliquip pariatur nostrud. Qui ut sint culpa labore Lorem.
              Magna deserunt aliquip aute duis consectetur magna amet anim. Magna fugiat est nostrud veniam.
              Officia duis ea sunt aliqua.
            </p>
            <p>
              Ipsum minim officia aute anim minim aute aliquip aute non in non. Ipsum aliquip proident ut
              dolore eiusmod ad fugiat fugiat ut ex. Ea velit Lorem ut et commodo nulla voluptate veniam ea et
              aliqua esse id. Pariatur dolor et adipisicing ea mollit. Ipsum non irure proident ipsum dolore
              aliquip adipisicing laborum irure dolor nostrud occaecat exercitation.
            </p>
            <p>
              Culpa qui reprehenderit nostrud aliqua reprehenderit et ullamco proident nisi commodo non ut.
              Ipsum quis irure nisi sint do qui velit nisi. Sunt voluptate eu reprehenderit tempor consequat
              eiusmod Lorem irure velit duis Lorem laboris ipsum cupidatat. Pariatur excepteur tempor veniam
              cillum et nulla ipsum veniam ad ipsum ad aute. Est officia duis pariatur ad eiusmod id
              voluptate.
            </p>
          </div>
        </ScrollShadow>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Select
        </Text>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select className="max-w-xs" label="Select an animal">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select className="max-w-xs" label="Favorite Animal" placeholder="Select an animal">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Skeleton
        </Text>
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Slider
        </Text>
        <Slider
          className="max-w-md"
          defaultValue={0.4}
          label="Temperature"
          maxValue={1}
          minValue={0}
          step={0.01}
        />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Snippet
        </Text>
        <Snippet>npm install @heroui/react</Snippet>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Custom Card
        </Text>
        <div className="flex">
          <CustomCard />
          <Spacer x={4} />
          <CustomCard />
          <Spacer x={4} />
          <CustomCard />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Spinner
        </Text>
        <div className="flex flex-wrap items-end gap-8">
          <Spinner classNames={{ label: 'text-foreground mt-4' }} label="default" variant="default" />
          <Spinner classNames={{ label: 'text-foreground mt-4' }} label="simple" variant="simple" />
          <Spinner classNames={{ label: 'text-foreground mt-4' }} label="gradient" variant="gradient" />
          <Spinner classNames={{ label: 'text-foreground mt-4' }} label="spinner" variant="spinner" />
          <Spinner classNames={{ label: 'text-foreground mt-4' }} label="wave" variant="wave" />
          <Spinner classNames={{ label: 'text-foreground mt-4' }} label="dots" variant="dots" />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Switch \ Toggle
        </Text>
        <Switch defaultSelected aria-label="Automatic updates" />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Table
        </Text>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Tabs
        </Text>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <Tabs key={variant} aria-label="Tabs variants" variant={variant as any}>
              <Tab key="photos" title="Photos" />
              <Tab key="music" title="Music" />
              <Tab key="videos" title="Videos" />
            </Tabs>
          ))}
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Toast & Provider
        </Text>
        <ToastProvider />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="flat"
            onPress={() => {
              addToast({
                title: 'Toast Title',
              });
            }}
          >
            Default
          </Button>

          <Button
            variant="flat"
            onPress={() => {
              addToast({
                title: 'Toast Title',
                description: 'Toast Description',
              });
            }}
          >
            With Description
          </Button>

          <Button
            variant="flat"
            onPress={() => {
              addToast({
                title: 'Toast Title',
                description: 'Toast Description',
                hideIcon: true,
              });
            }}
          >
            Hidden Icon
          </Button>

          <Button
            variant="flat"
            onPress={() => {
              addToast({
                title: 'Toast Title',
                description: 'Toast Description',
                promise: new Promise((resolve) => setTimeout(resolve, 3000)),
              });
            }}
          >
            Promise (3000ms)
          </Button>

          <Button
            variant="flat"
            onPress={() => {
              addToast({
                title: 'Toast Title',
                description: 'Toast Description',
                endContent: (
                  <Button size="sm" variant="flat">
                    Upgrade
                  </Button>
                ),
              });
            }}
          >
            With endContent
          </Button>

          <Button
            variant="flat"
            onPress={() => {
              addToast({
                title: 'Toast Title',
                description: 'Toast Description',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
              });
            }}
          >
            Show Timeout Progress (3000ms)
          </Button>

          <Button
            variant="flat"
            onPress={() =>
              addToast({
                title: 'Toast title',
                description: 'Toast displayed successfully',
                icon: (
                  <svg height={24} viewBox="0 0 24 24" width={24}>
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    >
                      <path
                        d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                        data-name="Stroke 1"
                      />
                      <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                    </g>
                  </svg>
                ),
              })
            }
          >
            Custom Icon
          </Button>
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Textarea
        </Text>
        <Textarea className="max-w-xs" label="Description" placeholder="Enter your description" />
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Time Input
        </Text>
        <div className="flex flex-wrap gap-4">
          <TimeInput label="Event Time" />
          <TimeInput defaultValue={new Time(11, 45)} label="Event Time" />
        </div>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          Tooltip
        </Text>
        <Tooltip content="I am a tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      </div>

      <div className={cn('')}>
        <Text as={'h2'} className={cn('py-2', 'px-4', 'mb-4', 'bg-gray-100')}>
          User
        </Text>
        <User
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
          }}
          description="Product Designer"
          name="Jane Doe"
        />
      </div>
    </div>
  );
};
