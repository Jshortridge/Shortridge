const mucParseTitleInput = require('../Common/mucParseTitleInput');

function runTests() {
  const testCases = [
    {
      input: '2023a-test title S01E02(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: 'dddda-test title S01E02(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: 'Nothing',
    },
    {
      input: '',
    },
    {
      input: '2023-test title S01E02(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: '2023-test title(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
     {
      input: '2023-test title The Series Premiere',
    },
     {
      input: '2023-test S01E02',
    },
    {
      input: '2023ag-test title S01E02(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: '2023ag3-test title S01E02(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: '2023ag-test title SxxE02(2022) - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: '2023-test title S01J02 - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: '2023-test title E01 - 01 - 15 - 1234 - a - The Series Premiere',
    },    
    {
      input: '2023-test title S01 - 01 - 15 - 1234 - a - The Series Premiere',
    },
    {
      input: '2023ag-test title S01E02(9999) - 01 - 15 - 1234 - a - The Series Premiere',
    }
  ];

  console.log('Running mucParseTitleInput tests...\n');

  testCases.forEach((tc, index) => {
    console.log(`--- Test ${index + 1}: ${tc.description} ---`);
    console.log(`Input: ${tc.input}`);

    try {
      const result = mucParseTitleInput(tc.input);
      console.log('Parsed result:');
      console.log(JSON.stringify(result, null, 2));
      console.log('\n');
    } catch (error) {
      console.error('Error:', error.message);
      console.error('ErrorCode:',error.ErrorCode)
      console.error('Status:', error.status);
      console.log('\n');
    }
  });

  console.log('Test run completed.');
}

try {
  runTests();
} catch (err) {
  console.error('Unhandled error:', err);
}