# VRL Institute Frontend

A modern Next.js application built with TypeScript, Material-UI (MUI), and production-ready architecture.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Material-UI (MUI)** for styling and components
- **ESLint** for code quality
- **Prettier** for code formatting
- **Jest** for testing
- **Production optimizations**
- **Responsive design**
- **Custom VRL Institute logo component**
- **Reusable navbar component**
- **Component library**

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout with MUI theme
│   ├── AddNewsBlogModal.tsx           # Home page
│   ├── demo/              # Demo page for navbar
│   ├── loading.tsx        # Loading component
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── Navbar.tsx         # Reusable navbar component
│   └── VRLLogo.tsx        # VRL Institute logo component
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── constants/             # Application constants
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd VRL_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🏗️ Build and Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🧪 Testing

The project includes Jest and React Testing Library for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Component Library

The project includes custom components built with Material-UI:

- **Navbar**: Reusable navigation bar with VRL Institute logo
- **VRLLogo**: Custom logo component with gradient styling
- **MUI Components**: Full access to Material-UI component library

## 🎨 Styling

The project uses Material-UI (MUI) with a custom theme:

- Material Design principles
- Custom VRL Institute branding
- Responsive design utilities
- Theme customization
- Gradient logo styling

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `jest.config.js` - Jest configuration

## 🧭 Navbar Component

The project includes a reusable navbar component with the VRL Institute logo:

### Features
- **Responsive Design**: Automatically adapts to mobile, tablet, and desktop
- **Customizable**: Configurable logo size, colors, and elevation
- **Navigation Links**: Pass navigation links as props
- **Mobile Menu**: Hamburger menu with slide-out drawer on mobile
- **External Links**: Support for external links that open in new tabs

### Usage
```tsx
import Navbar, { NavLink } from '@/components/Navbar'

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'External', href: 'https://example.com', external: true },
]

<Navbar 
  navLinks={navLinks} 
  logoSize="medium"
  elevation={1}
/>
```

### Props
- `navLinks`: Array of navigation links
- `logoSize`: 'small' | 'medium' | 'large'
- `elevation`: Shadow depth (0-24)

## 📚 API Routes

The project includes API routes in `src/app/api/`:

- `/api/health` - Health check endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

===================
# Build the docker image
docker build -t vrl-frontend .

# Run the docker image (.env is manually loaded)
docker run -it -p 3000:3000 --env-file .env vrl-frontend