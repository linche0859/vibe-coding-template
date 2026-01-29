import { type VariantProps, cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary-heavy-500 text-white hover:bg-primary-heavy-600',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border border-neutral-light-600 bg-transparent hover:bg-neutral-light-200 dark:border-neutral-heavy-100 dark:hover:bg-gray-700',
        secondary:
          'bg-neutral-light-200 text-neutral-light-600 hover:bg-neutral-light-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
        ghost: 'hover:bg-neutral-light-200 dark:hover:bg-gray-700',
        link: 'text-primary-heavy-500 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
