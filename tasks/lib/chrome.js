'use strict';

var open = require('open'),
    fs = require('fs');

// Adapted from https://github.com/karma-runner/karma-chrome-launcher
function getChromeExe(chromeDirName) {
    if (process.platform !== 'win32') {
        return null;
    }
    var windowsChromeDirectory, i, prefix;
    var suffix = '\\Google\\'+ chromeDirName + '\\Application\\chrome.exe';
    var prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)']];

    for (i = 0; i < prefixes.length; i++) {
        prefix = prefixes[i];
        if (fs.existsSync(prefix + suffix)) {
            windowsChromeDirectory = prefix + suffix;
            break;
        }
    }

    return windowsChromeDirectory;
}

var CHROME_BIN = {
    linux: 'google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: getChromeExe('Chrome')
};

exports.open = function(url) {
    open(url, CHROME_BIN[process.platform]);
};
