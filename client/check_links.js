const fs = require('fs');
const path = require('path');

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

walk('c:/portfolio/client/src', function (err, results) {
    if (err) throw err;
    let missingImports = [];
    results.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('<Link') && !content.includes('import Link')) {
            missingImports.push(file);
        }
    });
    console.log('Files missing Link import:', missingImports.length > 0 ? missingImports : 'None');
});
