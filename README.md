# NBN Plan Comparison Tool

A React-based web application for comparing NBN (National Broadband Network) plans from various Australian internet service providers.

## TODOs

1. add unit tests
1. UI nice hero header
1. UI nice address search + set
1. UI fix pagination min mobile
1. UI nice plan cards
1. resolve filters auto expand mobile > desktop
1. save state to URL: addrNbnType, sort, filters
1. UI nice skeleton loading, lower CLS

## DONE

1. ✅ UI update footer
1. ✅ fix remove borked URL state
1. ✅ create data types
1. ✅ mock data, 20-30 plans, consume
1. ✅ abstract into components
1. ✅ implement state

## Features

- **Async Data Loading**: Plans are loaded asynchronously with a 400ms delay to simulate real API calls
- **Pagination**: Display 8 plans per page with navigation controls
- **Filtering**: Filter plans by provider, price range, speed, NBN type, and promotions
- **Sorting**: Sort plans by price or download speed (ascending/descending)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── data/                   # Static data files
│   └── nbnPlans.ts        # NBN plans data
├── lib/                    # Utility libraries
│   ├── settings.ts        # App configuration
│   ├── nbnService.ts      # Data fetching service
│   └── utils.ts           # General utilities
├── types/                  # TypeScript type definitions
│   └── nbn.ts             # NBN-related types
└── App.tsx                # Main application component
```

## Configuration

The app settings are defined in `src/lib/settings.ts`:

- `ITEMS_PER_PAGE`: Number of plans displayed per page (default: 8)
- `DATA_LOADING_DELAY_MS`: Simulated API delay in milliseconds (default: 400)

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Data Structure

Each NBN plan includes:

- Provider name
- Plan name and pricing
- Download/upload speeds
- NBN connection type (FTTP, FTTN, etc.)
- Optional promotional offers
- Provider website URL

## Filtering and Sorting

- **Providers**: Multi-select from popular and all available providers
- **Price Range**: Radio button selection for price brackets
- **Speed**: Filter by minimum download/upload speeds
- **NBN Type**: Filter by connection type
- **Promotions**: Toggle to show only plans with promotional offers
- **Sorting**: Sort by price or download speed in ascending/descending order

## License

This project is for educational purposes.
