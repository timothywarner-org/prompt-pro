import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Sample weather data (no real API calls needed)
// ---------------------------------------------------------------------------
const WEATHER_DATA = {
  seattle: {
    temp: 55, condition: 'Rainy', humidity: 85, wind: '10 mph SW',
    forecast: 'Rain continuing throughout the week',
  },
  'los angeles': {
    temp: 75, condition: 'Sunny', humidity: 40, wind: '5 mph W',
    forecast: 'Clear skies for the next 5 days',
  },
  'new york': {
    temp: 62, condition: 'Partly Cloudy', humidity: 60, wind: '15 mph NE',
    forecast: 'Scattered clouds, possible rain tomorrow',
  },
  miami: {
    temp: 82, condition: 'Humid', humidity: 75, wind: '8 mph E',
    forecast: 'Hot and humid with afternoon thunderstorms',
  },
  chicago: {
    temp: 48, condition: 'Windy', humidity: 55, wind: '20 mph NW',
    forecast: 'Cold front moving in, temperatures dropping',
  },
  denver: {
    temp: 45, condition: 'Clear', humidity: 30, wind: '12 mph W',
    forecast: 'Clear and cold, possible snow in mountains',
  },
};

const WEATHER_ALERTS = [
  { city: 'miami', severity: 'Warning', message: 'Thunderstorm Watch until 8 PM EST' },
  { city: 'chicago', severity: 'Advisory', message: 'Wind Advisory: gusts up to 45 mph expected' },
  { city: 'denver', severity: 'Watch', message: 'Winter Storm Watch for elevations above 8,000 ft' },
];

function cityLabel(key) {
  return key.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// ---------------------------------------------------------------------------
// Server setup
// ---------------------------------------------------------------------------
const server = new McpServer(
  { name: 'weather-server', version: '2.0.0' },
  { capabilities: { tools: {}, resources: {}, prompts: {} } },
);

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------
server.registerTool(
  'get_weather',
  {
    title: 'Get Weather',
    description: 'Get current weather conditions for a city. Returns temperature (F), condition, humidity, wind speed/direction, and a short forecast. Available cities: Seattle, Los Angeles, New York, Miami, Chicago, Denver.',
    inputSchema: {
      city: z.string().describe('City name, e.g. "Seattle", "New York", "Los Angeles"'),
    },
  },
  async ({ city }) => {
    const key = city.toLowerCase();
    const weather = WEATHER_DATA[key];

    if (!weather) {
      return {
        content: [{
          type: 'text',
          text: `No weather data for "${city}". Available cities: ${Object.keys(WEATHER_DATA).map(cityLabel).join(', ')}`,
        }],
        isError: true,
      };
    }

    return {
      content: [{
        type: 'text',
        text: [
          `Weather in ${cityLabel(key)}:`,
          `  Temperature: ${weather.temp} F`,
          `  Condition:   ${weather.condition}`,
          `  Humidity:    ${weather.humidity}%`,
          `  Wind:        ${weather.wind}`,
          `  Forecast:    ${weather.forecast}`,
        ].join('\n'),
      }],
    };
  },
);

server.registerTool(
  'compare_weather',
  {
    title: 'Compare Weather',
    description: 'Compare current weather between two cities side by side. Shows temperature, condition, humidity, and wind for both cities, plus which is warmer and by how much.',
    inputSchema: {
      city_a: z.string().describe('First city to compare, e.g. "Miami"'),
      city_b: z.string().describe('Second city to compare, e.g. "Chicago"'),
    },
  },
  async ({ city_a, city_b }) => {
    const keyA = city_a.toLowerCase();
    const keyB = city_b.toLowerCase();
    const weatherA = WEATHER_DATA[keyA];
    const weatherB = WEATHER_DATA[keyB];

    const missing = [];
    if (!weatherA) missing.push(city_a);
    if (!weatherB) missing.push(city_b);

    if (missing.length > 0) {
      return {
        content: [{
          type: 'text',
          text: `No weather data for: ${missing.join(', ')}. Available cities: ${Object.keys(WEATHER_DATA).map(cityLabel).join(', ')}`,
        }],
        isError: true,
      };
    }

    const diff = weatherA.temp - weatherB.temp;
    const warmer = diff > 0 ? cityLabel(keyA) : cityLabel(keyB);

    return {
      content: [{
        type: 'text',
        text: [
          `Comparison: ${cityLabel(keyA)} vs ${cityLabel(keyB)}`,
          '',
          `  ${cityLabel(keyA).padEnd(15)} ${cityLabel(keyB)}`,
          `  ${'---'.padEnd(15)} ---`,
          `  ${(weatherA.temp + ' F').padEnd(15)} ${weatherB.temp} F`,
          `  ${weatherA.condition.padEnd(15)} ${weatherB.condition}`,
          `  ${(weatherA.humidity + '%').padEnd(15)} ${weatherB.humidity}%`,
          `  ${weatherA.wind.padEnd(15)} ${weatherB.wind}`,
          '',
          `${warmer} is ${Math.abs(diff)} F warmer.`,
        ].join('\n'),
      }],
    };
  },
);

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------
server.registerResource(
  'city-list',
  'weather://cities',
  {
    title: 'Available Cities',
    description: 'JSON array of all cities with current temperature and condition. Use this to discover which cities are available before calling get_weather.',
    mimeType: 'application/json',
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify(
        Object.keys(WEATHER_DATA).map(key => ({
          name: cityLabel(key),
          temp: WEATHER_DATA[key].temp,
          condition: WEATHER_DATA[key].condition,
        })),
        null, 2,
      ),
    }],
  }),
);

server.registerResource(
  'weather-alerts',
  'weather://alerts',
  {
    title: 'Weather Alerts',
    description: 'JSON array of active weather alerts including severity level (Warning, Advisory, Watch) and affected cities. Currently covers Miami, Chicago, and Denver.',
    mimeType: 'application/json',
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify(
        WEATHER_ALERTS.map(a => ({ ...a, city: cityLabel(a.city) })),
        null, 2,
      ),
    }],
  }),
);

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------
server.registerPrompt(
  'weather-report',
  {
    title: 'Weather Report',
    description: 'Generate a friendly, human-readable weather report for a given city. Supplies current conditions as context so the LLM can write a natural-language summary.',
    argsSchema: {
      city: z.string().describe('City name, e.g. "Denver" or "New York"'),
    },
  },
  async ({ city }) => {
    const key = city.toLowerCase();
    const weather = WEATHER_DATA[key] ?? null;

    const detail = weather
      ? `Temperature: ${weather.temp} F | Condition: ${weather.condition} | Humidity: ${weather.humidity}% | Wind: ${weather.wind} | Forecast: ${weather.forecast}`
      : `No data available for "${city}".`;

    return {
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Write a short, friendly weather report for ${cityLabel(key)} using this data:\n\n${detail}`,
        },
      }],
    };
  },
);

server.registerPrompt(
  'travel-advisory',
  {
    title: 'Travel Advisory',
    description: 'Generate a travel advisory for someone traveling between two cities. Includes weather comparison, active alerts for either city, and asks the LLM to suggest packing tips and safety advice.',
    argsSchema: {
      origin: z.string().describe('City you are departing from, e.g. "Seattle"'),
      destination: z.string().describe('City you are traveling to, e.g. "Miami"'),
    },
  },
  async ({ origin, destination }) => {
    const oKey = origin.toLowerCase();
    const dKey = destination.toLowerCase();
    const oWeather = WEATHER_DATA[oKey];
    const dWeather = WEATHER_DATA[dKey];

    const originInfo = oWeather
      ? `${cityLabel(oKey)}: ${oWeather.temp} F, ${oWeather.condition}, ${oWeather.forecast}`
      : `${origin}: no data available`;
    const destInfo = dWeather
      ? `${cityLabel(dKey)}: ${dWeather.temp} F, ${dWeather.condition}, ${dWeather.forecast}`
      : `${destination}: no data available`;

    const alerts = WEATHER_ALERTS
      .filter(a => a.city === oKey || a.city === dKey)
      .map(a => `  ${cityLabel(a.city)}: [${a.severity}] ${a.message}`)
      .join('\n');

    return {
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: [
            `Create a travel advisory for someone traveling from ${cityLabel(oKey)} to ${cityLabel(dKey)}.`,
            '',
            'Current conditions:',
            `  ${originInfo}`,
            `  ${destInfo}`,
            alerts ? `\nActive alerts:\n${alerts}` : '',
            '',
            'Include packing suggestions and any safety tips.',
          ].join('\n'),
        },
      }],
    };
  },
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP server running on stdio');
}

main().catch(console.error);
