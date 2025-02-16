import type { Config } from "tailwindcss";
import tailwindCssAnimate from 'tailwindcss-animate';
import type { PluginAPI } from 'tailwindcss/types/config';

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        text: ['var(--font-text)', 'sans-serif'],
        number: ['var(--font-number)', 'sans-serif']
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        bold: 'var(--font-weight-bold)'
      }
    }
  },
  plugins: [
    tailwindCssAnimate,
    ({ theme, addUtilities, matchUtilities }: PluginAPI) => {
      matchUtilities(
        {
          mask: (value: string) => ({
            maskImage: value,
            '--tw-mask-direction': 'to bottom',
            '--tw-mask-shape': '',
            '--tw-mask-reach': 'closest-side',
            '--tw-mask-at': 'center',
            '--tw-mask-from-opacity': '1',
            '--tw-mask-point-from': '',
            '--tw-mask-from': 'rgba(0,0,0,var(--tw-mask-from-opacity)) var(--tw-mask-point-from)',
            '--tw-mask-to-opacity': '0',
            '--tw-mask-point-to': '',
            '--tw-mask-to': 'rgba(0,0,0,var(--tw-mask-to-opacity)) var(--tw-mask-point-to)',
            '--tw-mask-stops': 'var(--tw-mask-from), var(--tw-mask-to)',
          }),
        },
        {
          values: {
            none: 'none',
            linear: 'linear-gradient(var(--tw-mask-direction), var(--tw-mask-stops))',
            radial:
              'radial-gradient(var(--tw-mask-shape) var(--tw-mask-reach) at var(--tw-mask-at), var(--tw-mask-stops))',
          },
        }
      );

      matchUtilities(
        {
          'mask-dir': (value: string) => ({
            '--tw-mask-direction': value,
          }),
        },
        {
          values: {
            'to-t': 'to top',
            'to-tl': 'to top left',
            'to-tr': 'to top right',
            'to-r': 'to right',
            'to-b': 'to bottom',
            'to-bl': 'to bottom left',
            'to-br': 'to bottom right',
            'to-l': 'to left',
          },
        }
      );

      addUtilities({
        '.mask-shape-circle': {
          '--tw-mask-shape': 'circle',
        },
        '.mask-shape-ellipse': {
          '--tw-mask-shape': 'ellipse',
        },
      });

      matchUtilities(
        {
          'mask-reach': (value: string) => ({
            '--tw-mask-reach': value,
          }),
        },
        {
          values: {
            'closest-side': 'closest-side',
            'closest-corner': 'closest-corner',
            'farthest-side': 'farthest-side',
            'farthest-corner': 'farthest-corner',
            'contain': 'closest-side',
            'cover': 'farthest-corner',
          },
        }
      );

      matchUtilities(
        {
          'mask-at': (value: string) => ({
            '--tw-mask-at': value,
          }),
        },
        {
          values: {
            center: 'center',
            t: 'top',
            tl: 'top left',
            tr: 'top right',
            b: 'bottom',
            bl: 'bottom left',
            br: 'bottom right',
            r: 'right',
            l: 'left',
          },
        }
      );

      matchUtilities(
        {
          'mask-from': (value: string) => ({
            '--tw-mask-from-opacity': value,
          }),
          'mask-to': (value: string) => ({
            '--tw-mask-to-opacity': value,
          }),
          'mask-via': (value: string) => ({
            '--tw-mask-point-via': '',
            '--tw-mask-stops': `var(--tw-mask-from), rgba(0,0,0,${value}) var(--tw-mask-point-via), var(--tw-mask-to)`,
          }),
        },
        { values: theme('opacity') }
      );

      matchUtilities({
        'mask-point-from': (value: string) => ({
          '--tw-mask-point-from': value,
        }),
        'mask-point-to': (value: string) => ({
          '--tw-mask-point-to': value,
        }),
        'mask-point-via': (value: string) => ({
          '--tw-mask-point-via': value,
        }),
      });

      addUtilities({
        '.mask-repeat': {
          maskRepeat: 'repeat',
        },
        '.mask-repeat-x': {
          maskRepeat: 'repeat-x',
        },
        '.mask-repeat-y': {
          maskRepeat: 'repeat-y',
        },
        '.mask-repeat-space': {
          maskRepeat: 'space',
        },
        '.mask-repeat-round': {
          maskRepeat: 'round',
        },
        '.mask-no-repeat': {
          maskRepeat: 'no-repeat',
        },
      });

      matchUtilities(
        {
          'mask-size': (value: string) => ({
            maskSize: value,
          }),
        },
        {
          values: theme('backgroundSize'),
        }
      );
      matchUtilities(
        {
          'mask-position': (value: string) => ({
            maskPosition: value,
          }),
        },
        {
          values: theme('backgroundPosition'),
        }
      );
    },
  ],
} satisfies Config;