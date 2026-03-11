/**
 * mucParseTitleInput - Parses a media title input string and extracts structured information
 * @param {string} inputString - The input string to parse
 * @returns {object} parseTitleInfo - The parsed title information
 * @throws {object} Error object with status and message
 */
function mucParseTitleInput(inputString) {
    // Validate input
    if (!inputString || inputString.trim() === '') {
        throw {
            status: 400,
            ErrorCode: 'NoInput',
            message: 'Input string cannot be null or blank'
        };
    }

    // Remove quotation marks before parsing
    inputString = inputString.replace(/['"]/g, '').trim();

    // Remove non-printable characters before parsing
    inputString = inputString.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();

    // Check if input starts with a number
    const firstChar = inputString.trim().charAt(0);
    if (!/^\d$/.test(firstChar)) {
        throw {
            status: 400,
            ErrorCode: 'InvalidInput',
            message: 'Input string must start with a 4-digit number'
        };
    }

    // Copy the raw input
    const parseTitleInfo = {
        rawTitleString: inputString,
        titleYear: '',
        titleSeason: '',
        titleEpisode: '',
        ISOSourceID: '',
        ISOSourceTrack: '',
        titleName: ''
    };

    try {
        // Parse the input string
        // Format expected: [4-digit year] - [2-digit season] - [2-digit episode] - [4-digit ISO ID] - [1-char track] - [description]

        // Use workInputString for processing (keeps original in rawTitleString)
        let workInputString = inputString;

        // Extract titleYear from inside parentheses if found
        const yearMatch = workInputString.match(/\((\d{4})\)/);
        if (yearMatch) {
            parseTitleInfo.titleYear = yearMatch[1];
            // Trim out the "(", 4-digit year and ")" from workInputString
            workInputString = workInputString.replace(/\(\d{4}\)\s*/, '').trim();

            // Validate that titleYear doesn't exceed current year
            const currentYear = new Date().getFullYear();
            const year = parseInt(parseTitleInfo.titleYear);
            if (year > currentYear) {
                throw {
                    status: 400,
                    ErrorCode: 'InvalidYear',
                    message: 'Title year cannot exceed the current year (' + currentYear + ')'
                };
            }

            // Validate that titleYear is not zero or negative
            if (year <= 0) {
                throw {
                    status: 400,
                    ErrorCode: 'InvalidYear',
                    message: 'Title year cannot be zero or a negative number'
                };
            }
        }

        // Extract titleSeason (starts with S followed by 2 digits)
        const seasonMatch = workInputString.match(/S(\d{2})/);
        if (seasonMatch) {
            parseTitleInfo.titleSeason = seasonMatch[1];
        }

        // Extract titleEpisode (E character and 2 digits, after season)
        const episodeMatch = workInputString.match(/S\d{2}E(\d{2})/);
        if (episodeMatch) {
            parseTitleInfo.titleEpisode = episodeMatch[1].padStart(2, '0');
            // Remove the 6 character sequence starting with "S"
            workInputString = workInputString.replace(/S\d{2}E\d{2}/, '');
        }

        // Extract ISOSourceID (first 4 digits of workInputString, then continue until _ or space)
        const isoMatch = workInputString.match(/^(\d{4})(.*)/);
        if (isoMatch) {
            parseTitleInfo.ISOSourceID = isoMatch[1];
            // If characters follow the first 4 digits, take them until _, -, or space
            const afterIso = isoMatch[2];
            const nextSep = Math.min(
                afterIso.indexOf('_') !== -1 ? afterIso.indexOf('_') : Infinity,
                afterIso.indexOf('-') !== -1 ? afterIso.indexOf('-') : Infinity,
                afterIso.indexOf(' ') !== -1 ? afterIso.indexOf(' ') : Infinity
            );
            if (nextSep !== -1) {
                parseTitleInfo.ISOSourceTrack = afterIso.substring(0, nextSep).toLowerCase();                
            }
        }
        
        // Remove from workInputString the 4 starting digits and the following value found in ISOSourceTrack including the "_" or " " characters
        const afterIso = isoMatch[2];
        const nextSep = 4+Math.min(
                afterIso.indexOf('_') !== -1 ? afterIso.indexOf('_') : Infinity,
                afterIso.indexOf('-') !== -1 ? afterIso.indexOf('-') : Infinity,
                afterIso.indexOf(' ') !== -1 ? afterIso.indexOf(' ') : Infinity);

        workInputString = workInputString.substring(nextSep+1).trim();
 
        // Place workInputString into titleName (remaining text, up to 128 characters)
        parseTitleInfo.titleName = workInputString.trim().replace(/_/g, '').substring(0, 128);

        return parseTitleInfo;

    } catch (error) {
        throw {
            status: 400,
            ErrorCode: error.ErrorCode,
            message: 'Failed to parse title input: ' + error.message
        };
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mucParseTitleInput;
}