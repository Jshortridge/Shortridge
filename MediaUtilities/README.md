# Media Utilities Webservice

A RESTful webservice for parsing media titles with validation. This service exposes an API endpoint that accepts media title strings and returns structured information.

## Features

- Parse media title strings into structured data
- Validate title years (cannot exceed current year, cannot be zero or negative)
- RESTful API endpoints
- Docker containerization support
- CORS support for web applications

## Endpoints

### GET /parse-title
Parse a media title string via query parameter.

**Query Parameters:**
- `inputString` (required): The media title string to parse

**Example:**
```
GET /parse-title?inputString=2023%20-%2001%20-%2015%20-%201234%20-%20a%20-%20The%20Series%20Premiere
```

### POST /parse-title
Parse a media title string via request body.

**Request Body:**
```json
{
  "inputString": "2023 - 01 - 15 - 1234 - a - The Series Premiere"
}
```

## Response Format

### Success (200 OK)
```json
{
  "success": true,
  "data": {
    "rawTitleString": "2023 - 01 - 15 - 1234 - a - The Series Premiere",
    "titleYear": "2023",
    "titleSeason": "01",
    "titleEpisode": "15",
    "ISOSourceID": "1234",
    "ISOSourceTrack": "a",
    "titleName": "The Series Premiere"
  }
}
```

### Error Responses (4xx/5xx)
```json
{
  "error": "Error message describing the problem",
  "errorCode": "Error code identifier",
  "status": 400
}
```

## Validation Rules

1. **Year Validation**: Title year cannot exceed current year
2. **Year Range**: Title year cannot be zero or negative
3. **Input Validation**: Input string must not be null, blank, or start with non-digit character

## Getting Started

### Prerequisites
- Docker installed (for containerized deployment)
- Node.js 18+ (for local development)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

### Docker Deployment

1. Build the image:
```bash
docker build -t media-utilities .
```

2. Run the container:
```bash
docker run -p 3000:3000 media-utilities
```

Or using docker-compose:
```bash
docker-compose up -d
```

## API Examples

### Using curl
```bash
curl "http://localhost:3000/parse-title?inputString=2023%20-%2001%20-%2015%20-%201234%20-%20a%20-%20The%20Series%20Premiere"
```

### Using JavaScript fetch
```javascript
fetch('http://localhost:3000/parse-title', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    inputString: '2023 - 01 - 15 - 1234 - a - The Series Premiere'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Error Codes

- `NoInput`: Input string cannot be null or blank
- `InvalidInput`: Input string must start with a 4-digit number
- `InvalidYear`: Title year cannot exceed current year or be zero/negative
- `ParseError`: Failed to parse title input

## License

MIT